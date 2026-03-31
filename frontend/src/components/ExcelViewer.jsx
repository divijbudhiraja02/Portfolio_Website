import React, { useState, useEffect, useRef, memo } from 'react';
import * as XLSX from 'xlsx';

// ─── Color helpers ────────────────────────────────────────────────────────────

const THEME_COLORS = [
  '#FFFFFF', '#000000', '#E7E6E6', '#44546A',
  '#4472C4', '#ED7D31', '#A5A5A5', '#FFC000',
  '#5B9BD5', '#70AD47',
];

const clamp = (v) => Math.max(0, Math.min(255, Math.round(v)));

const applyTint = (hex, tint) => {
  if (!hex || hex.length < 7) return hex;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const nr = tint > 0 ? clamp(r + (255 - r) * tint) : clamp(r * (1 + tint));
  const ng = tint > 0 ? clamp(g + (255 - g) * tint) : clamp(g * (1 + tint));
  const nb = tint > 0 ? clamp(b + (255 - b) * tint) : clamp(b * (1 + tint));
  return `#${nr.toString(16).padStart(2,'0')}${ng.toString(16).padStart(2,'0')}${nb.toString(16).padStart(2,'0')}`;
};

// Prefer rgb fallback over theme index (workbooks use custom themes)
const resolveColor = (c) => {
  if (!c) return null;
  if (c.rgb) {
    const hex = c.rgb.length === 8 ? c.rgb.slice(2) : c.rgb;
    if (/^[0-9A-Fa-f]{6}$/.test(hex)) return `#${hex.toUpperCase()}`;
  }
  if (c.theme != null && c.theme < THEME_COLORS.length) {
    let color = THEME_COLORS[c.theme];
    if (c.tint) color = applyTint(color, c.tint);
    return color;
  }
  return null;
};

// Luminance-based darkness check for auto-contrast
const isDark = (hex) => {
  if (!hex || hex.length < 7) return false;
  const r = parseInt(hex.slice(1,3), 16) / 255;
  const g = parseInt(hex.slice(3,5), 16) / 255;
  const b = parseInt(hex.slice(5,7), 16) / 255;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 0.45;
};

// ─── Style extraction ─────────────────────────────────────────────────────────
// cellStyles:true makes cell.s an inline object: { patternType, fgColor, bgColor,
//   bold, italic, color, sz, alignment, … }
// We also cross-reference wb.Styles.Fonts via the fillId match for font info.

const extractCellStyle = (cell, S) => {
  const s = cell?.s;
  if (!s || typeof s !== 'object') return {};

  const style = {};

  // ── Background fill ────────────────────────────────────────────────
  if (s.patternType === 'solid' && s.fgColor) {
    const bg = resolveColor(s.fgColor);
    if (bg && bg.toUpperCase() !== '#FFFFFF') style.backgroundColor = bg;
  }

  // ── Font (inline when xlsx chooses to include it) ──────────────────
  if (s.bold)    style.fontWeight     = 'bold';
  if (s.italic)  style.fontStyle      = 'italic';
  if (s.underline) style.textDecoration = 'underline';
  if (s.strike)  style.textDecoration  = 'line-through';
  if (s.color) {
    const fc = resolveColor(s.color);
    if (fc && fc.toUpperCase() !== '#000000') style.color = fc;
  }
  if (s.sz) {
    style.fontSize = `${Math.min(Math.max(Math.round(s.sz * 1.33), 9), 15)}px`;
  }

  // ── Font lookup via wb.Styles when not inlined ─────────────────────
  // Try to match the fill to a CellXf entry and pull font from there
  if (S && !style.fontWeight && !style.color) {
    const fills = S.Fills || S.Fill || [];
    const fillIdx = fills.findIndex(
      (f) => f?.patternType === 'solid' &&
             f?.fgColor && resolveColor(f.fgColor) === style.backgroundColor
    );
    if (fillIdx >= 0) {
      const xf = (S.CellXf || []).find((x) => x.fillId === fillIdx);
      if (xf) {
        const fonts = S.Fonts || S.Font || [];
        const font  = fonts[xf.fontId];
        if (font?.bold)  style.fontWeight = 'bold';
        if (font?.color) {
          const fc = resolveColor(font.color);
          if (fc && fc.toUpperCase() !== '#000000') style.color = fc;
        }
      }
    }
  }

  // ── Alignment ─────────────────────────────────────────────────────
  const h = s.alignment?.horizontal;
  if (h === 'center' || h === 'centerContinuous') style.textAlign = 'center';
  else if (h === 'right') style.textAlign = 'right';
  else if (h === 'left')  style.textAlign = 'left';

  // ── Auto-contrast: dark bg → white text if no explicit color ──────
  if (style.backgroundColor && !style.color) {
    if (isDark(style.backgroundColor)) style.color = '#FFFFFF';
  }

  return style;
};

// ─── Tab colour ───────────────────────────────────────────────────────────────

const getTabColor = (wb, sheetName) => {
  const sh = wb?.Workbook?.Sheets?.find((s) => s.name === sheetName);
  return sh?.tabColor ? resolveColor(sh.tabColor) : null;
};

// ─── Sheet data computation ───────────────────────────────────────────────────

const MAX_ROWS = 500;

const computeSheetData = (wb, sheetName) => {
  const ws = wb.Sheets[sheetName];
  if (!ws || !ws['!ref']) return null;

  const range = XLSX.utils.decode_range(ws['!ref']);
  const S     = wb.Styles;

  // Merged cell maps
  const mergeStart = {};
  const covered    = {};
  for (const m of ws['!merges'] || []) {
    mergeStart[`${m.s.r},${m.s.c}`] = { rowSpan: m.e.r - m.s.r + 1, colSpan: m.e.c - m.s.c + 1 };
    for (let r = m.s.r; r <= m.e.r; r++)
      for (let c = m.s.c; c <= m.e.c; c++)
        if (r !== m.s.r || c !== m.s.c) covered[`${r},${c}`] = true;
  }

  // Column metadata
  const colInfo  = ws['!cols'] || [];
  const colCount = range.e.c - range.s.c + 1;
  const cols = Array.from({ length: colCount }, (_, i) => {
    const ci   = range.s.c + i;
    const info = colInfo[ci];
    const w    = info?.hidden ? 0 : info?.wch ? Math.min(Math.max(info.wch * 7.5, 48), 300) : 80;
    return { ci, letter: XLSX.utils.encode_col(ci), width: w };
  });

  // Row data
  const rowInfo = ws['!rows'] || [];
  const endRow  = Math.min(range.e.r, range.s.r + MAX_ROWS - 1);
  const rows    = [];

  for (let r = range.s.r; r <= endRow; r++) {
    const ri  = rowInfo[r];
    const hpx = ri?.hidden ? 0 : ri?.hpx ?? (ri?.hpt ? ri.hpt * 1.33 : 20);

    const cells = [];
    for (const col of cols) {
      const { ci } = col;
      const addr   = XLSX.utils.encode_cell({ r, c: ci });
      const cell   = ws[addr] ?? null;
      const key    = `${r},${ci}`;
      if (covered[key]) { cells.push({ key, skip: true }); continue; }

      const merge     = mergeStart[key] ?? null;
      const cellStyle = extractCellStyle(cell, S);
      const isNum     = cell?.t === 'n';

      // Display value — Excel's pre-formatted 'w' string is most accurate
      let display = '';
      if (cell) {
        if (cell.w != null) display = String(cell.w);
        else if (cell.v != null) {
          display = typeof cell.v === 'number' ? cell.v.toLocaleString() : String(cell.v);
        }
      }

      cells.push({ key, addr, cell, merge, cellStyle, display, isNum, skip: false });
    }
    rows.push({ r, hpx, cells });
  }

  return { cols, rows, totalRows: range.e.r - range.s.r + 1 };
};

// ─── Cell (memoised) ──────────────────────────────────────────────────────────

const Cell = memo(({ data, isSelected, onClick }) => {
  if (data.skip) return null;
  const { addr, merge, cellStyle, display, isNum } = data;
  const defaultAlign = isNum && !cellStyle.textAlign ? 'right' : undefined;

  return (
    <td
      style={{
        padding: '1px 4px',
        verticalAlign: 'bottom',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        cursor: 'cell',
        fontFamily: 'Calibri, Segoe UI, Arial, sans-serif',
        fontSize: 11,
        border: isSelected ? '2px solid #1565C0' : '1px solid #D0D0D0',
        boxSizing: 'border-box',
        textAlign: defaultAlign,
        ...cellStyle,
      }}
      colSpan={merge?.colSpan}
      rowSpan={merge?.rowSpan}
      onClick={() => onClick(addr, data.cell)}
      title={display || undefined}
    >
      {display}
    </td>
  );
});

// ─── Main ExcelViewer ─────────────────────────────────────────────────────────

const ExcelViewer = ({ fileUrl }) => {
  const [workbook,     setWorkbook]     = useState(null);
  const [activeSheet,  setActiveSheet]  = useState('');
  const [sheetData,    setSheetData]    = useState(null);
  const [selectedAddr, setSelectedAddr] = useState(null);
  const [selectedCell, setSelectedCell] = useState(null);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState(null);
  const cacheRef = useRef({});

  useEffect(() => {
    setLoading(true);
    setError(null);
    setWorkbook(null);
    setSheetData(null);
    setSelectedAddr(null);
    cacheRef.current = {};

    fetch(fileUrl)
      .then((r) => { if (!r.ok) throw new Error(); return r.arrayBuffer(); })
      .then((buf) => {
        // Parse WITHOUT cellStyles:true → cell.s stays as numeric XF index
        // wb.Styles.CellXf / Fonts / Fills are still fully populated
        const wb = XLSX.read(buf, {
          type: 'array',
          cellStyles: true,  // inline fill/font into cell.s
          cellNF: true,
          cellDates: false,
          sheetStubs: true,  // include empty cells that only have fill formatting
        });
        setWorkbook(wb);
        setActiveSheet(wb.SheetNames[0]);
      })
      .catch(() => setError('Unable to load the model. Please download it instead.'))
      .finally(() => setLoading(false));
  }, [fileUrl]);

  useEffect(() => {
    if (!workbook || !activeSheet) return;
    if (!cacheRef.current[activeSheet]) {
      cacheRef.current[activeSheet] = computeSheetData(workbook, activeSheet);
    }
    setSheetData(cacheRef.current[activeSheet]);
    setSelectedAddr(null);
    setSelectedCell(null);
  }, [workbook, activeSheet]);

  const handleCellClick = (addr, cell) => {
    setSelectedAddr(addr);
    setSelectedCell(cell);
  };

  const formulaValue = selectedCell
    ? (selectedCell.f ? `=${selectedCell.f}` : (selectedCell.w ?? selectedCell.v ?? ''))
    : '';

  // ── Render states ──────────────────────────────────────────────────
  if (loading) return (
    <div className="flex items-center justify-center h-48">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-sm text-gray-400">Loading model…</span>
      </div>
    </div>
  );

  if (error) return (
    <div className="flex flex-col items-center justify-center h-32 gap-2 text-gray-400 text-sm">
      {error}
    </div>
  );

  if (!workbook || !sheetData) return null;

  return (
    <div
      className="flex flex-col h-full"
      style={{ fontFamily: 'Calibri, Segoe UI, Arial, sans-serif', fontSize: 11, background: '#fff' }}
    >
      {/* ── Download notice ─────────────────────────────────────────── */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '7px 14px', background: '#FFFBEB',
        borderBottom: '1px solid #FDE68A', flexShrink: 0,
      }}>
        <span style={{ fontSize: 13, color: '#92400E' }}>ℹ</span>
        <span style={{ fontSize: 11, color: '#78350F', lineHeight: 1.4 }}>
          This preview is a simplified render for reference. For full formatting, formulas, and interactivity, please download the model.
        </span>
      </div>

      {/* ── Sheet tabs ──────────────────────────────────────────────── */}
      <div style={{
        display: 'flex', alignItems: 'flex-end',
        background: '#F0F0F0', borderBottom: '1px solid #AEAEAE',
        overflowX: 'auto', flexShrink: 0, padding: '0 4px', gap: 2,
      }}>
        {workbook.SheetNames.map((name) => {
          const active   = name === activeSheet;
          const tabColor = getTabColor(workbook, name);
          return (
            <button
              key={name}
              onClick={() => setActiveSheet(name)}
              style={{
                position: 'relative', padding: '4px 14px 3px',
                fontSize: 11, fontWeight: active ? 600 : 400,
                whiteSpace: 'nowrap', cursor: 'pointer',
                border: '1px solid',
                borderBottom: 'none',
                borderRadius: '3px 3px 0 0',
                borderColor: active ? '#AEAEAE #AEAEAE transparent' : '#C8C8C8 #C8C8C8 #AEAEAE',
                background: active ? '#FFFFFF' : '#E4E4E4',
                color: active ? '#000' : '#555',
                marginBottom: active ? -1 : 0,
                zIndex: active ? 2 : 1,
              }}
            >
              {tabColor && (
                <span style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  height: active ? 3 : 4, background: tabColor,
                  borderRadius: '0 0 2px 2px',
                }} />
              )}
              {name}
            </button>
          );
        })}
      </div>

      {/* ── Formula bar ─────────────────────────────────────────────── */}
      <div style={{
        display: 'flex', alignItems: 'center', height: 24,
        background: '#F5F5F5', borderBottom: '1px solid #D4D4D4', flexShrink: 0,
      }}>
        <div style={{
          minWidth: 56, padding: '0 6px', fontSize: 11, fontWeight: 600,
          textAlign: 'center', color: '#333', borderRight: '1px solid #D4D4D4',
          height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {selectedAddr || ''}
        </div>
        <div style={{
          padding: '0 8px', color: '#888', fontSize: 11, fontStyle: 'italic',
          borderRight: '1px solid #D4D4D4', height: '100%',
          display: 'flex', alignItems: 'center',
        }}>
          fx
        </div>
        <div style={{
          flex: 1, padding: '0 8px', fontSize: 11, color: '#222',
          overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
        }}>
          {String(formulaValue)}
        </div>
      </div>

      {/* ── Spreadsheet grid ─────────────────────────────────────────── */}
      <div style={{ flex: 1, overflow: 'auto', position: 'relative' }}>
        <table style={{
          borderCollapse: 'collapse', tableLayout: 'fixed',
          width: 'max-content', fontSize: 11,
          fontFamily: 'Calibri, Segoe UI, Arial, sans-serif',
        }}>
          <colgroup>
            <col style={{ width: 42 }} />
            {sheetData.cols.map((col) => (
              <col key={col.ci} style={{ width: col.width }} />
            ))}
          </colgroup>

          {/* Column letters header */}
          <thead>
            <tr>
              <th style={{
                background: '#F2F2F2', border: '1px solid #C8C8C8',
                position: 'sticky', top: 0, left: 0, zIndex: 40,
                width: 42, minWidth: 42,
              }} />
              {sheetData.cols.map((col) => (
                <th key={col.ci} style={{
                  background: '#F2F2F2', border: '1px solid #C8C8C8',
                  textAlign: 'center', fontWeight: 400, fontSize: 11,
                  color: '#333', padding: '1px 2px',
                  position: 'sticky', top: 0, zIndex: 30, userSelect: 'none',
                  width: col.width, minWidth: col.width,
                }}>
                  {col.letter}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {sheetData.rows.map((row) => (
              <tr key={row.r} style={{ height: row.hpx }}>
                {/* Row number */}
                <td style={{
                  background: '#F2F2F2', border: '1px solid #C8C8C8',
                  textAlign: 'right', paddingRight: 5, color: '#666',
                  fontSize: 10, fontFamily: 'Arial, sans-serif',
                  position: 'sticky', left: 0, zIndex: 20,
                  userSelect: 'none', verticalAlign: 'middle',
                }}>
                  {row.r + 1}
                </td>

                {row.cells.map((cellData) =>
                  cellData.skip ? null : (
                    <Cell
                      key={cellData.key}
                      data={cellData}
                      isSelected={selectedAddr === cellData.addr}
                      onClick={handleCellClick}
                    />
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {sheetData.totalRows > MAX_ROWS && (
          <div style={{
            padding: '4px 8px', fontSize: 10, color: '#999',
            background: '#FAFAFA', borderTop: '1px solid #E8E8E8', textAlign: 'center',
          }}>
            Showing first {MAX_ROWS} of {sheetData.totalRows} rows — download the file for the full model.
          </div>
        )}
      </div>
    </div>
  );
};

export default ExcelViewer;

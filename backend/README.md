# Finance Portfolio Backend

A Flask-based REST API backend for managing equity research, investment ideas, and portfolio data.

## Features

- **Research Management**: Create, read, and manage equity research papers
- **Investment Ideas**: Store and retrieve investment theses with detailed analysis
- **Portfolio Profile**: Manage your professional profile and background
- **RESTful API**: Clean API endpoints for frontend integration
- **Database**: SQLite for development, configurable for production
- **CORS**: Enabled for frontend integration

## Tech Stack

- Flask 2.3.2
- SQLAlchemy (ORM)
- SQLite (development database)
- Python 3.8+

## Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:
   ```bash
   # macOS/Linux
   source venv/bin/activate
   
   # Windows
   venv\Scripts\activate
   ```

4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Configure environment variables:
   ```bash
   cp .env.example .env
   ```

6. Run the application:
   ```bash
   python app.py
   ```

The API will be available at `http://localhost:5000`

## API Endpoints

### Research Papers

- `GET /api/research` - Get all research papers
- `GET /api/research/<id>` - Get specific research paper
- `POST /api/research` - Create new research paper

**Example:**
```bash
curl -X POST http://localhost:5000/api/research \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Tech Sector Analysis",
    "sector": "Technology",
    "summary": "Analysis of tech stocks",
    "rating": "BUY"
  }'
```

### Investment Ideas

- `GET /api/investment-ideas` - Get all investment ideas
- `GET /api/investment-ideas/<id>` - Get specific idea
- `POST /api/investment-ideas` - Create new investment idea

**Example:**
```bash
curl -X POST http://localhost:5000/api/investment-ideas \
  -H "Content-Type: application/json" \
  -d '{
    "title": "AI Growth Thesis",
    "thesis": "AI companies will see exponential growth",
    "target_return": "+40%",
    "time_horizon": "2-3 Years",
    "risk_level": "High"
  }'
```

### Portfolio Profile

- `GET /api/profile` - Get profile information
- `POST /api/profile` - Create profile
- `PUT /api/profile` - Update profile

## Database Models

### ResearchPaper
- title (String)
- sector (String)
- summary (Text)
- content (Text)
- rating (String) - BUY, HOLD, SELL
- date (DateTime)

### InvestmentIdea
- title (String)
- thesis (Text)
- target_return (String)
- time_horizon (String)
- risk_level (String) - Low, Moderate, High
- date (DateTime)

### Portfolio
- name (String)
- bio (Text)
- email (String)
- linkedin (String)
- experience_years (Integer)

## Development

For local development with auto-reload:

```bash
python app.py
```

The server runs in debug mode and will automatically reload on file changes.

## Production Deployment

Set environment variables:
```bash
export FLASK_ENV=production
export SECRET_KEY=your-production-secret-key
```

Use a production-grade WSGI server like Gunicorn:
```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

## API Response Format

All responses are in JSON format:

**Success Response:**
```json
{
  "id": 1,
  "title": "Research Paper Title",
  "sector": "Technology",
  "summary": "Paper summary",
  "rating": "BUY",
  "date": "2026-01-20T10:30:00"
}
```

**Error Response:**
```json
{
  "error": "Error message"
}
```

## CORS Configuration

CORS is enabled for all routes. To restrict to specific origins, modify the CORS configuration in `app.py`.

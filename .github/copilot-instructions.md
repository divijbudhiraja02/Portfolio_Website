---
# Copilot Instructions for Finance Portfolio Website

This workspace contains a full-stack finance portfolio application with React frontend and Python Flask backend.

## Project Overview

- **Purpose**: Professional portfolio website for showcasing equity research and investment ideas
- **Frontend**: React with Tailwind CSS
- **Backend**: Flask with SQLAlchemy
- **Target**: Financial firms like JPMorgan Chase, Morgan Stanley

## Workspace Structure

```
frontend/          React application
backend/           Flask API backend
README.md          Main project documentation
```

## Key Guidelines

### Frontend Development
- Components are in `frontend/src/components/`
- Pages are in `frontend/src/pages/`
- Styles use Tailwind CSS in `frontend/tailwind.config.js`
- Use React Router for navigation

### Backend Development
- Main app is `backend/app.py`
- Models defined in `backend/app.py` (consider moving to separate files as project grows)
- Database is SQLite at `backend/portfolio.db`
- API follows RESTful conventions

### API Communication
- Frontend uses axios to call backend APIs
- Base URL: `http://localhost:5000`
- All endpoints return JSON

### Development Workflow
1. Frontend runs on port 3000
2. Backend runs on port 5000
3. Keep terminals for both running during development
4. Frontend has sample data fallback if backend unavailable

## Common Tasks

### Adding a New Page
1. Create component in `frontend/src/pages/`
2. Add route in `frontend/src/App.jsx`
3. Add navigation link in `frontend/src/components/Navbar.jsx`

### Adding a New API Endpoint
1. Create model if needed in `backend/app.py`
2. Add route function with @app.route decorator
3. Return JSON response
4. Test with curl or Postman before connecting frontend

### Customizing Profile
- Edit `frontend/src/pages/About.jsx` for frontend display
- Use `/api/profile` endpoints in backend for data persistence

## Important Files

- `frontend/package.json` - Frontend dependencies
- `backend/requirements.txt` - Backend dependencies
- `frontend/src/App.jsx` - Main frontend routing
- `backend/app.py` - Main backend application
- `frontend/tailwind.config.js` - Tailwind CSS configuration

## Before Running

1. Backend: `python -m venv venv && source venv/bin/activate && pip install -r requirements.txt`
2. Frontend: `npm install`
3. Run backend: `cd backend && python app.py`
4. Run frontend: `cd frontend && npm start`

## Tips for Enhancement

- Add authentication for admin functions
- Implement file uploads for research papers
- Add search functionality for research
- Create filters by sector/risk level
- Add email notifications for new ideas
- Implement user comments/discussions

## Database

SQLite database stored at `backend/portfolio.db`. To reset:
```bash
rm backend/portfolio.db
# Restart backend to recreate
```

## Deployment Notes

- Frontend: Build with `npm run build` and deploy to Vercel/Netlify
- Backend: Use Gunicorn for production
- Update API URLs for production environment
- Set proper environment variables

---

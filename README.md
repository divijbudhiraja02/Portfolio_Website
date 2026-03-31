# Finance Portfolio Website

A professional full-stack portfolio website designed to showcase equity research, investment ideas, and financial expertise to top-tier companies like JPMorgan Chase and Morgan Stanley.

## Overview

This project is built with:
- **Frontend**: React 18 with Tailwind CSS for a modern, responsive UI
- **Backend**: Flask with SQLAlchemy for robust API endpoints
- **Database**: SQLite (development) / Configurable for production

## Project Structure

```
Portfolio_Website/
├── frontend/                 # React frontend application
│   ├── public/              # Static files
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── App.jsx          # Main app component
│   │   └── index.js         # Entry point
│   ├── package.json         # Frontend dependencies
│   └── README.md            # Frontend documentation
├── backend/                 # Flask backend application
│   ├── app.py              # Main Flask application
│   ├── config.py           # Configuration settings
│   ├── requirements.txt     # Python dependencies
│   └── README.md           # Backend documentation
└── README.md               # This file
```

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- Python 3.8+
- Git

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Create and activate virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # macOS/Linux
   # or
   venv\Scripts\activate      # Windows
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the backend:
   ```bash
   python app.py
   ```

   Backend will run at `http://localhost:5000`

### Frontend Setup

1. In a new terminal, navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

   Frontend will open at `http://localhost:3000`

## Features

### Frontend
- **Home Page**: Hero section with portfolio overview and key statistics
- **Research Portal**: Display equity research papers with ratings and summaries
- **Investment Ideas**: Showcase conviction investment theses with target returns and risk levels
- **About Page**: Professional profile highlighting experience and achievements
- **Responsive Design**: Mobile-friendly interface using Tailwind CSS
- **Navigation**: Smooth routing between sections

### Backend
- **RESTful API**: Clean endpoints for all data management
- **Research Management**: Create and retrieve equity research papers
- **Investment Tracking**: Store and manage investment ideas with analysis
- **Profile Management**: Manage professional profile information
- **Database**: Structured data storage with SQLAlchemy ORM
- **Error Handling**: Comprehensive error responses

## API Endpoints

### Research
- `GET /api/research` - Get all research papers
- `GET /api/research/<id>` - Get specific paper
- `POST /api/research` - Create new research paper

### Investment Ideas
- `GET /api/investment-ideas` - Get all ideas
- `GET /api/investment-ideas/<id>` - Get specific idea
- `POST /api/investment-ideas` - Create new idea

### Profile
- `GET /api/profile` - Get profile info
- `POST /api/profile` - Create profile
- `PUT /api/profile` - Update profile

### Health
- `GET /api/health` - Backend health check

## Customization

### Update Your Information

1. **Frontend Profile** - Edit [frontend/src/pages/About.jsx](frontend/src/pages/About.jsx)
   - Update your name, title, and bio
   - Add your contact information
   - Update achievements and skills

2. **Footer** - Edit [frontend/src/components/Footer.jsx](frontend/src/components/Footer.jsx)
   - Add your email and LinkedIn
   - Customize company information

3. **Backend Profile** - Use the `/api/profile` endpoint to store information

### Adding Research Papers

Use the POST endpoint to add research:

```bash
curl -X POST http://localhost:5000/api/research \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Your Research Title",
    "sector": "Technology",
    "summary": "Summary of your research",
    "rating": "BUY"
  }'
```

### Adding Investment Ideas

```bash
curl -X POST http://localhost:5000/api/investment-ideas \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Investment Thesis",
    "thesis": "Your investment thesis",
    "target_return": "+30%",
    "time_horizon": "2-3 Years",
    "risk_level": "Moderate"
  }'
```

## Technologies Used

### Frontend
- React 18
- React Router
- Tailwind CSS
- Axios
- React Icons
- Chart.js

### Backend
- Flask
- Flask-CORS
- Flask-SQLAlchemy
- SQLAlchemy
- Python-dotenv

## Development Tips

1. **Frontend Hot Reload**: Changes to React components auto-reload in browser
2. **Backend Auto-Reload**: Flask runs in debug mode with auto-reload
3. **Database**: SQLite database file created automatically on first run
4. **API Testing**: Use curl or Postman to test backend endpoints

## Deployment

### Frontend Deployment (Vercel, Netlify)
```bash
cd frontend
npm run build
# Deploy the build folder
```

### Backend Deployment (Heroku, AWS, etc.)
```bash
# Create production-grade deployment with Gunicorn
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

## Best Practices

1. **Research Quality**: Ensure all research papers are thoroughly analyzed
2. **Data Accuracy**: Keep all financial data and metrics accurate
3. **Professional Tone**: Maintain a professional tone throughout
4. **Regular Updates**: Continuously add new research and ideas
5. **Security**: Use environment variables for sensitive information

## Performance Tips

- Optimize images before uploading
- Use lazy loading for research papers
- Implement pagination for large datasets
- Cache API responses appropriately

## Troubleshooting

### Backend won't start
- Ensure Python 3.8+ is installed
- Check if port 5000 is available
- Verify all dependencies: `pip install -r requirements.txt`

### Frontend won't start
- Clear npm cache: `npm cache clean --force`
- Delete node_modules and reinstall: `rm -rf node_modules && npm install`
- Check if port 3000 is available

### CORS errors
- Ensure backend is running on port 5000
- Check CORS configuration in [backend/app.py](backend/app.py)

## Next Steps

1. Customize profile with your information
2. Add your equity research papers
3. Create investment theses
4. Test all features in development
5. Deploy frontend and backend to production
6. Monitor and update regularly

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, refer to the individual README files in frontend and backend directories.

---

Built with ❤️ for aspiring finance professionals

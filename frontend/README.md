# Finance Portfolio Frontend

A professional React-based portfolio website for showcasing equity research and investment ideas.

## Features

- **Responsive Design**: Mobile-friendly interface built with Tailwind CSS
- **Research Portal**: Display and manage equity research reports
- **Investment Ideas**: Showcase conviction investment theses
- **Professional Profile**: About section highlighting experience and achievements
- **Modern UI**: Clean, professional design suitable for institutional presentations

## Tech Stack

- React 18
- React Router for navigation
- Tailwind CSS for styling
- Axios for API calls
- Chart.js for data visualization

## Installation

1. Navigate to the frontend directory:
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

The app will open at `http://localhost:3000`

## Project Structure

```
src/
├── components/        # Reusable components (Navbar, Footer)
├── pages/            # Page components (Home, Research, etc.)
├── App.jsx           # Main app component
└── index.js          # Entry point
```

## Building for Production

```bash
npm run build
```

## Environment Variables

Create a `.env` file in the frontend directory:

```
REACT_APP_API_URL=http://localhost:5000
```

## Notes

- Update profile information in `About.jsx`
- Add your contact information in the Footer and About page
- Customize colors and styling in `tailwind.config.js`

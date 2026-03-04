# Phase 1 - E-Commerce Product Catalog

## Prerequisites

- Node.js (v18 or higher)
- npm

## Getting Started

### 1. Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Start the Backend Server

```bash
cd backend
npm start
```

The backend will run at `http://localhost:3001`

### 3. Start the Frontend (in a new terminal)

```bash
cd frontend
npm run dev
```

The frontend will run at `http://localhost:5173`

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/products` | GET | Returns all products |
| `/api/categories` | GET | Returns unique categories |

## Project Structure

```
phase-1/
├── backend/
│   ├── server.js       # Express server
│   └── package.json
└── frontend/
    ├── src/
    │   ├── App.jsx           # Main application
    │   └── components/
    │       ├── Header.jsx    # Store header
    │       ├── Sidebar.jsx   # Category sidebar
    │       ├── ProductGrid.jsx
    │       └── ProductCard.jsx
    └── package.json
```

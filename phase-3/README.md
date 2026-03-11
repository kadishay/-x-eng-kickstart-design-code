# Phase 3 - E-Commerce Cart Checkout

This phase builds on Phase 2 by adding shopping cart functionality with checkout.

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
| `/api/products` | GET | Returns paginated products |
| `/api/categories` | GET | Returns unique categories |
| `/api/cart` | GET | Returns cart items and total |
| `/api/cart/items` | POST | Add item to cart |
| `/api/cart/items/:productId` | PATCH | Update item quantity |
| `/api/cart/items/:productId` | DELETE | Remove item from cart |
| `/api/cart/checkout` | POST | Complete purchase and clear cart |

## Cart API Details

### Add to Cart
```bash
POST /api/cart/items
Content-Type: application/json

{ "productId": 1, "quantity": 1 }
```

### Update Quantity
```bash
PATCH /api/cart/items/1
Content-Type: application/json

{ "quantity": 3 }
```

### Checkout
```bash
POST /api/cart/checkout
```

Returns order confirmation with `orderId`.

## Project Structure

```
phase-3/
├── backend/
│   ├── server.js       # Express server with cart endpoints
│   └── package.json
└── frontend/
    ├── src/
    │   ├── App.jsx           # Main application with cart state
    │   └── components/
    │       ├── Header.jsx    # Store header with cart badge
    │       ├── Sidebar.jsx   # Category sidebar
    │       ├── ProductGrid.jsx
    │       ├── ProductCard.jsx  # With Add to Cart button
    │       └── Cart.jsx      # Cart panel component
    └── package.json
```

## Features Added in Phase 3

- **Add to Cart**: Click button on product cards to add items
- **Cart Badge**: Header shows item count
- **Cart Panel**: Slide-out panel showing cart items
- **Quantity Controls**: Increase/decrease item quantities
- **Remove Items**: Remove items from cart
- **Checkout**: Complete purchase and receive order confirmation
- **In-memory Storage**: Cart persists on server during session

# Full-Stack Interview: Wix E-Commerce Catalog

## Overview

You'll build a product catalog application using the provided JSON database. Use any framework you're comfortable with for the selection available.

## Setup

You're provided with:
- `products.json` containing 50,000 e-commerce products
- `design.png` - reference design for the UI (your implementation should follow this layout)

Each product has:
- `id`, `name`, `description`, `price`
- `category`, `subcategory`, `brand`
- `stock`, `rating`, `reviewCount`
- `image` (URL), `tags` (array), `createdAt`

## Requirements

### Phase 1: Basic Display
- Create a backend API that serves product data
- Create a frontend that displays products based on the design provided in (design.png)

### Phase 2: Pagination
- The page is slow with 50,000 products. Implement pagination to show 20 products at start.
- API should return pagination metadata
- Frontend should have a pagination control button to show more products at the end of the list

### Phase 3: Cart Checkout
Based on your design from the previous phase, implement cart functionality:
- `POST /api/cart/items` - Add an item to the cart
- `GET /api/cart` - Get all items in the cart with total price
- `POST /api/cart/checkout` - Complete the purchase and clear the cart

Notes:
- Store cart data in-memory on the server (or a JSON file)
- A user has one active cart; the cart clears after checkout
- No need to manage inventory - assume unlimited stock

### Phase 4: Polish & Discussion
- Improve the code architecture and apply best practices.

## Design Reference

Your UI should be based on `design.png`, which shows:
- Header with store logo and search bar
- Left sidebar with category filters, price range, and availability toggle
- Product grid displaying: image, name, rating, and price
- Sort dropdown and breadcrumb navigation

You don't need to match it pixel-perfect, but follow the general layout and structure.

## Technical Guidelines

### API Design
- Use RESTful conventions with proper HTTP methods
- Return appropriate HTTP status codes (200, 400, 404, 500)
- Use consistent response structure

### Code Quality
- Separate concerns (routes, controllers, services)
- Handle errors gracefully
- Use environment variables for configuration
- Add loading and error states in the UI

## General Guidelines

- Think out loud - explain your decisions
- Ask clarifying questions if needed
- Focus on working code over perfect code
- It's okay to look up syntax

Good luck!

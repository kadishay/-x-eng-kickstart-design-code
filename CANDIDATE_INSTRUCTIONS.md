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
- Implement server-side pagination (20 items per page)
- API should return pagination metadata
- Frontend should have a pagination control button to show more products at the end of the list

### Phase 3: Filtering & Search
- Add category filter
- Add text search (by product name)
- Filters should work together
- Pagination should work with filters

### Phase 4: Polish & Discussion (15 min)


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

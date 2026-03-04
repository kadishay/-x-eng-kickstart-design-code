# Full-Stack Interview: E-Commerce Catalog

## Overview

You'll build a product catalog application using the provided JSON database. Use any framework you're comfortable with (React, Vue, Angular, etc. for frontend; Node, Express, etc. for backend).

## Setup

You're provided with:
- `products.json` containing 20000 e-commerce products
- `design.png` - reference design for the UI (your implementation should follow this layout)

Each product has:
- `id`, `name`, `description`, `price`
- `category`, `subcategory`, `brand`
- `stock`, `rating`, `reviewCount`
- `image` (URL), `tags` (array), `createdAt`

## Requirements

### Phase 1: Basic Display
- Create a backend API that serves product data
- Create a frontend that displays products (grid/list)
- Show: name, price, category, image (at minimum)

### Phase 2: Pagination
- Implement server-side pagination (20 items per page)
- API should return pagination metadata
- Frontend should have a pagination control button to show more products at the end of the list

### Phase 3: Filtering & Search
- Add category filter
- Add text search (by product name)
- Filters should work together
- Pagination should work with filters

## Design Reference

Your UI should be based on `design.png`, which shows:
- Header with store logo and search bar
- Left sidebar with category filters, price range, and availability toggle
- Product grid displaying: image, name, rating, and price
- Sort dropdown and breadcrumb navigation

You don't need to match it pixel-perfect, but follow the general layout and structure.

## Technical Guidelines

### API Design
- Use RESTful conventions with proper HTTP methods:
  - `GET` for retrieving data
  - `POST` for creating resources
  - `PUT/PATCH` for updates
  - `DELETE` for removals
- Return appropriate HTTP status codes (200, 400, 404, 500)
- Use consistent response structure

### Scaling Considerations
- Think about how your solution would handle 50,000+ products
- Consider database indexing for filtered fields
- Be mindful of payload sizes and response times
- Consider caching strategies where appropriate

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

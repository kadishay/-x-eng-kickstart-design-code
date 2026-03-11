# Full-Stack Wix E-Commerce Catalog Coding Interview Guide

**Duration:** 60 minutes
**Format:** Live coding with discussion
**Stack:** Candidate's choice of framework, from the available selection.

---

## Overview

The candidate will build an e-commerce product catalog using a provided JSON database. The interview progresses through phases of increasing complexity.

---

## Pre-Interview Setup

1. Let the candidate know that they can use any framework they're comfortable with for the selection available.
2. Verify the candidate understands the task and answer any questions they may have.
3. Ensure they noticed the `design.png` (UI reference) and `products.json` (50,000 products).

---

## Phase 1: Basic Setup & Data Display (15 min)

### Task
"Build a simple backend API that serves product data from the JSON file, and a frontend that displays the products. Use the provided design.png as a reference for the UI layout."

### Requirements
- Backend endpoint: `GET /api/products` - returns all products
- Frontend displays products in a grid layout (following the design reference)
- Show at minimum: name, price, rating, image
- Include a header with search bar placeholder
- Include a sidebar structure for future filters
- Page loding will be slow due to lack of pagination (will be handeled in phase 2).

### Design Implementation
Candidates should reference `design.png` and implement:
- Header with logo and search input
- Left sidebar with category list and filters
- Product grid with cards showing image, name, rating, price
- Responsive considerations (screen resize)
- The design is a reference; result should not be pixel-perfect. 

### What to Look For

| Area | Green Flags | Red Flags |
|------|-------------|-----------|
| **Project Setup** | Quick scaffolding, knows their tools | Struggles with basic setup, unclear folder structure |
| **API Design** | Clean endpoint structure, proper HTTP methods | Inconsistent naming, GET returning 50000 items without concern |
| **Data Loading** | Reads JSON correctly, handles file path | Hardcoded paths, no error handling for missing file |
| **Frontend State** | Proper state management, loading states | No loading indicator, state mixed everywhere |
| **Code Organization** | Separates concerns early | Everything in one file |

### Discussion Points
- "Why did you choose to structure the API this way?"
- "What happens if the JSON file doesn't exist? (a databased solution, added latency)."
- "I notice all 50,000 products are being returned and rendered, and the page is slow - how do you suggest we should fix this?"

---

## Phase 2: Pagination (15 min)

### Task
"The page is slow with 50,000 products. Implement pagination to show 20 products per page."

### Requirements
- Server-side pagination
- `GET /api/products?page=1&limit=20`
- Return pagination metadata (total, pages, current page)
- Frontend pagination controls

### What to Look For

| Area | Green Flags | Red Flags |
|------|-------------|-----------|
| **API Design** | Proper query params, metadata in response | No total count, no page metadata |
| **Implementation** | Correct slice logic, 1-indexed vs 0-indexed awareness | Off-by-one errors, wrong page results |
| **Response Structure** | `{ data: [], meta: { total, page, limit, pages }}` | Flat array with no metadata |
| **Cient Side Pagination** | Server pagination | Flat array with no metadata | Loads 50000 items, slices on frontend |
| **Edge Cases** | Handles empty pages, last page with fewer items | Crashes on invalid page numbers |

### Discussion Points
- "How would the implementation look like if you had a database instead of a JSON file? (fetching from a database)"
- "How would you implement 'infinite scroll' instead?"
- "What's the performance difference between OFFSET pagination and cursor-based?"

---

## Phase 3: Cart Checkout (15 min)

### Task
"Based on your design from the previous phase, implement cart functionality with these APIs:
- `POST /api/cart/items` - Add an item to the cart
- `GET /api/cart` - Get all items in the cart with total price
- `POST /api/cart/checkout` - Complete the purchase and clear the cart"

### Requirements
- Store cart data in-memory on the server (object/Map) or a JSON file
- Adding an existing item should increment quantity (not duplicate)
- Cart should include items with quantities and calculated total
- Checkout clears the cart and returns an order confirmation
- No inventory management needed - assume unlimited stock

### Interviewer Notes
- For simplicity, assume a single user (no userId needed unless they ask)
- If they ask about persistence: "In-memory is fine for this exercise, but how would you handle server restarts?" (good discussion point)
- Cart structure suggestion: `{ items: [{ productId, quantity, price, name }], total }`

### What to Look For

| Area | Green Flags | Red Flags |
|------|-------------|-----------|
| **Data Structure** | Clean cart object, items with quantities, computed total | Flat array of items, no quantity handling |
| **Add to Cart** | Finds existing item and increments qty, or adds new | Duplicates items, doesn't check if exists |
| **Price Calculation** | Calculates total from items × quantities, handles decimals | Hardcoded total, floating point errors |
| **Checkout Flow** | Validates cart not empty, clears cart, returns confirmation | No validation, cart not cleared |
| **API Design** | RESTful endpoints, proper HTTP methods and status codes | Inconsistent routes, wrong methods (GET for mutations) |
| **Error Handling** | Handles invalid productId, empty cart checkout | Crashes on edge cases |

### Discussion Points
- "How would you persist the cart if the server restarts?"
- "How would you handle multiple users with separate carts?"
- "What if a product's price changes while it's in someone's cart?"
- "How would this scale with a real database? What would you index?"

---

## Phase 4: Polish & Discussion (15 min)


### Task (Optional Implementation)
Pick ONE based on remaining time and candidate level:
- **Sorting**: Add sort by price/name/rating
- **Product Detail**: Click to view product details
- **Filtering & Search**: Add category filter and text search
- **Error Handling**: Proper error states throughout

### Architecture Discussion
Use remaining time for deeper technical discussion:

1. **Scaling Questions**
   - "How would you handle 1 million products?"
   - "What if multiple users are updating inventory simultaneously?"
   - "How would you implement full-text search?" (Elasticsearch, PostgreSQL full-text)
   - "How would you store 1M products?" (indexing, denormalization, latancy, sharding)
   - "What would you cache and how?" (Redis, CDN, HTTP cache headers)

2. **Production Readiness**
   - "What's missing before this goes to production?"
   - "How would you test this application?"
   - "What monitoring would you add?"
   - "Where do you see the biggest issues with the current implementation?"
   - "What would you refactor given more time?"

3. **Design Decisions**
   - "Walk me through your component structure"
   - "Why did you choose [X framework/pattern]?"
   - "What would you refactor given more time?"

4. **User Experience**
   - "How would you improve the user experience?"
   - "What features would you add?"
   - "How would you improve the performance?"

---

## Parameters to evaluate AI usage:
1. **Ownership of the Solution**: can reason about logic, implementation decisions, complexity, and trade-offs.
Evaluate: by asking questions about implementation details.
Red flag: can’t explain.
2. **AI-Guided, Not AI-Led**: validates, improves, and critiques AI output.
Evaluate: reviews, corrects, and improves AI-generated code. Discards incorrect suggestions. Able to code & debug independently.
Red flag: AI-incapacitated. Loop of copy-pasting the AI output, running the code, and sending back the output\error to the AI. 
3. **Iterative Thinking and Improving**: formulates clear, gradual prompts, progresses iteratively, and asks clarifying questions. 
Evaluate: prompts clear, intentional questions, and fixes the code surgically with small insertions.
Red flag: continuously replaces large amounts of code generated by AI.
4. **Avoiding AI Overwhelm**: The candidate should avoid being overwhelmed by a large amount of AI outputs.  
Evaluate: demonstrate strong communication skills.
Red flag: overwhelmed and unable to communicate.
5. **AI Boosted**: Use AI to boost delivery.
Evaluate: gets to the advanced phases of the exercise.
Red flag: stuck in early phases.

**Bottom line KPI: Positive AI usage — boosted, but in control.**

---

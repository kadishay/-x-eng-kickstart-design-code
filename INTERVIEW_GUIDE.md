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
| **Edge Cases** | Handles empty pages, last page with fewer items | Crashes on invalid page numbers |

### Discussion Points
- "How would the implementation look like if you had a database instead of a JSON file? (fetching from a database)"
- "How would you implement 'infinite scroll' instead?"
- "What's the performance difference between OFFSET pagination and cursor-based?"

---

## Phase 3: Filtering & Search (15 min)

### Task
"Add filtering by category and a search feature that searches by product name."

### Requirements
- Category filter (dropdown or similar)
- Text search that filters by product name
- Filters should work together (AND logic)
- Pagination should work with filters
- Can be client-side or server-side (note which they choose)

### What to Look For

| Area | Green Flags | Red Flags |
|------|-------------|-----------|
| **Filter Location** | Thoughtful choice (client vs server), can explain tradeoffs | No awareness that this is a decision |
| **Search Implementation** | Debounced input, case-insensitive | Fires on every keystroke, case-sensitive |
| **State Management** | Clean filter state, URL params consideration | Filters don't compose, messy state |
| **UX Considerations** | Clear active filters, reset option | Unclear which filters are active |
| **Performance** | Memoization if client-side, indexed if server-side | Re-renders entire list on filter change |
| **Filter Integration** | Filters + pagination work together, resets to page 1 on filter | Pagination breaks when filtering |

### Discussion Points
- "You implemented filters on the [client/server] - what are the tradeoffs?"
- "How would this scale to 50,000 products?"
- "What if we wanted to deep-link to a filtered view?"

---

## Phase 4: Polish & Discussion (15 min)


### Task (Optional Implementation)
Pick ONE based on remaining time and candidate level:
- **Sorting**: Add sort by price/name/rating
- **Product Detail**: Click to view product details
- **Cart Preview**: Add to cart functionality
- **Error Handling**: Proper error states throughout

### Architecture Discussion
Use remaining time for deeper technical discussion:

1. **Scaling Questions**
   - "How would you handle 1 million products?"
   - "What if multiple users are updating inventory simultaneously?"
   - "How would you add full-text search?"

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

## Evaluation Criteria

### Technical Skills (40%)
- [ ] Correct implementation of all phases
- [ ] Proper API design (RESTful, correct status codes)
- [ ] Clean state management
- [ ] Error handling
- [ ] Performance awareness

### Code Quality (30%)
- [ ] Readable, maintainable code
- [ ] Appropriate abstractions (not over-engineered)
- [ ] Consistent naming conventions
- [ ] Separation of concerns

### Problem Solving (20%)
- [ ] Breaks down problems effectively
- [ ] Asks clarifying questions
- [ ] Handles ambiguity well
- [ ] Recovers from mistakes gracefully

### Communication (10%)
- [ ] Explains thought process
- [ ] Discusses tradeoffs
- [ ] Accepts feedback well
- [ ] Collaborative attitude

---

## Scoring Guide

| Level | Phase 1 | Phase 2 | Phase 3 | Discussion |
|-------|---------|---------|---------|------------|
| **Junior** | Completes with guidance | Partial completion | Started | Basic awareness |
| **Mid** | Completes quickly | Completes | Completes with minor issues | Good tradeoff discussion |
| **Senior** | Excellent structure | Excellent + URL state | Perfect + edge cases | Deep architecture insights |

---

## Common Candidate Mistakes (Red Flags)

1. **No loading states** - Shows blank screen while data loads
2. **Fetching all data for pagination** - Loads 50000 items, slices on frontend
3. **No error handling** - Crashes on network failure
4. **Case-sensitive search** - "Headphones" doesn't find "headphones"
5. **Memory leaks** - Not cleaning up effects/subscriptions
6. **Filter state lost** - Changing page resets filters
7. **No input debouncing** - API called on every keystroke
8. **Hardcoded values** - Magic numbers everywhere

---

## Hints to Give (if candidate is stuck)

**Phase 1:**
- "Have you considered using a loading state?"
- "What does your API response structure look like?"

**Phase 2:**
- "Should the filtering happen on the client or server?"
- "How might you combine multiple filter conditions?"

**Phase 3:**
- "What information does the frontend need to render pagination?"
- "What should happen to the page number when filters change?"

---

## Sample Product Data Structure

```json
{
  "id": 1,
  "name": "Premium Wireless Headphones",
  "description": "High-quality audio with deep bass...",
  "price": 149.99,
  "category": "Electronics",
  "subcategory": "Audio",
  "brand": "SoundMax",
  "stock": 45,
  "rating": 4.5,
  "reviewCount": 234,
  "image": "https://picsum.photos/seed/prod1/400/400",
  "tags": ["wireless", "bluetooth", "noise-cancelling"],
  "createdAt": "2024-01-15"
}
```

**Categories:** Electronics, Sports, Home, Kitchen, Fashion, Health, Furniture, Beauty, Office, Food & Beverages

---

---

## Technical Expectations

### HTTP Methods & REST Conventions
Candidates should demonstrate understanding of:
- `GET` for retrieving resources (products, categories)
- `POST` for creating resources (if applicable)
- `PUT/PATCH` for updates, `DELETE` for removals
- Proper HTTP status codes:
  - `200` - Success
  - `400` - Bad request (invalid query params)
  - `404` - Resource not found
  - `500` - Server error

### API Response Structure
Expect well-structured responses:
```json
{
  "data": [...],
  "meta": {
    "total": 50000,
    "page": 1,
    "limit": 20,
    "pages": 1000
  }
}
```

### Scaling Considerations (Discussion Points)
Use these to gauge senior-level thinking:
- **Database**: "How would you store 1M products?" (indexing, denormalization, latancy, sharding)
- **Search**: "How would you implement full-text search?" (Elasticsearch, PostgreSQL full-text)
- **Caching**: "What would you cache and how?" (Redis, CDN, HTTP cache headers)
- **Pagination**: "OFFSET vs cursor-based pagination tradeoffs?"
- **Filtering**: "How would you handle complex filter combinations efficiently?"

### Code Architecture Expectations
| Level | Expected Structure |
|-------|-------------------|
| **Junior** | Working code, may be in few files |
| **Mid** | Separated routes/controllers, basic error handling |
| **Senior** | Service layer, middleware, validation, proper typing |

### Design Implementation
Candidates should reference `design.png` and implement:
- Header with logo and search input
- Left sidebar with category list and filters
- Product grid with cards showing image, name, rating, price
- Responsive considerations (screen resize)
- The design is a reference; result should not be pixel-perfect.

---

# Full-Stack E-Commerce Interview

A progressive coding interview for evaluating full-stack engineering candidates. Candidates build an e-commerce product catalog through increasingly complex phases.

## Overview

- **Duration:** 60 minutes
- **Format:** Live coding with discussion
- **Stack:** Candidate's choice (React/Vue/Angular + Node/Express)

## Repository Structure

```
├── CANDIDATE_INSTRUCTIONS.md   # Instructions to share with candidate
├── INTERVIEW_GUIDE.md          # Interviewer guide with evaluation criteria
├── design.png                  # UI reference design
├── products.json               # 50,000 product dataset
├── generate-products.js        # Script to regenerate products
├── phase-1/                    # Solution: Basic display
├── phase-2/                    # Solution: Pagination
└── phase-3/                    # Solution: Cart checkout
```

## Interview Phases

| Phase | Focus | Time |
|-------|-------|------|
| **Phase 1** | Basic API + Product Display | 15 min |
| **Phase 2** | Server-side Pagination | 15 min |
| **Phase 3** | Cart & Checkout | 15 min |
| **Phase 4** | Discussion & Polish | 15 min |

## Quick Start

### For Interviewers

1. Share with candidate:
   - `CANDIDATE_INSTRUCTIONS.md`
   - `design.png`
   - `products.json`

2. Reference `INTERVIEW_GUIDE.md` for evaluation criteria

### Running Solutions

Each phase directory contains a working solution:

```bash
# Phase 1, 2, or 3
cd phase-X/backend && npm install && npm start
cd phase-X/frontend && npm install && npm run dev
```

- Backend: http://localhost:3001
- Frontend: http://localhost:5173

## API Endpoints

### Products (Phase 1-2)
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/products` | GET | Paginated products (`?page=1&limit=20`) |
| `/api/categories` | GET | List of categories |

### Cart (Phase 3)
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/cart` | GET | Get cart contents |
| `/api/cart/items` | POST | Add item to cart |
| `/api/cart/items/:id` | PATCH | Update quantity |
| `/api/cart/items/:id` | DELETE | Remove item |
| `/api/cart/checkout` | POST | Complete purchase |

## Evaluation Criteria

See `INTERVIEW_GUIDE.md` for detailed rubrics covering:
- Technical implementation
- Code quality & organization
- Problem-solving approach
- Communication & collaboration

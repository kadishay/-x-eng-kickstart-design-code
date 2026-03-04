import express from 'express';
import cors from 'cors';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Load products data
let products = [];

async function loadProducts() {
  try {
    const dataPath = join(__dirname, '../../products.json');
    const data = await readFile(dataPath, 'utf-8');
    const parsed = JSON.parse(data);
    products = parsed.products;
    console.log(`Loaded ${products.length} products`);
  } catch (error) {
    console.error('Error loading products:', error.message);
    process.exit(1);
  }
}

// GET /api/products - returns paginated products
app.get('/api/products', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;

  // Validate pagination params
  if (page < 1 || limit < 1 || limit > 100) {
    return res.status(400).json({ error: 'Invalid pagination parameters' });
  }

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedProducts = products.slice(startIndex, endIndex);
  const totalPages = Math.ceil(products.length / limit);

  res.json({
    data: paginatedProducts,
    meta: {
      total: products.length,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    }
  });
});

// GET /api/categories - returns unique categories
app.get('/api/categories', (req, res) => {
  const categories = [...new Set(products.map(p => p.category))].sort();
  res.json({ data: categories });
});

// Start server
loadProducts().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});

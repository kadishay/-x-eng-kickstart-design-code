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

// GET /api/products - returns all products
app.get('/api/products', (req, res) => {
  res.json({
    data: products,
    meta: {
      total: products.length
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

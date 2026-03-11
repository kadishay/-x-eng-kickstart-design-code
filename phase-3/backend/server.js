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

// In-memory cart storage
// Structure: { items: [{ productId, name, price, image, quantity }], total: number }
let cart = { items: [], total: 0 };

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

// Helper function to calculate cart total
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
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

// ============================================
// CART API ENDPOINTS
// ============================================

// GET /api/cart - Get all items in the cart with total price
app.get('/api/cart', (req, res) => {
  res.json({
    data: cart
  });
});

// POST /api/cart/items - Add an item to the cart
app.post('/api/cart/items', (req, res) => {
  const { productId, quantity = 1 } = req.body;

  // Validate productId
  if (!productId) {
    return res.status(400).json({ error: 'productId is required' });
  }

  // Find the product
  const product = products.find(p => p.id === productId);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  // Check if item already exists in cart
  const existingItem = cart.items.find(item => item.productId === productId);

  if (existingItem) {
    // Increment quantity
    existingItem.quantity += quantity;
  } else {
    // Add new item
    cart.items.push({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity
    });
  }

  // Recalculate total
  cart.total = calculateTotal(cart.items);

  res.status(200).json({
    message: 'Item added to cart',
    data: cart
  });
});

// DELETE /api/cart/items/:productId - Remove an item from the cart
app.delete('/api/cart/items/:productId', (req, res) => {
  const productId = parseInt(req.params.productId);

  const itemIndex = cart.items.findIndex(item => item.productId === productId);
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found in cart' });
  }

  cart.items.splice(itemIndex, 1);
  cart.total = calculateTotal(cart.items);

  res.json({
    message: 'Item removed from cart',
    data: cart
  });
});

// PATCH /api/cart/items/:productId - Update item quantity
app.patch('/api/cart/items/:productId', (req, res) => {
  const productId = parseInt(req.params.productId);
  const { quantity } = req.body;

  if (quantity === undefined || quantity < 0) {
    return res.status(400).json({ error: 'Valid quantity is required' });
  }

  const item = cart.items.find(item => item.productId === productId);
  if (!item) {
    return res.status(404).json({ error: 'Item not found in cart' });
  }

  if (quantity === 0) {
    // Remove item if quantity is 0
    cart.items = cart.items.filter(item => item.productId !== productId);
  } else {
    item.quantity = quantity;
  }

  cart.total = calculateTotal(cart.items);

  res.json({
    message: 'Cart updated',
    data: cart
  });
});

// POST /api/cart/checkout - Complete the purchase and clear the cart
app.post('/api/cart/checkout', (req, res) => {
  // Validate cart is not empty
  if (cart.items.length === 0) {
    return res.status(400).json({ error: 'Cannot checkout with an empty cart' });
  }

  // Create order (simulate payOrder API)
  const order = {
    orderId: `ORD-${Date.now()}`,
    items: [...cart.items],
    total: cart.total,
    status: 'completed',
    createdAt: new Date().toISOString()
  };

  // Clear the cart
  cart = { items: [], total: 0 };

  res.json({
    message: 'Checkout successful',
    data: order
  });
});

// Start server
loadProducts().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});

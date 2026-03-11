import { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ProductGrid from './components/ProductGrid';
import Cart from './components/Cart';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [total, setTotal] = useState(0);
  const limit = 20;

  // Cart state
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [cartOpen, setCartOpen] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);

  useEffect(() => {
    async function fetchCategories() {
      const res = await fetch('http://localhost:3001/api/categories');
      if (res.ok) {
        const data = await res.json();
        setCategories(data.data);
      }
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    async function fetchInitialProducts() {
      try {
        setLoading(true);
        const res = await fetch(
          `http://localhost:3001/api/products?page=1&limit=${limit}`
        );

        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }

        const data = await res.json();
        setProducts(data.data);
        setHasNextPage(data.meta.hasNextPage);
        setTotal(data.meta.total);
        setPage(1);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchInitialProducts();
  }, []);

  // Fetch cart on mount
  useEffect(() => {
    async function fetchCart() {
      try {
        const res = await fetch('http://localhost:3001/api/cart');
        if (res.ok) {
          const data = await res.json();
          setCart(data.data);
        }
      } catch (err) {
        console.error('Failed to fetch cart:', err);
      }
    }
    fetchCart();
  }, []);

  const handleLoadMore = useCallback(async () => {
    if (loadingMore || !hasNextPage) return;

    try {
      setLoadingMore(true);
      const nextPage = page + 1;
      const res = await fetch(
        `http://localhost:3001/api/products?page=${nextPage}&limit=${limit}`
      );

      if (!res.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await res.json();
      setProducts(prev => [...prev, ...data.data]);
      setHasNextPage(data.meta.hasNextPage);
      setPage(nextPage);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingMore(false);
    }
  }, [page, loadingMore, hasNextPage]);

  // Cart operations
  const handleAddToCart = useCallback(async (productId) => {
    try {
      setCartLoading(true);
      const res = await fetch('http://localhost:3001/api/cart/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId })
      });

      if (res.ok) {
        const data = await res.json();
        setCart(data.data);
      }
    } catch (err) {
      console.error('Failed to add to cart:', err);
    } finally {
      setCartLoading(false);
    }
  }, []);

  const handleUpdateQuantity = useCallback(async (productId, quantity) => {
    try {
      setCartLoading(true);
      const res = await fetch(`http://localhost:3001/api/cart/items/${productId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity })
      });

      if (res.ok) {
        const data = await res.json();
        setCart(data.data);
      }
    } catch (err) {
      console.error('Failed to update quantity:', err);
    } finally {
      setCartLoading(false);
    }
  }, []);

  const handleRemoveFromCart = useCallback(async (productId) => {
    try {
      setCartLoading(true);
      const res = await fetch(`http://localhost:3001/api/cart/items/${productId}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        const data = await res.json();
        setCart(data.data);
      }
    } catch (err) {
      console.error('Failed to remove from cart:', err);
    } finally {
      setCartLoading(false);
    }
  }, []);

  const handleCheckout = useCallback(async () => {
    try {
      setCartLoading(true);
      const res = await fetch('http://localhost:3001/api/cart/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      if (res.ok) {
        const data = await res.json();
        setCart({ items: [], total: 0 });
        setCartOpen(false);
        alert(`Order placed successfully! Order ID: ${data.data.orderId}`);
      } else {
        const errorData = await res.json();
        alert(errorData.error || 'Checkout failed');
      }
    } catch (err) {
      console.error('Checkout failed:', err);
      alert('Checkout failed. Please try again.');
    } finally {
      setCartLoading(false);
    }
  }, []);

  const cartItemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="app">
      <Header
        cartItemCount={cartItemCount}
        onCartClick={() => setCartOpen(true)}
      />
      <div className="main-container">
        <Sidebar categories={categories} />
        <main className="content">
          {loading && <div className="loading">Loading products...</div>}
          {error && <div className="error">Error: {error}</div>}
          {!loading && !error && (
            <ProductGrid
              products={products}
              total={total}
              hasNextPage={hasNextPage}
              loadingMore={loadingMore}
              onLoadMore={handleLoadMore}
              onAddToCart={handleAddToCart}
            />
          )}
        </main>
      </div>
      {cartOpen && (
        <Cart
          cart={cart}
          loading={cartLoading}
          onClose={() => setCartOpen(false)}
          onUpdateQuantity={handleUpdateQuantity}
          onRemove={handleRemoveFromCart}
          onCheckout={handleCheckout}
        />
      )}
    </div>
  );
}

export default App;

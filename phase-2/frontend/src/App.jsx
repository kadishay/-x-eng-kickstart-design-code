import { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ProductGrid from './components/ProductGrid';
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

  return (
    <div className="app">
      <Header />
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
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;

import ProductCard from './ProductCard';
import './ProductGrid.css';

function ProductGrid({ products, total, hasNextPage, loadingMore, onLoadMore }) {
  return (
    <div className="product-grid-container">
      <div className="product-grid-header">
        <div className="breadcrumb">
          Home &gt; All Products
          <span className="product-count">({total.toLocaleString()} products)</span>
        </div>
        <div className="sort-container">
          <label>Sort by:</label>
          <select className="sort-select">
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="load-more-container">
        {hasNextPage ? (
          <button
            className="load-more-btn"
            onClick={onLoadMore}
            disabled={loadingMore}
          >
            {loadingMore ? 'Loading...' : 'Load More'}
          </button>
        ) : (
          <span className="end-of-results">You've reached the end</span>
        )}
        <span className="products-shown">
          Showing {products.length} of {total.toLocaleString()} products
        </span>
      </div>
    </div>
  );
}

export default ProductGrid;

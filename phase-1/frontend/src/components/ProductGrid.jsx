import ProductCard from './ProductCard';
import './ProductGrid.css';

function ProductGrid({ products }) {
  return (
    <div className="product-grid-container">
      <div className="product-grid-header">
        <div className="breadcrumb">
          Home &gt; All Products
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
    </div>
  );
}

export default ProductGrid;

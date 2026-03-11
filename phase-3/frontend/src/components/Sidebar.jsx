import './Sidebar.css';

function Sidebar({ categories }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <h3 className="sidebar-title">Discovery</h3>
      </div>

      <div className="sidebar-section">
        <h4 className="sidebar-subtitle">Categories</h4>
        <ul className="category-list">
          {categories.map((category) => (
            <li key={category} className="category-item">
              {category}
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar-section">
        <h4 className="sidebar-subtitle">Price Range</h4>
        <div className="price-range">
          <span>$0 - $500</span>
        </div>
      </div>

      <div className="sidebar-section">
        <h4 className="sidebar-subtitle">Availability</h4>
        <label className="checkbox-label">
          <input type="checkbox" />
          <span>In Stock Only</span>
        </label>
      </div>
    </aside>
  );
}

export default Sidebar;

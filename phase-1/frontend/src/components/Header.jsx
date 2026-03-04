import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-logo">
        <span className="logo-icon">🛒</span>
        <span className="logo-text">Gadget Store</span>
      </div>
      <div className="header-search">
        <input
          type="text"
          placeholder="Search for gadgets & accessories..."
          className="search-input"
        />
      </div>
      <div className="header-actions">
        <button className="cart-button">
          🛒
        </button>
      </div>
    </header>
  );
}

export default Header;

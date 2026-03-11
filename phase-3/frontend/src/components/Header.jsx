import './Header.css';

function Header({ cartItemCount = 0, onCartClick }) {
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
        <button className="cart-button" onClick={onCartClick}>
          🛒
          {cartItemCount > 0 && (
            <span className="cart-badge">{cartItemCount}</span>
          )}
        </button>
      </div>
    </header>
  );
}

export default Header;

import './Cart.css';

function Cart({ cart, loading, onClose, onUpdateQuantity, onRemove, onCheckout }) {
  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-panel" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2>Shopping Cart</h2>
          <button className="cart-close-btn" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="cart-items">
          {cart.items.length === 0 ? (
            <div className="cart-empty">
              <p>Your cart is empty</p>
            </div>
          ) : (
            cart.items.map((item) => (
              <div key={item.productId} className="cart-item">
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <h4 className="cart-item-name">{item.name}</h4>
                  <p className="cart-item-price">${item.price.toFixed(2)}</p>
                  <div className="cart-item-quantity">
                    <button
                      className="quantity-btn"
                      onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)}
                      disabled={loading || item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
                      disabled={loading}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="cart-item-actions">
                  <p className="cart-item-subtotal">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    className="cart-item-remove"
                    onClick={() => onRemove(item.productId)}
                    disabled={loading}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.items.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total:</span>
              <span className="cart-total-amount">${cart.total.toFixed(2)}</span>
            </div>
            <button
              className="checkout-btn"
              onClick={onCheckout}
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Checkout'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;

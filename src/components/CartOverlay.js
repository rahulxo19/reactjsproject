// components/CartOverlay.js

import React from "react";

const CartOverlay = ({ cartItems, closeCartOverlay }) => {
  return (
    <div className="cart-overlay" onClick={closeCartOverlay}>
      <div className="cart-content" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2>Cart</h2>
        </div>
        <div className="cart-body">
          {cartItems.map((item) => (
            <div key={item._id}>
              <p>{item.name}</p>
              <p>Price: {item.price}</p>
              <p>Size L: {item.sizeL}</p>
              <p>Size M: {item.sizeM}</p>
              <p>Size S: {item.sizeS}</p>
              <hr />
            </div>
          ))}
        </div>
        <div className="cart-footer">
          <button className="close-button" onClick={closeCartOverlay}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartOverlay;

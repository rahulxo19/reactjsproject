import React, { useState, useEffect } from "react";
import "./App.css";
import Form from "./components/Form";
import Items from "./components/Items";
import CartOverlay from "./components/CartOverlay"; // Create a separate component for the cart overlay

function App() {
  const [isCartOverlayVisible, setIsCartOverlayVisible] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCartItems(); // Fetch cart items from Firebase when the component mounts
  }, []);

  const openCartOverlay = () => {
    setIsCartOverlayVisible(true);
  };

  const closeCartOverlay = () => {
    setIsCartOverlayVisible(false);
  };

  const fetchCartItems = async () => {
    try {
      const response = await fetch(
        "https://react-http-38901-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json"
      );

      if (response.ok) {
        const data = await response.json();
        const cartItemsArray = Object.keys(data).map((key) => ({
          ...data[key],
          _id: key,
        }));
        setCartItems(cartItemsArray);
      } else {
        console.error("Error fetching cart items");
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  return (
    <>
      <div className="app-container">
        hello
        <Form cart={openCartOverlay} />
        <Items />
      </div>
      {isCartOverlayVisible && (
        <CartOverlay
          cartItems={cartItems}
          closeCartOverlay={closeCartOverlay}
        />
      )}
    </>
  );
}

export default App;

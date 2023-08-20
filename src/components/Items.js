import React, { useEffect, useState } from "react";
import "./Items.css";

const updateItemQuantitiesOnApi = async (item) => {
  const apiEndpoint = `https://react-http-38901-default-rtdb.asia-southeast1.firebasedatabase.app/cartItems/${item._id}.json`;

  try {
    const response = await fetch(apiEndpoint, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });

    if (response.ok) {
      console.log("Items updated on API successfully");
    } else {
      console.error("Error updating items on API");
    }
  } catch (error) {
    console.error("Error updating items on API:", error);
  }
};

const updateCartQuantitiesOnApi = async (item) => {
  const apiEndpoint = `https://react-http-38901-default-rtdb.asia-southeast1.firebasedatabase.app/cart/${item._id}.json`;

  try {
    const response = await fetch(apiEndpoint, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });

    if (response.ok) {
      console.log("Items updated on API successfully");
    } else {
      console.error("Error updating items on API");
    }
  } catch (error) {
    console.error("Error updating items on API:", error);
  }
};

const Items = (props) => {
  const [items, setItems] = useState([]);

  const [cartItems, setCartItems] = useState([]);

  const addToCart = async (item, s) => {
    const itemIndex = cartItems.findIndex((i) => i.name === item.name);
    const iIndex = items.findIndex((i) => i.name === item.name);

    if (iIndex !== -1) {
      const updatedCart = items.map((i) => ({ ...i }));
      console.log(updatedCart);
      if (s === "L") {
        updatedCart[iIndex].sizeL -= 1;
      }
      if (s === "M") {
        updatedCart[iIndex].sizeM -= 1;
      }
      if (s === "S") {
        updatedCart[iIndex].sizeS -= 1;
      }
      updateItemQuantitiesOnApi(updatedCart[iIndex]);
      setItems(updatedCart);
    }

    if (itemIndex !== -1) {
      const updatedCart = cartItems.map((i) => ({ ...i }));
      if (s === "L") {
        updatedCart[itemIndex].sizeL += 1;
      }
      if (s === "M") {
        updatedCart[itemIndex].sizeM += 1;
      }
      if (s === "S") {
        updatedCart[itemIndex].sizeS += 1;
      }
      updateCartQuantitiesOnApi(updatedCart[itemIndex]);
      setCartItems(updatedCart);
    } else {
      const newItem = {
        ...item,
        sizeL: s === "L" ? 1 : 0,
        sizeM: s === "M" ? 1 : 0,
        sizeS: s === "S" ? 1 : 0,
      };
      const response = await fetch(
        "https://react-http-38901-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newItem),
        }
      );
      if (response.ok) {
        console.log("Item added to cart on API successfully");
      } else {
        console.error("Error adding item to cart on API");
      }
    }
  };

  const CartHandler = (item, s) => {
    addToCart(item, s);
  };

  const getItems = async () => {
    const itemsFetch = await fetch(
      "https://react-http-38901-default-rtdb.asia-southeast1.firebasedatabase.app/cartItems.json"
    );
    if (itemsFetch.ok) {
      const data = await itemsFetch.json();
      if (data) {
        // Check if data is not null or undefined
        const itemsArray = Object.keys(data).map((key) => ({
          ...data[key],
          _id: key,
        }));
        setItems(itemsArray);
      } else {
        setItems([]);
      }
    } else {
      setItems([]); // Handle fetch error by setting items to an empty array
    }
  };

  const getCart = async () => {
    const itemsFetch = await fetch(
      "https://react-http-38901-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json"
    );
    if (itemsFetch.ok) {
      const data = await itemsFetch.json();
      if (data) {
        // Check if data is not null or undefined
        const itemsArray = Object.keys(data).map((key) => ({
          ...data[key],
          _id: key,
        }));
        setCartItems(itemsArray);
      } else {
        setCartItems([]);
      }
    } else {
      setCartItems([]); // Handle fetch error by setting cartItems to an empty array
    }
  };

  useEffect(() => {
    const cartRefreshInterval = setInterval(() => {
      getCart();
      getItems();
    }, 3000);

    return () => {
      clearInterval(cartRefreshInterval); // Clean up the interval when the component unmounts
    };
  }, []);

  return (
    <div className="table-container">
      <h2>Items Table</h2>
      <table className="flex-table">
        <thead>
          <tr className="header">
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Size L</th>
            <th>Size M</th>
            <th>Size S</th>
          </tr>
        </thead>
        <tbody>
          {items !== null ? (
            items.map((item, index) => (
              <tr className="table-row" key={index}>
                <td>{item.name}</td>
                <td>{item.desc}</td>
                <td>{item.price}</td>
                <td>
                  {item.sizeL}
                  <button onClick={() => CartHandler(item, "L")}>
                    Add to Cart
                  </button>
                </td>
                <td>
                  {item.sizeM}
                  <button onClick={() => CartHandler(item, "M")}>
                    Add to Cart
                  </button>
                </td>
                <td>
                  {item.sizeS}
                  <button onClick={() => CartHandler(item, "S")}>
                    Add to Cart
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <p>Nothing to Display</p>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Items;

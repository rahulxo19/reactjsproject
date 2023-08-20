import React, { useRef } from "react";

const Form = (props) => {
  const nameRef = useRef(null);
  const descRef = useRef(null);
  const priceRef = useRef(null);
  const sizeLref = useRef(null);
  const sizeMref = useRef(null);
  const sizeSref = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const desc = descRef.current.value;
    const price = priceRef.current.value;
    const sizeL = sizeLref.current.value;
    const sizeM = sizeMref.current.value;
    const sizeS = sizeSref.current.value;

    if (name && desc && price && sizeL && sizeM && sizeS) {
      console.log("working handler");
      const obj = {
        name,
        desc,
        price,
        sizeL,
        sizeM,
        sizeS,
      };

      postData(obj);

      return;
    }
    alert("fill the form");
  };

  const openCart = () => {
    props.cart();
  };

  const postData = async (obj) => {
    const response = await fetch(
      "https://react-http-38901-default-rtdb.asia-southeast1.firebasedatabase.app/cartItems.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      }
    );

    if (response.ok) {
      console.log(response);
    }
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="name">Name:</label>
          <input id="name" type="text" ref={nameRef} />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input id="description" type="text" ref={descRef} />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input id="price" type="number" ref={priceRef} />
        </div>
        <div>
          <label>Quantity:</label>
          <label htmlFor="sizeL">sizeL-</label>
          <input id="sizeL" type="number" ref={sizeLref} />
          <label htmlFor="sizeM">sizeM-</label>
          <input id="sizeM" type="number" ref={sizeMref} />
          <label htmlFor="sizeS">sizeS-</label>
          <input id="sizeS" type="number" ref={sizeSref} />
        </div>
        <button type="submit">Submit</button>
      </form>
      <div>
        <button onClick={openCart}>Cart</button>
      </div>
    </>
  );
};
export default Form;

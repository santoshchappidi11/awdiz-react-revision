import React, { useContext, useEffect, useState } from "react";
import "./CartProduct.css";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const CartProduct = () => {
  const { state } = useContext(AuthContext);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cartProducts, setCartProducts] = useState([]);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (state.userLoginDetails) {
      if (state.userLoginDetails.role == "Seller") {
        alert("You are not a valid user to access this page!");
        navigateTo("/");
      }
    }
  }, [state.userLoginDetails, navigateTo]);

  useEffect(() => {
    if (state.userLoginDetails) {
      setIsUserLoggedIn(true);
      setCurrentUser(state.userLoginDetails);
    } else {
      setIsUserLoggedIn(false);
      setCurrentUser({});
    }
  }, [state.userLoginDetails]);

  useEffect(() => {
    if (currentUser) {
      const allUsers = JSON.parse(localStorage.getItem("users"));

      for (let i = 0; i < allUsers.length; i++) {
        if (
          allUsers[i].email == currentUser.email &&
          allUsers[i].password == currentUser.password &&
          currentUser.role == "Buyer"
        ) {
          setCartProducts(allUsers[i].cart);
        }
      }
    }
  }, [currentUser]);

  const removeProduct = (index) => {
    const allUsers = JSON.parse(localStorage.getItem("users")) || [];
    // const currentUser = JSON.parse(localStorage.getItem("current-user"));

    if (currentUser) {
      for (let i = 0; i < allUsers.length; i++) {
        if (
          allUsers[i].email == currentUser.email &&
          allUsers[i].password == currentUser.password
        ) {
          allUsers[i].cart.splice(index, 1);
          setCartProducts(allUsers[i].cart);
          localStorage.setItem("users", JSON.stringify(allUsers));
          alert("Product removed!");
          break;
        }
      }
    }
  };

  const removeAllProducts = () => {
    if (currentUser) {
      const allUsers = JSON.parse(localStorage.getItem("users")) || [];

      for (let i = 0; i < allUsers.length; i++) {
        if (
          allUsers[i].email == currentUser.email &&
          allUsers[i].password == currentUser.password
        ) {
          allUsers[i].cart = [];
          localStorage.setItem("users", JSON.stringify(allUsers));
        }
      }
    }
    setCartProducts([]);
    alert("Your products will deliver soon! Thank you for shopping...");
  };

  return (
    <div id="cart-screen">
      {isUserLoggedIn && (
        <div id="cart-products">
          <div id="left">
            <div id="products">
              {cartProducts?.length ? (
                cartProducts.map((prod, index) => (
                  <div className="product" key={index}>
                    <div className="img">
                      <img src={prod.image} alt="product" />
                    </div>
                    <div className="details">
                      <h3>{prod.name}</h3>
                      <h4>₹{prod.price}</h4>
                      <button onClick={() => removeProduct(index)}>
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <h2>No products in the cart!</h2>
              )}
            </div>
          </div>
          <div id="right">
            <h3>Price Summary</h3>
            <div id="price-summary">
              <div id="details">
                <div>
                  <h4>Total Price:</h4>
                  <h4>₹2000</h4>
                </div>
                <div>
                  <h4>Discount(50%)</h4>
                  <h4>₹1000</h4>
                </div>
                <div>
                  <h4>Delivery Charges:</h4>
                  <h4>₹0</h4>
                </div>
              </div>
              <div id="checkout">
                <button onClick={removeAllProducts}>Checkout</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {!isUserLoggedIn && <h2>Please login to view the cart page : )</h2>}
    </div>
  );
};

export default CartProduct;

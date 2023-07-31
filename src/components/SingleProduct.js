import React, { useContext, useEffect, useState } from "react";
import "./SingleProduct.css";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const SingleProduct = () => {
  const { id } = useParams();
  const { state } = useContext(AuthContext);
  const [multipleProducts, setMultipleProducts] = useState([]);
  const [singleProd, setSingleProd] = useState({});
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isEditProdButton, setIsEditProdButton] = useState(false);
  const navigateTo = useNavigate();

  useEffect(() => {
    const allProducts = JSON.parse(localStorage.getItem("products"));

    if (allProducts) {
      setMultipleProducts(allProducts);
    } else {
      setMultipleProducts([]);
    }
  }, []);

  useEffect(() => {
    const prod = multipleProducts.find((singleProd) => singleProd.id == id);
    setSingleProd(prod);
  }, [id, multipleProducts]);

  useEffect(() => {
    if (state.userLoginDetails) {
      if (state.userLoginDetails.role == "Seller") {
        setIsEditProdButton(true);
      } else {
        setIsEditProdButton(false);
      }
    }
  }, [state.userLoginDetails]);

  useEffect(() => {
    if (state.userLoginDetails) {
      setIsUserLoggedIn(true);
      setCurrentUser(state.userLoginDetails);
    } else {
      setIsUserLoggedIn(false);
      setCurrentUser({});
    }
  }, [state.userLoginDetails]);

  const handleAddToCart = () => {
    if (isUserLoggedIn) {
      const allUsers = JSON.parse(localStorage.getItem("users"));

      for (let i = 0; i < allUsers.length; i++) {
        if (
          allUsers[i].email == currentUser.email &&
          allUsers[i].password == currentUser.password &&
          currentUser.role == "Buyer"
        ) {
          allUsers[i].cart.push(singleProd);
          localStorage.setItem("users", JSON.stringify(allUsers));
          toast.success("Product added to cart!");
          break;
        }
      }
    } else {
      toast.error("Please login to add product to cart!");
    }
  };

  const handleEditProduct = () => {
    if (isUserLoggedIn) {
      navigateTo("/edit-product");
    } else {
      toast.error("Please login to edit the product!");
    }
  };

  return (
    <>
      <div id="single-product">
        {singleProd && (
          <div id="product">
            <div id="img">
              <img src={singleProd.image} alt="product" />
            </div>
            <div id="details">
              <h2>{singleProd.name}</h2>
              <h3>${singleProd.price}</h3>
              <h4>
                Category: <span>{singleProd.category}</span>
              </h4>
              {!isEditProdButton && (
                <button onClick={handleAddToCart}>Add to cart</button>
              )}
              {isEditProdButton && (
                <button onClick={() => handleEditProduct()}>
                  Edit Product
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SingleProduct;

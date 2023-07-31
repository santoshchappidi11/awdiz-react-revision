import React, { useContext, useEffect, useState } from "react";
import "./EditProduct.css";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const EditProduct = () => {
  const singleProdId = useParams();
  console.log(singleProdId.id);
  const { state } = useContext(AuthContext);
  const [editProduct, setEditProduct] = useState({
    image: "",
    name: "",
    price: "",
    category: "",
  });
  const [currentUser, setCurrentUser] = useState({});
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const navigateTo = useNavigate();

  const handleChangeValues = (e) => {
    setEditProduct({ ...editProduct, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (state?.userLoginDetails?.role == "Buyer") {
      toast.error("You are not a valid user to access this page!");
      navigateTo("/");
    }
  }, [state.userLoginDetails, navigateTo]);

  useEffect(() => {
    if (!state?.userLoginDetails?.email) {
      toast.error("Please login to access this page!");
      navigateTo("/");
    }
  }, [state.userLoginDetails, navigateTo]);

  useEffect(() => {
    if (state.userLoginDetails) {
      setCurrentUser(state.userLoginDetails);
      setIsUserLoggedIn(true);
    } else {
      setCurrentUser({});
      setIsUserLoggedIn(false);
    }
  }, [state.userLoginDetails]);

  useEffect(() => {
    // const currentUser = JSON.parse(localStorage.getItem("current-user"));
    if (currentUser) {
      const allProducts = JSON.parse(localStorage.getItem("products")) || [];
      for (let i = 0; i < allProducts.length; i++) {
        if (allProducts[i].id == singleProdId.id) {
          console.log(allProducts[i].id);
          setEditProduct(allProducts[i]);
        }
      }
    }
  }, [currentUser, singleProdId.id]);

  const handleEditProductSubmit = (e) => {
    e.preventDefault();

    if (
      editProduct.name &&
      editProduct.image &&
      editProduct.category &&
      editProduct.price
    ) {
      const allProducts = JSON.parse(localStorage.getItem("products")) || [];

      if (currentUser) {
        for (let i = 0; i < allProducts.length; i++) {
          if (allProducts[i].id == singleProdId.id) {
            allProducts[i].id = editProduct.id;
            allProducts[i].image = editProduct.image;
            allProducts[i].name = editProduct.name;
            allProducts[i].price = editProduct.price;
            allProducts[i].category = editProduct.category;
          }
        }
        localStorage.setItem("products", JSON.stringify(allProducts));
        setEditProduct({
          image: "",
          name: "",
          price: "",
          category: "",
        });
        toast.success("Product updated!");
        navigateTo("/multiple-products");
      }
    } else {
      toast.error("Please fill all the fields!");
    }
  };

  return (
    <div id="edit-product-screen">
      <form onSubmit={handleEditProductSubmit}>
        <div id="edit-product-header">
          <h2>Edit Product</h2>
        </div>
        <div className="fields">
          <label>Image :</label>
          <input
            type="text"
            name="image"
            value={editProduct.image}
            onChange={handleChangeValues}
          />
        </div>
        <div className="fields">
          <label>Name :</label>
          <input
            type="text"
            name="name"
            value={editProduct.name}
            onChange={handleChangeValues}
          />
        </div>
        <div className="fields">
          <label>Price :</label>
          <input
            type="number"
            name="price"
            value={editProduct.price}
            onChange={handleChangeValues}
          />
        </div>
        <div className="drop-down">
          <label>Category :</label>
          <select
            name="category"
            value={editProduct.category}
            onChange={handleChangeValues}
          >
            <option>Men</option>
            <option>Women</option>
            <option>Kids</option>
            <option>Electronics</option>
            <option>Beauty</option>
          </select>
        </div>
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;

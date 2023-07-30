import React, { useContext, useEffect, useState } from "react";
import "./AddProduct.css";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const AddProduct = () => {
  const { state } = useContext(AuthContext);
  const navigateTo = useNavigate();
  const [addProducts, setAddProducts] = useState({
    image: "",
    name: "",
    price: "",
    category: "Men",
  });

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("current-user"));

    if (currentUser) {
      if (currentUser.role == "Buyer") {
        toast.error("You are not a valid user to access this page!");
        navigateTo("/");
      }
    } else {
      toast.error("Please login to access this page!");
      navigateTo("/login");
    }
  }, [state.userLoginDetails, navigateTo]);

  const handleChangeValues = (e) => {
    setAddProducts({ ...addProducts, [e.target.name]: e.target.value });
  };

  const handleAddProductSubmit = (e) => {
    e.preventDefault();
    console.log(addProducts);

    if (
      addProducts.image &&
      addProducts.name &&
      addProducts.price &&
      addProducts.category
    ) {
      const productsFromLS = JSON.parse(localStorage.getItem("products")) || [];
      let randomId = uuidv4();
      addProducts["id"] = randomId;
      productsFromLS.push(addProducts);
      localStorage.setItem("products", JSON.stringify(productsFromLS));
      toast.success("Product added successfully!");
      setAddProducts({ image: "", name: "", price: "", category: "Men" });
      navigateTo("/multiple-products");
    } else {
      toast.error("Please fill all the details!");
    }
  };

  return (
    <div id="add-product-screen">
      <form onSubmit={handleAddProductSubmit}>
        <div id="add-product-header">
          <h2>Add Product</h2>
        </div>
        <div className="fields">
          <label>Image :</label>
          <input
            type="text"
            name="image"
            value={addProducts.value}
            onChange={handleChangeValues}
          />
        </div>
        <div className="fields">
          <label>Name :</label>
          <input
            type="text"
            name="name"
            value={addProducts.value}
            onChange={handleChangeValues}
          />
        </div>
        <div className="fields">
          <label>Price :</label>
          <input
            type="number"
            name="price"
            value={addProducts.value}
            onChange={handleChangeValues}
          />
        </div>
        <div className="drop-down">
          <label>Category :</label>
          <select
            name="category"
            value={addProducts.value}
            onChange={handleChangeValues}
          >
            <option>Men</option>
            <option>Women</option>
            <option>Kids</option>
            <option>Electronics</option>
            <option>Beauty</option>
          </select>
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;

import React, { useContext, useEffect, useState } from "react";
import "./MultipleProducts.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const MultipleProducts = () => {
  const [multipleProducts, setMultipleProducts] = useState([]);
  const [isProducts, setIsProducts] = useState(false);
  const navigateTo = useNavigate();
  // const { state } = useContext(AuthContext);

  console.log(multipleProducts);

  useEffect(() => {
    const allProducts = JSON.parse(localStorage.getItem("products")) || [];

    if (allProducts?.length) {
      setIsProducts(true);
      setMultipleProducts(allProducts);
    } else {
      setIsProducts(false);
      setMultipleProducts([]);
    }
  }, []);

  const handleMultiProdClick = (ID) => {
    navigateTo(`/SingleProduct/${ID}`);
  };

  return (
    <>
      <div id="multiple-products">
        {isProducts &&
          multipleProducts.map((singleProduct, index) => (
            <div
              key={index}
              id="single-prod"
              onClick={() => handleMultiProdClick(singleProduct.id)}
            >
              <div id="img">
                <img src={singleProduct.image} alt="product" />
              </div>
              <div id="details">
                <h3>{singleProduct.name}</h3>
                <h4>${singleProduct.price}</h4>
                <h4>{singleProduct.category}</h4>
              </div>
            </div>
          ))}
        {!isProducts && (
          <div id="prod-msg">
            <h2>No products!</h2>
          </div>
        )}
      </div>
    </>
  );
};

export default MultipleProducts;

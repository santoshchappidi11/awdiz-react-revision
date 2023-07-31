import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { state, Logout } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const navigateTo = useNavigate();

  //   console.log(user);

  useEffect(() => {
    if (state?.userLoginDetails?.name) {
      setUser(state.userLoginDetails);
    } else {
      setUser({});
    }
  }, [state]);

  return (
    <div id="navbar">
      <div id="logo" onClick={() => navigateTo("/")}>
        <h2>LOGO</h2>
      </div>
      <div id="nav-items">
        {user?.role == "Seller" && (
          <p onClick={() => navigateTo("/add-product")}>Add Product</p>
        )}
        {user?.name && (
          <p onClick={() => navigateTo("/multiple-products")}>All Products</p>
        )}
        {user?.name && <p onClick={() => navigateTo('/profile')}>Profile</p>}
        {user?.name && state?.userLoginDetails?.role == "Buyer" && (
          <p onClick={() => navigateTo("/cart")}>Cart</p>
        )}
        {user?.name && (
          <p>
            {user.name.toUpperCase()}-<span>({user.role})</span>
          </p>
        )}
        {user?.name && <p onClick={Logout}>Logout</p>}
        {!user.name && (
          <p onClick={() => navigateTo("/login")}>Register/Login</p>
        )}
      </div>
    </div>
  );
};

export default Navbar;

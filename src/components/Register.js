import React, { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Buyer",
    cart: [],
  });
  const navigateTo = useNavigate();
  // console.log(userData);

  function handleChangeValues(e) {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }

  // const handleRoleValues = (e) => {
  //   setUserData({ ...userData, ["role"]: e.target.value });
  // };

  function handleRegisterSubmit(e) {
    e.preventDefault();
    if (userData.name && userData.email && userData.password) {
      const getUsersData = JSON.parse(localStorage.getItem("users")) || [];
      getUsersData.push(userData);
      localStorage.setItem("users", JSON.stringify(getUsersData));
      // registerDetails(userData);
      toast.success("Registered successfully!");
      setUserData({ name: "", email: "", password: "", role: "Buyer" });
      navigateTo("/login");
    } else {
      toast.error("Please fill all the details!");
    }
  }

  return (
    <div id="register-screen">
      <form onSubmit={handleRegisterSubmit}>
        <div id="register-header">
          <h2>Register</h2>
        </div>
        <div className="fields">
          <label>Name :</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChangeValues}
          />
        </div>
        <div className="fields">
          <label>Email :</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChangeValues}
          />
        </div>
        <div className="fields">
          <label>Password :</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChangeValues}
          />
        </div>

        <div className="roles">
          <select name="role" onChange={handleChangeValues}>
            <option value="Buyer">Buyer</option>
            <option value="Seller">Seller</option>
          </select>
        </div>

        <button>Register</button>
        <div>
          <p style={{ cursor: "pointer" }}>
            Already have an Account?{" "}
            <b onClick={() => navigateTo("/login")}>Login</b>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;

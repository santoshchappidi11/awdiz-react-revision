import React, { useContext, useState } from "react";
import "./Login.css";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const { Login } = useContext(AuthContext);
  const [userData, setUserData] = useState({ email: "", password: "" });
  const navigateTo = useNavigate();

  function handleChangeValues(e) {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }

  function handleLoginSubmit(e) {
    e.preventDefault();

    if (userData.email && userData.password) {
      const getUsersData = JSON.parse(localStorage.getItem("users")) || [];

      var flag = false;
      for (let i = 0; i < getUsersData.length; i++) {
        if (
          getUsersData[i].email == userData.email &&
          getUsersData[i].password == userData.password
        ) {
          flag = true;
          Login(getUsersData[i]);
          setUserData({ email: "", password: "" });
          toast.success("Login successfull");
          navigateTo("/");
          // alert("Login successfull");
        }
      }

      if (flag == false) {
        setUserData({ email: "", password: "" });
        toast.error("Invalid email or password!");
        // alert("Invalid email or password!");
      }
    } else {
      toast.error("Please fill all the details!");
      // alert("Please fill all the details!");
    }
  }

  return (
    <div id="login-screen">
      <form onSubmit={handleLoginSubmit}>
        <div id="login-header">
          <h2>Login</h2>
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
        <button>Login</button>
        <div>
          <p style={{ cursor: "pointer" }}>
            Don't have an account?{" "}
            <b onClick={() => navigateTo("/register")}>Register</b>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;

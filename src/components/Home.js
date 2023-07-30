import React, { useContext } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { state } = useContext(AuthContext);
  // console.log(state.userLoginDetails);
  const navigateTo = useNavigate();

  return (
    <div id="home-screen">
      <h2>Home</h2>
      <div className="button">
        <button onClick={() => navigateTo("/multiple-products")}>
          FetchProducts
        </button>
      </div>
      {/* <div className="button">
        <button onClick={() => navigateTo("/login")}>Login</button>
      </div> */}
    </div>
  );
};

export default Home;

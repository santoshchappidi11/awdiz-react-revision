import React, { useContext, useEffect, useState } from "react";
import "./Profile.css";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { state, Login } = useContext(AuthContext);
  const [editData, setEditData] = useState({ name: "", password: "" });
  const [currentUser, setCurrentUser] = useState({});
  const navigateTo = useNavigate();

  const handleChangeValues = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (!state?.userLoginDetails?.email) {
      toast.error("Please login to access this page!");
      navigateTo("/");
    }
  }, [state, navigateTo]);

  useEffect(() => {
    if (state.userLoginDetails) {
      setCurrentUser(state.userLoginDetails);
    }
  }, [state]);

  useEffect(() => {
    if (currentUser) {
      const allUsers = JSON.parse(localStorage.getItem("users")) || [];
      for (let i = 0; i < allUsers.length; i++) {
        if (
          allUsers[i].email == currentUser.email &&
          allUsers[i].password == currentUser.password
        ) {
          setEditData(allUsers[i]);
        }
      }
    }
  }, [currentUser]);

  const handleEditSubmit = (e) => {
    e.preventDefault();

    if (editData.name && editData.password) {
      if (currentUser) {
        const allUsers = JSON.parse(localStorage.getItem("users")) || [];

        for (let i = 0; i < allUsers.length; i++) {
          if (
            allUsers[i].email == currentUser.email &&
            allUsers[i].password == currentUser.password
          ) {
            allUsers[i].name = editData.name;
            allUsers[i].password = editData.password;
            currentUser.name = editData.name;
            currentUser.password = editData.password;
          }
        }
        localStorage.setItem("users", JSON.stringify(allUsers));
        localStorage.setItem("current-user", JSON.stringify(currentUser));
        Login(currentUser);
        setEditData({ name: "", password: "" });
        toast.success("Profile Updated!");
      }
    } else {
      toast.error("Please fill all the details!");
    }
  };

  return (
    <div id="edit-profile-screen">
      <form onSubmit={handleEditSubmit}>
        <div id="edit-profile-header">
          <h2>Edit Profile</h2>
        </div>
        <div className="fields">
          <label>Name :</label>
          <input
            type="text"
            name="name"
            value={editData.name}
            onChange={handleChangeValues}
          />
        </div>
        <div className="fields">
          <label>Password :</label>
          <input
            type="text"
            name="password"
            value={editData.password}
            onChange={handleChangeValues}
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;

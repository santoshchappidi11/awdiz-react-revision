import { createContext, useEffect, useReducer } from "react";
import toast from "react-hot-toast";

export const AuthContext = createContext();

const initialState = {
  userLoginDetails: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, userLoginDetails: action.payload };
    case "LOGOUT":
      return { userLoginDetails: null };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // console.log(state.LSRegisterDetails);

  const Login = (userData) => {
    localStorage.setItem("current-user", JSON.stringify(userData));

    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  };

  const Logout = () => {
    localStorage.removeItem("current-user");

    dispatch({
      type: "LOGOUT",
    });
    toast.success("You are logged out successfully!");
  };

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("current-user"));

    if (currentUser) {
      dispatch({
        type: "LOGIN",
        payload: currentUser,
      });
    }
  }, []);
  return (
    <AuthContext.Provider value={{ Login, Logout, state }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

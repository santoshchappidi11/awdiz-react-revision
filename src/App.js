import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import MultipleProducts from "./components/MultipleProducts";
import SingleProduct from "./components/SingleProduct";
import Navbar from "./components/Navbar";
import AddProduct from "./components/AddProduct";
import CartProduct from "./components/CartProduct";
import Profile from "./components/Profile";
import EditProduct from "./components/EditProduct";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/add-product" element={<AddProduct />} />
        <Route exact path="/multiple-products" element={<MultipleProducts />} />
        <Route exact path="/SingleProduct/:id" element={<SingleProduct />} />
        <Route exact path="/cart" element={<CartProduct />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/edit-product/:id" element={<EditProduct />} />
      </Routes>
    </div>
  );
}

export default App;

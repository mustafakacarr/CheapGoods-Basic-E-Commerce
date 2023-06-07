import "./App.css";
import "./bootstrap.min.css";
import Header from "./Component/Header";
import Footer from "./Component/Footer";
import Home from "./Page/Home";
import { Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import Product from "./Page/Product";
import Cart from "./Page/Cart";
import Login from "./Page/Login";
import Register from "./Page/Register";
import Profile from "./Page/Profile";
import Shipping from "./Page/Shipping";
import Payment from "./Page/Payment";
import Placeorder from "./Page/Placeorder";
import Order from "./Page/Order";

function App() {

  return (
    <div>
      <Header />
      <Container className="mt-50 mb-50 justify-content-center">
        <main>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/product/:id" element={<Product />}></Route>
            <Route path="/cart/:id?" element={<Cart />}></Route>
            <Route path="/cart/:id" element={<Cart />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/shipping" element={<Shipping />}></Route>
            <Route path="/payment" element={<Payment />}></Route>
            <Route path="/placeorder" element={<Placeorder />}></Route>
            <Route path="/orders/:id?" element={<Order />}></Route>
          </Routes>
        </main>
      </Container>
      <Footer />
    </div>
  );
}

export default App;

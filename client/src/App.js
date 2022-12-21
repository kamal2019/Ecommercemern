import "./App.css";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import Home from "./partials/Home";
import About from "./partials/About";
import AddProduct from "./partials/AddProduct";
import Register from "./components/Register";
import CategoriesPage from "./components/CategoriesPage";
import UpdateProduct from "./partials/UpdateProduct"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import Login from "./components/Login";
import CartPage from "./components/CartPage";
import Carts from "./components/Carts";
import Search from "./components/Search";
import Productbuy from "./components/Productbuy";

function App() {
  // const {location} = useLocation()
  const queryParams = window.location.pathname;
  return (
    <div className="App">
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/update_product/:id" element={<UpdateProduct/>} />
          <Route path="/add_product" element={<AddProduct />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/card_details/:id"
            element={<CartPage id={queryParams} />}
          />
          <Route path="/carts_checkout" element={<Carts />} />
          <Route path="/search" element={<Search />} />
          <Route path="/categories/:name" element={<CategoriesPage/>} />
          <Route path="/proceed_to_buy/:id" element={<Productbuy/>}/>
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;

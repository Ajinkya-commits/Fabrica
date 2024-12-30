import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import MainNavbar from "./components/MainNavbar";
import { AuroraBackground } from "./components/ui/aurora-background";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <AuroraBackground>
      <div className="relative w-full min-h-screen h-full">
        <div className="relative z-10 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] pt-40">
          <ToastContainer />
          <MainNavbar />
          <SearchBar></SearchBar>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/place-order" element={<PlaceOrder />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
          <Footer></Footer>
        </div>
      </div>
    </AuroraBackground>
  );
};

export default App;
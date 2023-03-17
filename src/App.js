import { ToastContainer, Zoom } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Index from "./componets/pages";
import About from "./componets/pages/about";
import Cart from "./componets/pages/cart";
import Services from "./componets/pages/services";
import Stores from "./componets/pages/store";
import AboutUser from "./componets/pages/users/AboutUser";
import Contact from "./componets/pages/users/contact";
import Dashboard from "./componets/pages/users/dashboard";
import NavBar from "./componets/pages/users/Navbar";
import Profile from "./componets/pages/users/profile";
import SignUp from "./componets/pages/signup";
import Login from "./componets/pages/login";
function App() {
  return (
    <BrowserRouter>
      <ToastContainer 
      autoClose={4000}
        position="top-right"
        theme="dark"
        pauseOnHover={false}
        closeOnClick={true}
        transition = {Zoom}
        pauseOnFocusLoss={false}
      />
      <NavBar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="store" element={<Stores />} />
        <Route path="cart" element={<Cart />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="users" element={<Dashboard />}>
          <Route path="profile" element={<Profile />} />
          <Route path="aboutUser" element={<AboutUser />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

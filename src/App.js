import { ToastContainer, Zoom } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import {Index} from "./componets/Index";
import About from "./componets/pages/About";
import Cart from "./componets/pages/Cart";
import Services from "./componets/pages/Services";
import Stores from "./componets/pages/Store";
import AboutUser from "./componets/pages/users/AboutUser";
import Contact from "./componets/pages/users/Contact";
import Dashboard from "./componets/pages/users/Dashboard";
import NavBar from "./componets/pages/users/Navbar";
import Profile from "./componets/pages/users/Profile";
import SignUp from "./componets/pages/SignUp";
import Login from "./componets/pages/Login";
import Home from "./componets/pages/users/Home";
import UserProvider from "./componets/context/UserProvider";
import Order from "./componets/pages/users/Order";
import ErrorPage from "./componets/pages/users/Errorpage";
import AdminDashBoard from "./componets/pages/admin/AdminDashBoard";
import AdminHome from "./componets/pages/admin/AdminHome";
import AddProduct from "./componets/pages/admin/AddProduct";
import AddCategory from "./componets/pages/admin/AddCategory";
import ViewCategories from "./componets/pages/admin/ViewCategories";
import ViewProducts from "./componets/pages/admin/ViewProducts";
import AdminOrders from "./componets/pages/admin/AdminOrders";
import AdminUsers from "./componets/pages/admin/AdminUsers";
import StorePage from "./componets/pages/users/StorePage";
import ProductView from "./componets/pages/users/ProductView";
import CategoryStorePage from "./componets/pages/users/CategoryStorePage";

import XCartProvider from "./componets/context/XCartProvider";
import useLoader from "./componets/hooks/useLoader";
// import UserProvider from "./componets/context/user.provider";
import { Card, Container, Spinner } from "react-bootstrap";
function App() {
  const loading = useLoader();

  const Loading = ({ show }) => {
    return (
      show && (
        <Container className="text-center mt-4">
          <Card className="border-0">
            <Card.Body>
              <Spinner size="lg" />
            </Card.Body>
          </Card>
        </Container>
      )
    );
  };

  return (
    <UserProvider>
      <XCartProvider>
        <BrowserRouter>
          <ToastContainer
            autoClose={4000}
            position="top-right"
            theme="dark"
            pauseOnHover={false}
            closeOnClick={true}
            transition={Zoom}
            pauseOnFocusLoss={false}
          />
          <NavBar />

          <Loading show={loading} />

          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="about" element={<About />} />
            <Route path="error" element={<ErrorPage />} />
            <Route path="services" element={<Services />} />
            <Route path="store" element={<Stores />} />
            <Route path="cart" element={<Cart />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />

            <Route path="store" element={<StorePage />} />
            <Route path="store/products/:productId" element={<ProductView />} />
            <Route
              path="store/:categoryId/:categoryTitle"
              element={<CategoryStorePage />}
            />
            <Route path="users" element={<Dashboard />}>
              <Route path="home" element={<Home />} />
              <Route path="profile/:user_Id" element={<Profile />} />
              <Route path="aboutUser" element={<AboutUser />} />
              <Route path="orders" element={<Order />} />
            </Route>

            <Route path="/admin" element={<AdminDashBoard />}>
              <Route path="home" element={<AdminHome />} />
              <Route path="add-product" element={<AddProduct />} />
              <Route path="add-category" element={<AddCategory />} />
              <Route path="categories" element={<ViewCategories />} />
              <Route path="products" element={<ViewProducts />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="users" element={<AdminUsers />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </XCartProvider>
    </UserProvider>
  );
}

export default App;

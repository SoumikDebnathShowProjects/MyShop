import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import Pagenotfound from "./pages/Pagenotfound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Dashboard from "./pages/user/Dashboard";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import Products from "./pages/Admin/Products";  
import AdminOrders from "./pages/Admin/AdminOrders";
import Users from "./pages/Admin/Users";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
import CategoryProduct from "./pages/categoryProduct";
import CartPage from "./pages/CartPage";
import PrivateRoute from "./components/Routes/PrivateRoute";
import 'react-toastify/dist/ReactToastify.css';
import AdminRoute from "./components/Routes/AdminRoute";
import AdminLayout from "./components/Layout/AdminLayout";
import SavedProducts from "./pages/SavedProducts";
// import AdminHomepageController from "./pages/Admin/AdminHomepageController";

function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/search" element={<Search />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product/save" element={<SavedProducts/>}/>

        {/* Protected Routes under /dashboard */}
        <Route path="/dashboard">
          {/* User Routes - Private */}
          <Route element={<PrivateRoute />}>
            <Route path="user" element={<Dashboard />} />
            <Route path="user/orders" element={<Orders />} />
            <Route path="user/profile" element={<Profile />} />
          </Route>


   <Route element={<AdminRoute />}>
  <Route path="/dashboard/admin" element={<AdminLayout />}>
    <Route index element={<AdminDashboard />} />
    <Route path="create-category" element={<CreateCategory />} />
    <Route path="create-product" element={<CreateProduct />} />
    <Route path="product/:slug" element={<UpdateProduct />} />
    <Route path="orders" element={<AdminOrders />} />
    <Route path="products" element={<Products />} />
    <Route path="users" element={<Users />} />
  </Route>
</Route>
        </Route>

        {/* Catch-All */}
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default App;

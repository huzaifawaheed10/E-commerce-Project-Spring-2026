import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar          from "./components/layout/Navbar";
import Footer          from "./components/layout/Footer";
import HomePage        from "./pages/HomePage";
import ProductsPage    from "./pages/ProductsPage";
import ProductPage     from "./pages/ProductPage";
import CartPage        from "./pages/CartPage";
import LoginPage       from "./pages/LoginPage";
import RegisterPage    from "./pages/RegisterPage";
import AdminDashboard  from "./pages/admin/AdminDashboard";
import AdminProducts   from "./pages/admin/AdminProducts";

// Admin protection
const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  return user?.role === "admin"
    ? children
    : <Navigate to="/login" replace />;
};

function AppRoutes() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Routes>
          {/* Public */}
          <Route path="/"             element={<HomePage />}     />
          <Route path="/products"     element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductPage />}  />
          <Route path="/cart"         element={<CartPage />}     />
          <Route path="/login"        element={<LoginPage />}    />
          <Route path="/register"     element={<RegisterPage />} />

          {/* Admin */}
          <Route path="/admin" element={
            <AdminRoute><AdminDashboard /></AdminRoute>
          }/>
          <Route path="/admin/products" element={
            <AdminRoute><AdminProducts /></AdminRoute>
          }/>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
        <ToastContainer position="top-right" autoClose={3000} />
      </AuthProvider>
    </Router>
  );
}

export default App;
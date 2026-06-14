import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.brand}>
        👟 SoleStore
      </Link>

      <div style={styles.links}>
        <Link to="/products" style={styles.link}>Products</Link>
        <Link to="/cart"     style={styles.link}>🛒 Cart</Link>

        {user ? (
          <>
            <span style={styles.username}>Hi, {user.name}!</span>
            {user.role === "admin" && (
              <Link to="/admin" style={styles.adminLink}>Admin</Link>
            )}
            <button onClick={handleLogout} style={styles.btn}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login"    style={styles.link}>Login</Link>
            <Link to="/register" style={styles.registerBtn}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav:         { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 2rem", background: "#1a1a2e", color: "#fff", position: "sticky", top: 0, zIndex: 100 },
  brand:       { color: "#e94560", textDecoration: "none", fontSize: "1.5rem", fontWeight: 800 },
  links:       { display: "flex", gap: "1.5rem", alignItems: "center" },
  link:        { color: "#fff", textDecoration: "none", fontSize: "0.95rem" },
  username:    { color: "#e94560", fontWeight: 600 },
  adminLink:   { color: "#f59e0b", textDecoration: "none", fontWeight: 600 },
  btn:         { background: "transparent", border: "1px solid #e94560", color: "#e94560", padding: "0.3rem 0.8rem", borderRadius: "6px", cursor: "pointer" },
  registerBtn: { background: "#e94560", color: "#fff", textDecoration: "none", padding: "0.35rem 1rem", borderRadius: "6px", fontSize: "0.9rem" },
};

export default Navbar;
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🔧 Admin Dashboard</h1>
      <p style={styles.sub}>Manage your SoleStore</p>

      <div style={styles.grid}>
        <Link to="/admin/products" style={styles.card}>
          <span style={styles.icon}>👟</span>
          <h3 style={styles.cardTitle}>Manage Products</h3>
          <p style={styles.cardDesc}>Add, edit or delete shoes</p>
        </Link>

        <Link to="/admin/orders" style={styles.card}>
          <span style={styles.icon}>📦</span>
          <h3 style={styles.cardTitle}>Manage Orders</h3>
          <p style={styles.cardDesc}>View and update orders</p>
        </Link>

        <Link to="/admin/users" style={styles.card}>
          <span style={styles.icon}>👥</span>
          <h3 style={styles.cardTitle}>Manage Users</h3>
          <p style={styles.cardDesc}>View registered users</p>
        </Link>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: "2rem", maxWidth: "900px", margin: "0 auto" },
  title:     { fontSize: "2rem", fontWeight: 800, color: "#1a1a2e" },
  sub:       { color: "#64748b", marginBottom: "2rem" },
  grid:      { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1.5rem" },
  card:      { background: "#fff", borderRadius: "16px", padding: "2rem", textDecoration: "none", color: "#1a1a2e", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", textAlign: "center", border: "2px solid transparent", transition: "border 0.2s" },
  icon:      { fontSize: "3rem", display: "block", marginBottom: "1rem" },
  cardTitle: { fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.5rem" },
  cardDesc:  { color: "#64748b", fontSize: "0.9rem" },
};

export default AdminDashboard;
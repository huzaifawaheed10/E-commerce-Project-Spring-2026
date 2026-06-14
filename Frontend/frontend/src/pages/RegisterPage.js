import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const [name,     setName]     = useState("");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const { registerUser, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(name, email, password);
      toast.success("Account created!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>👟 Create Account</h2>
        <p style={styles.sub}>Join SoleStore today</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Full Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={styles.input}
            placeholder="John Doe"
          />

          <label style={styles.label}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
            placeholder="you@example.com"
          />

          <label style={styles.label}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            style={styles.input}
            placeholder="At least 6 characters"
          />

          <button
            type="submit"
            disabled={loading}
            style={styles.btn}
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <p style={styles.footer}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#e94560" }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  page:  { display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh", background: "#f8fafc", padding: "2rem" },
  card:  { background: "#fff", borderRadius: "16px", padding: "2.5rem", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", width: "100%", maxWidth: "420px" },
  title: { fontSize: "1.8rem", fontWeight: 800, color: "#1a1a2e", marginBottom: "0.25rem", textAlign: "center" },
  sub:   { color: "#64748b", textAlign: "center", marginBottom: "1.5rem" },
  form:  { display: "flex", flexDirection: "column", gap: "0.75rem" },
  label: { fontWeight: 600, color: "#374151", fontSize: "0.9rem" },
  input: { padding: "0.7rem 1rem", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "0.95rem", outline: "none" },
  btn:   { marginTop: "0.5rem", padding: "0.85rem", background: "#e94560", color: "#fff", border: "none", borderRadius: "8px", fontSize: "1rem", fontWeight: 700, cursor: "pointer" },
  footer: { textAlign: "center", marginTop: "1.5rem", color: "#64748b" },
};

export default RegisterPage;
const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.section}>
          <h3 style={styles.brand}>👟 SoleStore</h3>
          <p style={styles.text}>Best shoes for Men, Women & Kids</p>
        </div>

        <div style={styles.section}>
          <h4 style={styles.heading}>Categories</h4>
          <p style={styles.text}>Men's Shoes</p>
          <p style={styles.text}>Women's Shoes</p>
          <p style={styles.text}>Kids' Shoes</p>
        </div>

        <div style={styles.section}>
          <h4 style={styles.heading}>Contact</h4>
          <p style={styles.text}>📧 info@solestore.com</p>
          <p style={styles.text}>📞 +92 300 1234567</p>
          <p style={styles.text}>📍 Peshawar, Pakistan</p>
        </div>
      </div>

      <div style={styles.bottom}>
        <p>© {new Date().getFullYear()} SoleStore. All rights reserved.</p>
      </div>
    </footer>
  );
};

const styles = {
  footer:    { background: "#1a1a2e", color: "#fff", marginTop: "auto", paddingTop: "2rem" },
  container: { display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: "2rem", padding: "0 2rem 2rem" },
  section:   { minWidth: "150px" },
  brand:     { color: "#e94560", fontSize: "1.3rem", marginBottom: "0.5rem" },
  heading:   { color: "#e94560", marginBottom: "0.75rem" },
  text:      { color: "#94a3b8", fontSize: "0.9rem", marginBottom: "0.4rem" },
  bottom:    { borderTop: "1px solid #2d2d44", padding: "1rem", textAlign: "center", color: "#64748b", fontSize: "0.85rem" },
};

export default Footer;
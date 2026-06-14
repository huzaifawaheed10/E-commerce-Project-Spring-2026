import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const image = product.images?.[0]?.url || 
    "https://via.placeholder.com/300x200?text=No+Image";

  return (
    <div style={styles.card}>
      <Link to={`/products/${product._id}`}>
        <img src={image} alt={product.name} style={styles.img} />
      </Link>

      <div style={styles.body}>
        <span style={styles.category}>{product.category}</span>
        <Link to={`/products/${product._id}`} style={styles.name}>
          {product.name}
        </Link>
        <p style={styles.brand}>{product.brand}</p>

        <div style={styles.footer}>
          <span style={styles.price}>${product.price}</span>
          <Link to={`/products/${product._id}`} style={styles.btn}>
            View Details
          </Link>
        </div>

        <p style={{
          color: product.stock > 0 ? "#10b981" : "#ef4444",
          fontSize: "0.8rem",
          marginTop: "0.5rem"
        }}>
          {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
        </p>
      </div>
    </div>
  );
};

const styles = {
  card:     { background: "#fff", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", overflow: "hidden", transition: "transform 0.2s", display: "flex", flexDirection: "column" },
  img:      { width: "100%", height: "200px", objectFit: "cover" },
  body:     { padding: "1rem", display: "flex", flexDirection: "column", gap: "0.3rem" },
  category: { color: "#e94560", fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 600 },
  name:     { color: "#1a1a2e", fontWeight: 700, textDecoration: "none", fontSize: "1rem" },
  brand:    { color: "#64748b", fontSize: "0.85rem", margin: 0 },
  footer:   { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.5rem" },
  price:    { fontWeight: 800, color: "#1a1a2e", fontSize: "1.2rem" },
  btn:      { background: "#e94560", color: "#fff", textDecoration: "none", padding: "0.4rem 0.8rem", borderRadius: "6px", fontSize: "0.85rem", fontWeight: 600 },
};

export default ProductCard;
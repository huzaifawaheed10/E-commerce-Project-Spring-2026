import { useState, useEffect } from "react";
import { useParams }  from "react-router-dom";
import { toast }      from "react-toastify";
import * as api       from "../utils/api";

const ProductPage = () => {
  const { id }            = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [qty, setQty]     = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getProductById(id)
      .then(({ data }) => setProduct(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize) return toast.error("Please select a size!");
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find(
      (i) => i._id === product._id && i.size === selectedSize
    );
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({ ...product, size: selectedSize, qty });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success("Added to cart! 🛒");
  };

  if (loading) return (
    <p style={{ textAlign: "center", padding: "3rem" }}>Loading...</p>
  );
  if (!product) return (
    <p style={{ textAlign: "center", padding: "3rem" }}>Product not found.</p>
  );

  const image = product.images?.[0]?.url ||
    "https://via.placeholder.com/500x400?text=No+Image";

  return (
    <div style={styles.container}>
      <div style={styles.left}>
        <img src={image} alt={product.name} style={styles.img} />
      </div>

      <div style={styles.right}>
        <span style={styles.category}>{product.category}'s Shoes</span>
        <h1 style={styles.name}>{product.name}</h1>
        <p style={styles.brand}>by {product.brand}</p>
        <p style={styles.price}>${product.price}</p>
        <p style={styles.desc}>{product.description}</p>

        {/* Size Selector */}
        {product.sizes?.length > 0 && (
          <div style={{ marginBottom: "1.5rem" }}>
            <p style={styles.label}>Select Size:</p>
            <div style={styles.sizes}>
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  style={{
                    ...styles.sizeBtn,
                    background: selectedSize === size ? "#e94560" : "#f1f5f9",
                    color:      selectedSize === size ? "#fff"    : "#1a1a2e",
                    border:     selectedSize === size
                      ? "2px solid #e94560" : "2px solid #e2e8f0",
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity */}
        <div style={{ marginBottom: "1.5rem" }}>
          <p style={styles.label}>Quantity:</p>
          <div style={styles.qtyRow}>
            <button onClick={() => setQty(Math.max(1, qty - 1))} style={styles.qtyBtn}>−</button>
            <span style={styles.qtyNum}>{qty}</span>
            <button onClick={() => setQty(qty + 1)} style={styles.qtyBtn}>+</button>
          </div>
        </div>

        <p style={{ color: product.stock > 0 ? "#10b981" : "#ef4444", fontWeight: 600, marginBottom: "1rem" }}>
          {product.stock > 0 ? `✅ In Stock (${product.stock} left)` : "❌ Out of Stock"}
        </p>

        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          style={{ ...styles.addBtn, opacity: product.stock === 0 ? 0.5 : 1 }}
        >
          🛒 Add to Cart
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", padding: "2rem", maxWidth: "1100px", margin: "0 auto" },
  left:      {},
  img:       { width: "100%", borderRadius: "16px", objectFit: "cover" },
  right:     { display: "flex", flexDirection: "column" },
  category:  { color: "#e94560", fontWeight: 600, textTransform: "uppercase", fontSize: "0.85rem" },
  name:      { fontSize: "2rem", fontWeight: 800, color: "#1a1a2e", margin: "0.5rem 0" },
  brand:     { color: "#64748b", marginBottom: "0.5rem" },
  price:     { fontSize: "2rem", fontWeight: 800, color: "#e94560", marginBottom: "1rem" },
  desc:      { color: "#475569", lineHeight: 1.7, marginBottom: "1.5rem" },
  label:     { fontWeight: 700, color: "#1a1a2e", marginBottom: "0.5rem" },
  sizes:     { display: "flex", gap: "0.5rem", flexWrap: "wrap" },
  sizeBtn:   { padding: "0.5rem 1rem", borderRadius: "8px", cursor: "pointer", fontWeight: 600 },
  qtyRow:    { display: "flex", alignItems: "center", gap: "1rem" },
  qtyBtn:    { background: "#f1f5f9", border: "none", borderRadius: "8px", padding: "0.5rem 1rem", fontSize: "1.2rem", cursor: "pointer" },
  qtyNum:    { fontSize: "1.2rem", fontWeight: 700, minWidth: "30px", textAlign: "center" },
  addBtn:    { padding: "1rem 2rem", background: "#e94560", color: "#fff", border: "none", borderRadius: "10px", fontSize: "1.1rem", fontWeight: 700, cursor: "pointer" },
};

export default ProductPage;
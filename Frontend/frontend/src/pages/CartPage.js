import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(saved);
  }, []);

  const updateQty = (index, qty) => {
    const updated = [...cart];
    if (qty <= 0) {
      updated.splice(index, 1);
      toast.info("Item removed");
    } else {
      updated[index].qty = qty;
    }
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const removeItem = (index) => {
    const updated = cart.filter((_, i) => i !== index);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    toast.info("Item removed");
  };

  const total = cart.reduce((acc, i) => acc + i.price * i.qty, 0);

  if (cart.length === 0) return (
    <div style={{ textAlign: "center", padding: "5rem 2rem" }}>
      <p style={{ fontSize: "3rem" }}>🛒</p>
      <h2 style={{ color: "#1a1a2e", marginBottom: "1rem" }}>
        Your cart is empty
      </h2>
      <Link to="/products" style={styles.shopBtn}>
        Start Shopping →
      </Link>
    </div>
  );

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Shopping Cart</h1>

      <div style={styles.layout}>
        {/* Items */}
        <div style={styles.items}>
          {cart.map((item, index) => (
            <div key={index} style={styles.item}>
              <img
                src={item.images?.[0]?.url ||
                  "https://via.placeholder.com/80"}
                alt={item.name}
                style={styles.img}
              />
              <div style={styles.info}>
                <p style={styles.name}>{item.name}</p>
                <p style={styles.size}>Size: {item.size}</p>
                <p style={styles.price}>${item.price}</p>
              </div>
              <div style={styles.qtyRow}>
                <button onClick={() => updateQty(index, item.qty - 1)}
                  style={styles.qtyBtn}>−</button>
                <span style={{ fontWeight: 700, padding: "0 0.5rem" }}>
                  {item.qty}
                </span>
                <button onClick={() => updateQty(index, item.qty + 1)}
                  style={styles.qtyBtn}>+</button>
              </div>
              <p style={styles.subtotal}>
                ${(item.price * item.qty).toFixed(2)}
              </p>
              <button onClick={() => removeItem(index)} style={styles.remove}>
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div style={styles.summary}>
          <h3 style={{ marginBottom: "1rem", color: "#1a1a2e" }}>
            Order Summary
          </h3>
          <div style={styles.row}>
            <span>Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div style={styles.row}>
            <span>Shipping</span>
            <span>{total > 100 ? "FREE" : "$10.00"}</span>
          </div>
          <hr style={{ margin: "1rem 0" }} />
          <div style={{ ...styles.row, fontWeight: 700, fontSize: "1.1rem" }}>
            <span>Total</span>
            <span>${(total + (total > 100 ? 0 : 10)).toFixed(2)}</span>
          </div>
          <button
            onClick={() => {
              const user = localStorage.getItem("userInfo");
              if (!user) {
                toast.error("Please login first!");
                navigate("/login");
              } else {
                toast.success("Order placed! 🎉");
                localStorage.removeItem("cart");
                setCart([]);
                navigate("/");
              }
            }}
            style={styles.checkoutBtn}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container:   { padding: "2rem", maxWidth: "1100px", margin: "0 auto" },
  title:       { fontSize: "1.8rem", fontWeight: 800, color: "#1a1a2e", marginBottom: "1.5rem" },
  layout:      { display: "grid", gridTemplateColumns: "1fr 320px", gap: "2rem", alignItems: "start" },
  items:       { display: "flex", flexDirection: "column", gap: "1rem" },
  item:        { display: "flex", alignItems: "center", gap: "1rem", background: "#fff", padding: "1rem", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" },
  img:         { width: "80px", height: "80px", objectFit: "cover", borderRadius: "8px", flexShrink: 0 },
  info:        { flex: 1 },
  name:        { fontWeight: 700, color: "#1a1a2e", margin: 0 },
  size:        { color: "#64748b", fontSize: "0.85rem", margin: "0.2rem 0" },
  price:       { color: "#e94560", fontWeight: 600, margin: 0 },
  qtyRow:      { display: "flex", alignItems: "center", border: "1px solid #e2e8f0", borderRadius: "8px", overflow: "hidden" },
  qtyBtn:      { background: "#f1f5f9", border: "none", padding: "0.4rem 0.7rem", cursor: "pointer", fontSize: "1rem" },
  subtotal:    { fontWeight: 700, color: "#1a1a2e", minWidth: "60px", textAlign: "right" },
  remove:      { background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontSize: "1.1rem" },
  summary:     { background: "#fff", padding: "1.5rem", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" },
  row:         { display: "flex", justifyContent: "space-between", marginBottom: "0.75rem", color: "#475569" },
  checkoutBtn: { display: "block", width: "100%", marginTop: "1rem", padding: "0.9rem", background: "#e94560", color: "#fff", border: "none", borderRadius: "8px", fontSize: "1rem", fontWeight: 700, cursor: "pointer" },
  shopBtn:     { background: "#e94560", color: "#fff", textDecoration: "none", padding: "0.8rem 2rem", borderRadius: "8px", fontWeight: 700 },
};

export default CartPage;
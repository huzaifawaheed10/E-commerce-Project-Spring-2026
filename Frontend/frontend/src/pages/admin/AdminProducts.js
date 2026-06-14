import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import * as api  from "../../utils/api";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const [form, setForm] = useState({
    name: "", description: "", price: "",
    category: "Men", brand: "", stock: "",
    sizes: "", images: "", featured: false,
  });

  const loadProducts = () => {
    setLoading(true);
    api.getProducts({})
      .then(({ data }) => setProducts(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadProducts(); }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        price:  Number(form.price),
        stock:  Number(form.stock),
        sizes:  form.sizes.split(",").map((s) => s.trim()).filter(Boolean),
        images: form.images ? [{ url: form.images }] : [],
      };

      if (editProduct) {
        await api.updateProduct(editProduct._id, payload);
        toast.success("Product updated!");
      } else {
        await api.createProduct(payload);
        toast.success("Product added!");
      }
      setShowForm(false);
      setEditProduct(null);
      setForm({ name: "", description: "", price: "", category: "Men", brand: "", stock: "", sizes: "", images: "", featured: false });
      loadProducts();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error saving product");
    }
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setForm({
      name:        product.name,
      description: product.description,
      price:       product.price,
      category:    product.category,
      brand:       product.brand || "",
      stock:       product.stock,
      sizes:       product.sizes?.join(", ") || "",
      images:      product.images?.[0]?.url || "",
      featured:    product.featured,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await api.deleteProduct(id);
      toast.success("Product deleted!");
      loadProducts();
    } catch (err) {
      toast.error("Error deleting product");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>👟 Manage Products</h1>
        <button
          onClick={() => { setShowForm(!showForm); setEditProduct(null);
            setForm({ name: "", description: "", price: "", category: "Men", brand: "", stock: "", sizes: "", images: "", featured: false });
          }}
          style={styles.addBtn}
        >
          {showForm ? "✕ Cancel" : "+ Add New Shoe"}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div style={styles.form}>
          <h2 style={{ marginBottom: "1.5rem", color: "#1a1a2e" }}>
            {editProduct ? "Edit Product" : "Add New Product"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div style={styles.grid2}>
              {[
                ["Product Name *", "name", "text"],
                ["Brand",          "brand", "text"],
                ["Price (USD) *",  "price", "number"],
                ["Stock *",        "stock", "number"],
              ].map(([label, name, type]) => (
                <div key={name}>
                  <label style={styles.label}>{label}</label>
                  <input
                    type={type} name={name}
                    value={form[name]} onChange={handleChange}
                    required={label.includes("*")}
                    style={styles.input}
                    min={type === "number" ? 0 : undefined}
                  />
                </div>
              ))}
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label style={styles.label}>Category *</label>
              <select name="category" value={form.category}
                onChange={handleChange} style={styles.input}>
                <option>Men</option>
                <option>Women</option>
                <option>Kids</option>
              </select>
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label style={styles.label}>Description *</label>
              <textarea name="description" value={form.description}
                onChange={handleChange} required rows={3}
                style={{ ...styles.input, resize: "vertical" }} />
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label style={styles.label}>
                Sizes (comma separated e.g: 38, 39, 40, 41)
              </label>
              <input name="sizes" value={form.sizes}
                onChange={handleChange} style={styles.input}
                placeholder="38, 39, 40, 41, 42" />
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label style={styles.label}>Image URL</label>
              <input name="images" value={form.images}
                onChange={handleChange} style={styles.input}
                placeholder="https://example.com/shoe.jpg" />
            </div>

            <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem", cursor: "pointer" }}>
              <input type="checkbox" name="featured"
                checked={form.featured} onChange={handleChange} />
              <span style={{ fontWeight: 600 }}>Featured Product</span>
            </label>

            <button type="submit" style={styles.submitBtn}>
              {editProduct ? "Update Product" : "Add Product"}
            </button>
          </form>
        </div>
      )}

      {/* Products Table */}
      {loading ? (
        <p style={{ textAlign: "center", padding: "2rem", color: "#64748b" }}>
          Loading...
        </p>
      ) : products.length === 0 ? (
        <p style={{ textAlign: "center", padding: "2rem", color: "#64748b" }}>
          No products yet. Add your first shoe!
        </p>
      ) : (
        <div style={styles.tableWrap}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.thead}>
                {["Image","Name","Category","Price","Stock","Featured","Actions"]
                  .map((h) => (
                  <th key={h} style={styles.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id} style={styles.tr}>
                  <td style={styles.td}>
                    <img
                      src={p.images?.[0]?.url ||
                        "https://via.placeholder.com/50"}
                      alt=""
                      style={{ width: 50, height: 50, objectFit: "cover", borderRadius: 6 }}
                    />
                  </td>
                  <td style={{ ...styles.td, fontWeight: 600 }}>{p.name}</td>
                  <td style={styles.td}>{p.category}</td>
                  <td style={styles.td}>${p.price}</td>
                  <td style={styles.td}>
                    <span style={{ color: p.stock > 0 ? "#10b981" : "#ef4444", fontWeight: 600 }}>
                      {p.stock}
                    </span>
                  </td>
                  <td style={styles.td}>{p.featured ? "⭐" : "—"}</td>
                  <td style={styles.td}>
                    <button onClick={() => handleEdit(p)}
                      style={styles.editBtn}>Edit</button>
                    <button onClick={() => handleDelete(p._id)}
                      style={styles.deleteBtn}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: { padding: "2rem", maxWidth: "1100px", margin: "0 auto" },
  header:    { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" },
  title:     { fontSize: "1.8rem", fontWeight: 800, color: "#1a1a2e" },
  addBtn:    { background: "#e94560", color: "#fff", border: "none", borderRadius: "8px", padding: "0.6rem 1.2rem", cursor: "pointer", fontWeight: 600 },
  form:      { background: "#fff", borderRadius: "16px", padding: "2rem", marginBottom: "2rem", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" },
  grid2:     { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" },
  label:     { display: "block", fontWeight: 600, color: "#374151", fontSize: "0.9rem", marginBottom: "0.3rem" },
  input:     { width: "100%", padding: "0.6rem 1rem", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "0.95rem", boxSizing: "border-box" },
  submitBtn: { padding: "0.8rem 2rem", background: "#e94560", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 700, cursor: "pointer", fontSize: "1rem" },
  tableWrap: { background: "#fff", borderRadius: "12px", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" },
  table:     { width: "100%", borderCollapse: "collapse" },
  thead:     { background: "#f8fafc" },
  th:        { padding: "0.75rem 1rem", textAlign: "left", color: "#64748b", fontSize: "0.85rem", fontWeight: 600 },
  tr:        { borderTop: "1px solid #f1f5f9" },
  td:        { padding: "0.75rem 1rem", color: "#1a1a2e" },
  editBtn:   { background: "#3b82f6", color: "#fff", border: "none", borderRadius: "6px", padding: "0.3rem 0.8rem", cursor: "pointer", marginRight: "0.5rem" },
  deleteBtn: { background: "#ef4444", color: "#fff", border: "none", borderRadius: "6px", padding: "0.3rem 0.8rem", cursor: "pointer" },
};

export default AdminProducts;
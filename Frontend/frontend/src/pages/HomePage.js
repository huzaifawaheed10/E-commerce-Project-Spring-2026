import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/common/ProductCard";
import * as api from "../utils/api";

const HomePage = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    api.getFeaturedProducts()
      .then(({ data }) => setFeatured(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Step Into Style</h1>
          <p style={styles.heroSub}>
            Discover the latest collection of shoes for Men, Women & Kids
          </p>
          <Link to="/products" style={styles.heroCTA}>
            Shop Now →
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Shop by Category</h2>
        <div style={styles.categories}>
          {["Men", "Women", "Kids"].map((cat) => (
            <Link
              key={cat}
              to={`/products?category=${cat}`}
              style={styles.catCard}
            >
              <span style={styles.catIcon}>
                {cat === "Men" ? "👞" : cat === "Women" ? "👠" : "👟"}
              </span>
              <span style={styles.catName}>{cat}'s Shoes</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Featured Products</h2>
        {loading ? (
          <p style={{ textAlign: "center", color: "#64748b" }}>
            Loading...
          </p>
        ) : featured.length > 0 ? (
          <div style={styles.grid}>
            {featured.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        ) : (
          <p style={{ textAlign: "center", color: "#64748b" }}>
            No featured products yet.
          </p>
        )}
      </section>
    </div>
  );
};

const styles = {
  hero:        { background: "linear-gradient(135deg, #1a1a2e 0%, #e94560 100%)", color: "#fff", padding: "5rem 2rem", textAlign: "center" },
  heroContent: { maxWidth: "600px", margin: "0 auto" },
  heroTitle:   { fontSize: "3rem", fontWeight: 800, margin: "0 0 1rem" },
  heroSub:     { fontSize: "1.2rem", color: "#f1f5f9", margin: "0 0 2rem" },
  heroCTA:     { background: "#fff", color: "#e94560", textDecoration: "none", padding: "0.8rem 2.5rem", borderRadius: "8px", fontWeight: 700, fontSize: "1rem" },
  section:     { padding: "3rem 2rem", maxWidth: "1200px", margin: "0 auto" },
  sectionTitle: { fontSize: "1.8rem", fontWeight: 700, color: "#1a1a2e", marginBottom: "1.5rem" },
  categories:  { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" },
  catCard:     { display: "flex", flexDirection: "column", alignItems: "center", background: "#f8fafc", borderRadius: "12px", padding: "2rem", textDecoration: "none", color: "#1a1a2e", gap: "0.5rem", border: "2px solid transparent", transition: "border 0.2s" },
  catIcon:     { fontSize: "3rem" },
  catName:     { fontWeight: 700, fontSize: "1.1rem" },
  grid:        { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1.5rem" },
};

export default HomePage;
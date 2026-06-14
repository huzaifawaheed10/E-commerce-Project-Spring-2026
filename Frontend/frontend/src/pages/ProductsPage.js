import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/common/ProductCard";
import * as api from "../utils/api";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [search,   setSearch]   = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") || "";

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (category) params.category = category;
    if (search)   params.keyword  = search;

    api.getProducts(params)
      .then(({ data }) => setProducts(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [category]);

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    api.getProducts({ keyword: search, category })
      .then(({ data }) => setProducts(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <h3 style={styles.filterTitle}>Categories</h3>
        {["", "Men", "Women", "Kids"].map((cat) => (
          <button
            key={cat}
            onClick={() => setSearchParams(cat ? { category: cat } : {})}
            style={{
              ...styles.catBtn,
              background: category === cat ? "#e94560" : "#f1f5f9",
              color:      category === cat ? "#fff"    : "#1a1a2e",
            }}
          >
            {cat || "All Shoes"}
          </button>
        ))}
      </aside>

      {/* Main */}
      <main style={styles.main}>
        <form onSubmit={handleSearch} style={styles.searchBar}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search shoes..."
            style={styles.searchInput}
          />
          <button type="submit" style={styles.searchBtn}>
            Search
          </button>
        </form>

        {loading ? (
          <p style={{ textAlign: "center", padding: "3rem", color: "#64748b" }}>
            Loading shoes...
          </p>
        ) : products.length === 0 ? (
          <p style={{ textAlign: "center", padding: "3rem", color: "#64748b" }}>
            No shoes found.
          </p>
        ) : (
          <div style={styles.grid}>
            {products.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

const styles = {
  container:   { display: "flex", gap: "2rem", padding: "2rem", maxWidth: "1200px", margin: "0 auto" },
  sidebar:     { width: "200px", flexShrink: 0 },
  filterTitle: { fontWeight: 700, color: "#1a1a2e", marginBottom: "1rem", fontSize: "1.1rem" },
  catBtn:      { display: "block", width: "100%", padding: "0.6rem 1rem", marginBottom: "0.5rem", border: "none", borderRadius: "8px", cursor: "pointer", textAlign: "left", fontWeight: 600, fontSize: "0.95rem" },
  main:        { flex: 1 },
  searchBar:   { display: "flex", gap: "0.5rem", marginBottom: "1.5rem" },
  searchInput: { flex: 1, padding: "0.7rem 1rem", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "0.95rem", outline: "none" },
  searchBtn:   { padding: "0.7rem 1.5rem", background: "#e94560", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: 600 },
  grid:        { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1.5rem" },
};

export default ProductsPage;
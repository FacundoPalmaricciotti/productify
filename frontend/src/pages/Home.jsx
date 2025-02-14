import { useEffect, useState } from "react";
import { Layout } from "../components/layouts.jsx";
import { getAllProducts } from "../services/api.js";
import { FaSearch, FaArrowUp } from "react-icons/fa";
import "./Home.css";

const formatPrice = (price) => {
  return `$ ${price.toLocaleString("es-ES")}`;
};

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showScroll, setShowScroll] = useState(false);

  const fetchingProducts = async () => {
    const data = await getAllProducts();
    setProducts(data);
  };

  useEffect(() => {
    fetchingProducts();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="home">
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Busque un producto..." 
            className="search-bar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="search-icon" />
        </div>
        {filteredProducts.length > 0 ? (
          <div className="products-container">
            {filteredProducts.map((product) => (
              <div className="product-card" key={product.id || product.name}>
                <h2 className="product-name">{product.name}</h2>
                <p className="product-price">{formatPrice(product.price)}</p>
                <p className="product-stock">Stock: {product.stock}</p>
                <p className="product-category">{product.category}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>Lo lamentamos, aún no disponemos de: "{searchTerm}"</p>
        )}

        {showScroll && (
          <button className="scroll-to-top" onClick={scrollToTop}>
            <FaArrowUp />
          </button>
        )}
      </div>
    </Layout>
  );
};

export { Home };
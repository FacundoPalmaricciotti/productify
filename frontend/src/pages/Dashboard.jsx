import { useEffect, useState } from "react";
import { Layout } from "../components/layouts";
import { getAllProducts, createProduct, updateProduct, deleteProduct } from "../services/api";
import { FaSearch, FaEdit, FaTrash, FaArrowUp } from "react-icons/fa";
import "./Dashboard.css";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({ name: "", price: "", stock: 0, category: "Electronics" });
  const [editingId, setEditingId] = useState(null);
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fetchProducts = async () => {
    const data = await getAllProducts();
    setProducts(data);
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "stock") {
      value = Math.max(0, Number(value)); 
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateProduct(editingId, formData);
    } else {
      await createProduct(formData);
    }
    fetchProducts();
    setFormData({ name: "", price: "", stock: 0, category: "Electronics" });
    setEditingId(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEdit = (product) => {
    setFormData({ name: product.name, price: product.price, stock: product.stock, category: product.category });
    setEditingId(product.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id, name) => {
    const confirmDelete = window.confirm(`¿Seguro que quieres eliminar el producto "${name}"?`);
    if (confirmDelete) {
      await deleteProduct(id);
      fetchProducts();
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="dashboard">
        <h2 className="dashboard-title">Panel de Administración</h2>

        <div className="form-card">
          <form className="product-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input type="text" name="name" placeholder="Nombre" value={formData.name} onChange={handleChange} required />
              <input type="number" name="price" placeholder="Precio" value={formData.price} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleChange} required />
              <select name="category" value={formData.category} onChange={handleChange}>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Food">Food</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <button type="submit">{editingId ? "Actualizar" : "Agregar"}</button>
          </form>
        </div>

         <div className="search-container">
          <input
            type="text"
            placeholder="Buscar producto..."
            className="search-bar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="search-icon" />
        </div>

        <table className="product-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Categoría</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>$ {product.price.toLocaleString("es-ES")}</td>
                  <td>{product.stock}</td>
                  <td>{product.category}</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(product)}>
                      <FaEdit />
                    </button>
                    <button className="delete-btn" onClick={() => handleDelete(product.id, product.name)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No hay productos disponibles.</td>
              </tr>
            )}
          </tbody>
        </table>

        {showScroll && (
          <button className="scroll-to-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <FaArrowUp />
          </button>
        )}
      </div>
    </Layout>
  );
};

export { Dashboard };

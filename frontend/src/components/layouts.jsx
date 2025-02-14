import { Link } from "react-router-dom";
import { ShoppingCart, Home, BarChart } from "lucide-react"; // Importamos los iconos
import "./Layout.css";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <header className="header">
        <Link to="/" className="logo">
          <ShoppingCart size={28} /> PRODUCTIFY
        </Link>
        <nav>
          <ul>
            <li>
              <Link to="/">
                <Home size={20} /> Home
              </Link>
            </li>
            <li>
              <Link to="/dashboard">
                <BarChart size={20} /> Dashboard
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className="content">{children}</main>

      <footer className="footer">
        <p>© 2025 Productify. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export {Layout};


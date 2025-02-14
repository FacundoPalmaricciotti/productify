import { Link } from "react-router-dom";
import "./notfound.css";
import { Layout } from "../components/layouts";

const NotFound = () => {
  return (
    <Layout>
    <div className="notfound-container">
      <div className="stars"></div>
      <div className="stars2"></div>
      <div className="stars3"></div>
      <div className="content">
        <h1>🚀 Upss, creo que te fuiste más allá... 🌌</h1>
        <p>La página que buscas no existe o te perdiste en el espacio.</p>
        <Link to="/" className="home-button">Volver a casa 🏠</Link>
      </div>
    </div>
    </Layout>
  );
};

export { NotFound };

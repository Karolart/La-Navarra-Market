import { Link } from "react-router-dom";
import negocios from "../data/negocios.json";
import "../styles/Home.css";

function Home() {
  return (
    <div className="home-container">
      <h1>Directorio La Navarra</h1>
      <div className="card-list">
        {Object.entries(negocios).map(([slug, negocio]) => (
          <Link key={slug} to={`/negocio/${slug}`} className="card">
            <img src={negocio.logo} alt={negocio.nombre} />
            <h2>{negocio.nombre}</h2>
            <p>{negocio.descripcion}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;

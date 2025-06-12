import { Link } from "react-router-dom";
import categorias from "../data/categorias.json";
import "../styles/Home.css";
//import clickSound from "../assets/click.mp3"; // Asegúrate de tener este archivo en esa ruta

function Home() {
  const handleClick = () => {
    const audio = new Audio(clickSound);
    audio.play();
  };

  return (
    <div className="home-container">
      <div className="banner">
        <h1>Directorio La Navarra</h1>
      </div>

      <div className="card-list">
        {categorias.map((categoria) => (
          <Link
            key={categoria.slug}
            to={`/categoria/${categoria.slug}`}
            className="card"
            onClick={handleClick}
          >
            <img src={categoria.portada} alt={categoria.nombre} />
            <h2>{categoria.nombre}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;

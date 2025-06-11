import { useParams } from "react-router-dom";
import negocios from "../data/negocios.json";
import "../styles/Negocio.css";

function Negocio() {
  const { slug } = useParams();
  const negocio = negocios[slug];

  if (!negocio) return <h2>Negocio no encontrado</h2>;

  return (
    <div className="negocio-container">
      <img src={negocio.logo} alt={negocio.nombre} className="negocio-logo" />
      <h1>{negocio.nombre}</h1>
      <div className="iframe-container">
        <iframe src={negocio.pdf} title="Menu PDF" />
      </div>
      <div className="botones-contacto">
        <a href={negocio.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a>
        <a href={negocio.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
        <a href={negocio.pdf} download>Descargar PDF</a>
      </div>
    </div>
  );
}

export default Negocio;

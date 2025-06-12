import { useParams } from "react-router-dom";
import negocios from "../data/negocios.json";
import { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import "../styles/negocio.css";

// Configurar el worker de PDF.js
import pdfWorker from "pdfjs-dist/build/pdf.worker?worker";
pdfjsLib.GlobalWorkerOptions.workerPort = new pdfWorker();


function Negocio() {
  const { slug } = useParams();
  const negocio = negocios[slug];
  const canvasRef = useRef(null);
  const [pdfDoc, setPdfDoc] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  

  useEffect(() => {
    if (!negocio?.pdf) return;
    const fetchPDF = async () => {
      try {
        const loadingTask = pdfjsLib.getDocument(negocio.pdf);
        const pdf = await loadingTask.promise;
        setPdfDoc(pdf);
      } catch (error) {
        console.error("Error al cargar el PDF:", error);
      }
    };
    fetchPDF();
  }, [negocio]);

  useEffect(() => {
    const renderPage = async () => {
      if (!pdfDoc) return;
      try {
        const page = await pdfDoc.getPage(pageNum);
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        // Cambia el tamaño aquí si quieres que se vea más pequeño
        const scale = 1.0; // Puedes ajustar este valor
        const viewport = page.getViewport({
          scale: 1.0,
          rotation: page.rotate, // 🧠 usa la rotación del PDF
        });

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport,
        };

        await page.render(renderContext).promise;
      } catch (error) {
        console.error("Error al renderizar la página:", error);
      }
    };
    renderPage();
  }, [pdfDoc, pageNum]);

  if (!negocio) return <h2>Negocio no encontrado</h2>;

  return (
    <div className="negocio-container">
      <img src={negocio.logo} alt={negocio.nombre} className="negocio-logo" />
      <h1>{negocio.nombre}</h1>

      <div className="pdf-viewer">
        <canvas ref={canvasRef}></canvas>
        <div className="nav-buttons">
          <button
            onClick={() => setPageNum((prev) => Math.max(prev - 1, 1))}
            className="hand-btn"
          >
            👈
          </button>
          <button
            onClick={() => setPageNum((prev) => Math.min(prev + 1, pdfDoc?.numPages || 1))}
            className="hand-btn"
          >
            👉
          </button>
        </div>
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

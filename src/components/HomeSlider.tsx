import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

// Interfaz que define la estructura de cada imagen del slider
interface SlideImage {
  url: string; // URL de la imagen
}

// Estilos aplicados a cada diapositiva
const divStyle: React.CSSProperties = {
  display: "flex", // Usa flexbox para centrar contenido
  alignItems: "center", // Centra verticalmente
  justifyContent: "center", // Centra horizontalmente
  backgroundSize: "cover", // Imagen cubre el contenedor
  height: "400px", // Altura fija
  filter: "grayscale(1)", // Filtro de escala de grises
  transition: "ease-in" // Transición suave
};

// Lista de imágenes para el slider
const slideImages: SlideImage[] = [
  {
    url: "https://www.ziprararchiver.com/blog/images/guidelines-for-the-most-effective-methods-of-choosing-digital-document-formats.jpg", // Imagen 1
  },
  {
    url: "https://elements-resized.envatousercontent.com/elements-video-cover-images/files/e6797b57-08af-49aa-b4d7-a4a2dccc6545/inline_image_preview.jpg?w=500&cf_fit=cover&q=85&format=auto&s=e90a4a08a3d62713044edb431bd8c04e1731fc2dbd4fa60f69b60198c8bc524b", // Imagen 2
  },
  {
    url: "https://media.gettyimages.com/id/1324171825/es/v%C3%ADdeo/hombre-que-rellena-el-formulario-de-impuestos.jpg?s=640x640&k=20&c=8kzAMxqEYPHZWDgC0RR8BEbLqDOBFrgD7VKLfY-ADAU=", // Imagen 3
  },
];

/**
 * Componente funcional que muestra un carrusel de imágenes en la página principal.
 * Utiliza react-slideshow-image para crear un slider automático.
 * @returns {JSX.Element} Slider con imágenes y estilos personalizados.
 */
const HomeSlider: React.FC = () => {
  return (
    <div className="slide-container"> {/* Contenedor del slider */}
      <Slide
        duration={3000} // Cada imagen dura 3 segundos
        autoplay={true} // Reproducción automática
        transitionDuration={400} // Transición de 400ms entre imágenes
        infinite={true} // Ciclo infinito
        arrows={false} // Sin flechas de navegación
      >
        {slideImages.map((slideImage: SlideImage, index: number) => ( // Mapea las imágenes
          <div key={index}> {/* Contenedor individual por imagen */}
            <div
              style={{ ...divStyle, backgroundImage: `url(${slideImage.url})` }} // Estilos con imagen de fondo
            ></div>
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default HomeSlider;
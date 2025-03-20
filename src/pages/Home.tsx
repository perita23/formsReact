import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import HomeSlider from "../components/HomeSlider";

/**
 * Componente funcional que representa la página principal de la aplicación.
 * Muestra un título, descripción, slider y opciones para cambiar idioma.
 * @returns {JSX.Element} Estructura de la página principal con elementos traducidos.
 */
export const Home = () => {
  const { t } = useTranslation(); // Hook para acceder a traducciones

  return (
    <div className="home"> {/* Contenedor principal de la página */}
      <div className="home-top-row"> {/* Fila superior para el título */}
        <h1
          className="htr-title" // Clase para estilos del título
          dangerouslySetInnerHTML={{ __html: t("home.title") }} // Inserta el título traducido como HTML
        />
      </div>
      <div className="home-bot-row"> {/* Fila inferior con contenido */}
        <div className="hbr-cont hbr-1-cont"> {/* Sección con descripción y botón */}
          <p className="hbr-cont-text">
            {t("home.description")} {/* Descripción traducida */}
          </p>
          <Link className="button" to="/survey"> {/* Enlace a la página de encuesta */}
            {t("home.startButton")} {/* Texto del botón traducido */}
            <svg
              className="button-icon custom-fill" // Clases para el ícono
              xmlns="http://www.w3.org/2000/svg" // Namespace del SVG
              height="30px" // Altura del ícono
              viewBox="0 -960 960 960" // Área visible del SVG
              width="30px" // Ancho del ícono
              fill="#FFFFFF" // Relleno blanco
            >
              <path d="M246.67-244 200-290.67l402.67-402.66H236V-760h480v480h-66.67v-366.67L246.67-244Z" /> {/* Forma de flecha */}
            </svg>
          </Link>
        </div>
        <div className="hbr-cont"> {/* Sección para el slider */}
          <HomeSlider /> {/* Componente de carrusel */}
        </div>
        <div className="hbr-cont"> {/* Sección para cambio de idioma */}
          <h2 className="hbr-lang-title">{t("home.changelang")}</h2> {/* Título traducido */}
          <div className="hbr-cont-lang"> {/* Contenedor de botones de idioma */}
            <div className="lang-center-container"> {/* Centra los botones */}
              <button
                className="lang-button" // Estilo del botón
                onClick={() => i18next.changeLanguage("es")} // Cambia a español
              >
                {t("home.language.es")} {/* Nombre del idioma español */}
              </button>
              <button
                className="lang-button"
                onClick={() => i18next.changeLanguage("en")} // Cambia a inglés
              >
                {t("home.language.en")} {/* Nombre del idioma inglés */}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
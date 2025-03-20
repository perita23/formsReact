import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

/**
 * Componente funcional que muestra los resultados de las encuestas.
 * Permite reiniciar el progreso o regresar a las encuestas con traducciones dinámicas.
 * @returns {JSX.Element} Página de resultados con respuestas y opciones de navegación.
 */
export const Result = () => {
  const [responses, setResponses] = useState<Record<number, Record<string, string | string[]>> | null>(null); // Estado para almacenar las respuestas
  const { t } = useTranslation(); // Hook para traducciones
  const navigate = useNavigate(); // Hook para navegación programática

  // Reinicia el progreso eliminando datos y redirigiendo al inicio
  const handleRestart = () => {
    localStorage.removeItem('surveyResponses'); // Borra las respuestas guardadas
    localStorage.removeItem('currentSurveyIndex'); // Borra el índice actual
    navigate('/'); // Redirige a la página principal
  };

  useEffect(() => { // Carga las respuestas desde localStorage al montar
    const savedResponses = localStorage.getItem('surveyResponses');
    if (savedResponses) {
      setResponses(JSON.parse(savedResponses)); // Establece las respuestas si existen
    }
  }, []); // Ejecuta solo al montar

  if (!responses) return <div className="result-no-responses">{t('result.noResponses')}</div>; // Si no hay respuestas, muestra mensaje

  // Traduce respuestas si tienen claves de traducción
  const translateAnswer = (answer: string | string[]): string => {
    if (Array.isArray(answer)) { // Si es un array, traduce cada elemento si aplica
      return answer.map((item) => (item.startsWith('survey.') ? t(item) : item)).join(', ');
    }
    return answer.startsWith('survey.') ? t(answer) : answer; // Traduce si es clave, sino muestra tal cual
  };

  return (
    <div className="result"> {/* Contenedor principal */}
      <h1>{t('result.title')}</h1> {/* Título traducido */}
      {Object.entries(responses).map(([surveyId, surveyResponses]) => ( // Mapea cada encuesta
        <div key={surveyId} className="result-survey"> {/* Sección por encuesta */}
          <h2>{t('result.surveyLabel', { id: surveyId })}</h2> {/* Etiqueta traducida de la encuesta */}
          <ul className="result-responses"> {/* Lista de respuestas */}
            {Object.entries(surveyResponses).map(([questionId, answer]) => ( // Mapea cada respuesta
              <li key={questionId} className="result-response-item">
                <span className="result-question-label">
                  {t(`survey.${surveyId}.question.${questionId}`)}: {/* Pregunta traducida */}
                </span>
                <span className="result-response-text">{translateAnswer(answer)}</span> {/* Respuesta traducida */}
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className="result-buttons"> {/* Contenedor de botones */}
        <Link className="survey-back-buttons" to="/survey"> {/* Enlace para volver a encuestas */}
          {t('result.returnToSurvey')} {/* Texto traducido */}
        </Link>
        <h4 className="restart-button" onClick={handleRestart}> {/* Botón de reinicio */}
          <svg
            className="restart-icon" // Estilo del ícono
            xmlns="http://www.w3.org/2000/svg" // Namespace del SVG
            height="24px" // Altura del ícono
            viewBox="0 -960 960 960" // Área visible
            width="24px" // Ancho del ícono
            fill="#FFFFFF" // Relleno blanco
          >
            <path d="M440-122q-121-15-200.5-105.5T160-440q0-66 26-126.5T260-672l57 57q-38 34-57.5 79T240-440q0 88 56 155.5T440-202v80Zm80 0v-80q87-16 143.5-83T720-440q0-100-70-170t-170-70h-3l44 44-56 56-140-140 140-140 56 56-44 44h3q134 0 227 93t93 227q0 121-79.5 211.5T520-122Z" /> {/* Forma de flecha circular */}
          </svg>
        </h4>
      </div>
    </div>
  );
};
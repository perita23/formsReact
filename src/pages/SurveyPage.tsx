import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { getSurveys } from '../api/surveys';
import { Formulario } from '../components/Formulario';
import { Survey } from '../types';

/**
 * Componente funcional que representa la página de encuestas.
 * Gestiona la navegación entre encuestas y el almacenamiento de respuestas.
 * @returns {JSX.Element} Página de encuesta con formulario y controles de navegación.
 */
export const SurveyPage = () => {
  const { t } = useTranslation(); // Hook para traducciones
  const surveys = getSurveys(); // Obtiene la lista de encuestas
  const [currentSurveyIndex, setCurrentSurveyIndex] = useState(() => { // Estado para el índice de la encuesta actual
    const savedIndex = localStorage.getItem('currentSurveyIndex'); // Recupera el índice guardado
    return savedIndex ? parseInt(savedIndex, 10) : 0; // Usa el guardado o inicia en 0
  });
  const [allResponses, setAllResponses] = useState<Record<number, Record<string, string | string[]>>>(() => { // Estado para todas las respuestas
    const savedResponses = localStorage.getItem('surveyResponses'); // Recupera respuestas guardadas
    return savedResponses ? JSON.parse(savedResponses) : {}; // Usa las guardadas o inicia vacío
  });
  const navigate = useNavigate(); // Hook para navegación programática

  const currentSurvey: Survey = surveys[currentSurveyIndex]; // Encuesta actual según el índice

  useEffect(() => { // Efecto para guardar el índice en localStorage
    localStorage.setItem('currentSurveyIndex', currentSurveyIndex.toString()); // Almacena el índice como string
  }, [currentSurveyIndex]); // Se ejecuta cada vez que cambia el índice

  // Maneja el envío del formulario
  const handleSubmit = (responses: Record<string, string | string[]>) => {
    const updatedResponses = { ...allResponses, [currentSurvey.id]: responses }; // Actualiza las respuestas con las nuevas
    setAllResponses(updatedResponses); // Actualiza el estado
    localStorage.setItem('surveyResponses', JSON.stringify(updatedResponses)); // Guarda en localStorage

    if (currentSurveyIndex < surveys.length - 1) { // Si hay más encuestas
      setCurrentSurveyIndex(currentSurveyIndex + 1); // Avanza a la siguiente
    } else {
      navigate('/result'); // Si es la última, redirige a resultados
    }
  };

  // Maneja el retroceso a la encuesta anterior
  const handlePrevious = () => {
    if (currentSurveyIndex > 0) { // Si no es la primera encuesta
      setCurrentSurveyIndex(currentSurveyIndex - 1); // Retrocede una posición
    }
  };

  return (
    <div className="survey-cont"> {/* Contenedor principal de la página */}
      <div className="survey-cont-center"> {/* Centra el contenido */}
        <h1>{t(currentSurvey.titulo)}</h1> {/* Título traducido de la encuesta */}
        <Formulario
          questions={currentSurvey.preguntas} // Preguntas de la encuesta actual
          onSubmit={handleSubmit} // Función para manejar el envío
          initialResponses={allResponses[currentSurvey.id] || {}} // Respuestas previas de esta encuesta
        />
        <div className="survey-navigation"> {/* Sección de navegación */}
          {currentSurveyIndex > 0 && ( // Si no es la primera, muestra el botón "Anterior"
            <h4
              className="survey-previous-btn" // Estilo del botón
              onClick={handlePrevious} // Llama a la función de retroceso
            >
              {t('survey.previousButton')} {/* Texto traducido */}
            </h4>
          )}
          <p>
            {t('survey.progress', { // Indicador de progreso traducido
              current: currentSurveyIndex + 1, // Número actual (base 1)
              total: surveys.length, // Total de encuestas
            })}
          </p>
        </div>
      </div>
    </div>
  );
};
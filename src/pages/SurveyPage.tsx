
import { useState, useEffect } from 'react'; // Añadimos useEffect
import { Formulario } from '../components/Formulario';
import { getSurveys } from '../api/surveys';
import { Survey } from '../types';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const SurveyPage = () => {
  const { t } = useTranslation();
  const surveys = getSurveys();
  const [currentSurveyIndex, setCurrentSurveyIndex] = useState(() => {
    // Cargar el índice desde localStorage, o 0 si no hay nada
    const savedIndex = localStorage.getItem('currentSurveyIndex');
    return savedIndex ? parseInt(savedIndex, 10) : 0;
  });
  const [allResponses, setAllResponses] = useState<Record<number, Record<string, string | string[]>>>(
    () => {
      // Cargar respuestas desde localStorage, o {} si no hay nada
      const savedResponses = localStorage.getItem('surveyResponses');
      return savedResponses ? JSON.parse(savedResponses) : {};
    }
  );
  const navigate = useNavigate();

  const currentSurvey: Survey = surveys[currentSurveyIndex];

  // Guardar el índice en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('currentSurveyIndex', currentSurveyIndex.toString());
  }, [currentSurveyIndex]);

  const handleSubmit = (responses: Record<string, string | string[]>) => {
    const updatedResponses = { ...allResponses, [currentSurvey.id]: responses };
    setAllResponses(updatedResponses);
    localStorage.setItem("surveyResponses", JSON.stringify(updatedResponses));

    if (currentSurveyIndex < surveys.length - 1) {
      setCurrentSurveyIndex(currentSurveyIndex + 1);
    } else {
      navigate("/result");
    }
  };

  return (
    <div className="survey-cont">
      <div className="survey-cont-center">
        <h1>{t(currentSurvey.titulo)}</h1>
        <Formulario
          questions={currentSurvey.preguntas}
          onSubmit={handleSubmit}
          initialResponses={allResponses[currentSurvey.id] || {}} // Pasamos respuestas iniciales
        />
        <p>
          {t("survey.progress", {
            current: currentSurveyIndex + 1,
            total: surveys.length,
          })}
        </p>
      </div>
    </div>
  );
};

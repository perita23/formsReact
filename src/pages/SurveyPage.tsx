import { useState } from 'react';
import { Formulario } from '../components/Formulario';
import { getSurveys } from '../api/surveys';
import { Survey } from '../types';
import { useNavigate } from 'react-router-dom';

export const SurveyPage = () => {
  const surveys = getSurveys();
  const [currentSurveyIndex, setCurrentSurveyIndex] = useState(0);
  const [allResponses, setAllResponses] = useState<Record<number, Record<string, string | string[]>>>({});
  const navigate = useNavigate();

  const currentSurvey: Survey = surveys[currentSurveyIndex];

  const handleSubmit = (responses: Record<string, string | string[]>) => {
    // Calculamos el nuevo estado manualmente
    const updatedResponses = { ...allResponses, [currentSurvey.id]: responses };

    // Actualizamos el estado
    setAllResponses(updatedResponses);

    // Guardamos en localStorage con el estado actualizado
    localStorage.setItem('surveyResponses', JSON.stringify(updatedResponses));

    // Avanzamos o navegamos
    if (currentSurveyIndex < surveys.length - 1) {
      setCurrentSurveyIndex(currentSurveyIndex + 1);
    } else {
      navigate('/result');
    }
  };

  return (
    <div className="survey">
      <h1>{currentSurvey.titulo}</h1>
      <Formulario questions={currentSurvey.preguntas} onSubmit={handleSubmit} />
      <p>Progreso: {currentSurveyIndex + 1} de {surveys.length}</p>
    </div>
  );
};
import { useState } from 'react';
import { Formulario } from '../components/Formulario';
import { getSurveys } from '../api/surveys';
import { Survey } from '../types';

export const SurveyPage = () => { // Cambié "Survey" por "SurveyPage"
  const surveys = getSurveys();
  const [currentSurveyIndex, setCurrentSurveyIndex] = useState(0);
  const [allResponses, setAllResponses] = useState<Record<number, Record<number, string | string[]>>>({});

  const currentSurvey: Survey = surveys[currentSurveyIndex];

  const handleSubmit = (responses: Record<number, string | string[]>) => {
    setAllResponses((prev) => ({ ...prev, [currentSurvey.id]: responses }));
    if (currentSurveyIndex < surveys.length - 1) {
      setCurrentSurveyIndex(currentSurveyIndex + 1);
    } else {
      console.log('Encuestas completadas:', allResponses);
      alert('¡Gracias por completar las encuestas!');
    }
  };

  return (
    <div className="survey">
      <h1>{currentSurvey.title}</h1>
      <Formulario questions={currentSurvey.questions} onSubmit={handleSubmit} />
      <p>Progreso: {currentSurveyIndex + 1} de {surveys.length}</p>
    </div>
  );
};
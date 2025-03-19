import { useState } from 'react';
import { Formulario } from '../components/Formulario';
import { getSurveys } from '../api/surveys';
import { Survey } from '../types';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const SurveyPage = () => {
  const { t } = useTranslation();
  const surveys = getSurveys();
  const [currentSurveyIndex, setCurrentSurveyIndex] = useState(0);
  const [allResponses, setAllResponses] = useState<Record<number, Record<string, string | string[]>>>({});
  const navigate = useNavigate();

  const currentSurvey: Survey = surveys[currentSurveyIndex];

  const handleSubmit = (responses: Record<string, string | string[]>) => {
    const updatedResponses = { ...allResponses, [currentSurvey.id]: responses };
    setAllResponses(updatedResponses);
    localStorage.setItem('surveyResponses', JSON.stringify(updatedResponses));

    if (currentSurveyIndex < surveys.length - 1) {
      setCurrentSurveyIndex(currentSurveyIndex + 1);
    } else {
      navigate('/result');
    }
  };

  return (
    <div className="survey">
      <h1>{t(currentSurvey.titulo)}</h1>
      <Formulario questions={currentSurvey.preguntas} onSubmit={handleSubmit} />
      <p>{t('survey.progress', { current: currentSurveyIndex + 1, total: surveys.length })}</p>
    </div>
  );
};
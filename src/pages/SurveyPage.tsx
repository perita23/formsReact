import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { getSurveys } from '../api/surveys';
import { Formulario } from '../components/Formulario';
import { Survey } from '../types';

export const SurveyPage = () => {
  const { t } = useTranslation();
  const surveys = getSurveys();
  const [currentSurveyIndex, setCurrentSurveyIndex] = useState(() => {
    const savedIndex = localStorage.getItem('currentSurveyIndex');
    return savedIndex ? parseInt(savedIndex, 10) : 0;
  });
  const [allResponses, setAllResponses] = useState<Record<number, Record<string, string | string[]>>>(
    () => {
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
    localStorage.setItem('surveyResponses', JSON.stringify(updatedResponses));

    if (currentSurveyIndex < surveys.length - 1) {
      setCurrentSurveyIndex(currentSurveyIndex + 1);
    } else {
      navigate('/result');
    }
  };

  const handlePrevious = () => {
    if (currentSurveyIndex > 0) {
      setCurrentSurveyIndex(currentSurveyIndex - 1);
    }
  };

  return (
    <div className="survey-cont">
      <div className="survey-cont-center">
        <h1>{t(currentSurvey.titulo)}</h1>
        <Formulario
          questions={currentSurvey.preguntas}
          onSubmit={handleSubmit}
          initialResponses={allResponses[currentSurvey.id] || {}}
        />
        <div className="survey-navigation">
          {currentSurveyIndex > 0 && (
            <h4
              className="survey-previous-btn"
              onClick={handlePrevious}
            >
              {t('survey.previousButton')}
            </h4>
          )}
          <p>
            {t('survey.progress', {
              current: currentSurveyIndex + 1,
              total: surveys.length,
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

export const Result = () => {
  const [responses, setResponses] = useState<Record<number, Record<string, string | string[]>> | null>(null);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleRestart = () => {
    localStorage.removeItem('surveyResponses');
    localStorage.removeItem('currentSurveyIndex');
    navigate('/');
  };

  useEffect(() => {
    const savedResponses = localStorage.getItem('surveyResponses');
    if (savedResponses) {
      setResponses(JSON.parse(savedResponses));
    }
  }, []);

  if (!responses) return <div className="result-no-responses">{t('result.noResponses')}</div>;

  const translateAnswer = (answer: string | string[]): string => {
    if (Array.isArray(answer)) {
      return answer.map((item) => (item.startsWith('survey.') ? t(item) : item)).join(', ');
    }
    return answer.startsWith('survey.') ? t(answer) : answer;
  };

  return (
    <div className="result">
      <h1>{t('result.title')}</h1>
      {Object.entries(responses).map(([surveyId, surveyResponses]) => (
        <div key={surveyId} className="result-survey">
          <h2>{t('result.surveyLabel', { id: surveyId })}</h2>
          <ul className="result-responses">
            {Object.entries(surveyResponses).map(([questionId, answer]) => (
              <li key={questionId} className="result-response-item">
                <span className="result-question-label">
                  {t(`survey.${surveyId}.question.${questionId}`)}:
                </span>
                <span className="result-response-text">{translateAnswer(answer)}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className="result-buttons">
        <Link className="survey-back-buttons" to="/survey">
          {t('result.returnToSurvey')}
        </Link>
        <h4 className="restart-button" onClick={handleRestart}>
          <svg
            className="restart-icon"
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#FFFFFF"
          >
            <path d="M440-122q-121-15-200.5-105.5T160-440q0-66 26-126.5T260-672l57 57q-38 34-57.5 79T240-440q0 88 56 155.5T440-202v80Zm80 0v-80q87-16 143.5-83T720-440q0-100-70-170t-170-70h-3l44 44-56 56-140-140 140-140 56 56-44 44h3q134 0 227 93t93 227q0 121-79.5 211.5T520-122Z" />
          </svg>
        </h4>
      </div>
    </div>
  );
};
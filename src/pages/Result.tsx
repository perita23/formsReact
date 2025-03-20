import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

export const Result = () => {
  const [responses, setResponses] = useState<Record<
    number,
    Record<string, string | string[]>
  > | null>(null);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleRestart = () => {
    localStorage.removeItem("surveyResponses");
    localStorage.removeItem("currentSurveyIndex");
    navigate("/");
  };

  useEffect(() => {
    const savedResponses = localStorage.getItem("surveyResponses");
    if (savedResponses) {
      setResponses(JSON.parse(savedResponses));
    }
  }, []);

  if (!responses)
    return <div className="result-no-responses">{t("result.noResponses")}</div>;

  return (
    <div className="result">
      <h1>{t("result.title")}</h1>
      {Object.entries(responses).map(([surveyId, surveyResponses]) => (
        <div key={surveyId} className="result-survey">
          <h2>{t("result.surveyLabel", { id: surveyId })}</h2>
          <ul className="result-responses">
            {Object.entries(surveyResponses).map(([questionId, answer]) => (
              <li key={questionId} className="result-response-item">
                <span className="result-question-label">{questionId}:</span>
                <span className="result-response-text">
                  {Array.isArray(answer) ? answer.join(", ") : answer}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <Link className="button" to="/survey">
            {t("result.returnToSurvey")}
            
          </Link>
      <button onClick={handleRestart}> { t('result.surveyRestart')} </button>
    </div>
  );
};

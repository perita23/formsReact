import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const Result = () => {
  const [responses, setResponses] = useState<Record<number, Record<string, string | string[]>> | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const savedResponses = localStorage.getItem('surveyResponses');
    if (savedResponses) {
      setResponses(JSON.parse(savedResponses));
    }
  }, []);

  if (!responses) return <div>{t('result.noResponses')}</div>;

  return (
    <div className="result">
      <h1>{t('result.title')}</h1>
      {Object.entries(responses).map(([surveyId, surveyResponses]) => (
        <div key={surveyId}>
          <h2>{t('result.surveyLabel', { id: surveyId })}</h2>
          <ul>
            {Object.entries(surveyResponses).map(([questionId, answer]) => (
              <li key={questionId}>
                {questionId}: {Array.isArray(answer) ? answer.join(', ') : answer}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
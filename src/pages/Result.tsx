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

  if (!responses) return <div>No hay respuestas guardadas</div>;

  return (
    <div className="result">
      <h1>Resultados de las encuestas</h1>
      {Object.entries(responses).map(([surveyId, surveyResponses]) => (
        <div key={surveyId}>
          <h2>Encuesta {surveyId}</h2>
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
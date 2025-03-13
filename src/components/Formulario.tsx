import { useState } from 'react';
import { Question } from '../types';

interface FormularioProps {
  questions: Question[];
  onSubmit: (responses: Record<number, string | string[]>) => void;
}

export const Formulario = ({ questions, onSubmit }: FormularioProps) => {
  const [responses, setResponses] = useState<Record<number, string | string[]>>({});

  const handleChange = (questionId: number, value: string | string[]) => {
    setResponses((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(responses);
  };

  return (
    <form onSubmit={handleSubmit}>
      {questions.map((question) => (
        <div key={question.id} className="question">
          <label>{question.text}</label>
          {question.type === 'text' && (
            <input
              type="text"
              value={(responses[question.id] as string) || ''}
              onChange={(e) => handleChange(question.id, e.target.value)}
            />
          )}
          {question.type === 'radio' && question.options && (
            <div>
              {question.options.map((option) => (
                <label key={option}>
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={option}
                    checked={responses[question.id] === option}
                    onChange={() => handleChange(question.id, option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          )}
          {question.type === 'checkbox' && question.options && (
            <div>
              {question.options.map((option) => (
                <label key={option}>
                  <input
                    type="checkbox"
                    value={option}
                    checked={(responses[question.id] as string[])?.includes(option) || false}
                    onChange={(e) => {
                      const current = (responses[question.id] as string[]) || [];
                      const updated = e.target.checked
                        ? [...current, option]
                        : current.filter((v) => v !== option);
                      handleChange(question.id, updated);
                    }}
                  />
                  {option}
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
      <button type="submit" disabled={Object.keys(responses).length < questions.length}>
        Siguiente
      </button>
    </form>
  );
};
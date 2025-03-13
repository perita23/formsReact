import { useState } from 'react';
import { Question } from '../types';

interface FormularioProps {
  questions: Question[];
  onSubmit: (responses: Record<string, string | string[]>) => void; // Cambié number a string por los IDs
}

export const Formulario = ({ questions, onSubmit }: FormularioProps) => {
  const [responses, setResponses] = useState<Record<string, string | string[]>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Validar una pregunta según sus restricciones y validaciones
  const validateQuestion = (question: Question, value: string | string[]): string | null => {
    const { restricciones, validacion } = question;

    // Validar restricciones de longitud
    if (restricciones) {
      const length = typeof value === 'string' ? value.length : value.length;
      if (restricciones.min && length < restricciones.min) {
        return `Debe tener al menos ${restricciones.min} caracteres`;
      }
      if (restricciones.max && length > restricciones.max) {
        return `No puede exceder ${restricciones.max} caracteres`;
      }
    }

    // Validaciones específicas
    if (validacion) {
      if (validacion.formato === 'email' && typeof value === 'string') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Formato de email inválido';
        if (validacion.dominio && !value.endsWith(validacion.dominio)) {
          return `El email debe terminar en ${validacion.dominio}`;
        }
      }
      if (validacion.min_edad && typeof value === 'string') {
        const birthDate = new Date(value);
        const age = (new Date().getFullYear() - birthDate.getFullYear());
        if (age < validacion.min_edad) return `Debes tener al menos ${validacion.min_edad} años`;
      }
      if (validacion.max_seleccionados && Array.isArray(value)) {
        if (value.length > validacion.max_seleccionados) {
          return `Máximo ${validacion.max_seleccionados} opciones permitidas`;
        }
      }
    }

    return null;
  };

  const handleChange = (questionId: string, value: string | string[]) => {
    setResponses((prev) => ({ ...prev, [questionId]: value }));
    const question = questions.find((q) => q.id === questionId);
    if (question) {
      const error = validateQuestion(question, value);
      setErrors((prev) => ({ ...prev, [questionId]: error || '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    let isValid = true;

    // Validar todas las respuestas
    questions.forEach((question) => {
      const value = responses[question.id] || '';
      const error = validateQuestion(question, value);
      if (error) {
        newErrors[question.id] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    if (isValid && Object.keys(responses).length === questions.length) {
      onSubmit(responses);
      setResponses({}); // Reiniciar respuestas tras enviar
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {questions.map((question) => (
        <div key={question.id} className="question">
          <label>{question.pregunta}</label>

          {/* Text */}
          {question.tipo === 'text' && (
            <input
              type="text"
              value={(responses[question.id] as string) || ''}
              onChange={(e) => handleChange(question.id, e.target.value)}
            />
          )}

          {/* Textarea */}
          {question.tipo === 'textarea' && (
            <textarea
              value={(responses[question.id] as string) || ''}
              onChange={(e) => handleChange(question.id, e.target.value)}
            />
          )}

          {/* Select */}
          {question.tipo === 'select' && question.opciones && (
            <select
              value={(responses[question.id] as string) || ''}
              onChange={(e) => handleChange(question.id, e.target.value)}
            >
              <option value="">Selecciona una opción</option>
              {question.opciones.map((option) =>
                typeof option === 'string' ? (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ) : (
                  option.valores.map((val) => (
                    <option key={val} value={val}>
                      {val}
                    </option>
                  ))
                )
              )}
            </select>
          )}

          {/* Check */}
          {question.tipo === 'check' && question.opciones && (
            <div>
              {question.opciones.map((option) => {
                const optValue = typeof option === 'string' ? option : option.grupo;
                return (
                  <label key={optValue}>
                    <input
                      type="checkbox"
                      value={optValue}
                      checked={(responses[question.id] as string[])?.includes(optValue) || false}
                      onChange={(e) => {
                        const current = (responses[question.id] as string[]) || [];
                        const updated = e.target.checked
                          ? [...current, optValue]
                          : current.filter((v) => v !== optValue);
                        handleChange(question.id, updated);
                      }}
                    />
                    {optValue}
                  </label>
                );
              })}
            </div>
          )}

          {/* Mostrar errores */}
          {errors[question.id] && <span className="error">{errors[question.id]}</span>}
        </div>
      ))}
      <button
        type="submit"
        disabled={Object.keys(responses).length < questions.length || Object.values(errors).some((e) => e)}
      >
        Siguiente
      </button>
    </form>
  );
};
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Question } from '../types';

// Define las propiedades esperadas por el componente
interface FormularioProps {
  questions: Question[]; // Lista de preguntas
  onSubmit: (responses: Record<string, string | string[]>) => void; // Función al enviar
  initialResponses?: Record<string, string | string[]>; // Respuestas iniciales opcionales
}

/**
 * Componente funcional que genera un formulario dinámico basado en preguntas.
 * Valida respuestas y maneja errores con soporte multilingüe.
 * @param {FormularioProps} props - Propiedades del formulario (preguntas, envío y respuestas iniciales).
 * @returns {JSX.Element} Formulario renderizado con campos y botón de envío.
 */
export const Formulario = ({ questions, onSubmit, initialResponses = {} }: FormularioProps) => {
  const [responses, setResponses] = useState<Record<string, string | string[]>>(initialResponses); // Estado para respuestas
  const [errors, setErrors] = useState<Record<string, string>>({}); // Estado para errores
  const { t } = useTranslation(); // Hook para traducciones

  useEffect(() => { // Sincroniza las respuestas iniciales
    setResponses(initialResponses);
  }, [initialResponses]); // Se ejecuta cuando cambian las respuestas iniciales

  /**
   * Valida una pregunta según sus restricciones y reglas específicas.
   * @param {Question} question - Pregunta a validar.
   * @param {string | string[]} value - Valor ingresado por el usuario.
   * @returns {string | null} Mensaje de error o null si es válido.
   */
  const validateQuestion = (question: Question, value: string | string[]): string | null => {
    const { restricciones, validacion } = question;

    if (restricciones) { // Verifica restricciones de longitud
      const length = typeof value === 'string' ? value.length : value.length;
      if (restricciones.min && length < restricciones.min) {
        return t('form.error.minLength', { min: restricciones.min }); // Error por longitud mínima
      }
      if (restricciones.max && length > restricciones.max) {
        return t('form.error.maxLength', { max: restricciones.max }); // Error por longitud máxima
      }
    }

    if (validacion) { // Aplica validaciones específicas
      if (validacion.formato === 'email' && typeof value === 'string') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex para validar email
        if (!emailRegex.test(value)) return t('form.error.invalidEmail'); // Error por email inválido
        if (validacion.dominio && !value.endsWith(validacion.dominio)) {
          return t('form.error.emailDomain', { domain: validacion.dominio }); // Error por dominio
        }
      }
      if (validacion.min_edad && typeof value === 'string') {
        const birthDate = new Date(value);
        const age = new Date().getFullYear() - birthDate.getFullYear(); // Calcula edad
        if (age < validacion.min_edad) {
          return t('form.error.minAge', { minAge: validacion.min_edad }); // Error por edad mínima
        }
      }
      if (validacion.max_seleccionados && Array.isArray(value)) {
        if (value.length > validacion.max_seleccionados) {
          return t('form.error.maxSelections', { max: validacion.max_seleccionados }); // Error por exceso de selecciones
        }
      }
    }
    return null; // Si no hay errores, retorna nulo
  };

  // Actualiza respuestas y valida en tiempo real
  const handleChange = (questionId: string, value: string | string[]) => {
    setResponses((prev) => ({ ...prev, [questionId]: value })); // Actualiza estado de respuestas
    const question = questions.find((q) => q.id === questionId);
    if (question) {
      const error = validateQuestion(question, value); // Valida la respuesta
      setErrors((prev) => ({ ...prev, [questionId]: error || '' })); // Actualiza errores
    }
  };

  // Maneja el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Evita recarga de página
    const newErrors: Record<string, string> = {};
    let isValid = true;

    questions.forEach((question) => { // Valida todas las preguntas
      const value = responses[question.id] || '';
      const error = validateQuestion(question, value);
      if (error) {
        newErrors[question.id] = error;
        isValid = false;
      }
    });

    setErrors(newErrors); // Actualiza errores
    if (isValid && Object.keys(responses).length === questions.length) { // Si todo es válido y completo
      onSubmit(responses); // Envía respuestas
      setResponses({}); // Resetea formulario
    }
  };

  return (
    <form className="formulario" onSubmit={handleSubmit}> {/* Formulario principal */}
      {questions.map((question) => ( // Mapea cada pregunta
        <div key={question.id} className="formulario-question"> {/* Contenedor por pregunta */}
          <label className="formulario-label">{t(question.pregunta)}</label> {/* Etiqueta traducida */}
          {question.tipo === 'text' && ( // Campo de texto
            <input
              type="text"
              className="formulario-input"
              value={(responses[question.id] as string) || ''} // Valor actual
              onChange={(e) => handleChange(question.id, e.target.value)} // Actualiza al cambiar
            />
          )}
          {question.tipo === 'textarea' && ( // Área de texto
            <textarea
              className="formulario-textarea"
              value={(responses[question.id] as string) || ''}
              onChange={(e) => handleChange(question.id, e.target.value)}
            />
          )}
          {question.tipo === 'select' && question.opciones && ( // Selector desplegable
            <select
              className="formulario-select"
              value={(responses[question.id] as string) || ''}
              onChange={(e) => handleChange(question.id, e.target.value)}
            >
              <option value="" className="formulario-option">
                {t('form.selectOption')} {/* Opción por defecto */}
              </option>
              {question.opciones.map((option) => // Mapea opciones
                typeof option === 'string' ? (
                  <option key={option} value={option} className="formulario-option">
                    {t(option)} {/* Opción simple */}
                  </option>
                ) : (
                  option.valores.map((val) => ( // Opciones agrupadas
                    <option key={val} value={val} className="formulario-option">
                      {t(val)}
                    </option>
                  ))
                )
              )}
            </select>
          )}
          {question.tipo === 'check' && question.opciones && ( // Casillas de verificación
            <div className="formulario-checkbox-group">
              {question.opciones.map((option) => {
                const optValue = typeof option === 'string' ? option : option.grupo; // Valor de la opción
                return (
                  <label key={optValue} className="formulario-checkbox-label">
                    <input
                      type="checkbox"
                      className="formulario-checkbox"
                      value={optValue}
                      checked={(responses[question.id] as string[])?.includes(optValue) || false} // Estado marcado
                      onChange={(e) => {
                        const current = (responses[question.id] as string[]) || [];
                        const updated = e.target.checked
                          ? [...current, optValue] // Agrega si está marcado
                          : current.filter((v) => v !== optValue); // Quita si no
                        handleChange(question.id, updated);
                      }}
                    />
                    <span className="formulario-checkbox-text">{t(optValue)}</span> {/* Texto traducido */}
                  </label>
                );
              })}
            </div>
          )}
          {errors[question.id] && ( // Muestra error si existe
            <span className="formulario-error">{errors[question.id]}</span>
          )}
        </div>
      ))}
      <button
        type="submit"
        className="formulario-submit"
        disabled={
          Object.keys(responses).length < questions.length || // Desactiva si no está completo
          Object.values(errors).some((e) => e) // O hay errores
        }
      >
        {t('form.nextButton')} {/* Botón traducido */}
      </button>
    </form>
  );
};
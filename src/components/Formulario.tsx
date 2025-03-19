import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Question } from "../types";

interface FormularioProps {
  questions: Question[];
  onSubmit: (responses: Record<string, string | string[]>) => void;
}

export const Formulario = ({ questions, onSubmit }: FormularioProps) => {
  const [responses, setResponses] = useState<Record<string, string | string[]>>(
    {}
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { t } = useTranslation();

  // Validar una pregunta según sus restricciones y validaciones
  const validateQuestion = (
    question: Question,
    value: string | string[]
  ): string | null => {
    const { restricciones, validacion } = question;

    if (restricciones) {
      const length = typeof value === "string" ? value.length : value.length;
      if (restricciones.min && length < restricciones.min) {
        return t("form.error.minLength", { min: restricciones.min });
      }
      if (restricciones.max && length > restricciones.max) {
        return t("form.error.maxLength", { max: restricciones.max });
      }
    }

    if (validacion) {
      if (validacion.formato === "email" && typeof value === "string") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return t("form.error.invalidEmail");
        if (validacion.dominio && !value.endsWith(validacion.dominio)) {
          return t("form.error.emailDomain", { domain: validacion.dominio });
        }
      }
      if (validacion.min_edad && typeof value === "string") {
        const birthDate = new Date(value);
        const age = new Date().getFullYear() - birthDate.getFullYear();
        if (age < validacion.min_edad) {
          return t("form.error.minAge", { minAge: validacion.min_edad });
        }
      }
      if (validacion.max_seleccionados && Array.isArray(value)) {
        if (value.length > validacion.max_seleccionados) {
          return t("form.error.maxSelections", {
            max: validacion.max_seleccionados,
          });
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
      setErrors((prev) => ({ ...prev, [questionId]: error || "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    let isValid = true;

    questions.forEach((question) => {
      const value = responses[question.id] || "";
      const error = validateQuestion(question, value);
      if (error) {
        newErrors[question.id] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    if (isValid && Object.keys(responses).length === questions.length) {
      onSubmit(responses);
      setResponses({});
    }
  };

  return (
    <form className="formulario" onSubmit={handleSubmit}>
      {questions.map((question) => (
        <div key={question.id} className="formulario-question">
          <label className="formulario-label">{t(question.pregunta)}</label>
          {question.tipo === "text" && (
            <input
              type="text"
              className="formulario-input"
              value={(responses[question.id] as string) || ""}
              onChange={(e) => handleChange(question.id, e.target.value)}
            />
          )}
          {question.tipo === "textarea" && (
            <textarea
              className="formulario-textarea"
              value={(responses[question.id] as string) || ""}
              onChange={(e) => handleChange(question.id, e.target.value)}
            />
          )}
          {question.tipo === "select" && question.opciones && (
            <select
              className="formulario-select"
              value={(responses[question.id] as string) || ""}
              onChange={(e) => handleChange(question.id, e.target.value)}
            >
              <option value="" className="formulario-option">
                {t("form.selectOption")}
              </option>
              {question.opciones.map((option) =>
                typeof option === "string" ? (
                  <option
                    key={option}
                    value={option}
                    className="formulario-option"
                  >
                    {option}
                  </option>
                ) : (
                  option.valores.map((val) => (
                    <option key={val} value={val} className="formulario-option">
                      {val}
                    </option>
                  ))
                )
              )}
            </select>
          )}
          {question.tipo === "check" && question.opciones && (
            <div className="formulario-checkbox-group">
              {question.opciones.map((option) => {
                const optValue =
                  typeof option === "string" ? option : option.grupo;
                return (
                  <label key={optValue} className="formulario-checkbox-label">
                    <input
                      type="checkbox"
                      className="formulario-checkbox"
                      value={optValue}
                      checked={
                        (responses[question.id] as string[])?.includes(
                          optValue
                        ) || false
                      }
                      onChange={(e) => {
                        const current =
                          (responses[question.id] as string[]) || [];
                        const updated = e.target.checked
                          ? [...current, optValue]
                          : current.filter((v) => v !== optValue);
                        handleChange(question.id, updated);
                      }}
                    />
                    <span className="formulario-checkbox-text">{optValue}</span>
                  </label>
                );
              })}
            </div>
          )}
          {errors[question.id] && (
            <span className="formulario-error">{errors[question.id]}</span>
          )}
        </div>
      ))}
      <button
        type="submit"
        className="formulario-submit"
        disabled={
          Object.keys(responses).length < questions.length ||
          Object.values(errors).some((e) => e)
        }
      >
        {t("form.nextButton")}
      </button>
    </form>
  );
};

// Restricciones comunes para preguntas
export interface Restrictions {
  min?: number; // Longitud mínima o cantidad mínima
  max?: number; // Longitud máxima o cantidad máxima
}

// Validaciones específicas por tipo de pregunta
export interface Validation {
  min_edad?: number; // Para fecha_nacimiento
  formato?: 'email'; // Para validar formato de email
  dominio?: string; // Dominio permitido para email
  max_seleccionados?: number; // Máximo de opciones seleccionables en checkboxes
}

// Opciones para preguntas tipo "select" o "check"
export type OptionValue = string | { grupo: string; valores: string[] }; // Soporta opciones simples o agrupadas

// Estructura de una pregunta
export interface Question {
  id: string; // Cambiamos de number a string para soportar IDs como "nombre"
  tipo: 'text' | 'textarea' | 'select' | 'check'; // Nuevos tipos
  pregunta: string; // Texto de la pregunta
  respuesta: string | string[] | ''; // Respuesta puede ser texto, array o vacía
  opciones?: OptionValue[]; // Opciones para select o check
  restricciones?: Restrictions; // Restricciones opcionales
  validacion?: Validation; // Validaciones opcionales
}

// Estructura de una encuesta
export interface Survey {
  id: number;
  titulo: string; // Cambiamos "title" por "titulo" para coincidir con tus datos
  preguntas: Question[];
}
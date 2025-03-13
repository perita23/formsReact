import { Survey } from '../types';

export const getSurveys = (): Survey[] => [
  {
    id: 1,
    title: 'Encuesta de satisfacción',
    questions: [
      { id: 1, text: '¿Cómo calificarías nuestro servicio?', type: 'radio', options: ['Bueno', 'Regular', 'Malo'] },
      { id: 2, text: '¿Qué mejorarías?', type: 'text' },
    ],
  },
  {
    id: 2,
    title: 'Encuesta de preferencias',
    questions: [
      { id: 1, text: '¿Qué colores prefieres?', type: 'checkbox', options: ['Rojo', 'Azul', 'Verde'] },
      { id: 2, text: '¿Por qué?', type: 'text' },
    ],
  },
];
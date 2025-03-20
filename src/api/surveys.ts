import { Survey } from '../types';

export const getSurveys = (): Survey[] => [
  {
    id: 1,
    titulo: 'survey.1.title',
    preguntas: [
      {
        id: 'name',
        tipo: 'text',
        pregunta: 'survey.1.question.name',
        respuesta: '',
        restricciones: { min: 3, max: 50 },
      },
      {
        id: 'birthdate',
        tipo: 'text',
        pregunta: 'survey.1.question.birthdate',
        respuesta: '',
        restricciones: { min: 1, max: 10 },
        validacion: { min_edad: 17 },
      },
      {
        id: 'email',
        tipo: 'text',
        pregunta: 'survey.1.question.email',
        respuesta: '',
        restricciones: { min: 5, max: 100 },
        validacion: { formato: 'email', dominio: 'stucom.com' },
      },
      {
        id: 'gender',
        tipo: 'select',
        pregunta: 'survey.1.question.gender',
        respuesta: '',
        opciones: ['survey.1.option.gender.male', 'survey.1.option.gender.female', 'survey.1.option.gender.other'],
      },
      {
        id: 'preferences',
        tipo: 'check',
        pregunta: 'survey.1.question.preferences',
        respuesta: '',
        opciones: [
          'survey.1.option.preferences.read',
          'survey.1.option.preferences.sports',
          'survey.1.option.preferences.travel',
          'survey.1.option.preferences.movies',
        ],
      },
    ],
  },
  {
    id: 2,
    titulo: 'survey.2.title',
    preguntas: [
      {
        id: 'improvements',
        tipo: 'textarea',
        pregunta: 'survey.2.question.improvements',
        respuesta: 'El contenido del curso está bien, pero sería útil más ejemplos prácticos.',
        restricciones: { min: 15, max: 250 },
      },
      {
        id: 'satisfaction',
        tipo: 'select',
        pregunta: 'survey.2.question.satisfaction',
        respuesta: '4',
        opciones: ['survey.2.option.satisfaction.1', 'survey.2.option.satisfaction.2', 'survey.2.option.satisfaction.3', 'survey.2.option.satisfaction.4', 'survey.2.option.satisfaction.5'],
      },
      {
        id: 'attendance',
        tipo: 'check',
        pregunta: 'survey.2.question.attendance',
        respuesta: 'no',
        opciones: ['survey.2.option.attendance.yes', 'survey.2.option.attendance.no'],
      },
      {
        id: 'schedule',
        tipo: 'check',
        pregunta: 'survey.2.question.schedule',
        respuesta: [],
        opciones: [
          'survey.2.option.schedule.mon9_11',
          'survey.2.option.schedule.tue15_17',
          'survey.2.option.schedule.wed10_12',
          'survey.2.option.schedule.thu13_15',
          'survey.2.option.schedule.fri16_18',
        ],
        validacion: { max_seleccionados: 2 },
      },
    ],
  },
  {
    id: 3,
    titulo: 'survey.3.title',
    preguntas: [
      {
        id: 'techInterest',
        tipo: 'textarea',
        pregunta: 'survey.3.question.techInterest',
        respuesta: 'Me gustaría aprender sobre inteligencia artificial y machine learning.',
        restricciones: { min: 20, max: 200 },
      },
      {
        id: 'osPreference',
        tipo: 'select',
        pregunta: 'survey.3.question.osPreference',
        respuesta: 'Linux',
        opciones: ['survey.3.option.os.windows', 'survey.3.option.os.linux', 'survey.3.option.os.macos'],
      },
      {
        id: 'devices',
        tipo: 'check',
        pregunta: 'survey.3.question.devices',
        respuesta: ['smartphone'],
        opciones: [
          'survey.3.option.devices.smartphone',
          'survey.3.option.devices.laptop',
          'survey.3.option.devices.tablet',
          'survey.3.option.devices.smartwatch',
        ],
        validacion: { max_seleccionados: 2 },
      },
      {
        id: 'techTime',
        tipo: 'select',
        pregunta: 'survey.3.question.techTime',
        respuesta: '5',
        opciones: [
          'survey.3.option.time.1', 'survey.3.option.time.2', 'survey.3.option.time.3',
          'survey.3.option.time.4', 'survey.3.option.time.5', 'survey.3.option.time.6',
          'survey.3.option.time.7', 'survey.3.option.time.8', 'survey.3.option.time.9',
          'survey.3.option.time.10',
        ],
      },
    ],
  },
  {
    id: 4,
    titulo: 'survey.4.title',
    preguntas: [
      {
        id: 'movieGenre',
        tipo: 'textarea',
        pregunta: 'survey.4.question.movieGenre',
        respuesta: 'Acción, ciencia ficción y comedia.',
        restricciones: { min: 10, max: 150 },
      },
      {
        id: 'favoriteMovie',
        tipo: 'select',
        pregunta: 'survey.4.question.favoriteMovie',
        respuesta: 'Inception',
        opciones: [
          'survey.4.option.movie.inception',
          'survey.4.option.movie.matrix',
          'survey.4.option.movie.avengers',
          'survey.4.option.movie.titanic',
        ],
      },
      {
        id: 'moviesSeen',
        tipo: 'check',
        pregunta: 'survey.4.question.moviesSeen',
        respuesta: 'sí',
        opciones: [
          'survey.4.option.movie.inception',
          'survey.4.option.movie.matrix',
          'survey.4.option.movie.avengers',
          'survey.4.option.movie.titanic',
        ],
      },
      {
        id: 'movieFrequency',
        tipo: 'select',
        pregunta: 'survey.4.question.movieFrequency',
        respuesta: '4',
        opciones: [
          { grupo: 'survey.4.option.frequency.group', valores: ['survey.4.option.frequency.1', 'survey.4.option.frequency.2', 'survey.4.option.frequency.3', 'survey.4.option.frequency.4', 'survey.4.option.frequency.5'] },
        ],
      },
    ],
  },
];
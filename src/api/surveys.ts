import { Survey } from '../types';

export const getSurveys = (): Survey[] => [
  {
    "id": 1,
    "titulo": "survey.1.title",
    "preguntas": [
      {
        "id": "nombre",
        "tipo": "text",
        "pregunta": "survey.1.question.name",
        "respuesta": "",
        "restricciones": { "min": 3, "max": 50 }
      },
      {
        "id": "fecha_nacimiento",
        "tipo": "text",
        "pregunta": "survey.1.question.birthdate",
        "respuesta": "",
        "restricciones": { "min": 1, "max": 10 },
        "validacion": { "min_edad": 17 }
      },
      {
        "id": "email",
        "tipo": "text",
        "pregunta": "survey.1.question.email",
        "respuesta": "",
        "restricciones": { "min": 5, "max": 100 },
        "validacion": { "formato": "email", "dominio": "stucom.com" }
      },
      {
        "id": "sexo",
        "tipo": "select",
        "pregunta": "survey.1.question.gender",
        "respuesta": "",
        "opciones": ["Masculino", "Femenino", "Otro"]
      },
      {
        "id": "preferencias",
        "tipo": "check",
        "pregunta": "survey.1.question.preferences",
        "respuesta": "",
        "opciones": ["Leer", "Deportes", "Viajar", "Cine"]
      }
    ]
  },
  {
    "id": 2,
    "titulo": "survey.2.title",
    "preguntas": [
      {
        "id": "comentarios",
        "tipo": "textarea",
        "pregunta": "survey.2.question.improvements",
        "respuesta": "El contenido del curso está bien, pero sería útil más ejemplos prácticos.",
        "restricciones": { "min": 15, "max": 250 }
      },
      {
        "id": "satisfaccion",
        "tipo": "select",
        "pregunta": "survey.2.question.satisfaction",
        "respuesta": "4",
        "opciones": ["1", "2", "3", "4", "5"]
      },
      {
        "id": "asistencia",
        "tipo": "check",
        "pregunta": "survey.2.question.attendance",
        "respuesta": "no",
        "opciones": ["sí", "no"]
      },
      {
        "id": "horarios",
        "tipo": "check",
        "pregunta": "survey.2.question.schedule",
        "respuesta": [],
        "opciones": [
          "Lunes 9:00 AM - 11:00 AM",
          "Martes 3:00 PM - 5:00 PM",
          "Miércoles 10:00 AM - 12:00 AM",
          "Jueves 1:00 PM - 3:00 PM",
          "Viernes 4:00 PM - 6:00 PM"
        ],
        "validacion": { "max_seleccionados": 2 }
      }
    ]
  },
  {
    "id": 3,
    "titulo": "survey.3.title",
    "preguntas": [
      {
        "id": "comentarios",
        "tipo": "textarea",
        "pregunta": "survey.3.question.techInterest",
        "respuesta": "Me gustaría aprender sobre inteligencia artificial y machine learning.",
        "restricciones": { "min": 20, "max": 200 }
      },
      {
        "id": "sistema_operativo",
        "tipo": "select",
        "pregunta": "survey.3.question.osPreference",
        "respuesta": "Linux",
        "opciones": ["Windows", "Linux", "MacOS"]
      },
      {
        "id": "productos",
        "tipo": "check",
        "pregunta": "survey.3.question.devices",
        "respuesta": ["smartphone"],
        "opciones": ["smartphone", "laptop", "tablet", "smartwatch"],
        "validacion": { "max_seleccionados": 2 }
      },
      {
        "id": "tiempo",
        "tipo": "select",
        "pregunta": "survey.3.question.techTime",
        "respuesta": "5",
        "opciones": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
      }
    ]
  },
  {
    "id": 4,
    "titulo": "survey.4.title",
    "preguntas": [
      {
        "id": "comentarios",
        "tipo": "textarea",
        "pregunta": "survey.4.question.movieGenre",
        "respuesta": "Acción, ciencia ficción y comedia.",
        "restricciones": { "min": 10, "max": 150 }
      },
      {
        "id": "favorito",
        "tipo": "select",
        "pregunta": "survey.4.question.favoriteMovie",
        "respuesta": "Inception",
        "opciones": ["Inception", "The Matrix", "Avengers", "Titanic"]
      },
      {
        "id": "vista",
        "tipo": "check",
        "pregunta": "survey.4.question.moviesSeen",
        "respuesta": "sí",
        "opciones": ["Inception", "The Matrix", "Avengers", "Titanic"]
      },
      {
        "id": "frecuencia",
        "tipo": "select",
        "pregunta": "survey.4.question.movieFrequency",
        "respuesta": "4",
        "opciones": [
          { "grupo": "Opción 1-5 veces al mes", "valores": ["1", "2", "3", "4", "5"] }
        ]
      }
    ]
  }
];
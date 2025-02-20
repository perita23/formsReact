import React, { useState, useEffect } from "react";

// Definimos los tipos del JSON para asegurar que el componente tiene los datos correctos.
interface Pregunta {
  id: string;
  tipo: "text" | "number" | "select";
  pregunta: string;
  opciones?: string[];
  respuesta: string;
}

interface Cuestionario {
  titulo: string;
  preguntas: Pregunta[];
}

const CuestionarioComponent: React.FC = () => {
  // 1. Estado para almacenar los datos del cuestionario
  const [cuestionario, setCuestionario] = useState<Cuestionario | null>(null);

  // 2. Estado para manejar las respuestas del cuestionario
  const [respuestas, setRespuestas] = useState<{ [key: string]: string }>({});

  // 3. Leemos el archivo JSON al cargar el componente
  useEffect(() => {
    const fetchCuestionario = async () => {
      try {
        const response = await fetch("/cuestionario.json"); // Ruta del archivo JSON
        const data: Cuestionario = await response.json();
        setCuestionario(data); // Guardamos los datos en el estado
      } catch (error) {
        console.error("Error al cargar el cuestionario:", error);
      }
    };

    fetchCuestionario();
  }, []); // Solo se ejecuta una vez cuando el componente se monta

  // 4. Función para manejar el cambio de respuestas
  const handleRespuestaChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    id: string
  ) => {
    setRespuestas((prevRespuestas) => ({
      ...prevRespuestas,
      [id]: e.target.value,
    }));
  };

  // 5. Función para manejar el envío del cuestionario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Respuestas enviadas:", respuestas);

    
    // Aquí podrías hacer algo con las respuestas, como enviarlas a un servidor.
  };

  // 6. Renderizamos el cuestionario dinámicamente
  if (!cuestionario) {
    return <div>Cargando cuestionario...</div>;
  }

  return (
    <div>
      <h2>{cuestionario.titulo}</h2>
      <form onSubmit={handleSubmit}>
        {cuestionario.preguntas.map((pregunta) => (
          <div key={pregunta.id}>
            <label>{pregunta.pregunta}</label>
            {pregunta.tipo === "text" || pregunta.tipo === "number" ? (
              <input
                type={pregunta.tipo}
                value={respuestas[pregunta.id] || ""}
                onChange={(e) => handleRespuestaChange(e, pregunta.id)}
              />
            ) : pregunta.tipo === "select" ? (
              <select
                value={respuestas[pregunta.id] || ""}
                onChange={(e) => handleRespuestaChange(e, pregunta.id)}
              >
                <option value="">Selecciona una opción</option>
                {pregunta.opciones?.map((opcion, index) => (
                  <option key={index} value={opcion}>
                    {opcion}
                  </option>
                ))}
              </select>
            ) : null}
          </div>
        ))}
        <button type="submit">Enviar Respuestas</button>
      </form>
    </div>
  );
};

export default CuestionarioComponent;

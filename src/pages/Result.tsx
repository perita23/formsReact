import { Link } from 'react-router-dom';

export const Result = () => {
    return (
        <div className="result">
            <h1>Estas son tus respuestas</h1>
            {
                // Mostrar respuestas
                localStorage.getItem('surveyResponses') && (
                    <pre>{localStorage.getItem('surveyResponses')}</pre>
                )
            }
            <Link to="/survey">
                <button onClick={() => { localStorage.setItem('surveyResponses', '') }}>
                    Reiniciar Encuesta
                </button>
            </Link>
        </div>
    );
};
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div className="home">
      <h1>Bienvenido a las Encuestas</h1>
      <p>Haz clic para empezar:</p>
      <Link to="/survey">Comenzar Encuesta</Link>
    </div>
  );
};
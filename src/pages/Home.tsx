import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
export const Home = () => {

  const { t } = useTranslation();

  return (
    <div className="home">
      <h1>{t("welcome")}</h1>
      <button onClick={() => i18next.changeLanguage('es')}>Español</button>
      <button onClick={() => i18next.changeLanguage('en')}>English</button>
      <p>Haz clic para empezar:</p>
      <Link to="/survey">Comenzar Encuesta</Link>
    </div>
  );
};

import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import HomeSlider from "../components/HomeSlider";

export const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="home">
      <div className="home-top-row">
        <h1 className="htr-title">
          Bienvenido <br></br> a las Encuestas
        </h1>
      </div>
      <div className="home-bot-row">
        <div className="hbr-cont hbr-1-cont">
          <p className="hbr-cont-text">
            Participa en nuestras encuestas y ayuda a mejorar nuestros
            servicios.
          </p>
          <Link className="button" to="/survey">
            Comenzar
            <svg
              className="button-icon custom-fill"
              xmlns="http://www.w3.org/2000/svg"
              height="30px"
              viewBox="0 -960 960 960"
              width="30px"
              fill="#FFFFFF"
            >
              <path d="M246.67-244 200-290.67l402.67-402.66H236V-760h480v480h-66.67v-366.67L246.67-244Z" />
            </svg>
          </Link>
        </div>
        <div className="hbr-cont">
          <HomeSlider/>
        </div>
        <div className="hbr-cont">
          <div className="hbr-cont-img" >
           <h1 dangerouslySetInnerHTML={{ __html: t('home.title') }} />
      <button onClick={() => i18next.changeLanguage('es')}>{t('home.language.es')}</button>
      <button onClick={() => i18next.changeLanguage('en')}>{t('home.language.en')}</button>
      <p>{t('home.startPrompt')}</p>
      <Link to="/survey">{t('home.startButton')}</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

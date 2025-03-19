import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import HomeSlider from "../components/HomeSlider";

export const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="home">
      <div className="home-top-row">
        <h1
          className="htr-title"
          dangerouslySetInnerHTML={{ __html: t("home.title") }}
        />
      </div>
      <div className="home-bot-row">
        <div className="hbr-cont hbr-1-cont">
          <p className="hbr-cont-text">
            {t("home.description")}
          </p>
          <Link className="button" to="/survey">
            {t("home.startButton")}
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
          <HomeSlider />
        </div>
        <div className="hbr-cont">
        <h2 className="hbr-lang-title">{t("home.changelang")}</h2>
          <div className="hbr-cont-lang">
            
            <div className="lang-center-container">
              <button
                className="lang-button"
                onClick={() => i18next.changeLanguage("es")}
              >
                {t("home.language.es")}
              </button>
              <button
                className="lang-button"
                onClick={() => i18next.changeLanguage("en")}
              >
                {t("home.language.en")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

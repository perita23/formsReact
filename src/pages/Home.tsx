import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

export const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="home">
      <h1 dangerouslySetInnerHTML={{ __html: t('home.title') }} />
      <button onClick={() => i18next.changeLanguage('es')}>{t('home.language.es')}</button>
      <button onClick={() => i18next.changeLanguage('en')}>{t('home.language.en')}</button>
      <p>{t('home.startPrompt')}</p>
      <Link to="/survey">{t('home.startButton')}</Link>
    </div>
  );
};
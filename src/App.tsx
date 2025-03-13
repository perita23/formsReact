import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { SurveyPage } from './pages/SurveyPage';
import './styles/App.css';

export const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/survey" element={<SurveyPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};
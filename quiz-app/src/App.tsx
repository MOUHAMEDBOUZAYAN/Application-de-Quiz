import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HeroSection from './pages/AcceuilPage';
import Home from './pages/Home';
import Quiz from './components/Quiz';
import Results from './pages/Results';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import useLocalStorage from './hooks/useLocalStorage';
import { ThemeProvider } from './contexts/ThemeContext';
import './index.css';

function App() {
  const [storedName] = useLocalStorage('quizUserName', '');

  return (
    <Router>
      <ThemeProvider>
        <div className="flex flex-col min-h-screen bg-gray-50 overflow-x-hidden">
          <div className="navbar-container">
            <Navbar />
          </div>
          <main className="flex-grow w-full">
            <Routes>
              <Route path="/" element={<HeroSection />} />
              <Route element={<Layout />}>
                <Route path="/home" element={<Home />} />
                <Route path="/quiz" element={<QuizWithPlayerName playerName={storedName} />} />
                <Route path="/results" element={<Results />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    </Router>
  );
}

function QuizWithPlayerName({ playerName }: { playerName: string }) {
  return (
    <div className="full-screen-page">
      <div className="text-right p-4 text-sm text-gray-700">
        Joueur: <span className="font-semibold">{playerName || 'Anonyme'}</span>
      </div>
      <Quiz />
    </div>
  );
}

function NotFound() {
  return (
    <div className="full-screen-page flex flex-col items-center justify-center bg-gray-50 p-4 text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Non Trouvée</h1>
      <p className="text-lg text-gray-600 mb-6 max-w-md">
        La page que vous recherchez n'existe pas ou a été déplacée.
      </p>
      <a 
        href="/" 
        className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all shadow-md"
      >
        Retour à l'accueil
      </a>
    </div>
  );
}

export default App;
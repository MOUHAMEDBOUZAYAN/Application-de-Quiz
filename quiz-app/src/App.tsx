import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HeroSection from './pages/AcceuilPage';
import Home from './pages/Home';
import Quiz from './components/Quiz';
import Results from './pages/Results';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import useLocalStorage from './hooks/useLocalStorage'; // ✅ import local storage hook

import './App.css';

function App() {
  const [storedName] = useLocalStorage('quizUserName', ''); // ✅ get player name

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/quiz" element={<QuizWithPlayerName playerName={storedName} />} /> {/* ✅ pass name */}
            <Route path="/results" element={<Results />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

// ✅ Wrapper to pass player name to Quiz
function QuizWithPlayerName({ playerName }: { playerName: string }) {
  return (
    <div>
      <div className="text-right p-4 text-sm text-gray-700">
        Player: <span className="font-semibold">{playerName || 'Anonymous'}</span>
      </div>
      <Quiz />
    </div>
  );
}

// 404 Page
function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Non Trouvée</h1>
      <p className="text-lg text-gray-600 mb-6">
        La page que vous recherchez n'existe pas ou a été déplacée.
      </p>
      <a 
        href="/" 
        className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
      >
        Retour à l'accueil
      </a>
    </div>
  );
}

export default App;

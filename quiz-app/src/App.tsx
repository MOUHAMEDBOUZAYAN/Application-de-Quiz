import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HeroSection from './pages/AcceuilPage';
import Home from './pages/Home';
import Quiz from './components/Quiz';
import Results from './pages/Results';
import Footer from './components/Footer';
import Navbar from './components/Navbar'; // Import du nouveau composant Footer

import './App.css';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar /> 
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/results" element={<Results />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}


// Composant pour la page 404
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
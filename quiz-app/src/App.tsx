import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Quiz from './components/Quiz';
import Results from './pages/Results';
import Layout from './components/Layout';
import AcceuilPage from './pages/AcceuilPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<AcceuilPage />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="quiz" element={<Quiz />} />
          <Route path="results" element={<Results />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Quiz from './components/Quiz';
import Results from './components/Results';
import Layout from './components/Layout';
import AcceuilPage from './components/AcceuilPage';

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
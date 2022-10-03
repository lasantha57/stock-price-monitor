import { Routes, Route, Navigate } from 'react-router-dom';

import "./index.css";
import { Header } from './components/Header';
import PriceMonitor from './pages/price-monitor/index';

const App: React.FC = () => {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/price-monitor" element={<PriceMonitor />} />
        <Route path="/about-us" element={<>About us</>} />
        <Route path="/faq" element={<>FAQ</>} />
        <Route path="*" element={<Navigate to="/price-monitor" />}/>
      </Routes>
    </>
  );
};

export default App;

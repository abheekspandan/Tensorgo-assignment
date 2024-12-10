import React ,{useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import './App.css';
import HelpCrunch from './components/HelpCrunch';
import './styles.css';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';

const App = () => {
  const { isAuthenticated } = useAuth0();
  const [requests, setRequests] = useState([]);

  const handleNewRequest = (newRequest) => {
    setRequests([...requests, newRequest]);
  };

  return (
    <main>
    <Router>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/mainpage" element={<MainPage />} />
    </Routes>
  </Router>
  
    </main>
  );
};

export default App;
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login/login';
import AppRouter from './routes';

const App: React.FC = () => {
  return (
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<Login />} />
    //     <Route path="/home" element={<HomePage />} /> 
    //   </Routes>
    // </Router>
    <AppRouter/>
  );
};

export default App;

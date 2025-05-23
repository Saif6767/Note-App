import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/SignUp/Signup';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

const routes = (
  <AuthProvider>
    <Router>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path='/dashboard' exact element={<Home />} />
        </Route>
        <Route path='/' exact element={<Login />} />
        <Route path='/signup' exact element={<Signup />} />
      </Routes>
    </Router>
  </AuthProvider>
);

const App = () => {
  return <div>{routes}</div>
}

export default App

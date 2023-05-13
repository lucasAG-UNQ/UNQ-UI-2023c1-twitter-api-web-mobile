import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/style.css'
import reportWebVitals from './reportWebVitals';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import PublicRoute from './components/atoms/publicroute';
import PrivateRoute from './components/atoms/privateroute';

import Home from './components/pages/home';
import Trending from './components/pages/trending';
import Profile from './components/pages/profile';
import Logout from './components/pages/logout';
import User from './components/pages/user';
import Login from './components/pages/login';
import Register from './components/pages/register';
import Twitt from './components/pages/twitt';
import Search from './components/pages/search';
import NotFound from './components/pages/notfound';

import Sidebar from './components/organisms/sidebar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path="/trending" element={<PrivateRoute><Trending /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/user/:id" element={<PrivateRoute><User /></PrivateRoute>} />
          <Route path="/twitt/:id" element={<PrivateRoute><Twitt /></PrivateRoute>} />
          <Route path="/search" element={<PrivateRoute><Search /></PrivateRoute>} />
          
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/logout" element={<Logout />} />
          
          <Route index path="/" element={<Home />} errorElement={<NotFound />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/style.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import PublicRoute from './components/atoms/publicroute';
import PrivateRoute from './components/atoms/privateroute';

import Landing from './components/pages/landing';
import Home from './components/pages/home';
import Trending from './components/pages/trending';
import Profile from './components/pages/profile';
import Logout from './components/pages/logout';
import User from './components/pages/user';
import Login from './components/pages/login';
import Register from './components/pages/register';
import Tweet from './components/pages/tweet';
import Search from './components/pages/search';
import NotFound from './components/pages/notfound';

import Sidebar from './components/organisms/sidebar';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route index path="/" element={<PublicRoute><Landing /></PublicRoute>} errorElement={<NotFound />} />
          <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/trending" element={<PrivateRoute><Trending /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/user/:id" element={<PrivateRoute><User /></PrivateRoute>} />
          <Route path="/tweet/:id" element={<PrivateRoute><Tweet /></PrivateRoute>} />
          <Route path="/search" element={<PrivateRoute><Search /></PrivateRoute>} />
          <Route path="/logout" element={<PrivateRoute><Logout /></PrivateRoute>} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  </React.StrictMode>
);

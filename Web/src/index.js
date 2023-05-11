import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/style.css'
import reportWebVitals from './reportWebVitals';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

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

import axios from 'axios';

axios.defaults.baseURL="http://localhost:7070"
axios.defaults.headers.common["Authorization"]= "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6InVfMjgifQ.L8cTlW6Q8Obe-v6qeDrxOkR-lLAJDLq1ysRdo4nTwH0"//`Bearer ${localStorage.token}`

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path="/trending" element={<Trending />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user/:id" element={<User />} />
          <Route path="/twitt/:id" element={<Twitt />} />
          <Route path="/search" element={<Search />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
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

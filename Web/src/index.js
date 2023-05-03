import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './components/pages/home'
import User from './components/pages/user'
import Login from './components/pages/login'
import Register from './components/pages/register'
import Trending from './components/pages/trending'
import Search from './components/pages/search'
import Twitt from './components/pages/twitt'
import NotFound from './components/pages/notfound'

import Sidebar from "./molecules/sidebar";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path="/" element={<Home />} errorElement={<NotFound />} />
          <Route path="/user" element={<User />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/search" element={<Search />} />
          <Route path="/twitt" element={<Twitt />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

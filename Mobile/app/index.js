import React from 'react';
import Login from './login';
import Home from './home';
import { StatusBar } from 'expo-status-bar';
import TwApi from './services/services';

export default function App() {
  let isLoggedUser = TwApi.isUserLogged();
  //let isLoggedUser = true;
  
  return (
    <>
      <StatusBar style='light' />
      { isLoggedUser ? <Home /> : <Login /> }
    </>
    );
}


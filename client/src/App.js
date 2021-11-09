import React from 'react';
import {Route, Routes } from "react-router-dom";
import About from './About';
import './App.css';
import Header from './component/Header';


function App() {
  return (
    <div className='App'>
      <Header />
      <Routes> 
        <Route path={"/main"} element={<About/>} />
        <Route path={"/main"} element={<About/>} />
      </Routes> 
    </div>


  
  );
}

export default App;

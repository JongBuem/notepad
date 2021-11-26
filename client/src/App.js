import React from 'react';
import './App.css';
import TopMenuRouter from './routers/TopMenuRouter'
import TopMenuComponent from './components/TopMenuComponent';

export default function Menu() {
  return (
    <div className="App">
      <TopMenuComponent/>
      <TopMenuRouter/>
    </div>
  );
}

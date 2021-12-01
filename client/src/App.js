import React from 'react';
import './App.css';
import MenuRouter from './routers/TopMenuRouter'
import TopMenuComponent from './components/TopMenuComponent';
import {Provider} from 'react-redux'
import store from './redux/store'

export default function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <TopMenuComponent/> 
        <MenuRouter/>
      </div>
    </Provider>
  );
}

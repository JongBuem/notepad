import React from 'react';
import './App.css';
import MenuRouter from './routers/TopMenuRouter'
import TopMenuComponent from './components/TopMenuComponent';
import {Provider} from 'react-redux'
import store from './redux/store'
import { Box } from '@material-ui/core';

export default function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <TopMenuComponent/> 
        {/* <Box sx={{ flexGrow: 1 }}>
          <MenuRouter/>
        </Box> */}
      </div>
    </Provider>
  );
}

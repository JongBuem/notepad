import React,{useState} from 'react';
import './App.css';
import MenuRouter from './routers/TopMenuRouter'
import TopMenuComponent from './components/TopMenuComponent';
import {Provider} from 'react-redux'
import store from './redux/store'
import {Box, CircularProgress } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux';
import { addstate } from './redux/news/actions';

export default function App() {
  const dispatch = useDispatch() //login window action
  const {news} = useSelector((state)=>state)
  const [state, setState] = useState(false)

  return (
    // <Provider store={store}>
      <Box className="App">
        <TopMenuComponent/>
        {/* {state==false?<CircularProgress/>: <TopMenuComponent/>}  */}
      </Box>
    // </Provider>
  );
}

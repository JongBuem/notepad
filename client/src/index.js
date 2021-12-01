import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom'


// import {Provider} from 'react-redux'
// import {createStore} from 'redux'
// //Login 초기 값 지정
// const obj={
//   "login" : false,
//   "id" : ''
// } 
// //state값을 보내는 방법 Action
// function reducer(state = obj, action){
//   if(action.type === "open"){
//     state = true
//     return state
//   }
//   else if(action.type === "close"){
//     state = false
//     return state
//   }
//   else {
//     return state.login
//   }
// }
// let store = createStore(reducer)

ReactDOM.render(
  // <React.StrictMode>
    // <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    // </Provider>,
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

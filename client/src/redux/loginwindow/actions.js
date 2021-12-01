//action
import {LOGIN_WINDOW_OPEN, LOGIN_WINDOW_ClOSE} from './types'

//로그인창 열기
export const loginOpen = () =>{
    return{
        type: LOGIN_WINDOW_OPEN,
        
    }
}

//로그인창 닫기
export const loginClose = () =>{
    return{
        type: LOGIN_WINDOW_ClOSE,
        
    }
}
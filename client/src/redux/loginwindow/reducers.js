//reducers
import { LOGIN_WINDOW_OPEN, LOGIN_WINDOW_ClOSE, LOGIN_ID_INPUT, LOGIN_ID_PASSWORD, LOGINSTATE, LOG_OUT, LOG_IN } from './types'

//초기 값
const initialState = {
    loginState: LOGINSTATE,
    loginWindow: false, //로그인창 open, close 유무
    id: '',
}

//로그인창 열고 닫고
const loginWindowReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_WINDOW_OPEN:
            return {
                ...state, //state값을 그대로 복사를 한번함
                loginWindow: true, //로그인창 open
            }
        case LOGIN_WINDOW_ClOSE:
            return {
                ...state, //state값을 그대로 복사를 한번함
                loginWindow: false, //로그인창 close
            }
        case LOG_OUT:
            return {
                ...state,
                loginState: 'LOGOUT',
            }
        case LOG_IN:
            return {
                ...state,
                loginState: 'LOGIN',
            }
        default:
            return state //기본값
    }
}

export default loginWindowReducer //외부에서 사용하기 위해서

//action
import { LOGIN_WINDOW_OPEN, LOGIN_WINDOW_ClOSE, LOG_OUT, LOG_IN } from './types'

//로그인창 열기
export const loginOpen = () => {
    return {
        type: LOGIN_WINDOW_OPEN,
    }
}

//로그인창 닫기
export const loginClose = () => {
    return {
        type: LOGIN_WINDOW_ClOSE,
    }
}

//로그아웃
export const logout = () => {
    return {
        type: LOG_OUT,
    }
}

//로그인
export const login = () => {
    return {
        type: LOG_IN,
    }
}

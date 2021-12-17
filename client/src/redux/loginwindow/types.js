//action 하고 reducer 양쪽에서 type을 가져가기 때문에 따로 정의
export const LOGIN_WINDOW_OPEN = 'LOGIN_WINDOW_OPEN'
export const LOGIN_WINDOW_ClOSE = 'LOGIN_WINDOW_ClOSE'

export const LOGIN_ID_INPUT = 'LOGIN_ID_INPUT'
export const LOGIN_ID_PASSWORD = 'LOGIN_ID_PASSWORD'
export let LOGINSTATE = ''
export const LOG_OUT = 'LOG_OUT'
export const LOG_IN = 'LOG_IN'

if (window.localStorage.getItem('email') == null && window.sessionStorage.getItem('email') == null) {
    LOGINSTATE = 'LOGOUT'
} else {
    LOGINSTATE = 'LOGIN'
}

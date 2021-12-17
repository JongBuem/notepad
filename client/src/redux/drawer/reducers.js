//reducers
import { DRAWER_OPEN, DRAWER_ClOSE } from './types'

//초기 값
const initialState = {
    toggle: false,
}

//left menu 열고 닫고
const loginWindowReducer = (state = initialState, action) => {
    switch (action.type) {
        case DRAWER_OPEN:
            return {
                ...state, //state값을 그대로 복사를 한번함
                toggle: true, //left open
            }
        case DRAWER_ClOSE:
            return {
                ...state, //state값을 그대로 복사를 한번함
                toggle: false, //left close
            }
        default:
            return state //기본값
    }
}

export default loginWindowReducer //외부에서 사용하기 위해서

//reducers
import { ADD_VIEW } from './types'

//초기 값
const initialState = {
    count : 0 //로그인창 open, close 유무
}

//로그인창 열고 닫고
const addViewReducer = (state = initialState, action)=>{
    switch(action.type){
        case ADD_VIEW :
            return {
                ...state,               //state값을 그대로 복사를 한번함
                count : state.count+1   //로그인창 open
            }
        default: return state;          //기본값
    }
}

export default addViewReducer       //외부에서 사용하기 위해서
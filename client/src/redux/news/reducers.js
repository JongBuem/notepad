//reducers
import { ADD_STATE } from './types'
import axios from 'axios'

const naverNews= async()=>{
    await axios.post("http://127.0.0.1:8080/naver/news",{
        headers: {
            "Access-Control-Allow-Credentials" : true,
            "Access-Control-Allow-Origin" :"http://127.0.0.1:8080",
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        serch: "클라우드"
    }).then((res)=>{
        if(res.data.message){
            initialState.naver = res.data.message
        }else{
            console.log("false")
        }
    }).catch((error)=> {
        console.log(error)
    })
}



const kakaoNews= async()=>{
    await axios.post("http://127.0.0.1:8080/kakao/news",{
        headers: {
            "Access-Control-Allow-Credentials" : true,
            "Access-Control-Allow-Origin" :"http://127.0.0.1:8080",
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        serch: "클라우드"
    }).then((res)=>{
        if(res.data.message){
            initialState.kakao = res.data.message
        }else{
            console.log("false")
        }
    }).catch((error)=> {
        console.log(error)
    })
}

//초기 값
let initialState = {
    naver :  undefined,
    kakao : undefined,
    loading : false 
}
naverNews()
kakaoNews()

//로그인창 열고 닫고
const addViewReducer = (state = initialState, action)=>{
    switch(action.type){
        case ADD_STATE :
            return {
                ...state,               
                loading : state.loading=true,
            }
        default: return state;          
    }
}

export default addViewReducer       //외부에서 사용하기 위해서



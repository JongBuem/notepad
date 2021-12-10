//reducers
import { ADD_VIEW } from './types'
import axios from 'axios'

const naverNews= async()=>{
    await axios.post("http://127.0.0.1:8080/naver/news",{
        headers: {
            "Access-Control-Allow-Credentials" : true,
            "Access-Control-Allow-Origin" :"http://127.0.0.1:8080",
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
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



const daumNews= async()=>{
    await axios.post("http://127.0.0.1:8080/daum/news",{
        headers: {
            "Access-Control-Allow-Credentials" : true,
            "Access-Control-Allow-Origin" :"http://127.0.0.1:8080",
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    }).then((res)=>{
        if(res.data.message){
            initialState.daum = res.data.message
        }else{
            console.log("false")
        }
    }).catch((error)=> {
        console.log(error)
    })
}

//초기 값
let initialState = {
    naver :  naverNews(),
    daum : daumNews()
}

// daumNews()
// naverNews()

//로그인창 열고 닫고
const addViewReducer = (state = initialState, action)=>{
    switch(action.type){
        
        // case ADD_VIEW :
        //     return {
        //         ...state,               //state값을 그대로 복사를 한번함
        //         count : state.count+1   //로그인창 open
        //     }
        default: return state;          //기본값
    }
}

export default addViewReducer       //외부에서 사용하기 위해서



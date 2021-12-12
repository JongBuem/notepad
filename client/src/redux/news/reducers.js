//reducers
import { ADD_STATE } from './types'
import axios from 'axios'

const newsAPI= async(item)=>{
    let query = "클라우드"
    if(item=="guardian") query = "cloud"

    await axios.post(`http://127.0.0.1:8080/${item}/news`,{
        headers: {
            "Access-Control-Allow-Credentials" : true,
            "Access-Control-Allow-Origin" :"http://127.0.0.1:8080",
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        serch: query
    }).then((res)=>{
        if(res.data.message){
            if(item=="naver") initialState.naver = res.data.message
            else if(item=="kakao") initialState.kakao = res.data.message
            else if(item=="bing") initialState.bing = res.data.message
            else if(item=="guardian") initialState.guardian = res.data.message
            else if(item=="newscatcher") initialState.newscatcher = res.data.message
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
    bing : undefined,
    guardian : undefined,
    newscatcher : undefined,
    loading : false 
}

newsAPI("naver")
newsAPI("kakao")
newsAPI("bing")
newsAPI("guardian")
newsAPI("newscatcher")

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



//reducers
import { ADD_STATE , RECORD_FIND, ASYNC} from './types'
import axios from 'axios'

// 이부분이 Client -> Server 로 요청
const newsAPI= async(item, query, sort)=>{
    await axios.get(`http://127.0.0.1:8080/${item}/news?sort=${sort}&serch=${query}`,{
        headers: {
            "Access-Control-Allow-Credentials" : true,
            "Access-Control-Allow-Origin" :"http://127.0.0.1:8080",
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        serch: query,
        sort: sort
    }).then(async(res)=>{
        if(res.data.message){
            if(item=="naver") return await res.data.message
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
    naver :  newsAPI("naver", "클라우드", "accuracy"),
    kakao : undefined,
    bing : undefined,
    guardian : undefined,
    newscatcher : undefined,
    loading : false,
    recordfind : RECORD_FIND,
    asyncs : ASYNC
}

//recency  최신
//accuracy 관련
newsAPI("naver", "클라우드", "accuracy")
newsAPI("kakao", "클라우드", "accuracy")
newsAPI("bing", "클라우드", "accuracy")
newsAPI("guardian", "cloud", "accuracy")
newsAPI("newscatcher", "클라우드", "accuracy")

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



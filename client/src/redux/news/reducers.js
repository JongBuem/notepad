//reducers
import { ADD_STATE, RECORD_FIND } from './types'
import { LOGINSTATE } from '../loginwindow/types'
import axios from 'axios'

// // 이부분이 Client -> Server 로 요청
// const newsAPI = async (item, query, sort) => {
//     await axios
//         .get(`http://127.0.0.1:8080/${item}/news?sort=${sort}&serch=${query}`, {
//             headers: {
//                 'Access-Control-Allow-Credentials': true,
//                 'Access-Control-Allow-Origin': 'http://127.0.0.1:8080',
//                 'Content-Type': 'application/json',
//                 Accept: 'application/json',
//             },
//             serch: query,
//             sort: sort,
//         })
//         .then(async (res) => {
//             if (res.data.message) {
//                 if (item == 'naver') initialState.naver = res.data.message
//                 else if (item == 'kakao') initialState.kakao = res.data.message
//                 else if (item == 'bing') initialState.bing = res.data.message
//                 else if (item == 'guardian') initialState.guardian = res.data.message
//                 else if (item == 'newscatcher') initialState.newscatcher = res.data.message
//             } else {
//                 console.log('false')
//             }
//         })
//         .catch((error) => {
//             console.log(error)
//             return undefined
//         })
// }

const newsAPI = (item, query, sort) => {
    // console.time()
    return new Promise((resolve) => {
        axios
            .get(`http://127.0.0.1:8080/${item}/news?sort=${sort}&serch=${query}`, {
                headers: {
                    'Access-Control-Allow-Credentials': true,
                    'Access-Control-Allow-Origin': 'http://127.0.0.1:8080',
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                serch: query,
                sort: sort,
            })
            .then(async (res) => {
                if (res.data.message) {
                    resolve(res.data.message)
                } else {
                    console.log('false')
                }
            })
            .catch((error) => {
                console.log(error)
                return undefined
            })
    }).then((res) => {
        return res
    })
}

const recordfind = () => {
    // console.time()
    return new Promise((resolve) => {
        if (LOGINSTATE == 'LOGIN') {
            axios
                .post('http://127.0.0.1:8080/news/record/find', {
                    headers: {
                        'Access-Control-Allow-Credentials': true,
                        'Access-Control-Allow-Origin': 'http://127.0.0.1:8080',
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                    localemail: window.localStorage.getItem('email'),
                    sessionemail: window.sessionStorage.getItem('email'),
                })
                .then((res) => {
                    if (res.data) {
                        resolve(res.data)
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        } else {
            resolve('')
        }
    }).then((res) => {
        return res
    })
}

//초기 값
let initialState = {
    naver: newsAPI('naver', '클라우드', 'accuracy'),
    kakao: newsAPI('kakao', '클라우드', 'accuracy'),
    bing: newsAPI('bing', '클라우드', 'accuracy'),
    guardian: newsAPI('guardian', 'cloud', 'accuracy'),
    newscatcher: newsAPI('newscatcher', '클라우드', 'accuracy'),
    loading: false,
    recordfind: recordfind(),
}

//recency  최신
//accuracy 관련
// newsAPI('naver', '클라우드', 'accuracy')
// newsAPI('kakao', '클라우드', 'accuracy')
// newsAPI('bing', '클라우드', 'accuracy')
// newsAPI('guardian', 'cloud', 'accuracy')
// newsAPI('newscatcher', '클라우드', 'accuracy')

//로그인창 열고 닫고
const addViewReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_STATE:
            return {
                ...state,
                recordfind: recordfind(),
            }
        default:
            return state
    }
}

export default addViewReducer //외부에서 사용하기 위해서

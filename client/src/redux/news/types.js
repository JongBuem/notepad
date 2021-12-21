import { LOGINSTATE } from '../loginwindow/types'
import axios from 'axios'

// //promise
// const promise = () => {
//     // console.time()
//     return new Promise((resolve) => {
//         const item = 'bing'
//         const sort = 'recency'
//         const query = '클라우드'
//         axios
//             .get(`http://20.194.16.65:8080/${item}/news?sort=${sort}&serch=${query}`, {
//                 headers: {
//                     'Access-Control-Allow-Credentials': true,
//                     'Access-Control-Allow-Origin': 'http://20.194.16.65:8080',
//                     'Content-Type': 'application/json',
//                     Accept: 'application/json',
//                 },
//                 serch: query,
//                 sort: sort,
//             })
//             .then(async (res) => {
//                 if (res.data.message) {
//                     resolve(res.data.message)
//                 } else {
//                     console.log('false')
//                 }
//             })
//             .catch((error) => {
//                 console.log(error)
//             })
//     }).then((res) => {
//         return res
//     })
// }

// //async await
// const asyncawait = async () => {
//     // console.time()
//     const item = 'bing'
//     const sort = 'recency'
//     const query = '클라우드'
//     const response = await axios
//         .get(`http://20.194.16.65:8080/${item}/news?sort=${sort}&serch=${query}`, {
//             headers: {
//                 'Access-Control-Allow-Credentials': true,
//                 'Access-Control-Allow-Origin': 'http://20.194.16.65:8080',
//                 'Content-Type': 'application/json',
//                 Accept: 'application/json',
//             },
//             serch: query,
//             sort: sort,
//         })
//         .then((res) => {
//             if (res.data.message) {
//                 // console.log(res.data.message, "async await 도착")
//                 return res.data.message
//             } else {
//                 console.log('false')
//             }
//         })
//         .catch((error) => {
//             console.log(error)
//         })

//     if (response.status != 200) {
//         console.log(response)
//     }

//     try {
//         const response = axios.get('api')

//         const user = response.data
//     } catch (err) {
//         throw new Error(err)
//     } finally {
//         console.log('required')
//     }
// }

const recordfind = () => {
    // console.time()
    return new Promise((resolve) => {
        if (LOGINSTATE == 'LOGIN') {
            axios
                .post('http://20.194.16.65:8080/news/record/find', {
                    headers: {
                        'Access-Control-Allow-Credentials': true,
                        'Access-Control-Allow-Origin': 'http://20.194.16.65:8080',
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

export const ADD_STATE = 'ADD_STATE'
export const CLOUD = 'CLOUD'
export const BIGDATA = 'BIGDATA'
export const BLOCKCHAIN = 'BLOCKCHAIN'
export const AI = 'AI'
export const IOT = 'IOT'
export let RECORD_FIND = recordfind()

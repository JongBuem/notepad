
import {LOGINSTATE} from '../loginwindow/types'
import axios from 'axios'

const increment=()=>{
    console.time()
    return new Promise( (resolve) => {
        const item = "bing"
        const sort = "recency" 
        const query = "클라우드"
        axios.get(`http://127.0.0.1:8080/${item}/news?sort=${sort}&serch=${query}`,{
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
                resolve(res.data.message)
            }else{
                console.log("false")
            }
        }).catch((error)=> {
            console.log(error)
        })
        
        }).then((res)=>{
            return res
        })
}


const asyawi=async()=>{
        console.time()
        const item = "bing"
        const sort = "recency" 
        const query = "클라우드"
        await axios.get(`http://127.0.0.1:8080/${item}/news?sort=${sort}&serch=${query}`,{
        headers: {
            "Access-Control-Allow-Credentials" : true,
            "Access-Control-Allow-Origin" :"http://127.0.0.1:8080",
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        serch: query,
        sort: sort
        }).then((res)=>{
            if(res.data.message){
                return  res.data.message
            }else{
                console.log("false")
            }
        }).catch((error)=> {
            console.log(error)
        })
}

export const ADD_STATE = 'ADD_STATE'
// export let RECORD_FIND = increment();
export let RECORD_FIND = "sad"
export let ASYNC = asyawi().then();



    // axios.post("http://127.0.0.1:8080/news/record/find",{
    //     headers: {
    //         "Access-Control-Allow-Credentials" : true,
    //         "Access-Control-Allow-Origin" :"http://127.0.0.1:8080",
    //         'Content-Type': 'application/json',
    //         Accept: 'application/json',
    //     },
    //         localemail : window.localStorage.getItem('email'),
    //         sessionemail : window.sessionStorage.getItem('email'),
    //     }).then((res)=>{
    //         if(res.data){
    //             resolve(res.data)
    //         }
    //     }).catch((error)=> {
    //         console.log(error)
    //     })
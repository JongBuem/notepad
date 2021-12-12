import React,{useState} from 'react';
import {Box, CircularProgress } from '@material-ui/core'
import './style.css';
import {useSelector} from 'react-redux';

const Lists = (props)=>{
    return(
        <Box className='list'>
            제목 : {props.title}
            <br/>
            내용 : {props.info}
            <br/>
            내용 : {props.url}
            <br/>
            내용 : {props.date}
            <br/>
            내용 : {props.imgurl}
        </Box>
    )
}


export default function NaverNews({props}){
    const {news} = useSelector((state)=>state)
    const [state, setState] =useState(false)
    const [article, setArticle] =useState([])

    if(props=="naver"){
        let interval = setInterval(()=> {
            if (news.naver != undefined) {
                setArticle(news.naver)
                clearInterval(interval) 
                setState(true)
                console.log(news)
            }
        }, 10)
    }else if(props=="kakao"){
        let interval = setInterval(()=> {
            if (news.kakao != undefined) {
                setArticle(news.kakao)
                clearInterval(interval) 
                setState(true)
            }
        }, 10)
    }else if(props=="bing"){
        let interval = setInterval(()=> {
            if (news.bing != undefined) {
                setArticle(news.bing)
                clearInterval(interval) 
                setState(true)
            }
        }, 10)
    }else if(props=="guardian"){
        let interval = setInterval(()=> {
            if (news.guardian != undefined) {
                setArticle(news.guardian)
                clearInterval(interval) 
                setState(true)
            }
        }, 10)
    }else if(props=="newscatcher"){
        let interval = setInterval(()=> {
            if (news.newscatcher != undefined) {
                setArticle(news.newscatcher)
                clearInterval(interval) 
                setState(true)
            }
        }, 10)
    }

    return(
        <Box className="listBox">
            {state==false?<CircularProgress/>:
                article.map(item=>(

                    <Lists
                        key={item.title}
                        title={item.title}
                        info={item.info}
                        url ={item.url}
                        date ={item.date}
                        imgurl ={item.imgurl}
                    />

                ))
            }
        </Box>
    )
}
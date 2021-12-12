import React,{useEffect, useState} from 'react';
import {Box, Button, TextField, InputAdornment, IconButton, CircularProgress } from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import './style.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

const Lists = (props)=>{
    const title = props.title
    const titleinfo = props.titleinfo
    return(
        <div style={{padding:"10px"}}>
            제목 : {title}
            <br/>
            내용 : {titleinfo}
        </div>
    )
}


export default function News(){
    const {news} = useSelector((state)=>state)
    const [state, setState] =useState(false)

    var interval = setInterval(()=> {
        if (news.naver != undefined && news.kakao != undefined) {
        clearInterval(interval) 
        
        setState(true)
          // dispatch(addstate())
        }
        console.log(news)
    }, 1000)

    return(
        <Box className="News" sx={{p:3}}>
            {state==false?<CircularProgress/>:
            <Box>
            
                <Box>
                {
                news.naver.map(item=>(
                    <Lists
                        key={item.titleinfo}
                        title={item.title}
                        titleinfo={item.titleinfo}
                    />
                ))
                }
                </Box>
            
            {/* {
                kakao.map(item=>(
                <Lists
                    key={item.titleinfo}
                    title={item.title}
                    titleinfo={item.titleinfo}
                />
                ))
            }
                        {
                kakao.map(item=>(
                <Lists
                    key={item.titleinfo}
                    title={item.title}
                    titleinfo={item.titleinfo}
                />
                ))
            } */}

            </Box>


            }
        </Box>
    )
}
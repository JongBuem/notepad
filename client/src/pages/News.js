import React,{useEffect, useState} from 'react';
import {Box, Button, TextField, InputAdornment, IconButton, CircularProgress } from '@material-ui/core'
import './style.css';
import NaverNews from '../components/NaverNews';

export default function News(){
    return(
        <Box className="News" sx={{p:2}}>
            <NaverNews props={"naver"}/>
            <NaverNews props={"kakao"}/>
            <NaverNews props={"bing"}/>
            <NaverNews props={"newscatcher"}/>
            <NaverNews props={"guardian"}/>
        </Box>
    )
}
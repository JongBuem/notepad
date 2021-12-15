import React,{useEffect, useState} from 'react';
import {Box, Button, TextField, InputAdornment, IconButton, CircularProgress } from '@material-ui/core'
import './style.css';
import NewsList from '../components/NewsList';

export default function News(){
    return(
        <Box className="News" sx={{p:2}} >
            <NewsList props={"naver"}/>
            <NewsList props={"kakao"}/>
            <NewsList props={"bing"}/>
            <NewsList props={"newscatcher"}/>
            <NewsList props={"guardian"}/>
        </Box>
    )
}
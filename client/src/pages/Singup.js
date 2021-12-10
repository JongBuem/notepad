import React,{useEffect, useState} from 'react';
import {Box, Button, TextField, InputAdornment, IconButton} from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import './style.css';
import axios from 'axios';


export default function Singup(){
    //user info
    const [values, setValues] = React.useState({
        name:'',
        id:'',
        password: '',
        passwordConfirm:'',
        showPassword: false,
        showPasswordConfirm : false,
        userid:''
    });

    //입력한 값으로 변경
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };
    const handleClickShowPasswordConfirm = () => {
        setValues({ ...values, showPasswordConfirm: !values.showPasswordConfirm });
    };
    // const handleMouseDownPassword = (event) => {
    //     event.preventDefault();
    // };

    //submit click
    const loginButton= async()=>{
        await axios.post("http://127.0.0.1:8080/singup",{
            headers: {
                "Access-Control-Allow-Credentials" : true,
                "Access-Control-Allow-Origin" :"http://127.0.0.1:8080",
                'Content-Type': 'application/json',
                Accept: 'application/json',
                
            },
            name :values.name,
            id :values.id,
            password: values.password,
            passwordConfirm: values.passwordConfirm,
        }).then((res)=>{
            if(res.data.message){
                console.log("true")
            }else{
                console.log("false")
            }
        }).catch((error)=> {
            console.log(error)
        })
    }
    
    return(
        <Box className="Signup" >
            <TextField 
                label="이름" 
                value={values.name}
                onChange={handleChange('name')}
                style={{width: "250px",}}
            />
            <TextField 
                label="아이디" 
                value={values.id}
                onChange={handleChange('id')}
                style={{width: "250px",}}
            />
            <TextField
                label="비밀번호"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                style={{width: "250px",}}
                InputProps={{
                    endAdornment:(
                    <InputAdornment position="end">
                        <IconButton
                            onClick={handleClickShowPassword}
                            // onMouseDown={handleMouseDownPassword}
                        >
                            {values.showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                    )
                }}
            />
            <TextField
                label="비밀번호 확인"
                type={values.showPasswordConfirm ? 'text' : 'password'}
                value={values.passwordConfirm}
                onChange={handleChange('passwordConfirm')}
                style={{width: "250px",}}
                InputProps={{
                    endAdornment:(
                    <InputAdornment position="end">
                        <IconButton
                            onClick={handleClickShowPasswordConfirm}
                            // onMouseDown={handleMouseDownPassword}
                        >
                            {values.showPasswordConfirm ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                    )
                }}
            />
            <Button onClick={()=>loginButton()} type="submit">확인</Button>
        </Box>
    )
}
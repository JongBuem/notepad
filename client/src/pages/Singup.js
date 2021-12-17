import React, { useEffect, useState } from 'react'
import { Box, Button, TextField, InputAdornment, IconButton, Typography } from '@material-ui/core'
import { Alert, Autocomplete } from '@material-ui/lab'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import './singup.css'
import axios from 'axios'

// { title: '클라우드', en:'Cloud'},
// { title: '빅 데이터', en: "Big Data" },
// { title: '블록체인', en: "Internet of Things" },
// { title: '인공지능', en: "AI" },
// { title: '사물 인터넷', en: "IOT"},
const option = ['클라우드', '빅 데이터', '블록체인', '인공지능', '사물 인터넷']

export default function Singup() {
    const [optionValue, setOptionValue] = useState(option[0])
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirm: '',
        newskeywords: '',
        showPassword: false,
        showPasswordConfirm: false,
        alertState: 0,
    })

    //입력한 값으로 변경
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value })
    }
    //비밀번호 아이콘 이벤트
    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword })
    }
    const handleClickShowPasswordConfirm = () => {
        setValues({ ...values, showPasswordConfirm: !values.showPasswordConfirm })
    }

    //submit click
    const loginButton = async () => {
        if (values.name === '' || values.email === '' || values.password === '' || values.passwordConfirm === '' || values.newskeywords === '') {
            setValues({ ...values, alertState: 1 })
        } else if (values.password != values.passwordConfirm) {
            setValues({ ...values, alertState: 2 })
        } else {
            await axios
                .post('http://127.0.0.1:8080/singup', {
                    headers: {
                        'Access-Control-Allow-Credentials': true,
                        'Access-Control-Allow-Origin': 'http://127.0.0.1:8080',
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                    name: values.name,
                    email: values.email,
                    password: values.password,
                    newskeywords: values.newskeywords,
                })
                .then((res) => {
                    if (res.data.message == true) {
                        setValues({ ...values, alertState: 4 })
                    } else {
                        setValues({ ...values, alertState: 3 })
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }

    return (
        <Box className="Signup">
            <Box className="SignupBox">
                <Typography className="SignupHeader" variant="h4" component="div">
                    회원 가입
                </Typography>
                <TextField label="이름" value={values.name} onChange={handleChange('name')} className="input" />
                <TextField label="이메일" value={values.email} onChange={handleChange('email')} className="input" />
                <TextField
                    label="비밀번호"
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange('password')}
                    className="input"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClickShowPassword}
                                    // onMouseDown={handleMouseDownPassword}
                                >
                                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    label="비밀번호 확인"
                    type={values.showPasswordConfirm ? 'text' : 'password'}
                    value={values.passwordConfirm}
                    onChange={handleChange('passwordConfirm')}
                    className="input"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClickShowPasswordConfirm}
                                    // onMouseDown={handleMouseDownPassword}
                                >
                                    {values.showPasswordConfirm ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <Autocomplete
                    value={optionValue}
                    onChange={(event, newValue) => {
                        setOptionValue(newValue)
                    }}
                    inputValue={values.newskeywords}
                    onInputChange={(event, newInputValue) => {
                        setValues({ ...values, newskeywords: newInputValue })
                    }}
                    id="controllable-states-demo"
                    options={option}
                    className="input"
                    renderInput={(params) => <TextField {...params} label="뉴스 키워드" margin="normal" />}
                />
                <Box className="alertBox">
                    {values.alertState == 1 ? (
                        <Alert
                            variant="filled"
                            severity="error"
                            onClose={() => {
                                setValues({ ...values, alertState: 0 })
                            }}
                        >
                            {' '}
                            모든 정보를 입력해주세요!
                        </Alert>
                    ) : (
                        <span />
                    )}
                    {values.alertState == 2 ? (
                        <Alert
                            variant="filled"
                            severity="warning"
                            onClose={() => {
                                setValues({ ...values, alertState: 0 })
                            }}
                        >
                            비밀번호가 동일하지 않습니다!
                        </Alert>
                    ) : (
                        <span />
                    )}
                    {values.alertState == 3 ? (
                        <Alert
                            variant="filled"
                            severity="warning"
                            onClose={() => {
                                setValues({ ...values, alertState: 0 })
                            }}
                        >
                            이미 존재하는 아이디 입니다!
                        </Alert>
                    ) : (
                        <span />
                    )}
                    {values.alertState == 4 ? (
                        <Alert
                            variant="filled"
                            severity="success"
                            onClose={() => {
                                setValues({ ...values, alertState: 0 })
                            }}
                        >
                            회원가입 완료
                        </Alert>
                    ) : (
                        <span />
                    )}
                </Box>
                <Box className="singupButton">
                    <Button onClick={() => loginButton()} variant="contained" color="primary">
                        확인
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}

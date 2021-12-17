import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, TextField, FormControl, InputAdornment, IconButton, AppBar, Tabs, Tab, FormControlLabel, Checkbox, Box, useTheme } from '@material-ui/core'
import SwipeableViews from 'react-swipeable-views'
import { useSelector, useDispatch, connect } from 'react-redux'
import { loginOpen, loginClose } from '../redux/loginwindow/actions'
import { Alert, Autocomplete } from '@material-ui/lab'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { login } from '../redux/loginwindow/actions'

function TabPanel(props) {
    const { value, index, ...other } = props
    return <Box role="tabpanel" hidden={value !== index} id={`full-width-tabpanel-${index}`} aria-labelledby={`full-width-tab-${index}`} {...other} sx={{ p: 3 }}></Box>
}

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    }
}

export default function Login() {
    const theme = useTheme()
    const dispatch = useDispatch() //로그인 리듀서
    const { loginWindow } = useSelector((state) => state.loginWindow) //로그인 창 유무

    //top tab
    const [value, setValue] = React.useState(0)
    const tabHandleChange = (event, newValue) => {
        setValue(newValue)
    }
    const handleChangeIndex = (index) => {
        setValue(index)
    }

    //email, password, passwordicon
    const [values, setValues] = React.useState({
        userid: '',
        email: '',
        password: '',
        showPassword: false,
        alertState: 0,
        autoLogin: false,
    })
    //입력창에 email, password 입력시 변경
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value })
    }
    //password text 표시 or 표시안함
    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword })
    }
    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    }

    //로그인 버튼 클릭시
    const loginButton = async () => {
        // window.sessionStorage.setItem('email',values.email); //세션 스토리지 생성 -> 창닫으면 제거
        // window.localStorage.setItem('email',values.email); //로컬 스토리지 생성 -> 창닫아도 남는다!
        if (values.email == '' || values.password == '') {
            setValues({ ...values, alertState: 1 })
        } else {
            await axios
                .post('http://127.0.0.1:8080/login', {
                    headers: {
                        'Access-Control-Allow-Credentials': true,
                        'Access-Control-Allow-Origin': 'http://127.0.0.1:8080',
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                    email: values.email,
                    password: values.password,
                })
                .then((res) => {
                    if (res.data.message == true) {
                        if (values.autoLogin == false) {
                            window.sessionStorage.setItem('email', values.email) //세션 스토리지 생성 -> 창닫으면 제거
                            setValues({ ...values, alertState: 4 })
                            dispatch(login())
                            dispatch(loginClose())
                            window.location.reload()
                        } else if (values.autoLogin == true) {
                            window.localStorage.setItem('email', values.email) //세션 스토리지 생성 -> 창닫으면 제거
                            setValues({ ...values, alertState: 4 })
                            dispatch(login())
                            dispatch(loginClose())
                            window.location.reload()
                        }
                    } else if (res.data.message == '회원아님') {
                        setValues({ ...values, alertState: 2 })
                    } else if (res.data.message == '비밀번호다름') {
                        setValues({ ...values, alertState: 3 })
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }

    return (
        <FormControl>
            <Dialog open={loginWindow} onClose={() => dispatch(loginClose())} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <div style={{ width: 500 }}>
                    <AppBar position="static" color="default">
                        <Tabs value={value} onChange={tabHandleChange} indicatorColor="primary" textColor="primary" variant="fullWidth" aria-label="full width tabs example">
                            <Tab label="로그인" {...a11yProps(0)} style={{ fontSize: '20px' }} />
                            {/* <Tab label="USER ID" {...a11yProps(1)} /> */}
                        </Tabs>
                    </AppBar>
                    <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={value} onChangeIndex={handleChangeIndex}>
                        <TabPanel value={value} index={0} dir={theme.direction}>
                            <DialogContent style={{ padding: '0px 30px 10px 30px' }}>
                                <TextField label="이메일" value={values.email} onChange={handleChange('email')} style={{ width: '250px', marginBottom: 20 }} />
                                <TextField
                                    label="비밀번호"
                                    type={values.showPassword ? 'text' : 'password'}
                                    value={values.password}
                                    onChange={handleChange('password')}
                                    style={{ width: '250px' }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                                                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </DialogContent>
                            <Box style={{ marginTop: 34 }}>
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
                                        {' '}
                                        존재하지 않는 이메일 입니다!
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
                                        {' '}
                                        비밀번호를 다시 확인해주세요
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
                                        {' '}
                                        환영합니다
                                    </Alert>
                                ) : (
                                    <span />
                                )}
                                <DialogActions>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                name="checkedC"
                                                onChange={(e) => {
                                                    if (e.target.checked == true) setValues({ ...values, autoLogin: true })
                                                    else if (e.target.checked == false) setValues({ ...values, autoLogin: false })
                                                }}
                                            />
                                        }
                                        label="자동 로그인"
                                    />
                                    <Link to="/singup">
                                        <Button onClick={() => dispatch(loginClose())} color="primary">
                                            {' '}
                                            회원가입
                                        </Button>
                                    </Link>
                                    <Button onClick={() => loginButton()} color="primary" autoFocus>
                                        {' '}
                                        로그인
                                    </Button>
                                </DialogActions>
                            </Box>
                        </TabPanel>
                        {/* <TabPanel value={value} index={1} dir={theme.direction}>
                            <DialogContent style={{width:"auto", padding:"0px 30px 10px 30px"}}>
                                <TextField 
                                    label="USER ID" 
                                    value={values.userid}
                                    onChange={handleChange('userid')}
                                />
                                <DialogActions>
                                    <Button  onClick={()=> loginButton() } color="primary" autoFocus> 확인</Button>
                                </DialogActions>
                            </DialogContent>
                        </TabPanel> */}
                    </SwipeableViews>
                </div>
            </Dialog>
        </FormControl>
    )
}

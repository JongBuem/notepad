import React from 'react';
import { 
    Button , 
    Dialog, 
    DialogActions, 
    DialogContent,   
    TextField, 
    FormControl, 
    InputAdornment, 
    IconButton,
    AppBar,
    Tabs,
    Tab,
    Typography,
    Box,
    useTheme 
} from '@material-ui/core'
import SwipeableViews from 'react-swipeable-views';
import { useSelector, useDispatch, connect } from 'react-redux';
import {loginOpen, loginClose} from '../redux/loginwindow/actions'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import axios from 'axios'

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
            <Box sx={{p:3}}>
                <Typography>{children}</Typography>
            </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

export default function Login() {
    // const login = useSelector(state=>state);
    // const dispatch = useDispatch()
    const theme = useTheme();


    const dispatch = useDispatch() //로그인 리듀서
    const {loginWindow} = useSelector((state)=>state.loginWindow) //로그인 창 유무
    // const propss = useSelector((state)=>state)
    // console.log(propss)


    //top tab
    const [value, setValue] = React.useState(0);
    const tabHandleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleChangeIndex = (index) => {
        setValue(index);
    };


    //id, password, passwordicon
    const [values, setValues] = React.useState({
        id:'',
        password: '',
        showPassword: false,
        userid:''
    });
    //입력창에 id, password 입력시 변경
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    //password text 표시 or 표시안함
    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    //로그인 버튼 클릭시
    const loginButton= async()=>{
        await axios.post("http://127.0.0.1:8080/login",{
            headers: {
                "Access-Control-Allow-Credentials" : true,
                "Access-Control-Allow-Origin" :"http://127.0.0.1:8080",
                'Content-Type': 'application/json',
                Accept: 'application/json',
                
            },
            id : values.id,
            password : values.password
        }).then((res)=>{
            if(res.data.message){
                dispatch(loginClose())
                console.log("true")
            }else{
                console.log("false")
            }
        }).catch((error)=> {
            console.log(error)
        })
    }

    return(
        <FormControl>
            <Dialog
                open={loginWindow}
                onClose={()=> dispatch(loginClose())}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <div style={{width:500}}>
                    <AppBar position="static" color="default">
                        <Tabs
                            value={value}
                            onChange={tabHandleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="fullWidth"
                            aria-label="full width tabs example"
                        >
                            <Tab label="ID / Password" {...a11yProps(0)} />
                            <Tab label="USER ID" {...a11yProps(1)} />
                        </Tabs>
                    </AppBar>
                    <SwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={value}
                        onChangeIndex={handleChangeIndex}
                    >
                        <TabPanel value={value} index={0} dir={theme.direction}>
                            <DialogContent style={{width:"300px", padding:"0px 30px 10px 30px"}}>
                                <TextField 
                                    label="ID" 
                                    value={values.id}
                                    onChange={handleChange('id')}
                                />
                            </DialogContent>
                            <DialogContent style={{width:"200px", padding:"0px 30px 20px 30px"}}> 
                                <TextField
                                    label="Password"
                                    type={values.showPassword ? 'text' : 'password'}
                                    value={values.password}
                                    onChange={handleChange('password')}
                                    InputProps={{
                                        endAdornment:(
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                        )
                                    }}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button  onClick={()=> dispatch(loginClose()) } color="primary"> 회원가입 </Button>
                                <Button  onClick={()=> loginButton() } color="primary" autoFocus> 로그인</Button>
                            </DialogActions>
                        </TabPanel>
                        <TabPanel value={value} index={1} dir={theme.direction}>
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
                        </TabPanel>
                    </SwipeableViews>
                </div>
            </Dialog>
        </FormControl>
    );
}

// //connect를 통해 reducers의 state값을 컴포넌트에 props로 전달
// const loginStateProps = (state) => {
//     return{
//         loginWindow : state.loginWindow
//     }
// }

// // //action을 통해 state의 값을 바꾸고 컴포넌트에 props로 전잘
// const loginDispatchPropsOpen = (dispatch)=>{
//     return{
//         loginOpen: ()=>dispatch(loginOpen())
//     }
// }

// const loginDispatchPropsClose = (dispatch)=>{
//     return{
//         loginClose: ()=>dispatch(loginClose())
//     }
// }

// // 오브젝트방식
// const loginDispatchPropsOpen = {
//     // loginOpen : loginOpen //es6에서는 key와 value가 같으면 생략이가능
//     loginOpen
// }

// const loginDispatchPropsClose = {
//     // loginOpen : loginOpen //es6에서는 key와 value가 같으면 생략이가능
//     loginClose
// }


// export default connect(loginStateProps, loginDispatchPropsOpen, loginDispatchPropsClose )(Login)

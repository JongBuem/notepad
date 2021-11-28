import React from 'react';
import { Button , Dialog, DialogActions, DialogContent,  DialogTitle, TextField, FormControl, InputAdornment, IconButton} from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

export default function Login() {
    const login = useSelector(state=>state);

    
    const dispatch = useDispatch()
    const [values, setValues] = React.useState({
        id:'',
        password: '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return(
        <FormControl>
            <Dialog
                open={login}
                onClose={()=> {dispatch({type:"close"}) }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"로그인"}</DialogTitle>
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
                    <Button  onClick={()=> {dispatch({type:"close"}) }} color="primary"> 회원가입 </Button>
                    <Button  onClick={()=> {dispatch({type:"close"}) }} color="primary" autoFocus> 로그인</Button>
                </DialogActions>
            </Dialog>
        </FormControl>
    );
}
import * as React  from 'react';
import { useState } from 'react';
import { Link } from "react-router-dom";
import './Style.css'
import Login from '../pages/Login';
import {Box, Toolbar, MenuItem  , AppBar, IconButton, Button, ButtonGroup, Select, InputLabel, FormControl, makeStyles, styled, alpha, InputBase,} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import BarChartIcon from '@material-ui/icons/BarChart';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useDispatch } from 'react-redux';


//검색창 상자 style
const Search = styled('div')(({ theme }) => ({
    display: 'flex',
    position: 'relative',
    borderRadius: 50,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    width: '50%',
    height: '50%',
    alignItems:"center",
    padding:'5px',
    paddingLeft:'15px',
}));

//검색창 돋보기 style
const SearchIconWrapper = styled('div')(({ theme }) => ({
    // padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    right:'0px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));


const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width:"80%"
}));

export default function TopMenuComponent() {
    const dispatch = useDispatch() //로그인 리듀서
    
    const [age, setAge] = useState('');
    const handleChange = (event) => {
        setAge(event.target.value);
        console.log(age)
    };
    const useStyles = makeStyles({
        select: {
            "&:after": {
                borderColor: "#ffff",
            },
            "& .MuiSvgIcon-root": {
                color: "#ffff",
            },
            '&:before': {
                border:'none',
                borderBottomColor: "#ffff",
            },
            '&:hover': {
                border:'none',
                borderColor: "#ffff",
            },
        },
    });
    const classes = useStyles();
    
    return (

        <Box sx={{ display:'flex', bgcolor:'text.disabled'}}>
            <AppBar position="static" style={{backgroundColor:'#5E2F78'}}>
                <Toolbar sx={{display:'flex'}}>
                    <Box sx={{flexGrow:1}}>
                        <IconButton
                            edge='start'
                            color='inherit'
                            aria-label='menu'
                            sx={{mr:2}}
                        >
                            <MenuIcon/>
                        </IconButton>
                        {/* <Typography variant="h6" component="div" sx={{ flexGrow: 3 }}>
                            News
                        </Typography> */}
                    </Box>
                    <Box sx={{display:'flex',flexGrow:4, flexDirection:'row', alignContent:'center', alignItems:'center'}}>
                        <FormControl style={{width:'200px', marginRight:'10px'}}>
                            <InputLabel id="demo-simple-select-label"color="primary" style={{color:'#ffff'}}>전체</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                label="Age"
                                onChange={handleChange}
                                className={classes.select}
                                style={{color: "#fff", borderColor:"red"}}
                            >
                                <MenuItem value=""><em>None</em></MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                        <Search>
                            <SearchIconWrapper >
                                <IconButton
                                edge='start'
                                color='inherit'
                                aria-label='menu'
                                sx={{mr:2}}
                                >
                                    <SearchIcon/>
                                </IconButton>
                            </SearchIconWrapper>
                            <StyledInputBase
                                    placeholder="Search…"
                                    inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                    </Box>
                    <Box>
                        <ButtonGroup>
                            <Button style={{border:'none'}}> <Link to="/" style={{display:"flex", color:"#ffff"}}> <HomeIcon/></Link></Button>
                            <Button style={{border:'none'}}><Link to="/Chart" style={{display:"flex", color:"#ffff"}}><BarChartIcon/></Link></Button>
                            <Button style={{border:'none'}} onClick={()=> {dispatch({type:"open"})} }><AccountCircleIcon style={{display:"flex", color:"#ffff"}}/></Button>
                            {/* <Button style={{border:'none'}}><Link to="/Login" style={{display:"flex", color:"#ffff"}}><AccountCircleIcon/></Link></Button> */}
                        </ButtonGroup>
                    </Box>
                            <Login></Login>
                    
                </Toolbar>
            </AppBar>
        </Box>

    );
}

import React, { useState, useEffect }  from 'react';
import { Link } from "react-router-dom";
import './style.css'
import Login from '../pages/Login';
import {
    Box,
    Toolbar, 
    MenuItem, 
    AppBar,
    IconButton,
    Button,
    ButtonGroup,
    Select,
    InputLabel,
    FormControl,
    makeStyles,
    styled,
    alpha,
    InputBase,
    CssBaseline,
    Drawer,
    useTheme,
    Divider,
    List,
    ListItem,
    ListItemText,
    CircularProgress
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import BarChartIcon from '@material-ui/icons/BarChart';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import CloudQueueIcon from '@material-ui/icons/CloudQueue';
import MailIcon from '@material-ui/icons/Mail';
import SettingsIcon from '@material-ui/icons/Settings';
import ReportIcon from '@material-ui/icons/Report';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';

import MenuRouter from '../routers/TopMenuRouter'; 
import { useDispatch, useSelector } from 'react-redux';
import {loginOpen} from '../redux/loginwindow/actions'
import {open, close} from '../redux/drawer/actions'

// style={{color:"#5E2F78", borderLeft:"1px solid red"}}
const drawerWidth = 200;

//left menu list item_1
const Lists_1 = (props)=>{
    let url
    let icon
    if(props.index==0){
        url="/"
        icon = <HomeIcon style={{color:"#5E2F78"}}/>
    }else if(props.index==1){
        url="/news"
        icon = <CloudQueueIcon style={{color:"#5E2F78"}}/>
    }else if(props.index==2){
        url="/chart"
        icon = <BarChartIcon style={{color:"#5E2F78"}}/>
    }else if(props.index==3){
        url="/chart"
        icon = <DoneOutlineIcon style={{color:"#5E2F78"}}/>
    }
    return(
        <Link to={url}>
            <ListItem button >
                {icon}
                <ListItemText primary={props.text} style={{marginLeft:20}}/>
            </ListItem>
        </Link>
    )
}

//left menu list item_2
const Lists_2 = (props)=>{
    let url
    let icon
    if(props.index==0){
        url="/"
        icon = <MailIcon style={{color:"#5E2F78"}}/>
    }else if(props.index==1){
        url="/"
        icon = <MonetizationOnIcon style={{color:"#5E2F78"}}/>
    }else if(props.index==2){
        url="/"
        icon = <ReportIcon style={{color:"#5E2F78"}}/>
    }else if(props.index==3){
        url="/"
        icon = <SettingsIcon style={{color:"#5E2F78"}}/>
    }
    return(
        <Link to={url}>
            <ListItem button >
                {icon}
                <ListItemText primary={props.text} style={{marginLeft:20}}/>
            </ListItem>
        </Link>
    )
}

//Drawer list
const DrawerList = ()=>{
    return(
        <Box>
            <Divider  />
            <List>
            {['홈', '클라우드', '사용량', '결제정보'].map((text, index) => (
                <Lists_1
                    key={text}
                    index={index}
                    text ={text}
                />    
            ))}
            </List>
            <Divider />
            <List>
            {['문의', '결제', '경고', '설정'].map((text, index) => (
                <Lists_2
                key={text}
                index={index}
                text ={text}
            />  
            ))}
            </List>
        </Box>
    )
}

//Drawer open option
const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

//Drawer close option
const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: 60,
    // [theme.breakpoints.up('sm')]: {
    // width: 60,
    // },
});

//Drawer heder option
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

//Drawer option
const DrawerCustom = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: 100,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

//AppBar option
const AppBarCustom = styled(AppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
    })(({ theme, open }) => ({
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

//Search box style option
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

//Search icon style option
const SearchIconWrapper = styled('div')(({ theme }) => ({
    // padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    right:'0px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

//Search input style option
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width:"80%"
}));


function TopMenuComponent() {
    const dispatch = useDispatch() //login window action
    const {drawer} = useSelector((state)=>state)

    const theme = useTheme();
    const [age, setAge] = useState('');
    const handleChange = (event) => {
        setAge(event.target.value);
        console.log(age)
    };

    const useStyles = makeStyles({
        select: {
            "&:after": {
                borderBottomColor: "#ffff",
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
                borderBottomColor: "#ffff",
            },
        },
    });
    const classes = useStyles();
    
    return (
        <Box sx={{ display:'flex', bgcolor:'text.disabled'}}>
            <CssBaseline />
            <AppBarCustom position="fixed" style={{backgroundColor:'#5E2F78'}} open={drawer.toggle}>
                <Toolbar >
                    <Box sx={{flexGrow:1}}>
                    {drawer.toggle ?
                        <div/>
                        :
                        <IconButton
                            edge='start'
                            color='inherit'
                            aria-label='menu'
                            sx={{mr:2}}
                            onClick={()=>dispatch(open())}
                        >
                            <MenuIcon/>
                        </IconButton>
                    }
                    </Box>
                    <Box sx={{display:'flex',flexGrow:4, flexDirection:'row', alignContent:'center', alignItems:'center'}}>
                        <FormControl style={{width:'200px', marginRight:'10px'}}>
                            <InputLabel id="demo-simple-select-label"  style={{color:'#ffff', border:"none"}}>전체</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                label="Age"
                                onChange={handleChange}
                                className={classes.select}
                                style={{color: "#fff", border:"none"}}
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
                            <Button style={{border:'none'}}><Link to="/news" style={{display:"flex", color:"#ffff"}}><NotificationsActiveIcon/></Link></Button>
                            <Button style={{border:'none'}} onClick={()=>dispatch(loginOpen())}><AccountCircleIcon style={{display:"flex", color:"#ffff"}}/></Button>
                        </ButtonGroup>
                    </Box>
                    <Login></Login>
                </Toolbar>
            </AppBarCustom>
            <DrawerCustom variant="permanent" open={drawer.toggle}>
                <DrawerHeader>
                    <IconButton onClick={()=>dispatch(close())}>
                            <ChevronLeftIcon />
                    </IconButton>
                </DrawerHeader>
                <DrawerList/>
            </DrawerCustom>
            <Box component="main" sx={{ flexGrow: 1 , bgcolor:"#DDDDDD"}} style={{overflowY:"hidden", height:"100vh"}}>
                <DrawerHeader />

                    <MenuRouter/>

            </Box>
        </Box>
    );
}

export default TopMenuComponent
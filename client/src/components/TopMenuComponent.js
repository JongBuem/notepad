import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './style.css'
import Login from '../pages/Login'
import {
    Box,
    Toolbar,
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
    CircularProgress,
    Backdrop,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import HomeIcon from '@material-ui/icons/Home'
import BarChartIcon from '@material-ui/icons/BarChart'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import CloudQueueIcon from '@material-ui/icons/CloudQueue'
import MailIcon from '@material-ui/icons/Mail'
import SettingsIcon from '@material-ui/icons/Settings'
import ReportIcon from '@material-ui/icons/Report'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'
import DoneOutlineIcon from '@material-ui/icons/DoneOutline'
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive'
import StorageIcon from '@material-ui/icons/Storage'
import MenuRouter from '../routers/TopMenuRouter'
import { useDispatch, useSelector } from 'react-redux'
import { loginOpen } from '../redux/loginwindow/actions'
import { open, close } from '../redux/drawer/actions'
import { addstate } from '../redux/news/actions'
import { keyword } from '../redux/news/actions'
import FavoriteIcon from '@material-ui/icons/Favorite'
import makeStyle from '@material-ui/core/styles/makeStyles'
// style={{color:"#5E2F78", borderLeft:"1px solid red"}}
const drawerWidth = 200

const useStyles = makeStyle((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}))

//left menu list item_1
const Lists_1 = (props) => {
    const { news } = useSelector((state) => state)
    const classes = useStyles()
    const [open, setOpen] = React.useState(false)
    Promise.all([news.naver]).then((values) => {
        if (values[0] != undefined) {
            setOpen(false)
        }
    })
    const handleToggle = () => {
        setOpen(!open)
    }
    let url
    let icon
    const dispatch = useDispatch() //login window action
    if (props.index == 0) {
        url = '/'
        icon = <HomeIcon style={{ color: '#5E2F78' }} />
    } else if (props.index == 1) {
        url = '/news'
        icon = <CloudQueueIcon style={{ color: '#5E2F78' }} />
    } else if (props.index == 2) {
        url = '/news'
        icon = <StorageIcon style={{ color: '#5E2F78' }} />
    } else if (props.index == 3) {
        url = '/news'
        icon = <MonetizationOnIcon style={{ color: '#5E2F78' }} />
    }
    return (
        <Link
            to={url}
            onClick={() => {
                dispatch(keyword(props.index))
                handleToggle()
            }}
        >
            <ListItem button>
                {icon}
                <ListItemText primary={props.text} style={{ marginLeft: 20 }} />
            </ListItem>
            <Backdrop className={classes.backdrop} open={open}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </Link>
    )
}

//left menu list item_2
const Lists_2 = (props) => {
    const dispatch = useDispatch() //login window action
    const { loginWindow } = useSelector((state) => state)
    let url
    let icon
    if (props.index == 0) {
        url = '/'
        icon = <MailIcon style={{ color: '#5E2F78' }} />
    } else if (props.index == 1) {
        url = '/news/list'
        icon = <FavoriteIcon style={{ color: '#5E2F78' }} />
    } else if (props.index == 2) {
        url = '/'
        icon = <ReportIcon style={{ color: '#5E2F78' }} />
    } else if (props.index == 3) {
        url = '/'
        icon = <SettingsIcon style={{ color: '#5E2F78' }} />
    }
    return (
        <Box>
            {loginWindow.loginState == 'LOGIN' ? (
                <Link
                    to={url}
                    onClick={() => {
                        dispatch(addstate())
                    }}
                >
                    <ListItem button>
                        {icon}
                        <ListItemText primary={props.text} style={{ marginLeft: 20 }} />
                    </ListItem>
                </Link>
            ) : (
                <Box
                    onClick={() => {
                        dispatch(loginOpen())
                        dispatch(addstate())
                    }}
                >
                    <ListItem button>
                        {icon}
                        <ListItemText primary={props.text} style={{ marginLeft: 20 }} />
                    </ListItem>
                </Box>
            )}
        </Box>
    )
}

//Drawer list
const DrawerList = () => {
    return (
        <Box>
            <Divider />
            <List>
                {['홈', '클라우드', '빅 데이터', '블록체인'].map((text, index) => (
                    <Lists_1 key={text} index={index} text={text} />
                ))}
            </List>
            <Divider />
            <List>
                {['문의', '좋아요', '경고', '설정'].map((text, index) => (
                    <Lists_2 key={text} index={index} text={text} />
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
})

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
})

//Drawer heder option
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}))

//Drawer option
const DrawerCustom = styled(Drawer, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
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
}))

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
}))

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
    alignItems: 'center',
    padding: '5px',
    paddingLeft: '15px',
}))

//Search icon style option
const SearchIconWrapper = styled('div')(({ theme }) => ({
    // padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    right: '0px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}))

//Search input style option
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '80%',
}))

function TopMenuComponent() {
    const dispatch = useDispatch() //login window action
    const { drawer } = useSelector((state) => state)
    const { loginWindow } = useSelector((state) => state)
    const theme = useTheme()
    const [age, setAge] = useState('')
    const handleChange = (event) => {
        setAge(event.target.value)
        console.log(age)
    }

    const useStyles = makeStyles({
        select: {
            '&:after': {
                borderBottomColor: '#ffff',
            },
            '& .MuiSvgIcon-root': {
                color: '#ffff',
            },
            '&:before': {
                border: 'none',
                borderBottomColor: '#ffff',
            },
            '&:hover': {
                border: 'none',
                borderBottomColor: '#ffff',
            },
        },
        home: {
            '&:hover': {
                color: '#BFBFBF',
                cursor: 'pointer',
                fontFamily: 'Fjalla One',
            },
        },
    })
    const classes = useStyles()

    const loginWindows = () => {
        if (loginWindow.loginState == 'LOGOUT') {
            dispatch(loginOpen())
        } else if (loginWindow.loginState == 'LOGIN') {
            window.localStorage.removeItem('email')
            window.sessionStorage.removeItem('email')
            window.location.reload()
        }
    }

    return (
        <Box sx={{ display: 'flex', bgcolor: 'text.disabled' }}>
            <CssBaseline />
            <AppBarCustom position="fixed" style={{ backgroundColor: '#5E2F78' }} open={drawer.toggle}>
                <Toolbar>
                    <Box style={{ display: 'flex', alignContent: 'center', justifyContent: 'center', justifyItems: 'flex-end', position: 'relative', left: -21 }}>
                        {drawer.toggle ? (
                            <div />
                        ) : (
                            <IconButton color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={() => dispatch(open())}>
                                <MenuIcon />
                            </IconButton>
                        )}
                    </Box>
                    <Box style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                        <Link
                            to="/"
                            style={{
                                color: '#FFFF',
                                fontSize: '25px',
                                fontWeight: 600,
                                fontFamily: 'Fjalla One',
                            }}
                        >
                            <Box
                                className={classes.home}
                                style={{
                                    fontSize: '25px',
                                    fontWeight: 600,
                                    fontFamily: 'Fjalla One',
                                }}
                            >
                                News Moa
                            </Box>
                        </Link>
                        {/* <FormControl style={{width:'200px', marginRight:'10px'}}>
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
                        </FormControl> */}
                    </Box>
                    <Search sx={{ mr: 3 }}>
                        <SearchIconWrapper>
                            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 4 }}>
                                <SearchIcon />
                            </IconButton>
                        </SearchIconWrapper>
                        <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
                    </Search>
                    <Box sx={{ ml: 1 }}>
                        <ButtonGroup>
                            <Button style={{ border: 'none' }}>
                                <Link to="/news" style={{ display: 'flex', color: '#ffff' }}>
                                    <NotificationsActiveIcon />
                                </Link>
                            </Button>
                            <Button variant="outlined" style={{ color: '#Fff', border: '#ffff' }} onClick={() => loginWindows()}>
                                {/* <AccountCircleIcon style={{ display: 'flex', color: '#ffff' }} /> */}
                                {loginWindow.loginState == 'LOGOUT' ? 'Login' : 'Logout'}
                            </Button>
                        </ButtonGroup>
                    </Box>
                    <Login></Login>
                </Toolbar>
            </AppBarCustom>
            <DrawerCustom variant="permanent" open={drawer.toggle}>
                <DrawerHeader>
                    <IconButton onClick={() => dispatch(close())}>
                        <ChevronLeftIcon />
                    </IconButton>
                </DrawerHeader>
                <DrawerList />
            </DrawerCustom>
            <Box component="main" sx={{ flexGrow: 1, bgcolor: '#DDDDDD' }} style={{ overflowY: 'hidden', height: '100vh' }}>
                <DrawerHeader />

                <MenuRouter />
            </Box>
        </Box>
    )
}

export default TopMenuComponent

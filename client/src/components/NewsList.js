import React,{useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {loginOpen} from '../redux/loginwindow/actions'
import clsx from 'clsx';
import './style.css';
import {
    Box, 
    CircularProgress, 
    Card, 
    CardHeader, 
    CardMedia, 
    CardContent, 
    CardActions, 
    Collapse, 
    Avatar, 
    IconButton, 
    Typography,
    useMediaQuery, 
    Link,
    Grid
} from '@material-ui/core'
import { red, yellow } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { makeStyles } from '@material-ui/core/styles';
import bingImg from '../img/a.png'
import noimg from '../img/no.png'
import axios from 'axios';

const useStyles = makeStyles((theme, itme) => ({
    
    root: {
        height:"97%",
        margin:10,
        marginBottom :10
    },
    media: {
        paddingTop: '50.25%', // 16:9
        borderTop: "solid 0.1px #E0E0E0",
        borderBottom: "solid 0.1px #E0E0E0"
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: yellow[500],
    },
    link:{
        color:"black",
        textDecorationLine: "none", 
        alignItems:"center",
        alignContent:"center" 
    }
}));

const record= async(title, info, url, imgurl, date, provider, email, option)=>{
        await axios.post("http://127.0.0.1:8080/news/record",{
            headers: {
                "Access-Control-Allow-Credentials" : true,
                "Access-Control-Allow-Origin" :"http://127.0.0.1:8080",
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            title : title, 
            info : info, 
            url : url, 
            imgurl : imgurl, 
            date : date, 
            provider : provider, 
            email : email,
            option : option
        }).then((res)=>{
            if(res.data.message==true){
                console.log("기록 성공")
            }else if(res.data.message==false){
                console.log("기록 실패")
            }
        }).catch((error)=> {
            console.log(error)
        })
}


const Lists = (props)=>{
    let classes= useStyles();
    const dispatch = useDispatch() //login window action
    const [expanded, setExpanded] = useState(false);
    const [heart, setHeart] = useState(props.heart);
    const [provider, setProvider] = useState(props.provider);
    const [logimg, setLogimg] = useState("");
    const {loginWindow} = useSelector((state)=>state)

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    
    useEffect(()=>{
        if(provider=="naver"){
            setLogimg("http://wiki.hash.kr/images/c/cf/%EB%84%A4%EC%9D%B4%EB%B2%84%E3%88%9C_%EB%A1%9C%EA%B3%A0.png")
        }
        else if(provider=="kakao"){
            setLogimg("http://wiki.hash.kr/images/7/7f/%E3%88%9C%EC%B9%B4%EC%B9%B4%EC%98%A4_%EB%A1%9C%EA%B3%A0.png")
        }
        else if(provider=="bing"){
            setLogimg(bingImg)
        }
        else if(provider=="newscatcher"){
            setLogimg("http://wiki.hash.kr/images/e/e4/%EA%B5%AC%EA%B8%80_%EB%A1%9C%EA%B3%A0.png")
        }
        else if(provider=="guardian"){
            setLogimg("http://wiki.hash.kr/images/9/9e/%EB%8D%94_%EA%B0%80%EB%94%94%EC%96%B8_%EB%A1%9C%EA%B3%A0.png")
        }
    },[provider])

    const heartClick = ()=>{
        if(loginWindow.loginState == "LOGIN"){
            if(heart==false){
                setHeart(true)
                if(window.localStorage.getItem('email') !=null){
                    const email = window.localStorage.getItem('email')
                    record(props.title, props.info, props.url, props.imgurl, props.date, props.provider, email, "add")
                }else if(window.sessionStorage.getItem('email') !=null ){
                    const email = window.sessionStorage.getItem('email')
                    record(props.title, props.info, props.url, props.imgurl, props.date, props.provider, email, "add")
                }
            }else if(heart==true){
                if(window.localStorage.getItem('email') !=null){
                    const email = window.localStorage.getItem('email')
                    record(props.title, props.info, props.url, props.imgurl, props.date, props.provider, email, "delete")
                }else if(window.sessionStorage.getItem('email') !=null ){
                    const email = window.sessionStorage.getItem('email')
                    record(props.title, props.info, props.url, props.imgurl, props.date, props.provider, email, "delete")
                    setHeart(false)
                }
            }
        }else{
            dispatch(loginOpen())
        }
    }

    return(
        <Grid  item  sm={3} >
            <Card className={classes.root} style={{display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
            <Link href={props.url} target="_blank" className={classes.link}  style={{textDecorationLine:"none"}}>
                <CardHeader 
                    title={props.title}
                    subheader="September 14, 2016"
                    // subheader={props.date}
                    avatar={ <Avatar aria-label="recipe" src={logimg}> {provider} </Avatar> }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                />
                </Link>
                <Link href={props.url} target="_blank">
                    {props.imgurl == undefined?
                        <CardMedia
                        className={classes.media}
                        image={noimg}
                        title="Paella dish"
                        />:
                        <CardMedia
                        className={classes.media}
                        image={props.imgurl}
                        title="Paella dish"
                        />
                    }
                </Link>

                {/* <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.info}
                    </Typography>
                </CardContent> */}
                
                <CardActions disableSpacing>
                    {heart==false?
                        <IconButton aria-label="add to favorites" onClick={()=>heartClick()}> 
                            <FavoriteIcon/>
                        </IconButton>:
                        <IconButton aria-label="add to favorites" onClick={()=>heartClick()}> 
                            <FavoriteIcon style={{ color: red[400] }}/>
                        </IconButton>
                    }
                    <IconButton aria-label="share"> <ShareIcon /> </IconButton>
                    <IconButton
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                    >

                    {expanded==false?<Typography variant="body2" color="textSecondary" component="p">
                        상세정보
                    </Typography>
                    :<div></div>
                    }
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                

                <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.info}
                    </Typography>
                </CardContent>
                </Collapse>

            </Card>
        </Grid>
    )
}


export default function NewsList({props}){
    const {news} = useSelector((state)=>state)
    const [state, setState] =useState(false)
    const [article, setArticle] =useState([])
    const {loginWindow} = useSelector((state)=>state)
    const [heart, setHeart] = useState(false);
    const [heartstate, setHeartstate] =useState(false)

    // if(typeof(news.recordfind)=="string"){
    //     let interval = setInterval(()=> {
    //         console.log(typeof(news.recordfind))
    //         // if (news.naver != undefined) {
    //         //     setArticle(news.naver)
    //         //     clearInterval(interval) 
    //         //     setState(true)
    //         // }
    //     }, 1000)
    // }


    if(props=="naver"){
        let interval = setInterval(()=> {
            if (news.naver != undefined) {
                setArticle(news.naver)
                clearInterval(interval) 
                setState(true)
            }
        }, 10)
    }else if(props=="kakao"){
        let interval = setInterval(()=> {
            if (news.kakao != undefined) {
                setArticle(news.kakao)
                clearInterval(interval) 
                setState(true)
            }
        }, 10)
    }else if(props=="bing"){
        let interval = setInterval(()=> {
            if (news.bing != undefined) {
                setArticle(news.bing)
                clearInterval(interval) 
                setState(true)
            }
        }, 10)
    }else if(props=="guardian"){
        let interval = setInterval(()=> {
            if (news.guardian != undefined) {
                setArticle(news.guardian)
                clearInterval(interval) 
                setState(true)
            }
        }, 10)
    }else if(props=="newscatcher"){
        let interval = setInterval(()=> {
            if (news.newscatcher != undefined) {
                setArticle(news.newscatcher)
                clearInterval(interval) 
                setState(true)
            }
        }, 10)
    }

    return(
        <Box className="listBox" flexGrow={1}>
            {state==false?
                <Box className='circular'><CircularProgress size={60} style={{color:"#5E2F78"}}  /></Box>
                :
            <Grid container spacing={4}>
                {
                article.map((item, index)=>(
                    <Lists
                        key={index}
                        title={item.title}
                        info={item.info}
                        url ={item.url}
                        date ={item.date}
                        imgurl ={item.imgurl}
                        provider={props}
                        heart = {heart}
                    />
                ))
                }
            </Grid>
            }
        </Box>
    )
}
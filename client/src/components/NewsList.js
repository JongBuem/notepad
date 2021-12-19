import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loginOpen } from '../redux/loginwindow/actions'
import clsx from 'clsx'
import './style.css'
import { Box, CircularProgress, Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, Avatar, IconButton, Typography, useMediaQuery, Link, Grid } from '@material-ui/core'
import { red, yellow } from '@material-ui/core/colors'
import MuiAccordion from '@material-ui/core/Accordion'
import MuiAccordionSummary from '@material-ui/core/AccordionSummary'
import MuiAccordionDetails from '@material-ui/core/AccordionDetails'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import bingImg from '../img/a.png'
import noimg from '../img/no.png'
import axios from 'axios'
import { addstate } from '../redux/news/actions'
const useStyles = makeStyles((theme, itme) => ({
    root: {
        height: '97%',
        margin: 10,
        marginBottom: 10,
    },
    media: {
        paddingTop: '50.25%', // 16:9
        borderTop: 'solid 0.1px #E0E0E0',
        borderBottom: 'solid 0.1px #E0E0E0',
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
    link: {
        color: 'black',
        textDecorationLine: 'none',
        alignItems: 'center',
        alignContent: 'center',
    },
}))

const record = async (title, info, url, imgurl, date, provider, email, option) => {
    await axios
        .post('http://127.0.0.1:8080/news/record', {
            headers: {
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': 'http://127.0.0.1:8080',
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            title: title,
            info: info,
            url: url,
            imgurl: imgurl,
            date: date,
            provider: provider,
            email: email,
            option: option,
        })
        .then((res) => {
            if (res.data.message == true) {
                console.log('기록 성공')
            } else if (res.data.message == false) {
                console.log('기록 실패')
            }
        })
        .catch((error) => {
            console.log(error)
        })
}

const Lists = (props) => {
    let classes = useStyles()
    const dispatch = useDispatch() //login window action
    const [expanded, setExpanded] = useState(false)
    const [heart, setHeart] = useState(false)
    const [provider, setProvider] = useState(props.provider)
    const [logimg, setLogimg] = useState('')
    const { loginWindow } = useSelector((state) => state)
    const { news } = useSelector((state) => state)

    useEffect(() => {
        for (let i = 0; i < props.newsrecord.length; i++) {
            const retitle = props.newsrecord[i].title
            const reinfo = props.newsrecord[i].info
            const reprops = props.newsrecord[i].provider
            if (retitle == props.title && reinfo == props.info && reprops == props.provider) {
                setHeart(true)
            }
        }
    }, [news.recordfind])

    const handleExpandClick = () => {
        setExpanded(!expanded)
    }

    useEffect(() => {
        if (provider == 'NAVER') {
            setLogimg('http://wiki.hash.kr/images/c/cf/%EB%84%A4%EC%9D%B4%EB%B2%84%E3%88%9C_%EB%A1%9C%EA%B3%A0.png')
        } else if (provider == 'kakao') {
            setLogimg('http://wiki.hash.kr/images/7/7f/%E3%88%9C%EC%B9%B4%EC%B9%B4%EC%98%A4_%EB%A1%9C%EA%B3%A0.png')
        } else if (provider == 'Bing') {
            setLogimg(bingImg)
        } else if (provider == 'Google') {
            setLogimg('http://wiki.hash.kr/images/e/e4/%EA%B5%AC%EA%B8%80_%EB%A1%9C%EA%B3%A0.png')
        } else if (provider == 'The Guardian') {
            setLogimg('http://wiki.hash.kr/images/9/9e/%EB%8D%94_%EA%B0%80%EB%94%94%EC%96%B8_%EB%A1%9C%EA%B3%A0.png')
        }
    }, [provider])

    const heartClick = () => {
        if (loginWindow.loginState == 'LOGIN') {
            if (heart == false) {
                setHeart(true)
                if (window.localStorage.getItem('email') != null) {
                    const email = window.localStorage.getItem('email')
                    record(props.title, props.info, props.url, props.imgurl, props.date, props.provider, email, 'add')
                } else if (window.sessionStorage.getItem('email') != null) {
                    const email = window.sessionStorage.getItem('email')
                    record(props.title, props.info, props.url, props.imgurl, props.date, props.provider, email, 'add')
                }
            } else if (heart == true) {
                setHeart(false)
                // dispatch(addstate())
                if (window.localStorage.getItem('email') != null) {
                    const email = window.localStorage.getItem('email')
                    record(props.title, props.info, props.url, props.imgurl, props.date, props.provider, email, 'delete')
                } else if (window.sessionStorage.getItem('email') != null) {
                    const email = window.sessionStorage.getItem('email')
                    record(props.title, props.info, props.url, props.imgurl, props.date, props.provider, email, 'delete')
                }
            }
        } else {
            dispatch(loginOpen())
        }
    }

    return (
        <Grid item sm={4}>
            <Card
                className={classes.root}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}
            >
                <Link href={props.url} target="_blank" className={classes.link} style={{ textDecorationLine: 'none' }}>
                    <CardHeader
                        title={props.title}
                        // subheader="September 14, 2016"
                        subheader={props.date}
                        avatar={
                            <Avatar aria-label="recipe" src={logimg}>
                                {' '}
                                {provider}{' '}
                            </Avatar>
                        }
                        action={
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                        }
                    />
                </Link>
                <Link href={props.url} target="_blank">
                    {props.imgurl == undefined ? (
                        <CardMedia className={classes.media} image={noimg} title="Paella dish" />
                    ) : (
                        <CardMedia className={classes.media} image={props.imgurl} title="Paella dish" />
                    )}
                </Link>

                {/* <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.info}
                    </Typography>
                </CardContent> */}

                <CardActions disableSpacing>
                    {heart == false ? (
                        <IconButton aria-label="add to favorites" onClick={() => heartClick()}>
                            <FavoriteIcon />
                        </IconButton>
                    ) : (
                        <IconButton aria-label="add to favorites" onClick={() => heartClick()}>
                            <FavoriteIcon style={{ color: red[400] }} />
                        </IconButton>
                    )}
                    <IconButton aria-label="share">
                        {' '}
                        <ShareIcon />{' '}
                    </IconButton>
                    <IconButton
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                    >
                        {expanded == false ? (
                            <Typography variant="body2" color="textSecondary" component="p">
                                상세정보
                            </Typography>
                        ) : (
                            <div></div>
                        )}
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

const Accordion = withStyles({
    root: {
        width: '100%',
        border: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(MuiAccordion)

const AccordionSummary = withStyles({
    root: {
        backgroundColor: 'rgba(0, 0, 0, .03)',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(MuiAccordionSummary)

const AccordionDetails = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiAccordionDetails)

export default function NewsList({ props, newsRecord }) {
    const { news } = useSelector((state) => state)
    const [state, setState] = useState(false)
    const [article, setArticle] = useState([])
    const [expanded, setExpanded] = React.useState('panel1')

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false)
    }
    // console.log(document.body.offsetWidth)

    // if (props == 'NAVER') {
    //     let interval = setInterval(() => {
    //         if (news.naver != undefined) {
    //             setArticle(news.naver)
    //             clearInterval(interval)
    //             setState(true)
    //         }
    //     }, 10)
    // } else if (props == 'kakao') {
    //     let interval = setInterval(() => {
    //         if (news.kakao != undefined) {
    //             setArticle(news.kakao)
    //             clearInterval(interval)
    //             setState(true)
    //         }
    //     }, 10)
    // } else if (props == 'Bing') {
    //     let interval = setInterval(() => {
    //         if (news.bing != undefined) {
    //             setArticle(news.bing)
    //             clearInterval(interval)
    //             setState(false)
    //         }
    //     }, 10)
    // } else if (props == 'The Guardian') {
    //     let interval = setInterval(() => {
    //         if (news.guardian != undefined) {
    //             setArticle(news.guardian)
    //             clearInterval(interval)
    //             setState(true)
    //         }
    //     }, 10)
    // } else if (props == 'Google') {
    //     let interval = setInterval(() => {
    //         if (news.newscatcher != undefined) {
    //             setArticle(news.newscatcher)
    //             clearInterval(interval)
    //             setState(true)
    //         }
    //     }, 10)
    // }

    if (props == 'NAVER') {
        Promise.all([news.naver]).then((values) => {
            if (values[0] != undefined) {
                setArticle(values[0])
                setState(true)
            }
        })
    } else if (props == 'kakao') {
        Promise.all([news.kakao]).then((values) => {
            if (values[0] != undefined) {
                setArticle(values[0])
                setState(true)
            }
        })
    } else if (props == 'Bing') {
        Promise.all([news.bing]).then((values) => {
            if (values[0] != undefined) {
                if (values[0] != undefined) {
                    setArticle(values[0])
                    setState(true)
                }
            }
        })
    } else if (props == 'The Guardian') {
        Promise.all([news.guardian]).then((values) => {
            if (values[0] != undefined) {
                setArticle(values[0])
                setState(true)
            }
        })
    } else if (props == 'Google') {
        Promise.all([news.newscatcher]).then((values) => {
            if (values[0] != undefined) {
                setArticle(values[0])
                setState(true)
            }
        })
    }
    {
        /* <Accordion square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography>{props}</Typography>
        </AccordionSummary>
        <AccordionDetails> */
    }

    return (
        <Box className="listBox" flexGrow={1}>
            {state == false && record != undefined ? (
                <Box className="circular">
                    <CircularProgress size={60} style={{ color: '#5E2F78' }} />
                </Box>
            ) : (
                <Grid container spacing={1}>
                    {article.map((item, index) => (
                        <Lists key={index} title={item.title} info={item.info} url={item.url} date={item.date} imgurl={item.imgurl} provider={props} newsrecord={newsRecord} />
                    ))}
                </Grid>
            )}
        </Box>
    )
}

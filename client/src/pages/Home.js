import {React } from "react";
// import { useSelector, useDispatch } from "react-redux";
import { Box, Stepper, Step, StepLabel,Grid, Typography, List, ListItem ,ListItemText   } from '@material-ui/core'
import './style.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
        {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
        },
    ],
};

const steps = [
    '요청',
    '게시',
    '진행중',
    '진행완료',
    '종결'
];

const Performancearry = [
    {text:"0~20%",value:0},
    {text:"21~40",value:0},
    {text:"41~60",value:0},
    {text:"61~80",value:0},
    {text:"80~100",value:0}
]

const LoginHistoryarry = [
    {id:0,name:"Demo",timestamp:"2019-11-26 00:00"},
    {id:1,name:"Demo",timestamp:"2019-11-26 00:00"},
    {id:2,name:"Demo",timestamp:"2019-11-26 00:00"},
    {id:3,name:"Demo",timestamp:"2019-11-26 00:00"},
    {id:4,name:"Demo",timestamp:"2019-11-26 00:00"},
    {id:5,name:"Demo",timestamp:"2019-11-26 00:00"},
]

const noticearry =  [
    {id:0, title:"사용자 알림", value:2, color:"#EBB14A"},
    {id:1, title:"정상", value:5, color:"#5E2F78"},
    {id:2, title:"알람", value:1, color:"#E1576B"},
]

function Notice({item}){
    return(
        <Box style={{display:"flex", justifyItems:"center", flexDirection:"column", justifyContent:"center", textAlign:"center", width:"70px"}}>
        <Box marginBottom={1} style={{fontSize:"20px", color: item.color, fontWeight:"600"}}>{item.value}</Box>
        <Box style={{height:"14px", backgroundColor: item.color, marginBottom:"1px"}}></Box>
        <Box style={{height:"14px", backgroundColor: item.color, marginBottom:"1px"}}></Box>
        <Box style={{height:"14px", backgroundColor: item.color, marginBottom:"1px"}}></Box>
        <Box style={{height:"14px", backgroundColor: item.color, marginBottom:"1px"}}></Box>
        <Box style={{height:"14px", backgroundColor: item.color, marginBottom:"1px"}}></Box>
        <Box style={{height:"14px", backgroundColor: item.color, marginBottom:"20px"}}></Box>
        <Box style={{display:"flex", alignItems:"center", alignContent:"center", justifyContent:"center"}}>
            <Box style={{width:"10px", height:"10px", backgroundColor:item.color, marginBottom:"1px", marginRight:"5px"}}></Box>
            <Box style={{fontSize:"10px"}}>{item.title}</Box>
        </Box>
    </Box>
    )
}

function PerformanceLists(item){
    return(
        <ListItem style={{padding:"0px"}}>
            <ListItemText style={{ color:"gray", alignItems:"center"}}>
            <Grid container spacing={10}>
                <Grid item xs={2} md={7}>
                    <span style={{fontSize:"10px", color:"gray"}}> {item.text.text}</span>
                </Grid>
                <Grid item xs={2} md={4}>
                    <span style={{fontSize:"15px", fontWeight:"bold"}}> {item.text.value}</span>
                </Grid>
            </Grid>
            </ListItemText>
        </ListItem>
    )
}


function LoginHistoryLists(item){
    return(
        (item.no%2===1?
            (
            <ListItem style={{padding:"10px", backgroundColor:"#F2F2F2"}}>
                <ListItemText style={{ color:"gray", alignItems:"center"}}>
                <Grid container spacing={2}>
                    <Grid item xs={1} md={3}>
                        <span style={{fontSize:"10px", color:"gray", paddingLeft:"15px"}}> {item.no}</span>
                    </Grid>
                    <Grid item xs={1} md={6}>
                        <span style={{fontSize:"10px", color:"gray"}}> {item.timestamp}</span>
                    </Grid>
                    <Grid item xs={1}>
                        <span style={{fontSize:"10px", fontWeight:"bold"}}> {item.user}</span>
                    </Grid>
                </Grid>
                </ListItemText>
            </ListItem>
            ):
            (
            <ListItem style={{padding:"10px", backgroundColor:"#ffff"}}>
                <ListItemText style={{ color:"gray", alignItems:"center"}}>
                <Grid container spacing={2}>
                    <Grid item xs={1} md={3}>
                        <span style={{fontSize:"10px", color:"gray", paddingLeft:"15px"}}> {item.no}</span>
                    </Grid>
                    <Grid item xs={1} md={6}>
                        <span style={{fontSize:"10px", color:"gray"}}> {item.timestamp}</span>
                    </Grid>
                    <Grid item xs={1}>
                        <span style={{fontSize:"10px", fontWeight:"bold"}}> {item.user}</span>
                    </Grid>
                </Grid>
                </ListItemText>
            </ListItem>
            )
        )
    )
}

export default function Home() {
    return (
        <Box sx={{p:2, bgcolor:"#DDDDDD"}} className="Home">
            <Box sx={{flexGrow:1,mb:1, display:'flex', flexDirection:"row", height:"20%"}}>
                <Box sx={{display:"flex",flexGrow:1, mr:1, flexDirection:'row'}}>
                    <Box sx={{py:2 ,px:2,width:"100%", color:"#ffff"}} bgcolor="#5E2F78">demo</Box>
                    <Box sx={{py:2 ,px:2,ml:1, width:"100%", color:"#ffff"}} bgcolor="#EBB14A">demo</Box>
                    <Box sx={{py:2 ,px:2,ml:1, width:"100%", color:"#ffff"}} bgcolor="#E1576B">demo</Box>
                </Box>
                <Box sx={{flexGrow:1}}>
                    <Box sx={{width:"100%", color:"#71675F", height:"100%",display:"flex",alignItems:"center"}} bgcolor="#FFFF">
                        <Stepper activeStep={0} alternativeLabel style={{width:"100%"}}>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Box>
                </Box>
            </Box>
            
            <Box sx={{flexGrow:1, color:"#71675F", height:"66%",display:'flex'}}>
                <Box sx={{display:"flex",flexDirection:"column",width:"30%", mr:1}}>
                    <Box sx={{p:2,mb:1, bgcolor:"#ffff"}}>
                        <Grid container spacing={2}>
                            <Grid item md={12}>
                            <Typography style={{ fontWeight:"600"}}  variant="h6" component="div">
                                Performance
                            </Typography>
                                <List>
                                    {
                                    Performancearry.map(item=>(
                                    <PerformanceLists
                                        key={item.text}
                                        text={item}
                                    />
                                    ))
                                    }
                                </List>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box sx={{flexGrow:1, bgcolor:"#ffff"}} style={{overflowY:"scroll", overflowX:"hidden"}}>
                        <Grid container spacing={0}>
                            <Grid item md={12}>
                                <Typography style={{margin:"15px 15px 1px 15px", fontWeight:"700"}} variant="h6" component="div">
                                    Login History
                                </Typography>
                                <Grid container spacing={0} style={{margin:"15px 0px 0px 15px"}}>
                                    <Grid item xs={2} md={4}>
                                        <span style={{fontSize:"11px", fontWeight:"500"}}>No.</span>
                                    </Grid>
                                    <Grid item xs={6} md={5}>
                                        <span style={{fontSize:"11px", fontWeight:"500"}}>접속시간</span>
                                    </Grid>
                                    <Grid item xs={3} >
                                        <span style={{fontSize:"11px", fontWeight:"500"}}>이름</span>
                                    </Grid>
                                </Grid>
                                <List>
                                    {
                                    LoginHistoryarry.map(item=>(
                                    <LoginHistoryLists
                                        key={item.id}
                                        no={item.id+1}
                                        user={item.name}
                                        timestamp={item.timestamp}
                                    />
                                    ))
                                    }
                                </List>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Box sx={{width:"100%", display:"flex", flexDirection:"column"}}>
                    <Box sx={{bgcolor:"#ffff", flexGrow:1, mb:1, p:2}}>
                        <Typography sx={{flexGrow:1}} style={{fontWeight:"700"}} variant="h6" component="div">
                            Advisor Recommendations
                        </Typography>
                        <Box style={{ height:"100%", display:"flex", alignItems:"center"}}>
                            <Grid item md={12}>
                                <Grid container spacing={0}>
                                    <Grid item md={6}>
                                        <Grid container spacing={0}>
                                            <Grid item md={3}>
                                                <table border="1" bordercolor="blue" width="70px" height="70px">
                                                    <tbody>
                                                        <tr> 
                                                            <td/> 
                                                            <td/> 
                                                            <td/>
                                                        </tr>
                                                        <tr>
                                                            <td/> 
                                                            <td/> 
                                                            <td/>
                                                        </tr>
                                                        <tr>
                                                            <td/> 
                                                            <td/> 
                                                            <td/>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </Grid>
                                            <Grid item md={4}>
                                                <Typography style={{fontSize:"13px", fontWeight:"600", textShadow:"1px 1px #F2F2F2", marginBottom:"10px"}} variant="h6" component="div">
                                                    모든 권장사항
                                                </Typography>
                                                <Typography variant="h3" component="div">
                                                    0
                                                </Typography>
                                            </Grid>
                                            <Grid item md={3}>
                                                <Typography style={{fontSize:"13px", fontWeight:"600", textShadow:"1px 1px #F2F2F2", marginBottom:"15px"}} variant="h6" component="div">
                                                    영향도 분석
                                                </Typography>
                                                <Typography component="div">
                                                    <li><span>높은 역향</span> <span>0</span></li>
                                                    <li><span>중간 역향</span> <span>0</span></li>
                                                    <li><span>낮은 역향</span> <span>0</span></li>
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item md={6}>
                                        <Grid container spacing={0}>
                                            <Grid item md={4}>
                                                <Typography style={{fontSize:"13px", fontWeight:"600", textShadow:"1px 1px #F2F2F2", marginBottom:"10px"}} variant="h6" component="div">
                                                    영향받는 리소스
                                                </Typography>
                                                <Typography variant="h3" component="div">
                                                    0
                                                </Typography>
                                            </Grid>
                                            <Grid item md={6}>
                                                <Typography style={{fontSize:"13px", fontWeight:"600", textShadow:"1px 1px #F2F2F2", marginBottom:"10px"}} variant="h6" component="div">
                                                    절약 가능한 금액/년간
                                                </Typography>
                                                <Typography variant="h3" component="div">
                                                    0
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <Box sx={{flexGrow:2, display:"flex"}}>
                        <Box sx={{flexGrow:1, mr:1, bgcolor:"#ffff",p:2}}>
                            <Typography sx={{flexGrow:1}} style={{fontWeight:"700"}} variant="h6" component="div">
                                알림정보
                            </Typography>
                            <Box style={{display:"flex", justifyContent:"space-around"}}>
                                {
                                    noticearry.map(item=>(
                                        <Notice
                                            key={item.id}
                                            item={item}
                                        />
                                    ))
                                }
                            </Box>
                        </Box>
                        <Box sx={{flexGrow:1, bgcolor:"#ffff", p:2}} style={{display:"flex",flexDirection:"column" }}>
                            <Typography sx={{flexGrow:1}} style={{fontWeight:"700"}} variant="h6" component="div">
                                디스크 정보
                            </Typography>
                            <Box style={{display:"flex", justifyContent:"center"}}>
                                <Box style={{width:"200px", height:"200PX"}}>
                                    <Pie data={data} />
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

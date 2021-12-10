const express = require("express");    
const app = express();
const bodyparser = require('body-parser');
const cors = require('cors');

const corsOption = {
    origin: true, 
    credentials: true
} 

app.use(cors(corsOption))
app.use(bodyparser.json());
app.use(express.urlencoded({ extended : true  }));   
app.use(express.static(__dirname + "./routes"));     //라우터 하기위한 절대경로

const login = require("./routes/login");
const singup = require("./routes/singup");
const chart = require("./routes/chart");
const naver = require("./routes/naver")
const daum = require("./routes/daum")
const naverapi = require("./routes/naverapi")
const daumapi = require("./routes/daumapi")

app.use('/login',login);        //로그인
app.use('/singup',singup)       //회원가입
app.use('/chart',chart);        //upbit api로 분석 및 chart
app.use('/naver/news',naver)    //naver 기사 클롤링
app.use('/daum/news',daum)      //daum 기사 클롤링
app.use('/naverapi',naverapi)   //naver serch news api
app.use('/daumapi',daumapi)     //daum serch api

app.listen(8080,()=>{
    console.log("server open")
    
})
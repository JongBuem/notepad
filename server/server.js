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
const kakaoapi = require("./routes/kakaoapi")
const bingapi = require("./routes/bingapi")
const guardianapi = require("./routes/guardianapi")
const newscatcherapi = require("./routes/newscatcherapi")

app.use('/login',login);                        //login 
app.use('/singup',singup)                       //sing up
app.use('/chart',chart);                        //upbit api로 분석 및 chart
app.use('/naver/news/crawl',naver)              //naver news web crawling test
app.use('/daum/news/crawl',daum)                //daum news web crawling test
app.use('/naver/news',naverapi)                 //naver news API 10개   -> 한글로 안하면 img가 안옴
app.use('/kakao/news',kakaoapi)                 //kakao news API 10 ~ 15개
app.use('/bing/news',bingapi)                   //bing news API 50개
app.use('/guardian/news',guardianapi)           //guardian news API 30개 -> 영어로 qury를 날려야함
app.use('/newscatcher/news',newscatcherapi)     //newschart news API 50개

app.listen(8080,()=>{
    console.log("server open")
})
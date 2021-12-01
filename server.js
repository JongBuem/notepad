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
app.use(express.urlencoded({ extended : true  }));   // 
app.use(express.static(__dirname + "./routes"));     //라우터 하기위한 절대경로

const login = require("./routes/login");

app.use('/login',login);    //로그인시 로그인정보

app.listen(8080,()=>{
    console.log("server open")
    
})
//사용자 정보 홈화면에전달하는 서버
const express = require("express");
const router = express.Router(); 

router.post('/',(req, res)=>{
    const id = req.body.id;
    const password = req.body.password;
    console.log(id, password)
    res.json({message:true})



});

// 라우터를 모듈화
module.exports= router;
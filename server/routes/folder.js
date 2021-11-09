//사용자 정보 홈화면에전달하는 서버
const express = require("express");
const router = express.Router(); 

router.post('/',(req, res)=>{
    const item = req.body.item;
    console.log(item)
    
});

// 라우터를 모듈화
module.exports= router;
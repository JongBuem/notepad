//사용자 정보 홈화면에전달하는 서버
const express = require("express");
const router = express.Router(); 
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://jbryu:whdqja122036%40%40@cluster0.tfxbg.mongodb.net/user?retryWrites=true&w=majority";
const mongoClient  = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const dbName = "user";
const collectionName = 'news'

const connect_mongodb=(title,info,url,imgurl,date,provider,email, res, option)=>{
    (async()=>{
        await mongoClient.connect();                                                //mongo Database 연결
        const db = mongoClient.db(dbName);                                          //user collection 연결
        const collection = db.collection(collectionName);                           //user collection의 info table 연결
        let obj ={
        "email" : email,
        "title" : title,
        "info" : info,
        "url" : url,
        "imgurl" : imgurl,
        "date" : date,
        "provider" : provider
        }
        if(option=="add"){
            try{                
                await collection.insertOne(obj)
                    res.json({message:true})
            }catch{
                    res.json({message:false})
            }
        }else if(option=="delete"){
            try{                
                await collection.deleteOne(obj)
                    res.json({message:true})
            }catch{
                    res.json({message:false})
            }
        }
    })()
}

router.post('/', (req, res)=>{
    const title = req.body.title        //뉴스 제목
    const info = req.body.info          //뉴스 정보
    const url = req.body.url            //뉴스 url
    const imgurl = req.body.imgurl      //뉴스 이미지 url
    const date = req.body.date          //뉴스 날짜
    const provider = req.body.provider  //뉴스 공급자
    const email = req.body.email        //사용자 이메일
    const option = req.body.option      //뉴스 추가 or 삭제
    connect_mongodb(title,info,url,imgurl,date,provider,email ,res, option)
});


// 라우터를 모듈화
module.exports= router;
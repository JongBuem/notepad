//사용자 정보 홈화면에전달하는 서버
const express = require("express");
const router = express.Router(); 
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://jbryu:whdqja122036%40%40@cluster0.tfxbg.mongodb.net/user?retryWrites=true&w=majority";
const mongoClient  = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const dbName = "user";
const collectionName = 'info'

const connect_mongodb=(name, userId,userPassword,userPasswordConfirm,res)=>{
    (async()=>{
            await mongoClient.connect();
            const db = mongoClient.db(dbName);                                  //DB
            const collection = db.collection(collectionName);                   //DB table
            const document = await collection.find({"id":userId}).toArray();    //mongodb검색 결과
            if(document[0]==undefined){
                let obj ={
                    "name" : name,
                    "id" : userId,
                    "password" : userPassword
                }
                await collection.insertOne(obj)
                res.json({message:true})
            }else{
                res.json({message:false})
            }
            // if(document[0]){

            // }

            // try{
            //     const id = await document[0].id             //검색된 id
            //     const password = await document[0].password //검색된 password
            //     //입력값과 검색값이 같은지 확인
            //     if(id==userId&&password==userPassword){
            //         res.json({message:true})
            //     }else{
            //         res.json({message:false})
            //     }
            // }catch{
            //     res.json({message:false})
            // }
        })()
}

router.post('/', (req, res)=>{
    const name = req.body.name              //사용자이름
    const userId = req.body.id              //사용자 입력 id
    const userPassword = req.body.password  //사용자 입력 password
    const userPasswordConfirm = req.body.password 

    connect_mongodb(name, userId, userPassword, userPasswordConfirm, res)

});

// 라우터를 모듈화
module.exports= router;
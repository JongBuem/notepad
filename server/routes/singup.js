//사용자 정보 홈화면에전달하는 서버
const express = require('express')
const router = express.Router()
const { MongoClient } = require('mongodb')
const uri = process.env.DB_URL
const mongoClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
const dbName = 'user'
const collectionName = 'info'

const connect_mongodb = (userName, userEmail, userPassword, userNewskeywords, res) => {
    ;(async () => {
        await mongoClient.connect() //mongo Database 연결
        const db = mongoClient.db(dbName) //user collection 연결
        const collection = db.collection(collectionName) //user collection의 info table 연결
        const documents = await collection.find({ email: userEmail }).toArray() //info table에 동일한 email이 있는지 검색
        if (documents[0] == undefined) {
            try {
                let obj = {
                    name: userName,
                    email: userEmail,
                    password: userPassword,
                    newskeyword: userNewskeywords,
                }
                await collection.insertOne(obj)
                res.json({ message: true })
            } catch {
                res.json({ message: false })
            }
        } else {
            res.json({ message: false })
        }
    })()
}

router.post('/', (req, res) => {
    const userName = req.body.name //사용자 이름
    const userEmail = req.body.email //사용자 이메일
    const userPassword = req.body.password //사용자 비밀번호
    const userNewskeywords = req.body.newskeywords //뉴스 키워드
    connect_mongodb(userName, userEmail, userPassword, userNewskeywords, res)
})

// 라우터를 모듈화
module.exports = router

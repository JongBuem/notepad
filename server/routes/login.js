//사용자 정보 홈화면에전달하는 서버
const express = require('express')
const router = express.Router()
const { MongoClient } = require('mongodb')
const uri = process.env.DB_URL
const mongoClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
const dbName = 'user'
const collectionName = 'info'

const connect_mongodb = (userEmail, userPassword, res) => {
    ;(async () => {
        await mongoClient.connect() //mongo Database 연결
        const db = mongoClient.db(dbName) //user collection 연결
        const collection = db.collection(collectionName) //user collection의 info table 연결
        const documents = await collection.find({ email: userEmail }).toArray() //info table에 동일한 email이 있는지 검색
        if (documents[0] == undefined) {
            res.json({ message: '회원아님' })
        } else {
            try {
                const email = await documents[0].email //검색된 email
                const password = await documents[0].password //검색된 password
                //입력값과 검색값이 같은지 확인
                if (email == userEmail && password == userPassword) {
                    res.json({ message: true })
                } else {
                    res.json({ message: '비밀번호다름' })
                }
            } catch {
                res.json({ message: false })
            }
        }
    })()
}

router.post('/', (req, res) => {
    const userEmail = req.body.email //사용자 이메일
    const userPassword = req.body.password //사용자 비밀번호
    connect_mongodb(userEmail, userPassword, res)
})

// 라우터를 모듈화
module.exports = router

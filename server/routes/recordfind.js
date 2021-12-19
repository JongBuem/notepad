//사용자 정보 홈화면에전달하는 서버
const express = require('express')
const router = express.Router()
const { MongoClient } = require('mongodb')
const uri = process.env.DB_URL
const mongoClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
const dbName = 'user'
const collectionName = 'news'

const connect_mongodb = (email, news, res) => {
    ;(async () => {
        await mongoClient.connect() //mongo Database 연결
        const db = mongoClient.db(dbName) //user collection 연결
        const collection = db.collection(collectionName) //user collection의 info table 연결
        const document = await collection.find({ email: email }).toArray()
        res.json(document)
    })()
}

router.post('/', (req, res) => {
    const localemail = req.body.localemail //로컬 email
    const sessionemail = req.body.sessionemail //세션 email
    const news = req.body.news //뉴스 url
    if (localemail == undefined) {
        connect_mongodb(sessionemail, news, res)
    } else if (sessionemail == undefined) {
        connect_mongodb(localemail, news, res)
    }
})

// 라우터를 모듈화
module.exports = router

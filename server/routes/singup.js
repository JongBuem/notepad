//사용자 정보 홈화면에전달하는 서버
const express = require('express')
const router = express.Router()
const { MongoClient } = require('mongodb')
const crypto = require('crypto')
const uri = process.env.DB_URL
const mongoClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
const dbName = 'user'
const collectionName = 'info'

function encrypt(password) {
    const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY.repeat(2)
    const IV_LENGTH = 16 // For AES, this is always 16
    const iv = crypto.randomBytes(IV_LENGTH)
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv)
    const encrypted = cipher.update(password)

    return iv.toString('hex') + ':' + Buffer.concat([encrypted, cipher.final()]).toString('hex')
}

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
    const passwordEncryptResult = encrypt(userPassword) //password 암호화
    connect_mongodb(userName, userEmail, passwordEncryptResult, userNewskeywords, res)
})

// 라우터를 모듈화
module.exports = router

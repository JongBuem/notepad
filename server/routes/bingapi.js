//사용자 정보 홈화면에전달하는 서버
const express = require('express')
const router = express.Router()
const axios = require('axios')
const apikey = process.env.BING_KEY
const endpoint = process.env.BING_END_POINT

router.get('/', async (request, response) => {
    const serch = request.query.serch
    await axios
        .get(`${endpoint}?mkt=en-US&count=50&dix=Day&sortBy=Date&freshness=day&q=` + encodeURI(serch), {
            headers: {
                'Ocp-Apim-Subscription-Key': apikey,
            },
        })
        .then(async (res) => {
            if (res.data) {
                let result = []
                const item = await res.data.value
                for (let i = 0; i < item.length; i++) {
                    let img = await item[i].image
                    if (img == undefined) img = null
                    else img = await item[i].image.thumbnail.contentUrl //기사의 이미지가 포함될 경우
                    const title = await item[i].name
                    const info = await item[i].description
                    const url = await item[i].url
                    const date = await item[i].datePublished
                    result[i] = {
                        title: await title,
                        info: await info,
                        url: await url,
                        date: await date,
                        imgurl: await img,
                    }
                }
                // console.log(result)
                // console.log(result.length)
                response.json({ message: result })
            } else {
                response.json({ message: false })
            }
        })
        .catch((error) => {
            // console.log(error)
            response.json({ message: false })
            console.log('bing Get API error')
        })
})

// 라우터를 모듈화
module.exports = router

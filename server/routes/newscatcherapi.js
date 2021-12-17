//사용자 정보 홈화면에전달하는 서버
const express = require('express')
const router = express.Router()
const axios = require('axios')
const apikey = 'efOBYCVMU9p_kdortqeooz_Wr0WmkUPBXXryf4_Q5ro'

const Date = async (date) => {
    let arry = date.replaceAll('-', '.')
    let Date = arry.substr(0, 16)
    return Date
}

router.get('/', async (request, response) => {
    const serch = request.query.serch
    const sortStr = request.query.sort
    let sort = ''
    //관련도순
    if (sortStr == 'accuracy') {
        sort = 'relevancy'
    }
    //최신순
    else if (sortStr == 'recency') {
        sort = 'date'
    } else sort = 'relevancy'
    await axios
        .get(`https://api.newscatcherapi.com/v2/search?sort_by=${sort}&q=` + encodeURI(serch), {
            headers: {
                'x-rapidapi-host': 'google-news.p.rapidapi.com',
                'x-api-key': apikey,
            },
        })
        .then(async (res) => {
            if (res.data) {
                let result = []
                const item = await res.data.articles
                for (let i = 0; i < item.length; i++) {
                    const img = await item[i].media
                    if (undefined == img) img == null //기사의 이미지가 포함되지 않을 경우
                    const title = item[i].title
                    const info = item[i].excerpt
                    const url = item[i].link
                    const date = Date(item[i].published_date)
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
            response.json({ message: false })
            console.log('newscatcher Get API error')
            // console.log(error)
        })
})

// 라우터를 모듈화
module.exports = router

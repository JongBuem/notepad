//사용자 정보 홈화면에전달하는 서버
const express = require('express')
const router = express.Router()
const axios = require('axios')
const cheerio = require('cheerio')
const iconv = require('iconv-lite')
const apikey = '57a37458-ff72-4240-bd66-d8533d706a9f'

const Date = async (date) => {
    let arry = date.replaceAll('-', '.')
    let Date = arry.substr(0, 16).replaceAll('T', ' ')
    return Date
}

const htmlget = async (url) => {
    try {
        let result = []
        let html = await axios.get(url, { responseEncoding: 'binary', responseType: 'arraybuffer' })
        let htmlEncoding = iconv.decode(html.data, 'EUC-KR') // iconv를 이용해 EUC-KR에서 UTF-8로 인코딩해준다.                                            // result 라는 빈 함수를 만들어 이 곳에 결과값들을 넣어준다.
        let $ = cheerio.load(htmlEncoding) // cheerio를 톨해 html내용을 $에 넣는다
        let domElement = $('div.dcr-1b267dg picture').children('img')

        domElement.each(function (i, ele) {
            result[i] = {
                src: $(this).attr('src'),
            }
        })
        return result[0].src
    } catch {
        console.log('guardiana news failed to load image')
        return null
    }
}

const htmlinfoget = async (url) => {
    try {
        let result = []
        let html = await axios.get(url, { responseEncoding: 'binary', responseType: 'arraybuffer' })
        let htmlEncoding = iconv.decode(html.data, 'EUC-KR') // iconv를 이용해 EUC-KR에서 UTF-8로 인코딩해준다.                                            // result 라는 빈 함수를 만들어 이 곳에 결과값들을 넣어준다.
        let $ = cheerio.load(htmlEncoding) // cheerio를 톨해 html내용을 $에 넣는다
        let domElement = $('p')
        // .first("img")
        domElement.each(function (i, ele) {
            let text = $(this).text().trim()
            if (i == 0) {
                result[i] = {
                    text: text.replaceAll('���', '-').replaceAll('��셲', "'s").replaceAll('��', "'"),
                }
            }
        })
        return result[0].text
    } catch {
        console.log('guardiana news failed to load info text')
        return null
    }
}

router.get('/', async (request, response) => {
    const serch = request.query.serch
    const sortStr = request.query.sort
    let sort = ''
    //관련도순
    if (sortStr == 'accuracy') {
        sort = 'relevance'
    }
    //최신순
    else if (sortStr == 'recency') {
        sort = 'newest'
    } else sort = 'relevance'
    await axios
        .get(`https://content.guardianapis.com/search?api-key=${apikey}&page-size=20&section=technology&order-by=${sort}&q=` + encodeURI(serch))
        .then(async (res) => {
            if (res.data) {
                let result = []
                const item = res.data.response.results
                for (let i = 0; i < item.length; i++) {
                    const title = await item[i].webTitle
                    const url = await item[i].webUrl
                    const date = Date(item[i].webPublicationDate)
                    const info = await htmlinfoget(url)
                    const img = await htmlget(url)
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
            console.log('guardiana Get API error')
            // console.log(error)
        })
})

// 라우터를 모듈화
module.exports = router

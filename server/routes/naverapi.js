//사용자 정보 홈화면에전달하는 서버
const express = require("express");
const router = express.Router(); 
const axios = require("axios")
const cheerio = require("cheerio");
const iconv = require("iconv-lite")
const client_id = 'UwCtjxRJjKMup3ZE6GjQ';   //naver id
const client_secret = 'DESc47vs41';         //naver secret

const htmlget = async (url) => {
    try{
            let result = [];  
            let html = await axios.get(url, {responseEncoding : 'binary', responseType : 'arraybuffer'});
            let htmlEncoding = iconv.decode(html.data, 'EUC-KR');       // iconv를 이용해 EUC-KR에서 UTF-8로 인코딩해준다.                                            // result 라는 빈 함수를 만들어 이 곳에 결과값들을 넣어준다.
            let $ =  cheerio.load(htmlEncoding);                        // cheerio를 톨해 html내용을 $에 넣는다
            let domElement = $("div.article_body div#articleBodyContents span").children("img")
            
            if(domElement[0] == undefined){
                domElement = $("div").children("img")
                domElement.each(function (i, ele) {
                    result[i] = {
                        "src" : $(this).attr('src')
                    } 
                });
                return result[0].src
            }else {
                domElement.each(function (i, ele) {
                    result[i] = {
                        "src" : $(this).attr('src')
                    } 
                });
                return result[0].src
            }
    } catch{
        console.log("naver news failed to load image");
        return null
    }
}

router.get('/', async(request, response)=>{
    const serch = request.query.serch
    const sortStr = request.query.sort
    let sort=''
    //관련도순
    if(sortStr=="accuracy"){
        sort = "sim"
    }
    //최신순
    else if(sortStr=="recency"){
        sort = "date"
    }else sort = "sim"
    await axios.get(`https://openapi.naver.com/v1/search/news?sort=${sort}&query=`+encodeURI(serch),{
        headers:{
            'X-Naver-Client-Id':client_id,
            'X-Naver-Client-Secret': client_secret
        }
    }).then(async(res)=>{
        if(res.data){
            let result = []; 
            const item = await res.data.items
            for(let i=0; i<item.length; i++){
                const title = item[i].title.replaceAll("<b>","").replaceAll("</b>","")
                const info = item[i].description.replaceAll("<b>","").replaceAll("</b>","")
                const url = item[i].link
                const date = item[i].pubDate
                const img = htmlget(url)
                // const imgurl = await img;
                result[i] = {
                    "title" : await title.replaceAll("&quot;","`"),
                    "info" : await info.replaceAll("&quot;","`"),
                    "url" : await url,
                    "date" : await date,
                    "imgurl" : await img
                }
            }
            // console.log(result)
            // console.log(result.length)
            response.json({message:result})
        }else{
            response.json({message:false})
        }
    }).catch((error)=> {
        response.json({message:false})
        console.log("naver Get API error")
        // console.log(error)
    })
});

// 라우터를 모듈화
module.exports= router;

//사용자 정보 홈화면에전달하는 서버
const express = require("express");
const router = express.Router(); 
const axios = require("axios")
const cheerio = require("cheerio");
const iconv = require("iconv-lite")
const urlType = require("url") 
const client_id = 'UwCtjxRJjKMup3ZE6GjQ';   //naver id
const client_secret = 'DESc47vs41';         //naver secret

const htmlget = async (url) => {
    try{
            let result = [];  
            let html = await axios.get(url, {responseEncoding : 'binary', responseType : 'arraybuffer'});
            let htmlEncoding = iconv.decode(html.data, 'EUC-KR');  // iconv를 이용해 EUC-KR에서 UTF-8로 인코딩해준다.                                            // result 라는 빈 함수를 만들어 이 곳에 결과값들을 넣어준다.
            let $ = cheerio.load(htmlEncoding);                       // cheerio를 톨해 html내용을 $에 넣는다
            let domElement = $("div.article_body div#articleBodyContents span.end_photo_org").children("img")
            
            domElement.each(function(i, ele) {
                result[i] = {
                    "src" : $(this).attr('src')
                } 
            });
            return result[0].src
    } catch{
        console.log("error");
    }
}



router.post('/', async(request, response)=>{
    const serch = request.body.serch
    console.log(serch)
    await axios.get('https://openapi.naver.com/v1/search/news?sort=sim&query='+encodeURI(serch),{
        headers:{
            'X-Naver-Client-Id':client_id,
            'X-Naver-Client-Secret': client_secret
        }
    }).then(async(res)=>{
        if(res.data){
            const item = res.data.items
            let result = []; 
            for(let i=0; i<item.length; i++){
                const title = await item[i].title.replaceAll("<b>","").replaceAll("</b>","")
                const info = await item[i].description.replaceAll("<b>","").replaceAll("</b>","")
                const url =await item[i].link
                const date =await item[i].pubDate
                result[i] = {
                    "title" : await title,
                    "info" : await info,
                    "url" : await url,
                    "date" : await date,
                    "imgurl" : await htmlget(url)
                }
            }
            // console.log(result)
            response.json({message:result})
        }else{
            console.log("false")
        }
    }).catch((error)=> {
        console.log(error)
    })
});

// 라우터를 모듈화
module.exports= router;




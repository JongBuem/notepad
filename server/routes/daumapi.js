//사용자 정보 홈화면에전달하는 서버
const express = require("express");
const router = express.Router(); 
const axios = require("axios")
const cheerio = require("cheerio");
const iconv = require("iconv-lite")
const urlType = require("url") 
const apikey = "KakaoAK 82fd5692834ed6b3e7f6dd4236f4228a"

const htmlget = async (url) => {
    try{
            let result = [];  
            let html = await axios.get(url, {responseEncoding : 'binary', responseType : 'arraybuffer'});
            let htmlEncoding = iconv.decode(html.data, 'EUC-KR');  // iconv를 이용해 EUC-KR에서 UTF-8로 인코딩해준다.                                            // result 라는 빈 함수를 만들어 이 곳에 결과값들을 넣어준다.
            let $ = cheerio.load(htmlEncoding);                       // cheerio를 톨해 html내용을 $에 넣는다
            let domElement = $("img")
            // .first("img")
            domElement.each(function(i, ele) {
                if(i==4){
                    if($(this).attr('src').indexOf("//") < 0 ){
                        let com = url.indexOf(".com")
                        let kr = url.indexOf(".kr")
                        let originalurl=""
                        if(com > 0){
                            originalurl = url.substring(com+4, 0)

                        }
                        else if(kr > 0){
                            originalurl = url.substring(kr+3, 0)
                        }
                        result[i] = {
                            "src" : originalurl+ $(this).attr('src')
                        } 
                    }else{
                        result[i] = {
                            "src" : $(this).attr('src')
                        } 
                    }
                }
            });
            return result[4].src
            // return result[0].src
    } catch{
        console.log("error");
    }
}



router.post('/', async(request, response)=>{
    const serch = request.body.serch
    console.log(serch)
    await axios.get("https://dapi.kakao.com/v2/search/web?sort=recency&page=1&size=50&query="+encodeURI(serch),{
        headers:{
            "Content-Type": "application/json",
            "Authorization": apikey
        }
    }).then(async(res)=>{
        if(res.data){
            const item = res.data.documents
            let result=[]
            for(let i=0; i<item.length; i++){
                let url = await item[i].url
                let newkeyword = url.indexOf("news")
                if(newkeyword >0){
                    result[i] = {
                        "title" : await item[i].title.replaceAll("<b>","").replaceAll("</b>",""),
                        "info" : await item[i].contents.replaceAll("<b>","").replaceAll("</b>",""),
                        "url" : await item[i].url,
                        "date" : await item[i].datetime,
                        "imgurl" : await htmlget(url)
                    }
                }
            }
            console.log(result)
        }else{
            console.log("false")
        }
    }).catch((error)=> {
        console.log(error)
    })
});

// 라우터를 모듈화
module.exports= router;




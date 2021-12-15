//사용자 정보 홈화면에전달하는 서버
const express = require("express");
const router = express.Router(); 
const axios = require("axios")
const cheerio = require("cheerio");
const iconv = require("iconv-lite")
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
                if(i==6){
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
            return result[6].src
    } catch{
        console.log("kakao news failed to load image");
        return null
    }
}

router.get('/', async(request, response)=>{
    const serch = request.query.serch
    const sortStr = request.query.sort
    let sort=''
    //관련도순
    if(sortStr=="accuracy"){
        sort = "accuracy"
    }
    //최신순
    else if(sortStr=="recency"){
        sort = "recency"
    }else sort = "accuracy"
    await axios.get(`https://dapi.kakao.com/v2/search/web?sort=${sort}&page=1&size=50&query=`+encodeURI(serch),{
        headers:{
            "Content-Type": "application/json",
            "Authorization": apikey
        }
    }).then(async(res)=>{
        if(res.data){
            let result=[]
            const item = await res.data.documents
            for(let i=0; i<item.length; i++){
                let url = await item[i].url
                let newkeyword = await url.indexOf("news")
                if(newkeyword >0){
                    result.push({
                        "title" : await item[i].title.replaceAll("<b>","").replaceAll("</b>","").replaceAll("&#39;","`"),
                        "info" : await item[i].contents.replaceAll("<b>","").replaceAll("</b>","").replaceAll("&#39;","`"),
                        "url" : await item[i].url,
                        "date" : await item[i].datetime,
                        "imgurl" : await htmlget(url)
                    })
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
        console.log("kakao Get API error")
        // console.log(error)
    })
});

// 라우터를 모듈화
module.exports= router;




const express = require("express");
const router = express.Router();
const cron = require('node-cron'); 
const axios = require("axios");
const cheerio = require("cheerio");
const iconv = require("iconv-lite")

const htmlget = async () => {
    try{
            let url = await axios.get("https://news.daum.net/breakingnews/digital", {responseEncoding : 'binary', responseType : 'arraybuffer'});
            let html = await iconv.decode(url.data, 'utf-8'); // iconv를 이용해 EUC-KR에서 UTF-8로 인코딩해준다.
        return html
    } catch(error){
        console.log(error);
    }
}


router.post('/',(req, res)=>{
        htmlget()
            .then(html => {
            try{
                    let result = [];                                            // result 라는 빈 함수를 만들어 이 곳에 결과값들을 넣어준다.
                    const $ = cheerio.load(html);                               // cheerio를 톨해 html내용을 $에 넣는다
                    let domElement = $("div.box_etc ul").children("li")         // element 함수에 $("ul.type06_headline").children("li") 가 들어간다.
                    // console.log(domElement.length)

                    // each문을 사용했다. 데이터 만큼 반복문을 돌린다.
                    domElement.each(function(i, ele) {
                        result[i] = {
                            "title" : $(this).find('div strong a').text().trim(),
                            "titleinfo" : $(this).find('div div span').text().trim(),
                        } 
                        // if(result[i] === '') {
                        //     result[i].title = $(this).find('dl dt:nth-child(1)').text().trim(); // 만약 이미지가 없는 글이라 nth-child(2)의 내용이 ''라면 nth-child의 인자를 1로 고쳐 다시 가져온다.
                        // }
                    });
                    res.json({message:result})
                    // console.log(result); //결과
                }catch{
                    console.log("erro")
                }
            })
});

// 라우터를 모듈화
module.exports= router;

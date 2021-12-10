//사용자 정보 홈화면에전달하는 서버
const express = require("express");
const router = express.Router(); 
const axios = require('axios');


// const range = await vbs[i+1].high_price - vbs[i+1].low_price //전일고가 - 전일저가
// const targetPrice =await vbs[i].opening_price + range * k //매수목표
// const fees = vbs[0].trade_price * 0.0005 //수수료

// if(targetPrice >= vbs[0].trade_price-fees){
//     if(vbs[0].trade_price+fees <= money){
//         money = money - (vbs[0].trade_price+fees) //구매
//         volume = volume+1
//     }
// }else if(targetPrice < vbs[0].trade_price+fees){
//     if(volume > 0){
//         volume = volume /2 
//         money = money + (vbs[0].trade_price-fees * volume)
//     }
// }

const GET = async()=>{
    let money = 999999999;//시작 돈
    let volume = 0;//코인 갯수
    const {data} =  await axios.get("https://api.upbit.com/v1/candles/minutes/5?market=KRW-BTC&count=3");
    const {data:vbs} = await axios.get("https://api.upbit.com/v1/candles/days?market=KRW-BTC&count=101&convertingPriceUnit=KRW");
    const currentPrice = await data[0].trade_price //실시간 체결가격
    // const fees = 0.0005 //수수료
    const k = 0.5;

    for(let i=0; i<vbs.length-1; i++){

        const range = await vbs[i+1].high_price - vbs[i+1].low_price //전일고가 - 전일저가
        const targetPrice =await vbs[i].opening_price + range * k //매수목표
        const fees = vbs[i].trade_price * 0.0005 //수수료

        //매수
        if(targetPrice <= vbs[i].trade_price-fees){
            if(vbs[i].trade_price+fees <= money){
                volume = volume+1
                money = money - (vbs[i].trade_price+fees) //구매
                console.log("매수")
            }
        }else if(targetPrice > vbs[i].trade_price+fees){
            if(volume > 0){
                money = money + (vbs[i].trade_price-fees * volume/2)
                volume = volume /2 
                console.log("매도")

            }
        }

        // const drr = (vbs[i].prev_closing_price / (1+fees)) / targetPrice*(1+fees)-1 //수익률
        
        // if(vbs[i].high_price > targetPrice){
        //     console.log(`${drr} 수익률`)
        // }else if(vbs[0].high_price < targetPrice){
        //     console.log("0")
        // }
        
        console.log(`남은돈: ${money}, 코인갯수: ${volume}, 현재코인 금액: ${vbs[i].trade_price*volume}, 총 액수 ${money+ (vbs[i].trade_price*volume)}`)
        // console.log(`현재가격은 ${currentPrice} 매수목표는 ${targetPrice} 이가격보다 높을때 ${vbs[0].high_price}`)
    }
    return [data, vbs]
}


router.get('/', async(req, res)=>{
    
    const dats = await GET()
  

        // res.json({message:dats})
  

            // console.log(dats)
    

    // const id = req.body.id;
    // const password = req.body.password;
    // console.log(id, password)
    // res.json({message:true})



});

// 라우터를 모듈화
module.exports= router;
const express = require('express')

const app = express()

app.listen(1234) 


// 채널 주소 1: https://www.youtube.com/@이시온-2xion
// 채널 주소 2: https://www.youtube.com/@ChimChakMan_Official
// 채널 주소 3: https://www.youtube.com/@TEO_universe

let youtubeer1 = {
    channelTitle : "lesion",
    sub : "121명",
    videoNum : "330개"
}

let youtubeer2 = {
    channelTitle : "침착맨",
    sub : "227만명",
    videoNum : "6.6천개"
}

let youtubeer3 = {
    channelTitle : "테오",
    sub : "54.8만명",
    videoNum : "726개"
}

app.get('/:nickname', function(req, res) {
    
    let {nickname} = req.params

    if (nickname == "@이시온-2xion"){
        res.json(youtubeer1)
    } else if (nickname == "@ChimChakMan_Official"){
        res.json(youtubeer2)
    } else if (nickname == "@TEO_universe"){
        res.json(youtubeer3)
    } else {
        res.json({
            message : "저희가 모르는 유튜버입니다."
        })
    }
    // 개발자가 예상하지 못한 에러는 예외 처리한다.
})



// 영상 클릭 주소 : https://www.youtube.com/shorts/L6aX2psvN_M
// 영상 타임라인 주소 : https://www.youtube.com/watch?v=Atk5-5vwljs&t=28s
// 여러 데이터를 다룰때는 ?를 사용한다.


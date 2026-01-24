// express 세팅

const express = require("express")
const app = express()
app.listen("8888")

// Data 세팅

let youtuber1 = {
    channelTitle : "lesion",
    sub : "121명",
    videoNum : "330개"
}

let youtuber2 = {
    channelTitle : "침착맨",
    sub : "227만명",
    videoNum : "6.6천개"
}

let youtuber3 = {
    channelTitle : "테오",
    sub : "54.8만명",
    videoNum : "726개"
}

let db = new Map()
var id = 1
// 왜 나는 let으로 해도 정상 실행됐지?
db.set(id++, youtuber1)
db.set(id++, youtuber2)
db.set(id++, youtuber3)


// REST API 설계
app.get("/youtubers", (req,res) => {
    res.json({
        message : "heelo"
    })
})

app.get('/youtuber/:id',function(req,res) {
    let {id} = req.params
    id = parseInt(id)

    const youtuber = db.get(id)
    if (youtuber == undefined){
        res.json({
            message : "유튜버 정보를 찾을 수 없다."
        })
    } else {
        res.json(youtuber)
    }
})


app.use(express.json()) // http 외 모듈인 '미들웨어':json 설정
app.post('/youtuber',(req, res) => {
    console.log(req.body)
    // Map(db)에 저장(put) 해줘야 한다.
    db.set(id++, req.body)

    res.json({
        // message : `${db.get(id-1).channelTitle}님 유튜버 생활을 응원합니다.`
        message : `${db.get(id).channelTitle}님 유튜버 생활을 응원합니다.`
    })
})


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
    var youtubers = {}

    console.log(db)

    if (db.size !== 0) {
        db.forEach( (value, key) => {
            youtubers[key] = value
        })

        res.json(youtubers)
    } else {
        res.status(404).json({
            message : "조회할 유튜버가 없습니다."
        })
    }
})

app.get('/youtubers/:id',function(req,res) {
    let {id} = req.params
    id = parseInt(id)

    const youtuber = db.get(id)
    if (youtuber == undefined){
        res.status(404).json({
            message : "유튜버 정보를 찾을 수 없다."
        })
    } else {
        res.json(youtuber)
    }
})





app.use(express.json()) // http 외 모듈인 '미들웨어':json 설정
app.post('/youtubers',(req, res) => {
    const channelTitle = req.body.channelTitle
    if (req.body.channelTitle) {
            // Map(db)에 저장(put) 해줘야 한다.
        db.set(id++, req.body)

        res.status(201).json({
            message : `${db.get(id-1).channelTitle}님 유튜버 생활을 응원합니다.`
            // message : `${db.get(id).channelTitle}님 유튜버 생활을 응원합니다.`
    })    
    } else {
        res.status(400).json({
            message : "요청 값을 제대로 보내주세요."
        })
    }
    
})





// 개별 삭제
app.delete('/youtubers/:id', (req, res) => {
    let { id } = req.params
    id = parseInt(id)

    const youtuber = db.get(id) // 먼저 데이터를 가져와 변수에 담습니다.

    if (youtuber) {
        // 2. 데이터가 있을 경우
        const name = youtuber.channelTitle
        db.delete(id) // Map에서 삭제

        res.json({
            message: `${name}님, 다음에 뵙겠습니다.`
        })
    }
    else {
        // 1. 데이터가 없을 경우 (입력된 id가 등록된 숫자보다 크거나 없을 때)
        res.status(404).json({
            message: `요청하신 ${id}번은 입력된 값이 없습니다.`
        })
    }
})

// 전체 삭제
app.delete("/youtubers", (req,res) => {
    // db에 값이 1개 이상이면, 전체 삭제
    if (db.size >= 1) {
        db.clear()
        
        res.json({
            message :  "전체 삭제 되었습니다."
        })
    }
    // 없으면, "값이 없습니다."라고 출력
    else {        
        res.status(404).json({
            message : "삭제할 유튜버가 없습니다."
        })
    }
})


app.put('/youtubers/:id', (req,res)=> {
    let { id } = req.params
    id = parseInt(id)

    var youtuber = db.get(id) // 먼저 데이터를 가져와 변수에 담습니다.
    var oldTitle = youtuber.channelTitle
    if (youtuber == undefined) {
        // 1. 데이터가 없을 경우 (입력된 id가 등록된 숫자보다 크거나 없을 때)
        res.status(404).json({
            message: `요청하신 ${id}번은 입력된 값이 없습니다.`
        })
    } else {
        var newTitle = req.body.channelTitle
        db.set(id, )

        youtuber.channelTitle = newTitle
        res.json({
        message:`${oldTitle}님, 채널명이 ${newTitle}로 수정되었습니다.`
    })
    }
})
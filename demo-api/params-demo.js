const express = require('express')

const app = express()

app.listen(1234) 


// 하드 코딩(숫자 직접 기입)안하기
app.get('/product/:n', function(req, res) {
    // : => 매개변수를 URL로 매개변수를 전달해준다.
    // req.params라는 변수에 모든 값을 담아온다.
    // products/__ 빈칸에 오는 값을 n이라는 변수에 담아줘
    // console.log(req.params)
    // console.log(req.params.n)
    // 숫자로 타입을 정하고 싶으면 parseInt를 사용한다.
    let number = parseInt(req.params.n) - 10
    console.log(number) // 문자로 된 숫자를 숫자취급한다.
    res.json({
        num : number
    }) 
})

// app.get('/watch', function(req, res) {
//     const q = req.query
//     console.log(`영상 ${q.v} , 시간 ${q.t}`),
//     res.json({
//         video : q.v,
//         timline : q.t
//     })
// })

// 객체의 비구조화
// 객체에서는 변수 이름 그대로 입력해야 오류가 발생 안한다.
app.get('/watch', function(req, res) {
    const {v,t} = req.query
    console.log(v)
    console.log(t)

    res.json({
        video : v,
        timeline : t
    })
})
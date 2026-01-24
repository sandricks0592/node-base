const express = require('express')

const app = express()

// 서버 세팅 포트넘버 : 1234    
app.listen(1234, () => {
    console.log('Server is running on http://localhost:1234')
})

// GET + "/"
app.get('/', (req, res) => {
    res.json('Hello World')
})



/* --------------------------------- */

let nodejsbook = {
    title : "Node.js를 공부해보자",
    price : 20000,
    description : "이지환이 지음"
}


app.get('/product/1', function(req, res) {
    res.json(nodejsbook)
    // res.json(2000)
})


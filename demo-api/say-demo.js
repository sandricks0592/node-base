const express = require('express')

const app = express()

app.listen(1234, () => {
    console.log('Server is running on http://localhost:1234')
})

// hello, bye, nicetomeetyou

app.get('/hello', (req, res) => {
    res.json({
        say : "안녕하세요"
    })
})

app.get('/bye', (req, res) => {
    res.json({
        say : "잘가"
    })
})

app.get('/nicetomeetyou', (req, res) => {
    res.json({
        say : '만나서반가워'
    })
})

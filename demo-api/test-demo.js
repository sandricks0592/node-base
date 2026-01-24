const express = require('express')

const app = express()

app.listen(1234, () => {
    console.log('Server is running on http://localhost:1234')
})

// API : GET + "http://localhost:1234/test"
// "TEST"

app.get('/test', (req, res) => {
    res.json('TEST')
})

// API : GET + "http://localhost:1234/test/1"
// "One!!"

app.get('/test/1', (req, res) => {
    res.json('One!!')
})

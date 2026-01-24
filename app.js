const express = require('express')
const app = express()
const port = 1234


app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/test',(req, res) => {
  // body에 숨겨져 온 데이터를 어떻게 뿌려줄까?
  
  console.log(req.body.message)

  res.json(req.body.message)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

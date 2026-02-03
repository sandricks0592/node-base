const express = require("express")
const app = express()



app.listen(7777)

// 서버 설정은 app.js가 하고 user-demo와 channel-demo를 심기만 하면 된다.

// 모듈 소화
const userRouter = require("./routes/users")
const channelRouter = require("./routes/channels")

// app에서 사용한다.
app.use("/",userRouter)
app.use("/channels",channelRouter)
const express = require('express')
const router = express.Router()
router.use(express.json())
const conn = require('../mariadb') 



router
    .route('/')
    // 채널 전체 조회 
    .get((req, res) => {
        var { userId } = req.body; // Postman에서 Params에 넣으셨는지 확인!
        
        if (userId) {
            let sql = `SELECT * FROM channels WHERE user_id = ?`;
            conn.query(sql, [userId], (err, results) => {
                if (err) {
                    return res.status(500).json(err);
                }

                if (results.length) {
                    res.status(200).json(results);
                } else {
                    notFoundChannel(res);
                }
            });
        } else {
            // userId가 없을 때만 400 에러를 보냄
            res.status(400).json({
                message: "유저 아이디(userId)를 쿼리 파라미터로 보내주세요."
            });
        }
    })

        
        

    // 채널 개별 생성  
    .post((req, res) => {
        if (req.body.name && req.body.userId) {
            const {name, userId} = req.body
            let sql = `INSERT INTO channels (name,user_id) VALUES (?,?)`
            let values = [name, userId]
            conn.query(sql,values,
                (err,results) => {
                    res.status(201).json(results)
                }
            )
        } else {
            res.status(400).json({
                message : "요청 값을 제대로 보내주세요."
            })
        }
    })

router
    .route('/:id')
    // 채널 개별 수정
    .put((req, res) => {
        let { id } = req.params
        id = parseInt(id)

        var channel = db.get(id)
        
        if (channel) {
            var oldTitle = channel.channelTitle
            var newTitle = req.body.channelTitle

            channel.channelTitle = newTitle
            db.set(id, channel)

            res.json({
                message: `채널명이 정상적으로 수정되었습니다. 기존 ${oldTitle} -> 에서 ${newTitle}`
            })
        } else {
            notFoundChannel()
        }
    })

    // 채널 개별 삭제
    .delete((req, res) => {
        let { id } = req.params
        id = parseInt(id)

        var channel = db.get(id)
        if (channel) {
            db.delete(id)
            res.status(200).json({
                message: `${channel.channelTitle}이 정상적으로 삭제되었습니다.`
            })
        } else {
            notFoundChannel()
        }
    })
    
    // 채널 개별 조회
    .get((req, res) => {
        let { id } = req.params
        id = parseInt(id)

        let sql = `SELECT * FROM channels WHERE id = ?`
        conn.query(sql,id, 
            (err, results) => {
                if (results.length) {
                    res.status(200).json(results)
                } else {
                    notFoundChannel(res)
                }
            })
        })

function notFoundChannel(res) {
    res.status(404).json({
                message: "채널 정보를 찾을 수 없습니다."
            })
}

module.exports = router
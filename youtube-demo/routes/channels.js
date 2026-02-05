const express = require('express')
const router = express.Router()
router.use(express.json())
const conn = require('../mariadb') 
const {body, param, validationResult} = require('express-validator') 

const validate = (req,res,next) => {
    const err = validationResult(req)

    if (err.isEmpty()){
        return next();
    }else{
        return res.status(400).json(err.array())
    }
}


router
    .route('/')
    // 채널 전체 조회 
    .get(
        [
            body('userId').notEmpty().isInt().withMessage('숫자 입력 필요'),
            validate
        ]
        ,(req, res) => {

            var {userId} = req.body;
        
            let sql = `SELECT * FROM channels WHERE user_id = ?`;
            
            conn.query(sql,userId,
                function(err, results) {
                    if(results.length)
                        res.status(200).json(results)
                    else
                        notFoundChannel(res)
                }
            )
    })

        
    // 채널 개별 생성  
    .post(
        [body('userId').notEmpty().isInt().withMessage('숫자 입력 필요'),
        body('name').notEmpty().isString().withMessage('문자 입력 필요')],
        validate
        , (req, res) => {
        const {name, userId} = req.body
        
        let sql = `INSERT INTO channels (name,user_id) VALUES (?,?)`
        let values = [name, userId]
        conn.query(sql,values,
            (err,results) => {
                if (err){
                    console.log(err)
                    return res.status(404).end()
                }    
                if(results.length)
                    res.status(20).json(results)
                else 
                    notFoundChannel(res)
            }
        )
    })

router
    .route('/:id')
    // 채널 개별 수정
    .put(
        [param('id').notEmpty().withMessage('채널 아이디 필요'),
        body('name').notEmpty().isString().withMessage('채널명 오류')],
        validate
        ,(req, res) => {
        let {id} = req.params
        id = parseInt(id)
        let {name} = req.body

        let sql = `UPDATE channels SET name=? WHERE id=?`
        let values = [name,id]
        conn.query(sql,values, 
            (err, results) => {
                if(err){
                    console.log(err)
                    return res.status(400).end()
                }

                if (results.affectedRows == 0) {
                    return res.status(400).end()
                } else {
                    res.status(200).json(results)
                }
            })
        })




    // 채널 개별 삭제
    .delete(
        [param('id').notEmpty().isInt().withMessage('채널 아이디 필요')],
        validate
        ,(req, res) => {
        let { id } = req.params
        id = parseInt(id)

        let sql = `DELETE FROM channels WHERE id = ?`
        conn.query(sql, id,
            (err,results) => {
                if(err){
                    console.log(err)
                    return res.status(400).end()
                }

                if (results.affectedRows == 0) {
                    return res.status(400).end()
                } else {
                    res.status(200).json(results)
                }

            }
        )
    })
    
    // 채널 개별 조회
    .get(
        [param('id').notEmpty().withMessage('채널 아이디 필요')],
        validate
        ,(req, res) => {
        let { id } = req.params
        id = parseInt(id)

        let sql = `SELECT * FROM channels WHERE id = ?`
        conn.query(sql,id, 
            (err, results) => {
                if(err){
                    console.log(err)
                    return res.status(400).end()
                }

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
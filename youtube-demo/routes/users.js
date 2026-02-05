// express 모듈 세팅
const express = require('express');
const router = express.Router();
const conn = require('../mariadb'); 
const {body, param, validationResult} = require('express-validator');



// jwt 모듈
const jwt = require('jsonwebtoken');

// dotenv 모듈
const dotenv = require('dotenv');
dotenv.config();


// Postman에서 보낸 json파일을 js가 읽을수 있는 객체로 바꿔줌
router.use(express.json());

// 유효성 검사
const validate = (req,res,next) => {
    const err = validationResult(req);

    if (err.isEmpty()){
        return next();
    }else{
        return res.status(400).json(err.array())
    }
};


// 로그인
router.post(
        '/login',
        [ 
            body('email').notEmpty().isEmail().withMessage('이메일 확인 필요'),
            body('password').notEmpty().isString().withMessage('비밀번호 확인 필요'),
            validate
        ]
        ,(req, res) => {
            // eamil이 db에 저장된 회원인지 확인
            const { email, password } = req.body
            
            let sql = `SELECT * FROM users WHERE email = ?`
            conn.query(sql,email, 
                    (err, results) => {

                        var loginUser = results[0]

                        if (loginUser && loginUser.password == password){
                            // token 발급
                            const token = jwt.sign({
                                email : loginUser.email,
                                name : loginUser.name,
                                id : loginUser.id
                            }, process.env.PRIVATE_KEY, {
                                expiresIn : '30m',
                                issuer : "john"
                            });

                            res.cookie("token",token, {
                                httpOnly : true
                            })

                            console.log(token)
                                res.status(200).json({ message: `${loginUser.name}님 로그인 되었습니다.`})
                        }
                        else {
                            res.status(401).json({ message: "이메일 또는 비밀번호가 틀렸습니다." })
                        }
                }
            )
})

// 회원가입
router.post('/join',
    [ 
        body('email').notEmpty().isEmail().withMessage('이메일 확인 필요'),
        body('name').notEmpty().isString().withMessage('이름 확인 필요'),
        body('password').notEmpty().isString().withMessage('비밀번호 확인 필요'),
        body('contact').notEmpty().isString().withMessage('연락처 확인 필요'),
        validate // 여기서 검사 결과가 걸러짐
    ],
    (req, res) => {
        const { email, name, password, contact } = req.body;

        const sql = `INSERT INTO users (email, name, password, contact) VALUES (?, ?, ?, ?)`    
        const values = [email, name, password, contact]

        conn.query(sql, values, (err, results) => {            
            if (err) {
                console.error(err); // 터미널에서 에러 확인용
                if (err.errno === 1062) {
                    return res.status(400).json({ message: "이미 가입된 이메일입니다." });
                }
                return res.status(500).json({ message: "서버 내부 오류가 발생했습니다." });
            }

            // 가입 성공 응답
            res.status(201).json({
                message: `${name}님, 회원가입을 축하합니다!`,
                // results를 다 보내기보다 가입된 이름 정도만 보내는 것이 깔끔합니다.
            });
        });
    }
);

// router.route 설정
router
    .route('/users')
    
    // 회원 개별 조회
    .get(
        [ 
            body('email').notEmpty().isEmail().withMessage('이메일 확인 필요'),
            validate
        ]
        ,(req, res) => {
            let {email} = req.body 
            let sql = `SELECT * FROM users WHERE email = ?`
            conn.query(sql,email, 
                function(err, results) {            
                    if(err){
                        console.log(err)
                        return res.status(400).end()
                    }
                    res.status(200).json(results)
                }    
            )
    })

    // 회원 탈퇴
    .delete(
        [ 
            body('email').notEmpty().isEmail().withMessage('이메일 확인 필요'),
            validate
        ]
        ,(req, res) => {
            let { email } = req.body;
            let sql = `DELETE FROM users WHERE email = ?`
            conn.query(sql, [email],
                (err,results,fields) => {
                    if(err){
                        console.log(err)
                        return res.status(400).end()
                    }

                    if (results.affectedRows == 0) {
                        console.log(err)
                        return res.status(400).end()
                    } else {
                        res.status(200).json(results)
                    }
                }
            )
    })

module.exports = router
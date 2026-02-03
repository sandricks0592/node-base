// express 모듈 세팅
const express = require('express')
const router = express.Router()
const conn = require('../mariadb') 

// Postman에서 보낸 json파일을 js가 읽을수 있는 객체로 바꿔줌
router.use(express.json())


// 로그인
router.post('/login', (req, res) => {
    // eamil이 db에 저장된 회원인지 확인
    const { email, password } = req.body
    
    let sql = `SELECT * FROM users WHERE email = ?`
    conn.query(sql,email, 
            (err, results) => {
                var loginUser = results[0]            
                if (loginUser && loginUser.password == password){
                        res.status(200).json({ message: `${loginUser.name}님 로그인 되었습니다.` })
                }
                else {
                    res.status(404).json({ message: "이메일 또는 비밀번호가 틀렸습니다." })
                }
            }
        )

})

// 회원가입
router.post('/join', (req, res) => {
    const { email, name, password, contact } = req.body;

    // 모든 필수 값이 들어왔는지 먼저 체크
    if (email && name && password && contact) {
    let sql = `INSERT INTO users (email, name, password, contact) VALUES (?,?,?,?)`    
    let values = [email, name, password, contact]
        conn.query(sql,values,
    function(err, results) {            
        if (err) {
            // 에러 코드가 1062(중복)인 경우 처리
            if (err.errno === 1062) {
                return res.status(400).json({
                    message: "이미 가입된 이메일입니다."
                });
            }
            return res.status(500).json({ message: "DB 오류 발생" });
        }
        res.status(201).json({ message: "회원가입 성공!", results });
    }
);
    } else {
        // 필수 값이 빠졌을 경우 여기서만 응답
        res.status(400).json({
            message: "입력값을 다시 확인해주세요. (email, name, password, contact 모두 필요)"
        });
    }
});

// router.route 설정
router.route('/users')
    // 회원 개별 조회
    .get((req, res) => {
        let {email} = req.body 
        let sql = `SELECT * FROM users WHERE email = ?`
        conn.query(sql,email, 
            function(err, results, fields) {            
                if(results.length){    
                    res.status(200).json({results})
                } else {
                    res.status(404).json({
                    message: "회원 정보가 없습니다."
                    })
                }    
            }
        )
    })

// 회원 개별 탈퇴
.delete((req, res) => {
    let { email } = req.body;
    let sql = `DELETE FROM users WHERE email = ?`
    conn.query(sql, [email],
        (err,results,fields) => {
            res.status(200).json(results)
        }
    );
});

module.exports = router
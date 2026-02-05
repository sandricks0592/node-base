var jwt = require('jsonwebtoken'); // jwt 모듈 소화
var dotenv = require('dotenv')

dotenv.config();

// 서명 = 토큰 발행
var token = jwt.sign({ foo: 'bar' }, process.env.PRIVATE_KEY );
// token 생성 = jwt 서명을 했다! (페이로드, 나만의 암호키) + SHA256


console.log(token)

// 검증
// 만약 검증 성공하면, 페이로드 값 확인
var decoded = jwt.verify(token, process.env.PRIVATE_KEY);
console.log(decoded)

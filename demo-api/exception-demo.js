const express = require('express')
const app = express()
app.listen(7777)

// 배열 선언
const cars = [
    { id : 1, name: "bmw"},
    { id : 2, name: "benz"},
    { id : 3, name: "audi"},
    { id : 4, name: "ferrari"}
]

// 전체 차 조회
app.get('/cars',(req,res) => {
    res.json(cars)
})

// 개별 차 조회
app.get('/cars/:id',(req,res) => {
    // 객체에서 id를 꺼내온다.
    let {id} = req.params
    // json 형태 arr는 배열이기에 index는 0부터 시작한다.
    // let car = cars[id-1]

    // 출력할 차를 담은 바구니
    var findcar = 
        // find 함수. 배열에서 사용한다.
        cars.find(c => (c.id == id))
        // cars 배열 안에 있는 객체 중, id 값이 params.id랑 같은 객체를 출력한다.

    if (findcar) {
        res.json(findcar)        
    }
    // 예외를 터트린다. = http status code 성공이 아니라 실패가 뜨게!
    else {
        res.status(404).json({
            message : "전달하신 ID로 저장된 CAR가 없습니다."
    })
    }



    // for each 사용
    // car을 사용하면 변수 이름이 같아서 헷갈리기에 매개변수를 c로 지정한다.
    // cars.forEach((c)=>{
    //     if (c.id == id) {
    //         findcar = c
    //     }
    // })


})
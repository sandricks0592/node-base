const express = require("express")
const app = express()
app.listen(1234)


// 진짜 저장이 가능하기에 js에서는 하나의 객체로 생각한다.
let db = new Map()

let NoteBook = {
    productName : "Notebook",
    price : 8000
}
let Cup = {
    productName : "Cup",
    price : 2000
}
let Chair = {
    productName : "Chair",
    price : 15000
}
let Poster = {
    productName : "Poster",
    price : 7000
}

db.set(1, NoteBook)
db.set(2, Cup)
db.set(3, Chair)
db.set(4,Poster)

console.log(db)
console.log(db.get(1))
console.log(db.get(2))
console.log(db.get(3))

// app.get 사용법 기억, 비구조화 기억, 타입 설정 기억, params는 const로 선언한거 기억
app.get('/:id',function(req,res){
    let {id} = req.params
    id = parseInt(id)
    console.log(db.get(id))
    res.json(db.get(id))

    if (db.get(id) == undefined) {
        res.json({
            message: "없는 상품입니다."
        })
    } else {
        product = db.get(id)
        product["id"] = id //product.id = id
        // 사용자가 상품을 조회했을 때 "이 상품의 번호는 2번입니다"라는 정보까지 포함해서 보내주기 위해 객체에 새로운 속성(id)을 추가한 것입니다.

        res.json(product)
    }
})

console.log(db)
// 필요한 데이터를 꺼낼때는 get(키값)을 사용한다.
console.log(db.get(1))
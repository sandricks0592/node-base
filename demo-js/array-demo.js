// 자바스크립트의 비구조화

const arr = [1,2,3,4,5]

const [,num2,num3, ,num5] = arr

console.log(num2,num3, num5)
// 배열의 비구조화는 인덱스 값이 있기때문에 순서대로 들어간다.
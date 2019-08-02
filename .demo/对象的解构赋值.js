var obj = {
  name:"tom",
  age:18,
  gender:"男",
  address:"天河区"
}

var {address,...tom}=obj

console.log(tom)
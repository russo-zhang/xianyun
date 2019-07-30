function Stu(name,age,gender){
  this.name= name
  this.age=age
  this.gender=gender
  this.sayHi=say
}

function say(){
  console.log("大家好,我是"+this.name)
}

var kk = new Stu("坤坤",18,"男")
var tom = kk
tom.name="tom"
// function fn(obj){
//   obj.name="rose"
//   obj.sayHi()
// }

function fn(obj){
  obj=new Stu("jerry",19,"男")
  obj.sayHi()
}

fn(kk)
kk.sayHi()
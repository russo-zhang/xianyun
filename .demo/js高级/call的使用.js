function Stu(name, age, gender) {
  this.name = name
  this.age = age
  this.gender = gender
}

Stu.prototype.say = function say() {
  console.log("大家好,我是" + this.name)
}

var tom = new Stu("tom","18","男")


tom.say()
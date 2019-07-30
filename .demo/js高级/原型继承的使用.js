Object.xiaoxinxin=function(){
  console.log("我是小鑫鑫")
}

var obj={
  name:"tom"
}
console.log(obj.__proto__===Object.prototype)
obj.__proto__.__proto__.prototype.xiaoxinxin()
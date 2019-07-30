function Star(data){
  // console.log("我喜欢"+data)
  this.say=()=>{
    console.log("大家好,我是练习长达两年半的练习生坤坤,我喜欢"+data)
  }
}

var kk = new Star(["唱","跳","rap","篮球"])

Star.prototype.say=()=>{
  console.log("大家好")
}

kk.say()

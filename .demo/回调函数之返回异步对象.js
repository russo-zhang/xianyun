var data={
  name:"tom",
  age:18,
  gender:"男"
}

var res={
  end(data){
    setTimeout(function(){
      success(data)
    },2000)
  }
}

res.end(data)


function success(res){
  console.log(res)
}
console.log(123)




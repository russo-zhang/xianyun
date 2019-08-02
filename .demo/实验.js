function getRandom(){
  var num = Math.random()
  if(num<=0.3333333333333333){
    return 1
  }else if (num<=0.6666666666666666){
    return 2
  }else if(num<=0.9999999999999999){
    return 3
  }else{
    getRandom()
  }
}
var change=0
var not=0
console.log("------------------------")
for(var i=0 ;i<=10;i++){
  var num_car=getRandom() 
  var num_pick=getRandom() 
  for(var j=1;j<=3;j++){
    if(num_pick!=j){
      for(var q=1;q<=3;q++){
        if(num_car!=q){
          if(num_car===num_pick){
            console.log("不换的概率")
          }
        }
      }
    }
  }



}
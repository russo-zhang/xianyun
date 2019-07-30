var arr = [1,2,3,4,5]

var new_arr=arr.map((item,index)=>{
  return item*2
})

var arr2 = arr.filter((item,index)=>{
  
  return item*3
})

console.log(new_arr)
console.log(arr2)
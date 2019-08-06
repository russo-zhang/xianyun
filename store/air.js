export const state=()=>{
  return {
    history:[
      {
      departCity: "北京",
      departCode: "111",
      destCity: "上海",
      destCode: "222",
      departDate: "2019-08-05"
      }
    ]
  }
}

export const mutations={
  searchHistory(state,data){
    state.history=data
    // console.log(data)
  }
}
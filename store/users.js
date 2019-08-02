export const state =()=>{
  return  {

    userInfo: {
      token: "",
      user: {
        nickname:""
      }
    }
  
  
  }
}

export const mutations = {
  // 更新用户信息
  updataUserInfo(state,data){
    state.userInfo=data
  },
  // 清除用户信息
  clearUserInfo(state){
    state.userInfo={
      token: "",
      user: {
        nickname:""
      }
    }
  }

}

export const actions = {

}
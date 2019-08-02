<template>
  <div>
    <div
      class="main"
      :style="`background: url(${$axios.defaults.baseURL}/assets/images/th01.jfif) no-repeat center center`"
    >
      <ul>
        <li 
        v-for="(item,index) in ['登录','注册']" :key="index"
         @click="switchTab(index)"
         :class="{active:current==index}"
        >{{item}}</li>
        <LoginForm v-if="current==0"/>
        <RegisterForm v-if="current==1"/>
      </ul>
    </div>
  </div>
</template>
 
<script>
import LoginForm from "@/components/users/loginForm";
import RegisterForm from "@/components/users/registerForm";
export default {
   data() {
      return {
         current:0
      }
   },
   methods: {
      switchTab(index){
         this.current=index
      }
   },
  components: {
    LoginForm,
    RegisterForm
  }
};
</script>
 
<style lang='less' scoped>
.main {
  height: 700px;
  display: flex;
  justify-content: center;
//   align-items: center;

  ul {
    background: #ededed;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    width: 400px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    margin-top:100px;
    .active{
       background: white;
    }
    li {
       width: 200px;
      cursor: pointer;
      color: #333;
    }
  }
}
</style>
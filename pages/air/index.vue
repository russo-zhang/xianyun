<template>
<div>
  <p>这是首页</p>
   <div class="tab" >
       <span v-for="(item,index) in title" :key="index" @click="hendleClick(index)">{{item}}</span>
   </div>
   <div class="page">
     <span v-for="(item,index) in page" :key="index" v-show="index==isShow">{{item}}</span>
   </div>
</div>
</template>
 
<script>
export default {
  data() {
    return {
      title:["新闻","视频","图片","知道","文库"],
      page:[1111111,22222222,333333333,44444444,5555555],
      isShow:0
    }
  },
  methods: {
    hendleClick(index){
      this.isShow=index
    }
  },
 
}
</script>
 
<style>
 .tab span{
     border: 1px solid gold;
     margin: 10px ;
     cursor: pointer;
   }
</style>
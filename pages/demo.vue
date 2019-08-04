<template>
  <div>
    <ul>
      <li v-for="(item,index) in [111,222,333,444,555]" :key="index" @click="isShow=!isShow">
        <span v-if="isShow">{{item}}</span>
      </li>
    </ul>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      isShow: true
    };
  }
};
</script>
 
<style lang='less' scoped>
</style>
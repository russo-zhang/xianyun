<template>
<div>
   <ul>
     <li>
       <p>11</p>
     </li>
     <li>
       <p>22</p>
     </li>
     <li>
       <p>33</p>
     </li>
     <li>
       <p>44</p>
     </li>
     <li>
       <p>55</p>
     </li>
   </ul>
</div>
</template>
 
<script>
export default {
 
}
</script>
 
<style lang='less' scoped>
 ul{
   li{
     p{
       color:red;
     }
     &:nth-child(3){
     p{
       color:yellow;
     }
   }
   }
   
 }
</style>
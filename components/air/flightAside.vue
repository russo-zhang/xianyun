<template>
  <div>
    <el-aside width="240px">
      <!-- 保证 -->
      <div class="insure">
        <el-row type="flex" class="insureMain" align="middle">
          <el-col :span="8">
            <i class="el-icon-medal"></i>
            <p>航协认证</p>
          </el-col>
          <el-col :span="8">
            <i class="iconfont icon-dun"></i>
            <p>出行保证</p>
          </el-col>
          <el-col :span="8">
            <i class="el-icon-phone"></i>
            <p>7x24</p>
          </el-col>
        </el-row>
        <div class="phone">免费客服电话 : 4006345678转2</div>
      </div>

      <!-- 历史查询 -->
      <div class="history">
        <div class="query">历史查询</div>
        <div class="historyList" v-for="(item,index) in $store.state.air.history" :key="index">
          <el-row type="flex" justify="space-between" align="middle">
            <el-col :span="17">
              <p>{{item.departCity}} - {{item.destCity}}</p>
              <em>{{item.departDate}}</em>
            </el-col>
            <el-col :span="7">
              <nuxt-link :to="`/air/flights?departCity=${item.departCity}&departCode=${item.departCode}&destCity=${item.destCity}&destCode=${item.destCode}&departDate=${item.departDate}`" :style="`background:url(${item.cover})`">
                选择
              </nuxt-link>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-aside>
  </div>
</template>
 
<script>
export default {
  mounted(){
  }
};
</script>
 
<style lang='less' scoped>
.el-aside {
  .insure {
    margin: 15px 0;
    border: 1px solid #ccc;
    .insureMain {
      padding: 15px;
      /deep/.el-col-8 {
        text-align: center;
        i {
          color: #429efd;
          font-size: 30px;
        }
        p {
          font-size: 12px;
          margin-top: 10px;
        }
        &:nth-child(2) {
          i {
            color: #007f0a;
          }
        }
      }
    }
    .phone {
      background: #f5f5f5;
      height: 30px;
      line-height: 30px;
      padding-left: 10px;
    }
  }
  .history {
    border: 1px solid #ccc;
    padding: 15px 10px;
    .query {
      border-bottom: 1px solid #ccc;
      padding: 0px 0 15px;
      font-size: 16px;
    }
    .historyList {
      padding: 10px 0;
      border-bottom: 1px solid #ccc;
      &:last-child{
        border-bottom:none;
      }
      p {
        height: 20px;
      }
      em {
        font-size: 10px;
        color: #333;
        
      }
      a{
        display: block;
        font-size: 12px;
        width: 30px;
        height: 16px;
        text-align: center;
        color:white;
        background-color: #fea410 !important;
        border-radius: 3px;
      }
    }
  }
}
</style>
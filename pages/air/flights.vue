<template>
  <div class="main">
    <el-container>
      <!-- 主体 -->
      <el-main>
        <!-- 选择器 -->
        <FlightSelecter :data="cache_flights" @get_pick_flights="get_pick_flights"/>

        <!-- 航班信息头部 -->
        <el-row class="flightHeader">
          <el-col :span="6">
            <span>航空信息</span>
          </el-col>
          <el-col :span="6">
            <span>起飞时间</span>
          </el-col>
          <el-col :span="6">
            <span>到达时间</span>
          </el-col>
          <el-col :span="6">
            <span>价格</span>
          </el-col>
        </el-row>

        <!-- 航班信息 -->
        <FlightInfo v-for="(item,index) in singlePage" :key="index" :flightInfo="item" />

        <!-- 分页器 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[3,5,10,15]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalFlight"
        ></el-pagination>
      </el-main>

      <!-- 右侧边 -->
        <FlightAside/>
    </el-container>
  </div>
</template>
 
<script>
import FlightSelecter from "@/components/air/flightSelecter";
import FlightInfo from "@/components/air/flightInfo";
import FlightAside from "@/components/air/flightAside";

export default {
  data() {
    return {
      flights: [],
      searchInfo: {},
      currentPage: 1,
      pageSize: 5,
      totalFlight: 0,
      singlePage: [],
      cache_flights:{
        info:{},
        options:{}
      }
    };
  },
  methods: {
    // 获取所有航班信息
    async getFlight() {
      let res = await this.$axios({
        url: "/airs",
        params: this.$route.query
      });
      this.searchInfo = this.$route.query;
      this.flights = res.data.flights;
      this.cache_flights ={...res.data};
      this.totalFlight = this.flights.length;
      this.singlePage = this.flights.slice(0, this.pageSize);
      // console.log(this.cache_flights);
    },

    // 获取过滤后的数据
    get_pick_flights(pick_flights){
      this.flights=pick_flights
      this.totalFlight=pick_flights.length
      this.getSinglePageData()
    },

    // 改变每页条数
    handleSizeChange(index) {
      this.pageSize = index;
      this.getSinglePageData();
    },
    // 改变当前页码
    handleCurrentChange(index) {
      this.currentPage = index;
      this.getSinglePageData();
    },

    // 获取单页数据
    getSinglePageData() {
      this.singlePage = this.flights.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    }
  },
  watch: {
    $route(){
      this.getFlight()
    }
  },
  mounted() {
    this.getFlight();
  },
  components: {
    FlightSelecter,
    FlightInfo,
    FlightAside
  }
};
</script>
 
<style lang='less' scoped>
.main {
  width: 1000px;
  margin: 0 auto;

  .el-main {
    color: #333;
    text-align: center;
    line-height: 40px;
    .select {
      margin-left: -12px;
    }
    .flightHeader {
      border: 1px solid #ccc;
      font-size: 12px;
      background-color: #f5f5f5;
      margin: 15px 0;
    }
    .flight {
      background-color: #fefefe;
      border: 1px solid #ccc;
      .time {
        font-size: 24px;
        margin: 10px 0 -15px;
      }
      .airport {
        font-size: 12px;
        color: #989898;
        margin: -15px 0 5px;
      }
      .duration {
        padding-bottom: 15px;
        border-bottom: 1px solid #f1f1f1;
      }
      .price {
        font-size: 24px;
        color: #fea83d;
      }
    }
  }
}
</style>
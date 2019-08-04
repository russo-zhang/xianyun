<template>
  <div class="main">
    <el-container>
      <!-- 主体 -->
      <el-main>
        <!-- 选择器 -->
        <el-row :gutter="20" align="middle">
          <el-col :span="8">
            <div>单程:{{searchInfo.departCity}} - {{searchInfo.destCity}} / {{searchInfo.departDate}}</div>
          </el-col>
          <el-col :span="16">
            <div>
              <el-row :gutter="10">
                <el-col :span="6">
                  <div>
                    <el-select
                      v-model="pick_departAirport"
                      placeholder="起飞机场"
                      size="mini"
                      @change="selectDepAirport"
                    >
                      <el-option
                        v-for="item in departAirport"
                        :key="item"
                        :label="item"
                        :value="item"
                      ></el-option>
                    </el-select>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div>
                    <el-select v-model="departTime" placeholder="起飞时间" size="mini">
                      <el-option
                        v-for="item in departTime"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div>
                    <el-select v-model="flightsFirm" placeholder="航空公司" size="mini">
                      <el-option
                        v-for="item in flightsFirm"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div>
                    <el-select v-model="airplaneType" placeholder="机型" size="mini">
                      <el-option
                        v-for="item in airplaneType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>

        <!-- 筛选按钮 -->
        <el-row justify="satrt" align="middle" type="flex">
          <el-col :span="4">
            <span class="select">筛选:</span>
            <el-tooltip class="item" effect="dark" content="撤销" placement="right">
              <el-button type="info" icon="el-icon-delete" circle size="mini"></el-button>
            </el-tooltip>
          </el-col>
        </el-row>

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
          <div class="historyList">
            <el-row type="flex" justify="space-between" align="middle">
              <el-col :span="17">
                <p>广州 - 北京</p>
                <em>2019-08-13</em>
              </el-col>
              <el-col :span="7">
                <el-button type="warning" size="mini">选择</el-button>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-aside>
    </el-container>
  </div>
</template>
 
<script>
import FlightInfo from "@/components/air/flightInfo";
export default {
  data() {
    return {
      flights: [],
      pick_flights:[],
      departAirport: [],
      pick_departAirport: "",
      departTime: [],
      pick_departTime: "",
      flightsFirm: [],
      pick_flightsFirm: "",
      airplaneType: [],
      pick_airplaneType: "",
      searchInfo: {},
      currentPage: 1,
      pageSize: 5,
      totalFlight: 0,
      singlePage: []
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
      this.pick_flights = res.data.flights;
      this.totalFlight = this.flights.length;
      this.singlePage = this.flights.slice(0, this.pageSize);

      // 起飞机场
      this.departAirport = this.flights.map((item, index) => {
        return item.org_airport_name;
      });
      
      this.departAirport = [...new Set(this.departAirport)];
      console.log(this.flights);
    },

    // 筛选起飞机场
    selectDepAirport(departAirport) {
      this.pick_flights = this.flights.filter((item, index) => {
        if (item.org_airport_name === departAirport) return true;
      });
      this.handleCurrentChange(this.currentPage)
      this.handleSizeChange(this.pageSize)
      this.totalFlight=this.pick_flights.length;
    },

    // 改变每页条数
    handleSizeChange(index) {
      this.pageSize = index;
      this.singlePage = this.pick_flights.slice(0, index);
    },
    // 改变当前页码
    handleCurrentChange(index) {
      this.currentPage = index;
      this.singlePage = this.pick_flights.slice(
        (index - 1) * this.pageSize,
        index * this.pageSize
      );
    }
  },
  mounted() {
    this.getFlight();
  },
  components: {
    FlightInfo
  }
};
</script>
 
<style lang='less' scoped>
.main {
  width: 1000px;
  margin: 0 auto;
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
        margin-top: 10px;
        p {
          height: 30px;
        }
        em {
          font-size: 10px;
          color: #333;
        }
      }
    }
  }
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
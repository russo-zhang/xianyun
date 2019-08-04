<template>
  <div class="content">
    <!-- 航班信息 -->
    <el-row class="flightList" @click.native="isShowMore=!isShowMore">
      <!-- 航班信息内容 -->
      <el-row class="flight" align="middle" type="flex">
        <el-col :span="6">
          <span>{{flightInfo.airline_name}} {{flightInfo.flight_no}}</span>
        </el-col>
        <el-col :span="12">
          <el-row align="middle" type="flex">
            <el-col :span="8">
              <p class="time">{{flightInfo.dep_time}}</p>
              <p class="airport">{{flightInfo.org_airport_name}}</p>
            </el-col>
            <el-col :span="8">
              <span class="duration">{{duration}}</span>
            </el-col>
            <el-col :span="8">
              <p class="time">{{flightInfo.arr_time}}</p>
              <p class="airport">{{flightInfo.dst_airport_name}}</p>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6">
          <span>
            ¥
            <em class="price">{{flightInfo.base_price}}</em>起
          </span>
        </el-col>
      </el-row>

      <!-- 推荐航班 -->
      <el-row type="flex" align="middle" class="recommendation" v-if="isShowMore">
        <el-col :span="4">
          <span>低价推荐</span>
        </el-col>

        <!-- 具体航班公司及价格 -->
        <el-col :span="20" class="flightFirm">
          <el-row
            type="flex"
            align="middle"
            class="seats"
            v-for="(item,index) in flightInfo.seat_infos"
            :key="index"
          >
            <el-col :span="16">
              <em>{{item.group_name}} |</em>
              {{item.supplierName}}
            </el-col>
            <el-col :span="4">
              <span class="price">¥{{item.org_settle_price_child}}</span>
            </el-col>
            <el-col :span="4">
              <div>
                <el-button type="warning" size="mini">选定</el-button>
              </div>
              <span>剩余 : {{item.discount}}</span>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-row>
  </div>
</template>
 
<script>
export default {
  // props:["flightInfo"],
  props: {
    flightInfo: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      isShowMore: false,
      duration: 0
    };
  },
  methods: {
    getDuration() {
      let dep_time_arr = this.flightInfo.dep_time.split(":");
      let arr_time_arr = this.flightInfo.arr_time.split(":");
      if (arr_time_arr[0] * 1 < dep_time_arr[0] * 1) {
        arr_time_arr[0] = arr_time_arr[0] * 1 + 24;
      }
      arr_time_arr[0] * 1 < dep_time_arr[0] * 1
        ? (arr_time_arr[0] = arr_time_arr[0] * 1 + 24)
        : 0;
      let durationMin =
        arr_time_arr[0] * 60 +
        arr_time_arr[1] * 1 -
        (dep_time_arr[0] * 60 + dep_time_arr[1] * 1);
      let hours = Math.floor(durationMin / 60);
      let minutes = durationMin % 60;
      this.duration = hours + "小时" + minutes + "分钟";
    }
  },
  mounted() {
    // console.log(this.flightInfo)
    this.getDuration();
  }
};
</script>
 
<style lang='less' scoped>
.main {
  .flightList {
    margin: 10px 0;
    cursor: pointer;
    border: 1px solid #ccc;
    border-bottom: none;
    .flight {
      background-color: #fefefe;
      border-bottom: 1px solid #ccc;

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
    .recommendation {
      background-color: #f5f5f5;
      padding: 0 15px;
      box-sizing: border-box;
      border-bottom: 1px solid #ccc;
      .flightFirm {
        .seats {
          height: 80px;
          border-bottom: 1px solid #ccc;
          em {
            color: #61ae67;
          }
          &:last-child {
            border-bottom: none;
          }
        }
        .price {
          font-size: 20px;
          color: #fea83d;
        }
      }
    }
  }
}
</style>
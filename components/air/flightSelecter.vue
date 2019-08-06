<template>
  <div>
    <el-row :gutter="20" align="middle">
      <el-col :span="8">
        <div>单程:{{data.info.departCity}} - {{data.info.destCity}} / {{data.info.departDate}}</div>
      </el-col>
      <el-col :span="16">
        <el-row :gutter="10">
          <el-col :span="6">
            <el-select
              v-model="depAirport"
              placeholder="起飞机场"
              size="mini"
              @change="selectDepAirport"
            >
              <el-option
                v-for="item in data.options.airport"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-select v-model="depTime" placeholder="起飞时间" size="mini" @change="selectDepTime">
              <el-option
                v-for="(item,index) in data.options.flightTimes"
                :key="index"
                :label="`${item.from}:00 - ${item.to}:00`"
                :value="`${item.from}:00 - ${item.to}:00`"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-select v-model="firm" placeholder="航空公司" size="mini" @change="selectFirm">
              <el-option
                v-for="item in data.options.company"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-select v-model="size" placeholder="机型" size="mini" @change="selectSize">
              <el-option
                v-for="item in sizeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <!-- 筛选按钮 -->
    <el-row justify="satrt" align="middle" type="flex">
      <el-col :span="4">
        <span class="select">筛选:</span>
        <el-tooltip class="item" effect="dark" content="撤销" placement="right">
          <el-button type="info" icon="el-icon-delete" circle size="mini" @click="cancel"></el-button>
        </el-tooltip>
      </el-col>
    </el-row>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      depAirport: "",
      depTime: "",
      firm: "",
      size: "",
      flightTimes: [],
      sizeList: [
        { label: "大", value: "L" },
        { label: "中", value: "M" },
        { label: "小", value: "S" }
      ],
      pick_flights: []
    };
  },
  methods: {
    // 筛选起飞机场
    selectDepAirport(value) {
      // this.pick_flights = this.flights.filter((item, index) => {
      //   if (item.org_airport_name === value) return true;
      // });

      this.pick_flights = this.data.flights.filter((item, index) => {
        return item.org_airport_name === value;
      });

      this.$emit("get_pick_flights", this.pick_flights);
    },
    selectDepTime(value) {
      // console.log(value);
      value = value.split("-").map((item, index) => {
        return item.split(":");
      });
      let dep_hour = +value[0][0];
      let arr_hour = +value[1][0];
      this.pick_flights = this.data.flights.filter((item, index) => {
        let dep_time = +item.dep_time.split(":")[0];

        return dep_time >= dep_hour && dep_time < arr_hour;
      });

      this.$emit("get_pick_flights", this.pick_flights);
    },
    selectFirm(value) {
      this.pick_flights = this.data.flights.filter((item, index) => {
        return item.airline_name === value;
      });

      this.$emit("get_pick_flights", this.pick_flights);
    },
    selectSize(value) {
      this.pick_flights = this.data.flights.filter((item, index) => {
        return item.plane_size === value;
      });

      this.$emit("get_pick_flights", this.pick_flights);
    },
    cancel() {
      this.pick_flights = [...this.data.flights];
      this.$emit("get_pick_flights", this.pick_flights);
      this.depAirport= ""
      this.depTime= ""
      this.firm= ""
      this.size= ""
    }
  },
  mounted() {},
  props: {
    data: {
      type: Object,
      default: {}
    }
  }
};
</script>
 
<style lang='less' scoped>
.select {
  margin-left: -20px;
}
</style>
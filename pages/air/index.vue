<template>
  <div class="main">
    <!-- title -->
    <el-row type="flex">
      <el-col :span="4" justify="center">
        <div class="title">
          <i class="iconfont icon-airplane"></i>
          国内机票
        </div>
      </el-col>
    </el-row>

    <!-- 表单及图片 -->
    <el-row type="flex" justify="space-between">
      <!-- 表单 -->
      <el-col>
        <div class="search">
          <!-- 表单头部 -->
          <el-row type="flex" align="middle">
            <el-col :span="12" justify="center" @click.native="single(0)">
              <div :class="['single','trip',{active:current==0}]">
                <i class="iconfont icon-airplane"></i>
                单程
              </div>
            </el-col>
            <el-col :span="12" justify="center" @click.native="double(1)">
              <div :class="['single','trip',{active:current==1}]">
                <i class="iconfont icon-airplane"></i>
                往返
              </div>
            </el-col>
          </el-row>

          <!-- 表单内容 -->
          <el-row type="flex">
            <el-col justify="center">
              <div>
                <el-form ref="form" :model="form" label-width="70px" class="form">
                  <el-row type="flex" align="middle" justify="center">
                    <el-form-item label="出发城市">
                      <el-col :span="24">
                        <el-autocomplete
                          class="inline-input"
                          v-model="form.departCity"
                          :fetch-suggestions="searchDepartCity"
                          placeholder="请输入出发城市"
                          :trigger-on-focus="false"
                          @select="selectDepartCity"
                        ></el-autocomplete>
                      </el-col>
                    </el-form-item>
                  </el-row>
                  <el-row type="flex" align="middle" justify="center">
                    <el-form-item label="到达城市">
                      <el-col :span="24">
                        <el-autocomplete
                          class="inline-input"
                          v-model="form.destCity"
                          :fetch-suggestions="searchDestCity"
                          placeholder="请输入到达城市"
                          :trigger-on-focus="false"
                          @select="selectDestCity"
                        ></el-autocomplete>
                      </el-col>
                    </el-form-item>
                  </el-row>
                  <el-row type="flex" align="middle" justify="center">
                    <el-form-item label="出发时间" style="margin-left:4%">
                      <el-col :span="24">
                        <el-date-picker
                          type="date"
                          placeholder="选择日期"
                          v-model="form.departDate"
                          @change="pickDate"
                          style="width: 95%"
                        ></el-date-picker>
                      </el-col>
                    </el-form-item>
                  </el-row>
                  <el-form-item>
                    <el-button type="success" class="btn" @click="search">搜索</el-button>
                  </el-form-item>
                </el-form>
                <div class="exchangeLine">
                  <i @click="exchange">换</i>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>

      <!-- 图片 -->
      <el-col>
        <div class="brand">
          <img src="http://157.122.54.189:9093/images/pic_sale.jpeg" alt />
        </div>
      </el-col>
    </el-row>

    <!-- 保证 -->
    <el-row type="flex" class="insure">
      <el-col :span="8" justify="center">
        <i class="iconfont icon-renzheng"></i>
        100%航协认证
      </el-col>
      <el-col :span="8" justify="center">
        <i class="iconfont icon-dun"></i>
        出行保证
      </el-col>
      <el-col :span="8" justify="center">
        <i class="el-icon-phone"></i>
        7x24小时
      </el-col>
    </el-row>

    <!-- 特价机票标题 -->
    <el-row type="flex">
      <el-col :span="4" justify="center">
        <div class="discount">
          <i class="iconfont icon-jipiaotejia"></i>
          特价机票
        </div>
      </el-col>
    </el-row>

    <!-- 特价机票内容 -->
    <el-row type="flex" class="discount_content">
      <el-col
        :span="6"
        justify="center"
        alian="middle"
        v-for="(item,index) in discount"
        :key="index"
      >
        <div>
          <nuxt-link :to="`/air/flights?departCity=${item.departCity}&departCode=${item.departCode}&destCity=${item.destCity}&destCode=${item.destCode}&departDate=${item.departDate}`" :style="`background:url(${item.cover})`">
            <div class="text">
              <i>{{item.departCity+"-"+item.destCity}}</i>
              <em>¥{{item.price}}</em>
            </div>
          </nuxt-link>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
 
<script>
import moment from "moment";
export default {
  data() {
    return {
      form: {
        departCity: "",
        departCode: "",
        destCity: "",
        destCode: "",
        departDate: ""
      },
      discount: [],
      current: 0
    };
  },
  methods: {
    // 切换到单程
    single(index) {
      // console.log(index);
      this.current = index;
    },
    // 切换到往返
    double(index) {
      // console.log(index);
      // this.current = index;
      this.$message.warning("暂不支持往返,请使用APP查询!");
    },
    // 查找出发城市列表
    async searchDepartCity(queryString, callback) {
      if (!queryString) return;
      let res = await this.$axios({
        url: "/airs/city",
        params: { name: queryString }
      });
      // console.log(res)
      if (res.data.data.length === 0)
        return this.$message.warning("查找不到这个城市");
      let arr = res.data.data.map((item, index) => {
        item.value = item.name.replace("市", "");
        return item;
      });
      this.form.departCity = arr[0].value;
      this.form.departCode = arr[0].sort;
      callback(arr);
    },
    // 选择出发城市
    selectDepartCity(cityData) {
      this.form.departCity = cityData.value;
      this.form.departCode = cityData.sort;
    },
    // 查找到达城市列表
    async searchDestCity(queryString, callback) {
      if (!queryString) return;
      let res = await this.$axios({
        url: "/airs/city",
        params: { name: queryString }
      });
      // console.log(res)
      if (res.data.data.length === 0)
        return this.$message.warning("查找不到这个城市");
      let arr = res.data.data.map((item, index) => {
        item.value = item.name.replace("市", "");
        return item;
      });
      this.form.destCity = arr[0].value;
      this.form.destCode = arr[0].sort;
      callback(arr);
    },
    // 选择到达城市
    selectDestCity(cityData) {
      this.form.destCity = cityData.value;
      this.form.destCode = cityData.sort;
    },
    // 选择日期
    pickDate(date) {
      this.form.departDate = moment(date).format("YYYY-MM-DD");
    },
    // 交换出发与到达城市
    exchange() {
      let { departCity, departCode, destCity, destCode } = this.form;
      this.form.departCity = destCity;
      this.form.departCode = destCode;
      this.form.destCity = departCity;
      this.form.destCode = departCode;
    },
    // 搜索机票
    search() {
      this.$router.push({
        path: "/air/flights",
        query: this.form
      });
      // console.log(this.form)
      console.log(this.$store.state.air.history);
      let history = JSON.parse(JSON.stringify(this.$store.state.air.history));

      history.unshift(this.form);
      history.length = 5;
      this.$store.commit("air/searchHistory", history);
    },

    // 获取打折数据
    async getDiscountData() {
      let res = await this.$axios({ url: "/airs/sale" });
      // console.log(res);
      if (res.status != 200) return;
      this.discount = res.data.data;
      this.discount[0].cover = this.discount[1].cover;
    }
  },
  mounted() {
    this.getDiscountData();
  }
};
</script>
 
<style lang='less' scoped>
.main {
  width: 1000px;
  margin: 0 auto;
  .title {
    font-size: 22px;
    text-align: center;
    line-height: 26px;
    color: #fea410;
    margin: 20px 0;
    .icon-airplane {
      font-size: 26px;
    }
  }
  .search {
    width: 360px;
    height: 350px;
    border: 1px solid #ccc;
    position: relative;
    .trip {
      height: 48px;
      line-height: 48px;
      text-align: center;
      background-color: #ededed;
      cursor: pointer;
    }
    .active {
      background-color: white;
    }
    .form {
      padding: 15px 50px 15px 15px;
      .btn {
        width: 200px;
        margin-left: 10px;
      }
    }
    .exchangeLine {
      width: 20px;
      height: 58px;
      position: absolute;
      top: 36px;
      right: 36px;
      border: 1px solid #ccc;
      border-left: none;
      i {
        position: absolute;
        top: 17px;
        right: -8px;
        font-size: 12px;
        padding: 2px;
        color: white;
        background: gray;
        cursor: pointer;
      }
    }
  }
  .brand {
    width: 620px;
  }
  .insure {
    text-align: center;
    padding: 10px 0;
    margin: 15px 0px;
    font-size: 18px;
    border: 1px solid #ccc;
    div {
      height: 36px;
      line-height: 36px;
      vertical-align: middle;
      &:nth-child(2) {
        border-left: 1px solid #ccc;
        border-right: 1px solid #ccc;
      }
      i {
        font-size: 18px;
        color: #429efd;
      }
      &:nth-child(2) {
        i {
          color: #007f0a;
        }
      }
    }
  }
  .discount {
    font-size: 22px;
    text-align: center;
    line-height: 26px;
    color: #429efd;
    margin: 20px 0;
    i {
      font-size: 30px;
    }
  }
  .discount_content {
    height: 180px;
    border: 1px solid #ccc;
    margin-bottom: 50px;
    padding: 15px;
    a {
      width: 225px;
      height: 140px;
      display: block;
      position: relative;

      .cover {
        width: 90%;
      }
      .text {
        position: absolute;
        color: white;
        bottom: 0;
        width: 100%;
        height: 24px;
        background-color: rgba(0, 0, 0, 0.5);
        box-sizing: border-box;
        line-height: 24px;
        padding: 0 15px;
        em {
          font-size: 18px;
          float: right;
        }
      }
    }
    &:last-child {
      padding-right: 0;
    }
  }
}
</style>
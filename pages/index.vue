<template>
  <div class="contaner">
    <!-- 搜索框 -->
    <div class="search">
      <div class="search_navs">
        <span
          v-for="(item,index) in search_navs_list"
          :key="index"
          @click="swichNavs(item.placeholder,index)"
          :class="{active:current==index}"
        >
          <i>{{item.title}}</i>
        </span>
      </div>
      <div class="search_case">
        <el-input :placeholder="placeholder" v-model="search_text" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
    </div>

    <!-- 轮播图 -->
    <el-carousel width="100%" height="700px">
      <el-carousel-item v-for="item in bgImgUrl" :key="item">
        <div
          class="main"
          :style="`background:url(${$axios.defaults.baseURL+item}) no-repeat center center`"
        ></div>
      </el-carousel-item>
    </el-carousel>

  </div>
</template>
 
<script>
export default {
  data() {
    return {
      bgImgUrl: [
        "/assets/images/th01.jfif",
        "/assets/images/th02.jfif",
        "/assets/images/th03.jfif"
      ],
      search_navs_list: [
        { title: "攻略", placeholder: "搜索城市" },
        { title: "酒店", placeholder: "请输入城市搜索酒店" },
        { title: "机票", placeholder: "" }
      ],
      placeholder: "搜索城市",
      search_text: "",
      current: 0
    };
  },
  methods: {
    swichNavs(placeholder, index) {
      this.placeholder = placeholder;
      this.current = index;
      if (index == 2) {
        this.$router.push("/air");
      }
    }
  }
};
</script>
 
<style lang='less' scoped>
.contaner {
  position: relative;

  .main {
    width: 100%;
    height: 700px;
  }
  .search {
    width: 500px;
    height: 84px;
    position: absolute;
    top: 50%;
    left: 50%;
    // margin-left: -250px;
    // margin-top: -42px;
    transform: translate(-50%, -50%);
    z-index: 99;
    .search_navs {
      display: flex;

      span {
        width: 80px;
        height: 35px;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 1px 40px 1px 40px;
        text-align: center;
        line-height: 35px;
        cursor: pointer;
        i {
          color: white;
        }
      }
      .active {
        background: white;
        i {
          color: black;
        }
      }
    }
  }
}
</style>
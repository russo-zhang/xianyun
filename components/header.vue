<template>
  <div class="header_box">
    <header>
      <el-row type="flex" justify="space-between">
        <div class="logo">
          <h1>
            <nuxt-link to="/">
              <img src="http://157.122.54.189:9093/images/logo.jpg" alt />
            </nuxt-link>
          </h1>
        </div>
        <div class="navs">
          <nuxt-link :to="item.url" v-for="(item,index) in navsList" :key="index">{{item.page}}</nuxt-link>
        </div>
        <div class="user">
          <el-dropdown v-if="$store.state.users.userInfo.user.nickname">
            <span class="el-dropdown-link">
              <img src="http://157.122.54.189:9095/assets/images/avatar.jpg" alt />
              {{$store.state.users.userInfo.user.nickname}}
              <i
                class="el-icon-arrow-down el-icon--right"
              ></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <nuxt-link to="/users">个人中心</nuxt-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <nuxt-link to="/login" @click.native="quit">退出</nuxt-link>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span class="el-dropdown-link" v-else>
            <nuxt-link to="/login">登录/注册</nuxt-link>
          </span>
        </div>
      </el-row>
    </header>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      navsList: [
        { url: "/", page: "首页" },
        { url: "/post", page: "旅游攻略" },
        { url: "/hotel", page: "酒店" },
        { url: "/air", page: "国内机票" }
      ]
    };
  },
  methods: {
    quit() {
      this.$store.commit("users/clearUserInfo");
    }
  },
  mounted() {
    // console.log(this.$store.state.users.userInfo.user.nickname)
  }
};
</script>
 
<style  scoped lang='less'>
@colorBl: #429efd;
.header_box {
  border-bottom: 1px solid #ccc;
  header {
    width: 1000px;
    height: 60px;
    line-height: 60px;
    vertical-align: middle;
    margin: 0 auto;
    .logo {
      align-self: center;
      margin-right: 20px;
      h1 {
        img {
          width: 156px;
          display: block;
        }
      }
    }
    .navs {
      display: flex;
      flex: 1;
      > a {
        display: block;
        padding: 0 20px;
        height: 60px;
        box-sizing: border-box;
        &:hover {
          color: @colorBl;
          border-bottom: 6px solid @colorBl;
        }
      }
    }
    .user {
      cursor: pointer;
      .el-dropdown-link {
        vertical-align: middle;
        img {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          vertical-align: middle;
        }
        a {
          background-color: white;
          color: black;

          &:hover {
            color: black !important;
            background-color: white !important;
          }
        }
      }
    }
  }
}
.nuxt-link-exact-active {
  background-color: @colorBl;
  color: white;
  &:hover {
    color: white !important;
  }
}
</style>
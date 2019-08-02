<template>
  <div>
    <el-form ref="form" :model="form" class="form" :rules="rules">
      <el-form-item prop="username">
        <el-input v-model="form.username"  placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="form.password"  placeholder="请输入密码"></el-input>
      </el-form-item>
      <span>忘记密码</span>
      <el-form-item>
        <el-button type="primary" @click="login" style="width:360px">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          {
            pattern: /^1[3,5,7,8]\d{9}$/,
            message: "手机号格式不正确",
            trigger: "blur"
          }
        ],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    login() {
      this.$refs.form.validate(async valid => {
        if (!valid) return this.$message.error("账号或密码格式不正确");
        let res = await this.$axios({
          url: "/accounts/login",
          method: "POST",
          data: this.form
        });
        console.log(res);
        if (res.status != 200)
          return this.$message.error("账号或密码不正确");
        this.$store.commit("users/updataUserInfo", res.data);
        this.$router.push("/");
      });
    }
  }
};
</script>
 
<style lang='less' scoped>
.form {
  width: 400px;
  background-color: white;
  padding: 40px 20px 10px 20px;
  box-sizing: border-box;
  span {
    float: right;
    color: #429efd;
    font-size: 12px;
    margin-top: -20px;
    cursor: pointer;
  }
}
</style>
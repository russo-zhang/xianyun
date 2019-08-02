<template>
  <div>
    <el-form ref="form" :model="form" class="form" :rules="rules">
      <el-form-item prop="username">
        <el-input v-model="form.username" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item prop="captcha">
        <el-input v-model="form.captcha" class="captcha" placeholder="验证码"></el-input>
        <el-button
          type="success"
          @click="sendCaptcha"
          style="width:110px"
          :disabled="disabled"
        >{{captchaCode||"发送验证码"}}</el-button>
      </el-form-item>
      <el-form-item prop="nickname">
        <el-input v-model="form.nickname" placeholder="你的名字"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="form.password" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input v-model="form.checkPass" placeholder="确认密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="register" style="width:360px">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
 
<script>
export default {
  data() {
    var validatePass=(rule,value,callback)=>{
      if(value===""){
        callback(new Error("请再次输入密码"))
      }else if(value !==this.form.password){
        callback(new Error("两次输入密码不一致"))
      }else{
        callback()
      }
    }
    return {
      form: {
        username: "13500000000",
        captcha:"000000",
        nickname:"123",
        password:"",
        checkPass:""
      },
      captchaCode: 0,
      disabled: false,
      rules: {
        username: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          {
            pattern: /^1[3,5,7,8]\d{9}$/,
            message: "手机号格式不正确",
            trigger: "blur"
          }
        ],
        captcha: [
          { required: true, message: "验证码不能为空", trigger: "blur" }
        ],
        nickname: [
          { required: true, message: "名字不能为空", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" }
        ],
        checkPass: [
          {validator:validatePass,trigger:"blur"}
        ]
      }
    };
  },
  methods: {
    sendCaptcha() {
      this.$refs.form.validateField("username", async valid => {
        if (valid) return this.$message.warning("手机号格式错误");
        let res = await this.$axios({
          url: "/captchas",
          method: "POST",
          data: { tel: this.form.username }
        });
        //  console.log(res)
        this.disabled = true;
        this.captchaCode = 10;
        var timer = setInterval(() => {
          this.captchaCode--;
          if (this.captchaCode == 0) {
            this.captchaCode = "发送验证码";
            this.disabled = false;
            clearInterval(timer);
          }
        }, 200);
        this.$message({
          message: `验证码为 ${res.data.code}`,
          type: "success",
          duration: 10000
        });
      });
    },
    register() {
      this.$refs.form.validate(async valid => {
        if (!valid) return this.$message.warning("注册失败,请检查");
        let {checkPass,...data}=this.form
        let res = await this.$axios({
          url: "/accounts/register",
          method: "POST",
          data
        });
        // console.log(res);
        let userData= res.data
        this.$store.commit("users/updataUserInfo",userData)
        this.$router.push("/")
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

  /deep/.captcha {
    width: 245px;
  }

  span {
    float: right;
    color: #429efd;
    font-size: 12px;
    margin-top: -20px;
    cursor: pointer;
  }
}
</style>
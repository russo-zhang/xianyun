<template>
  <div>
    <el-container>
      <el-main>
        <!-- 乘机人 -->
        <div class="passenger">
          <div class="title">乘机人</div>
          <div class="passengerForm">
            <p>乘机人类型</p>
            <el-input placeholder="姓名" v-model="input3" class="input-with-select">
              <el-select v-model="select" slot="prepend" placeholder="成人">
                <el-option label="成人" value="1"></el-option>
                <el-option label="未成年人" value="2"></el-option>
              </el-select>
            </el-input>
          </div>
          <div class="passengerForm">
            <p>证件类型</p>
            <el-input placeholder="证件号码" v-model="input3" class="input-with-select">
              <el-select v-model="select" slot="prepend" placeholder="身份证">
                <el-option label="身份证" value="1"></el-option>
                <el-option label="护照" value="2"></el-option>
                <el-option label="驾照" value="3"></el-option>
              </el-select>
            </el-input>
          </div>
        </div>

        <!-- 添加乘机人 -->
        <div class="addPassenger">
          <el-button type="success">添加乘机人</el-button>
        </div>

        <!-- 保险 -->
        <div class="insure">
          <div class="title">保险</div>
          <el-row class="checkbox">
            <el-checkbox v-model="checked1" label="航空意外险：￥30/份×1  最高赔付260万" border></el-checkbox>
          </el-row>
          <el-row class="checkbox">
            <el-checkbox v-model="checked2" label="航空延误险：￥30/份×1  最高赔付300元" border></el-checkbox>
          </el-row>
        </div>

        <!-- 联系人 -->
        <div class="cantact">
          <div class="title">联系人</div>
          <el-form ref="form" :model="form" label-width="55px">
            <el-form-item label="姓名">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="手机">
              <el-input placeholder="请输入号码" v-model="form.name" class="input-with-select">
                <el-button slot="append">发送验证码</el-button>
              </el-input>
            </el-form-item>
            <el-form-item label="验证码">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="warning" @click="onSubmit" class="submit">提交订单</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-main>
      <el-aside width="350px">Aside</el-aside>
    </el-container>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      form: {},
      checked1:[],
      checked2:[]
    };
  },
  methods: {
    onSubmit(){

    }
  },
};
</script>
 
<style lang='less' scoped>
.el-container {
  width: 1000px;
  margin: 0 auto;
  .title {
    font: 600 26px simsun;
    margin-bottom: 30px;
  }
  .el-aside {
    background-color: #d3dce6;
    color: #333;
    text-align: center;
    margin-left: 60px;
  }

  .el-main {
    color: #333;
    .passenger {
      .passengerForm {
        p {
          margin: 10px 0;
        }
        /deep/.el-select .el-input {
          width: 130px;
        }
        /deep/.input-with-select .el-input-group__prepend {
          background-color: #fff;
        }
      }
    }
    .addPassenger {
      margin: 20px 0;
      padding: 20px 0;
      border-top: 1px dashed #ccc;
      border-bottom: 1px dashed #ccc;
    }
    .insure {
      .checkbox {
        margin-bottom: 20px;
      }
    }
    .cantact{
      margin: 30px 0;
      padding:20px 0;
      border-top: 1px dashed #ccc;
      border-bottom: 1px dashed #ccc;
      /deep/.el-input{
        width: 265px;
      }
      .submit{
        margin-top:30px;
        margin-left: 120px;
        width: 250px;
        height: 50px;
        text-align: center;
      }
    }
  }
}
</style>
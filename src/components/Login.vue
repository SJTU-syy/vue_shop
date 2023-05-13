<template>
  <div class="login_container">
    <!-- <p>登录组件</p> -->
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="">
      </div>
      <!-- 登录表单区域 -->
      <el-form ref="loginFormRef" :model="loginform" label-width="0px" class="loginform"
      :rules="LoginFormRules">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            placeholder="请输入账号"
            prefix-icon="iconfont icon-user"
            v-model="loginform.username">
          </el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            prefix-icon="iconfont icon-3702mima"
            v-model="loginform.password" type="password">
          </el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <div class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="primary">注册</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </div>
      </el-form>

    </div>
    <!-- <p>登录组件</p> -->
  </div>
</template>

<script>
export default {
  data() {
      return {
        loginform: {
          username: 'admin',
          password: '123456',
        },

        LoginFormRules:{
          // 第一部分表示具体规则,trigger是触发方式,这里是鼠标失去焦点
          username:[
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],//验证用户名
          password:[
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }

          ]//验证密码
        },


        
      }
    },
  methods: {
      onSubmit() {
        console.log('submit!');
      },
      //点击重置按钮,重置登录表单
      resetLoginForm(){
        // console.log(this);
        this.$refs.loginFormRef.resetFields();
      },
      login(){
        this.$refs.loginFormRef.validate(async valid=>{
          if(!valid)return;
          const {data:res} = await this.$http.post('login',this.loginform);
          //这是从返回体中同时定义res和data两个对象
          // console.log(data);
          if(res.meta.status !== 200){
            // return console.log('fail to login');
            console.log(res);
            return this.$message.error('登录失败!');
            
          }
          // console.log('success to login');
          window.sessionStorage.setItem('token',res.data.token);
          this.$router.push('/home');
          return this.$message.error('登录成功!')
          //编程式导航跳转

          // console.log(valid);
          //valid本身已经是预验证的结果,给validate传递的函数表示如何处理valid
        });
      }
    }
  }
</script>

<style lang="less" scoped>
.login_container{
  background-color: #2b4b6b;
  height: 100%;
}

.login_box{
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius:3px;

  position:absolute;
  left:50%;
  top:50%;

  transform: translate(-50%,-50%);
}

.avatar_box{
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position:absolute;
  left:50%;
  transform:translate(-50%,-50%);
  background-color: #fff;
  img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
}

.btns{
  display: flex;
  justify-content:flex-end;
}

.loginform{
  position: absolute;
  bottom: 0;
  width:100%;
  padding: 0 10px;
  box-sizing:border-box;
}

</style>

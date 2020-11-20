
<!--
/* @name: python管理后台系统
 * @Author: LiRunLiang
 * @Date: 2019-05-14 15:22:29
 * @Last Modified by: LiRunLiang
 * @Last Modified time: 2019-10-21 12:05:29
 */
 */
-->

<template>
  <div class="login-container">
    <img class="login-bg" src="../../static/img/home-bg.jpg" alt="">
    <div class="login-box tc absolute width">
      <h3 class="f-20 color-white mb-20">松炉设备检测后台管理系统</h3>
      <el-input placeholder="请输入帐号" v-model="loginForm.username">
        <template slot="prepend">帐号</template>
      </el-input>
      <el-input placeholder="请输入密码" type="password" class="mt-20" v-model="loginForm.password">
        <template slot="prepend">密码</template>
      </el-input>
      <el-button :type="loading ? 'info' : 'primary'" class="login-btn mt-20" @click="handleLogin">{{ loginStatus }}</el-button>
      <!-- <div class="pad-all-15 bg-white" v-if="codeSrc">
        <iframe
          @load="iframeLoad"
          :style="{ 'width': '300px', 'height': '400px' }"
          :src="codeSrc"
          scrolling="no"
          frameborder="0"
        ></iframe>
      </div> -->
    </div>
  </div>
</template>

<script>

import store from '../../store/index';
import { mapActions } from 'vuex';
export default {
  name: 'login',
  data () {
    return {
      codeSrc: '',
      loginForm: {
        username: '',
        password: ''
      },
      loginStatus: '登录',
      loginRules: {
        username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      passwordType: 'password',
      loading: false,
      showDialog: false,
      redirect: undefined
    };
  },
  created () {
  },

  methods: {
    // 用户登录
    handleLogin () {
      this.loading = true;
      this.loginStatus = '登录中...';
      this.login();
    },
    login () {
      if (!this.loginForm.username  || !this.loginForm.password ) {
        this.loading = false;
        this.loginStatus = '登录';
        return this.$message.error('请输入完整的帐号或密码');
      }

      let params = {
        username: this.loginForm.username,
        password: this.loginForm.password,
      }
      this.request().post(this.apiConfig.userLogin, params).then(res => {
        this.$message({
          message: '登录成功!',
          type: 'success'
        });
        localStorage.setItem("token", res.data.adminToken)
        store.commit('USER_INFO', res.data.admin)
        setTimeout(() => {
          this.$router.push({ path: 'reservationsList' });
        }, 500)
      }).catch(err => {
        this.loading = false;
        this.loginStatus = '登录';
        this.$message.error(err.msg);
      })
    }
  }
};
</script>

<style lang="scss" scoped>
$dark_gray: #889aa4;
$light_gray: #eee;
.login-container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.login-bg {
  width: 100vw;
}
.login-box {
  padding: 40px 20px;
  max-width: 450px;
  top: 40%;
  left: 50%;
  background: rgba($color: #000000, $alpha: .5);
  border-radius: 10px;
  transform: translateX(-50%) translateY(-50%);
  /deep/ {
    .el-button {
      width: 100%;
    }
  }
}
</style>

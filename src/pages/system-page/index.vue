<template>
  <div class="flex bg-white system-page">
    <!-- 菜单栏 -->
    <div class="left-menu">
      <el-menu
        :default-active="defaultActive"
        class="el-menu-vertical-demo"
        @select="handleOpen"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="reservationsList">
          <i class="el-icon-s-order"></i>
          <span slot="title">预约列表</span>
        </el-menu-item>
        <el-menu-item index="miniAppImgSet">
          <i class="el-icon-setting"></i>
          <span slot="title">图片设置</span>
        </el-menu-item>
        <el-menu-item index="contactMode">
          <i class="el-icon-guide"></i>
          <span slot="title">联系方式</span>
        </el-menu-item>
        <el-menu-item index="changePassword">
          <i class="el-icon-edit-outline"></i>
          <span slot="title">修改密码</span>
        </el-menu-item>
        <el-menu-item index="logOut">
          <i class="el-icon-back"></i>
          <span slot="title">退出登录</span>
        </el-menu-item>
      </el-menu>
    </div>

    <!-- 路由页面 -->
    <div class="flex-1 route-page-box" id="routeBox">

      <!-- 路由展现界面 -->
      <div class="pad-all-10 view-content">
        <div class="pad-all-10 bg-white content-box">
          <transition name="fade">
            <router-view v-loading="$store.state.getDataLoading" class="view-class" />
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import store from '../../store/index';
export default {
  components: {
  },
  props: {},
  data () {
    return {
      defaultActive: 'reservationsList',
      pathInfo: '',
      menuList: [
        { menuName: '修改密码' }
      ],
      lisyTypeMenu: []
    };
  },
  created () {
    this.defaultActive = this.$route.name
  },
  mounted () {

  },
  methods: {

    handleOpen (e) {
      // 登出
      if (e == 'logOut') {
        this.userLogOut()
        return
      }
      this.$router.push({ path: e });
    },

    // 用户登出
    userLogOut () {
      this.request('', { loading: true }).post(this.apiConfig.userLogOut).then(res => {
        this.$message({
          message: '登出成功!',
          type: 'success'
        });
        localStorage.removeItem("token")
        store.commit('USER_INFO', {})
        setTimeout(() => {
          this.$router.push({ path: 'login' });
        }, 500)
      }).catch(err => {
        this.$message.error(err.msg);
      })
    }

  },
  beforeDestroy () { }
};
</script>
<style scoped lang='scss'>
.system-page {
  min-width: 1000px;
  width: 100vw;
  height: 100vh;
}
.left-menu {
  width: 200px;
  height: 100vh;
  overflow-y: scroll;
  border-right: 1px solid #dcdee2;
  /deep/ {
    .el-menu {
      height: 100%;
    }
  }
}

// 路由
.route-page-box {
  background: #eeeeee;
  height: 100vh;
  overflow-y: scroll;
}

.view-content {
  min-height: 100vh;
  .content-box {
    min-height: calc(100vh - 20px);
    height: 100%;
    position: relative;
    border-radius: 6px;
    box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.08);
    .loading {
      position: absolute;
      border-radius: 6px;
      overflow: hidden;
      width: 100%;
      height: 100%;
      top: 0px;
      left: 0;
      z-index: 100;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  width: 100%;
  position: absolute;
}
</style>

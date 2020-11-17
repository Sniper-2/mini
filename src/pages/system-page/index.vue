<template>
  <div class="flex bg-white system-page">
    <!-- 菜单栏 -->
    <div class="left-menu">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="1">
          <i class="el-icon-setting"></i>
          <span slot="title">资料设置</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-s-order"></i>
          <span slot="title">预约列表</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-edit-outline"></i>
          <span slot="title">修改密码</span>
        </el-menu-item>
        <el-menu-item index="4">
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
            <div class="loading" v-if="$store.state.getDataLoading">
            </div>
          </transition>
          <transition name="fade">
            <router-view class="view-class" />
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
  components: {
  },
  props: {},
  data () {
    return {
      pathInfo: '',
      menuList: [
        { menuName: '修改密码' }
      ],
      lisyTypeMenu: []
    };
  },
  watch: {},
  created () {
  },
  mounted () {

  },
  methods: {
    // 选中某个菜单
    selectMenu (e) {
      this.$router.push({ path: e });
    },

    menuClick (menu) {
      this.SELECT_MENU_INFO(menu);
    },

    handleOpen (e) {

    },

    ...mapActions(['MENU_SHOW_TYPE', 'SELECT_MENU_INFO', 'PAGE_BUTTON_LIST'])

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
  min-height: calc(100vh - 57px);
  .content-box {
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

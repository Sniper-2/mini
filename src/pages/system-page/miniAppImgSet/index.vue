<template>
  <div class="tc page-box">

    <!-- 首页 -->
    <div class="inline-block update-content">
      <div class="tc f-w pad-tb-10 f-16 item-title">小程序首页</div>
      <div class="preview-item">
        <img src="../../../assets/image/home-banner.jpg" class="top-img">

        <el-upload
          class="upload-demo"
          action="http://1v85r80243.51mypc.cn/inspection/admin/configuration/upload">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </div>
    </div>

    <!-- 在线校验 -->
    <div class="inline-block update-content">
      <div class="tc f-w pad-tb-10 f-16 item-title">在线校验</div>
      <div class="preview-item">
        <img src="../../../assets/image/home-banner.jpg" class="top-img">

        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </div>
    </div>

    <!-- 上门校验 -->
    <div class="inline-block update-content">
      <div class="tc f-w pad-tb-10 f-16 item-title">上门校验</div>
      <div class="preview-item">
        <img src="../../../assets/image/home-banner.jpg" class="top-img">

        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </div>
    </div>

    <!-- 离线校验 -->
    <div class="inline-block update-content">
      <div class="tc f-w pad-tb-10 f-16 item-title">离线校验</div>
      <div class="preview-item">
        <img src="../../../assets/image/home-banner.jpg" class="top-img">

        <el-upload
          class="upload-demo banner-up"
          action="https://jsonplaceholder.typicode.com/posts/">
          <el-button size="small" type="primary">点击上传Banner</el-button>
        </el-upload>
        <el-upload
          class="upload-demo map-up"
          action="https://jsonplaceholder.typicode.com/posts/">
          <el-button size="small" type="primary">点击上传地图</el-button>
        </el-upload>

        <img src="../../../assets/image/map-img.jpg" class="map-img">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {

  },
  components: {

  },
  data() {
    return {

    };
  },
  computed: {

  },
  created() {

  },
  mounted() {

  },
  watch: {

  },
  methods: {

  }
};
</script>

<style scoped>
.page-box {
  padding-top: 5%;
}
.preview-item {
  position: relative;
  width: 273px;
  height: 486px;
  border-radius: 10px;
  border: 1px solid #ccc;
  overflow: hidden;
}
.top-img {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
}
.map-img {
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
}

.upload-demo {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
.banner-up {
  left: 5%;
  transform:translateY(-50%);
}
.map-up {
  left: 95%;
  /* right: 0%; */
  transform:translateY(-50%) translateX(-100%);
}

.update-content + .update-content {
  margin-left: 3%;
}
</style>

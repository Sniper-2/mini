<template>
  <div class="tc page-box">

    <!-- 首页 -->
    <div class="inline-block update-content">
      <div class="tc f-w pad-tb-10 f-16 item-title">小程序首页</div>
      <div class="preview-item">
        <img :src="miniHomeImg" class="top-img">

        <el-upload :show-file-list="false"
          multiple
          :headers="{ AdminToken: token }"
          class="upload-demo"
          :on-success="upImgSuccess"
          action="/inspection/admin/configuration/upload">
          <el-button size="small" type="primary" @click="readyUpload('miniHomeImg')">点击上传</el-button>
        </el-upload>
      </div>
    </div>

    <!-- 在线校验 -->
    <div class="inline-block update-content">
      <div class="tc f-w pad-tb-10 f-16 item-title">在线校验</div>
      <div class="preview-item">
        <img :src="onLineCheckImg" class="top-img">

        <el-upload :show-file-list="false"
          multiple
          :headers="{ AdminToken: token }"
          class="upload-demo"
          :on-success="upImgSuccess"
          action="/inspection/admin/configuration/upload">
          <el-button size="small" type="primary" @click="readyUpload('onLineCheckImg')">点击上传</el-button>
        </el-upload>
      </div>
    </div>

    <!-- 上门校验 -->
    <div class="inline-block update-content">
      <div class="tc f-w pad-tb-10 f-16 item-title">上门校验</div>
      <div class="preview-item">
        <img :src="visitCheckImg" class="top-img">

        <el-upload :show-file-list="false"
          multiple
          :headers="{ AdminToken: token }"
          class="upload-demo"
          :on-success="upImgSuccess"
          action="/inspection/admin/configuration/upload">
          <el-button size="small" type="primary" @click="readyUpload('visitCheckImg')">点击上传</el-button>
        </el-upload>
      </div>
    </div>

    <!-- 离线校验 -->
    <div class="inline-block update-content">
      <div class="tc f-w pad-tb-10 f-16 item-title">离线校验</div>
      <div class="preview-item">
        <img :src="offLineCheckImg" class="top-img">

        <el-upload :show-file-list="false"
          multiple
          :headers="{ AdminToken: token }"
          class="upload-demo"
          :on-success="upImgSuccess"
          action="/inspection/admin/configuration/upload">
          <el-button size="small" type="primary" @click="readyUpload('offLineCheckImg')">点击上传Banner</el-button>
        </el-upload>
        <!-- <el-upload :show-file-list="false"
          multiple
          :headers="{ AdminToken: token }"
          class="upload-demo map-up"
          :on-success="upImgSuccess"
          action="/inspection/admin/configuration/upload">
          <el-button size="small" type="primary" @click="readyUpload('offLineMapImg')">点击上传地图</el-button>
        </el-upload> -->

        <div v-html="offLineContent" class="map-img"></div>

        <!-- <img :src="offLineMapImg" class="map-img"> -->
      </div>
    </div>


    <div class="mt-15">
      <div class="tc f-w pad-tb-10 f-16 item-title">离线校验页面尾部富文本</div>
      <quill-editor
        ref="myTextEditor"
        :options="editorOption"
        v-model="offLineContent"
        @ready="onEditorReady($event)"
        placeholder="请输入文章正文"
      ></quill-editor>
    </div>

    <div class="t-c pad-tb-20">
      <el-button type="primary" @click="saveData">保存配置</el-button>
    </div>

    <input
      type="file"
      accept="image/*"
      id="imageUpload"
      hidden
      @change="uploadTeachingPlanPicture"
    />
  </div>
</template>

<script>
import request from '@/utils/request'
export default {
  props: {

  },
  components: {

  },
  data() {
    return {
      editorOption: {
        placeholder: '请在这里填写资料'
      },
      token: '',
      upImgAttrName: '',
      miniHomeImg: 'http://1v85r80243.51mypc.cn/inspection/images/a0d618d0c8084972bc47ed615a8b012b.jpg',        // 小程序首页图片
      onLineCheckImg: 'http://1v85r80243.51mypc.cn/inspection/images/a0d618d0c8084972bc47ed615a8b012b.jpg',     // 在线校验图片
      offLineCheckImg: 'http://1v85r80243.51mypc.cn/inspection/images/a0d618d0c8084972bc47ed615a8b012b.jpg',    // 离线校验图片
      visitCheckImg: 'http://1v85r80243.51mypc.cn/inspection/images/a0d618d0c8084972bc47ed615a8b012b.jpg',      // 上门校验图片
      offLineMapImg: 'http://1v85r80243.51mypc.cn/inspection/images/a0d618d0c8084972bc47ed615a8b012b.jpg',      // 离线校验地图
      offLineContent: '',
      oldConfigInfo: {}
    };
  },
  computed: {

  },
  created() {
    this.token = localStorage.getItem('token');
    this.getConfig()
  },
  mounted() {

  },
  watch: {

  },
  methods: {
    // 准备上传
    readyUpload (e) {
      this.upImgAttrName = e
    },

    // 图片上传成功
    upImgSuccess (e, s) {
      this[this.upImgAttrName] = e.data
    },

    // 获取配置
    getConfig () {
      this.request('', { loading: true }).get(this.apiConfig.getConfig).then(res => {
        this.oldConfigInfo = res.data
        this.offLineContent = res.data.offlineContent
        this.offLineCheckImg = res.data.offlineImg
        this.onLineCheckImg = res.data.onlineImg
        this.miniHomeImg = res.data.homeImg
        this.visitCheckImg = res.data.onsiteImg

        this.$nextTick(() => {
          this.$refs.myTextEditor.quill.enable(true);
          this.$refs.myTextEditor.quill.blur();
        })
      }).catch(err => {
        this.$message.error(err.msg);
      })
    },

    // 保存更新
    saveData () {
      this.offLineContent = this.offLineContent.replace('<img', '<img style="max-width: 100%"')
      let params = {
        address: this.oldConfigInfo.address,
        tel: this.oldConfigInfo.tel,
        businessHours: this.oldConfigInfo.businessHours,
        contact: this.oldConfigInfo.contact,
        id: this.oldConfigInfo.id,
        offlineContent: this.offLineContent,
        offlineImg: this.offLineCheckImg,
        onlineImg: this.onLineCheckImg,
        homeImg: this.miniHomeImg,
        onsiteImg: this.visitCheckImg,
      }
      this.request('', { loading: true }).post(this.apiConfig.upDateConfig, params).then(res => {
        this.$message({
          message: '保存成功!',
          type: 'success'
        });
      }).catch(err => {
        this.$message.error(err.msg);
      })
    },

    // 富文本准备好了，用我们的上传替换掉富文本的上传
    onEditorReady (event) {
      const quillEdit = event;
      this.quillEdit = event;
      const toolbar = quillEdit.getModule('toolbar');
      toolbar.addHandler('image', item => {
        quillEdit.format('image', false);
        const upload = document.getElementById('imageUpload');
        upload.click();
      });
    },

    // 编辑器图片上传
    uploadTeachingPlanPicture (event) {
      this.modelLoading = true;
      const file = event.target.files[0];
      let form = new FormData();
      form.append('file', file);
      request('', { ContentType: 'multipart/form-data' }).post('/inspection/admin/configuration/upload', form).then(res => {
        this.modelLoading = false;
        if (res.code == 500) return this.$Message.error('图片上传失败!');
        let length = this.quillEdit.getSelection().index;
        this.quillEdit.insertEmbed(length, 'image', res.data);
        this.quillEdit.setSelection(length + 1);
        this.$forceUpdate(() => {
          this.offLineContent = this.offLineContent.replace('<img', '<img style="max-width: 100%"')
        })
        // console.log(this.offLineContent)
      });
    }

  }
};
</script>

<style scoped  lang='scss'>
// .page-box {
//   padding-top: 5%;
// }
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
.map-img /deep/ img {
  max-width: 100%;
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
.page-box {
  /deep/ {
    .ivu-form-inline .block {
      display: block;
    }
    .ql-container,
    .ql-editor {
      min-height: 400px;
    }
  }
}

</style>

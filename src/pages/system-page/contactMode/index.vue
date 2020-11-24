<template>
  <div class=" contact-mode">
    <el-form ref="form" label-position="left" :model="contactData" label-width="100px">
      <el-form-item label="联系人：" required>
        <el-input v-model="contactData.contact" placeholder="请输入联系人姓名"></el-input>
      </el-form-item>
      <el-form-item label="联系电话：" required>
        <el-input v-model="contactData.tel" placeholder="请输入联系电话"></el-input>
      </el-form-item>
      <el-form-item label="校验地址：" required>
        <el-input v-model="contactData.address" placeholder="请输入校验地址"></el-input>
      </el-form-item>
      <el-form-item label="经度：" required>
        <el-input v-model="contactData.lng" type="number" placeholder="请输入经度"></el-input>
      </el-form-item>
      <el-form-item label="纬度：" required>
        <el-input v-model="contactData.lat" type="number" placeholder="请输入纬度"></el-input>
      </el-form-item>
      <el-form-item label="营业时间：" required>
        <el-input v-model="contactData.businessHours" placeholder="请输入营业时间"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">更新资料</el-button>
      </el-form-item>
    </el-form>
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
      contactData: {
        address: '',
        lng: '',
        lat: '',
        businessHours: '',
        contact: '',
        tel: ''
      }
    };
  },
  computed: {

  },
  created() {
    this.getConfig()
  },
  mounted() {

  },
  watch: {

  },
  methods: {

    // 获取配置
    getConfig () {
      this.request('', { loading: true }).get(this.apiConfig.getConfig).then(res => {
        this.contactData = { ...res.data }
      }).catch(err => {
        this.$message.error(err.msg);
      })
    },

    onSubmit () {
      // 验证数据的完整性
      let errorMap = {
        address: '请输入校验地址',
        businessHours: '请输入营业时间',
        contact: '请输入联系人姓名',
        lng: '请输入校验地址的经度坐标',
        lat: '请输入校验地址的纬度坐标',
        tel: '请输入联系电话'
      }
      for (const key in errorMap) {
        if (errorMap[key] && !this.contactData[key]) {
          return this.$message.error(errorMap[key]);
        }
      }
      let params = {...this.contactData}
      this.request('', { loading: true }).post(this.apiConfig.upDateConfig, params).then(res => {
        this.$message({
          message: '保存成功!',
          type: 'success'
        });
      }).catch(err => {
        this.$message.error(err.msg);
      })
      
    }
  }
};
</script>

<style scoped lang="scss">
.contact-mode {
  padding: 30px;
  width: 480px;
  border-radius: 8px;
  border: 1px solid #ccc;
  position: fixed;
  top: 45%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  /deep/ {
    .el-form-item__label {
      padding: 0;
    }
  }
}
</style>

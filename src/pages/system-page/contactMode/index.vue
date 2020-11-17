<template>
  <div class=" contact-mode">
    <el-form ref="form" label-position="left" :model="contactData" label-width="100px">
      <el-form-item label="联系人：" required>
        <el-input v-model="contactData.name" placeholder="请输入联系人姓名"></el-input>
      </el-form-item>
      <el-form-item label="联系电话：" required>
        <el-input v-model="contactData.name" placeholder="请输入联系电话"></el-input>
      </el-form-item>
      <el-form-item label="校验地址：" required>
        <el-input v-model="contactData.name" placeholder="请输入校验地址"></el-input>
      </el-form-item>
      <el-form-item label="营业时间：" required>
        <el-input v-model="contactData.name" placeholder="请输入营业时间"></el-input>
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
        name: '',

      }
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

<style scoped lang="scss">
.contact-mode {
  padding: 30px;
  width: 400px;
  border-radius: 8px;
  border: 1px solid #ccc;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  /deep/ {
    .el-form-item__label {
      padding: 0;
    }
  }
}
</style>

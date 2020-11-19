<template>
  <div class=" contact-mode">
    <el-form ref="form" label-position="left" label-width="100px">
      <el-form-item label="旧密码：" required>
        <el-input v-model="oldPassword" placeholder="请输入旧密码" type="password"></el-input>
      </el-form-item>
      <el-form-item label="新密码：" required>
        <el-input v-model="newPassword" placeholder="请输入新密码" type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码：" required>
        <el-input v-model="againNewPassword" placeholder="请再次输入新密码" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">修改密码</el-button>
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
      oldPassword: '',
      newPassword: '',
      againNewPassword: '',
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
    // 提交
    onSubmit () {
      if (!this.oldPassword) {
        return this.$message.error('请输入旧密码！');
      }
      if (!this.newPassword) {
        return this.$message.error('请输入新密码！');
      }
      if (!this.againNewPassword) {
        return this.$message.error('请输入确认新密码！');
      }
      if (this.newPassword != this.againNewPassword) {
        return this.$message.error('新密码两次输入不一致，请重新输入！');
      }


      let params = {
        newPassword: this.newPassword,
        password: this.oldPassword
      }

      this.request('', { loading: true }).post(this.apiConfig.changePassword, params).then(res => {
        this.$message({
          message: '修改成功!',
          type: 'success'
        });
        this.oldPassword = ''
        this.newPassword = ''
        this.againNewPassword = ''
      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg);
      })
    }
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

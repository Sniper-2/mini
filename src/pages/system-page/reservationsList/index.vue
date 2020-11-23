<template>
  <div class="height">
    <div class="flex bg-white flex-middle pad-all-15 search-item-box">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="校验状态">
          <el-select v-model="searchData.checkStatus" placeholder="请选择校验状态">
            <el-option label="全部状态" value=""></el-option>
            <el-option label="预约中" :value="0"></el-option>
            <el-option label="已完成" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="校验方式">
          <el-select v-model="searchData.checkMode" placeholder="请选择校验方式">
            <el-option label="全部方式" value=""></el-option>
            <el-option label="上门校验" :value="0"></el-option>
            <el-option label="在线校验" :value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="flex-1 tl search-btn">
        <el-button type="primary" @click="getSearchData">搜索</el-button>
      </div>
    </div>

    <!-- 数据表格 -->
    <div class="mt-15 data-list">
      <el-table :data="tableData" border>
        <el-table-column align="center" prop="checkTime" label="预约时间"></el-table-column>
        <el-table-column align="center" prop="mode" label="校验方式">
          <template slot-scope="scope">
            <div v-show="!scope.row.online" class="red">上门校验</div>
            <div v-show="scope.row.online" class="green">在线校验</div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="name" label="提交人">
          <template slot-scope="scope">
            <div class="user-info"> 
              <img :src="scope.row.avatar" alt="" class="middle user-header">
              <span class="ml-5">{{ scope.row.nickname }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="name" label="公司名称"></el-table-column>
        <el-table-column align="center" prop="address" label="公司地址"></el-table-column>
        <el-table-column align="center" prop="contact" label="联系人"></el-table-column>
        <el-table-column align="center" prop="num" label="校验数量"></el-table-column>
        <el-table-column align="center" prop="tel" label="联系电话"></el-table-column>
        <el-table-column align="center" prop="tel" label="检测报告"></el-table-column>
        <el-table-column align="center" prop="status" label="状态">
          <template slot-scope="scope">
            <div v-show="!scope.row.state" class="red">预约中</div>
            <div v-show="scope.row.state" class="green">已完成</div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="address" label="操作">
          <template slot-scope="scope">
            <el-button v-if="!scope.row.state" type="success" size="small" @click="updateStatus(scope.row)">已完成</el-button>
            <div v-show="scope.row.state" class="green">已完成</div>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="tc pad-tb-15">
        <el-pagination
          background
          @current-change="pageChange"
          layout="prev, pager, next"
          :total="searchData.total">
        </el-pagination>
      </div>
    </div>

    <!-- 上传检验报告 -->
    <el-dialog
      :center="true"
      title="上传检测报告"
      :visible.sync="testReportModel"
      width="550px"
      @close="handleClose">
      <div class="tc pad-tb-20">
        <el-upload :show-file-list="false"
          :headers="{ AdminToken: token }"
          accept="application/pdf"
          class="mb-15 upload-demo"
          :on-success="upPDFSuccess"
          action="/inspection/admin/configuration/upload">
          <el-button size="small" type="primary">点击上传检验报告</el-button>
        </el-upload>
        <a target="_blank" :href="pdfFile">{{ pdfFileName }}</a>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmUpdateStatus">确 定</el-button>
        <el-button @click="testReportModel = false">取 消</el-button>
      </span>
    </el-dialog>
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
      pdfFileName: '',
      pdfFile: '',
      operationItem: {},
      testReportModel: false,
      searchData: {
        checkMode: '',
        checkStatus: '',
        page: 1,
        total: 100,
      },
      tableData: [],
      token: ''
    };
  },
  computed: {

  },
  created() {
    
    this.token = localStorage.getItem('token');
    this.getPageData()
  },
  mounted() {

  },
  watch: {

  },
  methods: {
    getPageData () {
      let params = {
        online: this.searchData.checkMode,
        state: this.searchData.checkStatus,
        current: this.searchData.page,
        size: 10
      }
      this.request('', { loading: true }).get(this.apiConfig.getReservationList, params).then(res => {
        // res.data.list = list
        this.tableData = res.data.list
        this.searchData.total = +res.data.total
      }).catch(err => {
        this.$message.error(err.msg);
      })
    },

    getSearchData () {
      this.searchData.page = 1
      this.getPageData()
    },

    pageChange (e) {
      this.searchData.page = e
      this.getPageData()
    },

    // 更新状态
    updateStatus (item) {
      this.testReportModel = true
      this.operationItem = item;
    },

    // pdf上传成功
    upPDFSuccess(e) {
      this.pdfFile = e.data
      let pathArr = e.data.split('/')
      this.pdfFileName = pathArr.pop();
    },

    // 上传完检验报告，确认更新状态
    confirmUpdateStatus () {
      let params = {
        id: item.id,
        state: 1
      }
      this.request('', { loading: true }).post(this.apiConfig.updateReservationStatus, params).then(res => {
        this.$message({
          message: '操作成功!',
          type: 'success'
        });
        item.state = 1
      }).catch(err => {
        this.$message.error(err.msg);
      })
    },

    // 弹窗关闭
    handleClose () {
      this.pdfFile = '';
      this.pdfFileName = '';
      this.operationItem = {};
    }
  },
};
</script>

<style scoped>
.search-item-box /deep/ .el-form-item {
  margin-bottom: 0;
}
.user-header {
  width: 35px;
  height: 35px;
  border-radius: 50%;
}
</style>

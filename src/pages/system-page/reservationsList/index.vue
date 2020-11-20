<template>
  <div class="height">
    <div class="flex bg-white flex-middle pad-all-15 search-item-box">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="检验状态">
          <el-select v-model="searchData.checkStatus" placeholder="请选择检验状态">
            <el-option label="全部状态" value=""></el-option>
            <el-option label="预约中" :value="0"></el-option>
            <el-option label="已完成" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="检验方式">
          <el-select v-model="searchData.checkMode" placeholder="请选择检验方式">
            <el-option label="全部方式" value=""></el-option>
            <el-option label="离线检验" :value="0"></el-option>
            <el-option label="在线检验" :value="1"></el-option>
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
        <el-table-column align="center" prop="mode" label="检验方式">
          <template slot-scope="scope">
            <div v-show="!scope.row.online" class="red">离线校验</div>
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
        <el-table-column align="center" prop="num" label="检验数量"></el-table-column>
        <el-table-column align="center" prop="tel" label="联系电话"></el-table-column>
        <el-table-column align="center" prop="status" label="状态">
          <template slot-scope="scope">
            <div v-show="!scope.row.state" class="red">预约中</div>
            <div v-show="scope.row.state" class="green">已完成</div>
          </template>
        </el-table-column>
        <!-- <el-table-column align="center" prop="address" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="updateStatus(scope.row)">更新状态</el-button>
          </template>
        </el-table-column> -->
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
      searchData: {
        checkMode: '',
        checkStatus: '',
        page: 1,
        total: 100,
      },
      tableData: [{
        mode: '线上检验',
        subTimes: '2020-02-02 14:55:22',
        companyName: '哈哈哈有限公司',
        companyAddress: '公司地址',
        contacts: '李润亮',
        checkNum: 2,
        phoneNum: '15889984943',
        status: '已检验/待检验'
      }],
    };
  },
  computed: {

  },
  created() {
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
      
    }
  }
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

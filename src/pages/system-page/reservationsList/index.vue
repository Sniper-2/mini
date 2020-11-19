<template>
  <div class="height">
    <div class="flex bg-white flex-middle pad-all-15 search-item-box">
      <el-form :inline="true" class="demo-form-inline">
        <!-- <el-form-item label="检验时间">
          <el-date-picker v-model="searchData.statrTimes" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item> -->
        <el-form-item label="检验状态">
          <el-select v-model="searchData.checkStatus" placeholder="请选择检验状态">
            <el-option label="预约中" :value="0"></el-option>
            <el-option label="已完成" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="提交时间">
          <el-date-picker v-model="searchData.statrTimes" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="searchData.phoneNum" placeholder="请输入内容"></el-input>
        </el-form-item> -->
      </el-form>
      <div class="flex-1 tr search-btn">
        <el-button type="primary" @click="getSearchData">搜索</el-button>
      </div>
    </div>

    <!-- 数据表格 -->
    <div class="data-list">
      <el-table :data="tableData" border>
        <el-table-column align="center" prop="subTimes" label="预约时间"></el-table-column>
        <el-table-column align="center" prop="mode" label="检验方式"></el-table-column>
        <el-table-column align="center" prop="companyName" label="公司名称"></el-table-column>
        <el-table-column align="center" prop="companyAddress" label="公司地址"></el-table-column>
        <el-table-column align="center" prop="contacts" label="联系人"></el-table-column>
        <el-table-column align="center" prop="checkNum" label="检验数量"></el-table-column>
        <el-table-column align="center" prop="phoneNum" label="联系电话"></el-table-column>
        <el-table-column align="center" prop="status" label="状态"></el-table-column>
        <el-table-column align="center" prop="address" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="updateStatus(scope.row)">更新状态</el-button>
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
        statrTimes: 0,
        endTimes: 0,
        page: 1,
        total: 100,
        applyStatus: 0,
        rechargeMode: 0,
        phoneNum: '',
        checkMode: ''
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
        state: '',
        pages: this.searchData.page,
        current: 10
      }
      this.request('', { loading: true }).get(this.apiConfig.getReservationList).then(res => {
        console.log(res)
      }).catch(err => {
        this.$message.error(err.msg);
      })
    },

    getSearchData () {

    },

    pageChange (e) {
      console.log(e)
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

</style>

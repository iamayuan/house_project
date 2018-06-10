<template>
  <div>
    <div class="lq_mf_top">
      <img src="../../assets/images/wdgw_top.png" alt="" class="lq_wdzl_top">
      <el-button type="danger" size="mini" class="lq_mf_delet" @click="deleteBatchUserConsultant">删除</el-button>
    </div>
    <div class="lq_tab7_cont">
      <ul class="lq_tab7_ul">
        <li class="item_tab7_box" v-for="(item,index) in page_data">
          <img :src='item.logo' alt="" class="item_tab7_pic">
          <p class="lq_tab2_item_name">
            <img v-for="img in item.level" src="../../assets/images/wdgw_star.png" alt="" style="margin-right:3px;middle;">{{item.consultantName}}
            <img v-if="item.sex=='男'" src="../../assets/images/wdgw_sex.png" alt="" style="margin-left:5px;vertical-align:middle;"><img v-if="item.sex=='女'" src="../../assets/images/wdgw_sex2.png" alt="" style="margin-left:5px;vertical-align:middle;">
            <input type="checkbox" v-model="consultantIds" :value="item.consultantId" style="width:15px;height:15px;margin-left:5px;vertical-align:middle;">
          </p>
          <p class="lq_tab7_item_row">{{item.developeName}}</p>
          <p class="lq_tab7_item_row pdr10">成交次数：暂无数据
            <span style="float: right;"><img src="../../assets/images/wdgw_xinxi.png" alt="" style="margin-left:5px;" :title="item.jobNumber"></span>
          </p>
          <p class="lq_tab7_item_row pdr10">当前状态：正在搜索
            <span style="float: right;"><img src="../../assets/images/wdgw_phone.png" alt="" style="margin-left:5px;" :title="item.phone"></span>
          </p>
        </li>
        <div class="noData" v-if="!page_data.length>0">暂无数据</div>
      </ul>
      <div class="block" v-show="page_data.length>0">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :page-size="12"
          :current-page="curPageNum"
          :total="pageCount">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      zy_data: [],          // 置业顾问列表数据
      page_data: [],        // 置业顾问列表当前页数据
      token: '',
      curPageNum: 1,        // 当前页码
      pageCount: 0,         // 总页数
      consultantIds: []     // 批量删除顾问ids多个以逗号分隔
    }
  },
  created: function () {
    if (window.localStorage) {
      this.token = JSON.parse(localStorage.getItem("token"));
    }
    this.$root.Bus.$on('zy_data', zy_data => {
      this.pageCount = zy_data.totalPageCount;    // 总条数
      this.zy_data = _.chunk(zy_data.list, 12);   // list
    })
  },
  methods: {
    // 获取我的置业顾问列表
    queryUserConsultantPage: function () {
      this.$http.get(this.$location + '/api/consultant/queryUserConsultantPage.do?from=1&timestamp=2&token='+this.token+'&pageNum=1&numPerPage=12', {}, {
        headers: {
        },
        emulateJSON: true
      }).then(function (res) {
        // 调用成功
        let data_list = res.data.data;
        this.$root.Bus.$emit('zy_data', data_list);
        this.pageCount = data_list.totalPageCount;    // 总条数
        this.zy_data = _.chunk(data_list.list, 12);   // list
      }, function (error) {
        // 调用失败
        console.log(error, "失败")
      })
    },
    // 置业顾问批量删除
    deleteBatchUserConsultant () {
      if (this.consultantIds.length <= 0) {
        this.$message({
          message: '请选择要删除的置业顾问！',
          type: 'warning'
        })
        return false;
      }
      this.$http.get(this.$location + '/api/consultant/deleteBatchUserConsultant.do?from=1&timestamp=2&token=' + this.token + '&consultantIds=' + this.consultantIds.join(','), {}, {
        headers: {
        },
        emulateJSON: true
      }).then(function (res) {
        // 调用成功
        let data = res.data.data;
        if (data.errorCode == 0) {
          this.queryUserConsultantPage();
          this.$message({
            message: '删除成功！',
            type: 'success'
          })
        } else {
          this.$message({
            message: data.errorMsg,
            type: 'error'
          })
        }
      }, function (error) {
        // 调用失败
        console.log(error, '失败')
      })
    },
    handleCurrentChange (val) {
      var index = val - 1;
      this.page_data = this.zy_data[index];
    }
  }
}
</script>
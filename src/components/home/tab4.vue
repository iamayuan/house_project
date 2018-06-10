<template>
  <div>
    <div class="lq_mf_top">
      <img src="../../assets/images/wdtg_top.jpg" alt="" class="lq_wdzl_top">
      <!-- <el-button type="danger" size="mini" class="lq_mf_delet">删除</el-button> -->
    </div>
    <div class="lq_tab2_cont">
      <ul class="lq_tab2_ul">
        <li class="item_tab2_box" v-for="(item,index) in page_data">
          <img src='../../assets/images/item_pic.jpg' alt="" class="item_tab2_pic">
          <p class="lq_tab2_item_title">{{item.relatedName}}</p>
          <p class="lq_tab2_item_desc">有效期限：</p>
          <p class="lq_tab2_item_desc">{{item.beginTime}}-{{item.endTime}}</p>
        </li>
        <div class="noData" v-if="!page_data.length>0">暂无数据</div>
      </ul>
      <div class="block" style="padding: 20px 0;" v-show="page_data.length>0">
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
      tg_data: [],          // 团购列表数据
      page_data: [],        // 团购列表当前页数据
      token: '',
      curPageNum: 1,        // 当前页码
      pageCount: 0          // 总页数
    }
  },
  created: function () {
    if (window.localStorage) {
      this.token = JSON.parse(sessionStorage.getItem("token"));
    }
    this.$root.Bus.$on('tg_data', tg_data => {
      this.pageCount = tg_data.totalPageCount;    // 总条数
      this.tg_data = _.chunk(tg_data.list, 12);   // list
    })
  },
  methods: {
    handleCurrentChange(val) {
      let index = val - 1;
      this.page_data = this.tg_data[index];
    }
  }
}
</script>
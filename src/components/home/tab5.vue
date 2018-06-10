<template>
  <div>
    <div class="lq_mf_top">
      <img src="../../assets/images/wdyj_top.jpg" alt="" class="lq_wdzl_top">
      <!--  <el-button type="primary" class="lq_mf_tj" v-on:click="lp_sc_tj">添加</el-button> -->
      <!--  <el-button type="danger" class="lq_mf_delet" v-on:click="item_tj_coles">删除</el-button> -->
    </div>
    <div class="lq_tab2_cont">
      <ul class="lq_tab2_ul">
        <li class="item_tab2_box" v-for="(item,index) in tj_data">
          <img v-bind:src='item.logo' alt="" class="item_tab2_pic">
          <p class="lq_tab2_item_title">{{item.relatedName}}</p>
          <p class="lq_tab2_item_desc">推荐时间：<br>{{item.recommendTime}}</p>
          <p class="lq_tab2_num">验证{{item.validNum}}次</p>
        </li>
      </ul>
      <div class="block" style="margin-left:0px;">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[12]"
            :page-size="12"
            layout="total, prev, pager, next"
            :total="length">
          </el-pagination>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tj_data: [],
      length: 0,
      cs_data: []
    }
  },
  created: function () {
    this.$root.Bus.$on('tj_data', tj_data => {
      this.length = tj_data.length;
      this.cs_data.splice(0, this.cs_data.length);
      for (var i=0,len=this.length;i<len;i+=12) {
        this.cs_data.push(tj_data.slice(i,i+12));
      }
      this.tj_data= this.cs_data[0];
    })
  },
  methods: {
    handleSizeChange (val) {
    /* console.log(`每页 ${val} 条`); */
    },
    handleCurrentChange (val) {
      var that = this;
      var index = val-1;
      this.tj_data =  this.cs_data[index];
    }
  }
}
</script>
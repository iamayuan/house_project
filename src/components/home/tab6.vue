<template>
  <div>
    <div class="lq_mf_top">
      <img src="../../assets/images/wdj_top.jpg" alt="" class="lq_wdzl_top">
      <!--  <el-button type="primary" class="lq_mf_tj" v-on:click="lp_sc_tj">添加</el-button> -->
      <el-button type="danger" size="mini" class="lq_mf_delet" v-on:click="item_ds_coles">删除</el-button>
    </div>
    <div class="lq_tab2_cont">
    <ul class="lq_tab2_ul">
      <li class="item_tab2_box" v-for="(item,index) in grdsyj_data">
        <img v-bind:src='item.developeLogo' alt="" class="item_tab2_pic">
        <p class="lq_tab2_item_title">{{item.houseName}}</p>
        <p class="lq_tab2_item_desc">申请预审时间:<br>{{item.leaseHousePreorderTime}}</p>
         <p class="lq_tab6_item_desc">{{item.statusDesc}}</p>
        <i class="el-icon-error" v-if="item6_delet" @click="changeTab6_2($event,item.leaseHousePreorderId)">X</i>
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
     grdsyj_data:[],
     length:0,
     cs_data:[],
     item6_delet:false

    }
  },
  created:function(){
     if(window.localStorage){
        this.token = JSON.parse(localStorage.getItem("token"));
        }
   this.$root.Bus.$on('grdsyj_data', grdsyj_data => {
      this.length =grdsyj_data.length;
      this.cs_data.splice(0,this.cs_data.length);
        for(var i=0,len=this.length;i<len;i+=12){
        this.cs_data.push(grdsyj_data.slice(i,i+12));
        }
         this.grdsyj_data= this.cs_data[0];
         })
  },
  methods:{
       handleSizeChange(val) {
        /*console.log(`每页 ${val} 条`);*/
      },
      handleCurrentChange(val) {
        var that = this;
        var index = val-1;
       this.grdsyj_data =  this.cs_data[index];
      },
      item_ds_coles:function(){
         var that = this;
        if(this.item6_delet === true||this.item6_delet === 'true'){
        this.item6_delet = false;
        }else{
        this.item6_delet = true;
        }
        //弹出删除按钮 
      },
  changeTab6_2:function(e,num){
         var that = this;
    that.$http.get(this.$location + '/api/leaseHousePreorder/deleteUserLeaseHousePreorder.do?from=1&timestamp=2&token='+this.token+'&leaseHousePreorderId='+num, {}, {
        headers: {
        },
        emulateJSON: true
      }).then(function (res) {
        //调用成功
        if(res.data.data.result===true||res.data.data.result==='true'){
          alert("成功删除！")
        }

      }, function (error) {
        //调用失败
        console.log(error,"失败")
      })

      }
  }
 
}
</script>
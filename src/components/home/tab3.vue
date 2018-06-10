<template>
  <div>
    <div class="lq_mf_top">
      <img src="../../assets/images/wdyy_top.jpg" alt="" class="lq_wdzl_top">
      <!--  <el-button type="primary" class="lq_mf_tj" v-on:click="lp_sc_tj">添加</el-button> -->
      <el-button type="danger" size="mini" class="lq_mf_delet" v-on:click="item_yy_coles">删除</el-button>
    </div>
    <div class="lq_tab2_cont">
      <ul class="lq_tab2_ul">
        <li class="item_tab2_box" v-for="(item,index) in yy_data">
          <img v-bind:src='item.logo' alt="" class="item_tab2_pic">
          <p class="lq_tab2_item_title">{{item.buildingName}}</p>
          <p class="lq_tab2_item_desc">预约看房时间:<br>{{item.preorderTime}}</p>
           <i class="el-icon-error" v-if="item3_delet" @click="changeTab4_2($event,item.preorderId)">X</i>
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
     yy_data:[],
     length:0,
     cs_data:[],
     item3_delet:false,
     token:''
    }
  },
  created:function(){
    if(window.localStorage){
        this.token = JSON.parse(sessionStorage.getItem("token"));
        }
   this.$root.Bus.$on('yy_data', yy_data => {
      this.length =yy_data.length;
      this.cs_data.splice(0,this.cs_data.length);
        for(var i=0,len=this.length;i<len;i+=12){
        this.cs_data.push(yy_data.slice(i,i+12));
        }
         this.yy_data= this.cs_data[0];
         })
  },
  methods:{
       handleSizeChange(val) {
        /*console.log(`每页 ${val} 条`);*/
      },
      handleCurrentChange(val) {
        var that = this;
        var index = val-1;
       this.yy_data =  this.cs_data[index];
      },
    item_yy_coles:function(){
       var that = this;
    if(this.item3_delet === true||this.item3_delet === 'true'){
      this.item3_delet = false;
    }else{
      this.item3_delet = true;
      }
    //弹出删除按钮 
      },
    changeTab4_2:function(e,num){
      var that = this;
        //删除 
        that.$http.get(this.$location + '/api/preorder/deleteUserPreorder.do?from=1&timestamp=2&token='+this.token+'&preorderId='+num, {}, {
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
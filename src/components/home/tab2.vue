<template>
  <div>
    <div class="lq_mf_top">
      <img src="../../assets/images/wdsc_top.jpg" alt="" class="lq_wdzl_top">
      <el-button type="primary" size="mini" class="lp_sc_lp" v-on:click="lp_sc_lp">楼盘</el-button>
      <el-button type="primary" size="mini" class="lp_sc_hx" v-on:click="lp_sc_hx">户型</el-button>
      <el-button type="primary" size="mini" class="lp_sc_esf" v-on:click="lp_sc_esf">二手房</el-button>
      <el-button type="danger" size="mini" class="lq_mf_delet" v-on:click="item_sc_coles">删除</el-button>
    </div>
    <div class="lq_tab2_cont" v-if="lp">
      <ul class="lq_tab2_ul">
        <li class="item_tab2_box" v-for="(item,index) of sc_data">
          <img v-bind:src='item.favoriteUrl' alt="" class="item_tab2_pic">
          <p class="lq_tab2_item_title">{{item.houseName}}</p>
          <p class="lq_tab2_item_desc">均价:{{item.averagePrice}}</p>
           <i class="el-icon-error" v-if="item_delet" @click="changeTab3_2($event,item.favoriteId)">X</i>
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
    <div class="lq_tab2_cont" v-if="huxing">
      <ul class="lq_tab2_ul">
        <li class="item_tab2_box" v-for="(item,index) of sc_data1">
          <img v-bind:src='item.favoriteUrl' alt="" class="item_tab2_pic">
          <p class="lq_tab2_item_title">{{item.houseName}}</p>
          <p class="lq_tab2_item_desc">均价:{{item.averagePrice}}</p>
          <i class="el-icon-error" v-if="item_delet" @click="changeTab3_2($event,item.favoriteId)">X</i>
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
          :total="length1">
        </el-pagination>
      </div>
    </div>
    <div class="lq_tab2_cont" v-if="esf">
      <ul class="lq_tab2_ul">
        <li class="item_tab2_box" v-for="(item,index) of sc_data2">
          <img v-bind:src='item.favoriteUrl' alt="" class="item_tab2_pic">
          <p class="lq_tab2_item_title">{{item.houseName}}</p>
          <p class="lq_tab2_item_desc">均价:{{item.averagePrice}}</p>
           <i class="el-icon-error" v-if="item_delet" @click="changeTab3_2($event,item.favoriteId)">X</i>
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
          :total="length2">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
     sc_data:[],
     sc_data1:[],
     sc_data2:[],
     length:0,
      length1:0,
       length2:0,
     cs_data:[],
     item_delet:false,
     willShow:false,
     token:'',
     lp:true,
     huxing:false,
     esf:false

    }
  },
  created:function(){
    var that = this;
     if(window.localStorage){
        this.token = JSON.parse(sessionStorage.getItem("token"));
        }
    this.$root.Bus.$on('sc_data', sc_data => {
      this.length =sc_data.length;
      this.cs_data.splice(0,this.cs_data.length);
        for(var i=0,len=this.length;i<len;i+=12){
        this.cs_data.push(sc_data.slice(i,i+12));
        }
         this.sc_data= this.cs_data[0];
         })

    this.$root.Bus.$on('sc_data1', sc_data1 => {
      this.length1 =sc_data1.length;
      this.cs_data.splice(0,this.cs_data.length);
        for(var i=0,len=this.length1;i<len;i+=12){
        this.cs_data.push(sc_data1.slice(i,i+12));
        }
         this.sc_data1= this.cs_data[0];
         })    
    this.$root.Bus.$on('sc_data2', sc_data2 => {
      this.length2 =sc_data2.length;
      this.sc_data2.splice(0,this.sc_data.length);
      this.cs_data.splice(0,this.cs_data.length);
        for(var i=0,len=this.length2;i<len;i+=12){
        this.cs_data.push(sc_data2.slice(i,i+12));
        }
         this.sc_data2= this.cs_data[0];
         })
  },
  methods:{
       handleSizeChange(val) {
        /*console.log(`每页 ${val} 条`);*/
      },
      handleCurrentChange(val) {
        var that = this;
        var index = val-1;
       this.sc_data =  this.cs_data[index];
      },
  lp_sc_lp:function(){
    var that = this;
      this.lp=true;
      this.huxing=false;
      this.esf=false;
      },
  lp_sc_hx:function(){
  var that = this;
     this.lp=false;
      this.huxing=true;
      this.esf=false;
      },
  lp_sc_esf:function(){
    var that = this;
    this.lp=false;
      this.huxing=false;
      this.esf=true;
      },
   item_sc_coles:function(){
      var that = this;
    if(this.item_delet === true||this.item_delet === 'true'){
      this.item_delet = false;
    }else{
      this.item_delet = true;
      } 
    //弹出删除按钮
   },
    changeTab3_2:function(e,num){
    var that = this;
    /*我的收藏删除*/
        that.$http.get(this.$location + '/api/favorite/deleteBatchUserFavorite.do?from=1&timestamp=2&token='+this.token+'&favoriteIds='+num, {}, {
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
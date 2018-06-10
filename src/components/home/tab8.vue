<template>
  <div>
  <div class="lq_mf_top">
    <img src="../../assets/images/wymf_top.jpg" alt="" class="lq_wdzl_top">
    <el-button type="primary" size="mini" class="lq_mf_tj" v-on:click="lp_mf_tj">添加</el-button>
    <!--  <el-button type="danger" class="lq_mf_delet" v-on:click="item_coles">删除</el-button> -->
  </div>
    <div class="lq_tab8_cont">
     <ul class="lq_tab8_ul">
      <li class="item_tab8_box" v-for="(item,index) in mf_data">
        <img src='../../assets/images/item_pic.jpg' alt="" class="item_tab8_pic">
        <p class="lq_tab8_item_title">{{item.buildingName}}</p>
        <p class="lq_tab8_item_desc">{{item.houseArea}}㎡&nbsp;&nbsp;{{item.roomType}}室{{item.hallType}}厅{{item.washroomType}}卫</p>
        <p class="lq_tab8_item_desc">{{item.houseAddress}}&nbsp;&nbsp;{{item.item_jujia}}元/㎡</p>
        <p class="lq_tab8_item_num">{{item.houseMoney}}万</p>
        <!-- <i class="el-icon-error" v-if="item_delet" @click="item_delet($event,{{}})">X</i> -->
      </li>
    </ul>
      <div class="block" style="margin-left:0px;">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[6]"
            :page-size="6"
            layout="total, prev, pager, next"
            :total="length">
          </el-pagination>
        </div>
    </div>
    <div class="lq_mf_form" v-if="willShow">
      <p class="item_tab8_gg"><img src="../../assets/images/tab8gg_logo.png" alt="" class="lq_tab8_logo">请如实填写如下资料，递交资料后，我们的经济人将会亲自与您取得联系并实地查看房源。感谢您的配合。</p>
           <div class="lq_mf_cont">
            <el-input
            placeholder="请输入楼盘名称"
            v-model="lp_name"
            clearable class="lq_lp_name">
            </el-input>
             <el-select v-model="csvalue" filterable clearable placeholder="所在省" @change="csselect()" style="margin-left:310px;">
          <el-option
          v-for="item in options"
          :value="item.proName" :key="item.proName">
          </el-option>
            </el-select>
             <el-select v-model="cs2value" filterable clearable placeholder="所在市" @change="cs2select()">
          <el-option
          v-for="item in options2"
          :value="item.cityName" :key="item.cityName">
          </el-option>
            </el-select>
            <el-input
            placeholder="请输入具体位置"
            v-model="lp_weizhi"
            clearable class="lq_lp_name">
            </el-input>
             <el-input
            placeholder=""
            v-model="lp_s"
            clearable class="lq_lp_hx" style=" margin-left:310px;">
            </el-input>
            <el-input
            placeholder=""
            v-model="lp_t"
            clearable class="lq_lp_hx" style=" margin-left:35px;">
            </el-input>
            <el-input
            placeholder=""
            v-model="lp_w"
            clearable class="lq_lp_hx" style=" margin-left:45px;">
            </el-input>
            <el-input
            placeholder=""
            v-model="lp_lc"
            clearable class="lq_lp_hx" style="margin-left: -303px;margin-top: 69px;">
            </el-input>
            <el-input
            placeholder=""
            v-model="lp_zlc"
            clearable class="lq_lp_hx" style="margin-left: -167px;margin-top: 74px;">
            </el-input>
            <el-input
            placeholder="请输入朝向"
            v-model="lp_cx"
            clearable class="lq_lp_name">
            </el-input>
            <el-input
            placeholder=""
            v-model="lp_mj"
            clearable class="lq_lp_hx" style="margin-left: 310px;margin-top: 16px;">
            </el-input>
            <el-input
            placeholder=""
            v-model="lp_bz"
            clearable class="lq_lp_hx" style="margin-left: -82px;margin-top: 63px;">
            </el-input>
            <el-input
            placeholder=""
            v-model="lp_dt"
            clearable class="lq_lp_hx" style="margin-left: -82px;margin-top: 114px;">
            </el-input>
            <el-input
            placeholder=""
            v-model="lp_sj"
            clearable class="lq_lp_hx" style="margin-left: -82px;margin-top: 162px;">
            </el-input>
             <el-input
            placeholder=""
            v-model="lp_name_xm"
            clearable class="lq_lp_hx" style="margin-left: -82px;margin-top: 235px;">
            </el-input>
             <el-input
            placeholder=""
            v-model="lp_sex"
            clearable class="lq_lp_hx" style="margin-left: -82px;margin-top: 282px;">
            </el-input>
             <el-input
            placeholder=""
            v-model="lp_tel"
            clearable class="lq_lp_hx" style="margin-left: -82px;margin-top: 328px;">
            </el-input>
            <div class="lq_tj_button" v-on:click="lp_submit"></div>

           </div>
    </div>
    <div class="mark" v-if="willShow" v-on:click="lq_close"></div>
  </div>
</template>

<script>

export default {
  data () {
    return {
     mf_data:[],
     length:0,
     cs_data:[],
     lp_name:'',
     options:[],
     options2:[],
     csvalue:'',
     csproId:'',
     cscityId:'',
     cs2value:'',
     lp_weizhi:'',
     lp_s:'',
     lp_t:'',
     lp_w:'',
     lp_lc:'',
     lp_zlc:'',
     lp_cx:'',
     lp_mj:'',
     lp_bz:'',
     lp_dt:'',
     lp_sj:'',
     lp_name_xm:'',
     lp_sex:'',
     lp_tel:'',
     token:'',
     willShow:false

    }
  },
  created:function(){
   this.$root.Bus.$on('mf_data', mf_data => {
      this.length =mf_data.length;
      this.cs_data.splice(0,this.cs_data.length);
        for(var i=0,len=this.length;i<len;i+=6){
        this.cs_data.push(mf_data.slice(i,i+6));
        }
         this.mf_data= this.cs_data[0];
         })
   if(window.localStorage){
           this.token = JSON.parse(localStorage.getItem("token"));
        }
   this.check_cs();
  },
  methods:{
       handleSizeChange(val) {
        /*console.log(`每页 ${val} 条`);*/
      },
      handleCurrentChange(val) {
        var that = this;
        var index = val-1;
       this.mf_data =  this.cs_data[index];
      },
    check_cs:function(){
        var that = this;
        /*城市级联*/
           that.$http.get(this.$location + '/api/area/queryAreaList.do?from=1&timestamp=2', {}, {
        headers: {
        },
        emulateJSON: true
      }).then(function (res) {
        //调用成功
           this.options = res.data.data.proList;
            console.log(res.data)
      }, function (error) {
        //调用失败
        console.log(error,"失败")
      })
      },
  csselect:function(){
    var that = this;
     for(var j=0;j<this.options.length;j++){
            if(this.csvalue===this.options[j].proName){
               this.csproId = this.options[j].proId;
               this.check_cs2(); 
               this.cs2value='';
            }
        }
   },
   check_cs2:function(){
        var that = this;
        /*城市级联*/
           that.$http.get(this.$location + '/api/area/queryCityListByProId.do?proId='+this.csproId, {}, {
        headers: {
        },
        emulateJSON: true
      }).then(function (res) {
        //调用成功
           this.options2 = res.data.data;
            console.log(res.data)
      }, function (error) {
        //调用失败
        console.log(error,"失败")
      })
      },
cs2select:function(){
    var that = this;
     for(var j=0;j<this.options2.length;j++){
            if(this.cs2value===this.options2[j].cityName){
               this.cscityId = this.options2[j].cityId; 
            }
        }
   },
   lp_submit:function(){
    var that = this;
    if(this.lp_name===''){
      alert("请输入楼盘名称")  
   }else if(this.csvalue===''){
     alert("请选择所在省份")  
   }else if(this.cs2value===''){
     alert("请选择所在市")  
   }else if(this.lp_weizhi===''){
     alert("请填写具体位置")  
   }else if(this.lp_s===''||this.lp_t===''||this.lp_w===''){
     alert("请将户型资料填写完整")  
   }
   else if(this.lp_lc===''||this.lp_zlc===''){
     alert("请将楼层资料填写完整")  
   }
   else if(this.lp_cx===''){
     alert("请填写朝向信息")  
   }
   else if(this.lp_mj===''){
     alert("请填写建筑面积")  
   }
   else if(this.lp_bz===''){
     alert("请填写装修标准")  
   }
 else if(this.lp_dt===''){
     alert("请填写有无电梯")  
   }
   else if(this.lp_dt===''){
     alert("请填写有无电梯")  
   }
   else if(this.lp_sj===''){
     alert("请填写期望售价")  
   }
   else if(this.lp_name_xm===''){
     alert("请填写姓名")  
   }else if(this.lp_sex===''){
     alert("请填写性别")  
   }else if(this.lp_tel===''){
     alert("请填写电话")  
   }else{
     this.changeTab9_1();
   }
    },
 changeTab9_1:function(){
     var that = this;
    /*我要卖房添加*/
    that.$http.get(this.$location + '/api/secondHousePersonal/saveSecondHousePersonal.do?from=1&timestamp=2&token='+this.token+'&proId='+this.csproId+'&cityId='+this.cscityId+'&buildingName='+this.lp_name+'&houseAddress='+this.lp_weizhi+'&roomType='+this.lp_s+'&hallType='+this.lp_t+'&washroomType='+this.lp_w+'&floorNum='+this.lp_lc+'&totalFloor='+this.lp_zlc+'&direction='+this.lp_cx+'&houseArea='+this.lp_mj+'&designStandard='+this.lp_bz+'&liftType='+this.lp_dt+'&houseMoney='+this.lp_sj+'&realname='+this.lp_name_xm+'&sex='+this.lp_sex+'&tel='+this.lp_tel, {}, {
        headers: {
        },
        emulateJSON: true
      }).then(function (res) {
        //调用成功
        console.log(res,"提交成功")
        this.willShow = false;
          if(res.errorCode===0||res.errorCode==='0'){
            alert("恭喜你，添加成功！")
          }
           
      }, function (error) {
        //调用失败
        console.log(error,"失败")
      })
   },
   lp_mf_tj:function(){
    var that = this;
     this.willShow = true;
   },
   lq_close:function(){
    var that = this;
     this.willShow = false;
   }
  }
 
}
</script>
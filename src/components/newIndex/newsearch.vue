<template>
  <section class="searchn-box">
    <div class="wrapper">
        <div class="se-search">
        <div class="lq_quyu">
          <el-select v-model="quyuvalue" filterable clearable placeholder="区域" @change="quyuselect()">
          <el-option
          v-for="item of quyu_data"
          :value="item.areaName" :key="item.areaName">
          </el-option>
            </el-select>
        </div>
           <div class="lq_huxing">
             <el-select v-model="huvalue" filterable clearable placeholder="户型" @change="huxingselect()">
          <el-option
          v-for="item of hudata"
          :value="item.item_name" :key="item.item_name">
          </el-option>
            </el-select>
           </div>
         <div class="lq_zongjia">
             <el-select v-model="jiavalue" filterable clearable placeholder="总价" @change="zongjiaselect()">
          <el-option
          v-for="item of zjdata"
          :value="item.zj_desc"
          :key="item.id">
          </el-option>
            </el-select>
           </div>
          <div class="se-key"><input placeholder="关键词：房源名称/地区" v-model="gjcvalue"></div>
          <div class="se-button" v-on:click="greet">查找</div>
        </div>
    </div>
  </section>  
</template>
<script>
  export default {
    data () {
      return {
        quyuvalue:'',
        quyu_data:[],
        huvalue:'',//户型
        huxin_id:'',//户型标志id
        quhref:'',
        jiavalue:'',
        href:'',
        gjcvalue:'',
        areaId:'',
        endHouseMoney:'',
        beginHouseMoney:'',
        hudata:[
          {
            item_name:'一室'
          },
          {
            item_name:'二室'
          },
          {
            item_name:'三室'
          },{
            item_name:'三室以上'
          }
        ],
        zjdata:[
         {
          zj_desc:'100万以下'
         }, {
          zj_desc:'100-150万'
         }, {
          zj_desc:'150-200万'
         }, {
          zj_desc:'200-250万'
         }, {
          zj_desc:'250-300万'
         }, {
           zj_desc:'300-500万'
         }, {
           zj_desc:'500-1000万'
         }, {
           zj_desc:'1000万以上'
         }
        ]
      }
    },
  created:function(){
    this.getquyudata();
  },
  methods:{
   getquyudata:function(){
    var that = this;
       if(window.localStorage){
           this.quyu_data = JSON.parse(localStorage.getItem("quyu_data"));
        }
   },
   quyuselect:function(){
    var that = this;
     for(var j=0;j<this.quyu_data.length;j++){
            if(this.quyuvalue===this.quyu_data[j].areaName){
                var areaId = this.quyu_data[j].areaId;
                that.qu_check(areaId); 
            if(window.localStorage){
                 localStorage.setItem("areaId",JSON.stringify(areaId));
                } 
            }
        }
   },
    qu_check:function(areaId){
       var that = this;
       if(window.localStorage){
           this.quhref = JSON.parse(localStorage.getItem("quhref"));
        }
     },
     huxingselect:function(){
       var that = this;
       if(this.huvalue==="一室"){
            this.huxin_id =1;
       }else if(this.huvalue==="二室"){
             this.huxin_id =2;
       }else if(this.huvalue==="三室"){
             this.huxin_id =3;
       }else if(this.huvalue==="三室以上"){
             this.huxin_id =4;
       }
      if(window.localStorage){
          this.areaId = JSON.parse(localStorage.getItem("areaId"));
      }

     },
     zongjiaselect:function(){
       var that = this;
       if(this.jiavalue==='100万以下'){
         this.endHouseMoney=100
       }
        else if(this.jiavalue==='100-150万'){
         this.beginHouseMoney=100
         this.endHouseMoney=150
       }else if(this.jiavalue==='150-200万'){
         this.beginHouseMoney=150
         this.endHouseMoney=200
       }else if(this.jiavalue==='200-250万'){
         this.beginHouseMoney=200
         this.endHouseMoney=250
       }else if(this.jiavalue==='250-300万'){
         this.beginHouseMoney=250
         this.endHouseMoney=300
       }else if(this.jiavalue==='300-500万'){
         this.beginHouseMoney=300
         this.endHouseMoney=500
       }else if(this.jiavalue==='500-1000万'){
         this.beginHouseMoney=500
         this.endHouseMoney=1000
       }else if(this.jiavalue==='1000万以上'){
         this.beginHouseMoney=1000
       }

     },
     greet:function(){
       var that = this;
        /*首页新房推荐start*/
        console.log(this.href)
        this.href= '/api/building/queryBuildingPage.do?from=1&timestamp=2&tag=all&pageNum=1&numPerPage=20'+this.quhref+'&areaId='+this.areaId+'&roomType='+this.huxin_id+'&beginHouseMoney='+this.beginHouseMoney+'&endHouseMoney='+this.endHouseMoney+'&buildingName='+this.gjcvalue
        that.$http.get(this.href, {}, {
        headers: {
        },
        emulateJSON: true
      }).then(function (res) {
        //调用成功
       var xf_xf_data = res.data.data.list;//源数据
            for(var i=0;i<xf_xf_data.length;i++){
          xf_xf_data[i].externalPicUrl = xf_xf_data[i].externalPicUrl.split(",")[0];
        }
         this.$root.Bus.$emit('xf_xf_data',xf_xf_data)
      }, function (error) {
        //调用失败
        console.log("失败",error)
      })
      /*首页新房推荐end*/

     }
  }
  }
</script>
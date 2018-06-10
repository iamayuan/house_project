<template>
  <section class="secondOrder">
    <div class="searchn-box">
      <div class="wrapper">
        <div class="se-search">
          <div class="lq_quyu" @click="getquyudata">
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
              :value="item.zj_desc" :key="item.zj_desc">
              </el-option>
            </el-select>
          </div>
          <div class="se-key"><input placeholder="关键词：房源名称/地区" v-model="gjcvalue"></div>
          <div class="se-button" v-on:click="greet">查找</div>
        </div>
      </div>
    </div>
    <div class="wrapper">
      <div class="order-box">
        <p>排序:</p>
        <ul class="clearfix">
          <li class="item_px active">默认排序</li>
          <li class="item_px">按热门<img src="../../assets/images/asc.png"></li>
          <li class="item_px">按总价<img src="../../assets/images/desc.png"></li>
        </ul>
      </div>
      <div class="order-list">
        <div class="order-item  clearfix" v-for="item of esf_data">
          <router-link :to="{path: '/secondhouse_detail', query: {secondHouseId:item.secondHouseId}}">
            <div class="img-box">
              <img v-bind:src="item.housePicUrl">
            </div>
            <div class="order-right">
              <p class="order-title">{{item.houseType}},{{item.houseProperties}}</p>
              <p class="order-desc">{{item.houseArea}}㎡/{{item.roomType}}{{item.hallType}}/{{item.direction}}/{{item.designStandard}}</p>
              <p class="order-year">{{item.floorNum}}/{{item.buildingYear}}年建房 <span>￥<b>{{item.houseMoney}}</b>万</span></p>
              <div class="order-chara">
                <span class="order-aver">均价：{{item.averagePrice}}元/㎡</span>
                <p class="order-detail">查看详情</p>
              </div>
              <div class="order-tag">
                <ul class="clearfix">
                  <li class="li1">{{item.houseType}}</li>
                  <li class="li2">随时看房</li>
                  <li class="li3">房本满五年</li>
                </ul>
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <div id="pageGro" class="clearfix">
        <!-- <div class="pageList"> -->
          <div class="block">
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :page-sizes="[6]"
              :page-size="6"
              layout="prev, pager, next, total"
              :total="length">
            </el-pagination>
          </div>
        <!-- </div> -->
      </div>
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
        esf_data:[],
        esf_cs_data:[],
        length:0,
        areaId:'',
        huvalue:'',//户型
        huxin_id:'',//户型标志id
        quhref:'',
        jiavalue:'',
        href:'',
        gjcvalue:'',
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
      var that = this;
      this.getquyudata();
      $(".item_px").on("click",function(){
        console.log("22")
      })
  },
  methods:{
   getquyudata:function(){
    var that = this;
      if(window.localStorage){
           this.quyu_data = JSON.parse(localStorage.getItem("quyu_data"));
        }
  this.$root.Bus.$on('esf_data', esf_data => {
       this.length =esf_data.length;
        this.esf_cs_data.splice(0,this.esf_cs_data.length);
        for(var i=0,len=this.length;i<len;i+=6){
        this.esf_cs_data.push(esf_data.slice(i,i+6));
        }
         this.esf_data= this.esf_cs_data[0];
         })
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
    /*二手房*/
        this.href= '/api/secondHouse/querySecondHousePage.do?from=1&timestamp=2&pageNum=1&numPerPage=20'+this.quhref+'&areaId='+this.areaId+'&roomType='+this.huxin_id+'&beginHouseMoney='+this.beginHouseMoney+'&endHouseMoney='+this.endHouseMoney+'&buildingName='+this.gjcvalue
        that.$http.get(this.href, {}, {
        headers: {
        },
        emulateJSON: true
      }).then(function (res) {
        //调用成功
       var esf_data = res.data.data.list;//源数据

         this.$root.Bus.$emit('esf_data',esf_data)
      }, function (error) {
        //调用失败
        console.log("失败",error)
      })
      /*二手房*/

     },
       handleSizeChange(val) {
        /*console.log(`每页 ${val} 条`);*/
      },
      handleCurrentChange(val) {
        var that = this;
        var index = val-1;
       this.esf_data =  this.esf_cs_data[index];
      }
    }
  }
</script>

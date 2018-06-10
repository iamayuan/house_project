<template>
  <section class="kangarooOrder">
   <div class="searchn-box">
    <div class="wrapper" style="margin-top:0px; width:100%;">
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
          :value="item.zj_desc" :key="item.zj_desc">
          </el-option>
            </el-select>
           </div>
          <div class="se-key"><input placeholder="关键词：房源名称/地区" v-model="gjcvalue"></div>
          <div class="se-button" v-on:click="greet">查找</div>
      </div>
      </div>
       </div>
      <div class="kangaroo-list clearfix">
        <div class="kangaroo-item " v-for="item of dsyj_data">
          <router-link :to="{path: '/kangaroos_detail', query: {leaseHouseId:item.leaseHouseId}}">
            <div class="img-box">
              <img v-bind:src="item.housePicUrl">
            </div>
            <div class="kangaroo-desc">
              <p class="kangaroo-area">{{item.developeName}}<span class="kangaroo-county">{{item.areaName}}</span></p>
              <p class="kangaroo-doortype">{{item.houseName}}<span class="kangaroo-price">{{item.houseMoney}}<b class="kangaroo-unit">万</b></span></p>
              <p class="kangaroo-month">月租：{{item.monthPrice}}元/㎡</p>
              <p class="kangaroo-year">年租：{{item.yearPrice}}元/㎡</p>
              <div class="kangaroo-bottom">
                <ul class="tag-list clearfix">
                    <li class="tag tag1">{{item.direction}}</li>
                    <li class="tag tag2">{{item.houseProperties}}</li>
                     <li class="tag tag3">{{item.liftType}}</li>
                </ul>
                <p class="kangaroo-more">更多+</p>
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
  </section>
</template>

<script>
  export default {
    data () {
      return {
        quyuvalue:'',
        quyu_data:[],
        dsyj_data:[],
        dsyj_cs_data:[],
        beginHouseMoney:'',
        endHouseMoney:'',
        length:0,
        areaId:'',
        huvalue:'',//户型
        huxin_id:'',//户型标志id
        quhref:'',
        jiavalue:'',
        href:'',
        gjcvalue:'',
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
      if(window.localStorage){
        this.quyu_data = JSON.parse(localStorage.getItem("quyu_data"));
      }
      this.$root.Bus.$on('dsyj_data', dsyj_data => {
      this.length = dsyj_data.length;
      this.dsyj_cs_data.splice(0,this.dsyj_cs_data.length);
      for(var i=0,len=this.length;i<len;i+=6){
        this.dsyj_cs_data.push(dsyj_data.slice(i,i+6));
      }
      this.dsyj_data= this.dsyj_cs_data[0];
    })
  },
  methods:{
    quyuselect:function(){
      var that = this;
      for(var j=0;j<this.quyu_data.length;j++){
        if(this.quyuvalue===this.quyu_data[j].areaName){
          var areaId = this.quyu_data[j].areaId;
          that.dsyj_check(areaId);  
        }
      }
    },
    dsyj_check:function(areaId){
      var that = this;
      if(window.localStorage){
        this.quhref = JSON.parse(localStorage.getItem("quhref"));
      }
      // /*袋鼠有家*/
      // that.$http.get(this.$location + '/api/leaseHouse/queryLeaseHousePage.do?from=1&timestamp=2&pageNum=1&numPerPage=20'+this.quhref+'&areaId='+areaId, {}, {
      //   headers: {
      //   },
      //   emulateJSON: true
      // }).then(function (res) {
      //   //调用成功
      //  var dsyj_data = res.data.data.list;//源数据
      //    //newftj_data:新房推荐
      //  this.$root.Bus.$emit('dsyj_data',dsyj_data);
      // }, function (error) {
      //   //调用失败
      //   console.log("失败",error)
      // });
      // /*袋鼠有家*/
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
      //   /*袋鼠有家*/
      //   that.$http.get(this.$location + '/api/leaseHouse/queryLeaseHousePage.do?from=1&timestamp=2&pageNum=1&numPerPage=20'+this.quhref+'&areaId='+this.areaId+'&roomType='+this.huxin_id, {}, {
      //   headers: {
      //   },
      //   emulateJSON: true
      // }).then(function (res) {
      //   //调用成功
      //   var dsyj_data = res.data.data.list;//源数据
         
      //    this.$root.Bus.$emit('dsyj_data',dsyj_data)
      // }, function (error) {
      //   //调用失败
      //   console.log("失败",error)
      // })
      //  /*袋鼠有家*/
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
         thisbeginHouseMoney=150
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
      // /*袋鼠有家*/
      // that.$http.get(this.href, {}, {
      //   headers: {
      //   },
      //   emulateJSON: true
      // }).then(function (res) {
      //   //调用成功
      //  var dsyj_data = res.data.data.list;//源数据
         
      //    this.$root.Bus.$emit('dsyj_data',dsyj_data)
      // }, function (error) {
      //   //调用失败
      //   console.log("失败",error)
      // })
      // /*袋鼠有家*/
     },
     greet:function(){
      var that = this;
      /*袋鼠有家*/
      this.href= '/api/leaseHouse/queryLeaseHousePage.do?from=1&timestamp=2&pageNum=1&numPerPage=20'+this.quhref+'&areaId='+this.areaId+'&roomType='+this.huxin_id+'&beginHouseMoney='+this.beginHouseMoney+'&endHouseMoney='+this.endHouseMoney+'&buildingName='+this.gjcvalue;
      that.$http.get(this.href, {}, {
        headers: {
        },
        emulateJSON: true
      }).then(function (res) {
        //调用成功
       var dsyj_data = res.data.data.list;//源数据
         this.$root.Bus.$emit('dsyj_data',dsyj_data)
      }, function (error) {
        //调用失败
        console.log("失败",error)
      })
      /*袋鼠有家*/
     },
       handleSizeChange(val) {
        /*console.log(`每页 ${val} 条`);*/
      },
      handleCurrentChange(val) {
        var that = this;
        var index = val-1;
        this.dsyj_data = this.dsyj_cs_data[index];
      }
    }
  }
</script>
</script>
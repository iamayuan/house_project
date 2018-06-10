<template>
  <section class="preferenceOrder">
    <div class="wrapper">
      <div class="preference-list">
        <div class="preference-item  clearfix" v-for="item of thf_data">
          <router-link :to="{path: '/house_detail', query: {promotionHouseId:item.promotionHouseId}}">
            <div class="left-item">
              <img src="../../assets/images/preferenceitem.png">
              <div class="img-desc">
                  <p class="desc-title">{{item.buildingName}}</p>
                  <p class="desc-info">{{item.buildingName}}位于{{item.houseAreaName}}，{{item.houseAddress}}；{{item.houseDescription}}</p>
              </div>
            </div>
            <div class="preference-desc">
              <p class="building-name">{{item.buildingName}}</p> 
              <p class="building-doortype">{{item.houseName}}</p> 
              <p class="building-present">现价：{{item.averagePrice}}元/㎡</p> 
              <p>
                <img src="/static/img/icon5.e3e6144.png" class="building-img"><span class="building-red">{{item.decreaseRate}}%</span>
                <span class="building-old">原价：{{item.firstPrice}}元/㎡</span>
              </p> 
              <p class="building-detail">查看详情</p>
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
            :page-sizes="[4]"
            :page-size="4"
            layout="prev, pager, next, total"
            :total="length">
          </el-pagination>
        </div>
        <!-- </div> -->
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    data () {
      return {
        thf_data:[],
        cs_data:[],
        length:0
      }
    },
     created:function(){
      this.getquyudata();
     },
  methods:{
   getquyudata:function(){
    var that = this;
    this.$root.Bus.$on('thf_data', thf_data => {
       this.length =thf_data.length;
       this.cs_data.splice(0,this.cs_data.length);
        for(var i=0,len=this.length;i<len;i+=4){
        this.cs_data.push(thf_data.slice(i,i+4));
        }
         this.thf_data= this.cs_data[0];
         })
   },
    handleSizeChange(val) {
        /*console.log(`每页 ${val} 条`);*/
      },
      handleCurrentChange(val) {
        var that = this;
        var index = val-1;
       this.thf_data =  this.cs_data[index];
      }
    }
  }
</script>
<template>
  <section class="new-inexbox">
    <div class="wrapper">
      <div class="new-recommend-list clearfix">
          <div id ="sidebar" class="new-recommend-item" v-for="item of xf_xf_data">
              <router-link :to="{path:'/newhouse_detail',query: {buildingId: item.buildingId}}" class="new-link">
                <div class="new-imagebox">
                  <div class="new-imagebox-image">
                    <img v-bind:src="item.externalPicUrl" alt="">
                  </div>
                  <div class="new-imagebox-title">
                    <p class="clearfix">{{item.buildingName}}<b>{{item.buildingAreaName}}</b><span>{{item.designStandard}}</span></p>
                    <p class="building-aver">均价：{{item.averagePrice}}元/㎡</p>
                  </div>
                </div>
            </router-link>
          </div>
      </div>
      <div id="pageGro">
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
      </div>
    </div>
  </section> 
</template>

<script>
  export default {
    data () {
      return {
      length:0,
      musics:[],
      xf_xf_data:[],
       xf_cs_data:[]
      }
    },
    created:function(){
      var that = this;
       this.new_check();     
  },
  methods:{
    new_check:function(){
      var that = this;
      this.$root.Bus.$on('xf_xf_data', xf_xf_data => {
        console.log('xf_xf_data',xf_xf_data)
       this.length =xf_xf_data.length;
       this.xf_cs_data.splice(0,this.xf_cs_data.length);
        for(var i=0,len=this.length;i<len;i+=6){
        this.xf_cs_data.push(xf_xf_data.slice(i,i+6));
        }
         this.xf_xf_data= this.xf_cs_data[0];
         })
    },
    handleSizeChange(val) {
        /*console.log(`每页 ${val} 条`);*/
      },
      handleCurrentChange(val) {
        var that = this;
        var index = val-1;
       this.xf_xf_data =  this.xf_cs_data[index];
      }   
  }
  }
</script>

<template>
  <section class="hotRecommend">
    <div class="wrapper">
      <div class="title">
        <img src="../../assets/images/recommendt.png" class="recomt">
        <p class="more" @click = "more">更多+</p>
      </div>
      <div class="hot-list clearfix">
        <div class="hotitem" v-for="item of syrx_data">
          <div class="hotimagebox">
            <img v-bind:src="item.externalPicUrl" alt="" class="hotimagebox-image">
            <div class="imageboxh-title">
              <p>万科精品</p>
            </div>
          </div>
          <div class="imageboxh-content">
            <a :href="'/newhouse_detail?buildingId='+item.buildingId">
              <div class="imageboxh-desc">
                <p class="building-name">楼盘名称：{{item.buildingName}}</p>
                <p class="building-area">地区：{{item.cityName}}{{item.buildingAreaName}}</p>
                <p class="building-aver">均价：{{item.averagePrice}}元/㎡</p>
              </div>
              <div class="imageboxh-button">
                <img src="../../assets/images/more.png" class="more-image">了解更多
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section> 
</template>

<script>
  export default {
    data () {
      return {
        syrx_data: [],
        length: 0,
        item_pic: [],
        sf_id:'',
      }
    },
    created: function () {
      this.quyuselect();
      this.sf_id= sessionStorage.getItem("proId");
    },
    methods: {
      quyuselect: function () {
        this.$root.Bus.$on('syrx_data', syrx_data => {
          this.syrx_data = syrx_data;
        })
      },
      more:function(){
        let cityId = sessionStorage.getItem("cityId");
        this.sp_check5(cityId,20);
      },
     /* 首页热销推荐*/
      sp_check5: function(cityId,numPerPage) {
        var that = this;
        that.$http.get('/api/building/queryHotBuildingTopN.do?from=1&timestamp=2&proId=' + this.sf_id + '&cityId=' + cityId + '&numPerPage='+numPerPage, {}, {
            headers: {},
            emulateJSON: true
        }).then(function(res) {
            //调用成功
            var syrx_data = res.data.data.list; //源数据
            for (var i = 0; i < syrx_data.length; i++) {
                syrx_data[i].externalPicUrl = syrx_data[i].externalPicUrl.split(",")[0];
            }
            //newftj_data:新房推荐
            this.$root.Bus.$emit('syrx_data', syrx_data);
            var quhref = '&proId=' + this.sf_id + '&cityId=' + cityId;
            if (window.localStorage) {
                localStorage.setItem("quhref", JSON.stringify(quhref));
            }
        }, function(error) {
            //调用失败
            console.log("失败", error)
        })
    }
    }
  }
</script>

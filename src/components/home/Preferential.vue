<template>
  <section class="preferential">
    <div class="wrapper">
      <div class="preferential-img">
        <img src="../../assets/images/pret.png">
      </div>
      <div class="preferential-list clearfix">
        <el-carousel indicator-position="outside">
          <el-carousel-item v-for="(item,index) of sy_thf_data" :key="item.value">
            <div class="lq_sy_thf">
              <div class="imagebox-item" v-for="img of sy_thf_data[index]">
                <a :href="'/house_detail?promotionHouseId='+item[index].promotionHouseId">
                  <div class="imagebox">
                    <img v-bind:src="img.virtualPicUrl" alt="">
                    <div class="imagebox-title">
                      <p>{{img.developeName}}</p>
                    </div>
                  </div>
                  <div class="imagebox-content">
                    <div class="imagebox-desc">
                      <p class="building-name">{{img.buildingName}}</p>
                      <ul class="building-fea">
                        <li>{{img.houseType}}</li>
                        <li>{{img.liftType}}</li>
                        <li>{{img.designStandard}}</li>
                      </ul>
                      <p class="building-doortype">{{img.houseName}}</p>
                      <p class="building-present">现价：{{img.averagePrice}}元/㎡</p>
                      <p class="building-old">原价：{{img.firstPrice}}元/㎡</p>
                      <p class="building-range"><img src="../../assets/images/icon5.png">{{img.decreaseRate}}%</p>
                      <p class="building-aver">{{img.houseMoney}}万</p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="blue-bg"></div>
  </section>
</template>

<script>
export default {
    data() {
        return {
            sy_thf_data: [],
            length: 0,
            item_pic: []
        };
    },
    created: function() {
        this.quyuselect();
    },
    methods: {
        quyuselect: function() {
            this.$root.Bus.$on("sy_thf_data", sy_thf_data => {
                this.length = sy_thf_data.length;
                this.sy_thf_data = _.chunk(sy_thf_data, 4);
                console.log("----------------sy_thf_data");
                console.log(this.sy_thf_data);
            });
        }
    }
};
</script>
<template>
  <section class="newRecommend">
    <div class="wrapper">
      <div class="title">
        <img src="../../assets/images/newt.png">
        <router-link to="/new_index">
          <p class="more">更多+</p>
        </router-link>
      </div>
      <div class="new-list clearfix">
        <div class="newbox-item" v-for="item of sy_xf_data">
          <div class="newbox">
            <a :href="'/newhouse_detail?buildingId='+item.buildingId">
              <div class="newboximg-box">
                <img v-bind:src="item.externalPicUrl" class="newbox-image">
              </div>
              <div class="new-desc">
                <p class="new-area">{{item.buildingName}}
                  <span class="new-county">{{item.buildingAreaName}}</span>
                </p>
                <p class="new-doortype">地址：{{item.projectAddress}}
                  <span class="new-price">{{item.houseMoney}}</span>
                </p>
                <p class="new-aver">均价：{{item.averagePrice}}元/㎡</p>
                <ul class="tag-list clearfix">
                  <li class="tag tag1">{{item.designStandard}}</li>
                  <li class="tag tag2">{{item.subdistrictBuildings}}</li>
                </ul>
                <p class="new-more">更多+</p>
                <div class="line-blue"></div>
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
    data() {
        return {
            sy_xf_data: []
        };
    },
    created: function() {
        this.quyuselect();
    },
    methods: {
        quyuselect: function() {
            this.$root.Bus.$on("sy_xf_data", sy_xf_data => {
                this.sy_xf_data = sy_xf_data;
            });
        }
    }
};
</script>

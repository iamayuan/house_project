<template>
  <section class="kangaroo">
    <div class="wrapper">
      <div class="title">
        <img src="../../assets/images/kangaroost.png">
      </div>
      <div class="kangaroo-list clearfix">
        <div class="kangaroobox-item" v-for="item of sy_dsyj_data">
          <div class="kangaroobox">
            <!-- <a :href="'/kangaroos_detail?leaseHouseId='+item.leaseHouseId"> -->
            <a :href="item.housePicUrl">
              <div class="kangarooboximg-box">
                <img v-bind:src="item.housePicUrl" class="kangaroobox-image">
              </div>
              <div class="kangaroo-desc">
                <p class="kangaroo-area">{{item.developeName}}
                  <span class="kangaroo-county">{{item.areaName}}</span>
                </p>
                <p class="kangaroo-doortype">{{item.houseName}}
                  <span class="kangaroo-price">{{item.houseMoney}}
                    <b class="kangaroo-unit">万</b>
                  </span>
                </p>
                <p class="kangaroo-month">月租：{{item.monthPrice}}元/㎡</p>
                <p class="kangaroo-year">年租：{{item.yearPrice}}元/㎡</p>
                <div class="kangaroo-bottom">
                  <ul class="tag-list clearfix">
                    <li class="tag tag1">{{item.direction}}</li>
                    <li class="tag tag2">{{item.houseProperties}}</li>
                    <li class="tag tag3">{{item.liftType}}</li>
                  </ul>
                  <p class="kangaroo-more" @click="clickDetail(item.leaseHouseId)">更多+</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
      <router-link to="/kangaroos">
        <div class="kangaroo-lookmore">查看更多</div>
      </router-link>
    </div>
  </section>
</template>

<script>
export default {
    data() {
        return {
            sy_dsyj_data: []
        };
    },
    created: function() {
        this.quyuselect();
    },
    methods: {
        quyuselect: function() {
            this.$root.Bus.$on("sy_dsyj_data", sy_dsyj_data => {
                this.sy_dsyj_data = sy_dsyj_data;
                console.log("----------------sy_dsyj_data");
                console.log(this.sy_dsyj_data);
            });
        },
        clickDetail: function(item) {
            this.$router.push({
                name: "kangaroos_detail",
                params: { leaseHouseId: item }
            });
        }
    }
};
</script>

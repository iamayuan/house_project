<template>
  <div class="index-swiper">
    <div class="wrapper">
      <el-carousel :interval="5000" arrow="always" class="carousel" indicator-position="outside">
        <el-carousel-item v-for="item of  banner_data">
          <a :href="getGoodsHref(item.description)"><img v-bind:src="item.logo" alt=""></a>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            banner_data: []
        };
    },
    created: function() {
        this.quyuselect();
    },
    methods: {
        quyuselect: function() {
            this.$root.Bus.$on("banner_data", banner_data => {
                this.banner_data = banner_data;
                console.log("----------------banner_data");
                console.log(this.banner_data);
            });
        },
        getGoodsHref: function(val) {
            return val;
        }
    }
};
</script>

<style scoped>
.el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
}
.el-carousel__item {
    left: 150px;
}
.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
</style>

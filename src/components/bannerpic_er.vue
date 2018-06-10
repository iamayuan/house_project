<template>
  <div class='pic_imgwarp midwarp'>
    <img src="../assets/images/pic1.png" alt="">
    <div class="lq_bannerlogo">
    <div class="lq_top_banner">
    <p class="lq_banner_title"><span class='lq_banner_name'>{{data.buildingName}}</span></p>  
    <p class="lq_ban_desc">
        <span class="lq_junjia">均价&nbsp;<span class="lq_junjia_ed">{{data.averagePrice}}/㎡</span></span>
        <span class="lq_je">{{data.houseMoney}}<span class="lq_dw">万</span></span>
    </p>
    </div>
    <ul class="lq_tm">
        <li class="tm_box" v-for="item in data.buildingProperties">{{item}}</li>
    </ul>
      <p class="lq_dh">{{data.tel}}</p>
    </div>
    <div class="right-btn">
      <img src="../assets/images/icon7.png" alt="">
      <img src="../assets/images/share.png" alt="">
    </div>
  </div>
</template>

<script>
export default {
  props: ['data'],
  data () {
    return {
    }
  }
}
</script>

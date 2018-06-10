<template>
  <div class='pic_imgwarp midwarp'>
    <img src="../assets/images/pic1.png" alt="">
    <div class="lq_bannerlogo">
    <div class="lq_top_banner">
    <p class="lq_banner_title">{{data.cityName}}<span class='lq_banner_name'>{{data.buildingName}}<img src="../assets/images/icon5.png" alt="" class="lq_ban_logo"><span class="lq_name_sz">{{data.decreaseRate}}%</span></span></p>  
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
      <img v-show="isfavorited==0" src="../assets/images/icon7_0.png" alt="" @click="saveUserFavorite">
      <img v-show="isfavorited==1" src="../assets/images/icon7_1.png" alt="">
      <a :href="data.shareUrl">
        <img src="../assets/images/share.png" alt="">
      </a>
      <a href="http://service.weibo.com/share/share.php?appkey=1978400280&ralateUid=6052727000&searchPic=true&style=simple">
        <img src="../assets/images/sina_icon.png" width="40px" height="40px" alt="分享到微博" title="分享到微博">
      </a>
    </div>
  </div>
</template>

<script>
export default {
  // relatedId:     收藏对象id
  // relatedFlag:   收藏类型: 0:楼盘 1:户型 2：二手房  3: 以租代售 4：特惠房
  props: ['data', 'relatedid', 'relatedflag'],
  data () {
    return {
      isfavorited: this.data.isFavorited
    }
  },
  methods: {
    // 收藏添加
    saveUserFavorite () {
      if (window.localStorage) {
        var token = JSON.parse(localStorage.getItem('token'));
        console.log('-------------------token');
        if (token === '' || token === null || token === undefined) {
          this.$router.push('/login');
        }
      }
      this.$http.get(this.$location + 'api/favorite/saveUserFavorite.do?from=1&timestamp=2&token=' + token + '&relatedFlag=' + this.relatedflag + '&relatedId=' + this.relatedid, {}, {
        headers: {
        },
        emulateJSON: true
      }).then((res) => {
        if (res.data.errorCode === 0) {
          this.$message({
            message: '收藏成功！',
            type: 'success'
          })
        } else {
          console.log('失败', res.data.errorMsg)
        }
      }, (error) => {
        // 调用失败
        console.log('失败', error)
      })
    }
  }
}
</script>

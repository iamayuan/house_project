<template>
  <div>
    <img src="../../assets/images/wdzl_top.jpg" alt="" class="lq_wdzl_top">
    <div class="lq_wdzl_cont" style="padding-top:30px;">
      <div class="lq_wdzl_left_pic">
        <div class="item_top_pic" >
          <img v-bind:src="geren_data.image" alt="" class="item_top_picimg" >
        </div>
      </div>
      <div class="lq_wdzl_right">
        <div class="lq_wdzl_boxleft">
          <p class="item_wdzl_box"><span class="lq_yhm">用户名：{{geren_data.nickname}}</span></p>
          <p class="item_wdzl_box"><span class="lq_yhm">手机号码：{{geren_data.mobile}}</span></p>
          <p class="item_wdzl_box"><span class="lq_yhm">邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱：{{geren_data.email}}</span></p>
          <p class="item_wdzl_box"><span class="lq_yhm">真实姓名：{{geren_data.realname}}</span></p>
          <p class="item_wdzl_box"><span class="lq_yhm">身份证号：{{geren_data.idCard}}</span></p>
          <p class="item_wdzl_box"><span class="lq_yhm">性别：{{geren_data.sex}}</span></p>
          <p class="item_wdzl_box"><span class="lq_yhm">年龄：{{geren_data.age}}岁</span></p>
        </div>
        <div class="lq_wdzl_boxright">
          <p class="item_wdzl_box"><span class="lq_yhm">常住城市：{{geren_data.houseCity}}</span></p>
          <p class="item_wdzl_box"><span class="lq_yhm">婚姻状况：{{geren_data.marryDesc}}</span></p>
          <p class="item_wdzl_box"><span class="lq_yhm">收件地址：{{geren_data.houseAddress}}</span></p>
          <p class="item_wdzl_box"><span class="lq_yhm"><img src="../../assets/images/weixing_x.png" alt="" class="lq_wx_x"> <i v-if="geren_data.thirdAuthWeixin=='' || geren_data.thirdAuthWeixin==null">微信：未绑定</i><i v-else>微信：已绑定</i></span></p>
          <p class="item_wdzl_box"><span class="lq_yhm"><img src="../../assets/images/wb_x.png" alt="" class="lq_wx_x"><i v-if="geren_data.thirdAuthWeibo == '' || geren_data.thirdAuthWeibo == null">微博：未绑定</i><i v-else>微博：已绑定</i></span></p>
          <p class="item_wdzl_box"><span class="lq_yhm"><img src="../../assets/images/qq_x.png" alt="" class="lq_wx_x"><i v-if="geren_data.thirdAuthQq == '' || geren_data.thirdAuthQq ==null ">Q Q：未绑定</i><i v-else>Q Q：已绑定</i></span></p>
        </div> 
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      geren_data: []
    }
  },
  created: function () {
    if (window.localStorage) {
      this.geren_data = JSON.parse(sessionStorage.getItem('geren_data'));
    }
  },
  methods: {
  }
}
</script>
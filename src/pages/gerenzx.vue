<template>
  <div>
    <header2></header2>
    <div class="lq_gr_cont">
      <div class="lq_gr_tab">
        <div class="lq_gr_tabtop">
          <div class="item_top_pic">
            <img v-bind:src="geren_data.image" alt="" class="item_top_picimg">
          </div>
          <p class="lq_top_name">{{geren_data.nickname}}</p>
        </div>
        <ul class="lq_gr_nav">
          <li class="item_nav_box" @click="changeTab(1)"><p class="item_title"><img src="../assets/images/wdzl_logo.png" alt="" class="item_logo"><span class="item_title_wa">我的资料</span></p></li>
          <li class="item_nav_box" @click="changeTab(2)"><p class="item_title"><img src="../assets/images/wdsc_logo.png" alt="" class="item_logo"><span class="item_title_wa">我的收藏</span></p></li>
          <li class="item_nav_box" @click="changeTab(3)"><p class="item_title"><img src="../assets/images/wdyy_logo.png" alt="" class="item_logo"><span class="item_title_wa">我的预约</span></p></li>
          <li class="item_nav_box" @click="changeTab(4)"><p class="item_title"><img src="../assets/images/wdtg_logo.png" alt="" class="item_logo"><span class="item_title_wa">我的团购</span></p></li>
          <li class="item_nav_box" @click="changeTab(5)"><p class="item_title"><img src="../assets/images/wdyj_logo.png" alt="" class="item_logo"><span class="item_title_wa">我的推荐赚佣</span></p></li>
          <li class="item_nav_box" @click="changeTab(6)"><p class="item_title"><img src="../assets/images/wdj_logo.png" alt="" class="item_logo"><span class="item_title_wa">我的袋鼠有家</span></p></li>
          <li class="item_nav_box" @click="changeTab(7)"><p class="item_title"><img src="../assets/images/wdgw_logo.png" alt="" class="item_logo"><span class="item_title_wa">我的置业顾问</span></p></li>
          <li class="item_nav_box" @click="changeTab(8)"><p class="item_title"><img src="../assets/images/wymf_logo.png" alt="" class="item_logo"><span class="item_title_wa">我要卖房</span></p></li>
        </ul>
      </div>
      <div class="lq_gr_right">
        <tab1 v-if="showindex == 1"></tab1>
        <tab2 v-if="showindex == 2"></tab2>
        <tab3 v-if="showindex == 3"></tab3>
        <tab4 v-if="showindex == 4"></tab4>
        <tab5 v-if="showindex == 5"></tab5>
        <tab6 v-if="showindex == 6"></tab6>
        <tab7 v-if="showindex == 7"></tab7>
        <tab8 v-if="showindex == 8"></tab8>
      </div>
    </div>
  </div>
</template>

<script>
  import header2 from '../components/header'
  import tab1 from '../components/home/tab1'
  import tab2 from '../components/home/tab2'
  import tab3 from '../components/home/tab3'
  import tab4 from '../components/home/tab4'
  import tab5 from '../components/home/tab5'
  import tab6 from '../components/home/tab6'
  import tab7 from '../components/home/tab7'
  import tab8 from '../components/home/tab8'
  export default {
    data () {
      return {
        tabPosition: 'left',
        showindex: 1,
        sc_data: [],
        sc_data1: [],
        sc_data2: [],
        geren_data: [],
        token: '',
        mobile: '',
        yy_data: [],
        code: '',
        wxopenid: '',
        mf_data: [],
        grdsyj_data: [],
        tj_data: [],
        tg_data: [],
        zy_data: []
      }
    },
    components: {
      tab1,
      header2,
      tab2,
      tab3,
      tab4,
      tab5,
      tab6,
      tab7,
      tab8
    },
    created: function () {
      var that = this;
      if (window.localStorage) {
        this.geren_data = JSON.parse(localStorage.getItem("geren_data"));
      }
    },
    methods: {
      changeTab (index) {
        this.showindex = index;
        if(this.showindex===2){
          this.token  =  sessionStorage.getItem("token");
          this.changeTab3();
        }else if (this.showindex===1){
          if(window.localStorage){
            this.geren_data = JSON.parse(localStorage.getItem("geren_data"));
          }
        }else if(this.showindex===3){
          this.token  =  sessionStorage.getItem("token");
          this.changeTab4();
        }else if(this.showindex===4){
          this.token  =  sessionStorage.getItem("token");
          this.changeTab5();
        }else if(this.showindex===5){
          this.token  =  sessionStorage.getItem("token");
          this.changeTab6();
        }else if(this.showindex===6){
          this.token  =  sessionStorage.getItem("token");
          this.changeTab7();
        }else if(this.showindex===7){
          this.token  =  sessionStorage.getItem("token");
          this.changeTab8();
        }else if(this.showindex===8){
          this.token  =  sessionStorage.getItem("token");
          this.changeTab9();
        }
      },
      changeTab3: function(){
        var that = this;
        /* 我的收藏查询 */

        that.$http.get(this.$location + '/api/favorite/queryUserFavoritePage.do?from=1&timestamp=2&token='+this.token+'&relatedFlag=0', {}, {
          headers: {
          },
          emulateJSON: true
        }).then(function (res) {
          // 调用成功
          this.sc_data = res.data.data.list;
          this.$root.Bus.$emit('sc_data', this.sc_data);
        }, function (error) {
          // 调用失败
          console.log(error, "失败")
        })
        this.changeTab3_1();
        this.changeTab3_2();
      },
      changeTab3_1: function(){
        var that = this;
        /* 我的收藏查询 */
        that.$http.get(this.$location + '/api/favorite/queryUserFavoritePage.do?from=1&timestamp=2&token='+this.token+'&relatedFlag=1', {}, {
          headers: {
          },
          emulateJSON: true
        }).then(function (res) {
          // 调用成功
          this.sc_data1 = res.data.data.list;
          this.$root.Bus.$emit('sc_data1', this.sc_data1);
        }, function (error) {
          // 调用失败
          console.log(error, "失败")
        })
      },
      changeTab3_2: function(){
        var that = this;
        /* 我的收藏查询 */
        that.$http.get(this.$location + '/api/favorite/queryUserFavoritePage.do?from=1&timestamp=2&token='+this.token+'&relatedFlag=2', {}, {
          headers: {
          },
          emulateJSON: true
        }).then(function (res) {
          // 调用成功
          this.sc_data2 = res.data.data.list;
          this.$root.Bus.$emit('sc_data2',this.sc_data2);
        }, function (error) {
          // 调用失败
          console.log(error, "失败")
        })
      },
      changeTab4: function(){
        var that = this;
        /* 我的预约 */
        that.$http.get(this.$location + '/api/preorder/queryUserPreorderPage.do?from=1&timestamp=2&token='+this.token, {}, {
          headers: {
          },
          emulateJSON: true
        }).then(function (res) {
          // 调用成功
          this.yy_data = res.data.data.list;
          this.$root.Bus.$emit('yy_data',this.yy_data);
        }, function (error) {
          // 调用失败
          console.log(error, "失败")
        })
      },
      changeTab5: function(){
        /* 用户团购 */
        var that = this;
        that.$http.get(this.$location + '/api/groupPurchase/queryUserGroupPurchasePage.do?from=1&timestamp=2&token=' + this.token + '&pageNum=1&numPerPage=12', {}, {
          headers: {
          },
          emulateJSON: true
        }).then(function (res) {
          this.tg_data = res.data.data;
          this.$root.Bus.$emit('tg_data', this.tg_data);
        }, function (error) {
          // 调用失败
          console.log(error, "失败")
        })
      },
      changeTab6: function(){
        var that = this;
        /* 我的推荐赚佣列表 */
        that.$http.get(this.$location + '/api/recommendCommission/queryUserRecommendCommissionPage.do?from=1&timestamp=2&token='+this.token, {}, {
          headers: {
          },
          emulateJSON: true
        }).then(function (res) {
          // 调用成功
          this.tj_data = res.data.data.list;
          this.$root.Bus.$emit('tj_data', this.tj_data);
        }, function (error) {
          // 调用失败
          console.log(error, "失败")
        })
      },
      changeTab7: function(){
        var that = this;
        /* 我的袋鼠有家 */
        that.$http.get(this.$location + '/api/leaseHousePreorder/queryUserLeaseHousePreorderPage.do?from=1&timestamp=2&token='+this.token, {}, {
          headers: {
          },
          emulateJSON: true
        }).then(function (res) {
          // 调用成功
          this.grdsyj_data = res.data.data.list;
          this.$root.Bus.$emit('grdsyj_data',this.grdsyj_data);
        }, function (error) {
          // 调用失败
          console.log(error, "失败")
        })
      },
      changeTab8: function(){
        var that = this;
        /* 我的置业顾问 */
        that.$http.get(this.$location + '/api/consultant/queryUserConsultantPage.do?from=1&timestamp=2&token='+this.token+'&pageNum=1&numPerPage=12', {}, {
          headers: {
          },
          emulateJSON: true
        }).then(function (res) {
          // 调用成功
          this.zy_data = res.data.data;
          this.$root.Bus.$emit('zy_data', this.zy_data);
        }, function (error) {
          // 调用失败
          console.log(error, "失败")
        })
      },
      changeTab9: function(){
        var that = this;
        /* 我要卖房查询 */
        that.$http.get(this.$location + '/api/secondHousePersonal/queryUserSecondHousePersonalPage.do?from=1&timestamp=2&token='+this.token, {}, {
          headers: {
          },
          emulateJSON: true
        }).then(function (res) {
          // 调用成功
          this.mf_data = res.data.data.list;
          for (var i=0,len=this.mf_data.length;i<len;i++) {
            this.mf_data[i].item_jujia = Math.floor(this.mf_data[i].houseMoney*10000/this.mf_data[i].houseArea);
          }
          this.$root.Bus.$emit('mf_data', this.mf_data);
        }, function (error) {
          // 调用失败
          console.log(error, "失败")
        })
      }
    }
  }
</script>


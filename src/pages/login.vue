<template>
  <div>
    <div class="mark"></div>
    <div class="lq_login_text">
      <p class="lq_title">登录</p>
      <p class="lq_right_text">
        <router-link to="/" class="no-login">暂不登录&nbsp;&gt;</router-link>
      </p>
      <input type="text" class="lq_tel" placeholder="请输入手机号" ref="input1">
      <p class="lq_tel_yanzm">
        <input type="text" class="lq_input" placeholder="请输入验证码" ref="input2" maxlength="4">
        <span class="lq_tel_button" @click="lq_yzmhq" v-if="!sendMsgDisabled">{{yzm}}</span>
        <span class="lq_tel_djs" v-if="sendMsgDisabled">{{time+'重新发送'}}</span>
      </p>
      <p class="lq_gx"><input name="Fruit" type="checkbox" value="" />&nbsp;下次自动登录</p>
      <p class="lq_button" @click="lq_login">立即登录</p>
      <img src="../assets/images/disanfang.png" alt="" class="lq_xx">
      <img src="../assets/images/qq.png" alt="" class="lq_qq_pic" @click="qq_login">
      <img src="../assets/images/weixin.png" alt="" class="lq_wx_pic" @click="weixin_login">
      <img src="../assets/images/weibo.png" alt="" class="lq_wb_pic" @click="wb_login">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'hello',
    data () {
      return {
        input1: null,            // 电话号码
        input2: null,            // 验证码
        yzm: '获取验证码',
        time: 60,               // 发送验证码倒计时
        sendMsgDisabled: false
      }
    },
    created: function () {
      // this.mounted()       //定义方法
    },
    methods: {
      // 验证码获取
      lq_yzmhq: function () {
        var that = this;
        that.result1 = that.$refs.input1.value;
        if (that.result1 === null || that.result1 === 'null' || that.result1.length > 11 || 11 > that.result1.length) {
          alert('请输入正确的手机号！')
        } else {
          that.$http.get(this.$location + '/api/sms/sendMoibleSms.do?from=1&timestamp=2&mobile='+that.result1, {}, {
            headers: {
            },
            emulateJSON: true
          }).then(function (res) {
            // 调用成功
            console.log('获取验证码成功', res.data.data)
            // 验证码倒计时
            this.send();
          }, function (error) {
            // 调用失败
            console.log('获取验证码失败', error)
          })
        }
      },
      // 立即登录
      lq_login: function () {
        var that = this;
        that.result1 = that.$refs.input1.value;
        that.result2 = that.$refs.input2.value;
        that.$http.get(this.$location+'/api/user/login.do?from=1&timestamp=1&username=' + that.result1 + '&smsCode=' + that.result2, {}, {
          headers: {
          },
          emulateJSON: true
        }).then(function (res) {
           // 调用成功
          console.log('登录成功', res.data.data.token);
          sessionStorage.setItem('token',res.data.data.token);
          sessionStorage.setItem('logined',true);
          this.getInfo()
        
        }, function (error) {
          // 调用失败
          console.log('登录失败', error)
        })
      },

      getInfo: function () {
        var that = this;
        var token = sessionStorage.getItem("token");
          
        that.$http.get(this.$location+'/api/user/queryUserInfo.do?from=1&timestamp=2&token='+ token, {}, {
          headers: {
          },
          emulateJSON: true
        }).then(function (res) {
           // 调用成功
          console.log('个人信息', res.data.data);
          localStorage.setItem('geren_data',JSON.stringify(res.data.data));
          this.$router.push({ name: 'home'})
        
        }, function (error) {
          // 调用失败
          console.log('登录失败', error)
        })
      },
      // QQ立即登录
      qq_login: function () {
        window.open('https://graph.qq.com/oauth2.0/authorize?client_id=101439341&response_type=token&scope=all&redirect_uri=http%3A%2F%2Fwww.yingjiakanfang.com');
      },
      // 微博立即登录
      wb_login: function () {
        // window.open('https://api.weibo.com/oauth2/authorize?client_id=2635548033@qq.com&response_type=code&redirect_uri=http%3A%2F%2Fwww.yingjiakanfang.com');
      },
      // 微信立即登录
      weixin_login: function () {
        window.open('https://open.weixin.qq.com/connect/qrconnect?appid=wxc18c04a3999871ba&redirect_uri=http://www.yingjiakanfang.com&response_type=bbb969362ef37c5ebdbce7bae1ec0e6f&scope=snsapi_login&state=STATE#wechat_redirect');
      },
      // 验证码倒计时
      send: function () {
        let me = this;
        me.sendMsgDisabled = true;
        let interval = window.setInterval(function () {
          if ((me.time--) <= 0) {
            me.time = 60;
            me.sendMsgDisabled = false;
            window.clearInterval(interval);
          }
        }, 1000);
      }
    }
  }
</script>
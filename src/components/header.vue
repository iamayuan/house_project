<template>
  <header>
    <div class="midwarp">
      <ul>
        <li v-for="lis in ul">
          <router-link :to="{path:lis.name}" class="sub-href">
            {{lis.li }}
          </router-link>
        </li>
      </ul>
      <div class="login-detail"><a href="#/login" class="login-in" v-if="lq_login">登录/注册</a><a href="#/gerenzx" class="login-in" v-if="lq_grzx"><img src="../assets/images/icon3.png" class="login-img"><span class="lq_grzxtop">个人中心</span></a><el-button type="primary" size="mini" class="lq_zx_tj" v-on:click="lq_zhuxiao" v-if="lq_grzx">注销</el-button></div>
    </div>
  </header>
</template>

<script>
  export default {
    data () {
      return {
        ul: [
          { li: '首页',name:'/'},
          { li: '新房',name:'/new_index'},
          { li: '二手房',name:'/secondHand' },
          { li: '特惠房',name:'/preference'},
          { li: '资讯中心',name:'/zixun'},
          { li: '关于我们',name:'/guanyu'},
        ],
        token:'',
        lq_login:true,
        lq_grzx:false

      }
    },
    created:function(){
      var that = this;
        if(window.localStorage){
        this.token = JSON.parse(localStorage.getItem("token"));
        }
       
        this.login_pd();
       this.wxopenid = localStorage.getItem("wxopenid")
      this.panduan()
    },
    methods:{
      login_pd:function(){
       var that = this;
       if(this.token===''||this.token===undefined||this.token==='undefined'||this.token===null||this.token==='null'||this.token===' '){
        this.lq_login=true;
        this.lq_grzx=false;
       }else{
        this.lq_login=false;
        this.lq_grzx=true;
       }
      }
      ,lq_zhuxiao:function(){

      },
      canshu:function(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;

    },
    //判断是何种方式登录
    panduan:function(){
       var that = this;
        var name1 = 'access_token';
        var name2 = 'code';
     
     var access_token = this.canshu(name1);
     var code = this.canshu(name2);
     if(access_token===null||access_token==='null'||access_token===''){
      //qq未登录
     }else{
       this.qq_check_OpenID(access_token)
     }
      if(code===null||code==='null'||code===''){
           }else {
            this.weixin_check_code(code);
           }
  
    this.weixin_check_geren();
     },
  qq_check_OpenID:function(access_token){
     var that = this;
    /* this.access_token='62C4F9EC3029E39502888933384674C8';*/
    /*获取用户OpenID*/
     that.$http.get(this.$location + '/me?access_token='+access_token, {}, {
        headers: {
        },
        emulateJSON: true
      }).then(function (res) {
        //调用成功
         console.log(res,"成功")
         this.openid =res.data.substring(res.data.indexOf(',')+1,res.data.indexOf('}')).split(":")[1];
         var reg = new RegExp('"',"g");  
        this.openid = this.openid.replace(reg,""); 
        this.check_gerenqq();
        
      }, function (error) {
        //调用失败
        console.log(error,"失败")
      })
   },
   weixin_check_code:function(code){
      var that = this;
      that.$http.get(this.$location + '/oauth2/access_token?appid=wxc18c04a3999871ba&secret=bbb969362ef37c5ebdbce7bae1ec0e6f&code='+code+'&state=STATE&grant_type=authorization_code', {}, {
        headers: {
        },
        emulateJSON: true
      }).then(function (res) {
        //调用成功
         console.log(res,"成功22")
        this.wxopenid = res.data.openid;
        if(this.wxopenid===undefined||this.wxopenid==='undefined'){

        }else{
           localStorage.setItem("wxopenid",this.wxopenid);
        }  
         this.weixin_check_geren();
      }, function (error) {
        //调用失败
        console.log(error,"失败")
      })

   },
   weixin_check_geren:function(){
        var that = this;
         that.$http.get(this.$location + '/api/user/thirdLogin.do?from=1&timestamp=1&thirdType=weixin&thirdUid='+this.wxopenid, {}, {
        headers: {
        },
        emulateJSON: true
      }).then(function (res) {
        //调用成功
            console.log(res,"成功11")
            this.geren_data = res.data.data;
            this.token = res.data.data.token;
            if(window.localStorage){
        localStorage.setItem("token",JSON.stringify(this.token));
      } 
           this.login_pd();
             if(window.localStorage){
        localStorage.setItem("geren_data",JSON.stringify(this.geren_data));
      } 
           
      }, function (error) {
        //调用失败,绑定第三方账号
        console.log(error,"失败")
      })
   },
   check_gerenqq:function(){
     var that = this;
     /*查询token*/
     that.$http.get(this.$location + '/api/user/thirdLogin.do?from=1&timestamp=1&thirdType=qq&thirdUid='+this.openid, {}, {
        headers: {
        },
        emulateJSON: true
      }).then(function (res) {
        //调用成功
        this.mobile = res.data.data.mobile;
        this.bnagdingqq();
      }, function (error) {
        //调用失败
        console.log(error,"失败")
      })
   },
   bnagdingqq:function(){
       var that = this;
         that.$http.get(this.$location + '/api/user/thirdRegister.do?from=1&timestamp=1&thirdType=qq&thirdUid='+this.openid+'&username='+this.mobile, {}, {
        headers: {
        },
        emulateJSON: true
      }).then(function (res) {
        //调用成功
        this.token = res.data.data.token;
        this.check_gerenqq2();
      }, function (error) {
        //调用失败
        console.log(error,"失败")
      })
   },
   check_gerenqq2:function(){
     var that = this;
      /*查询个人信息*/
       that.$http.get(this.$location + '/api/user/queryUserInfo.do?from=1&timestamp=1&token='+this.token, {}, {
        headers: {
        },
        emulateJSON: true
      }).then(function (res) {
        //调用成功
            console.log(res,"成功11")
            this.geren_data = res.data.data;
         if(window.localStorage){
        localStorage.setItem("geren_data",JSON.stringify(this.geren_data));
      } 
          this.login_pd();
           
      }, function (error) {
        //调用失败
        console.log(error,"失败")
      })
   }
    }
  }

</script>
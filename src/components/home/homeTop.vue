<template>
  <!--顶部区域-->
  <div class="home-top">
      <div class="wrapper">
          <p class="lq_dqcs" v-on:mouseenter="visible">{{item_cs}} <span class="el-input__icon el-icon-caret-top" style="transform: rotate(180deg)"> </span></p>
          <div class="login">
              <router-link to="/login" class="login-in" v-if="lq_login">登录/注册</router-link>
              <router-link to="/gerenzx" class="login-in" v-if="lq_grzx"><img src="../../assets/images/icon3.png" class="login-img"><span class="lq_grzxtop">个人中心</span></router-link>
              <el-button type="primary" class="lq_zy_tj" v-on:click="lq_zhuxiao" v-if="lq_grzx">注销</el-button>
          </div>
      </div>
      <div class="lq_csxz_lb" v-show="seen" v-on:mouseenter="visible" id="lq_csxz_lb">
          <el-select v-model="value4" filterable clearable placeholder="请选择" @change="sfselect()" v-on:mouseenter="visible">
              <el-option v-for="item in newdata" :value="item.proName">
              </el-option>
          </el-select>
          <el-select v-model="value42" filterable clearable placeholder="请选择" @change="sfselect2()" v-on:mouseenter="visible">
              <el-option v-for="item in newdata2" :value="item.cityName">
              </el-option>
          </el-select>
      </div>
  </div>
</template>
<script>
export default {
    data() {
        return {
            value4: '',
            value42: '',
            seen: false,
            item_cs: null,
            proId: '',
            login:'',
            newdata: [], //省
            newdata2: [], //市
            value: '',
            sji: [],
            shijidata: [],
            access_token: '',
            oauth_consumer_key: '',
            openid: '',
            geren_data: [],
            newdata: [],
            quyu_data: [],
            code: '',
            wxopenid: '',
            token: '',
            lq_login: true,
            lq_grzx: false,
            sf_id:'',
            cityId:'',
            banner_data:[]
        }
    },
    created: function() {
        this.login = sessionStorage.getItem('logined');
        if(this.login=="true"){
            this.lq_grzx =true;
            this.lq_login=false;
        }
        this.wxopenid = localStorage.getItem("wxopenid")
        //this.panduan()
        this.mounted();
        this.showCityInfo();
        this.sf_id =  sessionStorage.getItem("proId");
        this.cityId = sessionStorage.getItem("cityId");

        this.sp_check();
        this.sp_check3(sessionStorage.getItem("cityId"));
        this.sp_check3_1(sessionStorage.getItem("cityId"));
        this.sp_check2(sessionStorage.getItem("cityId"));
        this.sp_check4(sessionStorage.getItem("cityId"));
        this.sp_check4_1(sessionStorage.getItem("cityId"));
        this.sp_check5(sessionStorage.getItem("cityId"),3);
        this.sp_check6(sessionStorage.getItem("cityId"));
        this.sp_check7(sessionStorage.getItem("cityId"));
        this.top_quyu(sessionStorage.getItem("cityId"));
        this.bannerList(sessionStorage.getItem("cityId"));
    },
    methods: {
        login_pd1: function() {
            var that = this;
            if (this.token === '' || this.token === undefined || this.token === 'undefined' || this.token === null || this.token === 'null') {
                this.lq_login = true;
                this.lq_grzx = false;
            } else {
                this.lq_login = false;
                this.lq_grzx = true;
            }
        },
        mounted: function() {
            var that = this;
            that.$http.get('/api/area/queryAreaList.do?from=1&timestamp=2', {}, {
                headers: {},
                emulateJSON: true
            }).then(function(res) {
                //调用成功
                this.newdata = res.data.data.proList;
            }, function(error) {
                //调用失败
                console.log(error)
            })
        },
        visible: function() {
            this.seen = true;
        },
        display: function() {
            this.seen = false;
        },
        showCityInfo: function() {
            var that = this;
            var citysearch = new AMap.CitySearch();
            //自动获取用户IP，返回当前城市
            citysearch.getLocalCity(function(status, result) {

                if (status === 'complete' && result.info === 'OK') {
                    if (result && result.city && result.bounds) {
                        var leng = result.province.length - 1;
                        var province = result.province.substring(0, leng); //当前省份
                        that.value4 = province;
                        var cityinfo = result.city.substring(0, leng); //当前城市
                        that.value42 = cityinfo;

                        if(sessionStorage.getItem("city_dw") == null){
                            that.item_cs = cityinfo;
                        }else{
                            that.item_cs = sessionStorage.getItem("city_dw");
                            that.value42 = sessionStorage.getItem("city_dw");
                            that.value4 = sessionStorage.getItem("proName");
                        }
                        var cs_Data = that.newdata;
                        for (var i = 0; i < cs_Data.length; i++) {
                            if (province === cs_Data[i].proName) {
                                var proId = cs_Data[i].proId;
                                sessionStorage.setItem("proId", proId); //当前定位省份id
                            }
                        }
                        var proId = sessionStorage.getItem("proId");
                        that.$http.get('/api/area/queryCityListByProId.do?proId=' + proId, {}, {
                            headers: {},
                            emulateJSON: true
                        }).then(function(res) {
                            //调用成功
                            that.newdata2 = res.data.data;
                            for (var i = 0; i < that.newdata2.length; i++) {
                                if (cityinfo === that.newdata2[i].cityName) {
                                    var cityId = that.newdata2[i].cityId;
                                    sessionStorage.setItem("cityId", cityId); //当前定位市级id
                                    this.sp_check()
                                }
                            }
                        }, function(error) {
                            //调用失败
                            console.log(error)
                        })
                    }
                }
            });
        },
        sfselect: function() {
            var Data = this.newdata;
            //console.log(Data)
            for (var i = 0; i < Data.length; i++) {
                if (this.value4 === Data[i].proName) {
                    //console.log(Data[i].proId)//筛选出当前的省id
                    var proId = Data[i].proId;
                    sessionStorage.setItem("proId", proId); //当前选择省级id
                    sessionStorage.setItem("proName",Data[i].proName);
                    this.sjselect()
                }
            }
        },
        sjselect: function() {
            var that = this;
            var proId = sessionStorage.getItem("proId");
            that.$http.get('/api/area/queryCityListByProId.do?proId=' + proId, {}, {
                headers: {},
                emulateJSON: true
            }).then(function(res) {
                //调用成功
                //console.log("市级",res)
                that.newdata2 = res.data.data;
                that.value42 = res.data.data[0].cityName;
            }, function(error) {
                //调用失败
                //console.log(error)
            })
        },
        sfselect2: function() {
            var that = this;
            var Data2 = this.newdata2;
            //console.log(Data2)
            for (var i = 0; i < Data2.length; i++) {
                if (this.value42 === Data2[i].cityName) {
                    //console.log(Data2[i].cityId)//筛选出当前的省id
                    var cityId = Data2[i].cityId;
                    sessionStorage.setItem("cityId", cityId); //当前选择市级id
                    that.item_cs = Data2[i].cityName;
                    sessionStorage.setItem("city_dw",Data2[i].cityName)
                    this.sp_check()
                    this.top_quyu(cityId);

                }
            }

            this.seen = false;
        },
    top_quyu:function(cityId){
       var that = this;
       that.$http.get('/api/area/queryAreaListByCityId.do?from=1&timestamp=2&cityId='+cityId, {}, {
        headers: {
        },
        emulateJSON: true
      }).then(function (res) {
        //调用成功
        this.quyu_data = res.data.data.list;
        if(window.localStorage){
           localStorage.setItem("quyu_data",JSON.stringify(this.quyu_data));
        }

      }, function (error) {
        //调用失败
        console.log(error)
      })
     },

        /* 新房-新房推荐*/
        sp_check: function() {
            var that = this;
            var proId = sessionStorage.getItem("proId");
            var cityId = sessionStorage.getItem("cityId");
            that.$http.get('/api/building/queryBuildingPage.do?from=1&timestamp=2&tag=all&pageNum=1&numPerPage=20&proId=' + proId + '&cityId=' + cityId, {}, {
                headers: {},
                emulateJSON: true
            }).then(function(res) {
                //调用成功
                var xf_xf_data = res.data.data.list; //源数据
                for (var i = 0; i < xf_xf_data.length; i++) {
                    xf_xf_data[i].externalPicUrl = xf_xf_data[i].externalPicUrl.split(",")[0];
                }
                //newftj_data:新房推荐
                this.$root.Bus.$emit('xf_xf_data', xf_xf_data);

            }, function(error) {
                //调用失败
                console.log("失败", error)
            })
        },
        /* 二手房*/
        sp_check2: function(cityId) {
            var that = this;
            that.$http.get('/api/secondHouse/querySecondHousePage.do?from=1&timestamp=2&pageNum=1&numPerPage=20&proId=' + this.sf_id + '&cityId=' + cityId, {}, {
                headers: {},
                emulateJSON: true
            }).then(function(res) {
                //调用成功
                var esf_data = res.data.data.list; //源数据
                //newftj_data:新房推荐
                this.$root.Bus.$emit('esf_data', esf_data);
                //console.log(esf_data, "esf", this.sf_id, cityId)

            }, function(error) {
                //调用失败
                console.log("失败", error)
            })
        },
        /* 袋鼠有家*/
        sp_check3: function(cityId) {
            var that = this;
            that.$http.get('/api/leaseHouse/queryLeaseHousePage.do?from=1&timestamp=2&pageNum=1&numPerPage=20&proId=' + this.sf_id + '&cityId=' + cityId, {}, {
                headers: {},
                emulateJSON: true
            }).then(function(res) {
                //调用成功
                var dsyj_data = res.data.data.list; //源数据
                console.log(dsyj_data,'袋鼠有家数据');
                this.$root.Bus.$emit('dsyj_data', dsyj_data);


            }, function(error) {
                //调用失败
                console.log("失败", error)
            })
        },
        /* 首页袋鼠有家*/
        sp_check3_1: function(cityId) {
            var that = this;
            that.$http.get('/api/leaseHouse/queryLeaseHousePage.do?from=1&timestamp=2&pageNum=1&numPerPage=20&proId=' + this.sf_id + '&cityId=' + cityId, {}, {
                headers: {},
                emulateJSON: true
            }).then(function(res) {
                //调用成功
                var sy_dsyj_data = res.data.data.list; //源数据
                this.$root.Bus.$emit('sy_dsyj_data', sy_dsyj_data);


            }, function(error) {
                //调用失败
                console.log("失败", error)
            })
        },
        /* 特惠房*/
        sp_check4: function(cityId) {
            var that = this;
            that.$http.get('/api/promotionHouse/queryPromotionHousePage.do?from=1&timestamp=2&pageNum=1&numPerPage=20&proId=' + this.sf_id + '&cityId=' + cityId, {}, {
                headers: {},
                emulateJSON: true
            }).then(function(res) {
                //调用成功
                var thf_data = res.data.data.list; //源数据
                console.log(thf_data,"44")
                //newftj_data:新房推荐
                this.$root.Bus.$emit('thf_data', thf_data);


            }, function(error) {
                //调用失败
                console.log("失败", error)
            })
        },
        /* 首页特惠房*/
        sp_check4_1: function(cityId) {
            var that = this;
            console.log(this.sf_id,this.cityId,"0000")
            that.$http.get('/api/promotionHouse/queryPromotionHousePage.do?from=1&timestamp=2&pageNum=1&numPerPage=20&proId=' + this.sf_id + '&cityId=' + this.cityId, {}, {
                headers: {},
                emulateJSON: true
            }).then(function(res) {
                //调用成功
                var sy_thf_data = res.data.data.list; //源数据
                console.log(sy_thf_data,"99990")
                //newftj_data:新房推荐
                this.$root.Bus.$emit('sy_thf_data', sy_thf_data);


            }, function(error) {
                //调用失败
                console.log("失败", error)
            })
        },
        /* 首页热销推荐*/
        sp_check5: function(cityId,numPerPage) {
            var that = this;
            that.$http.get('/api/building/queryHotBuildingTopN.do?from=1&timestamp=2&proId=' + this.sf_id + '&cityId=' + cityId + '&numPerPage='+numPerPage, {}, {
                headers: {},
                emulateJSON: true
            }).then(function(res) {
                //调用成功
                var syrx_data = res.data.data.list; //源数据
                for (var i = 0; i < syrx_data.length; i++) {
                    syrx_data[i].externalPicUrl = syrx_data[i].externalPicUrl.split(",")[0];
                }
                //newftj_data:新房推荐
                this.$root.Bus.$emit('syrx_data', syrx_data);

            }, function(error) {
                //调用失败
                console.log("失败", error)
            })
        },
        /* 首页新房推荐*/
        sp_check6: function(cityId) {
            var that = this;
            that.$http.get('/api/building/queryBuildingPage.do?from=1&timestamp=2&tag=all&pageNum=1&numPerPage=20&proId=' + this.sf_id + '&cityId=' + cityId, {}, {
                headers: {},
                emulateJSON: true
            }).then(function(res) {
                //调用成功
                var sy_xf_data = res.data.data.list; //源数据
                for (var i = 0; i < sy_xf_data.length; i++) {
                    sy_xf_data[i].externalPicUrl = sy_xf_data[i].externalPicUrl.split(",")[0];
                }
                //newftj_data:新房推荐
                this.$root.Bus.$emit('sy_xf_data', sy_xf_data);

            }, function(error) {
                //调用失败
                console.log("失败", error)
            })
        },
        /* 首页房企品牌*/
        sp_check7: function(cityId) {
            var that = this;
            that.$http.get('/api/develope/queryDevelopeList.do?from=1&timestamp=2&numPerPage=5&proId=' + this.sf_id + '&cityId=' + cityId, {}, {
                headers: {},
                emulateJSON: true
            }).then(function(res) {
                //调用成功
                var sy_fq_data = res.data.data.list; //源数据
                //sy_fq_data:首页房企品牌
                console.log(sy_fq_data, "房企品牌")
                this.$root.Bus.$emit('sy_fq_data', sy_fq_data);

            }, function(error) {
                //调用失败
                console.log("失败", error)
            })
        },
        lq_zhuxiao: function() {

        },
        canshu: function(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;

        },
        //判断是何种方式登录
        panduan: function() {
            var that = this;
            var name1 = 'access_token';
            var name2 = 'code';

            var access_token = this.canshu(name1);
            var code = this.canshu(name2);
            if (access_token === null || access_token === 'null' || access_token === '') {
                //qq未登录
            } else {
                this.qq_check_OpenID(access_token)
            }
            if (code === null || code === 'null' || code === '') {} else {
                this.weixin_check_code(code);
            }

            this.weixin_check_geren();
        },
        qq_check_OpenID: function(access_token) {
            var that = this;
            /* this.access_token='62C4F9EC3029E39502888933384674C8';*/
            /*获取用户OpenID*/
            that.$http.get('?access_token=' + access_token, {}, {
                headers: {},
                emulateJSON: true
            }).then(function(res) {
                //调用成功
                console.log(res, "成功")
                this.openid = res.data.substring(res.data.indexOf(',') + 1, res.data.indexOf('}')).split(":")[1];
                var reg = new RegExp('"', "g");
                this.openid = this.openid.replace(reg, "");
                this.check_gerenqq();

            }, function(error) {
                //调用失败
                console.log(error, "失败")
            })
        },
        weixin_check_code: function(code) {
            var that = this;
            that.$http.get('/access_token?appid=wxc18c04a3999871ba&secret=bbb969362ef37c5ebdbce7bae1ec0e6f&code=' + code + '&state=STATE&grant_type=authorization_code', {}, {
                headers: {},
                emulateJSON: true
            }).then(function(res) {
                //调用成功
                console.log(res, "成功22")
                this.wxopenid = res.data.openid;
                if (this.wxopenid === undefined || this.wxopenid === 'undefined') {

                } else {
                    localStorage.setItem("wxopenid", this.wxopenid);
                }
                this.weixin_check_geren();
            }, function(error) {
                //调用失败
                console.log(error, "失败")
            })

        },
        weixin_check_geren: function() {
            var that = this;
            that.$http.get('/api/user/thirdLogin.do?from=1&timestamp=1&thirdType=weixin&thirdUid=' + this.wxopenid, {}, {
                headers: {},
                emulateJSON: true
            }).then(function(res) {
                //调用成功
                console.log(res, "成功11")
                this.geren_data = res.data.data;
                this.token = res.data.data.token;
                if (window.localStorage) {
                    localStorage.setItem("token", JSON.stringify(this.token));
                }
                this.login_pd1();
                if (window.localStorage) {
                    localStorage.setItem("geren_data", JSON.stringify(this.token));
                }
                /* this.$root.Bus.$emit('geren_data',this.geren_data);*/

            }, function(error) {
                //调用失败,绑定第三方账号
                console.log(error, "失败")
            })
        },
        check_gerenqq: function() {
            var that = this;
            /*查询token*/
            that.$http.get('/api/user/thirdLogin.do?from=1&timestamp=1&thirdType=qq&thirdUid=' + this.openid, {}, {
                headers: {},
                emulateJSON: true
            }).then(function(res) {
                //调用成功
                this.mobile = res.data.data.mobile;
                this.bnagdingqq();
            }, function(error) {
                //调用失败
                console.log(error, "失败")
            })
        },
        bnagdingqq: function() {
            var that = this;
            that.$http.get('/api/user/thirdRegister.do?from=1&timestamp=1&thirdType=qq&thirdUid=' + this.openid + '&username=' + this.mobile, {}, {
                headers: {},
                emulateJSON: true
            }).then(function(res) {
                //调用成功
                this.token = res.data.data.token;
                this.check_gerenqq2();
            }, function(error) {
                //调用失败
                console.log(error, "失败")
            })
        },
        check_gerenqq2: function() {
            var that = this;
            /*查询个人信息*/
            that.$http.get('/api/user/queryUserInfo.do?from=1&timestamp=1&token=' + this.token, {}, {
                headers: {},
                emulateJSON: true
            }).then(function(res) {
                //调用成功
                console.log(res, "成功11")
                this.geren_data = res.data.data;
                if (window.localStorage) {
                    localStorage.setItem("geren_data", JSON.stringify(this.token));
                }
                this.login_pd1();

            }, function(error) {
                //调用失败
                console.log(error, "失败")
            })
        },
        bannerList: function(cityId) {
            var that = this;
            that.$http.get('/api/bannerInfo/queryBannerInfoListByCityId.do?from=1&timestamp=1'+'&cityId='+cityId+'&groupCode=app_building', {}, {
                headers: {},
                emulateJSON: true
            }).then(function(res) {
                //调用成功
                var banner_data = res.data.data.list; //源数据
                console.log(banner_data, "图片")
                this.$root.Bus.$emit('banner_data', banner_data);

            }, function(error) {
                //调用失败
                console.log(error, "失败")
            })
        }

    }
}
</script>
<style scoped>
.lq_dqcs {
    width: 100px;
    height: 45px;
    line-height: 45px;
    color: #fff;
    font-size: 20px;
    position: relative;
}

.lq_csxz_lb {
    width: 300px;
    height: 400px;
    line-height: 50px;
    margin: 0 auto;
    top: 0px;
    z-index: 999;
    left: 50%;
    margin-left: -499px;
    position: absolute;
}

.el-select {
    width: 100px;
    float: left;
    height: 50px;
    overflow: hidden;
}

.el-select-dropdown__item {
    width: 100%;
    height: 50px;
    line-height: 50px;
}
#lq_csxz_lb .el-input__inner {
    padding-right: 35px;
    color: #fff!important;
}
.el-select .el-input__inner {
    color: #fff;
}

.el-select-dropdown__item {
    padding: 0;
}

.el-select .el-input__inner {
    color: #fff !important;
}

.el-input__inner {
    color: #fff !important;
}
</style>

<template>
  <div class="b_f5">
    <homeheader></homeheader>
    <div>
      <banner :data="itemdata" :relatedid="buildingId" :relatedflag="0" v-if="itemdata"></banner>
      <div class='midwarp'>
        <p class="now_add">
          <img src="../assets/images/icon8.png" alt="" class="lq_now_add_ico">
          <span class="lq_now_span">首页</span> &gt;
          <span class="lq_now_span">新房</span> &gt;
          <span class="lq_now_span">{{itemdata.buildingName}}</span>
        </p>
        <ul class="tab_ul">
          <li v-for="(item,index) in infor" @click="qwer=index" :class='{selected:index==qwer}'>
            <a v-bind:href="item.id">{{item.name}}</a>
          </li>
        </ul>
        <div class="floatR-img">
          <img src="../assets/images/btn1.png" @click="isShowY=true;isYuyue=true">
          <img src="../assets/images/icon6.png" @click="isShowY=true;isYuyue=false">
        </div>
      </div>
      <section id="floor1" class="midwarp">
        <p class="d_title">楼盘简介</p>
        <div class="hauto">
          <p class="hx_infor">楼盘地址</p>
          <!-- <img src="../assets/images/pic2.png" alt="" class="address_img"> -->
          <div class="address_img" id="conter"></div>
        </div>
        <ul class="newH_ul">
          <li>
            <span>项目地址</span>{{itemdata.projectAddress}}</li>
          <li>
            <span>售楼处地址</span>{{itemdata.saleAddress}}</li>
        </ul>
        <div class="hauto">
          <p class="hx_infor">楼盘介绍：</p>
          <p class="lp_d">{{itemdata.projectDescription}}</p>
          <ul class="lp_ul">
            <li>开发商：
              <em>{{itemdata.developeName}}</em>
            </li>
            <li>交房时间：
              <em>{{itemdata.buildingArea}}</em>
            </li>
            <li>绿化率：
              <em>{{itemdata.greenPercent}}</em>
            </li>
            <li>投资商：
              <em>{{itemdata.investor}}</em>
            </li>
            <li>装修标准：
              <em>{{itemdata.designStandard}}</em>
            </li>
            <li>容积率：
              <em>{{itemdata.volumeRatio}}</em>
            </li>
            <li>销售代理商：
              <em>{{itemdata.saleAgent}}</em>
            </li>
            <li>建筑类型：
              <em>{{itemdata.buidlingType}}</em>
            </li>
            <li>物业费：
              <em>{{itemdata.propertyFee}}</em>
            </li>
            <li>物业管理公司：
              <em>{{itemdata.houseCorp}}</em>
            </li>
            <li>物业类型：
              <em>{{itemdata.houseType}}</em>
            </li>
            <li>车位数：
              <em>{{itemdata.carNum}}</em>
            </li>
            <li>楼盘名称：
              <em>{{itemdata.buildingName}}</em>
            </li>
            <li>产权年限：
              <em>{{itemdata.ownYear}}</em>
            </li>
            <li>户数：
              <em>{{itemdata.peopleNum}}</em>
            </li>
            <li>均价：
              <em>{{itemdata.averagePrice}}元/㎡</em>
            </li>
            <li>建筑面积：
              <em>{{itemdata.buildingArea}}㎡</em>
            </li>
            <li>
              <em></em>
            </li>
            <li>开盘时间：
              <em>{{itemdata.openTime}}</em>
            </li>
            <li>占地面积：
              <em>{{itemdata.landArea}}㎡</em>
            </li>
          </ul>
        </div>
      </section>
      <section id="floor2" class="midwarp">
        <div class="title-box">
          <p class="d_title1">户型介绍</p>
          <ul class="doortype-ul clearfix">
            <li class="door-active">全部户型（{{listdata.length}}）</li>
            <!-- <li>全部户型（8）</li>
          <li>全部户型（8）</li> -->
          </ul>
        </div>
        <ul class="new_hxjs">
          <li v-for="(item,index) in listdata" :key="index">
            <router-link :to="'/doorType?houseId='+item.houseId">
              <img :src="item.housePicUrl" alt="">
              <p>{{item.houseName}}<br/>
                <span>建筑面积:约{{item.houseArea}}㎡</span>
                <em class="blue_icon">主推</em>
              </p>
            </router-link>
          </li>
        </ul>
      </section>
      <section id="floor3" class="midwarp">
        <p class="d_title">周边配套</p>
        <div class="hauto hautono">
          <div class="hauto-li clearfix">
            <p class="hx_infor2">交通设施</p>
            <p class="lp_d2" v-html="itemdata.traffic"></p>
          </div>
          <div class="hauto-li clearfix">
            <p class="hx_infor2">学校</p>
            <p class="lp_d2" v-html="itemdata.school"></p>
          </div>
          <div class="hauto-li clearfix">
            <p class="hx_infor2">超市菜场</p>
            <p class="lp_d2" v-html="itemdata.market"></p>
          </div>
          <div class="hauto-li clearfix">
            <p class="hx_infor2">医院药房</p>
            <p class="lp_d2" v-html="itemdata.hospital"></p>
          </div>
          <div class="hauto-li clearfix">
            <p class="hx_infor2">银行</p>
            <p class="lp_d2" v-html="itemdata.bank"></p>
          </div>
        </div>
      </section>
      <section id="floor4" class="midwarp">
        <a :href="itemdata.overallHrefUrl">
          <p class="d_title">全景看房</p>
          <img :src="itemdata.overallFileUrl" alt="" class="qj_img">
          <img src="../assets/images/360.png" alt="" class="img360" v-if="itemdata.overallFileUrl!=''">
        </a>
      </section>
      <div class="floor3">
        <section id="floor6" class="midwarp">
          <div class="midwarp">
            <p class="d_title">楼盘相册</p>
            <div class="hauto">
              <el-carousel indicator-position="none" arrow="always" id="scroll_div">
                <el-carousel-item v-for="(item,index) of img_data" :key="item.value">
                  <ul class="lp_photo">
                    <li v-for="img of img_data[index]" class="enter-item">
                      <a :href="getGoodsHref(img)">
                        <img :src="img" alt="" class="enter-img" style="width: 350px;height: 350px">
                      </a>
                    </li>
                  </ul>
                </el-carousel-item>
              </el-carousel>
            </div>
          </div>
        </section>
        <!-- <div class="pre_b_f5">
        <img src="../assets/images/l_prev.png"  alt="">
    </div>
    <div class="next_b_f5 ">
        <img src="../assets/images/l_next.png"  alt="">
    </div> -->
      </div>
      <section id="floor7" class="midwarp">
        <p class="d_title">活动</p>
        <div class="hauto">
          <p class="activity" v-if="act_list ==''|| act_list == null">敬请期待</p>
        </div>
      </section>
      <section id="floor5" class="midwarp">
        <div class="d_title">
          <img src="../assets/images/icon2.png" alt="">
          <div>
            <span>房贷计算器</span>
            <span>选择基本情况，帮你快速计算贷款</span>
          </div>
          <!-- <div>
          <span>您的账单</span>
          <span>均价：待定&nbsp;&nbsp;&nbsp;&nbsp;估算总价：</span>
        </div> -->
        </div>
        <kcompute></kcompute>
      </section>
      <div class="height_auto b_fff midwarp">
        <p class="beizu">*备注：公积金贷款利息3.25%；商业贷款利息4.90%（贷款5年以上利率）数据来源：中国人民银行官网 2016-10-26数据</p>
      </div>
      <div class="tip-box midwarp">
        <p class="tip">
          <i class="tip-img"></i>免责声明：楼盘信息由开发商提供，最终以政府部门登记备案为准，请谨慎核查。如楼盘信息有误，您可拨打电话投诉：000000000</p>
      </div>
    </div>
    <!-- 预约看房弹框 -->
    <div class="c_more_box" :class="{c_show:isShowY}">
      <div class="c_more_layer"></div>
      <div class="c_appointment_box">
        <div class="c_appointment_cnt">
          <div class="c_appointment_form">
            <div class="c_appointment_row">
              <el-row>
                <el-col :span="20">
                  <el-input type="text" v-model="appointmentInfo.name" placeholder="姓名"></el-input>
                </el-col>
                <el-col :span="4">
                  <span>(必填)</span>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="20">
                  <el-input type="number" v-model="appointmentInfo.phone" placeholder="电话"></el-input>
                </el-col>
                <el-col :span="4">
                  <span>(必填)</span>
                </el-col>
              </el-row>
              <el-row v-show="!isYuyue">
                <el-col :span="20">
                  <el-select v-model="appointmentInfo.sex" placeholder="请选择性别" style="width:100%;">
                    <el-option v-for="item in sexOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-col>
                <el-col :span="4">
                  <span>(必填)</span>
                </el-col>
              </el-row>
              <el-row v-show="!isYuyue">
                <el-col :span="20">
                  <el-input type="number" v-model="appointmentInfo.age" placeholder="年龄"></el-input>
                </el-col>
                <el-col :span="4">
                  <span>(必填)</span>
                </el-col>
              </el-row>
              <el-row v-show="isYuyue">
                <el-col :span="20">
                  <el-date-picker v-model="appointmentInfo.preorderTime" type="date" placeholder="看房时间" style="width:100%;"></el-date-picker>
                </el-col>
                <el-col :span="4">
                  <span>(必填)</span>
                </el-col>
              </el-row>
              <el-row v-show="isYuyue">
                <el-col :span="20">
                  <el-input type="textarea" :rows="2" placeholder="其他留言" v-model="appointmentInfo.message"></el-input>
                </el-col>
                <el-col :span="4">
                  <span>(选填)</span>
                </el-col>
              </el-row>
              <div class="c_appointment_btn">
                <el-button type="primary" size="mini" @click="saveUserPreorder" v-show="isYuyue">提交</el-button>
                <el-button type="primary" size="mini" @click="saveUserRecommendCommission" v-show="!isYuyue">提交</el-button>
                <el-button type="primary" size="mini" @click="cleanYuyueInfo">取消</el-button>
              </div>
            </div>
          </div>
        </div>
        <div class="c_tips">
          <p v-show="isYuyue">感谢您实地考察我们的楼盘，请填写一下资料，我们的工作人员会尽快与您取得联系并安排您的看房行程，谢谢！</p>
          <p v-show="!isYuyue">请留下你的详细信息以便于开发商与您取得联系！否则您的佣金将无法领取。</p>
        </div>
        <div class="c_title">
          <p v-show="isYuyue" style="margin-bottom: 20px;">您的意向楼盘：{{itemdata.buildingName}}</p>
          <img src="../assets/images/c_money.png" height="64" width="77" v-show="!isYuyue">
          <p style="font-size: 16px;" v-show="!isYuyue">分享楼盘，并告知您的朋友在他正式购房后将您的手机号码</br>提供给置业顾问核验，之后您将获得由开发商给予的推荐佣金</p>
        </div>
      </div>
    </div>
    <bottomfooter></bottomfooter>
  </div>
</template>
<style scoped>
#scroll_div .el-carousel__container {
    width: 100px !important;
}
</style>
<script>
import banner from "../components/bannerpic_new";
import homeheader from "../components/header";
import bottomfooter from "../components/bottomfooter";
import kcompute from "../components/kangaroos/kangarooCompute";
export default {
    data() {
        return {
            infor: [
                { name: " 楼盘简介", id: "#floor1" },
                { name: " 户型", id: "#floor2" },
                { name: " 周边配套", id: "#floor3" },
                { name: " 房贷计算器", id: "#floor5" },
                { name: " 全景看房", id: "#floor4" },
                { name: " 楼盘相册", id: "#floor6" },
                { name: " 活动", id: "#floor7" }
            ],
            qwer: 0,
            buildingId: "",
            itemdata: "",
            listdata: "",
            act_list: "",
            img_data: [],
            isShowY: false,
            isYuyue: true,
            appointmentInfo: {
                name: "",
                phone: "",
                message: "",
                sex: "",
                age: "",
                relatedFlag: "",
                preorderTime: ""
            },
            sexOptions: [
                {
                    value: "男",
                    label: "男"
                },
                {
                    value: "女",
                    label: "女"
                }
            ]
        };
    },
    components: {
        banner,
        homeheader,
        bottomfooter,
        kcompute
    },
    created: function() {
        this.buildingId = this.$utils.getUrlKey("buildingId");
        this.queryBuildingInfo();
        this.queryHouseList();
        this.queryBuildingPromotionInfo();
    },
    methods: {
        queryBuildingInfo() {
            this.$http
                .get(
                    this.$location +
                        "/api/building/queryBuildingInfo.do?from=1&timestamp=2&buildingId=" +
                        this.buildingId,
                    {},
                    {
                        headers: {},
                        emulateJSON: true
                    }
                )
                .then(
                    res => {
                        // 调用成功
                        let data = res.data;
                        if (data.errorCode == 0) {
                            this.itemdata = data.data;
                            this.itemdata.buildingProperties = this.itemdata.buildingProperties.split(
                                ","
                            );
                            let len1 = this.itemdata.allPicUrl.split(",")
                                .length;
                            let data1 = this.itemdata.allPicUrl.split(",");
                            let len2 = this.itemdata.externalPicUrl.split(",")
                                .length;
                            let data2 = this.itemdata.externalPicUrl.split(",");
                            let len3 = this.itemdata.indoorPicUrl.split(",")
                                .length;
                            let data3 = this.itemdata.indoorPicUrl.split(",");
                            let len4 = this.itemdata.projectSupportUrl.split(
                                ","
                            ).length;
                            let data4 = this.itemdata.projectSupportUrl.split(
                                ","
                            );
                            let datas = [];
                            for (let i = 0; i < len1; i++) {
                                if (data1[0] != "") {
                                    datas.push(data1[i]);
                                }
                            }
                            for (let i = 0; i < len2; i++) {
                                if (data2[0] != "") {
                                    datas.push(data2[i]);
                                }
                            }
                            for (let i = 0; i < len3; i++) {
                                if (data3[0] != "") {
                                    datas.push(data3[i]);
                                }
                            }
                            for (let i = 0; i < len4; i++) {
                                if (data4[0] != "") {
                                    datas.push(data4[i]);
                                }
                            }
                            this.img_data = _.chunk(datas, 3);
                            // 初始化地图对象，加载地图
                            var map = new AMap.Map("conter", {
                                resizeEnable: true,
                                center: [
                                    data.data.projectAddressX,
                                    data.data.projectAddressY
                                ], //地图中心点
                                zoom: 13 // 地图显示的缩放级别
                            });
                            // 添加点标记，并使用自己的icon
                            var marker = new AMap.Marker({
                                map: map,
                                position: [
                                    data.data.projectAddressX,
                                    data.data.projectAddressY
                                ],
                                icon: new AMap.Icon({
                                    size: new AMap.Size(40, 50), //图标大小
                                    image:
                                        "http://webapi.amap.com/theme/v1.3/images/newpc/way_btn2.png",
                                    imageOffset: new AMap.Pixel(0, -60)
                                })
                            });
                            // 设置label标签
                            marker.setLabel({
                                //label默认蓝框白底左上角显示，样式className为：amap-marker-label
                                offset: new AMap.Pixel(0, -20), //修改label相对于maker的位置
                                content: this.itemdata.buildingName
                            });
                        }
                    },
                    error => {
                        // 调用失败
                        console.log("失败", error);
                    }
                );
        },
        queryHouseList() {
            this.$http
                .get(
                    this.$location +
                        "/api/house/queryHouseList.do?from=1&timestamp=2&buildingId=" +
                        this.buildingId,
                    {},
                    {
                        headers: {},
                        emulateJSON: true
                    }
                )
                .then(
                    function(res) {
                        // 调用成功
                        let data = res.data;
                        if (data.errorCode == 0) {
                            this.listdata = data.data.list;
                        }
                    },
                    function(error) {
                        // 调用失败
                        console.log("失败", error);
                    }
                );
        },
        queryBuildingPromotionInfo() {
            this.$http
                .get(
                    this.$location +
                        "/api/promotion/queryBuildingPromotionInfo.do?from=1&timestamp=2&buildingId=" +
                        this.buildingId,
                    {},
                    {
                        headers: {},
                        emulateJSON: true
                    }
                )
                .then(
                    res => {
                        // 调用成功
                        let data = res.data;
                        if (data.errorCode == 0) {
                            this.act_list = data.data;
                        }
                    },
                    error => {
                        // 调用失败
                        console.log("失败", error);
                    }
                );
        },
        // 预约添加
        saveUserPreorder() {
            if (
                this.appointmentInfo.name == "" ||
                this.appointmentInfo.name == null ||
                this.appointmentInfo.name == undefined
            ) {
                this.$message({
                    message: "姓名不能为空！",
                    type: "warning"
                });
                return;
            }
            if (
                this.appointmentInfo.phone == "" ||
                this.appointmentInfo.phone == null ||
                this.appointmentInfo.phone == undefined
            ) {
                this.$message({
                    message: "电话不能为空！",
                    type: "warning"
                });
                return;
            }
            if (
                this.appointmentInfo.phone.length > 11 ||
                this.appointmentInfo.phone.length < 7
            ) {
                this.$message({
                    message: "请输入正确的电话长度！",
                    type: "warning"
                });
                return;
            }
            if (
                this.appointmentInfo.preorderTime == "" ||
                this.appointmentInfo.preorderTime == null ||
                this.appointmentInfo.preorderTime == undefined
            ) {
                this.$message({
                    message: "预约时间不能为空！",
                    type: "warning"
                });
                return;
            }
            if (window.localStorage) {
                var token = JSON.parse(localStorage.getItem("token"));
                console.log("-------------------token");
                console.log(token);
                if (token == "" || token == null || token == undefined) {
                    this.$router.push("/login");
                }
            }
            this.$http
                .get(
                    this.$location +
                        "/api/preorder/saveUserPreorder.do?from=1&timestamp=2&relatedFlag=0&token=" +
                        token +
                        "&relatedId=" +
                        this.buildingId +
                        "&realname=" +
                        this.appointmentInfo.name +
                        "&tel=" +
                        this.appointmentInfo.phone +
                        "&preorderTime=" +
                        this.appointmentInfo.preorderTime.toLocaleDateString() +
                        "&message = " +
                        this.appointmentInfo.message,
                    {},
                    {
                        headers: {},
                        emulateJSON: true
                    }
                )
                .then(
                    res => {
                        // 调用成功
                        let data = res.data;
                        if (data.errorCode == 0) {
                            this.$message({
                                message: "预约添加成功！",
                                type: "warning"
                            });
                            this.isShowY = false;
                            this.cleanYuyueInfo();
                        }
                    },
                    error => {
                        // 调用失败
                        console.log("失败", error);
                    }
                );
        },
        // 推荐赚佣金
        saveUserRecommendCommission() {
            if (
                this.appointmentInfo.name == "" ||
                this.appointmentInfo.name == null ||
                this.appointmentInfo.name == undefined
            ) {
                this.$message({
                    message: "姓名不能为空！",
                    type: "warning"
                });
                return;
            }
            if (
                this.appointmentInfo.phone == "" ||
                this.appointmentInfo.phone == null ||
                this.appointmentInfo.phone == undefined
            ) {
                this.$message({
                    message: "电话不能为空！",
                    type: "warning"
                });
                return;
            }
            if (
                this.appointmentInfo.phone.length > 11 ||
                this.appointmentInfo.phone.length < 7
            ) {
                this.$message({
                    message: "请输入正确的电话长度！",
                    type: "warning"
                });
                return;
            }
            if (
                this.appointmentInfo.sex == "" ||
                this.appointmentInfo.sex == null ||
                this.appointmentInfo.sex == undefined
            ) {
                this.$message({
                    message: "性别不能为空！",
                    type: "warning"
                });
                return;
            }
            if (
                this.appointmentInfo.age == "" ||
                this.appointmentInfo.age == null ||
                this.appointmentInfo.age == undefined
            ) {
                this.$message({
                    message: "年龄不能为空！",
                    type: "warning"
                });
                return;
            }
            if (window.localStorage) {
                var token = JSON.parse(localStorage.getItem("token"));
                console.log("-------------------token");
                console.log(token);
                if (token == "" || token == null || token == undefined) {
                    this.$router.push("/login");
                }
            }
            this.$http
                .get(
                    this.$location +
                        "/api/recommendCommission/saveUserRecommendCommission.do?from=1&timestamp=2&token=" +
                        token +
                        "&realname=" +
                        this.appointmentInfo.name +
                        "&tel=" +
                        this.appointmentInfo.phone +
                        "&sex=" +
                        this.appointmentInfo.sex +
                        "&age=" +
                        this.appointmentInfo.age +
                        "&relatedId=" +
                        this.buildingId +
                        "&relatedFlag=0",
                    {},
                    {
                        headers: {},
                        emulateJSON: true
                    }
                )
                .then(
                    res => {
                        // 调用成功
                        let data = res.data;
                        if (data.errorCode == 0) {
                            this.$message({
                                message: "推荐赚佣金添加成功！",
                                type: "warning"
                            });
                            this.isShowY = false;
                            this.cleanYuyueInfo();
                        }
                    },
                    error => {
                        // 调用失败
                        console.log("失败", error);
                    }
                );
        },
        // 清除预约信息
        cleanYuyueInfo() {
            this.isShowY = false;
            this.appointmentInfo.name = "";
            this.appointmentInfo.phone = "";
            this.appointmentInfo.time = "";
            this.appointmentInfo.message = "";
            this.appointmentInfo.sex = "";
            this.appointmentInfo.age = "";
        },
        getGoodsHref: function(val) {
            return val;
        }
    }
};
</script>

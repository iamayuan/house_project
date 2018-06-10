<template>
  <div class="b_f5">
    <homeheader></homeheader>

    <div>
      <banner :data="itemdata" :relatedid="leaseHouseId" :relatedflag="3" v-if="itemdata"></banner>
      <div class='midwarp'>
        <p class="now_add">
          <img src="../assets/images/icon8.png" class="lq_now_add_ico" alt="">
          <span class="lq_now_span">首页</span> &gt;
          <span class="lq_now_span">袋鼠有家</span> &gt;
          <span class="lq_now_span">{{itemdata.buildingName}}</span>
        </p>
        <ul class="tab_ul">
          <li v-for="(item,index) in infor" @click="qwer=index" :class="{selected:index==qwer}" :key="index">
            <a v-bind:href="item.id">{{item.name}}</a>
          </li>
        </ul>
        <div class="floatR-img">
          <img src="../assets/images/btn1.png" @click="isShowY=true;isYuyue=true">
          <img src="../assets/images/icon6.png" @click="isShowY=true;isYuyue=false">
        </div>
      </div>
      <section id="floor1" class="midwarp">
        <p class="d_title">房源信息</p>
        <div class="hauto">
          <div class="hauto">
            <p class="hx_infor">房源地址</p>
            <div class="address_img" id="conter2"></div>
          </div>
          <div class="left_info">
            <p class="hx_infor">房源介绍</p>
          </div>
          <div class="right_detail">
            <p class="lp_d">{{itemdata.houseDescription}}</p>
            <ul class="lp_ul">
              <li>类别：
                <em>{{itemdata.houseType}}</em>
              </li>
              <li>建筑面积：
                <em>{{itemdata.houseArea}}㎡</em>
              </li>
              <li>有无电梯：
                <em>{{itemdata.liftType}}</em>
              </li>
              <li>卧室：
                <em>{{itemdata.roomType}}</em>
              </li>
              <li>室内面积：
                <em>{{itemdata.roomArea}}㎡</em>
              </li>
              <li>朝向：
                <em>{{itemdata.direction}}</em>
              </li>
              <li>客厅：
                <em>{{itemdata.hallType}}</em>
              </li>
              <li>楼层：
                <em>共{{itemdata.floorNum}}层</em>
              </li>
              <li>
                <em></em>
              </li>
              <li>厨房：
                <em>{{itemdata.cookroomType}}</em>
              </li>
              <li>均价：
                <em>{{itemdata.averagePrice}}元/㎡</em>
              </li>
              <li>
                <em></em>
              </li>
              <li>厕所：
                <em>{{itemdata.washroomType}}</em>
              </li>
              <li>总价：
                <em>{{itemdata.houseMoney}}万元</em>
              </li>
              <li>
                <em></em>
              </li>
              <li>阳台：
                <em>{{itemdata.shineroomType}}</em>
              </li>
              <li>装修标准：
                <em>{{itemdata.designStandard}}</em>
              </li>
              <li>
                <em></em>
              </li>
              <li>花园：
                <em>{{itemdata.gardenType}}</em>
              </li>
              <li>产权年限：
                <em>{{itemdata.ownYear}}</em>
              </li>
            </ul>
          </div>
        </div>
        <div class="line" style="height:2px;background:#efefef;width:100%"></div>
        <div class="hauto">
          <div class="left_info">
            <p class="hx_infor">小区简介</p>
          </div>
          <div class="right_detail">
            <p class="lp_d">{{infodata.buildingDescription}}</p>
            <ul class="lp_ul">
              <li>开发商：
                <em>{{infodata.developeName}}</em>
              </li>
              <li>建筑类型：
                <em>{{infodata.buidlingType}}</em>
              </li>
              <li>物业费：
                <em>{{infodata.propertyFee}}</em>
              </li>
              <li>物业管理公司：
                <em>{{infodata.houseCorp}}</em>
              </li>
              <li>物业类型：
                <em>{{infodata.houseType}}</em>
              </li>
              <li>车位数：
                <em>{{infodata.carNum}}</em>
              </li>
              <li>开盘名称：
                <em>{{infodata.buildingName}}</em>
              </li>
              <li>产权年限：
                <em>{{itemdata.ownYear}}</em>
              </li>
              <li>户数：
                <em>{{infodata.peopleNum}}</em>
              </li>
              <li>均价：
                <em>{{infodata.averagePrice}}元/㎡</em>
              </li>
              <li>建筑面积：
                <em>{{infodata.buildingArea}}㎡</em>
              </li>
              <li>
                <em></em>
              </li>
              <li>楼盘时间：
                <em>{{infodata.openTime}}</em>
              </li>
              <li>占地面积：
                <em>{{infodata.landArea}}㎡</em>
              </li>
              <li>
                <em></em>
              </li>
              <li>交房时间：
                <em>{{infodata.inTime}}</em>
              </li>
              <li>绿化率：
                <em>{{infodata.designStandard}}</em>
              </li>
              <li>
                <em></em>
              </li>
              <li>装修标准：
                <em>{{itemdata.designStandard}}</em>
              </li>
              <li>容积率：
                <em>{{infodata.volumeRatio}}</em>
              </li>
            </ul>
          </div>
        </div>
        <div class="hauto">
          <p class="d_title" style="color:#222">周边配套</p>
          <div class="hauto hautono">
            <div class="hauto-li clearfix">
              <p class="hx_infor2">交通设施</p>
              <p class="lp_d2" v-html="infodata.traffic"></p>
            </div>
            <div class="hauto-li clearfix">
              <p class="hx_infor2">学校</p>
              <p class="lp_d2" v-html="infodata.school"></p>
            </div>
            <div class="hauto-li clearfix">
              <p class="hx_infor2">超市菜场</p>
              <p class="lp_d2" v-html="infodata.market"></p>
            </div>
            <div class="hauto-li clearfix">
              <p class="hx_infor2">医院药房</p>
              <p class="lp_d2" v-html="infodata.hospital"></p>
            </div>
            <div class="hauto-li clearfix">
              <p class="hx_infor2">银行</p>
              <p class="lp_d2" v-html="infodata.bank"></p>
            </div>
          </div>
        </div>
      </section>
      <section id="floor2" class="midwarp">
        <a :href="itemdata.overallHrefUrl">
          <p class="d_title">全景看房</p>
          <img :src="itemdata.overallFileUrl" alt="" class="qj_img">
          <img src="../assets/images/360.png" alt="" class="img360" v-if="itemdata.overallFileUrl!=''">
        </a>
      </section>
      <div class="floor3">
        <section id="floor3" class="midwarp">
          <div class="midwarp">
            <p class="d_title">楼盘相册</p>
            <div class="hauto">
              <el-carousel indicator-position="none" arrow="always" id="scroll_div">
                <el-carousel-item v-for="(item,index) of img_data" :key="item.value">
                  <ul class="lp_photo">
                    <li v-for="img of img_data[index]" class="enter-item">
                      <a :href="getGoodsHref(img)">
                        <img v-bind:src="img" alt="" class="enter-img" style="width: 350px;height: 350px">
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
        <div class="next_b_f5">
          <img src="../assets/images/l_next.png"  alt="">
        </div> -->
      </div>
      <section id="floor4" class="midwarp">
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
                  <el-input type="text" v-model="appointmentInfo.idCard" placeholder="身份证号"></el-input>
                </el-col>
                <el-col :span="4">
                  <span>(选填)</span>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="20">
                  <el-input type="text" v-model="appointmentInfo.sex" placeholder="性别"></el-input>
                </el-col>
                <el-col :span="4">
                  <span>(必填)</span>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="20">
                  <el-input type="text" v-model="appointmentInfo.card" placeholder="银行卡号"></el-input>
                </el-col>
                <el-col :span="4">
                  <span>(选填)</span>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="20">
                  <el-input type="text" v-model="appointmentInfo.phone" placeholder="手机号码"></el-input>
                </el-col>
                <el-col :span="4">
                  <span>(必填)</span>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="20">
                  <el-input type="number" v-model="appointmentInfo.yzm" placeholder="验证码"></el-input>
                  
                </el-col>
                <el-col :span="4">
                  <p @click="getCode" class="code">获取验证码</p>
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
<script>
import banner from "../components/bannerpic_new";
import homeheader from "../components/header";
import bottomfooter from "../components/bottomfooter";
import kcompute from "../components/kangaroos/kangarooCompute";
export default {
    data() {
        return {
            infor: [
                { name: "房源信息", id: "#floor1" },
                { name: "全景看房", id: "#floor2" },
                { name: "楼盘相册", id: "#floor3" },
                { name: "房贷计算器", id: "#floor4" }
            ],
            qwer: 0,
            leaseHouseId: "",
            itemdata: "",
            infodata: "",
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
                preorderTime: "",
                idCard:"",
                card:""
    
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
        this.leaseHouseId = this.$utils.getUrlKey("leaseHouseId");
        this.queryLeaseHouseInfo();
    },
    methods: {
        // 房屋信息
        queryLeaseHouseInfo() {
            this.$http
                .get(
                    this.$location +
                        "/api/leaseHouse/queryLeaseHouseInfo.do?from=1&timestamp=2&leaseHouseId=" +
                        this.leaseHouseId,
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
                            let len1 = this.itemdata.demoPicUrl.split(",")
                                .length;
                            let data1 = this.itemdata.demoPicUrl.split(",");
                            let len2 = this.itemdata.housePicUrl.split(",")
                                .length;
                            let data2 = this.itemdata.housePicUrl.split(",");
                            let len3 = this.itemdata.realPicUrl.split(",")
                                .length;
                            let data3 = this.itemdata.realPicUrl.split(",");
                            let len4 = this.itemdata.virtualPicUrl.split(",")
                                .length;
                            let data4 = this.itemdata.virtualPicUrl.split(",");
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
                            // 获取小区信息
                            this.queryBuildingInfo();
                            // 初始化地图对象，加载地图
                            var map = new AMap.Map("conter2", {
                                resizeEnable: true,
                                center: [
                                    data.data.houseAddressX,
                                    data.data.houseAddressY
                                ], // 地图中心点
                                zoom: 13 // 地图显示的缩放级别
                            });
                            // 添加点标记，并使用自己的icon
                            var marker = new AMap.Marker({
                                map: map,
                                position: [
                                    data.data.houseAddressX,
                                    data.data.houseAddressY
                                ],
                                icon: new AMap.Icon({
                                    size: new AMap.Size(40, 50), // 图标大小
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
        // 小区信息
        queryBuildingInfo() {
            this.$http
                .get(
                    this.$location +
                        "/api/building/queryBuildingInfo.do?from=1&timestamp=2&buildingId=" +
                        this.itemdata.buildingId,
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
                            this.infodata = data.data;
                        }
                    },
                    error => {
                        // 调用失败
                        console.log("失败", error);
                    }
                );
        },
        // 袋鼠有家预约添加
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
                this.appointmentInfo.phone == "" ||
                this.appointmentInfo.phone == null ||
                this.appointmentInfo.phone == undefined
            ) {
                this.$message({
                    message: "手机不能为空！",
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
                        "/api/leaseHousePreorder/saveUserLeaseHousePreorder.do?from=1&timestamp=2&token=" +
                        token +
                        "&mobile=" +
                        this.appointmentInfo.phone+
                        "&realname=" +
                        this.appointmentInfo.name +
                        "&relatedId=" +
                        this.leaseHouseId +
                        "&bankNumber=" +
                        this.appointmentInfo.card +
                        "&cardId=" +
                         this.appointmentInfo.idCard +
                        +'&sex='+this.appointmentInfo.sex+
                        +'&code='+this.appointmentInfo.yzm+
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
                            console.log("预约添加成功");
                        }
                    },
                    error => {
                        // 调用失败
                        console.log("失败", error);
                    }
                );
        },
        //获取验证码
        getCode(){
          var mobile = this.appointmentInfo.phone;
          if (
                mobile == "" ||
                mobile == null ||
                mobile == undefined
            ) {
                this.$message({
                    message: "手机不能为空！",
                    type: "warning"
                });
                return;
            }
          this.$http
                .get(
                    this.$location +
                        "/api/sms/sendMoibleSms.do?form=1&timestamp=2" +'&mobile='+mobile ,
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
                        this.leaseHouseId +
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
                            console.log("推荐赚佣金添加成功");
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
<style scope>
.code{
  color: #999;
  font-size:12px;
  cursor: pointer;
}
</style>

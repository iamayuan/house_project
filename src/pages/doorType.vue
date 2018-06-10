<template>
  <div class="b_f5">
    <homeheader></homeheader>
    <div class='midwarp'>
      <banner :data="itemdata" :relatedid="curHouseData.houseId" :relatedflag="1" v-if="itemdata"></banner>
      <p class="now_add">
        <img src="../assets/images/icon8.png" class="lq_now_add_ico" alt="">
        <span class="lq_now_span">首页</span> &gt; <span class="lq_now_span">新房</span> &gt;<span class="lq_now_span">{{itemdata.buildingName}}</span>
      </p>
      <ul class="tab_ul_line">
        <li v-for="(item,index) in infor" @click="qwer=index" :class='{selected:index==qwer}'>{{item.name}}</li>
      </ul>
      <div class="floatR-img">
        <img src="../assets/images/btn1.png" @click="isShowY=true;isYuyue=true">
        <img src="../assets/images/icon6.png" @click="isShowY=true;isYuyue=false">
      </div>
      <section v-show="qwer==0" id="floor1">
        <p class="d_title">楼盘介绍</p>
        <div class="hauto">
          <div class="left_info">
            <p class="hx_infor">户型介绍</p>
          </div>
          <div class="right_detail">
            <p class="lp_d">{{curHouseData.houseDescription}}</p>
            <ul class="lp_ul">
              <li>类别：<em>{{curHouseData.houseType}}</em></li>
              <li>建筑面积：<em>{{curHouseData.houseArea}}m<sup class="c_sup">2</sup></em></li>
              <li>有无电梯：<em>{{curHouseData.liftType}}</em></li>
              <li>卧室：<em>{{curHouseData.roomType}}</em></li>
              <li>室内面积：<em>{{curHouseData.roomArea}}m<sup class="c_sup">2</sup></em></li>
              <li>朝向：<em>{{curHouseData.direction}}</em></li>
              <li>客厅：<em>{{curHouseData.direction}}</em></li>
              <li>楼层：<em>暂无</em></li>
              <li><em></em></li>
              <li>厨房：<em>{{curHouseData.cookroomType}}</em></li>
              <li>均价：<em>{{curHouseData.averagePrice}}元/m<sup class="c_sup">2</sup></em></li>
              <li><em></em></li>
              <li>厕所：<em>{{curHouseData.washroomType}}</em></li>
              <li>总价：<em>{{curHouseData.houseMoney}}元/m<sup class="c_sup">2</sup></em></li>
              <li><em></em></li>
              <li>阳台：<em>{{curHouseData.shineroomType}}</em></li>
              <li>装修标准：<em>{{curHouseData.designStandard}}</em></li>
              <li><em></em></li>
              <li>花园：<em>{{curHouseData.gardenType}}</em></li>
              <li>产权年限：<em>{{curHouseData.ownYear}}</em></li>
            </ul>
          </div>
        </div>
      </section>
      <section v-show="qwer==1" id="floor2">
        <ul class="door-ul clearfix">
          <li :class="{doorActive:houseIndex==0}" @click="houseIndex=0;selectType()">全部户型（{{houseList.length}}）</li>
          <li :class="{doorActive:houseIndex==1}" @click="houseIndex=1;selectType()">二室户型（{{secondHouseList.length}}）</li>
          <li :class="{doorActive:houseIndex==2}" @click="houseIndex=2;selectType()">三室户型（{{thirdHouseList.length}}）</li>
        </ul>
        <ul class="door-sub clearfix">
          <li :class="{subActive:hxIndex==index}" v-for="(item,index) in curHouseList" @click="hxIndex=index;curHouseData=curHouseList[index];selectLayout();getActivity()"><p>{{item.houseName}}</p></li>
        </ul>
        <div class="door-list clearfix">
          <div class="doorimg">
            <p class="door_title">户型图（{{imgNum}}/{{imgCount}}）</p>
            <div class="img_big">
              <img :src="overallPicArr[imgIndex.index1][imgIndex.index2]" height="100%" alt="">
            </div>
            <div class="img_small">
              <el-carousel indicator-position="none" arrow="always">
                <el-carousel-item v-for="(item,index1) of overallPicArr" :key="item.value">
                  <ul class="door_photo" :class="{parentImg:imgIndex.index1==index1}">
                    <li v-for="(img,index2) of overallPicArr[index1]" class="enter-item" :class="{curImg:imgIndex.index2==index2}" @click="imgIndex.index1=index1;imgIndex.index2=index2;getImgNum()">
                      <img :src="img" alt="" class="enter-img">
                    </li>
                  </ul>
                </el-carousel-item>
              </el-carousel>
            </div>
          </div>
          <div class="door-type">
            <p class="door-title">{{curHouseData.houseName}}, 建筑面积约{{curHouseData.houseArea}}m<sup class="c_sup">2</sup></p>
            <p class="door-price">参考总价：<b>{{curHouseData.houseMoney}}万</b></p>
            <div class="tag">主推</div>
            <div class="bordertop">
              <p class="hx_infor doorin">户型介绍：</p>
              <p class="doortxt">户型方正，景观开扬，美景恣意流转。户型方正，景观开扬，美景恣意流转。户型方正，景观开扬，美景恣意流转。户型方正，景观开扬，美景恣意流转。户型方正，景观开扬，美景恣意流转。户型方正，景观开扬，美景恣意流转。</p>
              <ul class="doortype-list">
                <li>类别：<em>{{curHouseData.houseType}}</em></li>
                <li>建筑面积：<em>{{curHouseData.houseArea}}m<sup class="c_sup">2</sup></em></li>
                <li>卧室：<em>{{curHouseData.roomType}}</em></li>
                <li>套内面积：<em>{{curHouseData.roomArea}}m<sup class="c_sup">2</sup></em></li>
                <li>客厅：<em>{{curHouseData.cookroomType}}</em></li>
                <li>楼层：<em>暂无</em></li>
                <li>厨房：<em>{{curHouseData.cookroomType}}</em></li>
                <li>均价：<em>{{curHouseData.averagePrice}}元/m<sup class="c_sup">2</sup></em></li>
                <li>厕所：<em>{{curHouseData.washroomType}}</em></li>
                <li>总价：<em>{{curHouseData.houseMoney}}元/m<sup class="c_sup">2</sup></em></li>
                <li>阳台：<em>{{curHouseData.shineroomType}}</em></li>
                <li>装修标准：<em>{{curHouseData.designStandard}}</em></li>
                <li>花园：<em>{{curHouseData.gardenType}}</em></li>
                <li>产权年限：<em>{{curHouseData.ownYear}}</em></li>
                <li>有无电梯：<em>{{curHouseData.liftType}}</em></li>
                <li>朝向：<em>{{curHouseData.direction}}</em></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section v-show="qwer==2" id="floor3">
        <p class="d_title">周边配套</p>
        <div class="hauto">
          <ul class="lp_photo">
            <li v-for="item in realPicUrl">
              <img :src="item" alt="">
            </li>
          </ul>
        </div>
      </section>
      <section v-show="qwer==3" id="floor4">
        <a :href="curHouseData.overallHrefUrl">
          <p class="d_title">全景看房</p>
          <img :src="curHouseData.overallFileUrl" alt="" class="qj_img">
          <img v-if="curHouseData.overallFileUrl" src="../assets/images/360.png" alt="" class="img360">
        </a>
      </section>
      <section v-show="qwer==4" id="floor5">
        <p class="d_title">楼盘相册</p>
        <div class="hauto">
          <ul class="lp_photo">
            <li v-for="item in overallPicArr">
              <img :src="item" width="350px" height="350px" alt="">
            </li>
          </ul>
        </div>
      </section>
      <section v-show="qwer==5" id="floor6">
        <p class="d_title">活动</p>
        <div style="padding: 20px;text-align: center;">
          <p>暂无活动</p>
        </div>
      </section>
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

<script>
import banner from '../components/bannerpic_house'
import homeheader from '../components/header'
import bottomfooter from '../components/bottomfooter'
export default {
  data () {
    return {
      infor: [
        {'name': ' 楼盘简介', 'id': '#floor1'},
        {'name': ' 户型', 'id': '#floor2'},
        {'name': ' 周边配套', 'id': '#floor3'},
        {'name': ' 全景看房', 'id': '#floor4'},
        {'name': ' 楼盘相册', 'id': '#floor5'},
        {'name': ' 活动', 'id': '#floor6'}
      ],
      qwer: 1,
      houseIndex: 0,        // 全部/二室/三室
      hxIndex: 0,           // 户型index
      curImgIndex: 0,       // 当前选中的imgindex
      imgIndex: {           // 户型图片index
        index1: 0,
        index2: 0
      },
      imgCount: '',         // 户型图片总数
      imgNum: '',           // 当前户型图片是第几个
      itemdata: '',         // 默认户型数据
      curHouseList: [],     // 当前tab展示的户型数据
      curHouseData: [],     // 当前选中户型数据
      realPicUrl: [],       // 周边配套
      overallPicArr: '',    // 楼盘相册
      houseList: [],        // 户型列表数据
      secondHouseList: [],  // 两室户型数据
      thirdHouseList: [],   // 三室户型数据
      isShowY: false,
      isYuyue: true,
      appointmentInfo: {
        name: '',
        phone: '',
        message: '',
        sex: '',
        age: '',
        relatedFlag: '',
        preorderTime: ''
      },
      sexOptions: [{
        value: '男',
        label: '男'
      }, {
        value: '女',
        label: '女'
      }]
    }
  },
  created: function () {
    this.queryHouseInfo();
  },
  methods: {
    // 楼盘户型列表
    queryHouseList () {
      if (window.localStorage) {
        var token = JSON.parse(localStorage.getItem("token"));
        // 如果token存在则传参否则不传
        var istoken = '';
        if (token != '' && token != null && token != undefined) {
          istoken = '&token=' + token;
        }
      }
      this.$http.get(this.$location + '/api/house/queryHouseList.do?from=1&timestamp=2&buildingId=' + this.itemdata.buildingId, {}, {
        headers: {
        },
        emulateJSON: true
      }).then((res) => {
        // 调用成功
        let data = res.data;
        if (data.errorCode == 0) {
          this.houseList = data.data.list;                                              // 全部户型数据
          this.secondHouseList = data.data.list.filter((o) => o.roomType == '两室');    // 两室户型数据
          this.thirdHouseList = data.data.list.filter((o) => o.roomType == '三室');     // 三室户型数据
          this.curHouseList = this.houseList;                                           // 默认展示全部户型list
          var houseId = this.$utils.getUrlKey('houseId');
          let thatHouse = _.findIndex(this.curHouseList, (o => o.houseId == houseId));
          this.curHouseData = this.curHouseList[thatHouse];                             // 默认展示全部户型list第一个
          this.hxIndex = thatHouse;
        }
      }, (error) => {
        // 调用失败
        console.log('失败', error);
      })
    },
    // 楼盘户型详细
    queryHouseInfo () {
      var houseId = this.$utils.getUrlKey('houseId');
      if (window.localStorage) {
        var token = JSON.parse(localStorage.getItem("token"));
        // 如果token存在则传参否则不传
        var istoken = '';
        if (token != '' && token != null && token != undefined) {
          istoken = '&token=' + token;
        }
      }
      this.$http.get(this.$location + '/api/house/queryHouseInfo.do?from=1&timestamp=2&houseId=' + houseId + istoken, {}, {
        headers: {
        },
        emulateJSON: true
      }).then((res) => {
        // 调用成功
        let data = res.data;
        if (data.errorCode == 0) {
          this.itemdata = data.data;
          this.realPicUrl = data.data.realPicUrl.split(',');
          let datas = [];
          let housePicUrl = this.itemdata.housePicUrl;
          let virtualPicUrl = this.itemdata.virtualPicUrl;
          let realPicUrl = this.itemdata.realPicUrl;
          let len1 = housePicUrl.split(',').length;
          let data1 = housePicUrl.split(',');
          let len2 = virtualPicUrl.split(',').length;
          let data2 = virtualPicUrl.split(',');
          let len3 = realPicUrl.split(',').length;
          let data3 = realPicUrl.split(',');
          for (let i=0;i<len1;i++){
            if (data1[0] != '') {
              datas.push(data1[i])
            }
          }
          for (let i=0;i<len2;i++){
            if (data2[0] != '') {
              datas.push(data2[i])
            }
          }
          for (let i=0;i<len3;i++){
            if (data3[0] != '') {
              datas.push(data1[i])
            }
          }
          if (datas.length > 0) {
            this.imgNum = 1;
            this.imgCount = datas.length;
          } else {
            this.imgNum = 0;
            this.imgCount = 0;
          }
          this.overallPicArr = _.chunk(datas, 4);
          this.queryHouseList();       // 获取全部户型list
        }
      }, (error) => {
        // 调用失败
        console.log('失败', error);
      })
    },
    // 选择户型类型 全部/二室/三室
    selectType () {
      this.hxIndex = 0;
      if (this.houseIndex == 0) {
        this.curHouseList = this.houseList;
      } else if (this.houseIndex == 1) {
        this.curHouseList = this.secondHouseList;
      } else if (this.houseIndex == 2) {
        this.curHouseList = this.thirdHouseList;
      }
      this.curHouseData = this.curHouseList[0];     
      this.realPicUrl = this.curHouseData.realPicUrl.split(',');
      let datas = [];
      let housePicUrl = this.curHouseData.housePicUrl;
      let virtualPicUrl = this.curHouseData.virtualPicUrl;
      let realPicUrl = this.curHouseData.realPicUrl;
      let len1 = housePicUrl.split(',').length;
      let data1 = housePicUrl.split(',');
      let len2 = virtualPicUrl.split(',').length;
      let data2 = virtualPicUrl.split(',');
      let len3 = realPicUrl.split(',').length;
      let data3 = realPicUrl.split(',');
      for (let i=0;i<len1;i++){
        if (data1[0] != '') {
          datas.push(data1[i])
        }
      }
      for (let i=0;i<len2;i++){
        if (data2[0] != '') {
          datas.push(data2[i])
        }
      }
      for (let i=0;i<len3;i++){
        if (data3[0] != '') {
          datas.push(data1[i])
        }
      }
      if (datas.length > 0) {
        this.imgNum = 1;
        this.imgCount = datas.length;
      } else {
        this.imgNum = 0;
        this.imgCount = 0;
      }
      this.overallPicArr = _.chunk(datas, 4);
    },
    // 选择户型种类
    selectLayout () {
      this.realPicUrl = this.curHouseData.realPicUrl.split(',');
      let datas = [];
      let housePicUrl = this.curHouseData.housePicUrl;
      let virtualPicUrl = this.curHouseData.virtualPicUrl;
      let realPicUrl = this.curHouseData.realPicUrl;
      let len1 = housePicUrl.split(',').length;
      let data1 = housePicUrl.split(',');
      let len2 = virtualPicUrl.split(',').length;
      let data2 = virtualPicUrl.split(',');
      let len3 = realPicUrl.split(',').length;
      let data3 = realPicUrl.split(',');
      for (let i=0;i<len1;i++){
        if (data1[0] != '') {
          datas.push(data1[i])
        }
      }
      for (let i=0;i<len2;i++){
        if (data2[0] != '') {
          datas.push(data2[i])
        }
      }
      for (let i=0;i<len3;i++){
        if (data3[0] != '') {
          datas.push(data1[i])
        }
      }
      if (datas.length > 0) {
        this.imgNum = 1;
        this.imgCount = datas.length;
      } else {
        this.imgNum = 0;
        this.imgCount = 0;
      }
      this.overallPicArr = _.chunk(datas, 4);
    },
    // 获取当前的图片num
    getImgNum () {
      this.imgNum = this.imgIndex.index1 * 4 + this.imgIndex.index2 + 1;
    },
    // 获取楼盘活动
    getActivity () {
      this.$http.get(this.$location + '/api/promotion/queryBuildingPromotionInfo.do?from=1&timestamp=2&buildingId=' + this.curHouseData.buildingId, {}, {
        headers: {
        },
        emulateJSON: true
      }).then((res) => {
        // 调用成功
        let data = res.data;
        if (data.errorCode == 0) {
          this.itemdata = data.data;
        }
      }, (error) => {
        // 调用失败
        console.log('失败', error);
      })

      this.imgNum = this.imgIndex.index1 * 4 + this.imgIndex.index2 + 1;
    },
    // 预约添加
    saveUserPreorder () {
      if (this.appointmentInfo.name == '' || this.appointmentInfo.name == null || this.appointmentInfo.name == undefined) {
        this.$message({
          message: '姓名不能为空！',
          type: 'warning'
        })
        return;
      }
      if (this.appointmentInfo.phone == '' || this.appointmentInfo.phone == null || this.appointmentInfo.phone == undefined) {
        this.$message({
          message: '电话不能为空！',
          type: 'warning'
        })
        return;
      }
      if (this.appointmentInfo.phone.length > 11 || this.appointmentInfo.phone.length < 7) {
        this.$message({
          message: '请输入正确的电话长度！',
          type: 'warning'
        })
        return;
      }
      if (this.appointmentInfo.preorderTime == '' || this.appointmentInfo.preorderTime == null || this.appointmentInfo.preorderTime == undefined) {
        this.$message({
          message: '预约时间不能为空！',
          type: 'warning'
        })
        return;
      }
      if (window.localStorage) {
        var token = JSON.parse(localStorage.getItem("token"));
        console.log('-------------------token');
        console.log(token);
        if (token == '' || token == null || token == undefined) {
          this.$router.push('/login');
        }
      }
      this.$http.get(this.$location + '/api/preorder/saveUserPreorder.do?from=1&timestamp=2&relatedFlag=1&token='+ token +'&relatedId='+ this.curHouseData.houseId +'&realname='+ this.appointmentInfo.name +'&tel='+ this.appointmentInfo.phone +'&preorderTime='+ this.appointmentInfo.preorderTime.toLocaleDateString() +'&message = '+ this.appointmentInfo.message, {}, {
        headers: {
        },
        emulateJSON: true
      }).then((res) => {
        // 调用成功
        let data = res.data;
        if (data.errorCode == 0) {
          console.log("预约添加成功");
        }
      }, (error) => {
        // 调用失败
        console.log('失败', error);
      })
    },
    // 推荐赚佣金
    saveUserRecommendCommission () {
      if (this.appointmentInfo.name == '' || this.appointmentInfo.name == null || this.appointmentInfo.name == undefined) {
        this.$message({
          message: '姓名不能为空！',
          type: 'warning'
        })
        return;
      }
      if (this.appointmentInfo.phone == '' || this.appointmentInfo.phone == null || this.appointmentInfo.phone == undefined) {
        this.$message({
          message: '电话不能为空！',
          type: 'warning'
        })
        return;
      }
      if (this.appointmentInfo.phone.length > 11 || this.appointmentInfo.phone.length < 7) {
        this.$message({
          message: '请输入正确的电话长度！',
          type: 'warning'
        })
        return;
      }
      if (this.appointmentInfo.sex == '' || this.appointmentInfo.sex == null || this.appointmentInfo.sex == undefined) {
        this.$message({
          message: '性别不能为空！',
          type: 'warning'
        })
        return;
      }
      if (this.appointmentInfo.age == '' || this.appointmentInfo.age == null || this.appointmentInfo.age == undefined) {
        this.$message({
          message: '年龄不能为空！',
          type: 'warning'
        })
        return;
      }
      if (window.localStorage) {
        var token = JSON.parse(localStorage.getItem("token"));
        console.log('-------------------token');
        console.log(token);
        if (token == '' || token == null || token == undefined) {
          this.$router.push('/login');
        }
      }
      this.$http.get(this.$location + '/api/recommendCommission/saveUserRecommendCommission.do?from=1&timestamp=2&token='+ token +'&realname='+ this.appointmentInfo.name +'&tel='+ this.appointmentInfo.phone +'&sex='+ this.appointmentInfo.sex +'&age='+ this.appointmentInfo.age +'&relatedId='+ this.curHouseData.houseId +'&relatedFlag=1', {}, {
        headers: {
        },
        emulateJSON: true
      }).then((res) => {
        // 调用成功
        let data = res.data;
        if (data.errorCode == 0) {
          console.log("推荐赚佣金添加成功");
        }
      }, (error) => {
        // 调用失败
        console.log('失败',error);
      })
    },
    // 清除预约信息
    cleanYuyueInfo () {
      this.isShowY = false;
      this.appointmentInfo.name = '';
      this.appointmentInfo.phone = '';
      this.appointmentInfo.time = '';
      this.appointmentInfo.message = '';
      this.appointmentInfo.sex = '';
      this.appointmentInfo.age = '';
    }
  },
  components: {
    homeheader,
    bottomfooter,
    banner
  }
}
</script>

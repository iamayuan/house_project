<template>
  <div>
    <homeTop></homeTop>
    <homeHeader></homeHeader>
    <div class="lq border-bottom">
      <div class="lq_cont">
        <img src="../assets/images/gy_one.png" alt="" class="gy_one">
        <div class="lq_qyjs">
          <img src="../assets/images/qyjs_pic.jpg" alt="" class="lq_qyjs_pic">
          <div class="lq_qyjs_text">
            <img src="../assets/images/gscm_logo.png" alt="" class="lq_qyjs_logo">
            <p class="lq_qyjs_desc">桂林市光速广告传媒有限公司成立于2014年，是一家以大型户外广告（LED户外高清显示屏、户外大牌）；互联网应用与开发、全景看房、3D影视设计制作、平面设计、房地产营销策划、会展服务及活动策划、房产策划、全方位礼品印刷与制作；代理国内各类广告设计、制作、发布、广告的公司。公司拥有丰富的媒体广告代理经验和专业的运营模式。三年的发展，让公司拥有了众多的优质客户资源，目前公司正在为房产、汽车、快消品、金融保险、家居建材等各行业的国内外众多品牌，提供着高效优质、专业超值的广告服务。</p>
          </div>
        </div>
        <div class="lq_qyjs_sp">
          <div class="item_box">
            <img src="../assets/images/sp_1.jpg" alt="" class="item_pic">
            <p class="item_desc">
              宽敞的办公环境
            </p>
          </div>
          <div class="item_box">
            <img src="../assets/images/sp_2.jpg" alt="" class="item_pic">
            <p class="item_desc">
              专业的工作团队
            </p>
          </div>
          <div class="item_box" style="margin-right:0px;">
            <img src="../assets/images/sp_3.jpg" alt="" class="item_pic">
            <p class="item_desc">
              专业会议室
            </p>
          </div>
        </div>
      </div>
      <div class="lq_cont2">
        <div class="lq_cont_two">
          <img src="../assets/images/gy_two.png" alt="" class="gy_two">
          <ul class="lq_fw">
            <li class="fw_item_box">
              <p class="fw_item_title">户外广告</p>
              <img src="../assets/images/hw_logo.png" alt="" class="fw_item_pic">
              <p class="fw_item_desc">户外三面翻广告牌、墙体板式广告牌等，更有桂林市黄金地段最好户外LED牌，桂林市解放东路柏丽商务酒店楼体（解放桥头）</p>
            </li>
            <li class="fw_item_box">
              <p class="fw_item_title">互联网开发应用</p>
              <img src="../assets/images/hlw_logo.png" alt="" class="fw_item_pic">
              <p class="fw_item_desc"> 主要是房地产、020体验式营销平台，媒体、销售、中介、业主、渠道+街景、娱乐、互动、展示、体验为一体的现代房地产专业平台。</p>
            </li>
            <li class="fw_item_box">
              <p class="fw_item_title">大型活动策划</p>
              <img src="../assets/images/hd_logo.png" alt="" class="fw_item_pic">
              <p class="fw_item_desc">承接大型活动策划及实施，多次举办车展、房车展，美食节等活动，并在业界获得广泛好评；如 时代广场星空错觉艺术馆、华发四季星空展等。</p>
            </li>
            <li class="fw_item_box">
              <p class="fw_item_title">平面设计</p>
              <img src="../assets/images/pmsj_logo.png" alt="" class="fw_item_pic">
              <p class="fw_item_desc">书籍装帧设计，标志设计，封面设计，包装设计、海报、VI、logo、宣传册等。</p>
            </li>
            <li class="fw_item_box">
              <p class="fw_item_title">3D影视设计</p>
              <img src="../assets/images/ys_logo.png" alt="" class="fw_item_pic">
              <p class="fw_item_desc">  三维动画、 宣传片、虚拟现实、 全息成像、互动多媒体、数字展厅等。</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="lq_cont3">
        <div class="lq_cont_three">
          <img src="../assets/images/gy_three.png" alt="" class="gy_three">
          <p class="fw_dz" style="margin-top:30px;"><img src="../assets/images/dinwei_logo.png" alt="" class="lq_dw_logo"><span class="lq_lxdz">办公地址：桂林市七星区普陀路40号广西特色作物研究所2楼</span></p>
          <p class="fw_dz"><img src="../assets/images/dianhua_logo.png" alt="" class="lq_dw_logo"><span class="lq_lxdz">联系电话：0773-8888888</span></p>
          <p class="fw_dz" style="margin-bottom:30px;"><img src="../assets/images/youxiang_logo.png" alt="" class="lq_dw_logo"><span class="lq_lxdz">邮政编码：541004</span></p>
          <div class="lq_fw_dt">
            <img src="../assets/images/ditu.jpg" alt="" class="fw_tu_pic">
          </div>
        </div>
      </div>
     </div>
    <bottomfooter></bottomfooter>
  </div>
</template>

<script>
import homeHeader from '../components/home/homeHeader'
import homeTop from '../components/home/homeTop'
import bottomfooter from '../components/bottomfooter'
export default {
  data () {
    return {
    }
  },
  components: {
    homeHeader,
    homeTop,
    bottomfooter
  }
}
</script>
<template>
  <div>
    <homeTop></homeTop>
    <homeHeader></homeHeader>
    <div class="lq_zx">
      <img src="../assets/images/zixun_top.jpg" alt="" class="lq_zxtop_pic">
      <img src="../assets/images/zixun_title.png" alt="" class="lq_zxzx_title">
      <ul class="lq_zx_sp">
       <li class="lq_zx_item_box"><img src="../assets/images/zixun_pic1.jpg" alt="" class="zx_item_pic">
          <p class="lq_zx_item_title">树立家装设计行业规范</p>
       </li>
       <li class="lq_zx_item_box"><img src="../assets/images/zixun_pic2.jpg" alt="" class="zx_item_pic">
          <p class="lq_zx_item_title">看房体验展完美收官</p>
       </li>
       <li class="lq_zx_item_box" style="margin-right:0px;"><img src="../assets/images/zixun_pic3.jpg" alt="" class="zx_item_pic">
          <p class="lq_zx_item_title">你说，风水是不是很重要？</p>
       </li>
     </ul>
    <div class="lq_tab_text">
      <ul class="lq_zx_tab_nav">
        <li class="lq_zx_nav lq_zx_selected">行业资讯</li>
        <li class="lq_zx_nav">房产小知识</li>
        <li class="lq_zx_nav">热门关注</li>
        <li class="lq_zx_nav">本地大事件</li>
      </ul>
      <!-- 资讯文案列表 -->
      <ul class="lq_zx_wa">
        <li class="lq_zx_ea_desc" v-for="item of newdata">
          <a :href="'/xinwen?newId='+item.newId">
            <p class="zx_xw_title">{{item.title}}</p>
            <p class="zx_xw_desc">{{item.description}}</p>
          </a>
        </li>
      </ul>
      </div>
      <div id="pageGro">
        <div class="block">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[3]"
            :page-size="3"
            layout="prev, pager, next, total"
            :total="length">
          </el-pagination>
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
      newdata: [],
      length: 0,
      musics: [],
      cs_data: []
    }
  },
  created: function () {
    this.check();
  },
  components: {
    homeHeader,
    homeTop,
    bottomfooter
  },
  methods: {
    check () {
      var that = this;
      if (window.localStorage) {
        this.quhref = JSON.parse(localStorage.getItem('quhref'));
      }
      that.$http.get(this.$location + '/api/article/queryArticleList.do?from=1&timestamp=2&cid=30', {}, {
        headers: {
        },
        emulateJSON: true
      }).then((res) => {
        // 调用成功
        console.log('22', res);
        this.musics = res.data.data.list; // 源数据
        this.$root.Bus.$emit('sy_news_data', this.musics);
        this.length = this.musics.length; // 总条数
        this.cs_data.splice(0, this.cs_data.length);
        this.cs_data = _.chunk(this.musics, 3);
        this.newdata = this.cs_data[0];
      }, (error) => {
        // 调用失败
        console.log('失败', error);
      })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange (val) {
      var index = val - 1;
      this.newdata = this.cs_data[index];
    }
  }
}
</script>

<style>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
/*li {
  display: inline-block;
  margin: 0 10px;
}*/
a {
  color: #42b983;
}
.el-tabs__content{
  display: none;
}
</style>
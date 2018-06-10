<template>
  <div>
    <homeheader></homeheader>
    <div class="lq_new_cont">
      <ul class="lq_new_nav">
        <li class="lq_new_box lq_zx_selected">行业资讯</li>
        <li class="lq_new_box">房产小知识</li>
        <li class="lq_new_box">热门关注</li>
        <li class="lq_new_box">本地大事件</li>
      </ul>
      <div class="lq_new_ss">
        <input type="text" class="lq_new_input" placeholder="请输入关键词">
        <p class="lq_new_button">查找</p>
      </div>
      <img :src="dataList.logo" class="lq_new_pic" alt="">
      <div class="lq_new_lj">
        <div class="lq_new_ljlogo">
          <img src="../assets/images/icon8.png" alt="">
        </div>
        <span class="lq_new_ljwa">首页>资讯中心>{{dataList.title}}</span>
      </div>
      <p class="lq_new_title">{{dataList.title}}</p>
      <p class="lq_new_time">{{dataList.pubTime}} 来源：{{dataList.author}}</p>
      <img src="../assets/images/sc.png" alt="" class="lq_sc">
      <img src="../assets/images/fx.png" alt="" class="lq_fx">
      <div class="lq_new_desc">
        <div v-html="dataList.content"></div>
      </div>
      <div class="clearfix" style="text-align: right;">
        <p class="lq_new_bottom_next"><a :href="'/xinwen?newId='+newId_pre.id" :title="newId_pre.title">上一篇：{{newId_pre.title}}</a></p></br>
        <p class="lq_new_bottom_next"><a :href="'/xinwen?newId='+newId_next.id" :title="newId_next.title">下一篇：{{newId_next.title}}</a></p>
      </div>
    </div>
    <bottomfooter></bottomfooter>
  </div>
</template>

<script>
import homeheader from '../components/header'
import bottomfooter from '../components/bottomfooter'
export default {
  data () {
    return {
      dataList: '',     // 当前文章信息
      newId: '',        // 当前文章的id
      newId_pre: {      // 上一篇文章的id 和 title
        id: '',
        title: ''
      },
      newId_next: {     // 下一篇文章的id 和 title
        id: '',
        title: ''
      }
    }
  },
  created: function () {
    this.queryArticleInfo();
    this.getNewIds();
  },
  methods: {
    // 获取文章信息
    queryArticleInfo () {
      this.newId = this.$utils.getUrlKey('newId');
      this.$http.get(this.$location + '/api/article/queryArticleInfo.do?from=1&timestamp=2&newId=' + this.newId, {}, {
        headers: {
        },
        emulateJSON: true
      }).then((res) => {
        // 调用成功
        let data = res.data;
        if (data.errorCode == 0) {
          this.dataList = data.data;
        } else {
          // 调用失败
          console.log('失败', data.errorMsg);
        }
      }, (error) => {
        // 调用失败
        console.log('失败', error);
      })
    },
    // 获取上一篇和下一篇文章的newId
    getNewIds () {
      this.$http.get(this.$location + '/api/article/queryArticleList.do?from=1&timestamp=2&cid=30', {}, {
        headers: {
        },
        emulateJSON: true
      }).then((res) => {
        // 调用成功
        let list = res.data.data.list;
        let index = _.findIndex(list, (o) => { return o.newId == this.newId });   // 获取当前文章的索引
        // 上一篇
        if (index <= 0) {
          this.newId_pre.id = '';
          this.newId_pre.title = '';
        } else {
          this.newId_pre.id = list[index-1].newId;
          this.newId_pre.title = list[index-1].title;
        }
        // 下一篇
        if (index >= (list.length - 1)) {
          this.newId_next.id = '';
          this.newId_next.title = '';
        } else {
          this.newId_next.id = list[index+1].newId;
          this.newId_next.title = list[index+1].title;
        }
      }, (error) => {
        // 调用失败
        console.log('失败', error);
      })
    }
  },
  components: {
    homeheader,
    bottomfooter
  }
}
</script>
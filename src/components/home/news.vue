<template>
  <section class="news">
    <div class="wrapper">
      <div class="title">
        <img src="../../assets/images/newst.png">
        <a href="/zixun">
          <p class="more">更多+</p>
        </a>
      </div>
      <div class="about clearfix">
        <div class="about2">
          <a href="/zixun" class="aboutImg">
            <img src="../../assets/images/newlist.png">
          </a>
        </div>
        <div class="about2 about2-list">
          <div>
            <span class="news-title">平台资讯</span>
            <a href="/zixun">
              <span class="news-more">more</span>
            </a>
          </div>
          <div class="news-list">
            <p v-for="item of sy_news_data">
              <a :href="'/xinwen?newId='+item.newId">
                {{item.title}}
                <span class="news-date">{{item.pubTime}}</span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
    data() {
        return {
            sy_news_data: []
        };
    },
    created: function() {
        this.news_check();
    },
    methods: {
        news_check: function() {
            var that = this;
            if (window.localStorage) {
                this.quhref = JSON.parse(localStorage.getItem("quhref"));
            }
            that.$http
                .get(
                    this.$location +
                        "/api/article/queryArticleList.do?from=1&timestamp=2&cid=30",
                    {},
                    {
                        headers: {},
                        emulateJSON: true
                    }
                )
                .then(
                    function(res) {
                        // 调用成功
                        this.musics = res.data.data.list; // 源数据
                        this.length = this.musics.length; // 总条数
                        this.sy_news_data = this.musics;
                    },
                    function(error) {
                        // 调用失败
                        console.log("11失败", error);
                    }
                );
        }
    }
};
</script>

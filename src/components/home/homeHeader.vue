<template>
  <div class="head-nav">
    <ul class="nav-list clearfix">
      <li v-for="(itemIndex,lis) in ul" class="nav-li">
        <router-link :to="{path:itemIndex.name}" class="head-path">{{itemIndex.li}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
    data() {
        return {
            ul: [
                { li: "首页", name: "/" },
                { li: "新房", name: "/new_index" },
                { li: "二手房", name: "/secondHand" },
                { li: "袋鼠有家", name: "/kangaroos" },
                { li: "特惠房", name: "/preference" },
                { li: "资讯中心", name: "/zixun" },
                { li: "关于我们", name: "/guanyu" }
            ]
        };
    }
};
</script>

<template>
  <div class="home-index">
    <homeTop></homeTop>
    <homeHeader></homeHeader>
    <homeSwiper></homeSwiper>
    <homeSearch></homeSearch>
    <hotRecommend></hotRecommend>
    <advertising></advertising>
    <newRecommend></newRecommend>
    <enterpriseBrand></enterpriseBrand>
    <kangaroos></kangaroos>
    <Preferential></Preferential>
    <news></news>
    <about></about>
    <bottomfooter></bottomfooter>
    <backtop></backtop>
  </div>
</template>

<script>
import homeHeader from '../components/home/homeHeader'
import homeTop from '../components/home/homeTop'
import homeSwiper from '../components/home/homeSwiper'
import homeSearch from '../components/home/search'
import hotRecommend from '../components/home/hotRecommend'
import newRecommend from '../components/home/newRecommend'
import advertising from '../components/home/advertising'
import enterpriseBrand from '../components/home/enterpriseBrand'
import news from '../components/home/news'
import Preferential from '../components/home/Preferential'
import about from '../components/home/about'
import bottomfooter from '../components/bottomfooter'
import kangaroos from '../components/home/kangaroos'
import backtop from '../components/backtop'
export default {
  data () {
    return {
    }
  },
  components: {
    homeHeader,
    homeTop,
    homeSwiper,
    homeSearch,
    hotRecommend,
    newRecommend,
    advertising,
    enterpriseBrand,
    Preferential,
    kangaroos,
    news,
    about,
    bottomfooter,
    backtop
  }
}
</script>
<template>
  <div>
    <homeTop ></homeTop>
    <homeHeader></homeHeader>
    <newBanner></newBanner>
    <newSearch></newSearch>
    <newTitle></newTitle>
    <newRecommend></newRecommend>
    <bottomfooter></bottomfooter>

  </div>
</template>

<script>
import homeHeader from '../components/home/homeHeader'
import homeTop from '../components/home/homeTop'
import newSearch from '../components/newIndex/newsearch'
import newTitle from '../components/newIndex/newTitle'
import newBanner from '../components/newIndex/newBanner'
import newRecommend from '../components/newIndex/newRecommend'
import bottomfooter from '../components/bottomfooter'

export default {
  data () {
    return {
    }
  },
  components: {
    homeHeader,
    homeTop,
    newSearch,
    newBanner,
    newRecommend,
    newTitle,
    bottomfooter
  },
  methods:{
  }
}
</script>
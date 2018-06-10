<template>
  <div>
    <homeTop></homeTop>
    <homeHeader></homeHeader>
    <secondBanner></secondBanner>
    <secondOrder></secondOrder>
    <bottomfooter></bottomfooter>

  </div>
</template>

<script>
import homeHeader from '../components/home/homeHeader'
import homeTop from '../components/home/homeTop'
import secondOrder from '../components/second/secondOrder'
import secondBanner from '../components/second/secondBanner'
import bottomfooter from '../components/bottomfooter'

export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    homeHeader,
    homeTop,
    secondOrder,
    secondBanner,
    bottomfooter
  }
}
</script>
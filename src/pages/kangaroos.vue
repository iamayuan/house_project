<template>
  <div>
    <homeTop></homeTop>
    <homeHeader></homeHeader>
    <kangarooBanner></kangarooBanner>
    <kangarooOrder></kangarooOrder>
    <bottomfooter></bottomfooter>

  </div>
</template>

<script>
import homeHeader from '../components/home/homeHeader'
import homeTop from '../components/home/homeTop'
import kangarooOrder from '../components/kangaroos/kangarooOrder'
import kangarooBanner from '../components/kangaroos/kangarooBanner'
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
    kangarooOrder,
    kangarooBanner,
    bottomfooter
  }
}
</script>
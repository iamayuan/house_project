<template>
  <div>
    <homeTop></homeTop>
    <homeHeader></homeHeader>
    <preferenceBanner></preferenceBanner>
    <preferenceOrder></preferenceOrder>
    <bottomfooter></bottomfooter>

  </div>
</template>

<script>
import homeHeader from '../components/home/homeHeader'
import homeTop from '../components/home/homeTop'
import preferenceOrder from '../components/preference/preferenceOrder'
import preferenceBanner from '../components/preference/preferenceBanner'
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
    preferenceOrder,
    preferenceBanner,
    bottomfooter
  }
}
</script>
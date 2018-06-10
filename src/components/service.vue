<template>
  <div id ="service">
      <img src="../assets/images/btn2.png" @click='alertEvent' class="service-img">
  </div>
</template>

<script>
  export default {
    data () {
      return {

      }
    },
    methods: {
      alertEvent: function () {
        alert('我是在线客服！')
      }
    }
  }
</script>
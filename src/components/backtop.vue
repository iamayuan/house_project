<template>
  <div class="backtop" @click="toTop">
      <img src="../assets/images/backtop.png" width="100%" height="100%" alt="">
  </div>
</template>

<script>
  export default {
    data () {
      return {
      }
    },
    methods: {
      toTop: function () {
        document.documentElement.scrollTop = document.body.scrollTop = 0;
      }
    }
  }
</script>
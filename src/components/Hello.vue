<template>
  <div class="hello">
    <h2>{{name2}}</h2>
    <ul>
      <li><router-link to="/hello2">  跳转页</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  props: ['name2']
}
</script>

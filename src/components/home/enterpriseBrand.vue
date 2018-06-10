<template>
  <section class="enterBrand">
    <div class="wrapper">
      <div class="ebtimg-box">
        <img src="../../assets/images/ebt.png" class="ebt-img">
      </div>
      <div class="enter-list-box clearfix">
        <div class="lq_fqpp enter-list clearfix">
          <el-carousel indicator-position="outside">
            <el-carousel-item v-for="(item,index) of sy_fq_data" :key="item.value">
              <ul class="lq_fqpp_logo">
                <li v-for="img of sy_fq_data[index]" class="enter-item">
                  <img v-bind:src="img.logo" alt="" class="enter-img">
                </li>
              </ul>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    data () {
      return {
        sy_fq_data:[],
        length:0
      }
    },
    created:function(){
      this.quyuselect();   
    },
    methods:{
      quyuselect:function(){
        this.$root.Bus.$on('sy_fq_data', sy_fq_data => {
          this.length = sy_fq_data.length;
          for(var i=0,len=this.length;i<len;i+=10){
            this.sy_fq_data.push(sy_fq_data.slice(i,i+10));
          } 
        })
      }
    }
  }
</script>
<style scoped>
.el-carousel__item{
  display:inline-block;
}
</style>

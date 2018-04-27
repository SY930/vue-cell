<template>
  <div>
    <Header :seller="seller"/>
    <div class="tab border_1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import Header from './components/header/header.vue'
  import {getGoods} from './api'
  const ERROR = 0;
  export default{

      data(){
        return{
            seller:{}
        }
      },
    created(){
         this.getData();
    },
    methods:{
      getData(){
        getGoods().then((res)=>{
          if(res.error==ERROR){
            this.seller = res.data;
          }

        })
      }
    },
    components: {Header}
  }
</script>

<style type="text/stylus" lang="stylus">
  @import "./common/stylus/mixin.styl"
  .tab
    display: flex
    width: 100%
    height: 40px
    line-height: 40px
    border-1px(rgba(7, 17, 27, .1))

    .tab-item
      flex: 1
      text-align: center

      a
        display: block
        font-size: 14px
        color: rgb(77, 85, 93)
        &.router-link-active
          color: rgb(240, 20, 20)
</style>

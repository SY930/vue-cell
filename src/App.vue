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
    <keep-alive>
    <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import {urlParse} from './common/js/util'
  import Header from './components/header/header.vue'
  import {getSeller} from './api'
  const ERROR = 0;
  export default{

      data(){
        return{
          seller :{
           id: (() => {
              let queryParam = urlParse();
              return queryParam.id;
            })()
          }
        }
      },
    created(){
         this.getData();
    },
    methods:{
      getData(){
        getSeller(this.seller.id).then((res)=>{
          if(res.errno==ERROR){
            this.seller = Object.assign({}, this.seller, res.data);
            console.log(this.seller.id);
          }

        }).catch((err)=>{
          console.log(err);
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

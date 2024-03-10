<template>
  <div class="classifications">
    <Huge :img="'/images/2.jpg'" :title="type"></Huge>
      <div class="classifications-content">
        <p>文章类型</p>
        <ul class="classifications-list" >
          <li class="item" :class="{'active':item.name==type}" v-for="(item,index) in typeList" @click="searcheTo(item.name)" :key="index">{{item.name}}<span>{{item.count}}</span></li>
        </ul>
        <ClssList></ClssList>
      </div>

      
  </div>
</template>

<script setup lang="ts">
import Huge from '@/components/hugescreen/index.vue'
import {ref,reactive} from 'vue'
import { uidLabel,typeArticle,uidAllType} from '@/utils/article.ts'
import ClssList from "@/components/article/class.vue"
import { router } from "@/routers";
import {useGlobalStore} from "@/stores/index.ts"
import { useRouter, useRoute } from "vue-router";

let type :any= useRoute().params.type
let store = useGlobalStore()
let typeList=reactive([])

let uid =ref(7)
if (store.user.uid)  uid.value = store.user.uid  


function getAllType(){

  
  uidAllType().then((res:any)=>{

console.log(res,1111,uid.value);


    console.log(res,66666);
   typeList.push(...res)

   console.log(typeList);
   
    

  })


}
 getAllType()

 //搜索
 function searcheTo(val:any){

router.push({
  path:`/classifications/${val}`,
  state:{
    data:"classifications"

  }
})
}

</script>

<style scoped lang="scss">
.active{
      transform: scale(1.1,1.1);
      background: var(--theme-color) !important;
      color: #fff !important ;
}
.classifications-content{
  >p{
  margin-top: 10px;
    font-size: 32px;
    font-weight: 600;
    color: var(--main-color);
  }
  max-width: 1340px;
  padding: 0 10px;
  margin: 0 auto;

  @media screen and (max-width: 1024px) {
          width: 100%;
          padding: 0 6px;


    }
  .classifications-list{
    width: 100%;
    margin-top: 10px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
    padding: 10px 20px;
    li{
      transition: .3s;
      margin: 10px;
      padding: 20px;
      border-radius: 12px;
      box-shadow:  var(--box-shadow);;
      // box-shadow: 0 0 4px #000;
      background: var(--main-bg-color);
      color: var(--main-color);
      font-size: 20px;
      cursor: pointer;

      span{
        border-radius: 12px;
        padding: 4px 6px;
        background: var(--mian-bg-color-2);
        transition: .3s;
        margin-left: 4px;
        color: #4e5358;
      }
    }
    li::before{
      content: "#";
      margin-right: 4px;
      opacity: .4;
      font-size: 20px;
      font-weight: 600;
    }
    li:hover{
      transform: scale(1.1,1.1);
      background: var(--theme-color);
      color: #fff ;
    }
    // li:hover span{
    //   color:var(--theme-color) ;
    // }
  }
}
</style>
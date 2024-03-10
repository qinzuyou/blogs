
<script setup lang="ts">
import { typeWallpaper,oneWallpaper} from "@/utils/wallpaper.ts"
import { reactive,ref } from "vue";
import tool from "@/assets/tool/index.ts"
const wallpaperList=reactive([

])

const wallpaper = ref("")
oneWallpaper().then((res:any)=>{
  res.cover=tool.baseURL+"/api"+ res.cover
  wallpaper.value=res.cover
})


// typeWallpaper(1,100,null).then((res:any)=>{
//   res=res.records.map((item:any)=>{
//       item.cover=tool.baseURL+"/api"+ item.cover
//     return {
//       ...item
//     }
//   })
//     console.log(res,"壁纸");

// let sjs=Math.floor(Math.random() * res.length);


// wallpaper.value=res[sjs].cover
    
// })
const props = defineProps({
  title: {
    type: String,
    default: 'null'
  },
  img: {
    type: String,
    default: 'null'
  }

})

console.log(props);

</script>

<template>
  <div class="huge" :style="{ backgroundImage: 'url(' + wallpaper + ')' }">


    <p>{{ title }}</p>
    <!-- <img src="@/assets/images/1.jpg"> -->

  </div>
</template>


<style scoped lang="scss">
.huge {
  height: 26rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  background-position: center;
  position: relative;

  p {
    font-weight: 700;
    color: #fff;
    text-align: center;
    text-shadow: 0 0.1875rem 0.3125rem #1c1f21;
    font-size: 2em;
    z-index: 2;
  }

}
.huge::after{
  content: '';
    width: 100%;
    height: 3rem;
    position: absolute;
    bottom: 0;
    left: 0;
    background: linear-gradient(180deg, transparent, #f0f0f0);
}



.huge:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.15);
}
</style>
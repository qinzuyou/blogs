<template>
  <div :class="{'hint-1':props.titlees}" class="hint">
      <svg-icon iconName="icon-yueliang" color="#fff"></svg-icon>
     <p>{{props.title}}</p> 
  </div>
</template>

<script lang="ts" setup>

import { ref, reactive,watch } from "vue";

const props = defineProps({
title: {
  type: String,
  default: 'null'
},
titlees:{
  type:Boolean,
  default:false
}



})


// let hintCut=ref(props.titlees)
// console.log(props,'props',hintCut.value);


// watch(
//   () => props.titlees,
//   (newVal, oldVal) => {
    
//     console.log('监听基本类型数据testStr')
//     console.log('new', newVal)
//     hintCut.value=newVal
//     console.log('old', oldVal,hintCut.value)

//     setTimeout(() => {
//     hintCut.value=false
    
//     console.log(hintCut.value,props.titlees);
    
// }, 2000);


//   }
// )



</script>

<style lang="scss" scoped>

.hint-1{
  right: 0px !important;
}
.hint{
  padding: 10px 20px;
  // height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background: linear-gradient(135deg, #59c3fb 10%, #268df7 100%);;
  border-radius: 4px;
  position: fixed;
  bottom: 10%;
  right: -300px;
  transition: all .3s;
  z-index: 99;

}
.hint p{
margin-left: 4px;
}
</style>
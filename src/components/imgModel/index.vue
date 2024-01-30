<template>
  <div class="model" @click="setShow()">
    <div class="model-box">
      <svg-icon iconName="icon-wei-" color="#000"  @click="setShow()"></svg-icon>
      <img :src="props.img" alt="">
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['setShow']);

const props = defineProps({
  img: {
    type: String,
    default: 'null'
  }

})

function setShow(){
      emit('setShow')
}
</script>

<style scoped lang="scss">
.model-box {
  position: relative;
  width: 600px;
  height: 600px;
  box-shadow: 0px 12px 32px 4px rgba(0, 0, 0, .04), 0px 8px 20px rgba(0, 0, 0, .08);
  border-radius: 4px;
  background: #fff;
  padding: 20px;
  img{
    width:100%;
    height:100%;
  }
  .svg-icon:hover{
    transform: rotate(360deg);
  }
  .svg-icon{
    cursor: pointer;
    position: absolute;
    right:5px;
    top: 5px;
    transition:.3s;
    font-size: 22px;
  }
}

.model {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  right: 0;
  z-index:30;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
<template>
  <div class="qz-button" ref="qzbu" 
    :style="{ width: props.width + 'px', height: props.height + 'px', color: props.color, background: `linear-gradient(135deg, ${props.colorLeft} 30%, ${props.colorRight} 100%)`, borderRadius: props.radius + 'px' }">

    <svg-icon v-if="props.icon" :iconName="props.iconName" color="#fff"></svg-icon>

    <span>

      {{ props.title }}

    </span>



  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from 'vue';
const props = defineProps({
  title: {
    type: String,
    default: 'null'
  },
  width: {
    type: String,
    default: '84'
  },
  height: {
    type: String,
    default: '28'
  },
  colorLeft: {
    type: String,
    default: '#59c3fb'
  },
  colorRight: {
    type: String,
    default: '#268df7'
  },
  color: {
    type: String,
    default: '#fff'
  },
  radius: {
    type: String,
    default: '4'
  },
  icon: {
    type: Boolean,
    default: false,
  },
  iconName: {
    type: String,
    default: 'icon-yueliang'
  }
});

function test() {
  console.log()
}

const qzbu = ref()
// onMounted(() => {
//       console.dir(qzbu.value);
//     });

// function cs() {

//   nextTick(() => {
//     const ss = qzbu.value
//     qzbu.value.style.color = '#000'
//     console.log(qzbu.value);
//   })

// }

onMounted(()=>{
    // console.log(qzbu.value,5666);
    


qzbu.value.onclick = (event:any) => {
  // 创建波纹小球dom
  const rippleBall = document.createElement('span')

  // 获取波纹小球dom初始位置
  const x = event.clientX - qzbu.value.getBoundingClientRect().x - 10
  const y = event.clientY - qzbu.value.getBoundingClientRect().y - 10

  // 波纹小球样式设置
  rippleBall.style.left = x + 'px'
  rippleBall.style.top = y + 'px'
  rippleBall.classList.add('ripple-ball')

  // 波纹小球挂载
  qzbu.value.appendChild(rippleBall)

  // 监听动画结束事件,以移除小球
  rippleBall.addEventListener('animationend', () => {
    qzbu.value.removeChild(rippleBall)
  })
}
})


let createRipple = function (event: any) {

  nextTick(() => {
    const button = event.currentTarget;
    const rippleSize = Math.max(button.clientWidth, button.clientHeight)
    const moved = rippleSize / 2;
    const circle = document.createElement("span")
    circle.style.width = circle.style.height = `${rippleSize}px`
    circle.style.top = `${event.clientY - button.offsetTop - moved}px`
    circle.style.left = `${event.clientX - button.offsetLeft - moved}px`
    circle.classList.add("ripple")
    const isExist = button.getElementsByClassName("ripple")[0]
    if (isExist) {
      isExist.remove()
    }
    button.append(circle)
  })


}








</script>

<style lang="scss">
  /* 实现水波纹效果的小球样式 */
  .ripple-ball {
    position: absolute;
    display: block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.4);
    animation: ripple2 1s;	
}
/* 小球动画 */
@keyframes ripple2 {
    0% {
        transform: scale(2);
    } 
    /* 波纹扩张 */
    85% {
        transform: scale(20);
    }
    100% {
        opacity: 0
    }
}
.qz-button {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  transition: .3s;
  cursor: pointer;

  .svg-icon {
    margin-right: 5px;
    margin-top: 2px;
  }

}

.qz-button:hover {
  opacity: 0.8;

}

.my-ripple {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  border-radius: 50%;
  background-color: currentColor;
  opacity: 0;
  transition: transform 0.2s cubic-bezier(0.68, 0.01, 0.62, 0.6), opacity 0.08s linear;
  will-change: transform, opacity;
  pointer-events: none;
  cursor: pointer;
}

.ripple {
  position: absolute;
  border-radius: 50%;
  transform: scale(0);
  opacity: 1;
  background-color: rgba(255, 255, 255, 0.7);
  animation: ripple 600ms linear;
}

@keyframes ripple {
  to {
    transform: scale(4);
    opacity: 0;
  }
}
</style>
<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: 'null'
  },
  icon: {
    type: String,
    default: 'null'
  }

})
</script>

<template>
  <div class="pt-top">
    <div class="pt-left">
      <svg-icon :iconName="icon" color="#000"></svg-icon>
      <p>{{ title }}</p>
    </div>
    <div class="pt-right">
      <ul>
        <li class="ap-1">
        </li>
        <li class="ap-2">

        </li>
        <li class="ap-3">

        </li>
      </ul>
    </div>
  </div>
</template>



<style scoped lang="scss">
.pt-top {
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 15px;
  font-weight: 500;
  height: 45px;
  line-height: 45px;
  padding: 0 15px;
  border-bottom: 1px solid var(--classC);

}

.pt-left {
  display: flex;
  align-items: center;

  .svg-icon {
    margin-right: 4px;
  }

}

.pt-right {
  ul {
    display: flex;

    li {
      margin-left: 10px;
    }

    .ap-1 {
      width: 11px;
      height: 11px;
      background: red;
      border-radius: 50%;
    }

    .ap-2 {
      width: 11px;
      height: 11px;
      background: rgb(255, 183, 0);
      border-radius: 50%;
    }

    .ap-3 {
      width: 11px;
      height: 11px;
      background: rgb(0, 255, 17);
      border-radius: 50%;
    }
  }
}

</style>
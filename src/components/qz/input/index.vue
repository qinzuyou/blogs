<template>
    <div class="user-name" :class="{ 'name-ani': userani1, 'name-ani2': userani3 }">
        <div class="user-hint" :class="{ 'ani1': userani1, 'ani2': userani3 }">{{ props.title }}</div>
        <input :type="props.type" class="user-input"  v-model="newuser" @focus="ani1" @blur="ani1" />
    </div>
</template>

<script setup lang="ts">

import { ref, reactive, toRefs } from 'vue';

const userani1 = ref(false);

const userani3 = ref(false)

const props = defineProps({
    title: {
        type: String,
        default: null
    },
    contents: {
        type: String,
        default: null
    },
    type:{
        type: String,
        default: null
    }
})
const newuser = ref(props.contents)

const emit = defineEmits(['getData']);
function ani1() {
    if (newuser.value == '') {
        userani1.value = !userani1.value
    } else {
        userani3.value = !userani3.value
    }

    console.log(props.contents)

    emit('getData', newuser.value)
}





if (newuser.value == '') {
    userani1.value=false
    userani3.value=false
} else {
    userani1.value=true
    userani3.value=true
}

// const { contents: { newcontents }} = toRefs(props)

</script>

<style scoped lang="scss">
.user-name {
    position: relative;
    padding-top: 20px;
    margin-top: 20px;

    .user-hint {
        position: absolute;
        top: 20px;
        opacity: 0.5;
        transition: 0.2s;
        cursor: text;
        z-index: 1;
    }

    input {
        position: relative;
        display: flex;
        z-index: 2;
        background: none;
        color: var(--nav-color);
        transform: .3s;
        outline: none;
        height: 100%;
        width: 100%;
        border: none;
        transition: all 0.6s;
        border-bottom: 0px;
        border-bottom: 1px solid rgba($color: #000000, $alpha: 0.2);
        padding: 6px 0;

    }

}

.user-name::before {
    position: absolute;
    content: "";
    width: 0px;
    background: var(--theme-color);

    height: 1px;
    left: 0px;
    transition: all 0.5s;
    bottom: 0px;
    border-radius: 5px;
    //   box-shadow: 1px 1px 3px -1px var(--theme-color);
    // border-bottom: 1px solid $theme-color;
}

.user-name:hover::before {
    width: 100%;
}

.ani1 {
    top: 0 !important;
    font-size: 13px;
    opacity: 1 !important;
    color: var(--theme-color);
}

.ani2 {
    opacity: 0.5 !important;
    color: #000 !important;
}
</style>
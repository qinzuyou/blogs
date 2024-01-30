<template>
  <div>
    <we-editor
    toolbar-class="toolbar"
    editable-class="editable"
    toolbar-style="border: 1px solid #d9d9d9"
    editable-style="border: 1px solid #d9d9d9"
    :toolbar-option="toolbar"
    :editable-option="editable"
    :toolbar-reloadbefore="onToolbarReloadBefore"
    :editable-reloadbefore="onEditableReloadBefore"
    v-model="formData.jarr"
    v-model:json="formData.jstr"
    v-model:html="formData.html"
  />
  </div>


</template>

<script setup lang="ts">
// 引入 wangeditor5 样式
import '@wangeditor/editor/dist/css/style.css'

import { WeEditor, useWangEditor } from 'wangeditor5-for-vue3'
import { defineComponent, shallowReactive } from 'vue'

// 编辑器配置
// 编辑器配置
const editableOption = {
 
}

// 菜单栏配置
const toolbarOption = {
  mode: 'simple' // 指定简介模式
}

// 防抖时长。当会触发重载的配置项发生变化 365ms 后，编辑器会重载
const reloadDelary = 365

// 对于上面的三个对象，经过 useWangEditor 处理后，返回的 editable 和 toolbar 分别对应编辑器和菜单栏的配置项
const { editable, toolbar } = useWangEditor(
  editableOption,
  toolbarOption,
  reloadDelary
)

// toolbar.mode = 'default' 
// 开启只读模式【不可编辑】
editable.config.readOnly = false

// 不要使用 reactive/ref，应该使用 shallowReactive/shallowRef 来接收 json array 数据
const formData = shallowReactive({ jarr: [], jstr: '', html: '' })

// 在可编辑的重新加载之前
function onEditableReloadBefore(inst) {
  console.log(inst)
  console.log('editable 即将重载: ' + new Date().toLocaleString())
}

// 在工具栏上重新加载之前
function onToolbarReloadBefore(inst) {
  console.log(inst)
  console.log('toolbar 即将重载: ' + new Date().toLocaleString())
}

</script>

<style scoped lang="scss">
/*工具栏样式*/
.toolbar{
	border: 1px solid #d9d9d9;margin-bottom: 10px;
}
/*工具栏剧中显示*/
.w-e-toolbar {
	justify-content: center !important;
}
/*编辑器样式*/
.editable{
	border: 1px solid #d9d9d9;
	min-height: 800px;
	width: 850px;
	margin: 30px auto 150px auto;
	background-color: #fff;
	box-shadow: 0 2px 10px rgb(0 0 0 / 12%);
	border: 1px solid #e8e8e8;
}

</style>
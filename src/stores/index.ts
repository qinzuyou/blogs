// stores/index.js
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useGlobalStore = defineStore('GlobalState', () => {

  //用户信息
  let user: any = ref()

  //登录
  const useradd = (data: any) => {
    user.value = data
  }

  //退出登录
  const userdelete = () => {
    user.value = ""
    console.log(user.value);

  }

  return {
    user,
    useradd,
    userdelete
  }
}, {
  persist: true // 开启pinia数据持久化
}
)

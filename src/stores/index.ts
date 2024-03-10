// stores/index.js
import { defineStore } from 'pinia'
import { computed, ref,reactive } from 'vue'

export const useGlobalStore = defineStore('GlobalState', () => {

  //用户信息
  let user: any = ref()

  //游客

  //主题
  const theme=ref(true)

  function themeCut(val:any){
    theme.value=val
  }
  

  let emailUser:any=reactive({
  avatar: '',
  email: '',
  name: '',
  qq: '',


  })

  function  setEmail(data:any){
    console.log(data,'store');
    
      emailUser.avatar=data.avatar
      emailUser.email=data.email
      emailUser.name=data.name
      emailUser.qq=data.qq
  }

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
    userdelete,
    emailUser,
    setEmail,
    theme,
    themeCut
  }
}, {
  persist: true // 开启pinia数据持久化
}
)

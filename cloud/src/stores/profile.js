import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia' //从pinia中导入，defineStore方法，用于定义一个新的store

// 选项是api
// export const useProfileStore = defineStore('profile', { // 使用defineStore方法定义store
//   state() { // state表示这个store里的状态，也就是存放数据的地方
//     return {
//       userName: '林哥', // 这里我们定义了一个数据叫userName，用于存放我们的用户名 
//     }
//   },
// })

// 组合式api
export const useProfileStore = defineStore('profile', () => {
    const info = reactive({
        id: 0,
        username: 'guest',
        is_admin: false
    })

    const token = computed(() => {
        console.log('计算属性，获取token值')
    })

    function auth() {
      console.log('验证权限')
    }
  
    return { info, token, auth }
  })

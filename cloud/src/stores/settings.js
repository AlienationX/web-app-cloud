import { defineStore } from 'pinia';
import { reactive } from 'vue';

export const useSettingsStore = defineStore('settings', () => {
  const settings = reactive({
    theme: 'light',
    isCollapse: false,
    refresh: false,
    fullScreen: false,
    firstLogin: false,
    showLoginMsg: false,
  });

  const getSettings = ()=>{
    
  }

  return { settings };
});

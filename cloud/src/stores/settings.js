import { defineStore } from 'pinia';
import { reactive } from 'vue';

export const useSettingsStore = defineStore('SettingsStore', () => {
  const settings = reactive({
    theme: 'light',
    isCollapse: false,
    refresh: false,
    fullScreen: false,
    firstLogin: false,
    showLoginMsg: false,
  });

  return { settings };
});

import { defineStore } from "pinia";
import { reactive } from 'vue'

export const useSettingsStore = defineStore("SettingsStore", () => {
  const settings = reactive({
    isCollapse: false,
    refsh: false,
    login: false,
    theme: "light",
  })

  return { settings }
});

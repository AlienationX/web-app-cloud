import { defineStore } from "pinia";

export const useSettingsStore = defineStore("SettingsStore", () => {
  const settings = reactive({
    isCollapse: false,
    refsh: false,
    theme: "light",
  })

  return { settings }
});

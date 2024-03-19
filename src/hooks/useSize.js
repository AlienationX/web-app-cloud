import { ref, reactive, computed } from 'vue';
import { useSettingStore } from '../stores/setting';
const settingStore = useSettingStore();

export const useGetDensity = () => {
    const density = settingStore.settings.density;
    return { density };
};

export const useGetIconSize = () => {
    const m = {
        compact: 60,
        comfortable: 80,
        default: 100,
    };
    // 计算属性才是响应式的...
    const iconSize = computed(() => {
        return m[settingStore.settings.density];
    });
    return { iconSize };
};

export const useGetTitleStyle = () => {};

export const useGetSubTitleStyle = () => {};

export const useGetTextStyle = () => {};

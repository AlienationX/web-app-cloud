<script setup>
import { ref, reactive, computed, onMounted, toRef } from 'vue';
import VChart from 'vue-echarts';
import {
    reqGitHubUserFollowers,
    reqGitHubUserSubscriptions,
    reqGitHubUserRepos,
    reqGitHubUserRepo,
    reqGitHubUserRepoLanguages,
    reqGitHubUserRepoCommits,
} from '@/common/api.js';

import { useProfileStore } from '@/stores/profile.js';
const profileStore = useProfileStore();

const useIndicator = () => {
    const indicator = reactive({
        followers: 0,
        subscriptions: 0,
        repos: 0,
    });

    const repos = reactive([]);

    // 获取 followers 数量
    (async () => {
        let followersRes = await reqGitHubUserFollowers(profileStore.userinfo.username);
        indicator.followers = followersRes.data.length;
    })();

    // 获取 subscriptions 数量
    (async () => {
        let subscriptionsRes = await reqGitHubUserSubscriptions(profileStore.userinfo.username);
        indicator.subscriptions = subscriptionsRes.data.length;
    })();

    // 获取 repos 数量
    (async () => {
        let reposRes = await reqGitHubUserRepos(profileStore.userinfo.username);
        indicator.repos = reposRes.data.length;
        reposRes.data.map((repo) => {
            repos.push({ name: repo.name, desc: repo.description });
        });
    })();

    function reposProps(item) {
        return {
            title: item.name,
            subtitle: item.desc,
        };
    }

    return { indicator, repos, reposProps };
};

const useSelectRepo = () => {
    const repoInfo = reactive({});
    const repoName = ref('');

    const { languagesOption, getLanguagesData, languagesShow } = useRepoLanguagesChart();

    const changeSelectValue = (selectValue) => {
        const repo = selectValue.name;
        (async () => {
            let repoRes = await reqGitHubUserRepo(profileStore.userinfo.username, repo);
            const reg = /description|html_url|language|created_at|updated_at|pushed_at/;
            for (let key in repoRes.data) {
                if (key.search(reg) !== -1) {
                    // 变量做key需要使用中括号
                    repoInfo[key] = repoRes.data[key];
                }
            }
            repoName.value = repoRes.data['name'];

            getLanguagesData(repo);
        })();
    };

    return { repoInfo, repoName, changeSelectValue, languagesOption, languagesShow };
};

const useRepoLanguagesChart = () => {
    const languagesConfig = reactive({
        title: '',
        data: [],
    });

    const languagesShow = ref(false);

    const getLanguagesData = (repo) => {
        (async () => {
            let languagesRes = await reqGitHubUserRepoLanguages(profileStore.userinfo.username, repo);
            languagesConfig.title = 'languages of ' + repo;
            languagesConfig.data.length = 0;
            for (let name in languagesRes.data) {
                languagesConfig.data.push({
                    name: name,
                    value: languagesRes.data[name],
                });
            }
            languagesShow.value = true;
        })();
    };

    const languagesOption = ref({
        title: {
            text: toRef(languagesConfig, 'title'), // 必须使用toRef，否则丢失响应式
            // subtext: 'Fake Data',
            left: 'center',
        },
        tooltip: {
            trigger: 'item',
            // formatter: '{b}  {c}',
        },
        legend: {
            orient: 'vertical', // 图例列表的布局朝向。 horizontal vertical
            top: 'top',
            left: 'right', // 图例位置。top和left结合为右上
        },
        series: [
            {
                // name: 'Access From',
                type: 'pie',
                radius: ['40%', '70%'],
                data: languagesConfig.data,
                label: {
                    show: true,
                    position: 'outside', // 在内部显示，outseide 是在外部显示
                    formatter: '{b} {d}%', // formatter 是标签内容的格式器，用于转换格式。支持 字符串和回调函数两种形式。
                    // { a }：系列名
                    // { b }：数据名
                    // { c }：数据值
                    // { d }：百分比
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                    },
                },
            },
        ],
    });

    return { languagesOption, getLanguagesData, languagesShow };
};

const useRepoCommitsChart = () => {};

const { indicator, repos, reposProps } = useIndicator();
const { repoInfo, repoName, changeSelectValue, languagesOption, languagesShow } = useSelectRepo();

// ---------------------------- charts原始api，使用比较复杂，强烈推荐使用vue-echarts
const lineChartDom = ref();
const areaChartDom = ref();
import * as echarts from 'echarts';
// ref模板引用必须写在外层，且只能在onMounted里面，即挂载完毕后获取
// const lineChartDom = ref();
const useLineChart = () => {
    const myChart = echarts.init(lineChartDom.value);
    const option = {
        title: {
            left: 'center',
            text: 'DEMO Line Chart',
        },
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
            type: 'value',
        },
        grid: { left: 50, right: 30 },
        series: [
            {
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                smooth: true,
            },
        ],
    };

    myChart.setOption(option);
};

const useAreaChart = () => {
    const myChart = echarts.init(areaChartDom.value);

    let base = +new Date(1988, 9, 3);
    let oneDay = 24 * 3600 * 1000;
    let data = [[base, Math.random() * 300]];
    for (let i = 1; i < 20000; i++) {
        let now = new Date((base += oneDay));
        data.push([+now, Math.round((Math.random() - 0.5) * 20 + data[i - 1][1])]);
    }
    const option = {
        tooltip: {
            trigger: 'axis',
            position: function (pt) {
                return [pt[0], '10%'];
            },
        },
        title: {
            left: 'center',
            text: 'DEMO Large Ara Chart',
        },
        toolbox: {
            feature: {
                // dataZoom: {
                //     yAxisIndex: 'none',
                // },
                restore: {},
                saveAsImage: {},
            },
        },
        xAxis: {
            type: 'time',
            boundaryGap: false,
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '100%'],
        },
        dataZoom: [
            {
                type: 'inside',
                start: 0,
                end: 20,
            },
            {
                start: 0,
                end: 20,
            },
        ],
        grid: { left: 50, right: 30 },
        series: [
            {
                name: 'Fake Data',
                type: 'line',
                smooth: true,
                symbol: 'none',
                areaStyle: {},
                data: data,
            },
        ],
    };

    myChart.setOption(option);
};
onMounted(() => {
    useLineChart();
    useAreaChart();
});

const option = {
    title: {
        text: 'Referer of a Website',
        subtext: 'Fake Data',
        left: 'center',
    },
    tooltip: {
        trigger: 'item',
    },
    legend: {
        orient: 'vertical',
        left: 'left',
    },
    grid: { top:'30%', left: '15%' },
    series: [
        {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            data: [
                { value: 1048, name: 'Search Engine' },
                { value: 735, name: 'Direct' },
                { value: 580, name: 'Email' },
                { value: 484, name: 'Union Ads' },
                { value: 300, name: 'Video Ads' },
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
            },
        },
    ],
};
</script>

<template>
    <v-container>
        <v-row>
            <v-col col="3" v-for="(value, key) in indicator" :key="key">
                <!-- <v-card class="bg-purple-darken-2 text-center"> -->
                <v-card elevation="8" class="bg-purple-darken-1">
                    <v-card-item>
                        <v-card-title> {{ value }} </v-card-title>
                        <v-card-subtitle> {{ key.slice(0, 1).toUpperCase() + key.slice(1) }} </v-card-subtitle>
                    </v-card-item>
                </v-card>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12" sm="12" md="4" lg="4" xl="4" xxl="4">
                <v-card elevation="8" style="height: 100%">
                    <v-card-item>
                        <v-card-title> Repo Infomation </v-card-title>
                        <v-card-subtitle> 仓库信息 </v-card-subtitle>
                    </v-card-item>

                    <v-card-text>
                        <v-select
                            label="Select repo"
                            :items="repos"
                            :item-props="reposProps"
                            density="compact"
                            variant="outlined"
                            @update:modelValue="changeSelectValue"
                        ></v-select>
                        <p v-for="(v, k) in repoInfo" :key="k" class="text-body-2">
                            <span class="font-weight-bold">{{ k }}: </span> {{ v }}
                        </p>

                        <div v-show="repoName ? false : true">
                            <!-- <v-divider></v-divider> -->
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua.
                            <p class="text-subtitle-1">What's new</p>
                            <p>- newer upgrade</p>
                            <p>- newer upgrade</p>
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>

            <v-col cols="12" sm="12" md="8" lg="8" xl="8" xxl="8" v-if="languagesShow">
                <v-card elevation="8">
                    <!-- <v-card-item>
                        <v-card-title> Languages </v-card-title>
                    </v-card-item>
                    <v-divider></v-divider> -->
                    <v-card-text>
                        <v-chart class="chart" :option="languagesOption" autoresize />
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <v-row>
            <v-col col="12">
                <v-card elevation="8">
                    <!-- <v-card-item>
                        <v-card-title class="text-subtitle-1"> DEMO Area Chart </v-card-title>
                    </v-card-item>
                    <v-divider></v-divider> -->
                    <v-card-text>
                        <v-chart class="chart" :option="option" autoresize />
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <!-- echart的原始方式，比较麻烦，强烈推荐使用vue-echart -->
        <!-- 不需要考虑挂在ref等问题，只需要写个option即可，太强了 -->
        <v-row>
            <v-col col="12">
                <v-card elevation="8">
                    <!-- <v-card-item>
                        <v-card-title class="text-subtitle-1"> DEMO Area Chart </v-card-title>
                    </v-card-item>
                    <v-divider></v-divider> -->
                    <v-card-text><div ref="lineChartDom" class="chart"></div></v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <v-row>
            <v-col col="12">
                <v-card elevation="8">
                    <!-- <v-card-item>
                        <v-card-title class="text-subtitle-1"> DEMO Area Chart </v-card-title>
                    </v-card-item>
                    <v-divider></v-divider> -->
                    <v-card-text><div ref="areaChartDom" class="chart"></div></v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped lang="scss">
.chart {
    height: 320px;
}
</style>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import * as echarts from 'echarts';
import {
    reqGitHubUserFollowers,
    reqGitHubUserSubscriptions,
    reqGitHubUserRepos,
    reqGitHubUserRepoCommits,
} from '../../common/api.js';

import { useProfileStore } from '../../stores/profile.js';
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
        console.log(followersRes);
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

const { indicator, repos, reposProps } = useIndicator();

// ref模板引用必须写在外层，且只能在onMounted里面，即挂载完毕后获取
const lineChartDom = ref();
const useRepoCommitsChart = () => {
    const myChart = echarts.init(lineChartDom.value);
    const option = {
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                smooth: true,
            },
        ],
    };
    myChart.setOption(option);

    // (async () => {
    //     let followersRes = await reqGitHubUserRepoCommits(profileStore.userinfo.username);
    //     indicator.followers = followersRes.data.length;
    // })();
};

const areaChartDom = ref();
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
            text: 'Large Ara Chart',
        },
        toolbox: {
            feature: {
                dataZoom: {
                    yAxisIndex: 'none',
                },
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
    useRepoCommitsChart();
    useAreaChart();
});
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
                            variant="solo"
                        ></v-select>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.
                        <p class="text-subtitle-1">What's new</p>
                        <p>- newer upgrade</p>
                        <p>- newer upgrade</p>
                    </v-card-text>
                </v-card>
            </v-col>

            <v-col cols="12" sm="12" md="8" lg="8" xl="8" xxl="8">
                <v-card elevation="8">
                    <v-card-item>
                        <v-card-title> Line Chart </v-card-title>
                    </v-card-item>
                    <v-divider></v-divider>
                    <div ref="lineChartDom" class="chart"></div>
                </v-card>
            </v-col>
        </v-row>

        <v-row>
            <v-col col="12">
                <v-card elevation="8">
                    <v-card-item>
                        <v-card-title class="text-subtitle-1"> Area Chart </v-card-title>
                    </v-card-item>
                    <v-divider></v-divider>
                    <div ref="areaChartDom" class="chart"></div>
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

<template>
    <div class="container">
        <Category title="美食">
            <img slot="center" src="https://s3.ax1x.com/2021/01/16/srJ1q0.jpg" alt="">
            <a slot="footer" class="foot" href="https/www.baidu.com">更多美食</a>
        </Category>

        <Category title="游戏">
            <ul slot="center">
                <li v-for="(g, index) in games" :key="index">{{g}}</li>
            </ul>
            <div slot="footer" class="foot">
                <a href="http://www.baidu.com">单机游戏</a>
                <a href="http://www.baidu.com">网络游戏</a>
            </div>
        </Category>

        <Category title="电影">
            <video slot="center" controls src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"></video>
            <!-- template时可使用：v-slot:footer -->
            <template v-slot:footer>
                <div class="foot">
                    <a href="http://www.baidu.com">经典</a>
                    <a href="http://www.baidu.com">热门</a>
                    <a href="http://www.baidu.com">推荐</a>
                </div>
                <h3>欢迎前来观影</h3>
            </template>
        </Category>
    </div>
</template>

<script>
    import Category from './components/Category.vue'
    export default {
        name: 'App',
        components: {Category},
        data() {
            return {
                foods: ['火锅', '烧烤', '小龙虾', '牛排'],
                games: ['红色警戒', '穿越火线', '劲舞团', '超级玛丽'],
                films: ['《水浒传》', '《三国演义》', '《红楼梦》', '《西游戏》']
            }
        }
    }
</script>

<style>
    .container, .foot {
        display: flex;
        justify-content: space-around;
    }
</style>
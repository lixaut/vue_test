<template>
    <div class="container">
        <!-- 写法 1 -->
        <Category title="游戏">
            <template scope="gameList">
                <ul>
                    <li v-for="(g, index) in gameList.games" :key="index">{{g}}</li>
                </ul>
            </template>
        </Category>
        <!-- 写法 2 -->
        <Category title="游戏">
            <template scope="{games}">
                <ol>
                    <li v-for="(g, index) in games" :key="index">{{g}}</li>
                </ol>
            </template>
        </Category>
        <!-- 写法 3 -->
        <Category title="游戏">
            <template slot-scope="{games}">
                <h4 v-for="(g, index) in games" :key="index">{{g}}</h4>
            </template>
        </Category>
    </div>
</template>

<script>
    import Category from './components/Category.vue'
    export default {
        name: 'App',
        components: {Category}
    }
</script>

<style>
    .container, .foot {
        display: flex;
        justify-content: space-around;
    }
</style>
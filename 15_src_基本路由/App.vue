<template>
    <div class="container">
        <Banner/>
        <hr>
        <div class="homePage">
            <div class="btn">
                <router-link class="about" active-class="active" to="/about">About</router-link>
                <router-link class="home" active-class="active" to="/home">Home</router-link>
            </div>
            <div class="display">
                <!-- 指定组件的呈现位置 -->
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    import Banner from './components/Banner'
    export default {
        name: 'App',
        components: { Banner }
    }
</script>

<style>
    * {
        padding: 0;
        margin: 0;
    }

    .container {
        width: 500px;
        margin: 50px auto;
    }

    .homePage {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
    }

    .btn {
        width: 100px;
        height: 100px;
        display: flex;
        flex-direction: column;
    }

    .about, .home {
        width: 100px;
        height: 50px;
        text-decoration: none;
        line-height: 50px;
        text-align: center;
        background-color: #fff;
        color: #333;
    }

    .about.active, .home.active {
        background-color: skyblue;
        border-radius: 10px;
    }

    .display {
        width: 380px;
        height: 100px;
        border: 1px dashed #aaa;
        border-radius: 10px;
        line-height: 100px;
        text-align: center;
    }

</style>
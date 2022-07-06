<template>
    <div>
        <h2>当前和为：{{sum}}</h2>
        <h3>当前求和放大10倍为：{{bigSum}}</h3>
        <h3 style="color:red">person组件的总人数为：{{personList.length}}</h3>
        <select v-model.number="n">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
        </select>
        <button @click="increment(n)">+</button>
        <button @click="decrement(n)">-</button>
        <button @click="incrementOdd(n)">当前和为奇数再加</button>
        <button @click="incrementWait(n)">等一秒再加</button>
    </div>
</template>

<script>
    import { mapGetters, mapMutations, mapState, mapActions } from 'vuex'
    export default {
        name: 'Count',
        data() {
            return {
                n: 1  // 用户选择的数据
            }
        },
        computed: {
            // 借助mapState生成计算属性，从state中读取数据
            ...mapState('countAbout', ['sum']),
            ...mapState('personAbout', ['personList']),
            // 借助mapGetters生成计算属性，从getters中读取数据
            ...mapGetters('countAbout', ['bigSum'])
        },
        methods: {
            // 借助mapMutations生成对应的方法，方法中会调用commit去联系mutations（对象写法）
            ...mapMutations('countAbout', {increment: 'JIA', decrement: 'JIAN'}),
            // 借助mapActions生成对应的方法，方法中会调用dispatch去联系actions（对象写法）
            ...mapActions('countAbout', {incrementOdd: 'jiaOdd', incrementWait: 'jiaWait'})
        }
    }
</script>

<style lang="css">
    button {
        margin-left: 10px;
    }
</style>
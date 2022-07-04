<template>
    <div>
        <h2>当前和为：{{$store.state.sum}}</h2>
        <select v-model.number="n">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
        </select>
        <button @click="increment">+</button>
        <button @click="decrement">-</button>
        <button @click="incrementOdd">当前和为奇数再加</button>
        <button @click="incrementWait">等一秒再加</button>
    </div>
</template>

<script>
    export default {
        name: 'Count',
        data() {
            return {
                n: 1  // 用户选择的数据
            }
        },
        methods: {
            increment() {
                // this.$store.dispatch('jia', this.n)
                this.$store.commit('JIA', this.n)
            },
            decrement() {
                // this.$store.dispatch('jian', this.n)
                this.$store.commit('JIAN', this.n)
            },
            incrementOdd() {
                this.$store.dispatch('jiaOdd', this.n)
            },
            incrementWait() {
                this.$store.dispatch('jiaWait', this.n)
            }
        }
    }
</script>

<style lang="css">
    button {
        margin-left: 10px;
    }
</style>
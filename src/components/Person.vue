<template>
    <div>
        <h1>人员列表</h1>
        <h3 style="color:red">count组件的求和为：{{sum}}</h3>
        <input type="text" placeholder="请输入名字" v-model="name">
        <button @click="add">添加</button>
        <ul>
            <li v-for="p in personList" :key="p.id">{{p.name}}</li>
        </ul>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import { nanoid } from 'nanoid'
    export default {
        name: 'Person',
        data() {
            return {
                name: ''
            }
        },
        computed: {
            ...mapState(['personList', 'sum'])
        },
        methods: {
            add() {
                const personObj = {id: nanoid(), name: this.name}
                this.$store.commit('ADD_PERSON', personObj)
                this.name = ''
            }
        }
    }
</script>

<style>

</style>
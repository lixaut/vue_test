<template>
  <div class="root">
    <h1>{{msg}}</h1>

    <!-- 给Student的实例对象VC绑定了一个 xaut 事件 -->
    <!-- 通过父组件给子组件绑定一个自定义事件实现：子给父传递数据 -->
    <Student v-on:xaut="getStudentName"/>

    <!-- 通过父组件给子组件传递函数类型的props实现：子给父传递数据 -->
    <School :getSchoolName="getSchoolName"/>


  </div>
</template>

<script>
  import Student from './components/Student.vue'
  import School from './components/School.vue'

  export default {
    name: 'App',
    components: {Student, School},
    data() {
      return {
        msg: 'hello world'
      }
    },
    methods: {
      getSchoolName(name) {
        console.log('App收到了学校名字', name)
      },
      getStudentName(name, ...params) {
        console.log('App收到了学生姓名', name, params)
      }
    }
  }
</script>

<style>
  .root {
    background-color: #ddd;
  }
</style>
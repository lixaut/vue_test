<template>
  <div class="root">
    <School/>
    <Student/>
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
    }
  }
</script>

<style>
  .root {
    background-color: #ddd;
  }
</style>
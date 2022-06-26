<template>
  <div>
    <Student name="李四" sex="男"/>
    <hr>
    <Student name="张三" :age="19" sex="女"/>
  </div>
</template>

<script>
  import Student from './components/Student.vue'

  export default {
    name: 'App',
    components: {Student}
  }
</script>
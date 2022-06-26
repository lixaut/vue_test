<template>
  <div>
    <h1>{{msg}}</h1>
    <h2>学生姓名：{{name}}</h2>
    <h2>学生年龄：{{myAge + 1}}</h2>
    <h2>学生性别：{{sex}}</h2>
    <button @click="updataAge">点我修改年龄</button>
  </div>
</template>

<script>
  export default {
    name: 'Student',
    data() {
      return {
        msg: '我是一个学生',
        myAge: this.age
      }
    },
    methods: {
      updataAge() {
        this.myAge++
      }
    },
    // 第一种 简单接受
    // props: ['name', 'age', 'sex']

    // 第二种 接受的同时对数据进行类型限制
    /*
    props: {
      name: String,
      age: Number,
      sex: String
    }
    */

   //第三种 接受的同时对数据进行 类型限制 + 默认值的指定 + 必要性的限制
   props: {
    name: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      default: 99
    },
    sex: {
      type: String,
      required: true
    }
   }
  }
</script>
<template>
  <div class="category">
    <h3>{{title}}分类</h3>
    <!-- 定义一个插槽 -->
    <slot name="center">我是一些默认值，当使用者没有传递具体结构1时，我会出现</slot>
    <slot name="footer">我是一些默认值，当使用者没有传递具体结构2时，我会出现</slot>
  </div>
</template>

<script>
  export default {
    name: 'Category',
    props: ['title']
  }
</script>

<style>
  .category {
    background-color: skyblue;
    width: 200px;
    height: 300px;
  }

  h3 {
    text-align: center;
    background-color: orange;
  }

  img {
    width: 100%;
  }

  video {
    width: 100%;
  }

</style>
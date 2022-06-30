<template>
    <div>
        <button @click="isShow = !isShow">显示/隐藏</button>
        <transition name="hello" :appear="true">
            <h1 v-show="isShow">hello world</h1>
        </transition>
    </div>
</template>

<script>
    export default {
        name: 'Test',
        data() {
            return {
                isShow: true
            }
        }
    }
</script>

<style>
    h1 {
        background-color: orange;
    }

    .hello-enter-active {
        animation: xaut 0.5s ease;
    }

    .hello-leave-active {
        animation: xaut 0.5s ease reverse;
    }

    @keyframes xaut {
        from {
            transform: translateX(-100%);
        }
        to {
            transform: translateX(0px);
        }
    }
</style>
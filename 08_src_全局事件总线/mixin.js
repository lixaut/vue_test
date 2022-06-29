export const a = {
    methods: {
        showName() {
          alert(this.name)
        }
    },
    mounted() {
        console.log('hello world')
    }
}

export const b = {
    data() {
        return {
            x: 100,
            y: 200
        }
    }
}
<template>
  <div>
    <p>Game Over</p>
    <p><a href="#" v-on:click="reset">重新开始</a></p>
  </div>
</template>

<script>
  export default {
    name: 'over',
    methods: {
      reset () {
        this.$router.push({name: 'game'})
      },
    },
  }
</script>

<style scoped>
  div > p {
    font-size: 30px;
  }
</style>

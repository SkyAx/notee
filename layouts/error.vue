<template lang="pug">
  section.container
    h1.title {{ error.statusCode }}
    h2.info {{ error.message }}
    nuxt-link.button(to="/" v-if="error.statusCode === 404") Homepage
</template>
<script>
  export default {
    props: ['error']
  };
</script>

<style scoped>

</style>

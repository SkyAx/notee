<template lang="pug">
  .page
    Header
    Nuxt
    Footer
</template>

<script>
  import Header from '@/components/Header/Header';
  import Footer from '@/components/Footer/Footer';

  export default {
    components: {
      Header,
      Footer
    }
  };
</script>

<style>
</style>

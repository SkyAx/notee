<template lang="pug">
  header.header
    .container
      nuxt-link(:to="'/'")
        img.logo(:src="'/logo.png'" :alt="'Logo'")
      NIcon.logout(:icon="'logout-square'" @click="logout")
</template>

<script>
  import NIcon from '@/components/shared/NIcon/NIcon';

  export default {
    name: 'Header',
    components: {
      NIcon
    },
    methods: {
      logout() {
        console.log('logout');
      }
    }
  };
</script>

<style lang="sass" scoped>
  .header
    padding: $default-padding * 2 0
    margin-bottom: $default-padding * 5
    box-shadow: $default-box-shadow

    .container
      display: flex
      justify-content: space-between
      align-items: center

    .logo
      width: 60px
</style>

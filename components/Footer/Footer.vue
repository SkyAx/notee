<template lang="pug">
  .footer
    .container
      nuxt-link(:to="'/about'") About Project
      nuxt-link(:to="'/author'") Author
</template>

<script>
  export default {
    name: 'Footer'
  };
</script>

<style lang="sass" scoped>
  .footer
    padding: $default-padding * 3 0
    box-shadow: $default-box-shadow
    background: $main-color
    color: $total-white
    text-align: center
    position: fixed
    bottom: 0
    left: 0
    right: 0
    z-index: 10

    a
      display: inline-block
      text-decoration: none
      color: $total-white

      &:not(:last-child)
        margin-right: $default-padding * 3
</style>

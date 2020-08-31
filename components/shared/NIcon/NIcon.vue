<template lang="pug">
  i(
    :class="[`n-icon-${icon}`, { bordered: bordered }, color]"
    @click="$emit('click')"
  )
</template>

<script>
  import { colorizedElements } from '@/mixins';

  export default {
    name: 'NIcon',
    mixins: [colorizedElements],
    props: {
      icon: {
        type: String,
        default: '',
        required: false
      },
      bordered: {
        type: Boolean,
        required: false,
        default: false
      }
    }
  };
</script>

<style lang="sass">
  [class^="n-icon-"]
    display: inline-flex
    width: $default-icon-width
    height: $default-icon-height
    font-size: $default-icon-height
    align-items: center
    justify-content: center

    &.red
      color: $total-red

    &.yellow
      color: $yellow

    &.grapefruit
      color: $grapefruit

    &.skyblue
      color: $skyblue

    &.green
      color: $grass

    &.violet
      color: $violet

    &.black
      color: $light-black

    &.disabled
      color: $light-grey

    &:disabled, &.disabled
      &::before
        color: $disabled-color

    &.bordered
      width: $default-padding * 3
      height: $default-padding * 3
      border: 1px solid $light-black
      border-radius: 2px

      &::before
        margin: auto
</style>

<template lang="pug">
  component.n-button(
    :is="navigate ? 'nuxt-link' : 'button'"
    :class="[{ disabled: disabled }, color]"
    @click="$emit('click')"
  ) {{ text }}
</template>

<script>
  import { colorizedElements } from '@/mixins';

  export default {
    name: 'NButton',
    mixins: [colorizedElements],
    props: {
      text: {
        type: String,
        required: false,
        default: ''
      },
      navigate: {
        type: String,
        required: false,
        default: ''
      },
      disabled: {
        type: Boolean,
        required: false,
        default: false
      }
    }
  };
</script>

<style lang="sass">
  .n, a.n
    &-button
      width: 100%
      min-width: 120px
      padding: $default-padding
      border-radius: $default-border-radius
      color: $total-black
      font-family: $rubik
      font-size: $default-font-size
      font-weight: $bold-font-weight
      font-style: $default-font-style
      line-height: $default-line-height
      text-decoration: none
      text-align: center
      border: none
      box-shadow: $default-box-shadow
      cursor: pointer
      min-height: 32px

      &:focus, &:active, &:hover, &:link, &:visited
        outline: none

      &.yellow, &.grapefruit, &.skyblue, &.green, &.violet, &.black
        &:hover
          &:active, &.active
            box-shadow: $default-box-shadow-active

      &:active, &.active
        box-shadow: $default-box-shadow-active

      &.disabled, &:disabled, &.disabled:hover, &:disabled:hover
        background: none
        background-color: $disabled-bg
        color: $disabled-color
        box-shadow: none
        border: 1px solid $middle-grey
        min-height: 32px

      &.yellow
        color: $total-white
        background-color: $yellow

        &:hover
          box-shadow: $yellow-box-shadow-hover
          background: linear-gradient($default-gradient-angle, $yellow-start-gradient -20.69%, $yellow-finish-gradient 120.69%)

      &.grapefruit
        color: $total-white
        background-color: $grapefruit

        &:hover
          box-shadow: $grapefruit-box-shadow-hover
          background: linear-gradient($default-gradient-angle, $grapefruit-start-gradient -20.69%, $grapefruit-finish-gradient 120.69%)

      &.skyblue
        color: $total-white
        background-color: $skyblue

        &:hover
          box-shadow: $skyblue-box-shadow-hover
          background: linear-gradient($default-gradient-angle, $skyblue-start-gradient -20.69%, $skyblue-finish-gradient 120.69%)

      &.green
        color: $total-white
        background-color: $grass

        &:hover
          box-shadow: $grass-box-shadow-hover
          background: linear-gradient($default-gradient-angle, $grass-start-gradient -20.69%, $grass-finish-gradient 120.69%)

      &.violet
        color: $total-white
        background-color: $violet

        &:hover
          box-shadow: $violet-box-shadow-hover
          background: linear-gradient($default-gradient-angle, $violet-start-gradient -20.69%, $violet-finish-gradient 120.69%)

      &.black
        color: $total-white
        background-color: $light-black

        &:hover
          box-shadow: $black-box-shadow-hover
          background: linear-gradient($default-gradient-angle, $black-start-gradient -20.69%, $black-finish-gradient 120.69%)

      &.red
        color: $total-white
        background-color: $total-red
</style>

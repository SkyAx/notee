<template lang="pug">
  .n-checkbox(:class="[{ checked: value, disabled: disabled }, color]")
    span.n-checkbox-custom(@click="toggleCheckbox()")
    input(type="checkbox" v-model="checked" :value="checked" :checked="checked" :disabled="disabled")
</template>

<script>
  import { colorizedElements } from '@/mixins';

  export default {
    name: 'NCheckbox',
    mixins: [colorizedElements],
    props: {
      disabled: {
        type: Boolean,
        required: false,
        default: false
      },
      value: {
        type: Boolean,
        required: true
      }
    },
    data() {
      return {
        checked: this.value
      };
    },
    methods: {
      toggleCheckbox() {
        if (!this.disabled) {
          this.checked = !this.checked;
          this.$emit('input', this.checked);
        }
      }
    }
  };
</script>

<style lang="sass">
  .n-checkbox
    width: $default-padding * 2
    height: $default-padding * 2
    position: relative

    input[type=checkbox]
      position: absolute
      top: -$default-padding
      opacity: 0
      cursor: pointer
      margin: 0

    &-custom
      border: 1px solid $middle-grey
      width: $default-padding * 2
      height: $default-padding * 2
      box-shadow: $default-checkbox-box-shadow
      position: absolute
      top: 0
      right: 0
      bottom: 0
      left: 0
      z-index: 2
      cursor: pointer
      background-color: $transparent
      border-radius: 3px

    &.checked, &:hover
      .n-checkbox-custom
        box-shadow: $checkbox-focus-box-shadow
        background: $yellow url('/icons/checkbox-selected-bg.svg') no-repeat center center / 8px
        border: 1px solid $yellow

    &.checked
      .n-checkbox-custom
        &:hover
          background: $yellow url('/icons/checkbox-remove-select-bg.svg') no-repeat center center / 8px

    &.skyblue
      &.checked, &:hover
        .n-checkbox-custom
          background-color: $skyblue
          border-color: $skyblue

      &.checked
        .n-checkbox-custom
          &:hover
            background-color: $skyblue

    &.green
      &.checked, &:hover
        .n-checkbox-custom
          background-color: $almost-green
          border-color: $almost-green

      &.checked
        .n-checkbox-custom
          &:hover
            background-color: $almost-green

    &.grapefruit
      &.checked, &:hover
        .n-checkbox-custom
          background-color: $grapefruit
          border-color: $grapefruit

      &.checked
        .n-checkbox-custom
          &:hover
            background-color: $grapefruit

    &.violet
      &.checked, &:hover
        .n-checkbox-custom
          background-color: $violet
          border-color: $violet

      &.checked
        .n-checkbox-custom
          &:hover
            background-color: $violet

    &.black
      &.checked, &:hover
        .n-checkbox-custom
          background-color:  $light-black
          border-color:  $light-black

      &.checked
        .n-checkbox-custom
          &:hover
            background-color:  $light-black

    &[class^="disabled"], &.disabled, &:disabled
      .n-checkbox-custom
        border: 1px solid $light-grey
        box-shadow: none

        &:hover
          box-shadow: none
          border: 1px solid $light-grey
          background: none

      &.checked
        .n-checkbox-custom
          background: url('/icons/checkbox-disabled-selected-bg.svg') no-repeat center center / 8px
</style>

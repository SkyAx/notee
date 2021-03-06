<template lang="pug">
  .n-input-container(ref="container")
    .n-input-label(v-if="label") {{ label }}
    component.n-input(
      :is="textarea ? 'textarea' :  'input'"
      @input="input"
      @focusin="focusIn"
      @focusout="focusOut"
      :class="[className, {textarea : textarea}]"
      :type="type"
      :value="value"
      :placeholder="placeholder"
      :label="label"
    ) {{ value }}
    .n-input-hint(v-if="hint" :class="className") {{ hint }}
</template>

<script>
  export default {
    name: 'NInput',
    props: {
      value: {
        type: String,
        required: true
      },
      type: {
        type: String,
        required: false,
        default: 'text'
      },
      placeholder: {
        type: String,
        required: false,
        default: ''
      },
      label: {
        type: String,
        required: false,
        default: ''
      },
      textarea: {
        type: Boolean,
        required: false,
        default: false
      },
      className: {
        type: String,
        required: false,
        default: ''
      },
      hint: {
        type: String,
        required: false,
        default: ''
      }
    },
    methods: {
      focusIn() {
        this.$refs.container.classList.add('focused');
      },
      focusOut() {
        this.$refs.container.classList.remove('focused');
      },
      input(event) {
        this.$emit('input', event.target.value);
      }
    }
  };
</script>

<style lang="sass">
  .n-input
    width: 100%
    border: none
    line-height: $default-line-height
    border-radius: $default-border-radius
    padding: $default-padding
    background: $transparent
    font-family: $rubik

    ::-webkit-input-placeholder
      color: $dark-grey

    ::-ms-input-placeholder
      color: $dark-grey

    ::placeholder
      color: $dark-grey

    &:focus, &:active, &:hover, &:link, &:visited
      outline: none

    &:focus
      color: $dark-grey

    &.textarea
      height: 240px

    &-container
      color: $middle-black
      font-size: $default-font-size
      font-weight: $default-font-weight
      background: $total-white
      box-shadow: $default-box-shadow
      border: 1px solid $transparent
      border-radius: $default-border-radius
      position: relative

      &.focused, &:focus
        color: $dark-grey
        border-color: $yellow
        box-shadow: $input-focus-box-shadow

      &.error
        color: $total-red
        border-color: $total-red
        box-shadow: $input-error-box-shadow

    &-label
      position: absolute
      top: -$default-padding * 3
      color: $dark-grey

    &-hint
      position: absolute
      bottom: -$default-padding * 3

      &.error
        color: $total-red
        border-color: $total-red
        box-shadow: $input-error-box-shadow
</style>

<template lang="pug">
  .n-modal-overlay(@click="$emit('onClose')")
    .n-modal
      h3.n-modal-heading {{ heading }}
      p.n-modal-text(v-if="text") {{ text }}
      .controls
        NButton(@click="$emit('onCancel')" :text="'Cancel'" red)
        NButton(@click="$emit('onConfirm')" :text="'Confirm'" green)
</template>

<script>
  import NButton from '@/components/shared/NButton/NButton';

  export default {
    name: 'NModal',
    components: {
      NButton
    },
    props: {
      heading: {
        type: String,
        required: true
      },
      text: {
        type: String,
        required: false,
        default: ''
      }
    }
  };
</script>

<style lang="sass" scoped>
  .n-modal
    width: 280px
    position: absolute
    display: flex
    flex-direction: column
    padding: $default-padding * 2
    border-radius: $default-border-radius
    background: $total-white

    &-heading
      margin-bottom: $default-padding * 3

    &-text
      color: $dark-grey

    &-overlay
      display: flex
      justify-content: center
      align-items: center
      position: fixed
      z-index: 100
      top: 0
      right: 0
      bottom: 0
      left: 0
      background: $total-black-blur-6

  .controls
    margin-top: $default-padding * 2
    display: flex
    justify-content: space-between

    .n-button
      width: auto
</style>

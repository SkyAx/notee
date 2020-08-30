<template lang="pug">
  input(
    @input="onInput"
    :value="value"
    :placeholder="placeholder"
    :label="label"
  )
</template>

<script>
  export default {
    name: 'NInput',
    props: {
      value: {
        type: String,
        required: true
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
      }
    },
    methods: {
      onInput(event) {
        this.$emit('input', event.target.value);
      }
    }
  };
</script>

<style scoped>

</style>

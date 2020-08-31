<template lang="pug">
  .create-note.container
    h1 {{ pageHeading }}
    .row
      h3 {{ headingContentHeading }}
      NInput(v-model="heading")
    .row
      h3 {{ textContentHeading }}
      NInput(v-model="text" textarea)
    .row
      h3 {{ todoContentHeading }}
      TodoList(v-if="isHasTodo")
      NButton(@click="isHasTodo = true" :text="'Add list'" green)
</template>

<script>
  import NInput from '@/components/shared/NInput/NInput';
  import TodoList from '@/components/TodoList/TodoList';
  import NButton from '@/components/shared/NButton/NButton';

  export default {
    name: 'Create',
    components: {
      NButton,
      NInput,
      TodoList
    },
    data() {
      return {
        pageHeading: 'Create Note',
        headingContentHeading: 'Add heading',
        textContentHeading: 'Add description',
        todoContentHeading: 'Add Todo',
        heading: '',
        text: '',
        isHasTodo: false,
        todo: null
      };
    }
  };
</script>

<style lang="sass" scoped>
  .create-note
    h1
      margin-bottom: $default-padding * 5

    .n-input-container
      width: 320px

    .row
      margin-bottom: $default-padding * 4

      h3
        margin-bottom: $default-padding

      .n-button
        width: 240px
</style>

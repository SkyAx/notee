<template lang="pug">
  .todo-list(:class="{scrollable: scrollable}")
    TodoItem(
      v-for="(todo, idx) in list"
      :key="idx"
      :todo="todo"
      :hiddenCheckbox="hiddenCheckbox"
      :hiddenControls="hiddenControls"
      @onTodoChange="$emit('onTodoChange', todo)"
      @onTodoChecked="$emit('onTodoChecked', todo)"
    )
</template>

<script>
  import TodoItem from '@/components/TodoItem/TodoItem';

  export default {
    name: 'TodoList',
    components: { TodoItem },
    props: {
      list: {
        type: Array,
        required: true
      },
      hiddenCheckbox: {
        type: Boolean,
        required: false,
        default: false
      },
      hiddenControls: {
        type: Boolean,
        required: false,
        default: false
      },
      scrollable: {
        type: Boolean,
        required: false,
        default: false
      }
    }
  };
</script>

<style lang="sass" scoped>
  .todo-list
    padding: $default-padding
    overflow-y: scroll

    &.scrollable
      height: 200px

    .todo-item
      &:not(:last-child)
        margin-bottom: $default-padding * 2
</style>

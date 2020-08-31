<template lang="pug">
  .todo-list
    TodoItem(v-for="todo in list" :todo="todo"  @onTodoChange="onTodoChange")
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
      }
    }
  };
</script>

<style lang="sass" scoped>
  .todo-list
    padding: $default-padding

    .todo-item
      &:not(:last-child)
        margin-bottom: $default-padding * 2
</style>

<template lang="pug">
  .container
    TodoItem(:todo="todo" @onTodoChange="onTodoChange")
</template>

<script>
  import TodoItem from '../components/TodoItem/TodoItem';

  export default {
    name: 'Index',
    components: {
      TodoItem
    },
    data() {
      return {
        todo: 'text'
      };
    },
    methods: {
      onTodoChange(todo) {
        this.todo = todo;
      }
    }
  };
</script>

<style>

</style>

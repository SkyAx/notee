<template lang="pug">
  .container(v-if="note")
    h1.note-heading {{ note.noteHeading }}
    p.note-text {{ note.noteText }}
    TodoList(
      v-if="note.todoList.length"
      :list="note.todoList"
      @onTodoChecked="onTodoChecked"
    )
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import TodoList from '@/components/TodoList/TodoList';

  export default {
    name: 'NotePage',
    components: { TodoList },
    computed: {
      ...mapGetters('notes', ['NOTES']),
      note() {
        return this.NOTES.find(note => note.id === parseInt(this.$route.params.id));
      }
    },
    methods: {
      ...mapActions('notes', ['changeTodoStatus']),
      onTodoChecked(todo) {
        this.changeTodoStatus({
          editTodo: todo,
          editNote: this.note
        });
      }
    }
  };
</script>

<style lang="sass" scoped>
  .note-text
    margin-bottom: $default-padding * 4
</style>

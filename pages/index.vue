<template lang="pug">
  .container
    .note-list
      Note(v-for="note in NOTES" :note="note")
      NoteCreate
</template>

<script>
  import NoteCreate from '@/components/NoteCreate/NoteCreate';
  import TodoList from '@/components/TodoList/TodoList';
  import Note from '@/components/Note/Note';
  import { mapGetters } from 'vuex';

  export default {
    name: 'Index',
    components: {
      NoteCreate,
      Note,
      TodoList
    },
    computed: {
      ...mapGetters('notes', ['NOTES'])
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

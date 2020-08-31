<template lang="pug">
  .note
    h2.note-heading
      nuxt-link(:to="`/note/${note.id}`")
        span.note-heading-text {{ note.noteHeading }}
        NIcon(:icon="'right-arrow-circle'")
    p.note-text {{ note.noteText | ellipsisFilter }}
    TodoList(
      v-if="note.todoList.length"
      :list="note.todoList"
      :hiddenCheckbox="true"
      :hiddenControls="true"
      @onTodoChecked="onTodoChecked"
    )
</template>

<script>
  import TodoList from '@/components/TodoList/TodoList';
  import NIcon from '@/components/shared/NIcon/NIcon';
  import { ellipsisFilter } from '@/filters';
  import { mapActions } from 'vuex';

  export default {
    name: 'Note',
    components: {
      NIcon,
      TodoList
    },
    filters: {
      ellipsisFilter
    },
    props: {
      note: {
        type: Object,
        required: true
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

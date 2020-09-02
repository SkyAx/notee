<template lang="pug">
  .note
    h2.note-heading
      nuxt-link(:to="`/note/${note.id}`")
        span.note-heading-text {{ note.noteHeading }}
        NIcon(:icon="'right-arrow-circle'")
      NIcon(@click="$emit('onDelete', note)" :icon="'cross-square'" red)
    p.note-text {{ note.noteText | ellipsisFilter }}
    TodoList(
      v-if="note.todoList.length"
      :list="note.todoList"
      scrollable
      hiddenCheckbox
      hiddenControls
      hiddenTodoAdd
      @onTodoChange="onTodoChange"
    )
</template>

<script>
  import TodoList from '@/components/TodoList/TodoList';
  import NIcon from '@/components/shared/NIcon/NIcon';
  import { mapActions } from 'vuex';
  import { ellipsisFilter } from '@/filters';

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
      ...mapActions('notes', ['changeTodo']),
      onTodoChange(text, id) {
        this.changeTodo({
          editTodoId: id,
          editTodoText: text,
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

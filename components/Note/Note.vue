<template lang="pug">
  nuxt-link.note(:to="`/note/${note.id}`")
    h2.note-heading {{ note.noteHeading }}
    p.note-text {{ note.noteText | ellipsisFilter }}
    TodoList(v-if="note.todoList" :list="note.todoList")
</template>

<script>
  import TodoList from '@/components/TodoList/TodoList';
  import { ellipsisFilter } from '@/filters';

  export default {
    name: 'Note',
    components: {
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
    }
  };
</script>

<style lang="sass" scoped>
</style>

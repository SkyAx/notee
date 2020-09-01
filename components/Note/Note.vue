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
      :scrollable="true"
      :hiddenCheckbox="true"
      :hiddenControls="true"
    )
</template>

<script>
  import TodoList from '@/components/TodoList/TodoList';
  import NIcon from '@/components/shared/NIcon/NIcon';
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
    }
  };
</script>

<style lang="sass" scoped>
  .note-text
    margin-bottom: $default-padding * 4
</style>

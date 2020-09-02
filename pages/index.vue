<template lang="pug">
  .container
    .note-list
      Note(
        v-for="(note, idx) in NOTES"
        :key="idx"
        :note="note"
        @onDelete="onDelete"
      )
      NoteCreate
    NModal(
      v-if="isModalShow"
      :heading="'Confirm delete'"
      :text="`Are you sure to delete ${noteToDelete.noteHeading} note?`"
      @onClose="isModalShow = false"
      @onConfirm="deleteNote"
      @onCancel="cancelDelete"
    )
</template>

<script>
  import NoteCreate from '@/components/NoteCreate/NoteCreate';
  import TodoList from '@/components/TodoList/TodoList';
  import Note from '@/components/Note/Note';
  import NModal from '@/components/shared/NModal/NModal';
  import { mapGetters } from 'vuex';
  import { deleteNote } from '@/mixins';

  export default {
    name: 'Index',
    components: {
      NModal,
      NoteCreate,
      Note,
      TodoList
    },
    mixins: [deleteNote],
    computed: {
      ...mapGetters('notes', ['NOTES'])
    }
  };
</script>

<style>

</style>

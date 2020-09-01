<template lang="pug">
  .container
    .note-list
      Note(
        v-for="note in NOTES"
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
  import { mapActions, mapGetters } from 'vuex';
  import NModal from '@/components/shared/NModal/NModal';

  export default {
    name: 'Index',
    components: {
      NModal,
      NoteCreate,
      Note,
      TodoList
    },
    data() {
      return {
        isModalShow: false,
        noteToDelete: null
      };
    },
    computed: {
      ...mapGetters('notes', ['NOTES'])
    },
    methods: {
      ...mapActions('notes', ['deleteExistNote']),
      onDelete(note) {
        this.isModalShow = true;
        this.noteToDelete = note;
      },
      cancelDelete() {
        this.isModalShow = false;
        this.noteToDelete = null;
      },
      deleteNote() {
        if (this.noteToDelete) {
          this.deleteExistNote(this.noteToDelete);
          this.cancelDelete();
        }
      }
    }
  };
</script>

<style>

</style>

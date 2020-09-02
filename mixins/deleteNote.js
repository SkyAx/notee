import { mapActions } from 'vuex';

export const deleteNote = {
  data() {
    return {
      isModalShow: false,
      noteToDelete: null
    };
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

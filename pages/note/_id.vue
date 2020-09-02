<template lang="pug">
  .container(v-if="note")
    .heading
      h1.note-heading(v-if="!editable") {{ heading }}
      NInput(v-if="editable" v-model="heading")
      .controls
        NButton(v-if="!editable" :text="'Delete'" @click="onDelete(note)" red)
        NButton(v-if="editable" :text="'Cancel'" @click="onCancel" yellow)
        NButton(v-if="!editable" :text="'Edit'" @click="onEdit" skyblue)
        NButton(v-if="editable" :text="'Done'" @click="updateNote" green)
    p.note-text(v-if="!editable") {{ text }}
    NInput(v-if="editable" v-model="text" textarea)
    TodoList(
      :list="todoList"
      @onAddNewTodo="onAddNewTodo"
      @onTodoChecked="onTodoChecked"
      @onTodoChange="onTodoChange"
      @onDeleteTodo="onDeleteTodo"
    )
    NModal(
      v-if="isModalShow"
      :heading="editable ? 'Cancel edit?' : 'Confirm delete'"
      :text="editable ? '' : `Are you sure to delete ${noteToDelete.noteHeading} note?`"
      @onClose="isModalShow = false"
      @onConfirm="editable ? cancelEdit() : deleteNote()"
      @onCancel="editable ? skip() : cancelDelete()"
    )
</template>

<script>
  import NIcon from '@/components/shared/NIcon/NIcon';
  import TodoList from '@/components/TodoList/TodoList';
  import NButton from '@/components/shared/NButton/NButton';
  import NInput from '@/components/shared/NInput/NInput';
  import { mapActions, mapGetters } from 'vuex';
  import { deleteNote } from '@/mixins';

  export default {
    name: 'NotePage',
    components: { NInput, NButton, NIcon, TodoList },
    mixins: [deleteNote],
    data() {
      return {
        editable: false,
        noteBeforeEdit: null
      };
    },
    computed: {
      ...mapGetters('notes', ['NOTES']),
      note: {
        set(note) {
          this.updateExistNote(note);
        },
        get() {
          return this.NOTES.find(note => note.id === parseInt(this.$route.params.id)) || null;
        }
      },
      heading: {
        set(heading) {
          this.editExistNote({
            id: this.note.id,
            heading: heading
          });
        },
        get() {
          return this.note.noteHeading;
        }
      },
      text: {
        set(text) {
          this.editExistNote({
            id: this.note.id,
            text: text
          });
        },
        get() {
          return this.note.noteText;
        }
      },
      todoList: {
        set(todoList) {
          this.editExistNote({
            id: this.note.id,
            todoList: todoList
          });
        },
        get() {
          return this.note.todoList;
        }
      }
    },
    methods: {
      ...mapActions('notes', ['changeTodoStatus', 'changeTodo', 'deleteTodo', 'addTodo', 'editExistNote', 'updateExistNote']),
      onTodoChecked(todo) {
        this.changeTodoStatus({
          editTodo: todo,
          editNote: this.note
        });
      },
      onTodoChange(text, id) {
        this.changeTodo({
          editTodoId: id,
          editTodoText: text,
          editNote: this.note
        });
      },
      onDeleteTodo(todo) {
        this.deleteTodo({
          editNote: this.note,
          deleteTodo: todo
        });
      },
      onAddNewTodo(text) {
        this.addTodo({
          editNote: this.note,
          todoText: text
        });
      },
      deleteNote() {
        if (this.noteToDelete) {
          this.deleteExistNote(this.noteToDelete);
          this.cancelDelete();
          this.$router.push('/');
        }
      },
      onEdit() {
        this.editable = true;
        this.noteBeforeEdit = this.note;
      },
      onCancel() {
        this.isModalShow = true;
      },
      cancelEdit() {
        this.isModalShow = false;
        this.editable = false;
        this.note = this.noteBeforeEdit;
      },
      updateNote() {
        this.editable = false;
        this.updateExistNote(this.note);
      },
      skip() {
        this.isModalShow = false;
      }
    }
  };
</script>

<style lang="sass" scoped>
  .heading
    display: flex
    align-items: center
    justify-content: space-between
    margin-bottom: $default-padding * 4

    .note-heading
      margin-bottom: 0

  .controls
    display: flex

    .n-button
      width: auto

      &:not(:last-child)
        margin-right: $default-padding * 2

  .note-text
    margin-bottom: $default-padding * 4
</style>

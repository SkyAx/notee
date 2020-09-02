<template lang="pug">
  .create-note.container
    .page-heading
      h1 {{ pageHeading }}
      .controls
        NButton(:text="'Create'" @click="onAddNote" green)
    .row
      NInput(
        v-model="$v.heading.$model"
        :label="headingContentLabel"
        :placeholder="'Type name of to do'"
        :class="$v.heading.$error ? 'error' : ''"
        :hint="$v.heading.$error ? 'This field is required' : ''"
      )
    .row
      NInput(v-model="text" :label="textContentLabel" :placeholder="'Type description of to do'" textarea)
    .row
      TodoList(
        v-if="isHasTodo"
        :list="todoList"
        @onAddNewTodo="onAddNewTodo"
        hiddenCheckbox
        hiddenControls
      )
      NButton(@click="onAddTodoClick" :text="isHasTodo ? 'Delete list' : 'Add list'" :skyblue="!isHasTodo" :red="isHasTodo")
</template>

<script>
  import NInput from '@/components/shared/NInput/NInput';
  import TodoList from '@/components/TodoList/TodoList';
  import NButton from '@/components/shared/NButton/NButton';
  import { required } from 'vuelidate/lib/validators';
  import { mapActions } from 'vuex';

  export default {
    name: 'Create',
    components: {
      NButton,
      NInput,
      TodoList
    },
    data() {
      return {
        pageHeading: 'Create Note',
        headingContentLabel: 'Add heading',
        textContentLabel: 'Add description',
        todoContentHeading: 'Add Todo',
        heading: '',
        text: '',
        isHasTodo: false,
        todoList: []
      };
    },
    computed: {
      nextTodoId() {
        return this.todoList.length ? this.todoList.length + 1 : 1;
      }
    },
    validations: {
      heading: {
        required
      }
    },
    methods: {
      ...mapActions('notes', ['addNewNote']),
      onAddTodoClick() {
        if (this.isHasTodo) {
          this.isHasTodo = false;
          this.todoList = null;
        } else {
          this.isHasTodo = true;
          this.todoList = [];
        }
      },
      onAddNewTodo(text) {
        this.todoList.push({
          id: this.nextTodoId,
          text: text,
          done: false
        });
      },
      onAddNote() {
        this.addNewNote({
          noteHeading: this.heading,
          noteText: this.text,
          todoList: this.todoList ? this.todoList : []
        });
        this.$router.push('/');
      }
    }
  };
</script>

<style lang="sass" scoped>
  .create-note
    h1
      margin-bottom: $default-padding * 5

    .n-input-container
      width: 320px

    .row
      margin-bottom: $default-padding * 8

      h3
        margin-bottom: $default-padding

      .n-button
        width: 240px

    .todo-list
      margin-bottom: $default-padding * 4
</style>

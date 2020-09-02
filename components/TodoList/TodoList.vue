<template lang="pug">
  .todo-list(:class="{scrollable: scrollable}")
    TodoItem(
      v-for="(todo, idx) in list"
      :key="idx"
      :todo="todo"
      :hiddenCheckbox="hiddenCheckbox"
      :hiddenControls="hiddenControls"
      @onTodoChange="onTodoChange"
      @onDeleteTodo="$emit('onDeleteTodo', todo)"
      @onTodoChecked="$emit('onTodoChecked', todo)"
    )
    .add-new-todo(v-if="!hiddenTodoAdd")
      .add-new-todo-content
        NIcon(v-if="!isEditable" @click="isEditable = true" :icon="'add-circular'" green)
        NIcon(v-if="isEditable" @click="isEditable = false" :icon="'cross-rounded'" red)
        p.add-new-todo-text(v-if="!isEditable" @click="isEditable = true") Add new Todo
      form.todo-item-form(v-if="isEditable" @submit.prevent="onAddTodo")
        NInput(
          v-model="$v.newTodo.$model"
          @input="$v.newTodo.$touch()"
          ref="input"
          :placeholder="'Type todo'"
          :class="$v.newTodo.$error ? 'error' : ''"
          :hint="$v.newTodo.$error ? 'This field is required' : ''"
        )
</template>

<script>
  import TodoItem from '@/components/TodoItem/TodoItem';
  import NIcon from '@/components/shared/NIcon/NIcon';
  import NInput from '@/components/shared/NInput/NInput';
  import { required } from 'vuelidate/lib/validators';

  export default {
    name: 'TodoList',
    components: { NIcon, TodoItem, NInput },
    props: {
      list: {
        type: Array,
        required: true
      },
      hiddenCheckbox: {
        type: Boolean,
        required: false,
        default: false
      },
      hiddenControls: {
        type: Boolean,
        required: false,
        default: false
      },
      hiddenTodoAdd: {
        type: Boolean,
        required: false,
        default: false
      },
      scrollable: {
        type: Boolean,
        required: false,
        default: false
      }
    },
    data() {
      return {
        isEditable: false,
        newTodo: ''
      };
    },
    validations: {
      newTodo: {
        required
      }
    },
    methods: {
      onTodoChange(text, id) {
        this.$emit('onTodoChange', text, id);
      },
      onAddTodo() {
        this.$emit('onAddNewTodo', this.newTodo);
        this.isEditable = false;
      }
    }
  };
</script>

<style lang="sass">
  .todo-list
    padding: $default-padding

    &.scrollable
      overflow-y: scroll
      height: 200px

    .todo-item
      &:not(:last-child)
        margin-bottom: $default-padding * 2

  .add-new-todo
    display: flex
    align-items: center

    &-content
      cursor: pointer
      display: flex
      margin-right: $default-padding * 2
      align-items: center

    [class^="n-icon-"]
      margin-right: $default-padding
</style>

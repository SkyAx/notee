<template lang="pug">
  .todo-item(@dblclick="onDblclick")
    form.todo-item-form(v-if="isEditable" @submit.prevent="onTodoSubmit")
      NInput(v-model="newTodo" ref="input")
    .todo-item-content(v-if="!isEditable")
      NCheckbox(v-if="!hiddenCheckbox" @input="$emit('onTodoChecked')" :value="todo.done")
      p {{ todo.text }}
    .todo-item-controls(v-if="!hiddenControls")
      NIcon(@click="toggleEditable" :icon="'pencil'" yellow)
      NIcon(@click="$emit('onDeleteTodo', todo)" :icon="'cross-rounded'" red)
      NIcon(:icon="'checkmark'" green)
</template>

<script>
  import NInput from '@/components/shared/NInput/NInput';
  import NIcon from '@/components/shared/NIcon/NIcon';
  import NCheckbox from '@/components/shared/NCheckbox/NCheckbox';

  export default {
    name: 'TodoItem',
    components: {
      NInput,
      NIcon,
      NCheckbox
    },
    props: {
      todo: {
        type: Object,
        required: true
      },
      hiddenControls: {
        type: Boolean,
        required: false,
        default: false
      },
      hiddenCheckbox: {
        type: Boolean,
        required: false,
        default: false
      }
    },
    data() {
      return {
        isEditable: false,
        newTodo: this.todo.text
      };
    },
    methods: {
      onTodoSubmit() {
        this.newTodo = this.$refs.input.value;

        this.isEditable = false;

        this.$emit('onTodoChange', this.newTodo);
      },
      onTodoChecked() {

      },
      toggleEditable() {
        if (this.isEditable) {
          this.newTodo = this.$refs.input.value;

          this.$emit('onTodoChange', this.newTodo);

          this.isEditable = false;
        } else {
          this.isEditable = true;
        }
      },
      onDblclick() {
        this.isEditable = true;
      }
    }
  };
</script>

<style lang="sass">
  .todo-item
    display: flex
    align-items: center
    justify-content: space-between

    &-content
      display: flex
      width: 100%
      padding: $default-padding 0
      margin-right: $default-padding
      border-bottom: 1px solid $middle-grey

      .n-checkbox
        margin-right: $default-padding

    &-form
      width: 100%

    &-controls
      display: flex
      margin-left: $default-padding * 2

      [class^="n-icon-"]:not(:last-child)
        margin-right: $default-padding
</style>

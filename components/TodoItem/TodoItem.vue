<template lang="pug">
  .todo-item(@dblclick="onDblclick")
    form.todo-item-form(v-if="isEditable" @submit.prevent="onTodoSubmit")
      NInput(v-model="newTodo" ref="input")
    .todo-item-text(v-if="!isEditable") {{ todo }}
    .todo-item-controls
      NIcon(@click="toggleEditable" :icon="'pencil'" yellow)
      NIcon(@click="$emit('onDeleteTodo', todo)" :icon="'cross-rounded'" red)
      NIcon(:icon="'checkmark'" green)
</template>

<script>
  import NInput from '@/components/shared/NInput/NInput';
  import NIcon from '@/components/shared/NIcon/NIcon';

  export default {
    name: 'TodoItem',
    components: {
      NInput,
      NIcon
    },
    props: {
      todo: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        isEditable: false,
        newTodo: this.todo
      };
    },
    methods: {
      onTodoSubmit() {
        this.newTodo = this.$refs.input.value;

        this.isEditable = false;

        this.$emit('onTodoChange', this.newTodo);
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

    &-text
      width: 100%
      padding: $default-padding 0
      margin-right: $default-padding

    &-form
      width: 100%

    &-controls
      display: flex
      margin-left: $default-padding * 2

      [class^="n-icon-"]:not(:last-child)
        margin-right: $default-padding
</style>

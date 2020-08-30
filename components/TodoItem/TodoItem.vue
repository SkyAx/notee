<template lang="pug">
  .todo-item(@dblclick="onDbclick")
    form.todo-item-form(@submit.prevent="isEditable = false")
      NInput(v-if="isEditable" :value="newTodo")
    .todo-item-text(v-if="!isEditable") {{ todo }}
</template>

<script>
  import NInput from '@/components/shared/NInput/NInput';

  export default {
    name: 'TodoItem',
    components: {
      NInput
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
      onDbclick() {
        console.log('dbclick');

        this.isEditable = true;
      }
    }
  };
</script>

<style scoped>

</style>

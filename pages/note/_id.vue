<template lang="pug">
  .container(v-if="note")
    h1 {{ note.noteHeading }}
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'NotePage',
    computed: {
      ...mapGetters('notes', ['NOTES']),
      note() {
        return this.NOTES.find(note => note.id === parseInt(this.$route.params.id));
      }
    }
  };
</script>

<style scoped>

</style>

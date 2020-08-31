<template lang="pug">
  nuxt-link.note(:to="`/note/create`")
    h2.note-heading {{ heading }}
    NIcon(:icon="'add-circular'")
</template>

<script>
  import NIcon from '@/components/shared/NIcon/NIcon';

  export default {
    name: 'NoteCreate',
    components: {
      NIcon
    },
    data() {
      return {
        heading: 'Create Note'
      };
    }
  };
</script>

<style lang="sass" scoped>
  .note
    text-align: center

    [class^="n-icon-"]
      padding: $default-padding * 8
</style>

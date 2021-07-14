<template>
    <terminal />
</template>

<script>
import { defineComponent } from 'vue';
import Terminal from '@/terminal.vue';

export default defineComponent({
  name: 'ServeDev',
  components: {
    Terminal
  }
});
</script>
<template>
  <AppLayouts>
    <router-view />
  </AppLayouts>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppLayouts from '@/layouts/Index.vue'

export default defineComponent({
  name: 'App',
  components: {
    AppLayouts
  }
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
body {
  min-width: 100vw;
  min-height: 100vh;
  background-color: #fff;
}
#app {
  padding: 20px;
  color: #000;
}
</style>

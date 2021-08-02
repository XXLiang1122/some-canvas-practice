<template>
  <Header class="header" />
  <div class="container">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from '@/construct/Header.vue'

export default defineComponent({
  name: 'CustomLayout',
  components: {
    Header
  }
})
</script>

<style lang="less" scoped>
.header {
  :deep(a) {
    color: #fff;
  }
  :deep(li:not(:last-of-type)::after) {
    content: '|';
    color: #fff;
  }
}
.container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
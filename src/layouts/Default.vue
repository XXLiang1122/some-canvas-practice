<template>
  <Header />
  <div class="container">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, markRaw } from 'vue'
import Header from '@/construct/Header.vue'

export default defineComponent({
  name: 'DefaultLayout',
  components: {
    Header
  }
})
</script>

<style lang="less" scoped>
.container {
  display: flex;
  justify-content: center;
  width: 70%;
  min-width: 1000px;
  margin: 30px auto;
  padding: 30px;
  // background-color: @blue;
}
</style>
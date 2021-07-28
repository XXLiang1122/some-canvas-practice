<template>
  <p>hello world</p>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
export default defineComponent({
  name: 'Demo1',
  setup: () => {
    const count = ref(0)
    return { count }
  }
})
</script>

<style lang="less" scoped>
p {
  color: red;
}
</style>

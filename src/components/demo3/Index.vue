<template>
  <div class="content">
    <canvas ref="canvas" class="canvas" width="400" height="400" />
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted } from 'vue'

export default defineComponent({
  name: 'Demo3',
  setup: () => {
    const canvas = ref<HTMLCanvasElement | null>(null)
    let ctx: CanvasRenderingContext2D

    onMounted (() => {
      init()
    })

    const init = () => {
      ctx = canvas.value?.getContext('2d') as CanvasRenderingContext2D
    }

    return {
      canvas
    }
  }
})
</script>

<style lang="less">

</style>

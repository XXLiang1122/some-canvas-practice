<template>
  <div class="content">
    <canvas ref="canvas" class="canvas" width="800" height="250" />
    <div class="text">谢谢惠顾！</div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted, onUnmounted } from 'vue'

export default defineComponent({
  name: 'Demo1',
  setup: () => {
    const canvas = ref<HTMLCanvasElement | null>(null)
    let ctx: CanvasRenderingContext2D
    let isDraw = false

    onMounted (() => {
      init()
      onDraw()
    })

    const init = () => {
      ctx = canvas.value?.getContext('2d') as CanvasRenderingContext2D
      ctx.fillStyle = '#999'
      ctx.fillRect(0, 0, 800, 250)
      ctx.fillStyle = '#fff'
      ctx.font = '30px serif'
      ctx.textBaseline = 'top'
      ctx.fillText('刮刮乐', 350, 110)
    }

    const onDraw = () => {
      (canvas.value as HTMLCanvasElement).onmousedown = e => {
        isDraw = true
        const position = canvas.value?.getBoundingClientRect() as DOMRect
        const x = e.pageX - position.left
        const y = e.pageY - position.top
        ctx.beginPath()
        ctx.moveTo(x, y)
      }
      document.onmouseup = () => {
        isDraw = false
        ctx.closePath()
      }
      (canvas.value as HTMLCanvasElement).onmousemove = e => {
        if (isDraw) {
          const position = canvas.value?.getBoundingClientRect() as DOMRect
          const x = e.pageX - position.left
          const y = e.pageY - position.top
          ctx.globalCompositeOperation = 'destination-out'
          ctx.lineWidth = 30
          ctx.strokeStyle = '#000000'
          ctx.lineTo(x, y)
          ctx.stroke()
        }
      }
    }

    return {
      canvas
    }
  }
})
</script>

<style lang="less">
.content {
  position: relative;
}
.canvas {
  position: relative;
  z-index: 2;
}
.text {
  position: absolute;
  top: 0;
  left: 0;
  width: 800px;
  height: 250px;
  font-size: 48px;
  text-align: center;
  line-height: 250px;
  background-color: #fff;
  z-index: 1;
  pointer-events: none;
}
</style>

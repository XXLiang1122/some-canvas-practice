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
      drawClock()
    })

    const init = () => {
      ctx = canvas.value?.getContext('2d') as CanvasRenderingContext2D
      ctx.translate(200, 200)
    }

    const drawClock = () => {
      ctx.clearRect(-200, -200, 400, 400)
      /** 圆盘 */
      ctx.lineWidth = 4
      ctx.strokeStyle = '#000000'
      ctx.fillStyle = '#000000'
      ctx.beginPath()
      ctx.arc(0, 0, 180, 0, Math.PI * 2)
      ctx.stroke()

      /** 时针刻度 */
      ctx.save()
      ctx.lineWidth = 3
      for (let i = 0; i < 12; i++) {
        ctx.beginPath()
        ctx.moveTo(180, 0)
        ctx.lineTo(160, 0)
        ctx.stroke()
        ctx.rotate(Math.PI * 2 / 12)
      }
      ctx.restore()

      /** 分针刻度 */
      ctx.save()
      ctx.lineWidth = 1
      for (let i = 0; i < 60; i++) {
        ctx.beginPath()
        ctx.moveTo(180, 0)
        ctx.lineTo(170, 0)
        ctx.stroke()
        ctx.rotate(Math.PI * 2 / 60)
      }
      ctx.restore()

      const now = new Date()
      const h = now.getHours()
      const m = now.getMinutes()
      const s = now.getSeconds()

      /** 时针 */
      ctx.save()
      ctx.lineWidth = 8
      ctx.rotate(Math.PI * 2 / 12 * (Math.abs(h - 12)))
      ctx.beginPath()
      ctx.moveTo(0, 30)
      ctx.lineTo(0, -100)
      ctx.stroke()
      ctx.restore()

      /** 分针 */
      ctx.save()
      ctx.lineWidth = 4
      ctx.rotate(Math.PI * 2 / 60 * m)
      ctx.beginPath()
      ctx.moveTo(0, 30)
      ctx.lineTo(0, -140)
      ctx.stroke()
      ctx.restore()

      /** 秒针 */
      ctx.save()
      ctx.lineWidth = 2
      ctx.strokeStyle = '#ff0000'
      ctx.rotate(Math.PI * 2 / 60 * s)
      ctx.beginPath()
      ctx.moveTo(0, 30)
      ctx.lineTo(0, -140)
      ctx.stroke()
      ctx.restore()

      /** 中心点 */
      ctx.beginPath()
      ctx.arc(0, 0, 10, 0, Math.PI * 2)
      ctx.fill()

      window.requestAnimationFrame(drawClock)
    }

    return {
      canvas
    }
  }
})
</script>

<style lang="less">

</style>

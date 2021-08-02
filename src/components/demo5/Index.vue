<template>
  <div class="content">
    <canvas ref="canvas" class="canvas" />
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted } from 'vue'

interface Point {
  x: number;
  y: number;
  xSpeed: number;
  ySpeed: number;
}

export default defineComponent({
  name: 'Demo5',
  setup: () => {
    const canvas = ref<HTMLCanvasElement | null>(null)
    let ctx: CanvasRenderingContext2D
    let width = 0
    let height = 0
    let points: Point[] = []
    let pageX = 0
    let pageY = 0
    const color = '#fff'

    onMounted (() => {
      init()
      createPoints()
      drawPoints()
      onMouseEvent()
    })

    const init = () => {
      width = document.body.clientWidth
      height = document.body.clientHeight;
      (canvas.value as HTMLCanvasElement).width = width;
      (canvas.value as HTMLCanvasElement).height = height
      ctx = canvas.value?.getContext('2d') as CanvasRenderingContext2D
    }

    /** 生成粒子 */
    const createPoints = () => {
      for (let i = 0; i < 100; i++) {
        points.push({
          x: Math.random() * width,
          y: Math.random() * height,
          xSpeed: (Math.random() - Math.random()) * 3,
          ySpeed: (Math.random() - Math.random()) * 3
        })
      }
    }

    /** 渲染粒子 */
    const drawPoints = () => {
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = '#000'
      ctx.fillRect(0, 0, width, height)
      ctx.fillStyle = color
      points.forEach(p => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2)
        ctx.fill()
      })
      linePoints()
      points = points.map(p => {
        p.x += p.xSpeed
        p.y += p.ySpeed
        if (p.x < 0 || p.x > width) {
          p.xSpeed *= -1
        }
        if (p.y < 0 || p.y > height) {
          p.ySpeed *= -1
        }
        return p
      })
      window.requestAnimationFrame(drawPoints)
    }

    /** 连线 */
    const linePoints = () => {
      ctx.strokeStyle = color
      ctx.lineWidth = 1
      const len = points.length
      points.forEach((p, index) => {
        // 两两对比
        for (let i = index + 1; i < len; i++) {
          const distance = Math.sqrt(Math.pow(Math.abs(p.x - points[i].x), 2) + Math.pow(Math.abs(p.y - points[i].y), 2))
          if (distance < 80) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(points[i].x, points[i].y)
            ctx.stroke()
            ctx.closePath()
          }
        }
        // 鼠标位置对比
        const distance = Math.sqrt(Math.pow(Math.abs(p.x - pageX), 2) + Math.pow(Math.abs(p.y - pageY), 2))
        if (distance < 80) {
          ctx.beginPath()
          ctx.moveTo(pageX, pageY)
          ctx.lineTo(p.x, p.y)
          ctx.stroke()
          ctx.closePath()
        }
      })
    }

    const onMouseEvent = () => {
      // 鼠标移动事件
      document.onmousemove = (e: MouseEvent) => {
        pageX = e.pageX
        pageY = e.pageY
      }
      // 鼠标点击增加5个点
      document.onclick = (e: MouseEvent) => {
        for (let i = 0; i < 5; i++) {
          points.push({
            x: e.pageX,
            y: e.pageY,
            xSpeed: (Math.random() - Math.random()) * 3,
            ySpeed: (Math.random() - Math.random()) * 3
          })
        }
      }
    }

    return {
      canvas
    }
  }
})
</script>

<style lang="less" scoped>
</style>

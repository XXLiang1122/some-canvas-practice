<template>
  <div class="content">
    <div><el-button type="primary" @click="reset">重玩</el-button></div>
    <canvas ref="canvas" class="canvas" width="660" height="660" @click="play" />
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted } from 'vue'
import { checkState } from './const'

export default defineComponent({
  name: 'Demo4',
  setup: () => {
    const canvas = ref<HTMLCanvasElement | null>(null)
    let ctx: CanvasRenderingContext2D
    let state: number[][] = []
    let isBlack = true

    onMounted (() => {
      init()
    })

    /** 初始化棋盘 */
    const init = () => {
      ctx = canvas.value?.getContext('2d') as CanvasRenderingContext2D
      ctx.strokeStyle = '#666'
      ctx.lineWidth = 2
      ctx.fillStyle = '#ffdbb8'
      ctx.fillRect(0, 0, 660, 660)
      for (let i = 1; i <= 21; i++) {
        ctx.beginPath()
        ctx.moveTo(30 * i, 30)
        ctx.lineTo(30 * i, 630)
        ctx.stroke()
      }
      for (let i = 1; i <= 21; i++) {
        ctx.beginPath()
        ctx.moveTo(30, 30 * i)
        ctx.lineTo(630, 30 * i)
        ctx.stroke()
      }
      state = initArr()
    }

    /** 下棋 */
    const play = (e: MouseEvent) => {
      const position = canvas.value?.getBoundingClientRect() as DOMRect
      const x = e.pageX - position.left
      const y = e.pageY - position.top
      if (x > 15 && x < 645 && y > 15 && y < 645) {
        const indexX = Math.round(x / 30)
        const indexY = Math.round(y / 30)
        if (state[indexX - 1][indexY - 1] === 0) { // 该位置没有棋子才可以下
          state[indexX - 1][indexY - 1] = isBlack ? 1 : 2
          drawChess(indexX * 30, indexY * 30)
          check(indexX - 1, indexY - 1)
        }
      }
    }

    /** 判断胜负 */
    const check = (x: number, y: number) => {
      const status = checkState(x, y, state)
      if (status === 1) {
        alert('黑棋胜利！')
      }
      if (status === 2) {
        alert('白棋胜利！')
      }
    }

    /** 画出棋子 */
    const drawChess = (x: number, y: number) => {
      ctx.fillStyle = isBlack ? '#000' : '#fff'
      ctx.beginPath()
      ctx.arc(x, y, 15, 0, Math.PI * 2)
      ctx.fill()
      isBlack = !isBlack
    }

    /** 重玩 */
    const reset = () => {
      ctx.clearRect(0, 0, 660, 660)
      init()
    }

    /** 初始化二维数组 */
    function initArr (): number[][] {
      const arr = new Array(21)
      for (let i = 0; i < 21; i++) {
        arr[i] = new Array(21).fill(0)
      }
      return arr
    }

    return {
      canvas,
      play,
      reset
    }
  }
})
</script>

<style lang="less" scoped>
.canvas {
  margin-top: 20px;
}
</style>

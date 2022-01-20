<template>
  <div class="content">
    <canvas ref="canvas" class="canvas" width="800" height="500" />
    <img ref="carRef" src="@/assets/car.png" alt="">
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted, watch } from 'vue'

enum DIRECTION {
  L = 'left',
  R = 'right',
  F = 'forward',
  B = 'backward'
}

interface Piece {
  x: number;
  y: number;
  w: number;
  h: number;
  clr: string;
}

class Grass {
  x: number = 0
  y: number = 0
  w: number = 800
  h: number = 0
  clr: string = ''
  constructor (y: number, h: number, color: string) {
    this.y = y
    this.h = h
    this.clr = color
  }
}

export default defineComponent({
  name: 'Demo7',
  setup: () => {
    const canvas = ref<HTMLCanvasElement | null>(null)
    let canvas2: HTMLCanvasElement
    let ctx: CanvasRenderingContext2D
    let ctx2: CanvasRenderingContext2D
    let sceneX = 0
    let angleX = 0
    let cornerLen = 0
    let turn: 'left' | 'right' | null = null
    let finishCorner = true
    const carRef = ref()
    const color = {
      light: '#8FC04C',
      dark: '#73B043',
      sky: '#D4F5FE',
      mountain: '#83CACE',
      road: '#606a7c',
      line: '#fff'
    }
    let grassPieces: Piece[] = [new Grass(196, 4, color.light)]
    let isDeepColor = false
    let aniTag: number | null
    let speed = 1
    let status: 'speedUp' | 'slowDown' = 'slowDown'

    onMounted (() => {
      init()
      onKeyboardEvent()
      play()
    })

    const init = () => {
      ctx = canvas.value?.getContext('2d') as CanvasRenderingContext2D
      canvas2 = document.createElement('canvas')
      canvas2.width = 800
      canvas2.height = 500
      ctx2 = canvas2.getContext('2d') as CanvasRenderingContext2D
    }

    const play = () => {
      if (status === 'speedUp') {
        speed = speed >= 1 ? 1 : speed + 0.01
      } else if (status === 'slowDown') {
        speed = speed >= 0 ? speed - 0.01 : 0
        if (speed <= 0) {
          window.cancelAnimationFrame(aniTag as number)
          aniTag = null
          if (sceneX < -500) {
            sceneX = -495
          }
          if (sceneX > 460) {
            sceneX = 455
          }
          return
        }
      }
      if (sceneX < -500) {
        status = 'slowDown'
        sceneX = -500
      }
      if (sceneX > 460) {
        status = 'slowDown'
        sceneX = 460
      }

      ctx.clearRect(0, 0, 800, 500)
      drawGrassland()
      drawRoad()
      drawSky()
      drawMountains()
      drawCar()
      createCorner()
      aniTag = window.requestAnimationFrame(play)
    }

    /** 天空 */
    const drawSky = () => {
      ctx.beginPath()
      ctx.fillStyle = color.sky
      ctx.fillRect(0, 0, 800, 200)
      ctx.fill()
    }

    /** ⛰ */
    const drawMountains = () => {
      const x = sceneX / 6
      ctx.fillStyle = color.mountain
      ctx.beginPath()
      ctx.moveTo(-30 + x, 200)
      ctx.lineTo(20 + x, 160)
      ctx.lineTo(70 + x, 200)
      ctx.fill()
      ctx.beginPath()
      ctx.moveTo(120 + x, 200)
      ctx.lineTo(170 + x, 150)
      ctx.lineTo(240 + x, 200)
      ctx.fill()
      ctx.beginPath()
      ctx.moveTo(200 + x, 200)
      ctx.lineTo(300 + x, 100)
      ctx.lineTo(400 + x, 200)
      ctx.fill()
      ctx.beginPath()
      ctx.moveTo(540 + x, 200)
      ctx.lineTo(590 + x, 160)
      ctx.lineTo(640 + x, 200)
      ctx.fill()
      ctx.beginPath()
      ctx.moveTo(600 + x, 200)
      ctx.lineTo(680 + x, 120)
      ctx.lineTo(760 + x, 200)
      ctx.fill()
      ctx.beginPath()
      ctx.moveTo(740 + x, 200)
      ctx.lineTo(860 + x, 80)
      ctx.lineTo(980 + x, 200)
      ctx.fill()
    }

    /** 草地 */
    const drawGrassland = () => {
      grassPieces.forEach((g, index) => {
        ctx.beginPath()
        ctx.fillStyle = g.clr
        ctx.fillRect(g.x, g.y, g.w, g.h)

        ctx2.beginPath()
        ctx2.fillStyle = g.clr === color.light ? color.road : color.line
        ctx2.fillRect(g.x, g.y, g.w, g.h)

        g.y += speed + index * 0.5
        g.h += 0.5
      })
      if (grassPieces[0].y >= 200) {
        grassPieces.unshift(new Grass(196, 4, isDeepColor ? color.light : color.dark))
        isDeepColor = !isDeepColor
      }
      if (grassPieces[grassPieces.length - 1].y > 600) {
        grassPieces.pop()
      }
    }

    /** 公路 */
    const drawRoad = () => {
      const x = sceneX
      const minix = x / 2
      const midx = x / 1.7
      const offsetY = 3
      ctx.fillStyle = color.road

      /** 黑色路面 */
      ctx.beginPath()
      ctx.moveTo(50 + minix, 500)
      ctx.quadraticCurveTo(350 - 300 / offsetY + midx, 200 + 300 / offsetY, 350 + x, 200)
      ctx.lineTo(450 + x, 200)
      ctx.quadraticCurveTo(450 + 300 / offsetY + midx, 200 + 300 / offsetY, 750 + minix, 500)
      ctx.fill()
      ctx.fillStyle = color.line
      /** 线条 */
      /** 左边 */
      ctx.beginPath()
      ctx.moveTo(50 + minix, 500)
      ctx.quadraticCurveTo(350 - 300 / offsetY + midx, 200 + 300 / offsetY, 350 + x, 200)
      ctx.lineTo(353 + x, 200)
      ctx.quadraticCurveTo(353 - 285 / offsetY + midx, 200 + 300 / offsetY, 68 + minix, 500)
      ctx.fill()
      /** 右边 */
      ctx.beginPath()
      ctx.moveTo(450 + x, 200)
      ctx.quadraticCurveTo(450 + 300 / offsetY + midx, 200 + 300 / offsetY, 750 + minix, 500)
      ctx.lineTo(768 + minix, 500)
      ctx.quadraticCurveTo(453 + 315 / offsetY + midx, 200 + 300 / offsetY, 453 + x, 200)
      ctx.fill()
      ctx.save()
      ctx.beginPath()
      /** 中线 */
      ctx.fillStyle = ctx.createPattern(canvas2, 'repeat') as CanvasPattern
      ctx.moveTo(400 + minix, 500)
      ctx.quadraticCurveTo(400 + midx, 200 + 300 / offsetY, 400 + x, 200)
      ctx.lineTo(404 + x, 200)
      ctx.quadraticCurveTo(404 + 20 / offsetY + midx, 200 + 300 / offsetY, 424 + minix, 500)
      ctx.fill()
      ctx.restore()
    }

    /** 🚗 */
    const drawCar = () => {
      ctx.beginPath()
      ctx.save()
      if (turn === 'left') {
        ctx.setTransform(1, 0, 0.05, 1, 385, 370);
        ctx.translate(-390, -370)
      }
      if (turn === 'right') {
        ctx.setTransform(1, 0, -0.05, 1, 415, 370);
        ctx.translate(-410, -370)
      }
      ctx.drawImage(carRef.value, 330, 300, 140, 140)
      ctx.restore()
    }

    /** 绑定方向键 */
    const onKeyboardEvent = () => {
      document.onkeydown = (e: KeyboardEvent) => {
        switch (e.code) {
          case 'ArrowLeft': {
            turn = 'left'
            break
          }
          case 'ArrowRight': {
            turn = 'right'
            break
          }
          case 'ArrowUp': {
            status = 'speedUp'
            aniTag === null && play()
            break
          }
          case 'ArrowDown': {
            break
          }
        }
      }
      document.onkeyup = (e: KeyboardEvent) => {
        switch (e.code) {
          case 'ArrowLeft': {
            turn = null
            break
          }
          case 'ArrowRight': {
            turn = null
            break
          }
          case 'ArrowUp': {
            status = 'slowDown'
            aniTag = null
            break
          }
          case 'ArrowDown': {

            break
          }
        }
      }
    }

    /** 生成弯道 */
    const createCorner = () => {
      if (finishCorner) {
        angleX = Math.random() > 0.5 ? -2 : 2
        angleX = Math.random() > 0.5 ? angleX : 0

        finishCorner = false
        cornerLen = (Math.random() + 1) * 400 // 400 ~ 800
      } else {
        if (cornerLen >= 1) {
          sceneX += angleX
          if (status !== 'slowDown') cornerLen--
        } else {
          if (sceneX >= 2) {
            sceneX -= 2
          } else if (sceneX <= -2) {
            sceneX += 2
          } else {
            finishCorner = true
          }
        }

        if (turn === 'left') {
          sceneX += 4
        }
        if (turn === 'right') {
          sceneX -= 4
        }
      }
    }

    return {
      canvas,
      carRef
    }
  }
})
</script>

<style lang="less" scoped>
.canvas {
  margin-top: 20px;
}
img {
  display: none;
}
</style>

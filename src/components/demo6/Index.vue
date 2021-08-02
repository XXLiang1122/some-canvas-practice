<template>
  <div class="content">
    <div><el-button type="primary" @click="reset" style="float: right">重玩</el-button><span>得分：{{ score }}</span></div>
    <canvas ref="canvas" class="canvas" width="800" height="600" />
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted, onUnmounted } from 'vue'

interface Segment {
  x: number;
  y: number;
  direction: DIRECTION;
}

interface Record extends Segment {}
interface Food extends Omit<Segment, 'direction'> {}

enum DIRECTION {
  L = 'left',
  R = 'right',
  T = 'top',
  B = 'bottom'
}

class CreateSegment {
  x: number
  y: number
  direction: DIRECTION
  constructor (x: number, y: number, direction: DIRECTION) {
    this.x = x
    this.y = y
    this.direction = direction
  }
}

// function debounce (fn: Function, delay: number = 200, immediate: boolean = false) {
//   let timer: any = null
//   return function (...args: any) {
//     if (timer) {
//       clearTimeout(timer)
//       timer = null
//     }
//     timer = setTimeout(() => {
//       fn.call(null, ...args)
//     }, delay)
//   }
// }

export default defineComponent({
  name: 'Demo6',
  setup: () => {
    const canvas = ref<HTMLCanvasElement | null>(null)
    const score = ref<number>(0)
    let ctx: CanvasRenderingContext2D
    let snake: Segment[] = []
    const speed = 10
    const directionRecord: Record[] = []
    let timer: NodeJS.Timer
    let prePosition: Record
    let food: Food | null

    onMounted (() => {
      init()
      reset()
      onKeyboardEvent()
    })

    onUnmounted (() => {
      clearInterval(timer)
    })

    const init = () => {
      ctx = canvas.value?.getContext('2d') as CanvasRenderingContext2D
    }

    /** 重置 */
    const reset = () => {
      initSnake()
      food = null
      score.value = 0
      prePosition = new CreateSegment(0, 0, DIRECTION.R)
      directionRecord.length = 0
      clearInterval(timer)
      timer = setInterval(() => {
        move()
      }, 50)
    }

    /** 🐍移动 */
    const move = () => {
      ctx.clearRect(0, 0, 800, 600)
      ctx.fillStyle = '#000'
      ctx.fillRect(0, 0, 800, 600)
      ctx.fillStyle = '#fff'
      snake.forEach((s, index) => {
        changeDirection(s, index === snake.length - 1)
        next(s)
        ctx.beginPath()
        ctx.fillRect(s.x, s.y, 10, 10)
        ctx.fill()
      })
      edgeCheck(snake[0])
      dropFood()
      eatFood()
    }

    /** 改变方向 */
    const changeDirection = (s: Segment, isLast: boolean) => {
      if (directionRecord.length) {
        directionRecord.forEach(r => {
          if (s.x === r.x && s.y === r.y) {
            s.direction = r.direction
            isLast && directionRecord.splice(0, 1) // 尾部已经过则把该记录点删掉
          }
        })
      }
    }

    /** 计算下一步 */
    const next = (s: Segment) => {
      switch (s.direction) {
        case DIRECTION.L: {
          s.x -= speed
          break
        }
        case DIRECTION.R: {
          s.x += speed
          break
        }
        case DIRECTION.T: {
          s.y -= speed
          break
        }
        case DIRECTION.B: {
          s.y += speed
          break
        }
      }
    }

    /** 生成食物 */
    const dropFood = () => {
      if (food) {
        ctx.fillRect(food.x, food.y, 10, 10)
        return
      }
      const _food = {
        x: +(Math.random() * 790 / 10).toFixed(0) * 10,
        y: +(Math.random() * 590 / 10).toFixed(0) * 10
      }
      const index = snake.findIndex(s => s.x === _food.x && s.y === _food.y)
      if (index > -1) {
        dropFood()
      } else {
        food = _food
      }
    }

    /** 吃食物 */
    const eatFood = () => {
      if (snake[0].x === food?.x && snake[0].y === food?.y) {
        const s = JSON.parse(JSON.stringify(snake[snake.length - 1]))
        switch (s.direction) {
          case DIRECTION.L: {
            s.x += speed
            break
          }
          case DIRECTION.R: {
            s.x -= speed
            break
          }
          case DIRECTION.T: {
            s.y += speed
            break
          }
          case DIRECTION.B: {
            s.y -= speed
            break
          }
        }
        snake.push(new CreateSegment(s.x, s.y, s.direction))
        food = null
        score.value++
      }
    }

    /** 边界检查 */
    const edgeCheck = (s: Segment) => {
      if (s.x < 0 || s.x >= 800 || s.y < 0 || s.y >= 600) {
        alert('oooops!')
        reset()
      }
    }

    /** 初始化🐍 */
    const initSnake = () => {
      snake = []
      for (let i = 5; i > 0; i--) {
        snake.push(new CreateSegment(i * 10, 100, DIRECTION.R))
      }
    }

    /** 绑定方向键 */
    const onKeyboardEvent = () => {
      document.onkeydown = (e: KeyboardEvent) => {
        const curPosition = JSON.parse(JSON.stringify(snake[0]))
        let isDirectionKey = false
        switch (e.code) {
          case 'ArrowLeft': {
            curPosition.direction = DIRECTION.L
            isDirectionKey = true
            break
          }
          case 'ArrowRight': {
            curPosition.direction = DIRECTION.R
            isDirectionKey = true
            break
          }
          case 'ArrowUp': {
            curPosition.direction = DIRECTION.T
            isDirectionKey = true
            break
          }
          case 'ArrowDown': {
            curPosition.direction = DIRECTION.B
            isDirectionKey = true
            break
          }
        }
        if (isDirectionKey) {
          if (isSamePoint(prePosition, curPosition) || isSameDirection(prePosition, curPosition) || isReverseDirection(prePosition, curPosition)) {
            //
          } else {
            directionRecord.push(curPosition)
            prePosition = JSON.parse(JSON.stringify(curPosition))
          }
        }
      }
    }

    const isSamePoint = (pre: Record, cur: Record): boolean => {
      return cur.x === pre?.x && cur.y === pre?.y
    }

    const isSameDirection = (pre: Record, cur: Record): boolean => {
      return cur.direction === pre?.direction
    }

    const isReverseDirection = (pre: Record, cur: Record): boolean => {
      return cur.direction === DIRECTION.L && pre?.direction === DIRECTION.R ||
             cur.direction === DIRECTION.R && pre?.direction === DIRECTION.L ||
             cur.direction === DIRECTION.T && pre?.direction === DIRECTION.B ||
             cur.direction === DIRECTION.B && pre?.direction === DIRECTION.T
    }

    return {
      canvas,
      score,
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

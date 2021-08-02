<template>
  <div class="content">
    <div class="tools">
      <div>
        <el-button type="success" @click="type = BrushType.PEN">画笔</el-button>
        <el-button type="warning" @click="type = BrushType.RECT">矩形</el-button>
        <el-button type="danger" @click="type = BrushType.ARC">圆形</el-button>
        <span>颜色</span>
        <el-color-picker v-model="color"></el-color-picker>
        <span>粗细</span>
        <el-slider v-model="lineWidth" :min="1" :max="50" class="slider"></el-slider>
        <el-button type="info" @click="type = BrushType.ERASER">橡皮擦</el-button>
      </div>
      <div>
        <el-button @click="clear">清空</el-button>
        <el-button type="primary" @click="save">保存</el-button>
      </div>
    </div>
    <canvas ref="canvas" class="canvas" width="800" height="600" />
  </div>
  <div v-show="showPoint" :style="{ 'width': point.width + 'px', 'height': point.width + 'px', 'top': point.top + 'px', 'left': point.left + 'px' }" class="point" />
</template>

<script lang="ts">
import { ref, defineComponent, onMounted, markRaw, reactive, watch } from 'vue'

enum BRUSH_TYPE {
  PEN = 1,
  RECT = 2,
  ARC = 3,
  ERASER = 4
}

export default defineComponent({
  name: 'Demo2',
  setup: () => {
    let ctx: CanvasRenderingContext2D
    let isDraw = false
    let imageData: any = null
    let beginX = 0
    let beginY = 0

    const canvas = ref<HTMLCanvasElement | null>(null)
    const type = ref<BRUSH_TYPE>(BRUSH_TYPE.PEN)
    const color = ref('#000000')
    const lineWidth = ref(0)
    const point = reactive({
      width: 0,
      top: 0,
      left: 0
    })
    const BrushType = markRaw(BRUSH_TYPE)
    const showPoint = ref(false)

    watch(() => lineWidth.value, () => {
      point.width = lineWidth.value
    })

    onMounted (() => {
      init()
      onDraw()
    })

    const init = () => {
      ctx = canvas.value?.getContext('2d') as CanvasRenderingContext2D
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, 800, 600)
      lineWidth.value = 5
      ctx.lineCap = 'round'
    }

    const onDraw = () => {
      (canvas.value as HTMLCanvasElement).onmousedown = e => {
        isDraw = true
        const position = canvas.value?.getBoundingClientRect() as DOMRect
        const x = e.pageX - position.left
        const y = e.pageY - position.top
        beginX = x
        beginY = y
        ctx.beginPath()
        type.value === BRUSH_TYPE.PEN && ctx.moveTo(x, y)
      }
      document.onmouseup = () => {
        isDraw = false
        ctx.closePath()
        imageData = ctx.getImageData(0, 0, 800, 600)
      }
      (canvas.value as HTMLCanvasElement).onmouseout = () => {
        isDraw = false
        ctx.closePath()
        imageData = ctx.getImageData(0, 0, 800, 600)
        showPoint.value = false
      }
      (canvas.value as HTMLCanvasElement).onmouseenter = () => {
        showPoint.value = true
      }
      (canvas.value as HTMLCanvasElement).onmousemove = e => {
        const position = canvas.value?.getBoundingClientRect() as DOMRect
        const x = e.pageX - position.left
        const y = e.pageY - position.top
        point.left = e.pageX - point.width / 2 - 2
        point.top = e.pageY - point.width / 2 - 2
        if (isDraw) {
          type.value === BRUSH_TYPE.PEN && penDraw(x, y)
          type.value === BRUSH_TYPE.RECT && drawRect(x, y)
          type.value === BRUSH_TYPE.ARC && drawArc(x, y)
          type.value === BRUSH_TYPE.ERASER && penDraw(x, y, '#ffffff')
        }
      }
    }

    /** 画笔 / 橡皮擦 */
    const penDraw = (x: number, y: number, clr?: string) => {
      ctx.lineWidth = lineWidth.value
      ctx.strokeStyle = clr || color.value
      ctx.lineTo(x, y)
      ctx.stroke()
    }

    /** 矩形 */
    const drawRect = (x: number, y: number) => {
      ctx.clearRect(0, 0, 800, 600)
      imageData && ctx.putImageData(imageData, 0, 0, 0, 0, 800, 600)
      ctx.beginPath()
      ctx.lineWidth = lineWidth.value
      ctx.strokeStyle = color.value
      ctx.strokeRect(beginX, beginY, x - beginX, y - beginY)
      ctx.closePath()
    }

    /** 圆形 */
    const drawArc = (x: number, y: number) => {
      ctx.clearRect(0, 0, 800, 600)
      imageData && ctx.putImageData(imageData, 0, 0, 0, 0, 800, 600)
      ctx.beginPath()
      ctx.lineWidth = lineWidth.value
      ctx.strokeStyle = color.value
      const r = Math.sqrt(Math.pow(Math.abs(x - beginX), 2) + Math.pow(Math.abs(y - beginY), 2)) / 2
      ctx.arc(
        beginX + (x - beginX) / 2,
        beginY + (y - beginY) / 2,
        r,
        0,
        Math.PI * 2
      )
      ctx.stroke()
      ctx.closePath()
    }

    /** 清除 */
    const clear = () => {
      ctx.clearRect(0, 0, 800, 600)
      imageData = null
    }

    /** 保存 */
    const save = () => {
      const url = canvas.value?.toDataURL()
      const a = document.createElement('a')
      a.download = 'myWriting'
      a.href = url || ''
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }

    return {
      canvas,
      type,
      color,
      lineWidth,
      BrushType,
      showPoint,
      point,
      clear,
      save
    }
  }
})
</script>

<style lang="less" scoped>
.canvas {
  margin-top: 20px;
  border: 1px solid @blue;
}
.tools {
  display: flex;
  justify-content: space-between;
  align-items: center;
  &>div {
    display: flex;
    align-items: center;
  }
  .slider {
    width: 100px;
    margin-right: 20px;
  }
  span {
    margin: 0 10px 0 20px;
  }
}
.point {
  position: fixed;
  border: 1px solid rgba(0,0,0,.3);
  border-radius: 50%;
  pointer-events: none;
}
</style>

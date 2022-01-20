<template>
  <ul>
    <li
      v-for="route in routes"
      :key="route.label"
    >
      <router-link :to="route.path">
        {{ route.label }}
      </router-link>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, markRaw } from 'vue'

export default defineComponent({
  name: 'Header',
  setup: () => {
    const routes = markRaw([
      {
        path: '/demo1',
        label: '💸 刮刮乐'
      },
      {
        path: '/demo2',
        label: '🖌 画板'
      },
      {
        path: '/demo3',
        label: '⏰ 时钟'
      },
      {
        path: '/demo4',
        label: '♟ 五子棋'
      },
      {
        path: '/demo5',
        label: '⚛ 粒子运动'
      },
      {
        path: '/demo6',
        label: '🐍 贪吃蛇'
      },
      {
        path: '/demo7',
        label: '🚘 开车'
      }
    ])
    return {
      routes
    }
  }
})
</script>

<style lang="less" scoped>
ul {
  position: sticky;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  z-index: 1;
  li {
    margin-right: 20px;
    list-style: none;
    line-height: 2;
    font-size: 18px;
    &:not(:last-of-type)::after {
      content: '|';
    }
  }
  a {
    margin-right: 20px;
    color: #000;
  }
}
</style>
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
  <div class="container">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, markRaw } from 'vue'

export default defineComponent({
  name: 'DefaultLayout',
  setup: () => {
    const routes = markRaw([
      {
        path: '/demo1',
        label: '刮刮乐'
      },
      {
        path: '/demo2',
        label: '画板'
      },
      {
        path: '/demo3',
        label: '时钟'
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
  }
}
.container {
  display: flex;
  justify-content: center;
  width: 70%;
  min-width: 1000px;
  margin: 30px auto;
  padding: 30px;
  // background-color: @blue;
}
</style>
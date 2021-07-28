<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script lang="ts">
import { defineComponent, watch, shallowRef } from 'vue'
import { useRoute } from 'vue-router'
import DefaultLayout from '@/layouts/Default.vue'

const LAYOUT_MAP: Record<layoutTypes, Function> = {
  default: () => import('@/layouts/Default.vue')
}

type layoutTypes = 'default'

export default defineComponent({
  name: 'Layouts',
  setup () {
    const route = useRoute()
    const layout = shallowRef(DefaultLayout)

    watch (
      () => route.meta,
      async (meta) => {
        const name: layoutTypes = meta.layout as layoutTypes || 'default'
        const fn = LAYOUT_MAP[name] || (() => {})
        const component = await fn()
        layout.value = component?.default || DefaultLayout
      }
    )

    return {
      layout
    }
  }
})
</script>
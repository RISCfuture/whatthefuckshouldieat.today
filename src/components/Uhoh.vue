<script lang="ts" setup>
import { computed } from 'vue'
import { isError } from 'lodash-es'

const props = defineProps<{ error: unknown }>()

const errorString = computed(() =>
  isError(props.error) ? props.error.message : String(props.error)
)
</script>

<template>
  <div>
    <h1>A fucking error occurred. Can you believe that shit?</h1>
    <h2>
      Reload or
      <a href="https://github.com/RISCfuture/whatthefuckshouldieat.today"
        >yell at the fucking developer</a
      >.
    </h2>
    <div id="error">
      <pre>{{ errorString }}</pre>
    </div>
  </div>
</template>

<style scoped>
pre {
  font-family: monospace;
}
</style>

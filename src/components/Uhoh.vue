<script lang="ts" setup>
import { computed } from 'vue'
import { isError } from 'lodash-es'

const props = defineProps<{ error: unknown }>()

const errorString = computed(() =>
  isError(props.error) ? props.error.message : String(props.error),
)
</script>

<template>
  <div aria-live="assertive" role="alert">
    <h1>A fucking error occurred. Can you believe that shit?</h1>
    <h2>
      Reload or
      <a
        aria-label="Open the GitHub repository to report this issue (opens in a new tab)"
        href="https://github.com/RISCfuture/whatthefuckshouldieat.today"
        rel="noopener noreferrer"
        target="_blank"
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

<script setup lang="ts">
// Overrides the default MDC ProsePre to add a label + copy button.
// The inner <pre :class><slot/></pre> is kept identical so Shiki's
// highlighted output (classes + scoped color CSS) still applies.
const props = defineProps<{
  code?: string
  language?: string | null
  filename?: string | null
  highlights?: number[]
  meta?: string | null
  class?: string | null
}>()

const copied = ref(false)
let timer: ReturnType<typeof setTimeout> | undefined

async function copy() {
  if (!props.code) return
  try {
    await navigator.clipboard.writeText(props.code)
    copied.value = true
    clearTimeout(timer)
    timer = setTimeout(() => (copied.value = false), 1600)
  } catch {
    // clipboard unavailable (e.g. non-secure context) — silently ignore
  }
}
</script>

<template>
  <div class="code-block">
    <div class="code-block__bar">
      <span class="code-block__label">{{ filename || language || 'code' }}</span>
      <button
        type="button"
        class="code-block__copy"
        :data-copied="copied"
        @click="copy"
      >{{ copied ? 'copied' : 'copy' }}</button>
    </div>
    <pre :class="$props.class"><slot /></pre>
  </div>
</template>

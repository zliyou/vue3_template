<template>
  <div>Home传参：{{ message }}</div>
</template>
<script lang="ts" setup>
withDefaults(
  defineProps<{
    message: string
  }>(),
  {
    message: '默认提示',
  },
)
</script>

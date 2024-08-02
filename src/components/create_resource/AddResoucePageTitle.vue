<script setup>
const props = defineProps({
  title: String
})
</script>
<template>
  <p class="text-subtitle2 pa-3" @click="$router.back">Back</p>
  <h5 class="text-h5 font-weight-black pa-3">{{ props.title }}</h5>
</template>

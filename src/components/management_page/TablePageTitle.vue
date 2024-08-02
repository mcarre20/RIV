<script setup>
const props = defineProps({
  resourceName: String,
  resourceId: String
})
</script>
<template>
  <h6 class="text-h6 font-weight-bold mr-3 d-inline">{{ props.resourceName }}</h6>
  <p class="subtile-1 d-inline">edit</p>
</template>

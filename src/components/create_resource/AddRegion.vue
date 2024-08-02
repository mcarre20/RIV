<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
//state
const regionName = ref('')

const parentLocation = route.query.location

//handlers
const onSubmitHandler = () => {}
</script>

<template>
  <v-form class="pa-4" @submit.prevent="onSubmitHandler">
    <AddResourcePageTitle title="Add Region" />
    <div>
      <p class="text-subtitle-2 font-weight-bold py-1">Region name</p>
      <v-text-field
        placeholder="Region name"
        variant="outlined"
        density="compact"
        v-model="regionName"
      ></v-text-field>
    </div>
    <div>
      <v-btn variant="flat" color="primary" type="submit">save</v-btn>
    </div>
  </v-form>
</template>

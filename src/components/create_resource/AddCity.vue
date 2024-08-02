<script setup>
import { useRoute } from 'vue-router'
import { ref } from 'vue'

const route = useRoute()
//state
const cityName = ref('')

const parentLocation = route.query.location

//handlers
const onSubmitHandler = () => {}
</script>

<template>
  <h5 class="text-h5 font-weight-black pa-3">Create City</h5>
  <v-form class="pa-4" @submit.prevent="onSubmitHandler">
    <div>
      <p class="text-subtitle-2 font-weight-bold py-1">City name</p>
      <v-text-field
        placeholder="city name"
        variant="outlined"
        density="compact"
        v-model="cityName"
      ></v-text-field>
    </div>
    <div>
      <v-btn variant="flat" color="primary" type="submit">save</v-btn>
    </div>
  </v-form>
</template>

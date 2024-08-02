<script setup>
import { addDoc, collection } from 'firebase/firestore'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { db } from '../../firebase'

const route = useRoute()
const router = useRouter()
//state
const floorName = ref('')
const loading = ref(false)

const parentLocation = route.query.location_id
const projectId = route.query.project_id
const createFloor = async () => {
  loading.value = true
  await addDoc(collection(db, 'locations'), {
    name: floorName.value,
    parent_ID: parentLocation,
    project_ID: projectId,
    type: 'floor'
  })
  loading.value = false
}

//handlers
const onSubmitHandler = () => {
  createFloor()
  router.push({ name: 'project', params: { projectId: projectId } })
}
</script>

<template>
  <h5 class="text-h5 font-weight-black pa-3">Create Floor</h5>
  <v-form class="pa-4" @submit.prevent="onSubmitHandler">
    <div>
      <label for="floor name" class="text-subtitle-2 font-weight-bold py-1">Floor name</label>
      <v-text-field
        id="floorname"
        name="floorname"
        placeholder="Floor name"
        variant="outlined"
        density="compact"
        v-model="floorName"
      ></v-text-field>
    </div>
    <div>
      <v-btn variant="flat" color="primary" type="submit">save</v-btn>
    </div>
  </v-form>
</template>

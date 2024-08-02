<script setup>
import { db } from '@/firebase'
import { addDoc, collection, getDocs, query, serverTimestamp, where } from 'firebase/firestore'
import { onMounted, ref } from 'vue'

const createNewLocation = ref(false)
const projectName = ref('')
const locationSelected = ref()
const locationList = ref([])

//handlers
const onSubmitHandler = () => {
  const location_id = locationSelected.value.locationID
  const submitData = async () => {
    await addDoc(collection(db, 'projects'), {
      name: projectName.value,
      owner: 'Fn26LETzNKRElh8IWizuRp2MVE03',
      location_id: location_id,
      createdAt: serverTimestamp(),
      editor: [],
      state: 'open'
    })
  }
  submitData()
  // need to clear form and push navigation back
}

//data
const getCampusList = async () => {
  const queryCampus = query(collection(db, 'locations'), where('type', '==', 'campus'))
  const snapShot = await getDocs(queryCampus)
  snapShot.forEach((doc) => {
    const docData = doc.data()
    locationList.value.push({
      title: docData.name,
      locationID: doc.id,
      type: docData.type,
      parentID: docData.parent_ID
    })
  })
}

// lifecyle
onMounted(async () => {
  await getCampusList()
})
</script>
<template>
  <div class="pa-3 w-50">
    <h5 class="text-h5 font-weight-black pa-3">Create Project</h5>
    <v-form class="pa-4" @submit.prevent="onSubmitHandler">
      <!--project name-->
      <div>
        <p class="text-subtitle-2 font-weight-bold py-1">Project name</p>
        <v-text-field
          placeholder="Project name"
          variant="outlined"
          density="compact"
          v-model="projectName"
        ></v-text-field>
      </div>
      <!--project location-->
      <div>
        <p class="text-subtitle-2 font-weight-bold py-1">Location</p>
        <v-autocomplete
          placeholder="select a location"
          density="compact"
          variant="outlined"
          return-object
          :items="locationList"
          v-model="locationSelected"
        ></v-autocomplete>
        <v-checkbox label="Create new location" v-model="createNewLocation"></v-checkbox>
      </div>
      <!--create new location-->
      <div v-if="createNewLocation">
        <div>
          <p class="text-subtitle-2 font-weight-bold py-1">Location Name</p>
          <v-text-field
            placeholder="Location Name"
            variant="outlined"
            density="compact"
          ></v-text-field>
          <p class="text-subtitle-2 font-weight-bold py-1">Location address</p>
          <v-text-field
            placeholder="Location address"
            variant="outlined"
            density="compact"
          ></v-text-field>
          <p class="text-subtitle-2 font-weight-bold py-1">City</p>
          <v-autocomplete
            placeholder="select a location"
            density="compact"
            variant="outlined"
            :items="city"
          ></v-autocomplete>
        </div>
      </div>
      <!--submit button-->
      <div>
        <v-btn variant="flat" color="primary" type="submit">save</v-btn>
      </div>
    </v-form>
  </div>
</template>

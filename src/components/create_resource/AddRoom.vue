<script setup>
import { db } from '@/firebase'
import { globalDataStore } from '@/stores/dataStore'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AddResoucePageTitle from './AddResoucePageTitle.vue'

const route = useRoute()
const router = useRouter()
const dataStore = globalDataStore()
//
const floorData = ref({})
const campusData = ref({})
const roomName = ref('')
const roomNumber = ref('')
//const displayName = ref('')
const constructionNumb = ref('')
//const email = ref('')
const capacity = ref('')
const type = ref('')
const videoConf = ref('')
const bookingRestricted = ref(false)
const delegateList = ref([])
const walkupbooking = ref(false)
const delegateEmail = ref('')
const error = ref(false)
const loading = ref(false)

//
const displayName = computed(() => {
  if (!roomNumber.value.trim() && !roomName.value.trim()) {
    return ''
  } else if (roomNumber.value.trim() && !roomName.value.trim()) {
    return `${campusData.value.name}.${floorData.value.floor_number}.${roomNumber.value}`
  } else if (roomNumber.value.trim() && roomName.value.trim()) {
    const roomNameNoSpace = roomName.value.replace(' ', '')
    return `${campusData.value.name}.${floorData.value.floor_number}.${roomNumber.value}.${roomNameNoSpace}`
  } else {
    return ''
  }
})
const email = computed(() => {
  if (!roomNumber.value.trim() && !roomName.value.trim()) {
    return ''
  } else if (roomNumber.value.trim() && !roomName.value.trim()) {
    return `${campusData.value.name}.${floorData.value.floor_number}.${roomNumber.value}@email.com`
  } else if (roomNumber.value.trim() && roomName.value.trim()) {
    const roomNameNoSpace = roomName.value.replace(' ', '')
    return `${campusData.value.name}.${floorData.value.floor_number}.${roomNumber.value}.${roomNameNoSpace}@email.com`
  } else {
    return ''
  }
})
const addDelegate = () => {
  delegateList.value.push(delegateEmail.value)
  delegateEmail.value = ''
}
const removeDelegate = (delegate) => {
  const delagateIndex = delegateList.value.findIndex((email) => email === delegate)
  const newlist = delegateList.value.toSpliced(delagateIndex, 1)
  delegateList.value = newlist
}
const addRoom = async () => {
  loading.value = true
  const project_id = route.query.proj_id
  const parent_ID = route.query.res_id
  const data = {
    name: roomName.value,
    displayName: displayName.value,
    email: email.value,
    room_number: roomNumber.value,
    capacity: capacity.value,
    type: 'room',
    room_type: type.value,
    video_conferencing: videoConf.value,
    delegate_list: delegateList.value,
    walkup_booking: walkupbooking.value,
    construction_number: constructionNumb.value,
    project_id: project_id,
    parent_ID,
    created: serverTimestamp()
  }
  try {
    await addDoc(collection(db, 'locations'), data)
  } catch (err) {
    error.value = true
    console.log(err)
  } finally {
    loading.value = false
  }
}

//
const onSubmitHandler = () => {
  addRoom()
  router.back()
}

//
watch(
  () => route.query.res_id,
  (res_id) => {
    floorData.value = dataStore.getLocationData(res_id)
    campusData.value = dataStore.getLocationData(floorData.value.parent_ID)
  },
  { immediate: true }
)
</script>
<template>
  <div>
    <AddResoucePageTitle title="Add Floor" />
    <v-form class="w-50" @submit.prevent="onSubmitHandler">
      <label class="text-subtitle-2 font-weight-bold py-1" for="construction_number"
        >Construction Number</label
      >
      <v-text-field
        id="construction_number"
        placeholder="Construction Number"
        variant="outlined"
        density="comfortable"
        v-model="constructionNumb"
      ></v-text-field>
      <label class="text-subtitle-2 font-weight-bold py-1" for="name">Room Name</label>
      <v-text-field
        id="name"
        placeholder="Room Name"
        variant="outlined"
        density="comfortable"
        v-model="roomName"
      ></v-text-field>
      <label class="text-subtitle-2 font-weight-bold py-1" for="room_number">Room Number</label>
      <v-text-field
        id="room_number"
        placeholder="Room Number"
        variant="outlined"
        density="comfortable"
        v-model="roomNumber"
      ></v-text-field>
      <label class="text-subtitle-2 font-weight-bold py-1" for="display_name">Display Name</label>
      <v-text-field
        id="display_name"
        placeholder="Display Name"
        variant="outlined"
        density="comfortable"
        v-model="displayName"
      ></v-text-field>
      <label class="text-subtitle-2 font-weight-bold py-1" for="email">Email</label>
      <v-text-field
        id="email"
        placeholder="email"
        variant="outlined"
        density="comfortable"
        v-model="email"
      ></v-text-field>
      <label class="text-subtitle-2 font-weight-bold py-1" for="capacity">Capacity</label>
      <v-text-field
        id="capacity"
        placeholder="capacity"
        variant="outlined"
        density="comfortable"
        v-model="capacity"
      ></v-text-field>
      <label class="text-subtitle-2 font-weight-bold py-1" for="type">Room Type</label>
      <v-select
        id="type"
        :items="['4-person', '6-person', '12-person', 'theater']"
        v-model="type"
        variant="outlined"
        density="compact"
      ></v-select>
      <label class="text-subtitle-2 font-weight-bold py-1" for="vc">Video Conferencing</label>
      <v-select
        id="vc"
        :items="['none', 'BYOD', 'MS Teams', 'Zoom', 'WebEx', 'Google Meet']"
        v-model="videoConf"
        variant="outlined"
        density="compact"
      ></v-select>
      <v-switch v-model="walkupbooking" color="primary" label="Walkup Booking"></v-switch>
      <v-switch v-model="bookingRestricted" color="primary" label="Booking Restricted"></v-switch>
      <div v-show="bookingRestricted">
        <div>
          <v-text-field
            label="delagate email"
            placeholder="delegate email"
            variant="outlined"
            density="compact"
            v-model="delegateEmail"
            hide-details
          ></v-text-field>
          <v-btn class="my-2" color="primary" variant="flat" size="small" @click="addDelegate"
            >ADD DELEGATE</v-btn
          >
        </div>
        <v-card border="sm" min-height="100px" flat>
          <v-list-item
            v-for="(delegate, index) in delegateList"
            :key="index + delegate"
            density="compact"
          >
            <template v-slot:title>{{ delegate }}</template>
            <template v-slot:append
              ><v-btn
                color="red"
                variant="flat"
                size="x-small"
                text="REMOVE"
                @click="removeDelegate(delegate)"
              ></v-btn
            ></template>
          </v-list-item>
        </v-card>
      </div>
      <div>
        <v-btn variant="flat" color="primary" type="submit">save</v-btn>
      </div>
    </v-form>
  </div>
</template>

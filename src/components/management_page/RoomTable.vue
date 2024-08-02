<script setup>
import { globalDataStore } from '@/stores/dataStore'
import { mdiMagnify } from '@mdi/js'
import { ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import TablePageTitle from './TablePageTitle.vue'

//
const route = useRoute()
const router = useRouter()
const dataStore = globalDataStore()
const search = ref('')
const parentLocationData = ref({})
const roomList = ref([])
const selectedResource = ref([])

//table
const headers = [
  { align: 'start', title: 'Room Name', key: 'name' },
  { title: 'E-mail', key: 'email' },
  { title: 'VC', key: 'video_conferencing' },
  { title: 'Type', key: 'room_type' },
  { key: 'action', sortable: false }
]

//
const editHandler = (resource) => {
  console.log(resource)
}
const addRoomHandler = () => {
  const res_id = route.query.res_id
  const proj_id = route.params.projectId
  router.push({
    path: '/add',
    query: { res_id: res_id, restype: 'room', proj_id: proj_id }
  })
}
//
watchEffect(async () => {
  const resourceId = route.query.res_id
  parentLocationData.value = dataStore.getLocationData(resourceId)
  roomList.value = dataStore.getLocationRoomList(resourceId)
})
</script>
<template>
  <div>
    <div class="my-1">
      <TablePageTitle :resource-name="parentLocationData.name" />
    </div>
    <div class="mt-5">
      <div class="w-50">
        <v-text-field
          v-model="search"
          label="search"
          :prepend-inner-icon="mdiMagnify"
          variant="outlined"
          color="primary"
          density="compact"
        ></v-text-field>
      </div>
      <div class="d-flex ga-3 my-3">
        <v-btn variant="flat" color="primary" :ripple="false" size="small" @click="addRoomHandler"
          >Add Room</v-btn
        >
        <v-btn variant="flat" color="error" :ripple="false" size="small">Delete Room</v-btn>
      </div>
      <v-data-table
        v-model="selectedResource"
        :headers="headers"
        :search="search"
        :items="roomList"
        return-object
        show-select
      >
        <template v-slot:[`item.action`]="{ item }">
          <v-btn size="small" variant="tonal" @click="editHandler(item)">edit</v-btn>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

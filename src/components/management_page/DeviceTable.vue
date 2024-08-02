<script setup>
import { db } from '@/firebase'
import { globalDataStore } from '@/stores/dataStore'
import { mdiMagnify } from '@mdi/js'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import TablePageTitle from './TablePageTitle.vue'

//
const route = useRoute()
const router = useRouter()
const dataStore = globalDataStore()
const search = ref('')
const resourceData = ref({})
const deviceList = ref([])
const selectedResource = ref([])

//table
const headers = [
  { align: 'start', title: 'Make', key: 'make' },
  { title: 'model', key: 'model' },
  { title: 'Type', key: 'device_type' },
  { title: 'IP address', key: 'ip' },
  { key: 'action', sortable: false }
]

//
const editHandler = (resource) => {
  console.log(resource)
}
const addDeviceHandler = () => {
  const res_id = route.query.res_id
  router.push({ path: '/add', query: { res_id: res_id, restype: 'device' } })
}
//
watchEffect(async () => {
  const filteredDevices = []
  const resourceId = route.query.res_id
  resourceData.value = dataStore.getLocationData(resourceId)
  const deviceListRef = collection(db, 'devices')
  const deviceQuery = query(deviceListRef, where('location_id', '==', resourceId))
  const querySnapShot = await getDocs(deviceQuery)
  querySnapShot.forEach((doc) => {
    filteredDevices.push({ id: doc.id, ...doc.data() })
  })
  deviceList.value = filteredDevices
})
</script>
<template>
  <div>
    <div class="my-1">
      <TablePageTitle :resource-name="resourceData.name" />
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
        <v-btn variant="flat" color="primary" :ripple="false" size="small" @click="addDeviceHandler"
          >Add Device</v-btn
        >
        <v-btn variant="flat" color="error" :ripple="false" size="small">Delete Device</v-btn>
      </div>
      <v-data-table
        v-model="selectedResource"
        :headers="headers"
        :search="search"
        :items="deviceList"
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

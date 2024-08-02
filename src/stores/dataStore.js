import { auth, db } from '@/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { collection, onSnapshot } from 'firebase/firestore'
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const globalDataStore = defineStore('globalDataStore', () => {
  const locationList = ref([])
  const regionList = ref([])
  const cityList = ref([])
  const campusList = ref([])
  const floorList = ref([])
  const roomList = ref([])
  const unsubLocationFetch = ref([])
  const unsubDeviceFetch = ref([])

  const getLocationFloorList = (parentLocationId) => {
    const floors = floorList.value.filter((f) => f.parent_ID === parentLocationId)
    return floors.sort()
  }
  const getLocationRoomList = (parentLocationId) => {
    const rooms = roomList.value.filter((r) => r.parent_ID === parentLocationId)

    return rooms.sort()
  }
  const getLocationData = (locationId) => {
    const locationData = locationList.value.find((r) => r.id === locationId)
    return locationData
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      //data listners
      unsubLocationFetch.value = onSnapshot(collection(db, 'locations'), (querySnapshot) => {
        const locations = []
        querySnapshot.forEach((doc) => {
          const docData = doc.data()
          locations.push({ id: doc.id, ...docData })
        })
        locationList.value = locations
      })
    }
  })

  watch(locationList, (newLocationList) => {
    regionList.value = newLocationList.filter((location) => location.type === 'region')
    cityList.value = newLocationList.filter((location) => location.type === 'city')
    campusList.value = newLocationList.filter((location) => location.type === 'campus')
    floorList.value = newLocationList.filter((location) => location.type === 'floor')
    roomList.value = newLocationList.filter((location) => location.type === 'room')
  })

  return {
    locationList,
    regionList,
    cityList,
    campusList,
    floorList,
    roomList,
    unsubLocationFetch,
    unsubDeviceFetch,
    getLocationFloorList,
    getLocationRoomList,
    getLocationData
  }
})

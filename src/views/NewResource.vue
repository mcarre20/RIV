<script setup>
import AddCampus from '@/components/create_resource/AddCampus.vue'
import AddCity from '@/components/create_resource/AddCity.vue'
import AddDevice from '@/components/create_resource/AddDevice.vue'
import AddFloor from '@/components/create_resource/AddFloor.vue'
import AddRegion from '@/components/create_resource/AddRegion.vue'
import AddRoom from '@/components/create_resource/AddRoom.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const resourceType = route.query.restype
let comp
switch (resourceType) {
  case 'region':
    comp = AddRegion
    break
  case 'city':
    comp = AddCity
    break
  case 'campus':
    comp = AddCampus
    break
  case 'floor':
    comp = AddFloor
    break
  case 'room':
    comp = AddRoom
    break
  case 'device':
    comp = AddDevice
    break
}
</script>
<template>
  <div class="pa-3 w-50">
    <div>
      <component :is="comp"></component>
    </div>
  </div>
</template>

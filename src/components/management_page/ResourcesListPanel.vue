<script setup>
import { shallowRef, watch } from 'vue'
import { useRoute } from 'vue-router'
import CampusTable from './CampusTable.vue'
import DefaultResource from './DefaultResource.vue'
import DeviceTable from './DeviceTable.vue'
import FloorTable from './FloorTable.vue'
import RoomTable from './RoomTable.vue'

const route = useRoute()

const resourceComponent = shallowRef(DefaultResource)

watch(
  () => route.query,
  (query) => {
    const resType = query.type
    switch (resType) {
      case 'city':
        resourceComponent.value = CampusTable
        break
      case 'campus':
        resourceComponent.value = FloorTable
        break
      case 'floor':
        resourceComponent.value = RoomTable
        break
      case 'room':
        resourceComponent.value = DeviceTable
        break
      default:
        resourceComponent.value = DefaultResource
    }
  }
)
</script>
<template>
  <component :is="resourceComponent"></component>
</template>

<script setup>
import { globalDataStore } from '@/stores/dataStore'
import { mdiChevronDown, mdiChevronUp } from '@mdi/js'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const props = defineProps({
  loctionId: String
})
const open = ref([])
const dataStore = globalDataStore()
const projectId = route.params.projectId
//handler
const addFloorHandler = () => {
  router.push({
    path: '/add',
    query: { location_id: props.loctionId, restype: 'floor', project_id: projectId }
  })
}
</script>
<template>
  <div class="pa-4">
    <v-btn
      variant="flat"
      color="primary"
      text="Add Floor"
      class="w-100 my-1"
      @click="addFloorHandler"
    >
    </v-btn>
    <v-list nav open-strategy="multiple" density="compact" select-strategy="classic" :opened="open">
      <v-list-group
        v-for="floor in dataStore.getLocationFloorList(props.loctionId)"
        :key="floor.id"
        :collapse-icon="null"
        :expand-icon="null"
        color="primary"
      >
        <template v-slot:activator="{ isOpen, props }">
          <v-list-item
            :title="floor.name"
            @click="
              $router.push({ path: $route.path, query: { res_id: floor.id, type: floor.type } })
            "
            :ripple="false"
            :active="$route.query.floorId === floor.id ? true : false"
          >
            <template v-slot:prepend>
              <v-icon
                @click.stop
                size="large"
                v-bind="props"
                :icon="isOpen ? mdiChevronUp : mdiChevronDown"
              />
            </template>
          </v-list-item>
        </template>

        <v-list-item
          v-for="room in dataStore.getLocationRoomList(floor.id)"
          :key="room.id"
          color="primary"
          :title="room.name"
          :value="`room-${room.id}`"
          :to="{ path: $route.path, query: { res_id: room.id, type: room.type } }"
          :ripple="false"
          :active="$route.query.res_id === room.id ? true : false"
        >
        </v-list-item>
      </v-list-group>
    </v-list>
  </div>
</template>

<script setup>
import FloorList from '@/components/management_page/FloorList.vue'
import ResourceListPanel from '@/components/management_page/ResourcesListPanel.vue'
import { userDataStore } from '@/stores/userData'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const userStore = userDataStore()
const projectData = ref()
const projectId = route.params.projectId
const dataIsLoading = ref(false)

const initData = () => {
  projectData.value = userStore.getProjectData(projectId)
}
userStore.$subscribe((_, state) => {
  if (state.dataIsLoading == true) {
    dataIsLoading.value = true
  } else {
    initData()
  }
})

initData()
</script>
<template>
  <KeepAlive>
    <v-container fluid class="h-100">
      <h1 v-if="dataIsLoading">Data loading</h1>
      <v-row v-else dense class="py-3">
        <v-col class="py-0" cols="3">
          <h6 class="text-h6 font-weight-medium">{{ projectData?.name }}</h6>
          <FloorList :loctionId="projectData?.location_id"></FloorList>
        </v-col>
        <v-col class="pl-13 py-0"><ResourceListPanel /></v-col>
      </v-row>
    </v-container>
  </KeepAlive>
</template>

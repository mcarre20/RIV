<script setup>
import { userDataStore } from '@/stores/userData'
import { ref } from 'vue'

//state
const open = defineModel(['myProjects'])
const navItems = ref([
  { name: 'Room Management', route: '/' },
  { name: 'Software Version', route: '/soft_version' }
])

const userProjects = ref([])

//store
const userStore = userDataStore()
userStore.$subscribe((mutation, state) => {
  userProjects.value = state.userProjects
})
//data
</script>
<template>
  <v-list density="compact" v-model:opened="open">
    <v-list-item
      v-for="(link, index) in navItems"
      :key="index"
      :title="link.name"
      :to="link.route"
      color="primary"
    ></v-list-item>
    <v-list-group value="myProjects">
      <template v-slot:activator="{ props }">
        <v-list-item v-bind="props" title="My Projects"></v-list-item>
      </template>
      <v-list-item title="Create Project" to="/new_project"></v-list-item>
      <v-list-item
        v-for="project in userProjects"
        :key="project.projectId"
        :subtitle="project.name"
        :to="project.route"
        color="primary"
      ></v-list-item>
    </v-list-group>
  </v-list>
</template>

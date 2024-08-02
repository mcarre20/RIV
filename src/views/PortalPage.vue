<script setup>
import { auth } from '@/firebase'
import router from '@/router'
import { globalDataStore } from '@/stores/dataStore'
import { userDataStore } from '@/stores/userData'
import { mdiLogout } from '@mdi/js'
import { signOut } from 'firebase/auth'
import NavBarLink from '../components/NavBarLink.vue'
//store
const userStore = userDataStore()
const dataStore = globalDataStore()

//handler
const logoutHandler = () => {
  signOut(auth).then(() => {
    userStore.unsub()
    dataStore.unsubLocationFetch()
    router.push('/')
  })
}
</script>

<template>
  <v-layout>
    <!--appbar-->
    <v-app-bar class="elevation-0 px-4" color="primary">
      <div class="w-100 d-flex align-center justify-space-between">
        <h1 class="text-h3">RiV</h1>
        <div class="d-flex align-center ga-2">
          <h3 class="text-h5">{{ userStore.fullName.toUpperCase() }}</h3>
          <v-btn
            variant="plain"
            :icon="mdiLogout"
            size="x-large"
            :ripple="false"
            @click="logoutHandler"
          ></v-btn>
        </div>
      </div>
    </v-app-bar>
    <!--NavBar-->
    <v-navigation-drawer class="elevation-5 bg-grey-lighten-4">
      <NavBarLink></NavBarLink>
    </v-navigation-drawer>
    <!--router view-->
    <v-main class="h-screen ma-4">
      <router-view :key="$route.path"></router-view>
    </v-main>
  </v-layout>
</template>

<script setup>
import { onAuthStateChanged } from 'firebase/auth'
import { ref } from 'vue'
import { auth } from './firebase'
import LoginPage from './views/LoginPage.vue'
import PortalPage from './views/PortalPage.vue'

const userIsLogin = ref(false)

onAuthStateChanged(auth, (user) => {
  if (user) {
    userIsLogin.value = true
  } else {
    userIsLogin.value = false
  }
})
</script>

<template>
  <v-sheet class="h-screen">
    <PortalPage v-if="userIsLogin"></PortalPage>
    <LoginPage v-else></LoginPage>
  </v-sheet>
</template>

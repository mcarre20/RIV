<script setup>
import { auth } from '@/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { ref } from 'vue'
//state
const userEmail = ref('')
const userPassword = ref('')
const error = ref(false)

const loginHandler = () => {
  signInWithEmailAndPassword(auth, userEmail.value.trim(), userPassword.value.trim())
    .then(() => {})
    .catch((error) => {
      const errorMessage = error.message
      console.log(errorMessage)
    })
}
</script>

<template>
  <v-container class="d-flex align-center justify-center">
    <v-card class="w-50 px-6 py-8">
      <v-form class="d-flex flex-column justify-center" @submit.prevent="loginHandler">
        <h2 class="text-h4 text-center pb-4">LOGIN</h2>
        <v-text-field v-model="userEmail" label="Email"></v-text-field>
        <v-text-field v-model="userPassword" label="Password" type="password"></v-text-field>
        <v-btn size="large" variant="flat" color="primary" type="submit">Login</v-btn>
      </v-form>
      <v-alert
        v-if="error"
        type="error"
        variant="tonal"
        text="Invalide username or password"
        density="compact"
        class="mt-3"
      ></v-alert>
    </v-card>
  </v-container>
</template>

<style scoped></style>

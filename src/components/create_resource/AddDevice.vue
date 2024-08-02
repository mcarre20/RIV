<script setup>
import { db } from '@/firebase'
import { addDoc, collection } from 'firebase/firestore'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AddResourcePageTitle from './AddResoucePageTitle.vue'

const route = useRoute()
const router = useRouter()
const parentLocation = route.query.res_id

const form = ref(null)
const deviceMake = ref('')
const deviceModel = ref('')
const deviceType = ref('')
const deviceMac = ref('')
const deviceHostname = ref('')
const deviceIp = ref('')
const deviceSubnet = ref('')
const deviceGateway = ref('')

//
const formReset = () => {
  deviceMake.value = ''
  deviceModel.value = ''
  deviceType.value = ''
  deviceMac.value = ''
  deviceHostname.value = ''
  deviceIp.value = ''
  deviceSubnet.value = ''
  deviceGateway.value = ''
}

//
const onSubmitHandler = async () => {
  const deviceData = {
    make: deviceMake.value,
    model: deviceModel.value,
    device_type: deviceType.value,
    device_mac: deviceMac.value,
    hostname: deviceHostname.value,
    ip: deviceIp.value,
    subnet: deviceSubnet.value,
    default_gateway: deviceGateway.value,
    location_id: parentLocation
  }

  await addDoc(collection(db, 'devices'), deviceData)
  form.value.reset()
  formReset()
  router.back()
}
</script>

<template>
  <AddResourcePageTitle />
  <div>
    <v-form class="w-50" @submit.prevent="onSubmitHandler" ref="form">
      <label class="text-subtitle-2 font-weight-bold py-1" for="make">Make</label>
      <v-text-field
        id="make"
        placeholder="Device Make"
        variant="outlined"
        density="dense"
        v-model="deviceMake"
      ></v-text-field>
      <label class="text-subtitle-2 font-weight-bold py-1" for="model">Model</label>
      <v-text-field
        id="model"
        placeholder="Device Model"
        variant="outlined"
        density="dense"
        v-model="deviceModel"
      ></v-text-field>
      <label class="text-subtitle-2 font-weight-bold py-1" for="type">Type</label>
      <v-text-field
        id="type"
        placeholder="Device Type"
        variant="outlined"
        density="dense"
        v-model="deviceType"
      ></v-text-field>
      <label class="text-subtitle-2 font-weight-bold py-1" for="mac">Mac Address</label>
      <v-text-field
        id="mac"
        placeholder="Device Mac Address"
        variant="outlined"
        density="dense"
        v-model="deviceMac"
      ></v-text-field>
      <label class="text-subtitle-2 font-weight-bold py-1" for="hostname">Hostname</label>
      <v-text-field
        id="hostname"
        placeholder="Device hostname"
        variant="outlined"
        density="dense"
        v-model="deviceHostname"
      ></v-text-field>
      <label class="text-subtitle-2 font-weight-bold py-1" for="ip">IP Address</label>
      <v-text-field
        id="ip"
        placeholder="Device Ip Address"
        variant="outlined"
        density="dense"
        v-model="deviceIp"
      ></v-text-field>
      <label class="text-subtitle-2 font-weight-bold py-1" for="subnet">Subnet</label>
      <v-text-field
        id="subnet"
        placeholder="Device Subnet"
        variant="outlined"
        density="dense"
        v-model="deviceSubnet"
      ></v-text-field>
      <label class="text-subtitle-2 font-weight-bold py-1" for="gateway">Default Gateway</label>
      <v-text-field
        id="gateway"
        placeholder="Device gateway"
        variant="outlined"
        density="dense"
        v-model="deviceGateway"
      ></v-text-field>
      <div>
        <v-btn variant="flat" color="primary" type="submit">save</v-btn>
      </div>
    </v-form>
  </div>
</template>

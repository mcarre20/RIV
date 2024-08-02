<script setup>
import { computed, ref } from 'vue'
const data = [
  { manufacturer: 'Poly', model: 'X30', version: '3.17' },
  { manufacturer: 'Poly', model: 'X50', version: '4.0' },
  { manufacturer: 'Poly', model: 'G7500', version: '3.17' },
  { manufacturer: 'Cisco', model: 'RoomKit', version: '9.15' },
  { manufacturer: 'Cisco', model: 'SX20', version: '9.10' },
  { manufacturer: 'Crestron', model: 'DMPS', version: '2.32.12' },
  { manufacturer: 'Neat', model: 'Board', version: '7.0.0' },
  { manufacturer: 'Crestron', model: 'TS-1070', version: '5.3.21.8' }
]

const deviceList = ref(data)
const uniqueManufacturer = computed(() => {
  const manufacturers = []
  deviceList.value.map((device) => {
    if (!manufacturers.includes(device.manufacturer)) {
      manufacturers.push(device.manufacturer)
    }
  })
  return manufacturers
})
</script>
<template>
  <div v-for="(manufacturer, index) in uniqueManufacturer" :key="index" class="pa-3">
    <h5 class="text-h5 pb-1 font-weight-bold">{{ manufacturer }}</h5>
    <v-divider :thickness="2" class="border-opacity-50"></v-divider>
    <v-row class="pt-3">
      <v-col
        v-for="(device, index) in deviceList.filter((d) => d.manufacturer == manufacturer)"
        cols="2"
        :key="index"
      >
        <v-card
          :title="device.manufacturer"
          :subtitle="device.model"
          :text="device.version"
          class="elevation-1 text-center mx-auto py-2"
        >
          <v-card-actions class="justify-space-around">
            <v-btn size="small" variant="outlined" color="primary" text="Edit"></v-btn>
            <v-btn size="small" variant="outlined" color="error" text="delete"></v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<template>
  <v-card class="mx-auto" max-width="374" height="1422">
    <div class="d-flex flex-column justify-content-center align-items-center m-1">
      <div class="text-center">
        <v-avatar size="120" class="mx-auto" rounded>
        </v-avatar>
      </div>
    </div>

      <p class="text-center">
        {{ $route.params.name }}
      </p>
    
    
  </v-card>
</template>

<script setup>
import axios from 'axios'

onMounted(() =>
  axios.get(`api/`))

</script>
<template>
<div>{{id}}</div>
</template>
<script setup>
import axios from 'axios'

const route = useRoute();

const id = ref(route.params.id)

</script>

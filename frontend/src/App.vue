<script setup lang="ts">
import { onMounted } from 'vue'
import { users } from './api/services'

onMounted(async () => {
  console.log(await users.getAll())
})
</script>

<template>
  <header>
    <div class="wrapper">
      <p class="h6">Hello</p>
    </div>
  </header>

  <main>

  </main>
</template>

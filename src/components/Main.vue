<template>
  <div class="main">
    <app-layout>
      <router-view></router-view>
    </app-layout>
  </div>
</template>

<script>
  import AppLayout from '@/components/_layouts/layout'

  export default {
    name: 'main',
    components: {
      'app-layout': AppLayout
    }
  }
</script>

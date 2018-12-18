<template>
  <div id="app-layout">
    <app-toolbar></app-toolbar>
    <app-navbar></app-navbar>
    <div class="app-wrapper">
      <div class="app-gap"></div>
      <div class="app-container">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
  import AppToolbar from '@/components/_layouts/toolbar'
  import AppNavbar from '@/components/_layouts/navbar'

  export default {
    name: 'app-layout',
    components: {
      'app-toolbar': AppToolbar,
      'app-navbar': AppNavbar
    }
  }
</script>

<style lang="scss">
  @import '../../assets/css/global';

  .app-gap {
    width: 100%;
    height: 20px;
    background-color: $color-bg-light;
  }

  .app-wrapper {
    min-width: 724px;
    position: relative;
    margin-top: $height-toolbar;
    margin-left: $width-navbar;
  }

  .app-container {
    position: relative;
  }
</style>

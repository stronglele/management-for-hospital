<template>
  <div id="toolbar">
    <header class="app-header">
      <h2 class="header-title">
        <span>{{token && token['parameter2'] ? `${token['parameter2'] || token['parameter3']}，` : ''}}</span> 欢迎您！</h2>
      <div class="header-logout" @click="logout()">
        <i class="icon-logout"></i>
        退出
      </div>
    </header>
  </div>
</template>

<script>
  import { delCookie } from '@/components/_libs/util'
  export default {
    name: 'toolbar',
    created () {
      if (!this.token) {
        this.$router.push({name: 'Login'})
      }
    },
    methods: {
      logout () {
        delCookie('session')
        delCookie('u_uuid')
        this.$store.commit('tokenDelete')
        this.$router.push('/login')
      }
    },
    computed: {
      token () {
        return this.$store.state.token
      }
    }
  }
</script>

<style lang="scss">
  @import '../../assets/css/global';

  .app-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding-left: $width-navbar;
    height: $height-toolbar;
    box-shadow: 0 2px 8px $color-box-shadow;
    background-color: $color-white;
    z-index: 100;
  }

  .header-title {
    display: inline-block;
    line-height: $height-toolbar;
    padding-left: 25px;
    font-size: 18px;
    span {
      font-size: 20px;
      color: #ff5a40;
    }
  }

  .header-logout {
    position: absolute;
    top: 0;
    right: 25px;
    height: $height-toolbar - 20px;
    line-height: $height-toolbar - 20px;
    padding-left: $height-toolbar - 10px;
    margin: 10px 0;
    font-size: 18px;
    overflow: hidden;
    cursor: pointer;
    .icon-logout {
      position: absolute;
      left: 0;
      top: 0;
      display: block;
      width: $height-toolbar - 20px;
      height: $height-toolbar - 20px;
      background: url(../../assets/images/logout.png) no-repeat;
      background-size: 100%;
    }
  }
</style>

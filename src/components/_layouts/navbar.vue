<template>
  <div id="app-navbar">
    <div class="nav-container">
      <div class="nav-logo"></div>
      <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" router="router">
        <el-menu-item index="1" :route="route.case">
          <i class="el-icon-menu"></i>病历管理
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-setting"></i>数据维护
          </template>
          <el-menu-item index="2-1" :route="route.drugCategory">药品类目维护</el-menu-item>
          <el-menu-item index="2-2" :route="route.drug">药品维护</el-menu-item>
          <el-menu-item index="2-3" :route="route.checkCategory">检查类目维护</el-menu-item>
          <el-menu-item index="2-4" :route="route.checkSubcategory">检查子类目维护</el-menu-item>
          <el-menu-item index="2-5" :route="route.supplies">耗材维护</el-menu-item>
        </el-submenu>
        <el-menu-item index="3" :route="route.account" v-if="token&&token.parameter5==='e+DINOhotdIo2qzTp9R7Gg=='">
          <i class="el-icon-star-on"></i>后台账号管理
        </el-menu-item>
        <el-menu-item index="4" :route="route.filtrate">
          <i class="el-icon-document"></i>患者数据筛选
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app-navbar',
    data () {
      return {
        route: {
          case: {path: '/'},
          account: {path: '/account'},
          filtrate: {path: '/filtrate'},
          drugCategory: {path: '/drug-category'},
          drug: {path: '/drug'},
          checkCategory: {path: '/check-category'},
          checkSubcategory: {path: '/check-subcategory'},
          supplies: {path: '/supplies'}
        }
      }
    },
    created () {
      if (!this.token) {
        this.$router.push({name: 'Login'})
      }
    },
    methods: {
      handleOpen (key, keyPath) {
//        console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
//        console.log(key, keyPath)
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

  .nav-container {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: $width-navbar;
    background: $color-primary;
    box-shadow: 3px 0 6px $color-box-shadow;
    z-index: 101;

    .nav-logo {
      width: 100%;
      height: $height-toolbar - 20px;
      margin: 20px 0;
      background: url(../../assets/images/logo-text.png) no-repeat 20px center;
      background-size: auto 100%;
    }

    .el-menu-item,
    .el-submenu__title,
    .el-submenu .el-menu-item {
      font-size: 18px !important;
      height: $height-toolbar !important;
      line-height: $height-toolbar !important;
    }

    .el-menu-item.is-active {
      color: $color-primary !important;
      background-color: $color-white !important;
    }

    .el-submenu__title:hover {
      background-color: $color-primary !important;
    }

    .el-menu-item:hover {
      color: $color-primary;
      background-color: $color-white !important;
    }

    .el-submenu .el-menu-item:hover {
      background-color: $color-light !important;
    }

    .el-submenu .el-menu {
      background-color: $color-white !important;
    }

    .el-submenu .el-menu-item {
      color: $color-text-primary !important;
    }

    .el-submenu .el-menu-item.is-active {
      color: $color-text-dark !important;
      background-color: $color-light !important;
    }

    .el-submenu__icon-arrow.el-icon-arrow-down {
      font-size: 18px;
    }
  }
</style>

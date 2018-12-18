<template>
  <div id="user-info">
    <h4 class="info-title">患者资料</h4>
    <p class="info-content">
      <span>患者姓名: <strong>{{data && data.name || name || ''}}</strong></span>
      <span>年龄: <strong>{{data && data.age || age || ''}}</strong></span>
      <span>性别: <strong>{{data && data.sex || sex || ''}}</strong></span>
      <span>手机号: <strong>{{data && data.telephone || telephone || ''}}</strong></span>
    </p>
    <h3 class="tab-title" v-show="title">{{title || ''}}</h3>
  </div>
</template>

<script>
  export default {
    name: 'user-info',
    props: ['title', 'data'],
    computed: {
      name () {
        return this.$store.state.name
      },
      age () {
        return this.$store.state.age
      },
      sex () {
        return this.$store.state.sex
      },
      telephone () {
        return this.$store.state.telephone
      }
    }
  }
</script>

<style lang="scss">
  @import '../../../assets/css/global';

  .info-title {
    line-height: 1.5;
    font-size: 16px;
    color: $color-text-dark;
  }

  .info-content {
    line-height: 1.8;
    font-size: 15px;
    color: $color-text-light;
    span {
      padding-right: 30px;
    }
    strong {
      font-weight: 400;
      color: $color-text-primary;
    }
  }

  .tab-title {
    padding: 20px 0 15px;
    border-bottom: 1px solid $color-border;
    font-size: 18px;
    color: $color-text-dark;
  }
</style>

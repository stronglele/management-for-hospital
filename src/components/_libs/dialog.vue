<template>
  <div id="app-dialog">
    <el-dialog
      :visible="visible"
      :show-close="false"
      :top="'30%'"
      :custom-class="'app-dialog'"
    >
      <div slot="title">
        <h3 class="app-title">{{title}}</h3>
      </div>
      <p class="app-content">{{message}}</p>
      <div slot="footer">
        <el-button type="primary" size="large" @click="close()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'app-dialog',
    props: [
      'title',
      'message',
      'visible'
    ],
    methods: {
      close: function () {
        this.$emit('update:visible', false)
      }
    }
  }
</script>

<style lang="scss">
  .app-dialog {
    transform: none !important;
    margin-left: -210px !important;
    width: 420px !important;
    .app-title {
      font-size: 20px;
      text-align: center;
    }
    .app-content{
      font-size: 16px;
    }
  }
</style>

<template>
  <div id="case-image">
    <div class="image-container">
      <user-info :data="data" :title="'上传照片'"></user-info>
      <div class="image-container" v-show="images.length!==0">
        <el-carousel :autoplay="false" arrow="always" indicator-position="outside" height="50vh">
          <el-carousel-item v-for="item in images" :key="item.url">
            <img :src="item.url" class="image-img">
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="caseform-button">
        <el-button @click="goBack()">返回</el-button>
      </div>
      <div v-show="images.length==0&&errMsg" class="errMsg">{{errMsg}}</div>
    </div>
  </div>
</template>

<script>
  import UserInfo from './child/userinfo'

  export default {
    name: 'case-image',
    components: {
      'user-info': UserInfo
    },
    data () {
      return {
        msg: 'case image',
        data: {
          name: '',
          age: '',
          sex: '',
          telephone: ''
        },
        images: [],
        errMsg: ''
      }
    },
    created () {
      this.$http.get(`${this.$global.api}basicInformation/get?id=${this.$route.params.id}&time=${new Date().getTime()}`)
        .then(res => {
          if (res.data.code === 0 && res.data.data) {
            this.data.name = res.data.data.name
            this.data.age = res.data.data.age
            this.data.sex = res.data.data.sex
            this.data.telephone = res.data.data.telephone
          }
        })
        .catch(err => {
          console.log(err)
        })
      this.$http.get(`${this.$global.api}illness/getIllnessPicture?illnessId=${this.$route.params.id}&time=${new Date().getTime()}`)
        .then(res => {
          if (res.data && res.data.code === 0 && res.data.data) {
            this.images = res.data.data
            if (this.images.length === 0) {
              this.errMsg = '啊哦！该用户尚未上传图片哦～'
              console.log('啊哦！该用户尚未上传图片哦～')
            }
          }
        })
        .catch(err => {
          this.errMsg = '啊哦！访问服务器出错啦～'
          console.log(err)
        })
    },
    methods: {
      goBack () {
        this.$router.push({name: 'CaseList'})
      }
    }
  }
</script>

<style lang="scss">
  .image-container {
    padding: 20px;

    .el-carousel__item {
      text-align: center;
    }

    .image-img {
      height: 100%;
    }

    .errMsg {
      padding: 20px;
      text-align: center;
      font-size: 16px;
    }
    .caseform-button {
      text-align: center;
    }
  }
</style>

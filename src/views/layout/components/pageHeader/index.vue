<template>
  <div class="container">
    <div class="title">
      <h4>辅助生产管理系统</h4>
    </div>
    <div class="notice">
      <el-badge :value="noticeNum" type="warning">
        <div @click="goview('工作提醒')">
          <img src="@/assets/img/通知.png">
        </div>
      </el-badge>
    </div>
    <div class="userInfo">
      <div class="avator">
        <el-avatar :size="60" :src="userInfo.avatar"></el-avatar>
      </div>
      <div class="username">
        <div class="login-user">{{userInfo.name}}</div>
        <div class="login-user user-role">{{userInfo.role}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'page-header',
  components: {
  },
  data () {
    return {
      userInfo: {
        avatar: '',
        name: 'zys',
        role: 'admin'
      },
      noticeNum: 12
    }
  },
  methods: {
    goview (name) {
      this.$router.push({ name }).catch(err => {
        err && console.log('刷新') // 待优化
      })
    }
  }
}
</script>

<style lang="scss" scpoed>
  img{
    height: 44px;
    margin-bottom: 24px;
  }
  .container {
    width: 100%;
    color: #e5e9f2;
    padding-right: 10px;
    display: flex;
  }
  .title {
    width: 100%;
    line-height: 20px;
    font-size: 32px;
    letter-spacing: 10px;
    text-align: center;
  }
  .notice {
    margin-top: 36px;
    /*z-index: 1;*/
    /*position: absolute;*/
  }
  .userInfo {
    display: flex;
    margin-top: 16px;
    /*z-index: 1;*/
    /*position: absolute;*/
  }
  .avator {
    margin-left: 80px;
    margin-right: 8px;
    margin-top: 8px;
  }
  .username {
    display: inline-block;
    margin-right: 20px;
    margin-top: 18px;
  }
  .login-user{
    line-height: 20px;
    height: 20px;
    text-align: center;
    font-size: 24px;
  }
  .user-role{
    background-color: RGB(30,206,226);
    color: white;
    border-radius: 4px;
    font-size: 14px;
    margin-top: 8px;
    height: 20px;
    width: 60px;
  }
</style>

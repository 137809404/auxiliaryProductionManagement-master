<template>
  <div class="container">
    <div class="tac">
      <el-row>
        <div class="logo-image">
          <img src="@/assets/img/logo.png" />
        </div>
      </el-row>
      <el-row>
        <el-menu
          default-active="0"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="RGB(35,39,61)"
          text-color="#fff"
          active-text-color="#ffd04b"
          :collapse="isCollapse"
          unique-opened>
          <!--首页-->
          <el-menu-item
            class="main-menu"
            index="0"
            @click.native="goview('首页')">
            <i class="el-icon-s-home" style="font-size:60px;padding-right: 4vh;"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <!--公告栏和生产运行管理-->
          <el-submenu
            v-for="(item,key) in routesArr.slice(1)"
            :key=key
            :index="key+1+''">
            <div slot="title" class="main-menu">
              <i :class="key === 0?'el-icon-s-comment':'el-icon-menu'" class="icon" style="font-size: 60px"></i>
            </div>
            <el-menu-item-group style="width: 300px">
              <div slot="title" class="menu-title">{{item.name}}</div>
              <template v-for="(child,childkey) in item.children">
                <template v-if="child.children">
                  <el-submenu
                    :key=childkey
                    :index="key+1+'-'+childkey"
                    v-if="!child.hidden"
                    @click.native="goview((child.children)?'':child.name)">
                    <template slot="title">
                      <span>{{child.name}}</span>
                    </template>
                    <el-menu-item
                      v-for="(grandson,grandsonkey) in child.children"
                      :key=grandsonkey
                      :index="key+1+'-'+childkey+'-'+grandsonkey"
                      @click.native="goview(grandson.name)">
                      <span>{{grandson.name}}</span>
                    </el-menu-item>
                  </el-submenu>
                </template>
                <template v-else>
                  <el-menu-item
                    :key="childkey"
                    :index="key+1+'-'+childkey"
                    v-if="!child.hidden"
                    @click.native="goview((child.children)?'':child.name)">
                    <template slot="title">
                      <span>{{child.name}}</span>
                    </template>
                  </el-menu-item>
                </template>
              </template>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-row>
    </div>
  </div>
</template>

<script>
import { routes } from '@/router'
export default {
  data () {
    return {
      routesArr: [],
      fullPath: '',
      linkName: [],
      isCollapse: true
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log('open ' + key)
    },
    handleClose (key, keyPath) {
      console.log('close ' + key + ' ' + keyPath)
    },
    init () {
      this.routesArr = routes.filter(item => item.hidden !== true)
      this.fullPath = '/' + this.$route.fullPath.split('/')[1]
      console.log('chufa in aside')
    },
    goview (name) {
      if (name !== '') {
        this.linkName = []
        this.routesArr.forEach(item => {
          item.meta.active = false
          if (item.children) {
            item.children.forEach(child => {
              child.meta.active = false
              if (child.children) {
                child.children.forEach(grandson => {
                  grandson.meta.active = false
                })
              }
            })
          }
        })
        this.$router.push({ name }).catch(err => {
          err && console.log('刷新') // 待优化
        })
      }
    },
    leave (item, key) {
      if (this.$route.fullpath !== item.path) {
        this.routesArr[key].meta.active = false
      }
      console.log('leave' + this.routesArr)
    },
    handleCommand (obj) {
      const name = obj.value.name
      this.goview(name)
      this.linkName[obj.key] = name
      this.routesArr[obj.key].meta.active = true
    }
  },
  created () {
    // this.init()
  },
  watch: {
    $route: {
      handler (newVal) {
        if (newVal) {
          this.init()
        }
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
  *{
    font-size: 22px;
  }
  .container {
  }
  .tac {
    height: 100vh;
    background-color: RGB(35,39,61);
  }
  .el-menu {
    border: none;
  }
  .el-menu-item{
    font-size: 14px;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 100%;
    min-height: 965px;
  }
  .el-menu-vertical-demo {
    width: 100%;
  }
  .el-submenu .el-menu-item {
    min-width: 100%;
    margin-bottom: 10px;
  }
  .hiddenDropdown,
  .hiddenDropname {
    display: none;
  }
  .logo-image{
    height: 60px;
    padding-top: 30px;
    text-align: center;
    background-color: RGB(25, 26, 44);
  }
  .logo-image img {
    height: 40px;
  }
  .logo-name {
    font-size: 26px;
    margin: auto 20px auto 0;
  }
  .main-menu{
    text-align: center;
    margin-top: 40px;
  }
  .icon {
  }
  .menu-title {
    color: white;
    text-align: center;
    padding-right: 20px;
  }
</style>

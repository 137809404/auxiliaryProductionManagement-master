<template>
  <div style="height: 95%; overflow-y: auto; overflow-x: hidden">
    <el-row type="flex" :gutter="0" style="padding-left: 20px">
      <el-col :span="4">
        <h2 class="subtitle" style="margin-top: 20px; margin-left: 5px">
          <el-button type="text" @click="goback"><i class="el-icon-back subtitle"></i></el-button>
          通知内容
        </h2>
      </el-col>
      <el-col :span="20">
        <div style="padding: 20px 20px 15px 0px;float: right">
          <el-button class="el-blue-button" @click="downloadNoticeDox"><i class="el-icon-document"></i>&nbsp;导出</el-button>
        </div>
      </el-col>
    </el-row>
    <hr style="border-bottom: none;border-color: #8c939d"/>
    <el-row type="flex" justify="space-around">
      <el-col :span="6" >
        <h2> {{notice.title}}</h2>
      </el-col>
    </el-row>
    <el-row type="flex" justify="end">
      <el-col :span="6" >
        <span style="color: #d3dce6">发布时间：{{notice.date}}</span>
      </el-col>
    </el-row>
    <el-row style="height:65vh;overflow-y: auto">
      <el-row type="flex" justify="space-around" style="margin-top: 20px">
        <el-col :span="16" >
          <div class="pre-line" style="font-size: 20px" v-html="notice.content"></div>
        </el-col>
      </el-row>
      <el-row type="flex" justify="space-around" style="margin-top: 30px">
        <el-col :span="16" v-if="havePic">
          <el-carousel :interval="4000" type="card">
            <el-carousel-item v-for="file in notice.files" :key="file.name" @click="handlePictureCardPreview(file.url)">
              <el-image style="width: 100%; height: 100%" fit="fill" v-if="matchType(file.name)==='image'" :src="file.url"></el-image>
            </el-carousel-item>
          </el-carousel>
          <span v-for="file in notice.files" :key="file.url" style="margin-right: 10px;">
            <el-checkbox v-if="matchType(file.name)!='image'" v-model="file.checked" border style="margin-top: 10px">
              {{file.name}}
            </el-checkbox>
          </span>
          <el-button v-if="haveAttachment" class="el-blue-button" @click="downloadFiles"  size="small" style="margin-left: 20px">下载附件</el-button>
        </el-col>
      </el-row>
    </el-row>
  </div>
</template>

<script>
import { baseURL } from '@/config/baseConfig'
import request from '@/network/request'

export default {
  name: 'showNotice',
  data () {
    return {
      noticeId: this.$route.query.data,
      dialogImageUrl: '',
      dialogVisible: false,
      notice: {
        id: 1,
        title: '',
        content: '',
        date: '',
        files: []
      },
      haveAttachment: false,
      havePic: false
    }
  },
  methods: {
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file
      this.dialogVisible = true
    },

    // 根据文件名后缀区分 文件类型
    /*
     * @param: fileName - 文件名称
     * @param: 数据返回 1) 无后缀匹配 - false
     * @param: 数据返回 2) 匹配图片 - image
     */
    matchType (fileName) {
      // 后缀获取
      var suffix = ''
      // 获取类型结果
      var result = ''
      try {
        var flieArr = fileName.split('.')
        suffix = flieArr[flieArr.length - 1]
      } catch (err) {
        suffix = ''
      }
      // fileName无后缀返回 false
      if (!suffix) {
        result = false
        return result
      }
      // 图片格式
      var imglist = ['png', 'jpg', 'jpeg', 'bmp', 'gif']
      // 进行图片匹配
      result = imglist.some(function (item) {
        return item === suffix
      })
      if (result) {
        result = 'image'
        return result
      };
      // 其他 文件类型
      result = 'other'
      return result
    },
    goback: function () {
      this.$router.back(-1)
    },
    downloadFiles () {
      this.notice.files.forEach(file => {
        this.downloadFile(file.url)
      })
    },
    downloadFile (url) {
      const iframe = document.createElement('iframe')
      iframe.style.display = 'none' // 防止影响页面
      iframe.style.height = 0 // 防止影响页面
      iframe.src = url
      document.body.appendChild(iframe) // 这一行必须，iframe挂在到dom树上才会发请求
      // 5分钟之后删除（onload方法对于下载链接不起作用）
      setTimeout(() => {
        iframe.remove()
      }, 5 * 60 * 1000)
    },
    downloadNoticeDox () {
      request({
        method: 'post',
        url: '/bulletin/printnotifications',
        params: {
          id: this.noticeId
        }
      }).then(res => {
        // 用创建‘a’的方式下载附件
        const link = document.createElement('a')
        link.style.display = 'false'
        link.href = baseURL + '/' + res.data.data.url
        console.log(link.href)
        link.click()
      })
    }
  },
  created () {
    request({
      method: 'get',
      url: '/bulletin/shownotification',
      params: {
        id: this.noticeId
      }
    }).then(res => {
      if (res.data != null) {
        this.notice = res.data.data
        this.notice.files.forEach((file) => {
          if (this.matchType(file.name) !== 'image') {
            this.haveAttachment = true
          }
          if (this.matchType(file.name) === 'image') {
            this.havePic = true
          }
          // Vue.set就不行
          this.$set(file, 'checked', false)
          file.url = baseURL + '/' + file.url
          // file:{name:'',url:'',checked:''}
        })
        console.log(this.notice)// 请求的返回体
      } else {
        console.log('未获取到数据')
      }
    }).catch((error) => {
      console.log(error)// 异常
    })
  }
}
</script>

<style scoped>
  .pre-line {
    white-space: pre-line;
  }
  >>>.el-carousel__container {
    position: relative;
    height: 40vh;
  }
</style>

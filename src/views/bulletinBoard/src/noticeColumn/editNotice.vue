<template>
  <div>
    <el-row type="flex" :gutter="0" style="padding-left: 20px">
      <el-col :span="4">
        <h2 class="subtitle" style="margin-top: 15px; margin-left: 5px">
          <el-button type="text" @click="goback"><i class="el-icon-back subtitle"></i></el-button>修改通知内容
        </h2>
      </el-col>
      <el-col :span="20" >
        <div style="padding: 20px 33px 0px 0px;float: right">
          <el-button class="el-green-button" @click="submitNewNotice"><i class="el-icon-search"></i>保存</el-button>
          <el-button class="el-red-button" @click="goback"><i class="el-icon-close"></i>&nbsp;取消</el-button>
        </div>
      </el-col>
    </el-row>
    <hr style="border-bottom: none;border-color: #8c939d"/>
    <el-row type="flex" :gutter="20" justify="space-around" style="margin-top: 20px;padding-bottom: 20px">
      <el-col :span="20">
        <el-form :model="newNotice"  label-width="150px">
          <el-form-item
            prop="title"
            label="标题:"
            :rules="[{ required: true, message: '标题不能为空', trigger: 'blur' }]"
          >
            <el-input v-model="newNotice.title"></el-input>
          </el-form-item>
          <el-form-item
            prop="date"
            label="发布时间："
            :rules="[{required: true, message: '请选择时间', trigger: 'blur'}]">
            <el-date-picker
              v-model="newNotice.date"
              type="date"
              placeholder="选择日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item
            prop="content"
            label="内容："
            :rules="[{required: true, message: '请输入内容', trigger: 'blur'}]">
            <el-input type="textarea" v-model="newNotice.content" :autosize="{ minRows:9, maxRows:9}"></el-input>
          </el-form-item>
          <el-form-item
            prop="content"
            label="附件：">
            <el-checkbox  v-for="file in newNotice.files" :key="file.name" v-model="file.checked" border>
              {{file.name}}
            </el-checkbox>
            <el-checkbox  v-for="file in uploadFiles" :key="file.name" v-model="file.checked" border>
              {{file.name}}
            </el-checkbox>
          </el-form-item>
          <el-upload
            style="display:inline-block"
            :show-file-list="false"
            :limit="5"
            class="upload-demo"
            action=""
            :on-change="fileChange"
            :auto-upload="false">
            <el-button class="el-blue-button" slot="trigger" size="small" style="margin-left: 100px">浏览</el-button>
          </el-upload>
          <el-button class="el-red-button" @click="delFiles"  size="small" style="margin-left: 20px">删除</el-button>
        </el-form>
      </el-col>
      <el-col :span="2"></el-col>
    </el-row>
  </div>
</template>

<script>

import request from '@/network/request'
import { baseURL } from '@/config/baseConfig'

export default {
  name: 'addNotice',
  data () {
    return {
      newNotice: {
        id: this.$route.query.data,
        title: '',
        content: '',
        date: '',
        files: []
      },
      uploadFiles: [],
      delfiles: []
    }
  },
  created () {
    request({
      method: 'get',
      url: '/bulletin/shownotification',
      params: {
        id: this.newNotice.id
      }
    }).then(res => {
      if (res.data != null) {
        this.newNotice = res.data.data
        this.newNotice.files.forEach((file) => {
          this.$set(file, 'checked', false)
          file.url = baseURL + '/' + file.url
        })
        console.log(this.notice)// 请求的返回体
      } else {
        console.log('未获取到数据')
      }
    }).catch((error) => {
      console.log(error)// 异常
    })

    // this.newNotice.content.replace(/\n/g, '<br>')
    console.log('编辑安全通知' +
      this.$route.query.data
    )
  },
  methods: {
    // 判断是否重复上传
    fileChange (file, fileList) {
      const existFile = fileList.slice(0, fileList.length - 1).find(f => f.name === file.name) || this.newNotice.files.slice(0, this.newNotice.files.length - 1).find(f => f.name === file.name)// 如果文件名重复
      if (existFile) {
        this.$message.error('当前文件已经存在!')
        fileList.pop()
      }
      this.uploadFiles = fileList
      console.log(this.uploadFiles)
    },
    delFiles () {
      console.log(this.newNotice.files)
      for (let i = this.newNotice.files.length - 1; i >= 0; i--) {
        if (this.newNotice.files[i].checked === true) {
          this.delfiles.push(this.newNotice.files[i].name)
          this.newNotice.files.splice(i, 1)
        }
      }
      // 这个不能用数组下标
      this.uploadFiles.forEach((file) => {
        if (file.checked === true) {
          this.uploadFiles.splice(this.uploadFiles.indexOf(file), 1)
        }
      })
    },
    /* 保存修改
    * 1. 修改内容
    * 2. 删除选中的文件
    * 3. 上传新的文件
    * */
    submitNewNotice () {
      // 更改内容
      const data = new FormData()
      data.append('id', this.newNotice.id)
      data.append('newtitle', this.newNotice.title)
      data.append('content', this.newNotice.content)
      data.append('newdate', this.newNotice.date)
      request({
        method: 'post',
        url: '/bulletin/updatenotifications',
        data: data
      }).then(res => {
        console.log(res)
        if (res.data.message === 'SUCCESS') {
          // 删除文件
          if (this.delfiles.length !== 0) {
            const fd0 = new FormData()
            fd0.append('id', this.newNotice.id)
            this.delfiles.forEach(item => {
              fd0.append('filename', item)
            })
            request({
              method: 'post',
              url: '/bulletin/deletenotificationfiles',
              data: fd0
            }).then(res => {
              console.log(res)
              if (res.data.message === 'SUCCESS') {

              } else {
                this.$message({
                  type: 'info',
                  message: '删除文件失败'
                })
              }
            }).catch((error) => {
              console.log(error)// 异常
            })
          }
          // 上传新的文件
          if (this.uploadFiles.length !== 0) {
            const fd1 = new FormData()
            fd1.append('id', this.newNotice.id)
            this.uploadFiles.forEach(item => {
              fd1.append('files', item.raw)
            })
            request({
              method: 'post',
              url: '/bulletin/uploadnotificationfiles',
              data: fd1
            }).then(res => {
              console.log(res)
              if (res.data.message === 'SUCCESS') {

              } else {
                this.$message({
                  type: 'info',
                  message: '上传失败，请重新尝试'
                })
              }
            }).catch((error) => {
              console.log(error)// 异常
            })
          }
          this.$message.success('修改成功')
          this.goview('通知栏')
        } else {
          this.$message.error('修改失败')
        }
      }).catch((error) => {
        console.log(error)// 异常
      })
    },
    handleRemove (file, fileList) {
      // 上传的文件列表中最后一个文件为空对象
      console.log(file, fileList)
      // 直接改变数组中的值，Vue检测不到
      this.Vue.files.splice(file.index, 1)
    },
    successUpload (response, file, fileList) {
      console.log(response, file, fileList)
      this.newNotice.files.push(file)
    },
    handlePreview (file) {
      console.log(file)
    },
    uploadSectionFile () {},
    goback: function () {
      this.$router.back(-1)
    },
    goview (name) {
      this.$router.push({ name }).catch(err => {
        err && console.log('刷新') // 待优化
      })
    }
  }
}
</script>

<style scoped>

</style>

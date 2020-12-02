<template>
  <div>
    <el-row type="flex" :gutter="20" style="padding-left: 20px">
      <el-col :span="4">
        <h2 class="subtitle" style="margin-top: 15px; margin-left: 0px">
          <el-button type="text" @click="goback"><i class="el-icon-back subtitle"></i></el-button>新增安全专栏内容
        </h2>
      </el-col>
      <el-col :span="20">
        <div style="padding: 20px 33px 0px 0px;float: right">
          <el-button class="el-blue-button" @click="addSafetycolumn"><i class="el-icon-search"></i>保存</el-button>
          <el-button class="el-blue-button" @click="goback"><i class="el-icon-plus"></i>&nbsp;取消</el-button>
        </div>
      </el-col>
    </el-row>
    <hr style="border-bottom: none;border-color: #8c939d"/>
    <el-row type="flex" :gutter="20" justify="space-around" style="margin-top: 20px;padding-bottom: 20px">
      <el-col  :span="20">
        <el-form v-model="newSecurityNotice"  label-width="100px">
          <el-form-item
            prop="title"
            label="标题:"
            :rules="[{ required: true, message: '标题不能为空', trigger: 'blur' }]">
            <el-input v-model="newSecurityNotice.title"></el-input>
          </el-form-item>
          <el-form-item
            prop="date"
            label="发布时间："
            :rules="[{required: true, message: '请选择时间', trigger: 'blur'}]">
            <el-date-picker
              v-model="newSecurityNotice.date"
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
            <el-input type="textarea" v-model="newSecurityNotice.content" :autosize="{ minRows:10, maxRows:20}"></el-input>
          </el-form-item>
          <el-form-item
            prop="content"
            label="附件：">
            <el-checkbox  v-for="file in newSecurityNotice.files" :key="file.name" v-model="file.checked" border><!--
              <el-image src='https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg' style="width: 100px;height: 100px"></el-image>-->
              {{file.name}}
            </el-checkbox>
          </el-form-item>
          <el-upload
            style="display:inline-block"
            :show-file-list="false"
            :limit="5"
            ref="upload"
            action=""
            :on-change="fileChange"
            :auto-upload="false">
            <el-button class="el-blue-button" slot="trigger" size="small" style="margin-left: 100px">浏览</el-button>
            <!--              <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>-->
          </el-upload>
          <el-button class="el-blue-button" @click="delFiles"  size="small" style="margin-left: 20px">删除</el-button>
        </el-form>
      </el-col>
      <el-col :span="2"></el-col>
    </el-row>
  </div>
</template>

<script>

import request from '@/network/request'

export default {
  name: 'addSecurityNotice',
  data () {
    return {
      newSecurityNotice: {
        title: '',
        content: '',
        date: '',
        files: []
      }
    }
  },
  created () {
    console.log(
      this.$route.query.data
    )
  },
  mounted () {
  },
  methods: {
    addSafetycolumn () {
      const fd = new FormData()
      fd.append('title', this.newSecurityNotice.title)
      fd.append('content', this.newSecurityNotice.content)
      fd.append('timestamp', this.newSecurityNotice.date)
      this.newSecurityNotice.files.forEach(item => {
        fd.append('files', item.raw)
        console.log(item.raw)
      })
      request({
        method: 'post',
        url: '/bulletin/addsafetycolumn',
        data: fd
      }).then(res => {
        console.log(res)
        if (res.data.data === '添加成功') {
          this.$confirm('是否继续添加新通知？', '添加成功', {
            distinguishCancelAndClose: true,
            confirmButtonText: '继续添加',
            cancelButtonText: '放弃并返回'
          })
            .then(() => {
              this.$message({
                type: 'info',
                message: '继续添加'
              })
            })
            .catch(action => {
              if (action === 'cancel') {
                this.$router.back(-1)
              }
            })
        }
      }).catch((error) => {
        console.log(error)// 异常
      })
    },
    // 判断是否重复上传
    fileChange (file, fileList) {
      const existFile = fileList.slice(0, fileList.length - 1).find(f => f.name === file.name)// 如果文件名重复
      if (existFile) {
        this.$message.error('当前文件已经存在!')
        fileList.pop()
      }
      this.newSecurityNotice.files = fileList
    },
    // 批量删除，分别调用
    delFiles () {
      this.newSecurityNotice.files.forEach((file) => {
        if (file.checked === true) {
          this.newSecurityNotice.files.splice(this.newSecurityNotice.files.indexOf(file), 1)
          // this.newSecurityNotice.files.splice(this.newSecurityNotice.files.indexOf(file), 1)
          // this.removeFile(file, this.newSecurityNotice.files)
        }
      })
    },
    goback: function () {
      console.log('huitui')
      this.$router.back(-1)
    }
  }
}
</script>

<style scoped>

</style>

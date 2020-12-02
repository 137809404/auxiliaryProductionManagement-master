<template>
  <div>
  <div>
    <el-row type="flex" :gutter="0" style="padding-left: 20px;justify-content: space-between">
      <el-col :span="4">
        <h2 class="subtitle" style="margin-top: 15px; margin-left: 5px">
          <el-button type="text" @click="goback"><i class="el-icon-back subtitle"></i></el-button>修改内容
        </h2>
      </el-col>
      <el-col span="20">
        <el-button  style="float: right;margin-right: 50px;margin-top: 20px" class="el-blue-button" @click="submitChange(formLabelAlign)">提交</el-button>
      </el-col>
    </el-row>
    <hr style="border-bottom: none;border-color: #8c939d"/>
    <div class="content-div">
      <el-form :label-position="'right'" label-width="80px" :model="formLabelAlign">
        <el-form-item label-width="0px">
          <el-col :span="15">
            <el-form-item label="标题" required>
              <el-input v-model="formLabelAlign.title"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2"></el-col>
          <el-col :span="8">
            <el-form-item label="时间" required>
              <el-date-picker type="date" placeholder="选择日期" v-model="formLabelAlign.timestamp" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="内容" required>
          <el-input type="textarea" v-model="formLabelAlign.content"></el-input>
        </el-form-item>
        <el-form-item label="附件">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-change="handleChange"
            :file-list="fileList"
            :auto-upload="false"
            list-type="picture-card">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
      </el-form>
    </div>
  </div>
  <el-dialog :visible.sync="dialogVisible">
    <el-image :src="dialogImageUrl"></el-image>
  </el-dialog>
  </div>
</template>

<script>
import { baseURL } from '@/config/baseConfig'
import request from '@/network/request'

export default {
  name: 'editDemeanor',
  data () {
    return {
      baseUrl: baseURL,
      dialogImageUrl: '',
      dialogVisible: false,
      formLabelAlign: {
        id: -1,
        title: '',
        timestamp: '',
        content: '',
        imgs: []
      },
      deleteFiles: [],
      fileList: []
    }
  },
  methods: {
    handleRemove (file) {
      console.log(file)
      this.deleteFiles.push(file.name)
      this.fileList.splice(this.fileList.indexOf(file), 1)
    },
    handleChange (file) {
      this.fileList.push(file)
    },
    handlePreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    goback: function () {
      console.log('huitui')
      this.$router.back(-1)
    },
    submitChange (form) {
      request({
        method: 'post',
        url: `/bulletin/editstaffmoment?id=${form.id}&timestamp=${this.formatDate(new Date(form.timestamp), 'yyyy-MM-dd hh:mm:ss')}&content=${form.content}&title=${form.title}`
      }).then(res => {
        console.log(this.deleteFiles)
        // for (var i = 0, len = this.deleteFiles.length; i < len; i++) {
        //   filenames.push(this.deleteFiles[i].name)
        // }
        request({
          method: 'post',
          url: `/bulletin/deletestaffmomentpic?id=${form.id}&filename=${this.deleteFiles}`
        }).then(res => {
          // eslint-disable-next-line handle-callback-err
        }, error => {
          this.$message.error('修改失败')
        })
        const fd = new FormData()
        fd.append('id', form.id)
        for (var j = 0, len1 = this.fileList.length; j < len1; j++) {
          fd.append('files', this.fileList[j].raw)
        }
        request({
          method: 'post',
          url: '/bulletin/uploadstaffmomentpic',
          data: fd
        }).then(res => {
          // eslint-disable-next-line handle-callback-err
        }, error => {
          this.$message.error('修改失败')
        })
        this.$message.success('修改成功')
        // eslint-disable-next-line handle-callback-err
      }, error => {
        this.$message.error('修改失败')
      })
      this.goview('员工风采')
    },
    formatDate (date, fmt) {
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      const o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
      }
      for (const k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
          const str = o[k] + ''
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : this.padLeftZero(str))
        }
      }
      return fmt
    },
    padLeftZero (str) {
      return ('00' + str).substr(str.length)
    },
    goview (name) {
      this.$router.push({ name }).catch(err => {
        err && console.log('刷新') // 待优化
      })
    }
  },
  created () {
    this.formLabelAlign = this.$route.query.data
    this.fileList = []
    for (var i = 0, len = this.formLabelAlign.imgs.length; i < len; i++) {
      this.fileList.push({
        name: this.formLabelAlign.imgs[i].name,
        url: this.baseUrl + '/' + this.formLabelAlign.imgs[i].imgurl
      })
    }
  }
}
</script>

<style scoped>
.content-div {
  margin: 20px auto;
  width: 80%;
}
.el-form-item /deep/ textarea {
  background-color: transparent;
}
.el-form /deep/ label {
  color: white;
}
.el-form /deep/ .el-input__inner {
  color: white;
}
.el-form /deep/ .el-textarea__inner {
  color: white;
  width: 95%;
  min-height: 240px !important;
}
.el-form /deep/ div {
  color: white;
}
.el-form /deep/ .el-upload-list__item-name {
  color: white;
}
.el-form /deep/ .el-upload--picture-card {
  background-color: transparent;
}
</style>

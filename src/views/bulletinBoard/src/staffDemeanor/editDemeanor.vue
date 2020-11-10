<template>
  <div>
  <div>
    <div>
      <el-button class="el-blue-button" @click="goback()">返回上级</el-button>
    </div>
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
            :file-list="this.formLabelAlign.files"
            :auto-upload="false"
            list-type="picture-card">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button class="el-blue-button" type="primary" @click="submitChange(formLabelAlign)">提交</el-button>
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
import request from '@/network/request'

export default {
  name: 'editDemeanor',
  create () {
    this.formLabelAlign = this.$route.query.data
    console.log(this.formLabelAlign)
  },
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      formLabelAlign: {},
      deleteFiles: []
    }
  },
  methods: {
    handleRemove (file) {
      console.log(file)
      this.deleteFiles.push(file.name)
      this.formLabelAlign.files.splice(this.formLabelAlign.files.indexOf(file), 1)
    },
    handleChange (file) {
      this.formLabelAlign.files.push(file)
      console.log(this.formLabelAlign.files)
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
        for (var j = 0, len1 = this.formLabelAlign.files.length; j < len1; j++) {
          fd.append('files', this.formLabelAlign.files[j].raw)
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
    }
  }
}
</script>

<style scoped>

</style>

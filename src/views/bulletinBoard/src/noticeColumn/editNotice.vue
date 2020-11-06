<template>
  <div>
    <el-row type="flex" :gutter="20" style="padding-left: 20px">
      <el-button type="text" @click="goback"><i class="el-icon-back" style="color: white;font-size: xx-large"></i></el-button>
      <h2 style="margin-top: 20px; margin-left: 5px">修改通知内容</h2>
    </el-row>
    <el-row type="flex" :gutter="20" justify="space-around" style="margin-top: 50px">
      <el-col  :span="18">
        <el-form :model="newNotice"  label-width="100px">
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
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item
            prop="content"
            label="内容："
            :rules="[{required: true, message: '请输入内容', trigger: 'blur'}]">
            <el-input type="textarea" v-model="newNotice.content" :autosize="{ minRows:10, maxRows:20}"></el-input>
          </el-form-item>
          <el-form-item
            prop="content"
            label="附件：">
            <el-checkbox  v-for="file in newNotice.files" :key="file.name" v-model="file.checked" border><!--
              <el-image src='https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg' style="width: 100px;height: 100px"></el-image>-->
              {{file.name}}
            </el-checkbox>
          </el-form-item>
          <el-upload
            style="display:inline-block"
            :show-file-list="false"
            :limit="5"
            class="upload-demo"
            ref="upload"
            :action="location"
            :file-list="newNotice.files"
            :auto-upload="true"
            :before-remove="handleRemove"
            :on-success="successUpload">
            <el-button class="el-blue-button" slot="trigger" size="small" style="margin-left: 100px">浏览</el-button>
            <!--              <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>-->
          </el-upload>
          <el-button class="el-blue-button" @click="delFiles"  size="small" style="margin-left: 20px">删除</el-button>
        </el-form>
      </el-col>
      <el-col :span="4">
        <el-button class="el-blue-button"><i class="el-icon-search"></i>保存</el-button>
        <el-button class="el-blue-button" @click="goback"><i class="el-icon-plus"></i>&nbsp;取消</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  name: 'addNotice',
  data () {
    return {
      newNotice: {
        id: 1,
        title: '',
        content: '',
        date: '',
        files: []
      },
      delfiles: [],
      location: '',
      uploadUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    }
  },
  created () {
    // 不能直接在data上获取另一个data拼接修改
    this.location = 'http://202.199.6.45:8080/bulletin/uploadnotificationfiles?id=' + this.newNotice.id
    console.log(
      this.$route.query.data
    )
  },
  mounted () {
  },
  methods: {
    delFiles () {
      this.files.forEach((file) => {
        // if (file.checked === true) { this.files.splice(this.files.indexOf(file), 1) }
        if (file.checked === true) { this.delfiles.push(file.filename) }
        this.$axios.get('/bulletin/deletenotificationfiles', {
          params: {
            files: this.delfiles,
            id: this.noticeId
          }
        })
          .then((response) => {
            console.log(response.data)// 请求的返回体
            this.title = response.data.title
            this.date = response.data.date
            this.content = response.data.content
            this.files = response.data.files
          })
          .catch((error) => {
            console.log(error)// 异常
          })
      })
    },
    submitUpload () {
      this.$refs.upload.submit()
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
      console.log('huitui')
      this.$router.back(-1)
    }
  }
}
</script>

<style scoped>

</style>

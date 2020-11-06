<template>
  <div>
    <el-row type="flex" :gutter="20" style="padding-left: 20px">
      <el-button type="text" @click="goback"><i class="el-icon-back" style="color: white;font-size: xx-large"></i></el-button>
      <h2 style="margin-top: 23px; margin-left: 5px">新增通知内容</h2>
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
              placeholder="选择日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd">
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
            action="http://202.199.6.45:8080/bulletin/uploadnotificationfiles?id=20"
            :file-list="newNotice.files"
            :auto-upload="true"
            :on-remove="handleRemove"
            :on-success="successUpload"
            :on-error="errorUpload">
            <el-button class="el-blue-button" slot="trigger" size="small" style="margin-left: 100px">浏览</el-button>
            <!--              <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>-->
          </el-upload>
          <el-button class="el-blue-button" @click="delFiles"  size="small" style="margin-left: 20px">删除</el-button>
        </el-form>
      </el-col>
      <el-col :span="4">
        <el-button class="el-blue-button" @click="addNotice"><i class="el-icon-search"></i>保存</el-button>
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
        files: [
          {
            name: '防止人身死亡.pdf',
            url: 'http://futest.sctsjkj.com/template/消防火警联网部件设施数据表.xlsx',
            checked: false
          },
          {
            name: '防止人身死亡.doc',
            url: 'http://futest.sctsjkj.com/template/消防火警联网部件设施数据表.xlsx',
            checked: false
          },
          {
            name: '防止人身死亡.xls',
            url: 'http://futest.sctsjkj.com/template/消防火警联网部件设施数据表.xlsx',
            checked: false
          }]
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
    addNotice () {
      this.$axios.get('/bulletin/deletenotificationfiles', {
        params: {
          title: this.newNotice.title,
          date: this.newNotice.date,
          content: this.newNotice.content
        }
      })
        .then((response) => {
          console.log(response.data)// 请求的返回体
          // 若创建通知成功再上传附件
          this.submitUpload()
        })
        .catch((error) => {
          console.log(error)// 异常
        })
    },
    delFiles () {
      this.files.forEach((file) => {
        if (file.checked === true) { this.files.splice(this.files.indexOf(file), 1) }
      })
    },
    submitUpload () {
      this.$refs.upload.submit()
    },
    handleRemove (file, fileList) {
      // 上传的文件列表中最后一个文件为空对象
      console.log(file, fileList)
      this.$axios.get('/bulletin/deletenotificationfiles', {
        params: {
          filename: file.filename,
          id: this.newNotice.id
        }
      })
        .then((response) => {
          console.log(response.data)// 请求的返回体
          // 直接改变数组中的值，Vue检测不到
          this.Vue.files.splice(file.index, 1)
        })
        .catch((error) => {
          console.log(error)// 异常
        })
    },
    successUpload (response, file, fileList) {
      console.log(response, file, fileList)
      this.newNotice.files.push(file)
    },
    errorUpload (err, file, fileList) {
      alert('传失败了')
      console.log(err, file, fileList)
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

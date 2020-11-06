<template>
  <div>
    <div class="sub-title">
      编辑一次系统图
    </div>
    <el-row type="flex" justify="space-between" :gutter="20">
      <el-form :inline="true" :model="queryCondition" class="demo-form-inline">
        <el-col :span="24">
          <el-form-item label="编辑一次系统l图">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              list-type="picture"
              limit="1">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
            <el-col :span="24">
              <el-form-item>
                <el-button class="el-blue-button" type="primary" @click="submitForm('farmName')">提交</el-button>
              </el-form-item>
            </el-col>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'editFarm',
  data () {
    return {
      queryCondition: {
        farmName: ''
      },
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: [{ name: 'happy', url: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg' }]
    }
  },
  methods: {
    handleRemove (file) {
      console.log(file)
    },
    handlePreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <div>
    <el-row type="flex" :gutter="20" style="padding-left: 20px; padding-top: 10px; margin-bottom: 9px">
      <el-col :span="1">
        <el-button type="text" @click="goback"><i class="el-icon-back" style="color: white;font-size: xx-large"></i></el-button>
      </el-col>
      <el-col :span="3">
        <h2 style="margin-top: 12px;margin-left: -25px">新增一次系统图</h2>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-between" :gutter="20">
      <el-form :inline="true" :model="queryCondition" class="demo-form-inline">
        <el-form-item label="风场：" required>
          <el-select v-model="queryCondition.farmName" placeholder="————请选择————">
            <el-option label="五兔山风电场" value="one"></el-option>
            <el-option label="灯角楼风电场" value="two"></el-option>
            <el-option label="外罗二期风电场" value="three"></el-option>
            <el-option label="新寮海上风电场" value="four"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="陆上/海上：" required>
          <el-select v-model="queryCondition.landOrSea" placeholder="————请选择————">
            <el-option label="陆上风电场" value="one"></el-option>
            <el-option label="海上风电场" value="two"></el-option>
          </el-select>
        </el-form-item>
        <el-col :span="24">
          <el-form-item label="附件" required>
            <el-upload
              class="upload-demo"
              action="http://202.199.6.45:8080/bulletin/addshowcase"
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
  name: 'addFarm',
  data () {
    return {
      queryCondition: {
        farmName: '',
        landOrSea: ''
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

<template>
  <div>
    <el-row type="flex" style="padding-left: 20px">
      <el-button type="text" @click="goback"><i class="el-icon-back subtitle"></i></el-button>
      <h2 class="subtitle" style="margin-top: 20px; margin-left: 5px">编辑{{this.editedFarm.farmName}}一次系统图</h2>
      <el-col :span="16"></el-col>
      <el-col :span="2">
        <div style="padding: 20px 0px 15px 0px">
          <el-button class="el-blue-button" type="primary" @click="submitFarm()">提交</el-button>
        </div>
      </el-col>
    </el-row>
    <hr style="border-bottom: none;border-color: #8c939d"/>
    <el-row type="flex" justify="space-between" :gutter="20" style="margin-top: 5vh">
      <el-col>
        <el-form :inline="true" :model="editedFarm" class="demo-form-inline">
          <el-col :span="18" :offset="5">
            <el-form-item>
              <el-upload
                class="avatar-uploader"
                action=""
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :on-change="fileChange"
                :auto-upload=false
                list-type="picture"
                :limit="1">
                <el-image
                  v-if="imageUrl"
                  style="width:90vh; height: 65vh"
                  :src="imageUrl"
                  fit="fill"></el-image>
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
<!--              <el-upload-->
<!--                class="upload-demo"-->
<!--                :auto-upload=false-->
<!--                action=""-->
<!--                :on-preview="handlePreview"-->
<!--                :on-remove="handleRemove"-->
<!--                :on-change="fileChange"-->
<!--                list-type="picture"-->
<!--                :limit="1">-->
<!--                <el-button class="el-blue-button" size="small" type="primary">点击上传</el-button>-->
<!--              </el-upload>-->
            </el-form-item>
          </el-col>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import request from '@/network/request'
import { baseURL } from '@/config/baseConfig'
export default {
  name: 'editFarm',
  data () {
    return {
      editedFarm: {
        farmId: '',
        farmName: '',
        farmType: '',
        pic: []
      },
      // queryCondition: {
      //   farmId: '',
      //   farmName: '',
      //   farmType: ''
      // },
      imageUrl: ''
    }
  },
  inject: ['reload'],
  created () {
    this.editedFarm.farmId = this.$route.query.data
    var that = this
    request({
      method: 'get',
      url: '/bulletin/getshowcase',
      params: {
        id: this.editedFarm.farmId
      }
    }).then(res => {
      that.editedFarm.farmName = res.data.data.name
      that.editedFarm.farmType = res.data.data.type
      that.imageUrl = baseURL + '/' + res.data.data.imgurl
    }).catch((error) => {
      console.log(error)// 异常
    })
  },
  methods: {
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    fileChange (file, fileList) {
      console.log(fileList)
      this.editedFarm.pic = fileList
      this.imageUrl = file.url
    },
    goback: function () {
      console.log('huitui')
      this.$router.back(-1)
    },
    submitFarm () {
      console.log(this.editedFarm.pic.length)
      if (this.editedFarm.pic.length === 0) {
        this.$message({
          type: 'info',
          message: '修改成功'
        })
        this.$router.back(-1)
        return
      }
      const fd = new FormData()
      fd.append('name', this.editedFarm.farmName)
      fd.append('type', this.editedFarm.farmType)
      this.editedFarm.pic.forEach(item => {
        fd.append('pic', item.raw)
      })
      console.log('editedFarm.pic')
      console.log(this.editedFarm.pic)
      request({
        method: 'post',
        url: '/bulletin/addshowcase',
        data: fd
      }).then(res => {
        if (res.data.message === 'SUCCESS') {
          this.$message({
            type: 'info',
            message: '修改成功'
          })
          this.$router.back(-1)
        }
      }).catch((error) => {
        console.log(error)// 异常
      })
    }
  }
}
</script>

<style scoped>
  .avatar-uploader .el-upload {
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

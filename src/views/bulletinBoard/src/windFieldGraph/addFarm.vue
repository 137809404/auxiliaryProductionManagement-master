<template>
  <div>
    <el-row type="flex" style="padding-left: 20px;">
      <el-col :span="3">
        <h2 class="subtitle" style="margin-top: 23px; margin-left: 5px">
          <el-button type="text" @click="goback"><i class="el-icon-back subtitle"></i></el-button>
          新建
        </h2>
      </el-col>
      <el-col :span="20" style="margin-left: 5vw">
        <el-form :inline="true" :model="editedFarm" class="demo-form-inline" style="margin-top: 20px">
          <el-form-item label="风场：" required>
            <el-select
              v-model="editedFarm.farmName"
              filterable
              allow-create
              placeholder="———请选择/输入———">
              <el-option :label="farm.name" :value="farm.name" v-for="farm in leftFarms" :key="farm.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="margin-left: 3vw" required>
            <el-radio v-model="editedFarm.type" :label="1">陆上风场</el-radio>
            <el-radio v-model="editedFarm.type" :label="2">海上风场</el-radio>
          </el-form-item>
          <el-form-item style="margin-left: 3vw" required>
            <el-upload
              class="upload-demo"
              ref="my-upload"
              :auto-upload=false
              action=""
              :show-file-list=false
              :on-remove="handleRemove"
              :on-change="fileChange"
              list-type="picture">
              <el-button class="el-blue-button" size="small" type="primary">选择风场图</el-button>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <div>
                <el-image  style="width: 47vw; height: 50vh" fit="fill" :src="dialogImageUrl" alt="">

                </el-image>
              </div>
            </el-dialog>
            <el-col :span="24">
            </el-col>
          </el-form-item>
          <el-button class="el-green-button" type="primary" style="float: right;margin-right: 20px" @click="addFarm()">提交</el-button>
        </el-form>
      </el-col>
    </el-row>
    <hr style="border-bottom: none;border-color: #8c939d"/>
    <el-row type="flex" justify="space-around" style="margin-top: 40px">
      <el-col :span="20" :offset="2">
        <el-image  style="width: 65vw; height: 65vh" fit="fill" :src="ImageUrl" alt="">
          <div slot="error" class="image-slot">
          </div>
        </el-image>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import request from '@/network/request'
export default {
  name: 'addFarm',
  data () {
    return {
      editedFarm: {
        farmName: '',
        type: '1',
        pic: []
      },
      ImageUrl: '',
      dialogImageUrl: '',
      dialogVisible: false,
      leftFarms: []
    }
  },
  inject: ['reload'],
  created () {
    request({
      method: 'post',
      url: '/bulletin/getleftplants',
      params: {
      }
    }).then(res => {
      // console.log(res)
      // console.log(res.data.data)
      this.leftFarms = res.data.data
      // console.log(this.leftFarms)
    }).catch((error) => {
      console.log(error)// 异常
    })
  },
  methods: {
    addFarm () {
      if (this.editedFarm.farmName === '') {
        this.$message.error('风场名不可为空')
        return
      }
      const fd = new FormData()
      fd.append('name', this.editedFarm.farmName)
      fd.append('type', this.editedFarm.type)
      // if (typeof (this.editedFarm.pic.raw) === 'undefined') {
      //   console.log('没图')
      //   fd.append('pic', '')
      // } else {
      //   console.log('有图')
      //   fd.append('pic', this.editedFarm.pic.raw)
      //   console.log(typeof (this.editedFarm.pic.raw))
      // }
      this.editedFarm.pic.forEach(item => {
        fd.append('pic', item.raw)
      })
      // console.log('editedFarm.pic')
      // console.log(this.editedFarm.pic)
      request({
        method: 'post',
        url: '/bulletin/addshowcase',
        data: fd
      }).then(res => {
        if (res.data.message === 'SUCCESS') {
          this.$confirm('是否继续添加新风场？', '添加成功', {
            distinguishCancelAndClose: true,
            confirmButtonText: '继续添加',
            cancelButtonText: '放弃并返回'
          })
            .then(() => {
              this.reload()
              // this.$message({
              //   type: 'info',
              //   message: '继续添加'
              // })
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
    fileChange (file, fileList) {
      this.clearFiles()
      this.editedFarm.pic = fileList
      this.ImageUrl = fileList[0].url
      console.log(fileList[0].url)
    },
    handleRemove (file) {
      console.log(file)
    },
    clearFiles () {
      this.$refs['my-upload'].clearFiles()
    },
    goback: function () {
      console.log('huitui')
      this.$router.back(-1)
    }
  }
}
</script>

<style scoped>
  >>>.el-image__error, .el-image__placeholder {
    background:rgb(35, 40, 61)!important;
  }

</style>

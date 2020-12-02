<template>
  <div>
    <el-row type="flex" :gutter="20" style="padding-left: 20px;">
      <el-col :span="4">
        <h2 class="subtitle" style="margin-top: 23px; margin-left: 5px">集控人员组织架构</h2>
      </el-col>
      <el-col :span="19">
      </el-col>
      <el-col :span="1">
        <div style="padding: 20px 33px 15px 0">
          <el-button class="el-blue-button" @click="addEmployee" style="float: right"><i class="el-icon-plus"></i>&nbsp;新增</el-button>
        </div>
      </el-col>
    </el-row>
    <hr style="border-bottom: none;border-color: #8c939d"/>
    <el-row style="margin: 0 5vw">
      <el-table
        :data="users"
        style="width: 100%;">
        <el-table-column prop="name" label="人员姓名" align="center"></el-table-column>
        <el-table-column prop="position" label="职位" align="center">
          <template slot-scope="scope">
            <el-select class="class_select" v-model="scope.row.position" @change="positionChanged(scope.row)">
              <el-option
                v-for="item in positions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="人员状态" align="center">
          <template slot-scope="scope">
            <el-select class="class_select" v-model="scope.row.status" @change="statusChanged(scope.row)" :disabled="scope.row.status==='上班'?true:false">
              <el-option
                v-for="item in status"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button class="el-blue-button" size="mini" @click="editStaff(scope.row)">修改</el-button>
            <el-button class="el-red-button" size="mini" @click="deleteStaff(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top: 10px;float: right"
        @current-change="handleCurrentChange"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total=total>
      </el-pagination>
    </el-row>
    <el-dialog :visible.sync="addDialogForm" custom-class="classDialog-wrapper">
      <el-form :model="addform" :rules="rules" ref="addform">
        <div>
          <el-form-item label-width="120px" prop="name">
            <span slot="label" class="form-title">
              人员姓名
            </span>
            <el-input v-model="addform.name" style="width: 360px;"></el-input>
          </el-form-item>
          <el-form-item label-width="120px" prop="file">
            <span slot="label" class="form-title">
              附件
            </span>
            <el-upload
              class="upload-demo"
              :auto-upload=false
              action="#"
              ref="upload"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-change="fileChange"
              list-type="picture"
              :limit="1">
              <el-button class="el-blue-button" size="small" type="primary">点击上传</el-button>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
          <el-form-item label-width="120px" prop="position">
                <span slot="label" class="form-title">
                 职位
                </span>
            <el-select v-model="addform.position">
              <el-option
                v-for="item in positions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label-width="120px" prop="introduction">
                <span slot="label" class="form-title">
                  人员介绍
                </span>
            <el-input type = "textarea" v-model="addform.introduction" :autosize="{ minRows: 4, maxRows: 8}"></el-input>
          </el-form-item>
          <el-form-item label-width="120px" prop="resume">
                <span slot="label" class="form-title">
                  工作经历
                </span>
            <el-input type = "textarea" v-model="addform.resume" :autosize="{ minRows: 4, maxRows: 8}"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <div slot="title" style="font-size: 20px">
        添加信息
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button class="el-green-button" @click="submitForm" type="primary">保存</el-button>
        <el-button class="el-red-button" @click="addDialogForm = false" type="info">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import request from '@/network/request'

export default {
  name: 'index',
  data () {
    const form = {
      name: '',
      position: '集控中心经理',
      introduction: '',
      resume: '',
      file: []
    }
    return {
      form,
      dialogImageUrl: '',
      dialogVisible: false,
      pageSize: 0,
      total: 0,
      currentPage: 1,
      positions: [{
        value: '集控中心经理',
        label: '集控中心经理'
      }, {
        value: '总值长',
        label: '总值长'
      }, {
        value: '值长',
        label: '值长'
      }, {
        value: '值班员',
        label: '值班员'
      }],
      status: [{
        value: '上班',
        label: '上班',
        disabled: true
      }, {
        value: '休息',
        label: '休息'
      }, {
        value: '请假',
        label: '请假'
      }, {
        value: '风场',
        label: '风场'
      }, {
        value: '出差',
        label: '出差'
      }, {
        value: '加班',
        label: '加班'
      }],
      users: [],
      addDialogForm: false,
      addform: this.easyClone(form),
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        introduction: [
          { required: true, message: '请输入人员介绍', trigger: 'blur' }
        ],
        resume: [
          { required: true, message: '请输入工作经历', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.pageSize = Math.floor((window.innerHeight - 190) / 80)
    this.getAllEmployee(1)
  },
  methods: {
    getAllEmployee (pagenum) {
      request({
        method: 'post',
        url: '/crew/showcrewmem',
        params: {
          pageSize: this.pageSize,
          pagenum: pagenum
        }
      }).then((res) => {
        console.log(res.data.data)
        this.users = res.data.data.result
        this.total = res.data.data.totalrecords
      })
    },
    positionChanged (value) {
      this.$confirm('此操作将修改用户职位, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        request({
          method: 'post',
          url: '/crew/updatecrewmem',
          params: {
            id: value.id,
            position: value.position,
            name: value.name,
            introduction: value.introduction,
            resume: value.resume,
            status: value.status
          }
        }).then(res => {
          console.log(res)
          if (res.data.code === 200) {
            this.$message({
              type: 'success',
              message: '修改成功!'
            })
          } else {
            this.$message.error('修改失败!')
          }
        }).catch((error) => {
          console.log(error)// 异常
        })
      }).catch(() => {})
    },
    statusChanged (value) {
      this.$confirm('此操作将修改用户状态, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        request({
          method: 'post',
          url: '/crew/updatecrewmem',
          params: {
            id: value.id,
            position: value.position,
            name: value.name,
            introduction: value.introduction,
            resume: value.resume,
            status: value.status
          }
        }).then(res => {
          if (res.data.code === 200) {
            this.$message({
              type: 'success',
              message: '修改成功!'
            })
          } else {
            this.$message.error('修改失败!')
          }
        }).catch((error) => {
          console.log(error)// 异常
        })
      }).catch(() => {

      })
    },
    addEmployee () {
      console.log('新增用户')
      this.addform = this.easyClone(this.form)
      this.addDialogForm = true
      this.dialogImageUrl = ''
      this.$refs.upload.clearFiles()
      console.log(this.addform)
      console.log(this.dialogVisible)
    },
    fileChange (file, fileList) {
      this.addform.file = fileList
      console.log(this.addform.file)
    },
    handleRemove (file) {
      console.log(file)
    },
    handlePreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    deleteStaff (value) {
      console.log(value)
      this.$confirm('此操作将删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const that = this
        request({
          method: 'post',
          url: '/crew/deletecrewmem',
          params: {
            id: value.id
          }
        }).then(res => {
          if (res.data.code === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            request({
              method: 'post',
              url: '/crew/showcrewmem',
              params: {
                pageSize: 7,
                pagenum: that.currentPage
              }
            }).then((res) => {
              console.log(res.data.data)
              that.users = res.data.data.result
              that.total = res.data.data.totalrecords
            })
          } else {
            this.$message.error('删除失败!')
          }
        }).catch((error) => {
          console.log(error)// 异常
        })
      }).catch(() => {

      })
    },
    editStaff (value) {
      console.log(value)
      const that = this
      request({
        method: 'post',
        url: '/crew/getcrewmem',
        params: {
          id: value.id
        }
      }).then(res => {
        if (res.data.data.map.length !== 0) {
          that.$router.push({
            name: '个人资料修改',
            params: {
              id: value.id,
              name: value.name,
              introduction: value.introduction,
              resume: value.resume,
              filepath: res.data.data.map[0].url,
              position: value.position,
              status: value.status,
              filename: res.data.data.map[0].name
            }
          })
        } else {
          that.$router.push({
            name: '个人资料修改',
            params: {
              id: value.id,
              name: value.name,
              introduction: value.introduction,
              resume: value.resume,
              filepath: '',
              position: value.position,
              status: value.status,
              filename: ''
            }
          })
        }
      }).catch((error) => {
        console.log(error)// 异常
      })
    },
    submitForm () {
      console.log(this.addform)
      console.log(this.addform.file.length)
      const formData = new FormData()
      formData.append('name', this.addform.name)
      formData.append('position', this.addform.position)
      formData.append('introduction', this.addform.introduction)
      formData.append('resume', this.addform.resume)
      this.addform.file.forEach(item => {
        formData.append('file', item.raw)
      })
      const that = this
      request({
        method: 'post',
        url: '/crew/addcrewmem',
        data: formData
      }).then((res) => {
        console.log(res)
        if (res.status === 200) {
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          request({
            method: 'post',
            url: '/crew/showcrewmem',
            params: {
              pageSize: 7,
              pagenum: that.currentPage
            }
          }).then((res) => {
            console.log(res.data.data)
            that.users = res.data.data.result
            that.total = res.data.data.totalrecords
          })
          this.addDialogForm = false
          this.$refs.upload.clearFiles()
        } else {
          this.$message.error('添加失败!')
        }
      })
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getAllEmployee(val)
      // this.currentPage = val
      // request({
      //   method: 'post',
      //   url: '/crew/showcrewmem',
      //   params: {
      //     pageSize: 7,
      //     pagenum: val
      //   }
      // }).then((res) => {
      //   console.log(res.data.data)
      //   this.users = res.data.data.result
      //   this.total = res.data.data.totalrecords
      // })
    },
    /**
     * 通过JSON转换的方式进行简单的深克隆
     * 不支持属性中含有函数、正则，只支持标准JSON格式的对象
     * @param obj Object
     * @return Object
     */
    easyClone (obj) {
      return JSON.parse(JSON.stringify(obj))
    }
  }
}
</script>

<style scoped>
.classDialog-wrapper{
  position: relative;
  top: 60px;
  min-width: 820px;
  background-size:cover;
}

.classDialog-wrapper .el-dialog__body{
  height: 550px;
}

.el-textarea__inner,
.el-textarea {
  background-color: rgb(35, 39, 61);
}

.class_select input{
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
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
>>>.el-pagination__total, >>>.el-pagination__jump{
  color: white;
}
>>> .el-pagination span {
  font-size: 18px;
}
>>>.number{
  color: #dddddd;
}
</style>

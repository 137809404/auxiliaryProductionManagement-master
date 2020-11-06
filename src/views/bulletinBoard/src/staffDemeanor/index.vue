<template>
  <div>
    <div class="sub-title">员工风采</div>
    <div v-show="this.interfaceNow==='home'">
      <div>
        <div>
          <el-row  :gutter="20">
            <el-col :span="20">
              <el-form :inline="true" class="demo-form-inline">
                <el-form-item >
                  <div class="block">
                    <el-input v-model="input" placeholder="请输入内容"><el-button class="el-blue-button" @click="searchItem()" slot="append" icon="el-icon-search"></el-button></el-input>
                  </div>
                </el-form-item>
                <el-button class="el-blue-button" @click="interfaceNow='new';resetForm()"><i class="el-icon-plus"></i>&nbsp;新增</el-button>

              </el-form>
            </el-col>
          </el-row>
        </div>
      </div>
      <div style="width: 90%;margin: 10px auto;">
        <el-card v-for="item in staffDemeanorList" :key="item.id" class="box-card">
          <div class="staffCard" >
            <div class="miniPic"><el-image v-show="item.src!=''" :src="baseUrl+'/'+item.src"></el-image></div>
            <div class="briefText"><div>标题:{{item.title}}</div><span>{{item.content}}</span></div>
            <div class="operation">
              <el-button class="el-blue-button" type="primary" icon="el-icon-search" @click="chakan(item)"></el-button>
              <el-button class="el-blue-button" type="primary" icon="el-icon-edit" @click="edit(item)"></el-button>
              <el-popconfirm
                title="这是一段内容确定删除吗？" style="margin-left: 10px"
                @onConfirm="deleteStaffCard(item.id)"
              >
                <el-button  slot="reference" class="el-blue-button" type="primary" icon="el-icon-delete"></el-button>
              </el-popconfirm>

            </div>
          </div>
        </el-card>
      </div>
    </div>
    <div v-show="this.interfaceNow==='edit'">
      <div>
        <el-button class="el-blue-button" @click="turnBack('home')">返回上级</el-button>
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
              :file-list="fileList"
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
    <div v-show="this.interfaceNow==='new'">
      <div>
        <el-button class="el-blue-button" @click="turnBack('home')">返回上级</el-button>
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
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-change="handleChange"
              :file-list="fileList"
              :auto-upload="false"
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
          <el-form-item>
            <el-button class="el-blue-button" type="primary" @click="submitNew(formLabelAlign)">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible">
      <el-image :src="dialogImageUrl"></el-image>
    </el-dialog>
    <div v-show="this.interfaceNow==='chakan'">
      <div>
        <el-button class="el-blue-button" @click="turnBack('home')">返回上级</el-button>
      </div>
      <div class="content-div">
        <div class="topicDiv">
          标题：{{chakanItem.title}}
        </div>
        <div class="dateDiv">
          时间：{{chakanItem.date.slice(0,4)}}年{{chakanItem.date.slice(5,7)}}月{{chakanItem.date.slice(8,10)}}日
        </div>
        <div class="textDiv">
          <div>内容：</div>
          {{chakanItem.content}}
        </div>
        <div class="imageDiv">
          <el-image v-for="item in chakanItem.fileList" :key="item.id" class="activityImage" :src="item.url"></el-image>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import request from '@/network/request'
import { baseURL } from '@/config/baseConfig'
export default {
  name: 'index',
  data () {
    return {
      baseUrl: baseURL,
      input: '',
      interfaceNow: 'home',
      editID: 0,
      staffDemeanorList: [
      ],
      formLabelAlign: {
        id: -1,
        title: '',
        timestamp: '',
        content: ''
      },
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      fileList: [],
      chakanItem: {
        title: '',
        date: '',
        content: '',
        fileList: []
      },
      deleteFiles: []
    }
  },
  created () {
    this.getAllDemeanor()
    console.log(baseURL)
  },
  methods: {
    searchItem () {
      this.staffDemeanorList = []
      request({
        url: '/bulletin/showstaffmoment'
      }).then(res => {
        for (var i = 0, len = res.data.data.length; i < len; i++) {
          if (res.data.data[i].title.indexOf(this.input) !== -1) {
            this.staffDemeanorList.push(res.data.data[i])
          }
        }
        for (var j = 0, len1 = this.staffDemeanorList.length; j < len1; j++) {
          if (this.staffDemeanorList[j].imgs.length !== 0) {
            this.staffDemeanorList[j].src = this.staffDemeanorList[j].imgs[0].imgurl
          } else {
            this.staffDemeanorList[j].src = ''
          }
        }
        // eslint-disable-next-line handle-callback-err
      }, error => {
        console.log('error')
      })
    },
    resetForm () {
      this.formLabelAlign = {
        id: -1,
        title: '',
        timestamp: '',
        content: ''
      }
      this.fileList = []
      this.deleteFiles = []
    },
    getAllDemeanor () {
      request({
        url: '/bulletin/showstaffmoment'
      }).then(res => {
        this.staffDemeanorList = res.data.data
        for (var i = 0, len = this.staffDemeanorList.length; i < len; i++) {
          if (this.staffDemeanorList[i].imgs.length !== 0) {
            this.staffDemeanorList[i].src = this.staffDemeanorList[i].imgs[0].imgurl
          } else {
            this.staffDemeanorList[i].src = ''
          }
        }
        // eslint-disable-next-line handle-callback-err
      }, error => {
        console.log('error')
      })
    },
    deleteStaffCard (id) {
      request({
        method: 'post',
        url: `/bulletin/deletestaffmoment?id=${id}`
      }).then(res => {
        this.getAllDemeanor()
        this.$message({
          message: '删除成功！',
          type: 'success'
        })
        // eslint-disable-next-line handle-callback-err
      }, error => {
        this.$message.error('删除失败')
      })
    },
    turnBack (address) {
      this.interfaceNow = address
      this.resetForm()
      this.getAllDemeanor()
    },
    edit (item) {
      this.fileList = []
      this.formLabelAlign = {
        id: item.id,
        title: item.title,
        timestamp: item.timestamp,
        content: item.content
      }
      for (var i = 0, len = item.imgs.length; i < len; i++) {
        this.fileList.push({
          name: item.imgs[i].name,
          url: this.baseUrl + '/' + item.imgs[i].imgurl
        })
      }
      this.interfaceNow = 'edit'
      this.editID = item.id
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
        this.getAllDemeanor()
        this.interfaceNow = 'home'
        this.resetForm()
        // eslint-disable-next-line handle-callback-err
      }, error => {
        this.$message.error('修改失败')
      })
    },
    handleRemove (file) {
      console.log(file)
      this.deleteFiles.push(file.name)
      this.fileList.splice(this.fileList.indexOf(file), 1)
    },
    handleChange (file) {
      this.fileList.push(file)
      console.log(this.fileList)
    },
    handlePreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    chakan (item) {
      this.chakanItem = {
        title: '',
        date: '',
        content: '',
        fileList: []
      }
      for (var i = 0, len = item.imgs.length; i < len; i++) {
        this.chakanItem.fileList.push({
          name: item.imgs[i].name,
          url: this.baseUrl + '/' + item.imgs[i].imgurl
        })
      }
      this.chakanItem.title = item.title
      this.chakanItem.content = item.content
      this.chakanItem.date = item.timestamp.slice(0, 10)
      this.interfaceNow = 'chakan'
    },
    submitNew (form) {
      const fd = new FormData()
      fd.append('title', form.title)
      fd.append('content', form.content)
      fd.append('timestamp', this.formatDate(new Date(form.timestamp), 'yyyy-MM-dd hh:mm:ss'))
      for (var i = 0, len = this.fileList.length; i < len; i++) {
        fd.append('files', this.fileList[i].raw)
      }
      request({
        method: 'post',
        url: '/bulletin/addstaffmoment',
        data: fd
      }).then(res => {
        this.getAllDemeanor()
        this.$message({
          message: '新建成功！',
          type: 'success'
        })
        this.resetForm()
        this.interfaceNow = 'home'
        // eslint-disable-next-line handle-callback-err
      }, error => {
        this.$message.error('新建失败')
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
  .miniPic {
    width: 150px;
  }
  .staffCard {
    display: flex;
    min-height: 120px;
    align-items: center;
    justify-content: space-around;
  }
  .briefText {
    width: 600px;
  }
  .el-image /deep/ img {
    margin: 0px;
  }
  .content-div {
    margin: 20px auto;
    width: 80%;
  }
  .topicDiv{
    width: 100%;
    text-align: center;
    font-size: 28px;
  }
  .textDiv{
    width: 100%;
    font-size: 28px;
  }
  .dateDiv{
    width: 100%;
    text-align: right;
    font-size: 28px;
  }
  .imageDiv{
    padding: 10px;
    width: 100%;
  }
  .activityImage{
    width: 30%;
    margin: 5px;
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

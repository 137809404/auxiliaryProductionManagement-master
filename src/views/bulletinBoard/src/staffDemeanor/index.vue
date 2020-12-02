<template>
  <div>
    <el-row type="flex" :gutter="20" style="padding-left: 20px">
      <el-col :span="2">
        <h2 class="subtitle" style="margin-top: 23px; margin-left: 5px">员工风采</h2>
      </el-col>
      <el-col :span="22">
        <el-form :inline="true"  class="demo-form-inline" style="margin-left: 50px; margin-top: 20px">
          <el-form-item>
            <el-input prefix-icon="el-icon-search" placeholder="请输入关键字" v-model="input"> </el-input>
          </el-form-item>
          <el-button class="el-blue-button" @click="searchItem()"><i class="el-icon-search"></i> &nbsp;查询</el-button>
          <el-button class="el-blue-button" style="float: right;margin-right: 33px" @click="goview('新增风采')"><i class="el-icon-plus"></i>&nbsp;新增</el-button>
        </el-form>
      </el-col>
    </el-row>
    <hr style="border-bottom: none;border-color: #8c939d"/>
    <div>
      <div style="width: 95%;margin: 10px auto;">
        <el-card v-for="item in staffDemeanorList" :key="item.id" class="box-card">
          <div class="staffCard" >
            <div class="item-left">
              <div class="miniPic"><el-image :src="baseUrl+'/'+item.src">{{item.url}}</el-image></div>
<!--              <div class="miniPic"><el-image :src="imgsrc"></el-image></div>-->
            <div class="briefText"><div style="margin: 7px 0px;font-size: 18px">{{item.title}}</div><span>{{item.content}}</span></div>
            </div>
            <div class="operation">
              <el-button class="el-green-button" type="primary"  @click="goViewWithQuery('查看风采',item.id)">查看</el-button>
              <el-button class="el-blue-button" type="primary" @click="goViewWithQuery('修改风采',item)">修改</el-button>
              <el-button  class="el-red-button" type="primary" @click="deleteStaffCard(item.id)">删除</el-button>
            </div>
          </div>
        </el-card>
        <el-pagination
          style="margin-top: 10px;float: right"
          @current-change="handleCurrentChange"
          :page-size="pageSize"
          layout="total, prev, pager, next, jumper"
          :total="totalrecords">
        </el-pagination>
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
      pageSize: Math.floor((window.innerHeight - 190) / 160),
      totalrecords: 0,
      baseUrl: baseURL,
      input: '',
      staffDemeanorList: [
      ],
      disabled: false
    }
  },
  created () {
    this.pageSize = Math.floor((window.innerHeight - 190) / 160)
    this.getAllDemeanor(1)
  },
  methods: {
    searchItem () {
      this.staffDemeanorList = []
      request({
        url: `/bulletin/searchstaffmoment?keyword=${this.input}`
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
    getAllDemeanor (pagenum) {
      request({
        url: `/bulletin/showstaffmoment?pagenum=${pagenum}&pagesize=${this.pageSize}`
      }).then(res => {
        this.staffDemeanorList = res.data.data.data.result
        this.totalrecords = res.data.data.data.totalrecords
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
      console.log(this.staffDemeanorList)
    },
    deleteStaffCard (id) {
      console.log(id)
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
    goview (name) {
      this.$router.push({ name }).catch(err => {
        err && console.log('刷新') // 待优化
      })
    },
    goViewWithQuery (name, data) {
      this.$router.push({ name, query: { data: data } }).catch(err => {
        err && console.log('刷新') // 待优化
      })
    },
    handleCurrentChange (val) {
      this.getAllDemeanor(val)
    }
  }
}
</script>

<style scoped>
  .el-card{
    border: 0px;
  }
  .miniPic {
    display: inline-block;
    width: 150px;
    margin-right: 8px;
  }
  .box-card{
    margin: 10px 0;
    width: 100%;
    height: 100%;
  }
  .staffCard {
    height: 120px;
    display: flex;
    justify-content: space-between;
  }
  .briefText {
    display: inline-block;
    margin: 8px;
    height: 100%;
    width: 80%;
  }
  .el-image{
    border-radius: 5px ;
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
  .item-left{
    display: flex;
    align-items:center;
    width: 75%;
  }
  .item-left span{
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    color: #d9d9d9;
  -webkit-box-orient: vertical;
  }
  .imageDiv{
    padding: 10px;
    width: 100%;
  }
  .operation{
    display: inline-block;
    float: right;
    line-height: 120px;
  }
  .operation .el-button{
    width: 30%;
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
  >>>.el-card__body {
    background-color: rgb(48,53,78);
    color: white;
    border-color: rgb(48,53,78);
    border-radius: 0px;
  }
</style>

<template>
  <div>
    <div class="sub-title">移动文件柜</div>
    <div>
      <div>
        <el-row  :gutter="20">
          <el-col :span="20">
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item >
                <div class="block">
                  <el-input v-model="input" placeholder="请输入内容"><el-button slot="append" icon="el-icon-search"></el-button></el-input>
                </div>
              </el-form-item>
              <el-button class="el-blue-button"><i class="el-icon-download"></i>下载</el-button>
              <el-button class="el-blue-button" @click="deleteFile()"><i class="el-icon-delete"></i>&nbsp;删除</el-button>
              <el-popover
                placement="right"
                width="300"
                trigger="click" style="margin-left: 10px">
                <el-form ref="form" :model="form" label-width="100px">
                  <el-form-item label="文件夹名称">
                    <el-input v-model="form.documentName"></el-input>

                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" >立即创建</el-button>
                  </el-form-item>
                </el-form>
                <el-button v-show="bread.length<=2" class="el-blue-button" slot="reference"><i></i>新建文件夹</el-button>
                <el-button v-show="bread.length>2" class="el-blue-button" slot="reference"><i></i>上传文件</el-button>
              </el-popover>
            </el-form>
          </el-col>
        </el-row>
      </div>
      <div >
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item v-for="item in bread" :key="item.id" @click="toDocument(item.name)">{{item.name}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div style="width: 90%;margin: 10px auto">
<!--          <el-row :gutter="20">-->
<!--            <el-col v-for="item in documents" :key="item.id" :span="4">-->
<!--              <div  class="document-div">-->
<!--              <el-checkbox :checked="item.checked"></el-checkbox>-->
<!--              <div @click="enterDocument(item.level+1, item.name)">-->
<!--                <img class="document-img" src="@/assets/img/document.png"  />-->
<!--                <div>{{item.name}}</div>-->
<!--              </div>-->
<!--              </div>-->
<!--            </el-col>-->
<!--          </el-row>-->
          <el-checkbox v-show="bread<=2" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-show="bread.length<=2" v-model="checkedDocuments" @change="handleCheckedChange">
            <el-checkbox v-for="item in documents" :label="item.name" :key="item.id">
              <img class="document-img" src="@/assets/img/document.png" @click="enterDocument(item.level, item.name)" />
              <div>{{item.name}}</div>
            </el-checkbox>
          </el-checkbox-group>
          <el-table
            ref="multipleTable"
            :data="documents"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleCheckedChange"
            v-show="bread.length>2">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              width="55">
              <i class="el-icon-document"></i>
            </el-table-column>
            <el-table-column
              prop="name"
              label="文件名">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      checkAll: false,
      input: '',
      form: {
        documentName: ''
      },
      isIndeterminate: false,
      checkedDocuments: [],
      documents: [
        {
          id: 1,
          name: '1111',
          level: 1
        },
        {
          id: 2,
          name: '2222',
          level: 1
        },
        {
          id: 3,
          name: '3333',
          level: 1
        },
        {
          id: 4,
          name: '4444',
          level: 1
        },
        {
          id: 5,
          name: '5555',
          level: 1
        },
        {
          id: 6,
          name: '6666',
          level: 1
        },
        {
          id: 7,
          name: '7777',
          level: 1
        },
        {
          id: 8,
          name: '8888',
          level: 1
        },
        {
          id: 9,
          name: '9999',
          level: 1
        },
        {
          id: 10,
          name: '101010',
          level: 1
        }
      ],
      bread: [
        {
          id: 1,
          name: '根目录'
        }
      ]
    }
  },
  methods: {
    enterDocument (id, name) {
      // this.documents = []
      this.bread.push({
        id: id,
        name: name
      })
      this.checkedDocuments = []
      // console.log(this.checkedDocuments)
    },
    handleCheckAllChange (val) {
      this.isIndeterminate = false
      this.checkedDocuments = []
      if (this.checkAll) {
        for (const item of this.documents) {
          this.checkedDocuments.push(item.name)
        }
      }
      console.log(this.checkedDocuments)
    },
    handleCheckedChange (value) {
      console.log(this.checkedDocuments)
      const checkedCount = value.length
      this.checkAll = checkedCount === this.documents.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.documents.length
    },
    deleteFile () {
      for (let i = 0; i < this.documents.length; i++) {
        if (this.checkedDocuments.includes(this.documents[i].name)) {
          this.documents.splice(i, 1)
          i--
        }
      }
      this.checkedDocuments = []
    }
  }
}
</script>

<style scoped>
  .el-row {
    margin-bottom: 20px;
    &:last-child {
     margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    width: 200px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .document-img {
    margin: 2px;
  }
  .document-div {
    display: flex;
    margin: 5px auto;
    text-align: center;
  }
  .el-checkbox {
    text-align: center;
    display: inline-flex;
  }
  .el-table /deep/  , .el-table__expanded-cell {
    background-color: transparent;
  }

  .el-table /deep/ tr,.el-table /deep/ th {
    background-color: transparent!important;
  }
  .el-table--enable-row-transition .el-table__body td, .el-table /deep/ .cell{
    background-color: transparent;
  }
</style>

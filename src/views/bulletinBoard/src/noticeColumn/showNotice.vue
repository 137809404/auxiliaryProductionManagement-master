<template>
  <div>
    <el-row type="flex" :gutter="20" style="padding-left: 20px">
      <el-button type="text" @click="goback"><i class="el-icon-back" style="color: white;font-size: xx-large"></i></el-button>
      <h2 style="margin-top: 20px; margin-left: 5px">通知内容</h2>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col :span="6" >
        <h2> {{title}}</h2>
      </el-col>
    </el-row>
    <el-row type="flex" justify="end">
      <el-col :span="6" >
        <span style="color: #d3dce6">发布时间：{{date}}</span>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around" style="margin-top: 20px">
      <el-col :span="16" >
        <div class="pre-line" style="font-size: 20px" v-html="content"></div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around" style="margin-top: 30px">
      <el-col :span="16" >
        <el-checkbox  v-for="file in files" :key="file.name" v-model="file.checked" border>
<!--        <el-image src='https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'></el-image>-->
        {{file.name}}
      </el-checkbox>
        <el-button class="el-blue-button" @click="download"  size="small" style="margin-left: 20px">下载附件</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'showNotice',
  data () {
    return {
      noticeId: -1,
      title: '端午节放假通知',
      date: '2020-10-16',
      content:
        '公司各部门：\n' +
        '根据国家法定假期的规定，并结合公司实际情况，现对端午节放假做出安排，具体如下：\n' +
        '一、  放假时间：2020年6月25日（周四）至6月27日（周六），放假调休，共三天。6月28日（周日）上班。\n' +
        '二、  请各部门负责人做好本部门的节前工作安排，并检查相关设施、设备，做好防火、防盗工作，确保办公场所的安全、有序。\n' +
        '三、  出行需增强自我防护意识，科学做好个人有效防护，减少聚集，保持社交距离，注意安全。\n' +
        '四、  全体员工在节假日期间，请保持手机通讯畅通，注意人身财产安全，度过一个欢乐、祥和、健康的节日假期。\n' +
        '特此通知！\n' +
        '在此，预祝岳能全体同仁端午安康！',
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
  },
  methods: {
    goback: function () {
      console.log('huitui')
      this.$router.back(-1)
    },
    download () {
      const link = document.createElement('a')
      link.style.display = 'none'
      link.href = 'http://futest.sctsjkj.com/template/消防火警联网部件设施数据表.xlsx'
      link.click()
    }
  },
  created () {
    this.noticeId = this.$route.query.data
    console.log(this.noticeId)
    this.$axios.get('/bulletin/shownotification', {
      params: {
        id: this.noticeId
      }
    })
      .then((response) => {
        if (response.data != null) {
          console.log(response.data)// 请求的返回体
          this.title = response.data.title
          this.date = response.data.date
          this.content = response.data.content
          this.files = response.data.files
        } else {
          console.log('未获取到数据')
        }
      })
      .catch((error) => {
        console.log(error)// 异常
      })
    this.content.replace(/\n/g, '<br>')
    console.log('显示通知' +
      this.$route.query.data
    )
  }
}
</script>

<style scoped>
  .pre-line {
    white-space: pre-line;
  }
</style>

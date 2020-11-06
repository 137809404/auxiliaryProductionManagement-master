<template>
  <div>
    <div class="sub-title">
      安全专栏内容
    </div>
    <el-row type="flex" justify="space-around">
      <el-col :span="6" >
        <h2> 关于端午节放假的通知</h2>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col :span="16" >
        <div class="pre-line" style="font-size: 20px" v-html="content"></div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around" style="margin-top: 30px">
      <el-col :span="16" >
        <el-checkbox  v-for="file in files" :key="file.name" v-model="file.checked" border>
<!--          <el-image src='https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'></el-image>-->
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
      content: '发布时间：2020-05-20\n' +
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
    download () {
      const link = document.createElement('a')
      link.style.display = 'none'
      link.href = 'http://futest.sctsjkj.com/template/消防火警联网部件设施数据表.xlsx'
      link.click()
    }
  },
  created () {
    this.content.replace(/\n/g, '<br>')
    console.log(
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

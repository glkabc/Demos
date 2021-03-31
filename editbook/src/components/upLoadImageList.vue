<template>
  <div class="container">
    <a-input-search placeholder="请输入描述信息" style="width: 200px" @search="onSearch" />
    <a-table :columns="columns" :data-source="data" class="components-table-demo-nested" style="margin-top: 30px">
      <span slot="image" slot-scope="text, record" style="cursor: pointer;">
        <img :src="record" alt="图片" @click="viewImage(text, record)">
      </span>
      <a slot="operation" slot-scope="text, record" @click="delImage(text, record)">删除</a>
      <a-table
        slot="expandedRowRender"
        slot-scope="text"
        :columns="innerColumns"
        :data-source="innerData"
        :pagination="false"
      >
      {{text}}
      </a-table>
    </a-table>
    <a-modal
      v-model="modal2Visible"
      :title="imageTitle"
      centered
      :width='1200'
      :footer="null"
      @ok="() => (modal2Visible = false)"
    >
      <img src="../assets/logo.png" alt="原图">
    </a-modal>
  </div>
</template>

<script>
const columns = [
  { title: '标题', dataIndex: 'title', key: 'title', ellipsis: true, width: 200, align: 'center'},
  { title: '图片', key: 'image', scopedSlots: { customRender: 'image' }, width: 150, align: 'center' },
  { title: '描述', dataIndex: 'description', key: 'description', ellipsis: true, align: 'center' },
  { title: '上传时间', dataIndex: 'uploadeDate', key: 'uploadeDate', ellipsis: true, align: 'center' },
  { title: '下载次数', dataIndex: 'downLoadeCount', key: 'downLoadeCount', width: 100, align: 'center' },
  { title: '大小', dataIndex: 'size', key: 'size', width: 110, align: 'center' },
  { title: '图片类型', dataIndex: 'type', key: 'type', width: 110, align: 'center' },
  { title: '操作', key: 'operation', scopedSlots: { customRender: 'operation' }, width: 150, align: 'center' },
];

const data = [];
for (let i = 0; i < 3600; ++i) {
  data.push({
    key: i,
    title: 'iOSiOSiOSiOSiOSiOSiOSiOSiOSiOSiOSiOSiOSiOSiOS',
    image: 'Screem',
    description: 'JackJackJackJackJackJackJackJackJackJackJack',
    uploadeDate: '2014-12-24 23:12:00',
    downLoadeCount: 233,
    size: 234324,
    type: 'image/png',
  });
}

const innerColumns = [
  { title: '宽度', dataIndex: 'width', key: 'width' },
  { title: '高度', dataIndex: 'height', key: 'height' },
  { title: 'likes',dataIndex: 'likes', key: 'likes' },
  { title: 'dislike', dataIndex: 'dislike', key: 'dislike' },
  // { title: '', dataIndex: 'upgradeNum', key: 'upgradeNum' },
  // {
  //   title: 'Action',
  //   dataIndex: 'operation',
  //   key: 'operation',
  //   scopedSlots: { customRender: 'operation' },
  // },
];

const innerData = [];
for (let i = 0; i < 1; ++i) {
  innerData.push({
    key: i,
    width: 133,
    height: 23,
    likes: 121,
    dislike: 324,
  });
}
export default {
  name:  '',
  data() {
    return {
      data,
      columns,
      innerColumns,
      innerData,
      modal2Visible: false,
      imageTitle: ''
    }
  },
  methods: {
    delImage(v, s) {
      let that = this
      console.log(v, s, '每列数据')
      this.$confirm({
        title: '提示',
        content: '确定要删除此图片吗？',
        okText: '是',
        cancelText: '否',
        onOk() {
          // return new Promise((resolve, reject) => {
          //   setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
          // }).catch(() => console.log('Oops errors!'));
          that.$message.success('删除成功')
        },
        onCancel() {},
      });
    },
    viewImage(v, s) {
      console.log(v, s, '每列数据')
      this.imageTitle = '你好'
      this.modal2Visible = true
    },
    onSearch(value) {
      console.log(value, '搜索参数');
    },
  }
}
</script>

<style scoped lang="css">
  .container {
    margin: 20px 20px;
    text-align: center;
  }
</style>
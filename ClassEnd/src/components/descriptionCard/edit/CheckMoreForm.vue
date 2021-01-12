<template>
  <div class="container">
    <h1 class="title">查看更多</h1>
    <AntTable
      :columns="columns"
      class="custom-table"
      tableLayout="fixed"
      :dataSource="tableData"
      :customRow="customRow"
      :loading="dataStatus === 'pending'"
      :pagination="pagination"
      @change="handlePaginationChange"
    >
    </AntTable>
    <div class="button_container">
      <AntButton @click="handleCancel">
        取消
      </AntButton>
      <AntButton @click="handleConfirm" type="primary">
        确定
      </AntButton>
    </div>
  </div>
</template>

<script>
  import {Button, Table, message} from 'ant-design-vue';
  import warning from 'warning';

  import client from '@/configs/request';
  const columns = [
    {
      title: '知识点名称',
      dataIndex: 'knowledgeName',
      key: 'knowleName',
      width: '50%',
      align: 'left',
    },
    {
      title: '作者',
      dataIndex: 'author',
      key: 'author',
      width: '15%',
      align: 'center',
    },
    {
      title: '创作时间',
      dataIndex: 'createdAt',
      key: 'createAt',
      width: '20%',
      align: 'center',
    },
    {
      title: '引用次数',
      key: 'usedCount',
      dataIndex: 'usedCount',
      width: '15%',
      align: 'right',
    },
  ];
  export default {
    name: 'CheckMoreForm',
    components: {
      AntButton: Button,
      AntTable: Table,
    },
    props: {
      searchString: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        columns,
        tableData: [],
        dataStatus: 'idle',
        apiStatus: 'idle',
        selectRow: '',
        pagination: {
          current: 1,
          pageSize: 5,
          total: 0,
        },
      };
    },
    created() {
      this.fetchTableData();
    },
    watch: {
      pagination: {
        handler() {
          this.selectRow = '';
          this.fetchTableData();
        },
        deep: true,
      },
    },
    methods: {
      customRow(record) {
        return {
          class: {
            selected: this.selectRow === record.key,
          },
          on: {
            click: (event) => {
              this.selectRow = record.key;
            },
          },
        };
      },
      handlePaginationChange({current}) {
        this.pagination.current = current;
      },
      handleCancel() {
        this.$emit('cancel');
      },
      async fetchTableData() {
        try {
          this.dataStatus = 'pending';
          const response = await client.post('/loadSelect/loadKnowledge', {
            knowledgePoint: this.searchString,
            pageSize: this.pagination.pageSize,
            pageNum: this.pagination.current,
          });
          if (response.status === 200 && response.data.code === 0) {
            this.dataStatus = 'resolved';
            this.tableData = response.data.data?.pageInfo?.map((rawData) => ({
              key: rawData.id,
              knowledgeName: rawData.knowledgePoint,
              author: rawData.createUserName,
              createdAt: rawData.createTime,
              usedCount: rawData.count,
            }));
            this.pagination.total = response.data.data.meta.total ?? 0;
          } else {
            this.dataStatus = 'rejected';
          }
        } catch (error) {
          this.dataStatus = 'rejected';
          warning(false, `<CheckMoreForm>:(fetchTableData):catched error ${error}`);
        }
      },
      async handleConfirm() {
        if (!this.selectRow) {
          message.info('请选择要关联的知识点');
          return;
        }
        this.$emit('confirm', this.selectRow);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .container {
    padding: 20px 36px;

    .title {
      color: #000;
      font-size: 20px;
      font-weight: bold;
    }

    .custom-table {
      margin-bottom: 20px;
    }

    .button_container {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;

      .ant-btn {
        background-color: #e5e5e5;
        border-color: #e5e5e5;
        color: #666;

        &:not(:last-child) {
          margin-right: 10px;
        }
      }

      .ant-btn.ant-btn-primary {
        background-color: #357981;
        border-color: #5b8a8f;
        color: #fff;
      }
    }
  }
</style>

<style lang="scss">
  tr.selected {
    background-color: #f5f8fb;
  }
</style>

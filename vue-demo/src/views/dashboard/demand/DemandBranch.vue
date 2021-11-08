<template>
  <div class="branch_manage">
    <a-row :gutter="16" >
      <a-col :span="24" style="margin-bottom:24px">
        <a-input-search
          style="width: 300px"
          @search="onSearch"
          placeholder="请输入公司名称"
        >
          <a-select
            slot="addonBefore"
            style="width: 100px"
            v-model="searchSelect"
            :open="false"
          >
            <a-select-option
              :value="item.id"
              v-for="item in searchList"
              :key="item.id"
              >{{ item.title }}</a-select-option
            >
          </a-select>
        </a-input-search>
        <can-i-use code="xqzx-xqbm-xzzzjg">
        <a-button
          type="primary"
          style="margin-left:20px;background: #22B8CF;border: #22B8CF"
          @click="addClick"
        >
          <a-icon type="plus-circle" />
          新增组织机构
        </a-button>
        </can-i-use>
      </a-col>
      <a-divider  style="height:0.5px;"/>
      <a-col :span="24" >
        <a-table
          bordered
          :rowKey="(record) => record.customId"
          :columns="columns"
          :dataSource="data"
          :pagination="pagination"
          class="zebra"
          @change="onShowSizeChange"
          :loading="loading"
        >
          <span slot="resBankType">
            <span>默认</span>
          </span>
          <span slot="industryType">
            <span>默认</span>
          </span>
          <span slot="action" slot-scope="item">
            <a @click="combinationClick(item)" class="member-tag">组织结构</a>
            <a-divider type="vertical" />
            <a @click="memberClick(item)" class="member-tag">成员管理</a>
            <a-divider  type="vertical" />
            <can-i-use code="xqzx-xqbm-sc">
              <a-popconfirm
    title="确定删除组织机构吗？"
    ok-text="确定"
    cancel-text="取消"
    @confirm="confirm(item)"
    @cancel="cancel"
  >
    <button    class="member-tag change-btn">删除</button>
  </a-popconfirm>
            
            </can-i-use>
          </span>
        </a-table>
      </a-col>
    </a-row>

    <a-modal title="新增组织机构" v-model="staffVisible" width="500px">
      <template slot="footer">
        <a-button
          key="back"
          @click="staffVisible = false"
          style="background: rgb(232, 233, 232);border: rgb(232, 233, 232);color: rgb(51, 51, 51);"
          >取消
        </a-button>
        <a-button
          key="submit"
          style="background: #22B8CF;border: #22B8CF"
          type="primary"
          @click="handleOrganSubmit"
          >确定</a-button
        >
      </template>
      <a-form :form="staffForm" @submit="handleOrganSubmit">
        <a-row>
          <a-col :span="24">
            <a-form-item
              label="公司名称"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 16 }"
              :colon="false"
            >
              <a-input
                allowClear
                v-decorator="[
                  'customName',
                  {
                    rules: [
                      {
                        required: true,
                        message: '请输入公司名称',
                      },
                    ],
                  },
                ]"
              />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item
              label="行业类型"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 16 }"
              :colon="false"
            >
              <a-select
                v-decorator="[
                  'trade',
                  {
                    initialValue: 0,
                    rules: [
                      {
                        required: true,
                        message: '请选择行业类型',
                      },
                    ],
                  },
                ]"
                placeholder="请选择"
              >
                <a-select-option
                  :value="item.id"
                  v-for="item in organizeList"
                  :key="item.id"
                  >{{ item.title }}</a-select-option
                >
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item
              label="资源库类型"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 16 }"
              :colon="false"
            >
              <a-select
                v-decorator="[
                  'resource',
                  {
                    initialValue: 0,
                    rules: [
                      {
                        required: true,
                        message: '请选择',
                      },
                    ],
                  },
                ]"
                placeholder="请选择"
              >
                <a-select-option
                  :value="item.id"
                  v-for="item in organizeList"
                  :key="item.id"
                  >{{ item.title }}</a-select-option
                >
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item
              label="公司简介"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 16 }"
              :colon="false"
            >
              <a-textarea
                allowClear
                v-decorator="['intro']"
                placeholder="请输入公司简介"
                :rows="6"
                maxlength="500"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { getDemandList, addOrgInfo,deleteOrgInfo } from "@api/demandBranch/index";
import { Trim } from "../../../trim/trim"
const columns = [
  {
    title: "公司名称",
    dataIndex: "customName",
    key: "customName",
  },
  {
    title: "公司简介",
    dataIndex: "intro",
    key: "intro",
    ellipsis: true,
    scopedSlots: { customRender: "intro" },
  },
  {
    title: "行业类型",
    key: "industryType",
    scopedSlots: { customRender: "industryType" },
  },
  {
    title: "资源库类型",
    key: "resBankType",
    align: "left",
    scopedSlots: { customRender: "resBankType" },
  },
  {
    title: "操作",
    key: "action",
    align: "center",
    scopedSlots: { customRender: "action" },
  },
];
export default {
  data() {
    return {
      data: [],
      columns,
      loading: false,
      keyword: "",
      searchSelect: 1,
      searchList: [
        {
          id: 1,
          title: "公司名称",
        },
      ],
      staffVisible: false,
      staffForm: this.$form.createForm(this),
      pagination: {
        current: 1,
        pageSizeOptions: ["10", "20", "30", "40"],
        showSizeChanger: true,
        pageSize: 10,
        total: 0,
        showTotal: (total) => `共 ${total} 条`,
      },
      organizeList: [
        {
          id: 0,
          title: "默认",
        },
      ],
    };
  },
  mounted() {
    this.getDemandListInit();
  },
  methods: {
    onSearch(e) {
      this.keyword = e;
      this.getDemandListInit();
    },
    getDemandListInit() {
      this.loading = true;
      getDemandList({
        customName: Trim(this.keyword),
      })
        .then((res) => {
          this.data = res.data.data.CompanyList;
          this.data.map((item,index)=>{
            if(item.isDelete==1){
              this.data.splice(index,1);
            }
            console.log(this.data,'data');
          })
        })
        .finally((res) => {
          this.loading = false;
        });
    },
    onShowSizeChange({ current, pageSize }) {
      this.pagination.current = current;
      this.pagination.pageSize = pageSize;
      this.getDemandListInit();
    },
    combinationClick(e) {
      this.$router.push({
        name: "Organize",
        query: { id: e.customId, name: e.customName },
      });
    },
    memberClick(e) {
      this.$router.push({
        name: "Manage",
        query: { id: e.customId },
      });
    },
    cancel(){},
    confirm(item){
        this.deleteClick(item);
    },
    deleteClick(e){
      deleteOrgInfo({
        customId:e.customId
      }).then((res)=>{
        if(res.data.code==0){
          this.$message.success('删除成功');
          this.getDemandListInit();
        }
      })
    },
    handleOrganSubmit(e) {
      e.preventDefault();
      this.staffForm.validateFields((err, values) => {
        if(!Trim(values.customName)){
          return this.$message.error('请输入公司名')
        }
        if (!err) {
          addOrgInfo({
            customName: Trim(values.customName),
            intro: Trim(values.intro),
          }).then((res) => {
            if (res.data.code == 0) {
              this.$message.success(res.data.data);
            } else {
              this.$message.error(res.data.data);
            }
            this.staffVisible = false
            this.getDemandListInit();
            this.staffForm.resetFields();
          });
        }
      });
    },
    addClick() {
      this.staffVisible = true;
    },
  },
};
</script>

<style>
.branch_manage {
  background: #fff;
  padding: 22px;
  min-height: 100%;
}
/* .branch_manage .ant-table-thead > tr > th {
  border-bottom: 0;
  color: rgba(132, 145, 158, 1);
  font-weight: bold;
}
.branch_manage .ant-table-tbody > tr > td {
  border-bottom: 0;
  border-right: 1px solid #f0f0f0;
  font-size: 12px;
} */
.branch_manage .member-tag {
  color: #4480ee;
}
.branch_manage .change-btn{
  background:transparent;
  border:none;
  margin-left:-5px;
}
</style>

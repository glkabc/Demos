<template>
  <div class="branch_manage">
    <a-row :gutter="16">
      <a-col :span="24">
        <a-input-search
          style="width: 300px"
          @search="onSearch"
          placeholder="请输入公司名称"
          allowClear
          v-model.trim = "keyword"
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
        <can-i-use code="rygl-zzgl-zzjgxz">
          <a-button
            type="primary"
            style="margin-left:15px;background: #22B8CF;border: #22B8CF"
            @click="addClick"
          >
            <a-icon type="plus-circle" />
            新增组织机构
          </a-button>
        </can-i-use>
        <a-divider style="margin:24px 0;height:0.5px;"/>
      </a-col>
      
      <a-col :span="24" >
        <a-table
          rowKey="sysCustomId"
          :columns="columns"
          :dataSource="data"
          :pagination="pagination"
          class="zebra"
          :loading="loading"
          @change="onShowSizeChange"
          bordered
        >
          <span slot="action" slot-scope="item">
            <a @click="combinationClick(item)" class="member-tag">组织结构</a>
            <a-divider type="vertical" />
            <a @click="memberClick(item)" class="member-tag">成员管理</a>
          </span>
          <span slot="industryType">
            <span>默认</span>
          </span>
          <span slot="resBankType">
            <span>默认</span>
          </span>
        </a-table>
      </a-col>
    </a-row>

    <a-modal title="新增组织机构" v-model="staffVisible" width="500px">
      <template slot="footer">
        <a-button key="back" @click="staffVisible = false">取消</a-button>
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
                        message: '请输入公司名称'
                      },
                    ]
                  }
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
                allowClear
                v-decorator="[
                  'industryType',
                  {
                    initialValue: 0,
                    rules: [
                      {
                        required: true,
                        message: '请选择行业类型'
                      }
                    ]
                  }
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
                allowClear
                v-decorator="[
                  'resBankType',
                  {
                    initialValue: 0,
                    rules: [
                      {
                        required: true,
                        message: '请选择'
                      }
                    ]
                  }
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
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { getOrgInfo,addOrgInfo } from "@api/manage/index";
import {Trim} from '../../../trim/trim';
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
  },
  {
    title: "行业类型",
    scopedSlots: { customRender: "industryType" }
  },
  {
    title: "资源库类型",
    align: "center",
    scopedSlots: { customRender: "resBankType" }

  },
  {
    title: "操作",
    key: "action",
    align: "center",
    scopedSlots: { customRender: "action" }
  }
];
export default {
  data() {
    return {
      data: [],
      columns,
      pagination: {
        current: 1,
        pageSizeOptions: ["10", "20", "30", "40"],
        showSizeChanger: true,
        pageSize: 10,
        total: 0,
        showTotal: total => `共 ${total} 条`
      },
      searchSelect: 1,
      searchList: [
        {
          id: 1,
          title: "公司"
        }
      ],
      staffVisible: false,
      staffForm: this.$form.createForm(this),
      organizeList: [
        {
          id: 0,
          title: "默认"
        },
      ],
      keyword: '', // 搜索
      loading: false
    };
  },
  mounted() {
    this.getOrgInfoInit()
  },
  methods: {
    onSearch(e) {
      this.keyword = e
      this.getOrgInfoInit()
    },
    getOrgInfoInit() {
      this.loading = true
      getOrgInfo({
        customName: this.keyword,
        pageSize: this.pagination.pageSize,
        pageNum: this.pagination.current
      }).then(res => {
        if(res.data.data.length == [] ) {
          this.data = []
        }else {
          this.data = res.data.data.list;
          this.pagination.total = res.data.data.total;
        }
      }).finally(res => {
        this.loading = false;
      });
    },
    combinationClick(e) {
      this.$router.push({
        name: "structure",
        query: { id: e.sysCustomId,name: e.customName}
      });
    },
    memberClick(e) {
      this.$router.push({
        name: "Member",
        query: { id: e.sysCustomId}
      });
    },
    onShowSizeChange({current, pageSize}) {
      this.pagination.current = current;
      this.pagination.pageSize = pageSize;
      this.getOrgInfoInit()
    },
     handleOrganSubmit(e) {
      e.preventDefault();
      this.staffForm.validateFields((err, values) => {
        if (!err) {
          addOrgInfo({
            customName: Trim(values.customName),
            industryType: values.industryType,
            resBankType: values.resBankType,
            intro: Trim(values.intro),
          }).then(res => {
            if(res.data.code == 0) {
              this.$message.success(res.data.data)
            }else {
              this.$message.error(res.data.data)
            }
            this.staffVisible = false;
            this.getOrgInfoInit()
            this.staffForm.resetFields();
          })
        }
      });
    },
    addClick() {
      this.staffVisible = true;
    }
  }
};
</script>

<style>
.branch_manage {
  background: #fff;
  padding: 22px;
  min-height: 100%;
}
.branch_manage .member-tag {
  color: #4480ee;
}
</style>

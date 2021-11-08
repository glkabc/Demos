<template>
  <div class="demand-manage">
    <a-row :gutter="16">
      <a-col :span="24" style="display: flex">
        <a-input-group compact style="width: 366px">
          <a-select
            style="width: 100px"
            v-model="searchSelect"
            @change="searchChange"
          >
            <a-select-option
              :value="item.id"
              v-for="item in searchList"
              :key="item.id"
              >{{ item.title }}</a-select-option
            >
          </a-select>
          <a-input-search
            style="width: 260px"
            :placeholder="placeholderTitle"
            allowClear
            @search="onSearch"
            v-model="keywordValue"
            v-if="!placeholderShow"
          />
          <a-tree-select
            placeholder="请选择组织机构"
            treeDefaultExpandAll
            :treeData="treeData"
            :value="organizeValue"
            v-if="placeholderShow"
            allowClear
            @change="handleTradeSearchClick"
            style="width: 260px"
            :dropdownStyle="{ maxHeight: '300px', overflow: 'auto' }"
          >
          </a-tree-select>
        </a-input-group>
        <a-button
          type="primary"
          style="margin-left: 10px;background: #22B8CF;border: #22B8CF"
          @click="updataClick(1,{})"
        >
          <a-icon type="plus-circle" />
          新增成员
        </a-button>
      </a-col>
      <a-col :span="24" style="margin-top: 20px;">
        <a-table
          rowKey="userId"
          :columns="columns"
          :dataSource="data"
          :pagination="pagination"
          class="zebra"
          :loading="loading"
          @change="onShowSizeChange"
        >
          <span slot="action" slot-scope="item">
            <a @click="updataClick(2,item)">修改</a>
            <a class="member-tag" @click="delClick(item)">删除</a>
          </span>
        </a-table>
      </a-col>
    </a-row>
    <a-modal :title="staffTitle" v-model="staffVisible" width="500px">
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
              label="成员名称"
              :label-col="{ span: 7 }"
              :wrapper-col="{ span: 14 }"
              :colon="false"
            >
              <a-input
                allowClear
                v-decorator="[
                  'userName',
                  {
                    rules: [
                      {
                        required: true,
                        message: '请输入成员名称'
                      },
                      {
                        pattern: /^[^\s]*$/,
                        message: '禁止输入空格',
                      }
                    ]
                  }
                ]"
              />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item
              label="成员邮箱"
              :label-col="{ span: 7 }"
              :wrapper-col="{ span: 14 }"
              :colon="false"
            >
              <a-input
                allowClear
                v-decorator="[
                  'mail',
                  {
                    rules: [
                      {
                        type: 'email',
                        message: '请输入正确的邮箱！'
                      },
                      {
                        required: true,
                        message: '请输入你的邮箱！'
                      }
                    ]
                  }
                ]"
              />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item
              label="手机号"
              :label-col="{ span: 7 }"
              :wrapper-col="{ span: 14 }"
              :colon="false"
            >
              <a-input
                allowClear
                v-decorator="[
                  'phone',
                  {
                    rules: [
                      {
                        required: true,
                        message: '请输入手机号'
                      },
                      {
                        pattern: /^1[3|4|5|7|8][0-9]\d{8}$/, message: '请输入正确的手机号'
                      }
                    ]
                  }
                ]"
              />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item
              label="组织机构"
              :label-col="{ span: 7 }"
              :wrapper-col="{ span: 14 }"
              :colon="false"
            >
              <a-tree-select
                  allowClear
                  showSearch
                  treeNodeFilterProp="title"
                  placeholder="请选择"
                  treeDefaultExpandAll
                  :treeData="treeData"
                  v-decorator="['orgId',
                  {
                    rules: [
                      {
                        required: true,
                        message: '请选择组织机构'
                      },
                    ]
                  }
                ]"
                :dropdownStyle="{ maxHeight: '300px', overflow: 'auto' }"
                >
              </a-tree-select>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { getUserInfo, getStructureList,addUserInfo,editUserInfo ,delUserInfo} from "@api/demandBranch/index";
import pick from 'lodash.pick';
const columns = [
  {
    title: "姓名",
    dataIndex: "userName",
    key: "userName",
  },
  {
    title: "邮箱",
    dataIndex: "mail",
    key: "mail"
  },
  {
    title: "手机号码",
    key: "phone",
    dataIndex: "phone"
  },
  {
    title: "组织机构",
    key: "orgName",
    dataIndex: "orgName"
  },
  {
    title: "操作",
    align: "center",
    key: "action",
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
      treeData: [],
      loading: false,
      placeholderTitle: "请输入成员名称",
      placeholderShow: false,
      organizeValue: '',
      searchSelect: 1,
      staffTitle: "新增角色",
      staffVisible: false,
      type: '',
      typeSearch: 1,
      keywordValue: '', // 搜索绑定内容
      id: '',
      staffForm: this.$form.createForm(this),
      searchList: [
        {
          id: 1,
          title: "姓名"
        },
        {
          id: 2,
          title: "邮箱"
        },
        {
          id: 3,
          title: "手机号"
        },
        {
          id: 4,
          title: "组织机构"
        }
      ],
      userTypeList: {}
    };
  },
  mounted() {
    this.id = this.$route.query.id
    this.getStructureListInit();
    this.getUserInfoInit()
  },
  methods: {
    onSearch(e) {
      switch (this.typeSearch) {
        case 1:
          this.keyword = e
          this.phoneValue = null
          this.mailValue = null
          this.organizeValue = ''
          break;
        case 2:
          this.mailValue = e
          this.phoneValue = null
          this.organizeValue = ''
          this.keyword = null
          break;
        case 3:
          this.phoneValue = e
          this.keyword = null
          this.organizeValue = ''
          this.mailValue = null
          break;
      }
      this.getUserInfoInit()
    },
    onShowSizeChange({current, pageSize}) {
			this.pagination.current = current;
			this.pagination.pageSize = pageSize;
    },
    // 获取成员管理列表
    getUserInfoInit() {
      this.loading = true
      getUserInfo({
        customOrgId: this.organizeValue,
        userName: this.keyword,
        phone: this.phoneValue,
        mail: this.mailValue,
        customId: this.id,
        // pageNum: this.pagination.current,
				// pageSize: this.pagination.pageSize,
      }).then(res => {
        if(res.data.code == 0) {
          this.data = res.data.data.userList
          // this.pagination.total = res.data.data.total
        }else {
          this.data = []
        }
      }).finally(res => {
        this.loading = false
      })
    },
    handleTradeClick(e) {
      console.log(e)
    },
    // 组织机构搜索
    handleTradeSearchClick(e) {
      this.organizeValue  = e
      this.keyword = ''
      this.phoneValue = ''
      this.mailValue = ''
      this.getUserInfoInit()
    },
    // 获取组织机构
    getStructureListInit() {
      getStructureList({
        customId: this.id
      }).then(res => {
        if(res.data.code == 0) {
          let newTmp = this.tmpListInit(res.data.data.orgList)
          this.treeData = newTmp
        }else {
          this.treeData = []
        }
      });
    },
    tmpListInit(val) {
      let arr = [];
      if (val.length !== 0) {
        val.forEach(item => {
          let obj = {};
          obj.key = item.orgId
          obj.value = item.orgId
          obj.title = item.orgName
          if (item.children.length >= 1) {
            obj.children = this.tmpListInit(item.children);
          }
          arr.push(obj);
        });
      }
      return arr;
    },
    addClick() {
      this.staffVisible = true;
    },
    updataClick(type,e) {
      this.userTypeList = e
      this.type = type
      if(type == 1) {
        this.staffTitle = "新增角色";
        this.staffForm.resetFields()
      }else {
        this.staffTitle = "编辑角色";
        new Promise(resolve => {
          resolve()
        }).then(() => {
          const formData = pick(e, [
            'userName',
            'mail',
            'phone',
            'orgId',
          ])
          this.staffForm.setFieldsValue(formData)
        })
      }
      this.staffVisible = true;
    },
    searchChange(e) {
      this.typeSearch = e
      switch (e) {
        case 1:
          this.placeholderShow = false;
          this.keywordValue = ''
          this.placeholderTitle = "请输入成员名称";
          break;
        case 2:
          this.placeholderShow = false;
          this.placeholderTitle = "请输入成员邮箱";
          this.keywordValue = ''
          break;
        case 3:
          this.placeholderShow = false;
          this.placeholderTitle = "请输入成员手机号";
          this.keywordValue = ''
          break;
        default:
          this.placeholderTitle = "请选择组织机构";
          this.placeholderShow = true;
          break;
      }
    },
    delClick(e) {
      this.$confirm({
        title: "确认提示?",
        content: "确定删除信息吗？",
        onOk:()=> {
          delUserInfo({
            userId: e.userId
          }).then(res => {
            if(res.data.code == 0) {
              this.$message.success(res.data.data)
            }else {
              this.$message.error(res.data.data)
            }
            this.getUserInfoInit()
          })
        },
        onCancel() {}
      });
    },
    handleOrganSubmit(e) {
      e.preventDefault();
      this.staffForm.validateFields((err, values) => {
        if (!err) {
          if(this.type == 1) {
            addUserInfo({
              userName: values.userName,
              mail: values.mail,
              phone: values.phone,
              customId: this.id,
              customOrgId: values.orgId
            }).then(res => {
              if(res.data.code == 0) {
                this.$message.success(res.data.data)
                this.staffVisible = false
                this.getUserInfoInit()
              }else {
                this.$message.error(res.data.mesg)
              }
              
            })
          }else {
            editUserInfo({
              userName: values.userName,
              mail: values.mail,
              phone: values.phone,
              customId: this.id,
              customOrgId: values.orgId,
              userId: this.userTypeList.userId
            }).then(res => {
              if(res.data.code == 0) {
                this.$message.success(res.data.data)
                this.getUserInfoInit()
              this.staffVisible = false
              }else {
                this.$message.error(res.data.mesg)
              }
              
            })
          }
        }
      });
    }
  }
};
</script>

<style>
.demand-manage {
  background: #fff;
  padding: 22px;
  min-height: 100%;
}
.demand-manage .ant-table-thead > tr > th {
  border-bottom: 0;
  color: rgba(132, 145, 158, 1);
  font-weight: bold;
  cursor: pointer;
}
.demand-manage .ant-table-tbody > tr > td {
  border-bottom: 0;
  border-right: 1px solid #f0f0f0;
}
.demand-manage .member-tag {
  color: #fd5158;
  margin-left: 12px;
}
</style>

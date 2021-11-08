<template>
  <div class="role">
    <div class="roleManage-main">
      <span style="margin-right: 10px;color:#78909C;font-weight: 600"
        >角色名称</span
      >
      <a-input
        v-model.trim="keyword"
        @change="searchChange"
        placeholder="请输入资源名称"
        style="width: 220px"
        allowClear
        @keyup.enter="handleSearchSubmit"
      />
      <span style="margin:0 10px 0 20px;color:#78909C;font-weight: 600"
        >角色编码</span
      >
      <a-input
        v-model.trim="moduleUrlValue"
        @change="handleChange"
        placeholder="请输入资源编码"
        style="width: 220px"
        allowClear
        @keyup.enter="handleSearchSubmit"
      />
      <a-button
        :style="{
          marginLeft: '53px',
          backgroundColor: '#feaa19',
          border: '#feaa19',
        }"
        @click="handleSearchSubmit"
        type="primary"
      >
        查询
      </a-button>
      <a-button
        :style="{
          marginLeft: '10px',
          backgroundColor: '#22b8cf',
          border: '#22b8cf',
        }"
        @click="resetClick"
        type="primary"
      >
        重置
      </a-button>
      
      
      <a-divider />
      <div>
        <a-button
          type="primary"
          style="margin-bottom: 24px;background: #22B8CF;border: #22B8CF"
          @click="handleUpdateClick(1, {})"
        >
          <a-icon type="plus-circle" />
          新增角色
        </a-button>
      </div>
    </div>
    <a-table
      :columns="columns"
      :dataSource="data"
      :pagination="pagination"
      :loading="loading"
      class="zebra"
      rowKey="roleId"
      @change="onShowSizeChange"
      bordered
      :scroll="{ y: screenHeight - 420 }"
    >
      <span slot="action" slot-scope="record, item">
        <a color="#90B5F5" @click="handleGiveClick(item)">赋予权限</a>
        <a-divider type="vertical" />
        <a class="member-edit" @click="handleUpdateClick(2, item)">修改</a>
        <a-divider type="vertical" />
        <a class="member-tag" @click="delClick(item)">删除</a>
      </span>
    </a-table>
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
              label="角色名称"
              :label-col="{ span: 7 }"
              :wrapper-col="{ span: 14 }"
              :colon="false"
            >
              <a-input
                v-decorator="[
                  'roleName',
                  {
                    rules: [
                      {
                        required: true,
                        message: '请输入角色名称',
                      },
                      
                    ],
                  },
                ]"
                allowClear
              />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item
              label="角色编码"
              :label-col="{ span: 7 }"
              :wrapper-col="{ span: 14 }"
              :colon="false"
            >
              <a-input
                v-decorator="[
                  'roleCode',
                  {
                    rules: [
                      {
                        required: true,
                        message: '请输入角色编码',
                      },
                      
                    ],
                  },
                ]"
                :disabled="typeShow"
                allowClear
              />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item
              label="角色备注"
              :label-col="{ span: 7 }"
              :wrapper-col="{ span: 14 }"
              :colon="false"
            >
              <a-input v-decorator="['comments']" allowClear />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>
    <a-drawer
      placement="right"
      :closable="false"
      @close="onClose"
      width="420"
      :visible="visibleAuthority"
    >
      <a-row>
        <a-col :span="24" class="content">
          <div class="left-head">
            <span
              >权限清单：{{ checkedKeys.length }}/{{
                this.expandedKeys.length
              }}项</span
            >
            <a-input-search @search="onSearch" style="width: 220px">
              <a-button
                type="primary"
                slot="enterButton"
                style="background: #22B8CF;border: #22B8CF"
              >
                <a-icon type="search" />
                搜索</a-button
              >
            </a-input-search>
          </div>
          <a-divider />
          <div class="right-content">
            <a-tree
              checkable
              @expand="onExpand"
              :expandedKeys="expandedKeys"
              :autoExpandParent="autoExpandParent"
              v-model="checkedKeys"
              :treeData="treeData"
              checkStrictly
              @check="onCheck"
              :replaceFields="replaceFields"
            />
          </div>
          <div class="authority-foot">
            <a-button
              type="primary"
              style="background: #22B8CF;border: #22B8CF"
              @click="handleAddClick"
            >
              保存
            </a-button>
          </div>
        </a-col>
      </a-row>
    </a-drawer>
  </div>
</template>

<script>
import {
  getRole,
  addRole,
  updateRole,
  deleteRole,
  getModuleList,
  getModuleByRoleId,
  addRoleModules,
} from "@api/manage/index";
import pick from "lodash.pick";
import { Trim } from "../../../trim/trim"
const columns = [
  {
    title: "角色名称",
    dataIndex: "roleName",
    key: "roleName",
    scopedSlots: { customRender: "roleName" },
  },
  {
    title: "角色编码",
    dataIndex: "roleCode",
    key: "roleCode",
  },
  // {
  //   title: "角色等级",
  //   dataIndex: "classify",
  //   key: "classify",
  //   width: 50
  // },
  {
    title: "备注",
    dataIndex: "comments",
    key: "comments",
  },
  {
    dataIndex: "action",
    width: "25%",
    key: "action",
    title: "操作",
    align: "center",
    scopedSlots: { customRender: "action" },
  },
];
export default {
  data() {
    return {
      columns,
      data: [],
      visibleAuthority: false,
      pagination: {
        current: 1,
        pageSizeOptions: ["10", "20", "30", "40"],
        showSizeChanger: true,
        pageSize: 10,
        total: 0,
        showTotal: (total) => `共 ${total} 条`,
      },
      staffVisible: false,
      staffTitle: "新增角色",
      keyword: "",
      moduleUrlValue: "",
      updateType: "",
      loading: false,
      typeShow: false,
      roleTypeList: {},
      staffForm: this.$form.createForm(this),
      authorityList: {},
      treeData: [],
      replaceFields: {
        title: "moduleName",
        key: "moduleId",
      },
      expandedKeys: [],
      autoExpandParent: true,
      checkedKeys: [],
      keywordAuthority: "",
      comments:'',
      screenHeight: document.documentElement.clientHeight,
    };
  },
  mounted() {
    this.getModuleListInit();
    this.getRoleInit();
    console.log(this.checkedKeys);
    window.onresize = function () { // 定义窗口大小变更通知事件
      this.screenHeight = document.documentElement.clientHeight// 窗口高度
    }
  },
  methods: {
    searchChange(e) {
      this.keyword = e.target.value;
      // this.getRoleInit();
    },
    // 所有权限数据
    getModuleListInit() {
      getModuleList({
        moduleName: Trim(this.keywordAuthority),
      })
        .then((res) => {
          if (res.data.code == 0) {
            let newList = res.data.data.list;
            this.expandedKeys = this.allListInit(newList);
            this.treeData = newList;
          } else {
            this.treeData = [];
          }
        })
        .finally((res) => {});
    },
    // 树形结构数据处理
    allListInit(items) {
      let arr = [];
      if (!items) {
        return;
      }
      const getChild = (items) => {
        for (let i = 0; i < items.length; i++) {
          arr.push(items[i].moduleId);
          if (items[i].children && items[i].children.length > 0) {
            getChild(items[i].children);
          }
        }
        this.columnsShow = true;
        return arr;
      };
      return getChild(items);
    },
    // 树形全展开
    onExpand(expandedKeys) {
      this.expandedKeys = expandedKeys;
      this.autoExpandParent = false;
    },
    // 点击复选框
    onCheck(checkedKeys, item) {
      this.checkedKeys = checkedKeys.checked;
    },
    // 权限搜索
    onSearch(e) {
      this.keywordAuthority = e;
      this.getModuleListInit();
    },
    // 角色编码搜索
    handleChange(e) {
      this.moduleUrlValue = e.target.value;
    },
    // 关闭抽屉
    onClose() {
      this.visibleAuthority = false;
    },
    // 获取角色列表
    getRoleInit() {
      this.loading = true;
      getRole({
        roleName: Trim(this.keyword),
        roleCode: Trim(this.moduleUrlValue),
        pageNum: this.pagination.current,
        pageSize: this.pagination.pageSize,
      })
        .then((res) => {
          if (res.data.code == 0 && res.data.data !=null) {
            this.data = res.data.data.list;
            this.pagination.total = res.data.data.total;
            this.checkedKeys = []
          } else {
            this.data = [];
          }
        })
        .finally((res) => {
          this.loading = false;
        });
    },
    // 分页
    onShowSizeChange({ current, pageSize }) {
      this.pagination.current = current;
      this.pagination.pageSize = pageSize;
      this.getRoleInit();
    },
    // 新增确定
    handleOrganSubmit(e) {
      e.preventDefault();
      this.staffForm.validateFields((err, values) => {
        if(!Trim(values.roleName)){
          return this.$message.error('请输入角色名称')
        };
        if(!Trim(values.roleCode)){
          return this.$message.error('请输入角色编码')
        };
        if (!err) {
          if (this.updateType == 1) {
            addRole({
              roleName: Trim(values.roleName),
              roleCode: Trim(values.roleCode),
              comments: Trim(values.comments) || "",
            }).then((res) => {
              if (res.data.code == 0) {
                this.$message.success(res.data.data);
              } else {
                this.$message.error(res.data.data);
              }
              this.staffVisible = false;
              this.getRoleInit();
              this.staffForm.resetFields();
            });
          } else {
            updateRole({
              roleName: Trim(values.roleName),
              roleId: this.roleTypeList.roleId,
              comments: Trim(values.comments) || '',
            }).then((res) => {
              if (res.data.code == 0) {
                this.$message.success(res.data.data);
              } else {
                this.$message.error(res.data.data);
              }
              this.getRoleInit();
              this.staffVisible = false;
            });
          }
        }
      });
    },
    // 搜索
    handleSearchSubmit(e) {
      this.getRoleInit();
    },
    // 重置
    resetClick() {
      this.keyword = "";
      this.moduleUrlValue = "";
      this.getRoleInit();
    },
    handleUpdateClick(type, e) {
      this.updateType = type;
      this.roleTypeList = e;
      if (type == 1) {
        this.staffForm.resetFields();
        this.staffTitle = "新增角色";
        this.typeShow = false;
      } else {
        this.staffTitle = "编辑角色";
        this.typeShow = true;
        new Promise((resolve) => {
          resolve();
        }).then(() => {
          const formData = pick(e, ["roleName", "roleCode", "comments"]);
          this.staffForm.setFieldsValue(formData);
        });
      }
      this.staffVisible = true;
    },
    // 赋予权限
    handleGiveClick(e) {
      this.visibleAuthority = true;
      this.authorityList = e;
      getModuleByRoleId({
        roleId: e.roleId,
      }).then((res) => {
        if(res.data.data == null ) {
          this.checkedKeys = []
          }else {
            let newList = res.data.data;
            this.checkedKeys = this.allListInit(newList);
          }
      });
    },
    // 保存所选权限
    handleAddClick() {
      addRoleModules({
        roleId: this.authorityList.roleId,
        moduleIds: this.checkedKeys,
      }).then((res) => {
        if (res.data.code === 0) {
          this.$message.success(res.data.data, 1.5);
          this.visibleAuthority = false;
          this.getRoleInit();
        } else {
          this.$message.error(res.data.mesg, 1.5);
        }
      });
    },
    // 删除
    delClick(e) {
      this.$confirm({
        title: "删除提醒",
        content: "你确定要删除吗",
        onOk: () => {
          deleteRole({
            roleId: e.roleId,
          }).then((res) => {
            if (res.data.code == 0) {
              this.$message.success(res.data.data);
            } else {
              this.$message.error(res.data.data);
            }
            this.getRoleInit();
          });
        },
        onCancel() {},
      });
    },
  },
};
</script>

<style>
.role {
  background: #fff;
  padding: 22px;
  min-height: 100%;
}
/* .role .ant-table-thead > tr > th {
  border-bottom: 0;
  color: rgba(132, 145, 158, 1);
  font-weight: bold;
  cursor: pointer;
}

.role .ant-table-tbody > tr > td {
  border-bottom: 0;
  border-right: 1px solid #f0f0f0;
} */
.role .member-tag {
  color: #fd5158;
  /* margin-left: 12px; */
}
/* .role .member-edit {
  margin: 0 10px 0 20px;
} */
.authority {
  background: #fff;
  height: 100%;
}
.content {
  height: 100%;
}
.right-content {
  height: 500px;
  border: 1px solid #e8e8e8;
  overflow: auto;
  border-radius: 4px;
}
.left-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0px 0;
  font-weight: 900;
}
.right-head {
  height: 52px;
}
.authority-foot {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.content-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>

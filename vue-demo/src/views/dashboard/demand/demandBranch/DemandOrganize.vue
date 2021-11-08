<template>
  <div class="organize">
    <a-table
      :columns="columns"
      :dataSource="data"
      :pagination="false"
      :expandedRowKeys="columnsList"
      @expand="singleClick"
      :loading="loading"
      :rowKey="record => record.orgId"
    >
    <span slot="expandIcon">
      <a-icon type="down-circle" />
    </span>
    <span slot="customTitle"><icon-font type="icon-gongsi2" style="font-size: 22px;margin-right:10px" />{{customName}}</span>
    <a slot="customAction" href="javascript:;">
      <span @click="handleOrganizeClick(1,{})" style="margin-right: 10px;">添加组织</span>
      <span @click="allClick(1)" v-if="!columnsShow">展示全部部门</span>
      <span @click="allClick(2)" v-if="columnsShow">收起全部部门</span>
    </a>
    <span slot="action" slot-scope="record,item">
      <a @click="handleOrganizeClick(2,item)">添加下级</a>
      <a class="edit-custom" @click="handleOrganizeClick(3,item)">修改</a>
      <!-- <a style="color: #FD5158" @click="delClick(item)">删除</a> -->
    </span>
    </a-table>
    <a-modal title="删除组织" v-model="delVisible" width="500px">
			<template slot="footer">
				<a-button key="back" @click="delVisible = false">取消</a-button>
				<a-button
          key="submit"
          style="background: #22B8CF;border: #22B8CF"
          type="primary"
          @click="handleDelSubmit"
        >确定</a-button>
			</template>
      <div style="margin: 10px 0;">删除组织必须将相关数据合并到其他部门</div>
			<a-form :form="delForm" @submit="handleDelSubmit">
        <a-form-item label="把此组织数据合并到" :label-col="{ span: 8 }" :wrapper-col="{ span: 14 }" :colon="false">
          <a-tree-select
            allowClear
            :treeData="treeData"
            placeholder="请选择"
            treeDefaultExpandAll
            :dropdownStyle="{ maxHeight: '300px', overflow: 'auto' }"
            v-decorator="['trade',
              {
                rules: [
                  {
                    required: true,
                    message: '请选择其他组织'
                  }
                ]
              }
            ]"
          >
          </a-tree-select>
        </a-form-item>
			</a-form>
		</a-modal>
    
		<a-modal :title="staffTitle" v-model="staffVisible" width="500px">
			<template slot="footer">
				<a-button key="back" @click="staffVisible = false">取消</a-button>
				<a-button
          key="submit"
          style="background: #22B8CF;border: #22B8CF"
          type="primary"
          @click="handleOrganSubmit"
        >确定</a-button>
			</template>
			<a-form :form="staffForm" @submit="handleOrganSubmit">
				<a-row>
					<a-col :span="24">
						<a-form-item label="组织名称" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }" :colon="false">
							<a-input
                allowClear
								v-decorator="['orgName',
                {
                    rules: [
                      {
                        required: true,
                        message: '请输入组织名称'
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
					<a-col :span="24" v-if="staffShow">
						<a-form-item label="上级组织" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }" :colon="false">
              <a-tree-select
                allowClear
                placeholder="请选择"
                treeDefaultExpandAll
                :treeData="treeData"
                v-decorator="['orgId']"
                :dropdownStyle="{ maxHeight: '300px', overflow: 'auto' }"
              >
              </a-tree-select>
						</a-form-item>
					</a-col>
					<a-col :span="24">
						<a-form-item label="组织备注" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }" :colon="false">
              <a-input
                allowClear
								v-decorator="['comments']"
							/>
						</a-form-item>
					</a-col>
				</a-row>
			</a-form>
		</a-modal>
  </div>
</template>

<script>
import { IconFont } from '@configs/scriptURL'
import { getStructureList, delOrgStructure,addOrg,addOrgStructure,editStructure } from "@api/demandBranch/index"
import pick from 'lodash.pick';

const columns = [
  {
    dataIndex: "orgName",
    key: "orgName",
    slots: { title: 'customTitle' },
    scopedSlots: { customRender: 'orgName' },
  },
  {
    dataIndex: "action",
    width: "25%",
    key: "action",
    align: 'center',
    slots: { title: 'customAction' },
    scopedSlots: { customRender: 'action' },
  }
];
export default {
  components: {
    IconFont
  },
  data() {
    return {
      columns,  
      treeData: [],
      columnsList: [],
      data: [],
      staffVisible: false,
      staffTitle: '新增组织机构',
      staffForm: this.$form.createForm(this),
      delVisible: false,
      staffShow: false,
      columnsShow: false,
      delForm: this.$form.createForm(this),
      id: '', // 需求部门首页数据id
      customName: '', // 需求部门首页数据id
      addType: '', // 区分新增和编辑
      orgList: {}, // 点击修改获取单行列表数据
      loading: false
    };
  },
  mounted() {
    this.id = this.$route.query.id
    this.customName = this.$route.query.name
    this.getStructureListInit()
  },
  methods: {
    allClick(type) {
      if(type == 1) {
        this.columnsList = this.allListInit(this.data)
        this.columnsShow = true
      }else {
        this.columnsShow = false
        this.columnsList = []
      }
    },
    getStructureListInit() {
      this.loading = true
      getStructureList({
        customId: this.id
      }).then(res => {
        if(res.data.code == 0) {
          let newTmp = this.tmpListInit(res.data.data.orgList)
          this.treeData = newTmp
          this.data = res.data.data.orgList
        }else {
          this.data = []
        }
      }).finally(res => {
        this.loading = false;
      });
    },

    singleClick(e,item) {
      if(!e) {
        this.columnsList.forEach((items,index) => {
          if(item.orgId == items) {
            this.columnsList.splice(index,1)
          }
        })
      }else {
        this.columnsList.push(item.orgId)
      }
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
    allListInit(items) {
      let arr = []
      if(!items) {
        return
      }
      const getChild =(items) => {
        for (let i = 0; i < items.length; i++) {
          arr.push(items[i].orgId)
          if (items[i].children && items[i].children.length > 0) {
            getChild(items[i].children)
          }
        }
        return arr
      }
      this.columnsShow = true
      return getChild(items)
    },
    handleOrganSubmit(e) {
      e.preventDefault();
      this.staffForm.validateFields((err, values) => {
        if (!err) {
          switch (this.addType) {
            case 1:
              addOrg({
                comments: values.comments,
                orgName: values.orgName,
                customId: this.id
              }).then(res => {
                if(res.data.code == 0) {
                  this.$message.success(res.data.data)
                }else {
                  this.$message.error(res.data.data)
                }
                this.staffVisible = false
                this.getStructureListInit()
                this.staffForm.resetFields()
              })
              break;
            case 2:
              addOrgStructure({
                comments: values.comments,
                orgName: values.orgName,
                customId: this.id,
                parentOrgId: values.orgId
              }).then(res => {
                if(res.data.code == 0) {
                  this.$message.success(res.data.data)
                }else {
                  this.$message.error(res.data.data)
                }
                this.staffVisible = false
                this.getStructureListInit()
              })
              break;
            default:
              editStructure({
                comments: values.comments,
                orgName: values.orgName,
                orgId: this.orgList.orgId
              }).then(res => {
                if(res.data.code == 0) {
                  this.$message.success(res.data.data)
                }else {
                  this.$message.error(res.data.data)
                }
                this.staffVisible = false
                this.getStructureListInit()
              })
              break;
          }
          console.log(values);
        }
      })
    },
    handleOrganizeClick(type,e) {
      this.addType = type
      this.orgList = e
      this.staffVisible = true
      switch (type) {
        case 1:
          this.staffTitle = '新增组织机构'
          this.staffShow = false
          this.staffForm.resetFields()
          break;
        case 2:
          this.staffTitle = '新增下级'
          this.staffForm.resetFields()
          this.staffShow = true
          new Promise(resolve => {
            resolve()
          }).then(() => {
            const formData = pick(e, [
              'orgId',
            ])
            this.staffForm.setFieldsValue(formData)
          })
          break;
        default:
          this.staffTitle = '编辑组织机构'
          this.staffShow = false
          new Promise(resolve => {
            resolve()
          }).then(() => {
            const formData = pick(e, [
              'orgName',
              'comments',
            ])
            this.staffForm.setFieldsValue(formData)
          })
          break;
      }
    },
    handleDelSubmit(e) {
      e.preventDefault();
      this.delForm.validateFields((err, values) => {
        if (!err) {
          console.log(values);
          delOrgStructure({
            orgId: values.trade
          }).then((res)=>{
            if(res.data.code==0){
              this.$message.success('删除成功');
              this.delVisible = false;
              this.getStructureListInit();
            }else{
              this.$message.error('删除失败');
            }
          })
        }
      })
    },
    delClick(e) {
      this.delVisible = true
    }
  }
};
</script>

<style>
.organize {
  background: #fff;
  padding: 22px;
}
.organize .ant-table-thead > tr > th {
  background: #fff;
}
.organize .ant-table-tbody > tr > td {
  border-bottom: none;
}
.organize .edit-custom {
  margin: 0 16px 0 24px;
}
</style>
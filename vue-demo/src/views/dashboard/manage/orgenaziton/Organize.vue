<template>
	<div class="organize">
		<a-table
			:columns="columns"
			:dataSource="data"
			:pagination="false"
			:expandedRowKeys="columnsList"
			@expand="singleClick"
			:loading="loading"
			:rowKey="record => record.sysOrgId"
		>
			<span slot="expandIcon">
				<a-icon type="down-circle" />
			</span>
			<span slot="customTitle">
				<icon-font type="icon-gongsi2" style="font-size: 22px;margin-right:10px" />
				{{customName}}
			</span>
			<a slot="customAction" href="javascript:;">
				<can-i-use code="rygl-zzgl-zzxz">
					<span @click="handleOrganizeClick(1, {})" style="margin-right: 10px;">添加组织</span>
				</can-i-use>
				<span @click="allClick(1)" v-if="!columnsShow">展示全部部门</span>
				<span @click="allClick(2)" v-if="columnsShow">收起全部部门</span>
			</a>
			<span slot="action" slot-scope="record, item">
				<can-i-use code="rygl-zzgl-zzxz">
					<a @click="handleOrganizeClick(2, item)">添加下级</a>
				</can-i-use>
				<a-divider type="vertical" />
				<can-i-use code="rygl-zzgl-zzxg">
					<a @click="handleOrganizeClick(3, item)">修改</a>
				</can-i-use>
				<a-divider type="vertical" />
				<!-- <can-i-use code="rygl-zzgl-zzsc">
					<a style="color: #FD5158" @click="delClick(item)">删除</a>
				</can-i-use> -->
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
				<a-form-item
					label="把此组织数据合并到"
					:label-col="{ span: 8 }"
					:wrapper-col="{ span: 14 }"
					:colon="false"
				>
					<a-tree-select
						allowClear
						:treeData="newTmpAllList"
						placeholder="请选择"
						treeDefaultExpandAll
						:dropdownStyle="{ maxHeight: '300px', overflow: 'auto' }"
						v-decorator="[
              'parentOrgId',
              {
                rules: [
                  {
                    required: true,
                    message: '请选择其他组织'
                  }
                ]
              }
            ]"
					></a-tree-select>
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
								v-decorator="['orgName',
                {
                  rules: [
                    {
					 
                      required: true,
                      message: '请输入组织机构'
                    },
                    {
                      pattern: [/\s\s*$/, ''],
                      message: '禁止输入空格',
                    }
                  ]
                }
              ]"
								allowClear

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
								v-decorator="['sysOrgId']"
								:dropdownStyle="{ maxHeight: '300px', overflow: 'auto' }"
							></a-tree-select>
						</a-form-item>
					</a-col>
					<a-col :span="24">
						<a-form-item label="组织备注" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }" :colon="false">
							<a-input v-decorator="['comments']" allowClear />
						</a-form-item>
					</a-col>
				</a-row>
			</a-form>
		</a-modal>
	</div>
</template>

<script>
import { IconFont } from "@configs/scriptURL";
import  {Trim}  from "../../../../trim/trim";
import {
	getOrgStructure,
	delOrgStructure,
	addOrgStructure,
	editStructure,
	getChildrenOrg
} from "@api/manage/index";
import pick from "lodash.pick";

const columns = [
	{
		dataIndex: "orgName",
		key: "orgName",
		slots: { title: "customTitle" },
		scopedSlots: { customRender: "orgName" }
	},
	{
		dataIndex: "action",
		width: "25%",
		key: "action",
		slots: { title: "customAction" },
		scopedSlots: { customRender: "action" }
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
			loading: false,
			staffVisible: false,
			staffTitle: "新增组织机构",
			staffForm: this.$form.createForm(this),
			delVisible: false,
			staffShow: false,
			columnsShow: false,
			delForm: this.$form.createForm(this),
			id: "", // 需求部门首页数据id
			customName: "", // 需求部门首页数据id
			addType: "", // 区分新增和编辑
			orgList: {}, // 点击修改获取单行列表数据
			sysOrgTmpId: "",
			newTmpAllList: []
		};
	},
	mounted() {
		this.id = this.$route.query.id;
		this.customName = this.$route.query.name;
		this.getOrgStructureInit();
	},
	methods: {
		allClick(type) {
			if (type == 1) {
				this.columnsList = this.allListInit(this.data);
				this.columnsShow = true;
			} else {
				this.columnsShow = false;
				this.columnsList = [];
			}
		},
		getOrgStructureInit() {
			this.loading = true;
			getOrgStructure({
				customId: this.id
			})
				.then(res => {
					if (res.data.code == 0) {
						let newTmp = this.tmpListInit(res.data.data);
						this.treeData = newTmp;
						this.newTmpAllList = newTmp;
						this.data = res.data.data;
					} else {
						this.data = [];
					}
				})
				.finally(res => {
					this.loading = false;
				});
		},
		singleClick(e, item) {
			if (!e) {
				this.columnsList.forEach((items, index) => {
					if (item.sysOrgId == items) {
						this.columnsList.splice(index, 1);
					}
				});
			} else {
				this.columnsList.push(item.sysOrgId);
			}
		},
		// 组成新数组
		tmpListInit(val) {
			let arr = [];
			if (val.length !== 0) {
				val.forEach(item => {
					let obj = {};
					obj.key = item.sysOrgId;
					obj.value = item.sysOrgId;
					obj.title = item.orgName;
					if (item.children) {
						obj.children = this.tmpListInit(item.children);
					}
					arr.push(obj);
				});
			}
			return arr;
		},
		// 递归遍历数组获取所有的展开项id
		allListInit(items) {
			let arr = [];
			if (!items) {
				return;
			}
			const getChild = items => {
				for (let i = 0; i < items.length; i++) {
					arr.push(items[i].sysOrgId);
					if (items[i].children && items[i].children.length > 0) {
						getChild(items[i].children);
					}
				}
				return arr;
			};
			this.columnsShow = true;
			return getChild(items);
		},
		handleOrganSubmit(e) {
			e.preventDefault();
			this.staffForm.validateFields((err, values) => {
				if(!Trim(values.orgName)){
					return this.$message.error('请输入组织名称')
				}
				if (!err) {
					switch (this.addType) {
						case 3:
							editStructure({
								comments:Trim(values.comments),
								orgName: Trim(values.orgName),
								sysOrgId: this.orgList.sysOrgId
							}).then(res => {
								if (res.data.code == 0) {
									this.$message.success(res.data.data);
								} else {
									this.$message.error(res.data.mesg);
								}
								this.getOrgStructureInit();
								this.staffVisible = false;
							});
							break;
						default:
							addOrgStructure({
								
								comments: Trim(values.comments),
								orgName: Trim(values.orgName),
								customId: this.id,
								parentOrgId:
									this.addType == 1
										? 0
										: this.orgList.sysOrgId
							}).then(res => {
								if (res.data.code == 0) {
									this.$message.success(res.data.data);
								} else {
									this.$message.error(res.data.mesg);
								}
								this.staffVisible = false;
								this.getOrgStructureInit();
								this.staffForm.resetFields("orgName");
								this.staffForm.resetFields("comments");
							});
							break;
					}
				}
			});
		},
		handleOrganizeClick(type, e) {
			this.addType = type;
			this.orgList = e;
			console.log(this.orgList);
			this.staffVisible = true;
			switch (type) {
				case 1:
					this.staffTitle = "新增组织机构";
					this.staffShow = false;
					this.staffForm.resetFields();
					break;
				case 2:
					this.staffTitle = "新增下级";
					this.staffForm.resetFields();
					this.staffShow = true;
					new Promise(resolve => {
						resolve();
					}).then(() => {
						const formData = pick(e, ["sysOrgId"]);
						console.log(formData);
						this.staffForm.setFieldsValue(formData);
					});
					break;
				default:
					this.staffTitle = "编辑组织机构";
					this.staffShow = false;
					new Promise(resolve => {
						resolve();
					}).then(() => {
						const formData = pick(e, ["orgName", "comments"]);
						this.staffForm.setFieldsValue(formData);
					});
					break;
			}
		},
		// 删除组织合并
		handleDelSubmit(e) {
			e.preventDefault();
			this.delForm.validateFields((err, values) => {
				if (!err) {
					delOrgStructure({
						sysOrgId: this.sysOrgTmpId,
						parentOrgId: values.parentOrgId
					}).then(res => {
						if (res.data.code == 0) {
							this.$message.success(res.data.data);
						} else {
							this.$message.error(res.data.data);
						}
						this.delVisible = false;
						this.getOrgStructureInit();
					});
				}
			});
		},
		// 遍历数组对应id并删除该项
		findChirdenInit(data, obj) {
			if (typeof obj !== "object" || obj === null) {
				return obj;
			}
			const copy = Array.isArray(obj) ? [] : {};
			Object.keys(obj).forEach(key => {
				if (data !== obj[key].value) {
					copy[key] = this.findChirdenInit(data, obj[key]);
				}
			});
			return copy;
		},
		// 没有下级组织直接删除
		delClick(e) {
			this.sysOrgTmpId = e.sysOrgId;
			let newTmpAllList = this.findChirdenInit(e.sysOrgId, this.treeData);
			this.newTmpAllList = newTmpAllList;
			getChildrenOrg({
				sysOrgId: e.sysOrgId
			}).then(res => {
				if (res.data.code == 0) {
					this.delVisible = true;
				} else {
					this.$confirm({
						title: "删除提醒",
						content: "你确定要删除吗",
						onOk: () => {
							delOrgStructure({
								sysOrgId: e.sysOrgId
							}).then(res => {
								if (res.data.code == 0) {
									this.$message.success(res.data.data);
								} else {
									this.$message.error(res.data.data);
								}
								this.getOrgStructureInit();
							});
						},
						onCancel() {}
					});
				}
			});
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

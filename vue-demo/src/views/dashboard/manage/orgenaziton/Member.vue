<template>
	<div class="member">
		<a-row :gutter="16">
			<a-col :span="24" style="display: flex">
				<a-input-group compact style="width: 366px">
					<a-select style="width: 100px" v-model="searchSelect" @change="searchChange">
						<a-select-option :value="item.id" v-for="item in searchList" :key="item.id">{{ item.title }}</a-select-option>
					</a-select>
					<a-input-search
						style="width: 260px"
						:placeholder="placeholderTitle"
						@search="onSearch"
						v-model="keywordValue"
						v-if="!placeholderShow && !roleValueShow && !statusValueShow"
						allowClear
					/>
					<a-select
						placeholder="请选择角色"
						v-model="roleValue"
						@change="handleRoleClick"
						v-if="roleValueShow"
						style="width: 260px"
						allowClear
					>
						<a-select-option
							:value="item.roleId"
							v-for="item in organizeList"
							:key="item.roleId"
						>{{ item.roleName }}</a-select-option>
					</a-select>
					
					<a-select
						placeholder='请选择状态'
						v-model="statusValue"
						@change="handleStatusValueClick"
						v-if="statusValueShow"
						style="width: 260px"
						allowClear
					>
						<a-select-option :value="0" :key="0">全部</a-select-option>
						<a-select-option :value="1" :key="1">启用</a-select-option>
						<a-select-option :value="2" :key="2">禁用</a-select-option>
					</a-select>

					<a-tree-select
						allowClear
						placeholder="请选择组织机构"
						treeDefaultExpandAll
						:treeData="treeData"
						v-model="organizeValue"
						v-if="placeholderShow && !roleValueShow"
						@change="handleTradeSearchClick"
						style="width: 260px"
						:dropdownStyle="{ maxHeight: '300px', overflow: 'auto' }"
					></a-tree-select>
				</a-input-group>
				<can-i-use code="rygl-zzgl-cysc">
					<a-button
						type="primary"
						style="margin-left: 10px;background: #22B8CF;border: #22B8CF"
						@click="handleAddClick(1)"
					>
						<a-icon type="plus-circle" />新增成员
					</a-button>
				</can-i-use>
			</a-col>
		<a-col :span="24"><a-divider style="height:0.5px;" /></a-col>
			<a-col :span="24" >
				<a-table
					:rowKey="record => record.userId"
					:columns="columns"
					:dataSource="data"
					:pagination="pagination"
					class="zebra"
					:loading="loading"
					@change="onShowSizeChange"
					bordered
				>
					<can-i-use>
						<span slot="actionTitle">
							<div>操作</div>
						</span>
					</can-i-use>
					<span slot="action" slot-scope="record, item">
						<can-i-use code="rygl-zzgl-cyjs">
							<a color="#90B5F5" @click="handleGiveClick(item)">赋予角色</a>
						</can-i-use>
						<a-divider type="vertical"/>
						<can-i-use code="rygl-zzgl-cyxg">
							<a  @click="handleAddClick(2, item)">修改</a>
						</can-i-use>
						<a-divider type="vertical"/>
						<can-i-use code="rygl-zzgl-cyxg">
							<a  @click="changeStatus(item)" :style="item.status === 1 ? 'color: #fd5158' : 'color: #67c23a'">{{ changeDataStatus(item.status) }}</a>
						</can-i-use>
						<a-divider type="vertical"/>
						<can-i-use code="rygl-zzgl-cysc">
							<a class="member-tag" @click="delClick(item)">删除</a>
						</can-i-use>
					</span>
					<span
						slot="dataAuthority"
						slot-scope="record, item"
					>{{ dataAuthorityStatus(item.dataAuthority) }}</span>
					<span
						slot="status"
						slot-scope="record, item"
						:style="item.status === 1 ? 'color: #67c23a' : 'color: #fd5158'"
					>{{ dataStatus(item.status) }}</span>
				</a-table>
			</a-col>
		</a-row>
		<a-modal :title="staffTitle" v-model="staffVisible" width="500px" style="top: 20px;">
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
						<a-form-item label="成员名称" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }" :colon="false">
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
						 
                      pattern:/^\s\s$/=='',
                      message: '请输入成员名称'
                   
					  }
                    ]
                  }
                ]"
							/>
						</a-form-item>
					</a-col>
					<a-col :span="24">
						<a-form-item label="成员邮箱" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }" :colon="false">
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
						<a-form-item label="手机号" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }" :colon="false">
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
                        pattern: /^1[3|4|5|7|8|9][0-9]\d{8}$/,
                        message: '请输入正确的手机号'
                      }
                    ]
                  }
                ]"
							/>
						</a-form-item>
					</a-col>
					<a-col :span="24">
						<a-form-item label="工号" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }" :colon="false">
							<a-input
								allowClear
								v-decorator="[
                  'userNo',
                  {
                    rules: [
                      {
						
                        required: true,
                        message: '请输入工号'
                      }
                    ]
                  }
                ]"
							/>
						</a-form-item>
					</a-col>
					<a-col :span="24" v-if="!disabledShow">
						<a-form-item label="角色" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }" :colon="false">
							<a-select allowClear placeholder="请选择角色" v-decorator="['roleId']" style="width: 260px">
								<a-select-option
									:value="item.roleId"
									v-for="item in organizeList"
									:key="item.roleId"
								>{{ item.roleName }}</a-select-option>
							</a-select>
						</a-form-item>
					</a-col>
					<a-col :span="24">
						<a-form-item label="数据权限" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }" :colon="false">
							<a-select
								allowClear
								v-decorator="[
                  'dataAuthority',
                  {
                    initialValue: 3
                  }
                ]"
								placeholder="请选择"
							>
								<a-select-option
									:value="item.value"
									v-for="item in resourcePowerList"
									:key="item.value"
								>{{ item.label }}</a-select-option>
							</a-select>
						</a-form-item>
					</a-col>
					<a-col :span="24">
						<a-form-item label="组织机构" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }" :colon="false">
							<a-tree-select
								allowClear
								placeholder="请选择"
								treeDefaultExpandAll
								:treeData="treeData"
								v-decorator="['orgId',
                  {
                    rules: [
                      {
						
                        required: true,
                        message: '请选择组织机构'
                      }
                    ]
                  }
                ]"
								:dropdownStyle="{ maxHeight: '230px', overflow: 'auto' }"
							></a-tree-select>
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
			:afterVisibleChange="afterVisibleChange"
		>
			<a-row>
				<a-col :span="24" class="content">
					<div class="left-head">
						<span>
							资源清单：{{ checkedKeys.length }}/{{
							this.organizeList.length
							}}项
						</span>
						<a-input-search @search="onVisibleSearch" style="width: 220px">
							<a-button type="primary" slot="enterButton" style="background: #22B8CF;border: #22B8CF">
								<a-icon type="search" />搜索
							</a-button>
						</a-input-search>
					</div>
					<a-divider />
					<div class="right-content">
						<a-radio-group @change="visibleChange" v-model="checkedList">
							<a-row :gutter="[16, 16]" style="margin: 0;">
								<a-col :span="24" v-for="item in organizeList" :key="item.roleId">
									<a-radio :value="item.roleId">
										{{
										item.roleName
										}}
									</a-radio>
								</a-col>
							</a-row>
						</a-radio-group>
					</div>
					<div class="authority-foot">
						<a-button
							type="primary"
							style="background: #22B8CF;border: #22B8CF"
							@click="handleVisibleClick()"
						>保存</a-button>
					</div>
				</a-col>
			</a-row>
		</a-drawer>
	</div>
</template>

<script>
import {
	getOrgStructure,
	getUserInfoList,
	alterUserInfo,
	addUserInfo,
	delUserInfo,
	getRole,
	getRolesByUserId,
	addRoleUsers,
	changeDisUserInfo
} from "@api/manage/index";
import pick from "lodash.pick";
import { createNamespacedHelpers } from "vuex";
import { Trim } from "../../../../trim/trim"
const { mapState } = createNamespacedHelpers("status");
const columns = [
	{
		title: "姓名",
		dataIndex: "userName",
		key: "userName"
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
		title: "工号",
		key: "userNo",
		dataIndex: "userNo"
	},
	{
		title: "角色",
		key: "roleName",
		dataIndex: "roleName"
	},
	{
		title: "组织机构",
		key: "orgName",
		dataIndex: "orgName"
	},
	{
		title: "数据权限",
		scopedSlots: { customRender: "dataAuthority" }
	},
	{
		title: "状态",
		align: "center",
		scopedSlots: { customRender: "status" }
	},
	{
		title: "操作",
		key: "action",
		align: "center",
		width:220,
		slots: { title: "actionTitle" },
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
			visibleAuthority: false,
			authorityList: {},
			placeholderTitle: "请输入成员名称",
			placeholderShow: false,
			roleValueShow: false,
			statusValueShow: false,
			organizeValue: null,
			searchSelect: 1,
			staffTitle: "新增成员",
			staffVisible: false,
			staffForm: this.$form.createForm(this),
			type: "",
			typeSearch: 1,
			keywordValue: "", // 搜索绑定内容
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
					title: "角色"
				},
				{
					id: 4,
					title: "手机号"
				},
				{
					id: 5,
					title: "组织机构"
				},
				{
					id: 6,
					title: '状态'
				},
			],
			treeData: [],
			id: "",
			loading: false,
			roleValue: undefined,
			organizeList: [],
			updateList: {},
			disabledShow: false,
			checkedList: '',
			checkedKeys: [],
			statusValue: undefined,
		};
	},
	computed: {
		...mapState({
			resourcePowerList: state => state.resourcePowerList
		})
	},
	mounted() {
		this.id = this.$route.query.id;
		this.getOrgStructureInit();
		this.getUserInfoInit();
		this.getRoleInit();
	},
	methods: {
		handleStatusValueClick(e) {
			this.statusValue = e;
			this.roleValue = undefined;
			this.keyword = null;
			this.mailValue = null;
			this.phoneValue = null;
			this.organizeValue = null;
			this.getUserInfoInit();
		},
		changeStatus(data) {
			console.log(data, '状态更改')
			this.$confirm({
				title: "确认提示?",
				content: "确定更改状态吗？",
				onOk: () => {
					changeDisUserInfo({
						sysUserId: data.userId,
						status: data.status
					}).then(res => {
						if (res.data.code == 0) {
							this.$message.success(res.data.data);
						} else {
							this.$message.error(res.data.mesg);
						}
						this.getUserInfoInit();
					});
				},
				onCancel() {}
			});
		},
		changeDataStatus(data) {
			switch (data) {
				case 1:
					return "禁用";
				case 2:
					return "启用";
			}
		},
		dataStatus(data){
			// console.log(data, '状态')
			switch (data) {
				case 1:
					return "启用";
				case 2:
					return "禁用";
			}
		},
		dataAuthorityStatus(data) {
			switch (data) {
				case 0:
					return "全局权限";
				case 1:
					return "公司权限";
				case 2:
					return "部门权限";
				case 3:
					return "个人权限";
			}
		},
		onVisibleSearch(e) {
			this.moduleUrlValue = e;
			this.getRoleInit();
		},
		afterVisibleChange(val) {
			console.log("visible", val);
		},
		onClose() {
			this.visibleAuthority = false;
		},
		// 获取该成员已有的角色
		handleGiveClick(e) {
			this.visibleAuthority = true;
			this.authorityList = e;
			getRolesByUserId({
				userId: e.userId
			}).then(res => {
				if (res.data.code == 0) {
					let tmpCheckList = res.data.data;
					// let tmpAllList = [];
					tmpCheckList.map(item => {
						// tmpAllList.push(item.roleId);
						this.checkedList = item.roleId;
						this.checkedKeys.push(item.roleId);
					});
					// this.checkedList = tmpAllList;
					// this.checkedKeys = tmpAllList;
				} else {
					this.checkedList ='';
				}
			});
		},
		// 确定赋予角色
		handleVisibleClick() {
			
			let roleIds = [];
			roleIds.push(this.checkedKeys.target.value);
			console.log(roleIds,'this.checkedKeys')
			addRoleUsers({
				userId: this.authorityList.userId,
				roleIds: roleIds
			}).then(res => {
				if (res.data.code === 0) {
					this.$message.success("赋予角色成功！", 1.5);
					this.visibleAuthority = false;
					this.getUserInfoInit();
				} else {
					this.$message.error(res.data.mesg, 1.5);
				}
			});
		},
		visibleChange(e) {
			this.checkedKeys = e;
		},
		onSearch(e) {
			switch (this.typeSearch) {
				case 1:
					this.keyword = e;
					this.phoneValue = null;
					this.mailValue = null;
					this.roleValue = null;
					this.organizeValue = null;
					this.statusValue = null;
					break;
				case 2:
					this.mailValue = e;
					this.phoneValue = null;
					this.keyword = null;
					this.roleValue = null;
					this.organizeValue = null;
					this.statusValue = null;
					break;
				case 4:
					this.phoneValue = e;
					this.keyword = null;
					this.mailValue = null;
					this.roleValue = null;
					this.organizeValue = null;
					this.statusValue = null;
					break;
			}
			this.getUserInfoInit();
		},
		handleRoleClick(e) {
			this.roleValue = e;
			this.keyword = null;
			this.mailValue = null;
			this.phoneValue = null;
			this.organizeValue = null;
			this.statusValue = null;
			this.getUserInfoInit();
		},
		searchChange(e) {
			this.typeSearch = e;
			switch (e) {
				case 1:
					this.placeholderShow = false;
					this.roleValueShow = false;
					this.keywordValue = null;
					this.roleValue = undefined;
					this.statusValueShow = false;
					this.statusValue = undefined;
					this.placeholderTitle = "请输入成员名称";
					break;
				case 2:
					this.placeholderShow = false;
					this.roleValueShow = false;
					this.statusValueShow = false;
					this.keywordValue = null;
					this.statusValue = undefined;
					this.placeholderTitle = "请输入成员邮箱";
					break;
				case 3:
					// 角色
					this.placeholderShow = false;
					this.statusValueShow = false;
					this.roleValueShow = true;
					this.statusValue = undefined;
					break;
				case 4:
					// 手机号
					this.placeholderShow = false;
					this.roleValueShow = false;
					this.statusValueShow = false;
					this.keywordValue = null;
					this.statusValue = undefined;
					this.placeholderTitle = "请输入成员手机号";
					break;
				case 6:
					// 状态
					this.placeholderShow = false;
					this.roleValueShow = false;
					this.statusValue = undefined;
					this.statusValueShow = true;
					break;
				default:
					// 组织
					this.placeholderShow = true;
					this.statusValueShow = false;
					this.statusValue = undefined;
					this.roleValueShow = false;
					break;
			}
		},
		getUserInfoInit() {
			this.loading = true;
			getUserInfoList({
				status: this.statusValue,
				customId: this.id,
				userName: Trim(this.keyword),
				phone: Trim(this.phoneValue),
				sysOrgId: this.organizeValue,
				roleId: this.roleValue,
				mail: Trim(this.mailValue),
				pageNum: this.pagination.current,
				pageSize: this.pagination.pageSize
			})
				.then(res => {
					if (res.data.data.length == []) {
						this.data = [];
					} else {
						this.data = res.data.data.userList.list;
						this.pagination.total = res.data.data.userList.total;
					}
				})
				.finally(res => {
					this.loading = false;
				});
		},
		// 分页
		onShowSizeChange({ current, pageSize }) {
			this.pagination.current = current;
			this.pagination.pageSize = pageSize;
			this.getUserInfoInit();
		},
		handleTradeSearchClick(e) {
			this.organizeValue = e;
			this.keyword = null;
			this.mailValue = null;
			this.phoneValue = null;
			this.roleValue = undefined;
			this.statusValue = undefined;
			this.getUserInfoInit();
		},
		getOrgStructureInit() {
			getOrgStructure({
				customId: this.id
			}).then(res => {
				if (res.data.code == 0) {
					let newTmp = this.tmpListInit(res.data.data);
					this.treeData = newTmp;
				} else {
					this.treeData = [];
				}
			});
		},
		// 获取角色列表
		getRoleInit() {
			console.log(this.moduleUrlValue,'this.moduleUrlValue')
			getRole({
				roleName: Trim(this.moduleUrlValue),
				roleCode: ""
			}).then(res => {
				if (res.data.code == 0) {
					this.organizeList = res.data.data;
				} else {
					this.organizeList = [];
				}
			});
		},
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
		handleAddClick(type, e) {
			this.updateList = e;
			this.type = type;
			if (type == 1) {
				this.staffTitle = "新增成员";
				this.staffForm.resetFields();
				this.disabledShow = false;
			} else {
				this.staffTitle = "编辑成员";
				this.disabledShow = true;
				new Promise(resolve => {
					resolve();
				}).then(() => {
					const formData = pick(e, [
						"userName",
						"mail",
						"phone",
						"orgId",
						"userNo",
						"dataAuthority"
					]);
					if (formData.dataAuthority == 0) {
						formData.dataAuthority = "全部";
					} else {
						formData.dataAuthority = formData.dataAuthority;
					}
					this.staffForm.setFieldsValue(formData);
				});
			}
			this.staffVisible = true;
		},
		delClick(e) {
			console.log(e);
			this.$confirm({
				title: "确认提示?",
				content: "确定删除信息吗？",
				onOk: () => {
					delUserInfo({
						sysUserId: e.userId
					}).then(res => {
						if (res.data.code == 0) {
							this.$message.success(res.data.data);
						} else {
							this.$message.error(res.data.mesg);
						}
						this.getUserInfoInit();
					});
				},
				onCancel() {}
			});
		},
		handleOrganSubmit(e) {
			e.preventDefault();
			this.staffForm.validateFields((err, values) => {
				if (!err) {
					if (this.type == 2) {
						alterUserInfo({
							userName: Trim(values.userName),
							sysUserId: this.updateList.userId,
							mail: Trim(values.mail),
							phone: Trim(values.phone),
							customOrgId: values.orgId,
							customId: this.id,
							roleId: values.roleId,
							userNo: Trim(values.userNo),
							dataAuthority: values.dataAuthority
						}).then(res => {
							if (res.data.code == 0) {
								this.$message.success(res.data.data);
								this.staffVisible = false;
								this.getUserInfoInit();
							} else {
								this.$message.error(res.data.mesg);
							}
							
						});
					} else {
						addUserInfo({
							userName: Trim(values.userName),
							mail: Trim(values.mail),
							phone: Trim(values.phone),
							customOrgId: values.orgId,
							customId: this.id,
							userNo: Trim(values.userNo),
							roleId: values.roleId,
							dataAuthority: values.dataAuthority
						}).then(res => {
							if (res.data.code == 0) {
								this.$message.success(res.data.data);
								this.staffVisible = false
								this.getUserInfoInit();
								this.staffForm.resetFields();
							} else {
								this.$message.error(res.data.mesg);
							}
							
						});
					}
				}
			});
		}
	}
};
</script>

<style>
.member {
	background: #fff;
	padding: 22px;
	min-height: 100%;
}
.member .member-tag {
	color: #fd5158;
	/* margin-left: 12px; */
}

.authority {
	background: #fff;
	height: 100%;
}
.content {
	height: 100%;
}
.right-content {
	height: 500px;
	overflow-y: auto;
	width: 100%;
	border: 1px solid #e8e8e8;
	border-radius: 4px;
	padding: 10px 10px;
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
	float:right
}
.content-btn {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
</style>

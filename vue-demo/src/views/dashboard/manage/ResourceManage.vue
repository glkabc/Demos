<template>
	<div class="resource">
		<div class="resoure-main">
			<span style="margin-right: 10px;color:#78909C;font-weight: 600">资源名称</span>
			<a-input
				v-model.trim="keyword"
				@change="searchChange"
				placeholder="请输入资源名称"
				allowClear
				style="width: 220px"
				@keyup.enter="handleSearchSubmit"
			/>
			<span style="margin:0 10px 0 20px;color:#78909C;font-weight: 600">资源编码</span>
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
			>查询</a-button>
			<a-button
				:style="{
          marginLeft: '10px',
          backgroundColor: '#22b8cf',
          border: '#22b8cf',
        }"
				@click="resetClick"
				type="primary"
			>重置</a-button>
			
			
			<a-divider />
			<div :span="24" style="display: flex;justify-content: space-between;align-items: center">
				<a-button
					type="primary"
					style="margin-bottom: 24px;background: #22B8CF;border: #22B8CF"
					@click="handleUpdateClick(1, {})"
				>
					<a-icon type="plus-circle" />新增资源
				</a-button>
				<a href="javascript:;" style="padding-right: 10px">
					<span @click="allClick(1)" v-if="!columnsShow">展开全部资源</span>
					<span @click="allClick(2)" v-if="columnsShow">收起全部资源</span>
				</a>
			</div>
		</div>
		<a-table
			:columns="columns"
			:dataSource="data"
			:pagination="false"
			:expandedRowKeys="columnsList"
			@expand="singleClick"
			rowKey="moduleId"
			class="zebra"
			:scroll="{ y: screenHeight - 350 }"
			:loading="loading"
			bordered
		>
			<span slot="moduleName" slot-scope="item, record">{{ record.moduleName }}</span>
			<span
				slot="dataAuthority"
				slot-scope="item, record"
			>{{ dataAuthorityStatus(record.dataAuthority) }}</span>

			<span slot="moduleType" slot-scope="item, record">
				<span v-text="record.moduleType == 0 ? '目录' : '按钮'"></span>
			</span>
			<span slot="action" slot-scope="item, record">
				<a class="edit-manage" @click="handleUpdateClick(3, record)">添加下级</a>
				<a-divider type="vertical"/>
				<a class="edit-manage" @click="handleUpdateClick(2, record)">修改</a>
				<a-divider type="vertical"/>
				<a style="color: #FD5158" @click="delClick(record)">删除</a>
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
				>确定</a-button>
			</template>
			<a-form :form="staffForm" @submit="handleOrganSubmit">
				<a-row>
					<a-col :span="24" v-if="updateShow">
						<a-form-item label="上级资源" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }" :colon="false">
							<a-input v-decorator="['parentName']" disabled />
						</a-form-item>
					</a-col>
					<a-col :span="24">
						<a-form-item label="资源名称" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }" :colon="false">
							<a-input
								v-decorator="[
                  'moduleName',
                  {
                    rules: [
                      {
                        required: true,
                        message: '请输入资源名称',
                      },
                      
                    ],
                  },
                ]"
								allowClear
							/>
						</a-form-item>
					</a-col>
					<a-col :span="24">
						<a-form-item label="资源编码" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }" :colon="false">
							<a-input
								v-decorator="[
                  'moduleCode',
                  {
                    rules: [
                      {
                        required: true,
                        message: '请输入资源编码',
                      },
                      
                    ],
                  },
                ]"
								:disabled="disabledShow"
								allowClear
							/>
						</a-form-item>
					</a-col>
					<a-col :span="24">
						<a-form-item
							label="资源URL"
							:label-col="{ span: 7 }"
							:wrapper-col="{ span: 14 }"
							:colon="false"
						>
							<a-input
								v-decorator="[
                  'moduleUrl',
                  {
                    rules: [
                      {
                        required: true,
                        message: '请输入资源URL',
                      },
                      
                    ],
                  },
                ]"
								allowClear
							/>
						</a-form-item>
					</a-col>
					<a-col :span="24">
						<a-form-item label="资源分类" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }" :colon="false">
							<a-select
								v-decorator="[
                  'moduleType',
                  {
                    rules: [
                      {
                        required: true,
                        message: '请选择资源分类',
                      },
                    ],
                  },
                ]"
								placeholder="请选择"
								allowClear
							>
								<a-select-option
									:value="item.value"
									v-for="item in organizeList"
									:key="item.value"
								>{{ item.label }}</a-select-option>
							</a-select>
						</a-form-item>
					</a-col>
					<a-col :span="24">
						<a-form-item label="数据权限" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }" :colon="false">
							<a-select
								v-decorator="[
                  'dataAuthority',
                  {
                    rules: [
                      {
                        required: true,
                        message: '请选择数据权限',
                      },
                    ],
                  },
                ]"
								placeholder="请选择"
								allowClear
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
						<a-form-item label="资源备注" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }" :colon="false">
							<a-input v-decorator="['comments']" allowClear />
						</a-form-item>
					</a-col>
				</a-row>
			</a-form>
		</a-modal>
	</div>
</template>

<script>
import {
	getModuleList,
	addModule,
	updateModule,
	delModule
} from "@api/manage/index";
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("status");
import pick from "lodash.pick";
import { Trim } from "../../../trim/trim";
const columns = [
	{
		title: "资源名称",
		dataIndex: "moduleName",
		key: "moduleName",
		scopedSlots: { customRender: "moduleName" }
	},
	{
		title: "资源编码",
		dataIndex: "moduleCode",
		key: "moduleCode"
	},
	{
		title: "资源URL",
		dataIndex: "moduleUrl",
		key: "moduleUrl"
	},
	{
		title: "资源分类",
		dataIndex: "moduleType",
		key: "moduleType",
		scopedSlots: { customRender: "moduleType" }
	},
	{
		title: "备注",
		dataIndex: "comments",
		key: "comments"
	},
	{
		title: "数据权限",
		dataIndex: "dataAuthority",
		scopedSlots: { customRender: "dataAuthority" }
	},
	{
		dataIndex: "action",
		// width: "16%",
		key: "action",
		align: "center",
		title: "操作",
		scopedSlots: { customRender: "action" }
	}
];
export default {
	data() {
		return {
			columns,
			data: [],
			staffVisible: false,
			staffTitle: "新增资源",
			updateType: "",
			updateList: {},
			updateShow: false,
			disabledShow: false,
			columnsShow: false,
			columnsList: [],
			loading: false,
			keyword: "",
			moduleUrlValue: "",
			screenHeight: document.documentElement.clientHeight,
			staffForm: this.$form.createForm(this)
		};
	},
	computed: {
		...mapState({
			resourcePowerList: state => state.resourcePowerList,
			organizeList: state => state.organizeList
		})
	},
	mounted() {
		this.getModuleListInit();
		window.onresize = function () { // 定义窗口大小变更通知事件
      this.screenHeight = document.documentElement.clientHeight// 窗口高度
    }
	},
	methods: {
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
		allClick(type) {
			if (type == 1) {
				this.columnsList = this.allListInit(this.data);
				this.columnsShow = true;
			} else {
				this.columnsShow = false;
				this.columnsList = [];
			}
		},
		searchChange(e) {
			this.keyword = e.target.value;
		},
		handleChange(e) {
			this.moduleUrlValue = e.target.value;
		},
		getModuleListInit() {
			this.loading = true;
			getModuleList({
				moduleName: Trim(this.keyword),
				moduleCode: Trim(this.moduleUrlValue)
			})
				.then(res => {
					if (res.data.code == 0) {
						if(res.data.data!=null){
							this.data = res.data.data.list;
						this.columnsList = this.allListInit(this.data);
						}else{
							this.data = [];
						}
						
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
					if (item.moduleId == items) {
						this.columnsList.splice(index, 1);
					}
				});
			} else {
				this.columnsList.push(item.moduleId);
			}
		},
		allListInit(items) {
			let arr = [];
			if (!items) {
				return;
			}
			const getChild = items => {
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
		handleOrganSubmit(e) {
			e.preventDefault();
			this.staffForm.validateFields((err, values) => {
				if(!Trim(values.moduleName)){
					return this.$message.error('请输入资源名称')
				}
				if(!Trim(values.moduleUrl)){
					return this.$message.error('请输入资源URL')
				}
				if(!Trim(values.moduleCode)){
					return this.$message.error('请输入资源编码')
				}
				if (!err) {
					if (this.updateType == 2) {
						updateModule({
							moduleName: Trim(values.moduleName),
							moduleId: this.updateList.moduleId,
							moduleUrl:Trim( values.moduleUrl),
							moduleType: values.moduleType,
							comments: Trim(values.comments),
							dataAuthority: values.dataAuthority
						}).then(res => {
							if (res.data.code == 0) {
								this.$message.success(res.data.data);
							} else {
								this.$message.error(res.data.data);
							}
							this.getModuleListInit();
							this.staffVisible = false;
						});
					} else {
						addModule({
							moduleName: Trim(values.moduleName),
							moduleUrl: Trim(values.moduleUrl),
							moduleCode: Trim(values.moduleCode),
							dataAuthority: values.dataAuthority,
							moduleType: values.moduleType,
							comments: Trim(values.comments),
							parentId:
								this.updateType == 1
									? 0
									: this.updateList.moduleId
						}).then(res => {
							if (res.data.code == 0) {
								this.$message.success(res.data.data);
							} else {
								this.$message.error(res.data.data);
							}
							 this.staffVisible = false;
							this.getModuleListInit();
							if (this.updateType == 3) {
								this.staffForm.resetFields("moduleName");
								this.staffForm.resetFields("moduleCode");
								this.staffForm.resetFields("moduleUrl");
								this.staffForm.resetFields("moduleType");
								this.staffForm.resetFields("dataAuthority");
								this.staffForm.resetFields("comments");
							} else {
								this.staffForm.resetFields();
							}
						});
					}
				}
			});
		},
		// 搜索
		handleSearchSubmit(e) {
			this.getModuleListInit();
		},
		// 重置
		resetClick() {
			this.moduleUrlValue = "";
			this.keyword = "";
			this.getModuleListInit();
		},
		handleUpdateClick(type, e) {
			console.log(e);
			this.updateList = e;
			this.updateType = type;
			if (type == 1) {
				this.updateShow = false;
				this.disabledShow = false;
				this.staffTitle = "新增资源";
				this.staffForm.resetFields();
			} else if (type == 2) {
				this.updateShow = false;
				this.staffTitle = "编辑资源";
				this.disabledShow = true;
				new Promise(resolve => {
					resolve();
				}).then(() => {
					const formData = pick(e, [
						"moduleName",
						"moduleCode",
						"moduleUrl",
						"moduleType",
						"dataAuthority",
						"comments"
					]);
					if (formData.dataAuthority == 0) {
						formData.dataAuthority = "全部";
					} else {
						formData.dataAuthority = formData.dataAuthority;
					}
					console.log(formData);
					this.staffForm.setFieldsValue(formData);
				});
			} else {
				this.updateShow = true;
				this.staffTitle = "新增下级资源";
				this.staffForm.resetFields();
				this.disabledShow = false;
				new Promise(resolve => {
					resolve();
				}).then(() => {
					const formData = pick(e, ["moduleName"]);
					formData.parentName = formData.moduleName;
					formData.moduleName = "";
					this.staffForm.setFieldsValue(formData);
				});
			}
			this.staffVisible = true;
		},
		delClick(e) {
			console.log(e);
			if (e.children == null) {
				this.$confirm({
					title: "删除提醒",
					content: "你确定要删除吗",
					onOk: () => {
						delModule({
							moduleId: e.moduleId
						}).then(res => {
							if (res.data.code == 0) {
								this.$message.success(res.data.data);
							} else {
								this.$message.error(res.data.data);
							}
							this.getModuleListInit();
						});
					},
					onCancel() {}
				});
			} else {
				this.$confirm({
					title: "含有子项提醒",
					content: "删除父项会导致子项也会删除！",
					onOk: () => {
						delModule({
							moduleId: e.moduleId
						}).then(res => {
							if (res.data.code == 0) {
								this.$message.success(res.data.data);
							} else {
								this.$message.error(res.data.data);
							}
							this.getModuleListInit();
						});
					},
					onCancel() {}
				});
			}
		}
	}
};
</script>

<style>
.resource {
	background: #fff;
	padding: 22px;
}
/* .resource .ant-table-tbody > tr > td {
	border-bottom: none;
}
.resource .ant-table-thead > tr > th {
	border-bottom: 0;
	color: rgba(132, 145, 158, 1);
	font-weight: bold;
	cursor: pointer;
} */
.resource .edit-manage {
	/* margin-right: 15px; */
	color: #4480ee;
	min-height: 100%;
}
</style>

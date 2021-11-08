<script>
import Classes from "./ResumeSettings.module.css";
import { IconFont } from "../../../configs/scriptURL";
import { Button, Slider, Divider, List, Popover, Input,Modal } from "ant-design-vue";
import {
	getSettings,
	updateSetting,
	addSource,
	deleteSource
} from "../../../api/settings";
import { Trim } from "../../../trim/trim";
export default {
	name: "TemplateSettings",
	data() {
		return {
			addSourceVisible: false,
			newSource: "",
			status: "idle",
			maxConcurrentNumber: { id: "", value: 1 },
			resumeResource: [],
		};
	},
	watch: {
		addSourceVisible(value) {
			if (value === false) {
				this.newSource = "";
			}
		},	
	},
	methods: {
		// ＋
		async addNum(){
			this.maxConcurrentNumber.value++;
			this.handleMaxConcurrentChange()
			console.log(this.maxConcurrentNumber.value,'+')
		},
		// －
		async plusNum() {
			if(this.maxConcurrentNumber.value==1){
				this.$message.error("最小值为1");
				return;
			}else{
				this.maxConcurrentNumber.value--;
				this.handleMaxConcurrentChange()
				console.log(this.maxConcurrentNumber.value,'-')
			}
			
		},
		async handleCancel(){
			this.addSourceVisible = false;
		},
		async handleAddSourceBtn() {
			this.addSourceVisible = true;
		},
		async handleMaxConcurrentChange() {
			const value = this.maxConcurrentNumber.value;
			try {
				const response = await updateSetting({
					id: this.maxConcurrentNumber.id,
					content: String(value)
				});
				if (response.status === 200) {
					if (response.data.code === 0) {
						this.addSourceVisible = false;
						this.fetchSettings();
					} else {
						this.$message.error("修改并行流程数量失败", 2);
						this.maxConcurrentNumber.value = value;
					}
				}
			} catch (error) {
				this.maxConcurrentNumber.value = value;
			}
		},
		async handleAddSource() {
			try {
				this.newSource = Trim(this.newSource);
				if(!this.newSource || this.newSource=="" ||this.newSource==undefined){
					this.$message.error("请输入简历来源");
					return;
				}
 				const response = await addSource(this.newSource,2);
				if (response.status === 200) {
					if (response.data.code === 0) {
						this.addSourceVisible = false;
						
						setTimeout(()=>{this.fetchSettings();},500)
						
					} else {
						this.$message.error(
							response.data.mesg || "添加来源渠道失败",
							2
						);
					}
				}
			} catch (error) {
				console.log(error);
			}
		},
		async handleRemoveSource(id) {
			try {
				const response = await deleteSource(id);
				if (response.status === 200) {
					if (response.data.code === 0) {
						this.fetchSettings();
					} else {
						this.$message.error(
							response.data.mesg || "删除来源渠道失败",
							2
						);
					}
				}
			} catch (error) {
				console.log(error);
			}
		},
		async fetchSettings() {
			try {
				const response = await getSettings();
				if (response.status === 200) {
					if (response.data.code === 0) {
						const maxConcurrent = response.data.data.setupList.find(
							setting => setting.setupType === 1
						);
						if (!maxConcurrent) {
							this.status === "rejected";
							this.$message.error("获取设置信息失败", 2);
							return;
						}
						this.maxConcurrentNumber = {
							id: maxConcurrent.setupId,
							value: +maxConcurrent.setupContent
						};
						const resumeResource = response.data.data.setupList
							.filter(setting => setting.setupType === 2)
							.map(setting => ({
								id: setting.setupId,
								title: setting.setupContent
							}));
						this.resumeResource = resumeResource;
						this.status = "resolved";
					} else {
						this.status = "rejected";
						this.$message.error(
							res.data.mesg || "获取设置信息失败",
							2
						);
					}
				} else {
					this.status = "rejected";
				}
			} catch (error) {
				this.status = "rejected";
			}
		}
	},
	created() {
		this.fetchSettings();
	},
	render() {
		return (
			<div style="padding: 20px; background-color: #fff; min-height: 100%">
				<div class={Classes.toolbar}>
					<h1 class={Classes.pageTitle}>简历并行</h1>
				</div>
				<div class={Classes.grid}>
					<span class={Classes.settingTitle}>
						并行数量({this.maxConcurrentNumber.value})
					</span>
					<div class={Classes.settingContent}>
						<Button type="text" style="border-radius:none" onClick={this.addNum}>+</Button>
						<input
						type="number"
						class={Classes.settingIpt}
						vModel={this.maxConcurrentNumber.value}
						placeholder="1"
						readonly="readonly" 
						/>
						<Button type="text" style="border-radius:none" disabled={this.maxConcurrentNumber.value==1} onClick={this.plusNum}>-</Button>
					</div>
				</div>
				<Divider />
				<div class={Classes.grid}>
					<div style="width:85%;display:flex">
						<span
						class={Classes.settingTitle}
						style="align-self: flex-start;display:flex"
					>
						简历来源渠道
					</span>
					</div>	
					<div style="width:14%;display:flex;align-self: flex-end;">
					<span onClick={() =>this.handleAddSourceBtn()}>
					<IconFont
												type="icon-jia"
												slot="prefix"
												class="icon"
												style="font-size:20px;line-height:28px;color:#38bdd3;"
											/>
					<span 
								class={Classes.addButton}
								
							>
							
								添加简历来源
							</span>
							</span>
					</div>
						<div class={Classes.settingContent}>
						<Modal
							title="添加简历来源"
							vModel={this.addSourceVisible}
							onOk={this.handleAddSource}
							onCancel={this.handleCancel}
							bodyStyle={{borderBottom:"1px solid #fff !important"}}
							footer={null}

							>
							<p><Input
												vModel={this.newSource}
												placeholder="输入来源名称"
												style="margin-right: 8px"
												required
											/>
											 <Button key="submit"  style="background:#22bbcf;color:#fff;position:absolute;margin-left:5%" onClick={this.handleAddSource}>
                确定 
            </Button>
											</p>
							</Modal>

						<List
							class={Classes.list}
							bordered
							size="small"
							dataSource={this.resumeResource}
							grid={{ gutter: 8, column: 6 }}
							scopedSlots={{
								renderItem: ({ title, id }) => {
									return (
										<List.Item
										><div class={Classes.eachly}>
										<span>{title}</span>
											<a style="float:right;padding-right:5px;"
											onClick={() =>this.handleRemoveSource(id)}
											>
											<IconFont
												type="icon-uncheck"
												slot="prefix"
												class="icon"
											/>
											</a>
										</div>
											
										</List.Item>
									);
								}
							}}
						/>
					</div>
					
				</div>
			</div>
		);
	}
};
</script>
<style scoped>
.ant-btn{
	border-radius:0 !important;
}
.ant-list-bordered{
	border:none !important;
}
.ant-list-bordered.ant-list-sm .ant-list-item{
	padding-left:1px !important;
}
.ant-list-bordered .ant-list-item{
	padding-left:1px !important;
}
.ant-input{
	width:60% !important;
}
</style>


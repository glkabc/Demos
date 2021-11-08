<script>
import { Input, Select, Button } from "ant-design-vue";
export default {
	name: "SearchBar",
	props: ["name", "type"],
	methods: {
		handleNameChange(event) {
			
			const value = event.target.value;
			this.$emit("nameChange", value);
		},
		handleTypeChange(value) {
			this.$emit("typeChange", value);
		},
		handleSearchClick() {
			this.$emit("search");
		},
		handleAddTemplate() {
			this.$router.push({ path: `${this.$route.path}/add-template` });
		}
	},
	render() {
		return (
			<div class="search-bar-container">
				<Select
					Value={this.type}
					class="type-select"
					onChange={this.handleTypeChange}
				>
					<Select.Option value="">所有模板</Select.Option>
					<Select.Option value="1">录用通知模板</Select.Option>
					<Select.Option value="2">面试邀约模板</Select.Option>
					<Select.Option value="3">简历推荐模板</Select.Option>
					<Select.Option value="4">面试通知模板</Select.Option>
					<Select.Option value="5">干系人提醒模板</Select.Option>
				</Select>
				<Input.Search
					allowClear
					placeholder="按模板名称搜索..."
					class="name-input"
					value={this.name}
					onChange={this.handleNameChange}
					onSearch={this.handleSearchClick}
				/>
				<Button
					// type="primary"
					class="add-button"
					onClick={this.handleAddTemplate}
				>
					<a-icon type="plus-circle" />新增模板
				</Button>
			</div>
		);
	}
};
</script>

<style scoped>
.search-bar-container {
	margin-bottom: 14px;
	display: flex;
	flex-wrap: nowrap;
}

.type-select {
	width: 160px;
	margin-right: 8px;
}

.name-input {
	width: 300px;
}

.add-button {
	margin-left:20px;
	background:rgb(34, 184, 207);
	border: rgb(34, 184, 207);
	color:#fff;
	
}
</style>
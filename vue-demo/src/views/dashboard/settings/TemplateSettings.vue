<script>
import { Tabs, Input } from "ant-design-vue";
import SearchBar from "./templateSettings/SearchBar";
import TemplateDisplayTable from "./templateSettings/TemplateDisplayTable";
import { getTemplates } from "../../../api/settings";
let persistQuery = null;
export default {
	name: "TemplateSettings",
	data() {
		return {
			searchName: "",
			searchType: "",
			data: [],
			pagination: {
				current: persistQuery?persistQuery.current:1,
				pageSizeOptions: ["10", "20", "30", "40"],
				showSizeChanger: true,
				pageSize: persistQuery?persistQuery.pageSize:10,
				total: 0,
				showTotal: total => `共 ${total} 条`
			},
			status: "idle"
		};
	},
	computed: {
		isLoading() {
			return this.status === "pending";
		}
	},
	methods: {
		handleNameChange(value) {
			this.searchName = value;
		},
		handleTypeChange(value) {
			this.searchType = value;
		},
		handlePaginationChange({ current, pageSize }) {
			this.pagination.current = current;
			this.pagination.pageSize = pageSize;
		},
		async fetchData() {
			try {
				this.status = "pending";
				const response = await getTemplates({
					type: Number(this.searchType),
					name: this.searchName.trim()
				});
				if (response.status === 200) {
					if (response.data.code === 0) {
						this.status = "resolved";
						this.data = response.data.data.mailTemplateList;
						this.pagination.total =
							response.data.data.mailTemplateList.length;
					} else {
						this.status = "rejected";
						this.$message.error(res.data.mesg || "数据加载错误", 2);
					}
				} else {
					this.status = "rejected";
				}
			} catch (error) {
				this.status = "rejected";
			}
		}
	},
	watch: {
		searchName() {
			if (this.searchName === "") {
				this.fetchData();
			}
		},
		searchType() {
			this.pagination.current = 1;
			this.fetchData();
		}
	},
	created() {
		this.fetchData();
	},
	beforeRouteLeave(to, from, next) {
		if (to.path === "/settings/template-settings/add-template" || to.path === "/settings/template-settings/edit-template") {
			persistQuery = {
				current: this.pagination.current,
				pageSize: this.pagination.pageSize
			};
			next();
		} else {
			persistQuery = null;
			next();
		}
	},
	render() {
		return (
			<div style="padding: 20px; background-color: #fff; min-height: 100%">
				<SearchBar
					name={this.searchName}
					type={this.searchType}
					onNameChange={this.handleNameChange}
					onTypeChange={this.handleTypeChange}
					onSearch={this.fetchData}
				/>
				<a-divider />
				<TemplateDisplayTable
					pagination={this.pagination}
					data={this.data}
					isLoading={this.isLoading}
					onTablePaginationChange={this.handlePaginationChange}
					onRefresh={this.fetchData}
				/>
			</div>
		);
	}
};
</script>

<style scoped>
.search-input {
	width: 300px;
	margin-bottom: 16px;
}
</style>

<template>
	<div class="tab-page">
		<search-bar 
			:searchTitle.sync="searchTitle"
			:status.sync="status"
			@search="handleSearchClick"
			@statusChange="handleSearchClick"
		/>
		<m-table
			:pagination.sync="pagination"
			:isLoading.sync="isLoading"
			:selectedRowKeys.sync="selectedRowKeys"
			:selectedList.sync="selectedList"
			:data="data"
			@pagination-change="fetchResumes"
		/>
		<div class="footer-placeholder" />
		<m-footer
			:showPass.sync="showPass"
			:showFail.sync="showFail"
			:disableOperation="selectedList"
		/>
		<m-pass
			:show.sync="showPass"
			:selectedIds="selectedRowKeys"
			:selectedList="selectedList"
			@pass-success="fetchResumes"
		/>
		<m-fail
			:show.sync="showFail"
			:selectedIds="selectedRowKeys"
			:selectedList="selectedList"
			@fail-success="fetchResumes"
		/>
	</div>
</template>

<script>
import SearchBar from './resumeFilter/SearchBar';
import MTable from './resumeFilter/Table';
import MFooter from './resumeFilter/Footer';
import MPass from './resumeFilter/Pass';
import MFail from './resumeFilter/Fail';
import { getResumeFilter } from '@/api/interviewer';
export default {
	name: 'ResumeFilter',
	components: {
		SearchBar,
		MTable,
		MFooter,
		MPass,
		MFail
	},
	data() {
		return {
			searchTitle: '',
			status: '',
			selectedRowKeys: [],
			selectedList: [],
			isLoading: false,
			data: [],
			pagination: {
				current: 1,
				pageSizeOptions: ['10', '20', '30', '40'],
				showSizeChanger: true,
				pageSize: 10,
				total: 0,
				showTotal: total => `共 ${total} 条`
			},
			showPass: false,
			showFail: false
		};
	},
	methods: {
		handleSearchClick() {
			this.pagination.current = 1;
			this.fetchResumes();
		},
		async fetchResumes() {
			try {
				this.isLoading = true;
				const res = await getResumeFilter({
					title: this.searchTitle,
					status: this.status,
					pageSize: this.pagination.pageSize,
					pageNum: this.pagination.current
				});
				this.isLoading = false;
				if (res.status === 200) {
					if (res.data.code === 0) {
						this.selectedRowKeys = [];
						this.data = res.data.data.SelectionList;
						this.pagination.total = res.data.data.meta.size;
					} else {
						this.$message.error(
							res.data.mesg ? res.data.mesg : '查询失败',
							1.5
						);
					}
				}
			} catch (error) {
				this.isLoading = false;
			}
		}
	},
	created() {
		this.fetchResumes();
	}
};
</script>

<style scoped>
.tab-page {
	padding: 20px;
}

.form-title {
	font-size: 20px;
	font-weight: normal;
	margin: 20px 0 20px 0;
}
.footer-placeholder {
	height: 104px;
}
</style>

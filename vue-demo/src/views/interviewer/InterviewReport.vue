<template>
	<div class="tab-page">
		<search-bar
			:searchTitle.sync="searchTitle"
			:status.sync="status"
			@search="handleSearchClick"
			@statusChange="handleSearchClick"
			/>
		<m-table
			:showReportLog.sync="showReportLog"
			:showAddReport.sync="showAddReport"
			:pagination.sync="pagination"
			:isLoading="isLoading"
			:data="data"
			@pagination-change="fetchResumes"
			:selectedTalent.sync="selectedTalent"
			:interviewId.sync="interviewId"
		/>
		<div class="footer-placeholder" />
		<!-- <m-footer
			:showAddInterviewer.sync="showAddInterviewer"
			:showAddReport.sync="showAddReport"
			:disableOperation="selectedRowKeys.length === 0"
		/> -->
		<add-report
			:show.sync="showAddReport"
			:id="selectedTalent"
			:interviewId="interviewId"
			@add-report-success="fetchResumes"
		/>
		<report-log :show.sync="showReportLog" :id="selectedTalent" />
	</div>
</template>

<script>
import SearchBar from './interviewReport/SearchBar';
import MTable from './interviewReport/Table';
import AddReport from './interviewReport/AddReport';
import ReportLog from './interviewReport/ReportLog';
import { getResumeFilter, getInterviewReport } from '@/api/interviewer';
export default {
	name: 'InterviewReport',
	components: {
		SearchBar,
		MTable,
		AddReport,
		ReportLog
	},
	data() {
		return {
			searchTitle: '',
			status: '',
			showAddInterviewer: false,
			showAddReport: false,
			showReportLog: false,
			selectedRowKeys: [],
			selectedTalent: null,
			interviewId:null,
			isLoading: false,
			data: [],
			showCommentLogs: false,
			pagination: {
				current: 1,
				pageSizeOptions: ['10', '20', '30', '40'],
				showSizeChanger: true,
				pageSize: 10,
				total: 0,
				showTotal: total => `共 ${total} 条`
			},
			selectedLog: {
				name: '丁新志',
				mobile: '18204398438',
				email: 'abcao2@iflytek.com',
				logs: [
					{
						id: 1,
						interviewType: '0',
						interviewResult: '0',
						date: '2020-3-09',
						appraise: null,
						appraiser: '刘雪莉'
					},
					{
						id: 2,
						interviewType: '1',
						interviewResult: '2',
						date: '2020-3-09',
						appraise: '项目经验不足，思维逻辑不够清晰',
						appraiser: '刘雪莉'
					},
					{
						id: 3,
						interviewType: '1',
						interviewResult: '1',
						date: '2020-3-09',
						appraise: '项目经验丰富，技术不错',
						appraiser: '刘雪莉'
					}
				]
			}
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
				const res = await getInterviewReport({
					title: this.searchTitle,
					status: this.status,
					pageSize: this.pagination.pageSize,
					pageNum: this.pagination.current
				});
				this.isLoading = false;
				if (res.status === 200) {
					if (res.data.code === 0) {
						this.selectedRowKeys = [];
						this.data = res.data.data.commentInfoList;
						this.pagination.total = res.data.data.meta.size;
					} else {
						this.$message.error(
							res.data.mesg ? res.data.mesg : '查询失败',
							1.5
						);
					}
				}
			} catch (error) {
				console.log(error);
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

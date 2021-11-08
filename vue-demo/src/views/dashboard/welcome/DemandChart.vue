<script>
import { Select, DatePicker, Card } from "ant-design-vue";
import { getDemandChart } from "../../../api/welcome";
import { Chart } from "@antv/g2";
import moment from "moment";
const searchTypes = [
	{ label: "按天展示", value: 1 },
	{ label: "按月展示", value: 2 }
];
const getDefaultRangeByDay = () => {
	const now = moment();
	const sevenDaysAgo = moment().subtract(7, "days");
	return [sevenDaysAgo, now];
};
const getDefaultRangeByMonth = () => {
	const thisMonth = moment();
	const fiveMonthsAgo = moment().subtract(5, "months");
	return [fiveMonthsAgo, thisMonth];
};
export default {
	name: "DemandChart",
	data() {
		return {
			demandChartStatus: "idle",
			searchType: 1,
			searchDateRange: getDefaultRangeByDay()
		};
	},
	computed: {
		mode() {
			return this.searchType === 1
				? ["date", "date"]
				: ["month", "month"];
		},
		format() {
			return this.searchType === 1 ? "YYYY-MM-DD" : "YYYY-MM";
		},
		isLoading() {
			return this.demandChartStatus === "pending";
		}
	},
	watch: {
		searchType(value) {
			if (value === 1) {
				this.searchDateRange = getDefaultRangeByDay();
			} else {
				this.searchDateRange = getDefaultRangeByMonth();
			}
			this.fetchDemandChart();
		},
		searchDateRange() {
			this.fetchDemandChart();
		}
	},
	methods: {
		async fetchDemandChart() {
			try {
				this.demandChartStatus = "pending";
				const body = { type: this.searchType };
				if (this.searchDateRange.length === 0) {
					body.startAt = "";
					body.endAt = "";
				} else {
					body.startAt = this.searchDateRange[0].format(this.format);
					body.endAt = this.searchDateRange[1].format(this.format);
				}
				const response = await getDemandChart(body);
				if (response.status === 200) {
					if (response.data.code === 0) {
						this.demandChartStatus = "resolved";
						if (this.chart) {
							// 已经有chart
							this.chart.clear();
							const rawData = response.data.data;
							const data = [];
							for (const delta of rawData) {
								data.push({
									date: delta.date,
									type: "需求数",
									value: delta.total
								});
								data.push({
									date: delta.date,
									type: "招聘人数",
									value: delta.num
								});
							}
							this.chart.data(data);
							this.chart.scale({
								date: {
									range: [0, 1]
								},
								value: {
									nice: true
								}
							});

							this.chart.tooltip({
								showCrosshairs: true, // 展示 Tooltip 辅助线
								shared: true
							});

							this.chart
								.area()
								.position("date*value")
								.color("type")
								.shape("smooth");
							this.chart
								.line()
								.position("date*value")
								.color("type")
								.shape("smooth");
							this.chart
								.point()
								.position("date*value")
								.color("type")
								.shape("circle");

							this.chart.legend({
								position: "top"
							});
							this.chart.render();
						} else {
							// 没有chart
							this.chart = new Chart({
								container: this.$refs.chartRef,
								autoFit: true,
								renderer: "svg"
							});

							const rawData = response.data.data;
							const data = [];
							for (const delta of rawData) {
								data.push({
									date: delta.date,
									type: "需求数",
									value: delta.total
								});
								data.push({
									date: delta.date,
									type: "招聘人数",
									value: delta.num
								});
							}

							this.chart.data(data);
							this.chart.scale({
								date: {
									range: [0, 1]
								},
								value: {
									nice: true
								}
							});

							this.chart.tooltip({
								showCrosshairs: true, // 展示 Tooltip 辅助线
								shared: true
							});

							this.chart
								.area()
								.position("date*value")
								.color("type")
								.shape("smooth");
							this.chart
								.line()
								.position("date*value")
								.color("type")
								.shape("smooth");

							this.chart
								.point()
								.position("date*value")
								.color("type")
								.shape("circle");

							this.chart.legend({
								position: "top"
							});

							this.chart.render();
						}
					} else {
						this.demandChartStatus = "rejected";
						this.$message.error(
							response.data.mesg || "数据加载出错",
							2
						);
					}
				} else {
					this.demandChartStatus = "rejected";
				}
			} catch (error) {
				this.demandChartStatus = "rejected";
				console.log(error);
			}
		},
		handleDateChange(date, dateString) {
			if (this.searchType === 2) {
				return;
			}
			this.searchDateRange = date;
		},
		handlePanelChange(value, mode) {
			if (this.searchType === 1) {
				return;
			}
			this.searchDateRange = value;
			console.log(this.$refs);
			this.$refs.datePickerRef.blur();
		}
	},
	mounted() {
		this.fetchDemandChart();
	},
	render() {
		return (
			<Card class={this.$style.chartCard} bordered={false}>
				<h6 class={this.$style.title} slot="title">
					需求规模
				</h6>
				<div key="searchBar" style="margin-bottom: 32px">
					<Select
						disabled={this.isLoading}
						vModel={this.searchType}
						options={searchTypes}
						style="margin-right: 8px"
					/>
					<DatePicker.RangePicker
						disabled={this.isLoading}
						ref="datePickerRef"
						allowClear={false}
						value={this.searchDateRange}
						mode={this.mode}
						onChange={this.handleDateChange}
						onPanelChange={this.handlePanelChange}
						format={this.format}
					/>
				</div>
				<div
					ref="chartRef"
					key="chart"
					style="height: calc(100% - 32.38px - 32px)"
				/>
			</Card>
		);
	}
};
</script>

<style module>
.chartCard {
	height: 100%;
}

.chartCard :global .ant-card-head {
	border-bottom: none;
	margin-bottom: 0;
}
.chartCard :global .ant-card-body {
	height: calc(100% - 48px);
}
.title {
	position: absolute;
	left: 0;
	top: 12px;
	width: 100%;
	color: rgba(0, 0, 0, 0.85);
	font-weight: 500;
	font-size: 16px;
	padding: 0px 12px;
	margin: 0px 12px;
}

.title::before {
	content: "";
	display: block;
	width: 4px;
	height: 20px;
	position: absolute;
	left: 0;
	top: 50%;
	transform: translateY(-50%);
	background-color: #22b8cf;
}
</style>
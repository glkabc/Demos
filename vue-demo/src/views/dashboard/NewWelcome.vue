<script>
import { Card, Statistic, Icon } from "ant-design-vue";
import { getStatistics } from "../../api/welcome";
import { IconFont } from "../../configs/scriptURL";
import DemandChart from "./welcome/DemandChart";
import CandidateChart from "./welcome/CandidateChart";
import Percent from "./welcome/Percent";
export default {
	name: "Welcome",
	data() {
		return {
			dataStatus: "idle",
			data: {
				requestTotal: "未知",
				dueTomorrow: "未知",
				increasedCandidateToday: "未知",
				increasedResumeToday: "未知",
				percent: "未知"
			}
		};
	},
	computed: {
		isLoading() {
			return this.dataStatus === "pending";
		}
	},
	methods: {
		async fetchData() {
			try {
				this.statisticStatus = "pending";
				const response = await getStatistics();
				if (response.status === 200) {
					if (response.data.code === 0) {
						this.statisticStatus = "resolved";
						this.data = {
							requestTotal: response.data.data.demandNum,
							dueTomorrow: response.data.data.maturityNum,
							increasedCandidateToday:
								response.data.data.recruitNum,
							increasedResumeToday: response.data.data.resumeNum,
							percent: response.data.data.percentage
						};
					} else {
						this.statisticStatus = "rejected";
						this.$message.error(
							response.data.mesg || "加截数据出错",
							2
						);
					}
				} else {
					this.statisticStatus = "rejected";
				}
			} catch (error) {
				this.statisticStatus = "rejected";
			}
		},
		renderStatistic({ value }) {
			return value;
		},
		handleNavToTalent() {
			this.$router.push({
				name: "TalentProfile",
				query: { dateBeginAt: this.$moment().format("YYYY-MM-DD") }
			});
		},
		handleNavToHCQueryDueTomorrow() {
			this.$router.push({
				name: "HC",
				query: {
					demandEnd: this.$moment()
						.add(1, "days")
						.format("YYYY-MM-DD")
				}
			});
		},
		handleNavToHCQueryAddedToday() {
			this.$router.push({
				name: "HC"
			});
		}
	},
	created() {
		// this.fetchData();
	},
	render() {
		// 首页下线图
		return(
			<div class={this.$style.content}>
				<img src={require('../../assets/images/index_banner.png')} class={this.$style.bannerImg}></img>
				<p class={this.$style.text}>功能正在开发中，敬请期待！</p>
			</div>
		)
	}
	// render() {
	// 	return (
	// 		<div class={this.$style.pageContainer}>
	// 			<div class={this.$style.statistic1}>
	// 				<div
	// 					class={`${this.$style.card1} hover`}
	// 					onClick={this.handleNavToHCQueryAddedToday}
	// 				>
	// 					<IconFont
	// 						type="icon-fuwufenxi"
	// 						slot="prefix"
	// 						class="icon"
	// 					/>
	// 					<div>
	// 						<h6 class="title">在招需求总数/当日新增需求数</h6>
	// 						<p class="content">{this.data.requestTotal}</p>
	// 					</div>
	// 				</div>
	// 			</div>
	// 			<div class={this.$style.statistic2}>
	// 				<div class={this.$style.card2}>
	// 					<IconFont
	// 						type="icon-daoqianjian"
	// 						slot="prefix"
	// 						class="icon"
	// 					/>
	// 					<div>
	// 						<h6 class="title">明日到期需求数</h6>
	// 						<p class="content">{this.data.dueTomorrow}</p>
	// 					</div>
	// 				</div>
	// 			</div>
	// 			<div class={this.$style.statistic3}>
	// 				<div class={this.$style.card3}>
	// 					<IconFont
	// 						type="icon-lietouqudaodejianlizhongfu"
	// 						slot="prefix"
	// 						class="icon"
	// 					/>
	// 					<div>
	// 						<h6 class="title">当日新增招聘需求数</h6>
	// 						<p class="content">
	// 							{this.data.increasedCandidateToday}
	// 						</p>
	// 					</div>
	// 				</div>
	// 			</div>
	// 			<div class={this.$style.statistic4}>
	// 				<div
	// 					class={`${this.$style.card1} hover`}
	// 					onClick={this.handleNavToTalent}
	// 				>
	// 					<IconFont
	// 						type="icon-qiuzhijianli"
	// 						slot="prefix"
	// 						class="icon"
	// 					/>
	// 					<div>
	// 						<h6 class="title">当日新增简历数</h6>
	// 						<p class="content">
	// 							{this.data.increasedResumeToday}
	// 						</p>
	// 					</div>
	// 				</div>
	// 			</div>
	// 			<div class={this.$style.mainChart}>
	// 				<DemandChart />
	// 			</div>
	// 			<div class={this.$style.subChart}>
	// 				<div class={this.$style.subChartContainer}>
	// 					<div class={this.$style.subChartItem}>
	// 						<div class={this.$style.subChartItemChildWrapper}>
	// 							<CandidateChart />
	// 						</div>
	// 					</div>
	// 					<div class={this.$style.subChartItem}>
	// 						<div class={this.$style.subChartItemChildWrapper}>
	// 							<Percent percent={this.data.percent} />
	// 						</div>
	// 					</div>
	// 				</div>
	// 			</div>
	// 		</div>
	// 	);
	// }
};
</script>

<style module>
.content {
	height: 100%;
	overflow: hidden;
	user-select: none;
}
.content .text {
	text-align: center;
	color: #333;
	font-size: 16px;
	margin-top: 30px;
}
.bannerImg {
	width: 405px;
	height: 362px;
	display: block;
	margin: 0 auto;
	margin-top: 100px;
}
.pageContainer {
	display: grid;
	grid-gap: 16px;
	gap: 16px;

	grid-template-rows: auto auto;
	grid-template-columns: repeat(4, 1fr);
	grid-template-areas:
		"statistic1 statistic2 statistic3 statistic4"
		"mainChart mainChart mainChart subChart";
}

@media screen and (max-width: 1440px) {
	.pageContainer {
		grid-template-rows: auto auto auto;
		grid-template-areas:
			"statistic1 statistic2 statistic3 statistic4"
			"mainChart mainChart mainChart mainChart"
			"subChart subChart subChart subChart";
	}
}

.statistic1 {
	overflow: hidden;
	grid-area: statistic1;
}
.statistic2 {
	overflow: hidden;
	grid-area: statistic2;
}
.statistic3 {
	overflow: hidden;
	grid-area: statistic3;
}
.statistic4 {
	overflow: hidden;
	grid-area: statistic4;
}

.mainChart {
	grid-area: mainChart;
}

@media screen and (max-width: 1440px) {
	.mainChart {
		height: 500px;
	}
}

.subChart {
	grid-area: subChart;
}
.subChartContainer {
	width: 100%;
	display: grid;
	grid-gap: 16px;
	gap: 16px;
}

@media screen and (max-width: 1440px) {
	.subChartContainer {
		grid-template-columns: repeat(2, 1fr);
	}
}

.subChartItem {
	padding-bottom: 100%;
	position: relative;
}

.subChartItemChildWrapper {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}

.basicCard {
	position: relative;
	overflow: hidden;
	height: 100%;
	color: #fff;
	padding: 32px 16px;
	border-radius: 10px;
	display: flex;
	align-items: center;
}

.basicCard * {
	margin-bottom: 0;
	position: relative;
	z-index: 1;
}

.basicCard:global(.hover) {
	cursor: pointer;
}

.basicCard :global(.title) {
	color: inherit;
	font-size: 14px;
}

.basicCard :global(.content) {
	font-size: 26px;
	line-height: 1;
}

.basicCard > :global(.icon) {
	font-size: 36px;
	margin-right: 16px;
}

.basicCard::before {
	content: "";
	display: block;
	position: absolute;
	top: -17px;
	left: -19px;
	width: 70px;
	height: 70px;
	border-radius: 50%;
	opacity: 0.25;
}

.basicCard::after {
	content: "";
	display: block;
	position: absolute;
	bottom: -8px;
	left: 14px;
	width: 70px;
	height: 70px;
	border-radius: 50%;
	opacity: 0.25;
}

.card1 {
	composes: basicCard;
	background: linear-gradient(
		120deg,
		rgba(0, 232, 255, 1) 0%,
		rgba(0, 146, 235, 1) 100%
	);
}

.card1::before {
	background: linear-gradient(
		120deg,
		rgba(0, 232, 255, 1) 0%,
		rgba(0, 146, 235, 1) 100%
	);
}

.card1::after {
	background: linear-gradient(
		120deg,
		rgba(0, 232, 255, 1) 0%,
		rgba(0, 146, 235, 1) 100%
	);
}

.card2 {
	composes: basicCard;
	background: linear-gradient(
		135deg,
		rgba(255, 146, 139, 1) 0%,
		rgba(255, 96, 133, 1) 100%
	);
}
.card2::before {
	background: linear-gradient(
		135deg,
		rgba(255, 146, 139, 1) 0%,
		rgba(255, 96, 133, 1) 100%
	);
}

.card2::after {
	background: linear-gradient(
		135deg,
		rgba(255, 146, 139, 1) 0%,
		rgba(255, 96, 133, 1) 100%
	);
}

.card3 {
	composes: basicCard;
	background: linear-gradient(
		135deg,
		rgba(182, 160, 249, 1) 0%,
		rgba(135, 118, 250, 1) 100%
	);
}
.card3::before {
	background: linear-gradient(
		135deg,
		rgba(182, 160, 249, 1) 0%,
		rgba(135, 118, 250, 1) 100%
	);
}

.card3::after {
	background: linear-gradient(
		135deg,
		rgba(182, 160, 249, 1) 0%,
		rgba(135, 118, 250, 1) 100%
	);
}

.card4 {
	composes: basicCard;
	background: linear-gradient(
		135deg,
		rgba(95, 159, 255, 1) 0%,
		rgba(97, 93, 255, 1) 100%
	);
}
.card4::before {
	background: linear-gradient(
		135deg,
		rgba(95, 159, 255, 1) 0%,
		rgba(97, 93, 255, 1) 100%
	);
}

.card4::after {
	background: linear-gradient(
		135deg,
		rgba(95, 159, 255, 1) 0%,
		rgba(97, 93, 255, 1) 100%
	);
}
</style>
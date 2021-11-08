<script>
import { Card, Statistic } from "ant-design-vue";
import { getStatistics } from "../../api/welcome";
import Classes from "./Welcome.module.css";
import DemandChart from "./welcome/DemandChart";
import CandidateChart from "./welcome/CandidateChart";
import Percent from "./welcome/Percent";
export default {
	name: "Welcome",
	data() {
		return {
			statisticStatus: "idle",
			statisticData: {
				requestTotal: 0,
				dueTomorrow: 0,
				increasedCandidateToday: 0,
				increasedResumeToday: 0
			}
		};
	},
	computed: {
		isStatisticLoading() {
			return this.statisticStatus === "pending";
		}
	},
	methods: {
		async fetchStatistics() {
			try {
				this.statisticStatus = "pending";
				const response = await getStatistics();
				if (response.status === 200) {
					if (response.data.code === 0) {
						this.statisticStatus = "resolved";
						this.statisticData = {
							requestTotal: response.data.data.demandNum,
							dueTomorrow: response.data.data.maturityNum,
							increasedCandidateToday:
								response.data.data.recruitNum,
							increasedResumeToday: response.data.data.resumeNum
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
		this.fetchStatistics();
	},
	render() {
		return (
			<div class={Classes.pageContainer}>
				<div class={Classes.statisticContainer}>
					<div class={Classes.statisticItem}>
						<Card
							bordered={false}
							hoverable
							loading={this.isStatisticLoading}
							onClick={this.handleNavToHCQueryAddedToday}
						>
							<Statistic
								class={Classes.statistic}
								title="在途需求总数/当日新增需求数"
								value={this.statisticData.requestTotal}
								scopedSlots={{
									formatter: this.renderStatistic
								}}
							/>
						</Card>
					</div>
					<div class={Classes.statisticItem}>
						<Card
							bordered={false}
							loading={this.isStatisticLoading}
						>
							<Statistic
								class={Classes.statistic}
								title="明日到期需求数"
								value={this.statisticData.dueTomorrow}
								scopedSlots={{
									formatter: this.renderStatistic
								}}
							/>
						</Card>
					</div>
					<div class={Classes.statisticItem}>
						<Card
							bordered={false}
							loading={this.isStatisticLoading}
						>
							<Statistic
								class={Classes.statistic}
								title="当日新增招聘人数"
								value={
									this.statisticData.increasedCandidateToday
								}
								scopedSlots={{
									formatter: this.renderStatistic
								}}
							/>
						</Card>
					</div>
					<div class={Classes.statisticItem}>
						<Card
							bordered={false}
							hoverable
							loading={this.isStatisticLoading}
							onClick={this.handleNavToTalent}
						>
							<Statistic
								class={Classes.statistic}
								title="当日新增简历数"
								value={this.statisticData.increasedResumeToday}
								scopedSlots={{
									formatter: this.renderStatistic
								}}
							/>
						</Card>
					</div>
				</div>
				<div class={Classes.chartContainer}>
					<div class={Classes.chartItem}>
						<DemandChart />
					</div>
					<div
						class={`${Classes.chartItemSmall} ${Classes.rightContainer}`}
					>
						<div class={Classes.rightItem}>
							<CandidateChart />
						</div>
						<div class={Classes.rightItem}>
							<Percent />
						</div>
					</div>
				</div>
			</div>
		);
	}
};
</script>
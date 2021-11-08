<script>
import { DatePicker } from "ant-design-vue";
import { getProgressPercent } from "../../../api/welcome";
import moment from "moment";
const getDefaultRangeByDay = () => {
	const now = moment();
	const sevenDaysAgo = moment().subtract(7, "days");
	return [sevenDaysAgo, now];
};
export default {
	name: "Percent",
	data() {
		return {
			percent: "0%",
			searchDateRange: getDefaultRangeByDay(),
			dataStatus: "idle"
		};
	},
	computed: {
		isLoading() {
			return this.dataStatus === "pending";
		},
		getText() {
			switch (this.dataStatus) {
				case "idle":
					return "未知";
				case "pending":
					return "加载中";
				case "resolved":
					return this.percent;
				case "rejected":
					return "加载错误";
				default:
					return "未知";
			}
		},
		justifiedPercent() {
			const originalPercent = Number.parseFloat(this.percent);
			return `${originalPercent * 1.09}%`;
		}
	},
	watch: {
		searchDateRange() {
			this.fetchData();
		}
	},
	methods: {
		async fetchData() {
			try {
				const query = {};
				if (this.searchDateRange.length !== 0) {
					query.startAt = this.searchDateRange[0].format(
						"YYYY-MM-DD"
					);
					query.endAt = this.searchDateRange[1].format("YYYY-MM-DD");
				}
				this.dataStatus = "pending";
				const response = await getProgressPercent(query);
				if (response.status === 200) {
					if (response.data.code === 0) {
						this.dataStatus = "resolved";
						this.percent = response.data.data;
					} else {
						this.dataStatus = "rejected";
					}
				} else {
					this.dataStatus = "rejected";
				}
			} catch (error) {
				console.log(error);
				this.dataStatus = "rejected";
			}
		},
		getDisabledDate(endAt, startAt) {
			if (endAt.isAfter(moment())) {
				return true;
			}
			return false;
		}
	},
	created() {
		this.fetchData();
	},
	render() {
		return (
			<div class={this.$style.container}>
				<h6 class={this.$style.title}>需求进度</h6>
				<DatePicker.RangePicker
					class={this.$style.datePicker}
					vModel={this.searchDateRange}
					disabledDate={this.getDisabledDate}
				/>
				<div class={this.$style.ball}>
					<div class={this.$style.wrapper}>
						<span class={this.$style.number}>{this.getText}</span>
						<div
							class={this.$style.water}
							style={{ bottom: this.justifiedPercent }}
						/>
					</div>
				</div>
			</div>
		);
	}
};
</script>

<style module>
.container {
	width: 100%;
	height: 100%;
	position: relative;
	background-color: #fff;
	display: flex;
	flex-direction: column;
	padding-top: 12px;
}

.title {
	width: 100%;
	color: rgba(0, 0, 0, 0.85);
	font-weight: 500;
	font-size: 16px;
	padding: 0px 12px;
	margin: 0px 12px 8px 12px;
	position: relative;
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

.datePicker {
	margin: 0 8px;
}

.ball {
	justify-self: center;
	align-self: center;
	width: 65%;
	height: 65%;
	box-shadow: 0 0 3.5px 0 rgba(0, 0, 0, 0.36);
	border-radius: 50%;
	padding: 5px;
	background-color: #fb7406;
	transform: translateY(15%);
}

.wrapper {
	position: relative;
	width: 100%;
	height: 100%;
	display: -webkit-box;
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: hidden;
	border-radius: 50%;
	background-color: #fb8f37;
}

.number {
	font-weight: bolder;
	font-size: 32px;
	color: #333;
	position: relative;
	z-index: 1;
}

.water {
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
	width: 100%;
	height: 100%;
	border: none;
}

.water::after {
	content: "";
	position: absolute;
	top: -102.5%;
	left: -50%;
	width: 200%;
	height: 200%;
	background-color: #fff;
	border-radius: 47%;
	animation: wave 10s linear 0s infinite;
}

.water::before {
	content: "";
	position: absolute;
	top: -102.5%;
	left: -50%;
	width: 200%;
	height: 200%;
	background-color: #fcab69;
	border-radius: 41%;
	transform: rotate(90deg);
	animation: wave 10s linear 0s infinite;
}
@keyframes wave {
	0% {
		transform: rotateZ(0);
	}
	100% {
		transform: rotateZ(360deg);
	}
}
</style>
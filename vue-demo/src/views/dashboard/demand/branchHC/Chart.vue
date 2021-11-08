<script>
import { getDemandStatistic } from "../../../../api/branchHC";
import { Chart } from "@antv/g2";
const typeArray = [
	// ['count', '全部'],
	["fzrcxCount", "负责人初选"],
	["msgsxCount", "面试官筛选"],
	["yymsCount", "预约面试"],
	["offerCount", "Offer"],
	["rzCount", "入职"],
	["hxrfqCount", "候选人放弃"],
	["yrzCount", "已入职"]
];

const findTitle = code => {
	const matched = typeArray.find(([type]) => type === code);
	if (matched) {
		return matched[1];
	} else {
		return "无匹配";
	}
};

export default {
	name: "Chart",
	props: ["id"],
	data() {
		return {
			data: null,
			status: "idle"
		};
	},
	methods: {
		async getData() {
			try {
				this.status = "pending";
				const res = await getDemandStatistic(this.id);
				if (res.status === 200) {
					if (res.data.code === 0) {
						this.status = "resolved";
						const rawData = res.data.data;
						const data = typeArray.map(([prop, title]) => {
							return {
								title: `${title}: ${rawData[prop]}`,
								number: rawData[prop]
							};
						});
						this.data = data;
					} else {
						this.status = "rejected";
					}
				} else {
					this.status = "rejected";
				}
			} catch (error) {
				this.status = "rejected";
			}
		},
		createChart() {
			this.chart = new Chart({
				container: this.$refs.container,
				width: 300,
				height: 300,
				renderer: "svg"
			});
			this.chart.coordinate("polar", {
				startAngle: Math.PI,
				endAngle: Math.PI * (3 / 2)
			});
			this.chart.data(this.data);
			this.chart.scale("number", {
				tickCount: 6
			});

			this.chart.axis("number", {
				grid: {
					line: {
						type: "circle"
					},
					closed: false
				},
				verticalFactor: 1,
				label: {
					offset: 15
				}
			});

			this.chart.axis("title", {
				tickLine: {
					alignTick: false
				},
				grid: {
					alignTick: false
				}
			});

			this.chart.tooltip({
				showMarkers: false
			});
			this.chart.interaction("element-highlight");

			this.chart
				.interval()
				.position("title*number")
				.color("title", "rgb(252,143,72)-rgb(255,215,135)")
				.label("number", {
					offset: -15,
					style: {
						textAlign: "center",
						fill: "#000"
					}
				})
				.style({
					lineWidth: 1,
					stroke: "#fff"
				});

			this.chart.render();
		}
	},
	mounted() {
		this.getData();
	},
	updated() {
		if (!this.data) {
			return;
		} else if (this.chart) {
			return;
		} else {
			this.createChart();
		}
	},
	render() {
		if (this.status === "idle" || this.status === "pending") {
			return <div class="loading-skeleton"></div>;
		} else {
			return <div ref="container"></div>;
		}
	}
};
</script>

<style scoped>
.loading-skeleton {
	width: 300px;
	height: 300px;
	background-color: #efefef;
	animation: 1s linear infinite alternate blink;
}

@keyframes blink {
	from {
		background-color: #efefef;
	}
	to {
		background-color: #fafafa;
	}
}
</style>

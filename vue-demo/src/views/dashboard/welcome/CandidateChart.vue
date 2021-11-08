<script>
import { getCandidateChart } from "../../../api/welcome";
import { Chart } from "@antv/g2";
const typeArray = [
	// ['count', '全部'],
	["fzrcxCount", "负责人初选"],
	["msgsxCount", "面试官筛选"],
	["yymsCount", "预约面试"],
	["offerCount", "Offer确认"],
	["rzCount", "入职确认"],
	["hxrfqCount", "候选人放弃"],
	["yrzCount", "已入职"]
];
export default {
	name: "CandidateChart",
	methods: {
		async fetchCandidateChart() {
			try {
				const response = await getCandidateChart();
				if (response.status === 200) {
					if (response.data.code === 0) {
						const rawData = response.data.data;
						const data = typeArray.map(([prop, title]) => {
							return {
								title: `${title}: ${rawData[prop]}`,
								number: rawData[prop]
							};
						});
						const total = rawData.fzrcxCount;
						const newData = typeArray.map(([prop, title]) => {
							return {
								title: title,
								number: rawData[prop],
								percent: total !== 0 ? rawData[prop] / total : 0
							};
						});
						this.chart = new Chart({
							container: this.$refs.chartRef,
							autoFit: true,
							padding: [20, 30, 60, 30],
							renderer: "svg"
						});

						this.chart.data(newData);
						this.chart.axis(false);
						this.chart.tooltip({
							showTitle: false,
							showMarkers: false,
							itemTpl:
								'<li style="margin-bottom:4px;list-style-type:none;padding: 0;">' +
								'<span style="background-color:{color};" class="g2-tooltip-marker"></span>' +
								"{name}<br/>" +
								'<span style="padding-left: 16px;line-height: 16px;">人数：{pv}</span><br/>' +
								"</li>"
						});
						this.chart
							.coordinate("rect")
							.transpose()
							.scale(1, -1);
						this.chart
							.interval()
							.adjust("symmetric")
							.position("title*number")
							.shape("funnel")
							.color("title", [
								"#0050B3",
								"#1890FF",
								"#40A9FF",
								"#69C0FF",
								"#BAE7FF"
							])
							.label(
								"title*number",
								(title, number) => {
									return {
										content: `${title} ${number}`
									};
								},
								{
									offset: 35,
									labelLine: {
										style: {
											lineWidth: 1,
											stroke: "rgba(0, 0, 0, 0.15)"
										}
									}
								}
							)
							.tooltip("title*number", (title, number) => {
								return {
									name: title,
									pv: number
								};
							})
							.animate({
								appear: {
									animation: "fade-in"
								},
								update: {
									annotation: "fade-in"
								}
							});

						this.chart.interaction("element-active");

						// this.chart.on("beforepaint", () => {
						// 	this.chart.annotation().clear(true);
						// 	const chartData = this.chart.getData();
						// 	// 中间标签文本
						// 	chartData.forEach(obj => {
						// 		this.chart.annotation().text({
						// 			top: true,
						// 			position: {
						// 				action: obj.title,
						// 				percent: "median"
						// 			},
						// 			content: +obj.percent * 100 + "%", // 显示的文本内容
						// 			style: {
						// 				stroke: null,
						// 				fill: "#fff",
						// 				textAlign: "center"
						// 			}
						// 		});
						// 	});
						// });

						this.chart.legend({ flipPage: false });
						this.chart.render();

						// this.chart.coordinate("theta", {
						// 	radius: 0.8
						// });

						// this.chart.data(data);

						// this.chart.tooltip({
						// 	showTitle: false,
						// 	showMarkers: false
						// });

						// this.chart
						// 	.interval()
						// 	.position("number")
						// 	.color("title")
						// 	.adjust("stack");

						// this.chart.legend({ flipPage: false });
						// this.chart.interaction("element-active");
						// this.chart.render();
					}
				}
			} catch (error) {
				console.log(error);
			}
		}
	},
	mounted() {
		this.fetchCandidateChart();
	},
	render() {
		return (
			<div style="height: 100%; background-color: #fff; padding-top: 12px;">
				<h6 class={this.$style.title}>候选人推进统计</h6>
				<div ref="chartRef" class={this.$style.chartContainer} />
			</div>
		);
	}
};
</script>

<style module>
.title {
	position: relative;
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

.chartContainer {
	padding: 8px;
	height: calc(100% - 24px);
}
</style>
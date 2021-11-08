<template>
	<div class="footer-container">
		<div class="footer-item">
			<a-button
				class="button-danger"
				@click="handleOpenFail"
				:disabled="statusShow"
			>
				淘汰
			</a-button>
		</div>
		<div class="footer-item">
			<a-button
				class="button-info"
				@click="handleOpenPass"
				:disabled="statusShow"
			>
				通过
			</a-button>
		</div>
		<!-- <div class="footer-item">
			<a-button type="primary">待定</a-button>
		</div>-->
	</div>
</template>

<script>
export default {
	name: 'Footer',
	props: {
		showPass: Boolean,
		showFail: Boolean,
		disableOperation: Array
	},
	data(){
		return {
			statusShow: true
		}
	},
	watch: {
		disableOperation(e){
			let tmpList = e
			if(tmpList.length == 0) {
				this.statusShow = true
			}else {
				if(tmpList.length === 1) {
					tmpList.some((item) => {
						if(item.status == 10) {
							this.statusShow = false
						}else {
							this.statusShow = true
						}
					})
				}else {
					tmpList.some(item => {
						if(item.status !== 10) {
							this.statusShow = true
						}
					})
				}
			}
		}
	},
	methods: {
		handleOpenPass() {
			this.disableOperationInit(1)
		},
		handleOpenFail() {
			this.disableOperationInit(2)
		},
		disableOperationInit(type){
			const disableList = this.disableOperation.some(item => item.isRecommend == 2) 
			if(disableList) {
				this.$message.warning('推荐候选人超3天未操作已退回，需要候选人请联系招聘专员')
				return false
			}
			type === 1 ? this.$emit('update:showPass', true) : this.$emit('update:showFail', true);
		}
	}
};
</script>

<style scoped>
.footer-container {
	background-color: #fff;
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	flex-wrap: nowrap;
	justify-content: center;
	padding: 10px 0;
	box-shadow: 0px 9px 27px 1px rgba(0, 0, 0, 0.18);
}

.footer-item {
	padding: 16px;
}

.button-info {
	color: #fff;
	background-color: #22b8cf;
	border-color: #22b8cf;
}

.button-info:hover {
	color: #fff;
	background-color: #4ec6d8;
	border-color: #4ec6d8;
}

.button-info[disabled] {
	border-color: #999;
	background-color: #fff;
	color: #999;
}

.button-danger {
	color: #fff;
	background-color: #fd5158;
	border-color: #fd5158;
}

.button-danger:hover {
	color: #fff;
	background-color: #fd7379;
	border-color: #fd7379;
}

.button-danger[disabled] {
	border-color: #999;
	background-color: #fff;
	color: #999;
}
</style>

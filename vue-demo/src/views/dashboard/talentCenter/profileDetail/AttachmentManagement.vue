<template>
	<div class="attachment__container" :class="{isCurrent}"  @mouseleave="isCurrent=false">
		<div>
			是否可以匹配：
			<a-popover placement="rightTop">
				<template slot="content">
					<div  v-if="blackLists.length==0">暂无</div>
					<div v-else v-for="(item,index) in blackLists" :key="index">
                       <p>{{item.reason}}</p>
					   <p>操作时间：{{item.createdAt}}</p>
					   <p>操作人：{{item.username}}</p>
					</div>
				</template>
				<span class="isOk">{{isBlacklist==1?"否":"是"}}</span>
				<!-- <a-icon type="question-circle" v-if="isBlacklist == 1"/> -->
			</a-popover>
			<a-icon type="question-circle" v-if="isBlacklist == 1"/>
			<div class="button-box">
				<a-button type="primary" class="buttons" @click="handlegetRecruitDialog">匹配岗位</a-button>
				<a-button type="danger" class="buttons" v-if="isBlacklist == 1" @click="showRemoveBlack = true">释放黑名单</a-button>
				<a-button type="danger" class="buttons" v-else @click="showAddBlack = true">加入黑名单</a-button>
				<a-button @click="handleDownload" style="background: #22B8CF;border: #22B8CF;" type="primary" class="buttons">下载简历</a-button>
			</div>
			<div @mouseenter="isCurrent=true" >
			<a-tabs defaultActiveKey="1" class="tabs"  :animated="false" size="small" :tabBarGutter="0" >
				<a-tab-pane tab="在招记录" key="1">
					<operation-record :id="id" :isCurrent="isCurrent" style="height:470px;overflow-y:auto;"/>
				</a-tab-pane>
				<a-tab-pane tab="面试评价" key="2" >
					<interview-assess :id="id" :isCurrent="isCurrent" style="height:470px;overflow-y:auto;"/>
				</a-tab-pane>
				<a-tab-pane tab="沟通详情" key="3">
					<contact-content :id="id" :isCurrent="isCurrent" style="height:470px;overflow-y:auto;"/>
				</a-tab-pane>
				<a-tab-pane tab="操作记录" key="4">
					<contact-record :id="id" :isCurrent="isCurrent" style="height:470px;overflow-y:scorll;"/>
				</a-tab-pane>
			</a-tabs>
			</div>
			<!-- <a-button
				class="button contact-button"
				size="large"
				@click="handleDownload"
				>下载附件</a-button
			>
			<a-button
				class="button contact-button"
				size="large"
				@click="handleShowContactDialog"
				>沟通详情</a-button
			>
			<a-button
				class="button contact-button"
				size="large"
				@click="handlegetRecruitDialog"
				>匹配岗位</a-button
			> -->
			<!-- <a-tabs defaultActiveKey="1" class="tabs" :animated="false" size="small" :tabBarGutter="0">
				<a-tab-pane tab="操作记录" key="1">
					<operation-record :id="id" />
				</a-tab-pane>
				<a-tab-pane tab="面试评价" key="2">
					<interview-assess :id="id" />
				</a-tab-pane>
				<a-tab-pane tab="在招详情" key="3">
					<interview-assess :id="id" />
				</a-tab-pane>
			</a-tabs> -->
		</div>
		<contact-modal :show.sync="showContactModal"  :id="id" />
		<recruit-content :show.sync="showRecruit" />
		<add-black-list :show.sync="showAddBlack" :isBlacklist.sync="isBlacklist" :ids="[id]"/>
		<remove-black-list :show.sync="showRemoveBlack" :isBlacklist.sync="isBlacklist" :ids="[id]"/>
	</div>
</template>

<script>
import baseUrl from '@/configs/baseURL';
import ContactModal from './attachmentManagement/ContactModal';
import RecruitContent from './attachmentManagement/RecruitContent';
import InterviewAssess from './attachmentManagement/InterviewAssess';
import OperationRecord from './attachmentManagement/OperationRecord';
import ContactContent from "./attachmentManagement/ContactContent";
import ContactRecord from "./attachmentManagement/ContactRecord"
import AddBlackList from '../profile/AddBlackList'
import removeBlackList from '../profile/removeBlackList'
import { downloadResume } from '@/api/talentCenter';
import { createNamespacedHelpers } from 'vuex';
const { mapState: mapAuthState } = createNamespacedHelpers('auth');
export default {
	name: 'AttachmentManagement',
	components: {
		ContactModal,
		OperationRecord,
		InterviewAssess,
		RecruitContent,
		AddBlackList,
		removeBlackList,
		ContactContent,
		ContactRecord
	},
	props: {
		id: Number,
		resumeTitle: String,
		isBlacklist:Number,
		blackLists:Array
	},
	data() {
		return {
			showContactModal: false,
			showRecruit: false,
			info: null,
			isCurrent:false,
			showAddBlack:false,
			showRemoveBlack:false
		};
	},
	computed: {
		...mapAuthState({
			token: state => state.token
		})
	},
	created(){
		console.log(this.blackLists)
	},
	methods: {
		handleShowContactDialog() {
			this.showContactModal = true;
		},
		handlegetRecruitDialog(){
			this.showRecruit = true
		},
		async handleDownload() {
			try {
				const res = await downloadResume(this.id);
				console.log(res,'downloadResume')
				if (res.status === 200 || res.status === 201) {
					if (res.data.type === 'application/octet-stream') {
						const url = window.URL.createObjectURL(
							new Blob([res.data])
						);
						const link = document.createElement('a');
						link.href = url;
						link.setAttribute('download', this.resumeTitle);
						document.body.appendChild(link);
						link.click();
						document.body.removeChild(link);
					} else {
						this.$message.error(
							res.data.mesg ? res.data.mesg : '简历下载失败',
							2
						);
					}
				}
			} catch (error) {
				this.$message.error(
					res.data.mesg ? res.data.mesg : '简历下载失败',
					2
				);
			}
		}
	}
};
</script>

<style scoped>
.isOk {
	font-size: 18px;
	color: #1478E3;
	margin-right: 5px;
}
.button-box {
	margin-top: 20px;
	margin-bottom: 20px;
}
.button-box .buttons {
	padding: 0 8px;
	font-size: 14px;
	margin-right: 10px;
}
.attachment__container {
	background-color: #fff;
	padding: 15px;
	width: 300px;
	/* height:calc(100%-30px); */
	/* min-height: 100%; */
	transition: width .5s;
	z-index: 99999;
	/* min-width: 270px;
	position: absolute;
	right: 16px;
	top: 20px; */
}
.isCurrent {
	width: 860px;
}
/* .attachment__container:hover{
	width: 400px;
} */

.button {
	margin-top: 16px;
	display: block;
	width: 100%;
}

.preview-button {
	background-color: #22b8cf;
	border-color: #22b8cf;
}

.preview-button:hover {
	background-color: #4ec6d8;
	border-color: #4ec6d8;
}

.preview-button:focus {
	background-color: #4ec6d8;
	border-color: #4ec6d8;
}

.download-button {
	-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
	--antd-wave-shadow-color: #1478e3;
	font-feature-settings: 'tnum';
	-webkit-box-direction: normal;
	margin: 0;
	font-family: inherit;
	overflow: visible;
	text-transform: none;
	line-height: 1.499;
	position: relative;
	font-weight: 400;
	white-space: nowrap;
	text-align: center;
	background-image: none;
	border: 1px solid transparent;
	box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
	cursor: pointer;
	transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
	user-select: none;
	touch-action: manipulation;
	background-color: #fff;
	outline: 0;
	height: 40px;
	padding: 0 15px;
	font-size: 16px;
	border-radius: 4px;
	box-sizing: border-box;
	-webkit-appearance: button;
	margin-top: 16px;
	display: block;
	width: 100%;
	border-color: #22b8cf;
	color: #22b8cf;
	line-height: 2.499;
	position: relative;
	white-space: nowrap;
	text-align: center;
}

.download-button:hover {
	border-color: #4ec6d8;
	color: #4ec6d8;
}

.download-button:focus {
	border-color: #4ec6d8;
	color: #4ec6d8;
}

.contact-button {
	border-color: #22b8cf;
	color: #22b8cf;
}

.contact-button:hover {
	border-color: #4ec6d8;
	color: #4ec6d8;
}

.contact-button:focus {
	border-color: #4ec6d8;
	color: #4ec6d8;
}
</style>
<style >
.attachment__container .ant-tabs .ant-tabs-small-bar .ant-tabs-nav-container{
	padding-left:32px;
	padding-right:32px;
}
.attachment__container .ant-tabs-nav-container-scrolling{
	padding-left:32px !important;
	padding-right:32px !important;
}
</style>
<template>
	<div class="tab-page">
		<iframe
			v-if="useIframe"
			class="iframe"
			:src="fullURL"
			referrerpolicy="no-referrer"
		/>
		<img v-if="useImage" class="image" :src="fullURL" alt="简历图片" />
	</div>
</template>

<script>
import { resumeOnlinePreview } from '@/api/talentCenter';
import baseURL from '../configs/baseURL';
export default {
	name: 'ResumeOnelinePreview',
	props: {
		url: {
			type: String,
			required: true
		},
		type: {
			type: String,
			required: true
		}
	},
	computed: {
		useIframe() {
			if (~['word', 'doc', 'docx', 'pdf'].indexOf(this.type)) {
				return true;
			} else {
				return false;
			}
		},
		useImage() {
			if (~['png', 'jpg', 'jpeg'].indexOf(this.type)) {
				return true;
			} else {
				return false;
			}
		},
		fullURL() {
			return this.url;
		}
	}
};
</script>

<style scoped>
.tab-page{
	height:100%;
}
.iframe {
	width: 100%;
	 height:600px;
	/*border:1px solid #afa; */
	/* min-height: 100%; */
	border-style: none;
}

.image {
	display: block;
	width: 100%;
}
</style>

<template>
	<div class="tab-page">
		<iframe class="iframe" :src="url" />
	</div>
</template>

<script>
import { resumeOnlinePreview } from '@/api/talentCenter';
export default {
	name: 'OnlineView',
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
	data() {
		return {
			previewFile: null
		};
	}
};
</script>

<style scoped>
.iframe {
	width: 100%;
	height: 100%;
	border-style: none;
}
</style>

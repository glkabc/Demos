<template>
	<div class="search-bar-container">
		<a-input-search
			placeholder="搜索姓名/手机/邮箱"
			size="large"
			class="search-string"
			@change="handleSearchTitleChange"
			@search="$emit('search')"
		>
		</a-input-search>
		
		<a-select
			placeholder="请选择状态"
			@change="handleStatusClick"
			style="width: 220px;margin-left: 20px"
			size="large"
			allowClear
			:default-value=operationTypeList[0].label
			:getPopupContainer="triggerNode => triggerNode.parentNode"
		>
			<a-select-option
				:value="item.value"
				v-for="item in operationTypeList"
				:key="item.value"
				>{{ item.label }}</a-select-option
			>
		</a-select>
	</div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("status");

export default {
	name: 'SearchBar',
  computed: {
    ...mapState({
      operationTypeList: state => state.selectionTypes,
    })
  },
	methods: {
		handleSearchTitleChange(event) {
			this.$emit('update:searchTitle', event.target.value);
			if (event.target.value === '') {
				this.$emit('search');
			}
		},
		handleStatusClick(e){
			if(e === undefined) {
				this.$emit('update:status','')
			}else {
				this.$emit('update:status',e)
			}
			this.$emit('statusChange')
		},
	}
};
</script>

<style scoped>
.search-bar-container {
	display: flex;
	flex-wrap: nowrap;
	margin-bottom: 20px;
}

.search-bar-container > * {
	margin-right: 4px;
}

.search-string {
	width: 300px;
}

.status-select {
	width: 150px;
}
</style>

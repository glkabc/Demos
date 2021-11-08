<script>
import { Input,Button } from 'ant-design-vue';
export default {
	name: 'Header',
	props: ['searchTitle','opUserName'],
	methods: {
		handleChange(event) {
			this.$emit('update:searchTitle', event.target.value);
			if (event.target.value === '') {
				this.$emit('search');
			}
		},
		handleChangeName(event){
				this.$emit('update:opUserName', event.target.value);
				if (event.target.value === '') {
					this.$emit('search');
				}
		},
		handleSearch() {
			this.$emit('search');
		},
	},
	render() {
		return (
			<div>
				<span>文件名称：</span>
				<Input
					placeholder='请输入文件名称'
					allowClear
					class='search-input'
					value={this.searchTitle}
					onChange={this.handleChange}
				/>
				<span>操作人：</span>
				<Input
					placeholder='请输入操作人'
					
					allowClear
					class='search-input'
					value={this.opUserName}
					onChange={this.handleChangeName}
				/>
				<Button onClick={this.handleSearch} style="background:#feaa19;color:#fff">搜索</Button>
			</div>
		);
	},
};
</script>

<style scoped>
.search-input {
	width: 220px;
	margin-right:30px;
}
</style>

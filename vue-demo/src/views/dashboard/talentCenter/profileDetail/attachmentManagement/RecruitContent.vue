<template>
  <div>
    <a-modal
      title="匹配岗位"
      v-model="staffVisible"
      width="900px"
      :destroyOnClose="true"
      @cancel="handleClose"
    >
      <a-transfer
        :dataSource="dataList"
        show-search
        :operations="['选择职位', '取消选择']"
        :target-keys="targetKeys"
        :render="item => `${item.title}-${item.description}`"
        :list-style="{
          width: '360px',
          height: '300px',
        }"
        @change="handleChange"
      /> 
      <template slot="footer">
        <a-button key="back" @click="handleClose">取消</a-button>
        <a-button
          key="submit"
          style="background: #22B8CF;border: #22B8CF"
          type="primary"
          @click="handleSubmit"
          >确定</a-button
        >
      </template>
    </a-modal>
  </div>
</template>

<script>
import { getRecruitJobList,recommendToJob } from '@api/department/index'
export default {
  // props: ['show','resumeIds'],
  props:{
    show:Boolean,
    resumeIds:Array,
    selectedRowKeys:Array
  },
  data() {
    return {
      staffForm: this.$form.createForm(this),
      staffVisible: false,
      targetKeys: [],
      dataList: [],
    }
  },
  watch: {
    show(e) {
      this.staffVisible = e
    },
  },
  mounted(){
    this.getRecruitJobListInit()
    // console.log(this.$route.query)
  },
  methods: {
    handleClose() {
      this.$emit('update:show', false)
    },
    async getRecruitJobListInit(){
      try {
        const res = await getRecruitJobList({
          status: 1
        })
        let tmpList = res.data.data.recruitmentTaskList
        let tmpAllList = []
        tmpList.map((item,index) => {
          let obj = {
            key: `${item.demandId}`,
            title: `${item.positionName}`,
            description: `${item.organizeName}--${item.workPlace}`
          }
          tmpAllList.push(obj)
        })
        this.dataList = tmpAllList
      }
      catch(error) {
        console.log(error)
      }
    },
    handleChange(targetKeys){
      this.targetKeys = targetKeys;
    },
    async handleSubmit () {
      try {
        const res = await recommendToJob({
          demandIds: this.targetKeys.map(Number),
          resumeIdList: this.$route.query.id?[Number(this.$route.query.id)]:this.resumeIds
        })
        if (res.data.code == 0) {
          this.$message.success(res.data.data);
          this.$emit('update:show', false);
          this.$emit('Search')
          this.$emit('resumeIds',[])
          this.$emit('selectedRowKeys',[])
        } else {
          this.$message.error(res.data.mesg);
          this.$emit('update:show', false)
        }
        console.log(res)
      }catch(error) {
        console.log(error)
      }
    },
  },
}
</script>

<style scoped>
</style>

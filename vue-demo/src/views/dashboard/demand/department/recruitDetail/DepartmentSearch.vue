<template>
  <div>
    <a-input-group compact style="width: 337px;display: inline-block">
      <a-select
        style="width: 110px"
        v-model="searchSelect"
        @change="searchChange"
      >
        <a-select-option
          :value="item.id"
          v-for="item in searchList"
          :key="item.id"
          >{{ item.title }}</a-select-option
        >
      </a-select>
      <a-input-search
        style="width: 220px"
        placeholder="请输入萝卜秀编号"
        @search="onSearch"
        v-model="keywordValue"
        v-if="
          !placeholderShow &&
          !roleValueShow &&
          !groupShow &&
          !jobShow &&
          !statusShow &&
          !cityShow &&
          !organizeShow
        "
        allowClear
      />
      <a-select
        placeholder="请选择负责人"
        @search="handleContactSearch"
        :filter-option="filterOption"
        @change="handleRoleClick"
        @blur="handleContanctBlur"
        @focus="handleContentFocus"
        v-if="roleValueShow"
        style="width: 220px"
        showSearch
        allowClear
        :getPopupContainer="(triggerNode) => triggerNode.parentNode"
      >
        <a-select-option
          :value="item.userId"
          v-for="item in optionUserList"
          :key="item.userId"
          >{{ item.userName }}</a-select-option
        >
      </a-select>
      <a-select
        placeholder="请选择百得事业部"
        v-if="groupShow"
        @change="handleGroupChange"
        style="width: 220px"
        showSearch
        allowClear
        :getPopupContainer="(triggerNode) => triggerNode.parentNode"
      >
        <a-select-option
          :value="item.sysOrgId"
          v-for="item in groupList"
          :key="item.sysOrgId"
          >{{ item.orgName }}</a-select-option
        >
      </a-select>
      <a-cascader
        :options="jobList"
        @change="handleJobChange"
        placeholder="请选择职位类别"
        :allowClear="false"
        v-if="jobShow"
        style="width: 220px"
        :getPopupContainer="(triggerNode) => triggerNode.parentNode"
      />
      <a-select
        placeholder="请选择紧急程度"
        v-if="statusShow"
        @change="handleStatusChange"
        style="width: 220px"
        showSearch
        allowClear
        :getPopupContainer="(triggerNode) => triggerNode.parentNode"
      >
        <a-select-option
          :value="item.value"
          v-for="item in emergencyLevels"
          :key="item.value"
          >{{ item.label }}</a-select-option
        >
      </a-select>
      <a-input-search
        placeholder="请输入工作地"
        v-if="cityShow"
        @search="handleCityChange"
        style="width: 220px"
        v-model="cityValue"
      />
      <a-tree-select
        allowClear
        placeholder="请选择部门"
        treeDefaultExpandAll
        :treeData="treeData"
        :getPopupContainer="(triggerNode) => triggerNode.parentNode"
        v-if="organizeShow"
        @change="handleTradeSearchClick"
        style="width: 220px"
        :dropdownStyle="{ maxHeight: '300px', overflow: 'auto' }"
      >
      </a-tree-select>
    </a-input-group>
  </div>
</template>

<script>
import { 	getTreeList,getPrimaryDepartment } from "@api/branchHC/index";
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("status");
import { getStructureList } from "@api/demandBranch/index";
import { getUserInfoList } from "@api/manage/index";
export default {
  data(){
    return {
      searchList: [
        {
          id: 1,
          title: "萝卜秀编号",
        },
        {
          id: 2,
          title: "岗位负责人",
        },
        {
          id: 3,
          title: "需求部门",
        },
        {
          id: 4,
          title: "百得事业部",
        },
        {
          id: 5,
          title: "职业类别",
        },
        {
          id: 6,
          title: "紧急程度",
        },
        {
          id: 7,
          title: "工作地",
        },
      ],
      typeSearch: '',
      cityShow: false,
      statusShow: false,
      jobShow: false,
      groupShow: false,
      placeholderShow: false,
      organizeShow: false,
      roleValueShow: false,
      searchSelect: 1, // 选择搜索
      keywordValue: "",
      cityValue: '',
      jobList: [],
      groupList: [],
      treeData: []
    }
  },
  computed: {
    ...mapState({
      emergencyLevels: (state) => state.emergencyLevels,
    }),
  },
  created(){
    this.getTreeListInit()
    this.getPrimaryDepartmentInit()
    this.getUserInfoListInit();
    this.getStructureListInit();
  },
  methods: {
    searchChange(e) {
      this.typeSearch = e;
      switch (e) {
        case 1:
          this.placeholderShow = false;
          this.roleValueShow = false;
          this.keywordValue = null;
          this.groupShow = false;
          this.organizeShow = false;
          this.jobShow = false;
          this.statusShow = false;
          this.cityShow = false;
          break;
        // 岗位负责人
        case 2:
          this.placeholderShow = false;
          this.roleValueShow = true;
          this.groupShow = false;
          this.organizeShow = false;
          this.jobShow = false;
          this.statusShow = false;
          this.cityShow = false;
          break;
        case 3:
          // 
          this.placeholderShow = false;
          this.organizeShow = true;
          this.roleValueShow = false;
          this.jobShow = false;
          this.statusShow = false;
          this.cityShow = false;
          break;
        case 4:
          // 百得事业部
          this.placeholderShow = false;
          this.jobShow = false;
          this.roleValueShow = false;
          this.statusShow = false;
          this.cityShow = false;
          this.organizeShow = false;
          this.groupShow = true;
          break;
        case 5:
          // 职业类别
          this.placeholderShow = false;
          this.statusShow = false;
          this.jobShow = true;
          this.roleValueShow = false;
          this.cityShow = false;
          this.organizeShow = false;
          this.groupShow = false;
          break;
        case 6:
          // 紧急程度
          this.placeholderShow = false;
          this.cityShow = false;
          this.organizeShow = false;
          this.statusShow = true;
          this.jobShow = false;
          this.roleValueShow = false;
          this.groupShow = false;
          this.organizeShow = false
          break;
        case 7:
          // 工作地
          this.placeholderShow = false;
          this.cityShow = true;
          this.statusShow = false;
          this.jobShow = false;
          this.roleValueShow = false;
          this.groupShow = false;
          this.organizeShow = false;
          break;
      }
    },
		async getTreeListInit(){
      const res = await getTreeList()
      this.jobList = res.data.data
    },
    async getPrimaryDepartmentInit() {
      try {
        const res = await getPrimaryDepartment()
        this.groupList = res.data.data
      }
      catch(error) {}
    },
    handleContactSearch(e) {
      let userList_ = this.userList.filter(item => item.userName.indexOf(e) > -1);
      this.optionUserList = userList_
    },
    handleContanctBlur(){
      this.optionUserList = this.userList.slice(0,100)
    },
    handleContentFocus(){
      this.optionUserList = this.userList.slice(0,100)
    },
    filterOption(input, option){
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      )
    },
    // 获取系统用户列表
    async getUserInfoListInit() {
      try {
        const res = await getUserInfoList();
        this.userList = res.data.data.userList.list;
        this.optionUserList = [...this.userList]
      } catch (error) {}
    },
    // 获取需求部门
    getStructureListInit() {
      getStructureList().then((res) => {
        if (res.data.code == 0) {
          let newTmp = this.tmpListInit(res.data.data.orgList);
          this.treeData = newTmp;
        } else {
          this.treeData = [];
        }
      });
    },
    tmpListInit(val) {
      let arr = [];
      if (val.length !== 0) {
        val.forEach((item) => {
          let obj = {};
          obj.key = item.orgId;
          obj.value = item.orgId;
          obj.title = item.orgName;
          if (item.children.length >= 1) {
            obj.children = this.tmpListInit(item.children);
          }
          arr.push(obj);
        });
      }
      return arr;
    },
    handleTradeSearchClick(e) {
      this.$emit('update:organizeIds',e)
      this.$emit('update:keywordValue','')
      this.$emit('update:cityValue','')
      this.$emit('update:specialistId',undefined)
      this.$emit('update:statusValue',undefined)
      this.$emit('update:jobValue',undefined)
      this.$emit('update:groupValue',undefined)
      this.$emit('handleSearchChange')
    },
    handleRoleClick(e) {
      this.$emit('update:specialistId',e)
      this.$emit('update:keywordValue','')
      this.$emit('update:cityValue','')
      this.$emit('update:organizeIds',undefined)
      this.$emit('update:statusValue',undefined)
      this.$emit('update:jobValue',undefined)
      this.$emit('update:groupValue',undefined)
      this.$emit('handleSearchChange')
    },
    handleStatusChange(e){
      this.$emit('update:statusValue',e)
      this.$emit('update:keywordValue','')
      this.$emit('update:cityValue','')
      this.$emit('update:organizeIds',undefined)
      this.$emit('update:specialistId',undefined)
      this.$emit('update:jobValue',undefined)
      this.$emit('update:groupValue',undefined)
      this.$emit('handleSearchChange')
    },
    handleJobChange(e){
      let temList = e.pop()
      this.$emit('update:jobValue',temList)
      this.$emit('update:keywordValue','')
      this.$emit('update:cityValue','')
      this.$emit('update:organizeIds',undefined)
      this.$emit('update:specialistId',undefined)
      this.$emit('update:statusValue',undefined)
      this.$emit('update:groupValue',undefined)
      this.$emit('handleSearchChange')
    },
    handleGroupChange(e){
      this.$emit('update:groupValue',e)
      this.$emit('update:keywordValue','')
      this.$emit('update:cityValue','')
      this.$emit('update:organizeIds',undefined)
      this.$emit('update:specialistId',undefined)
      this.$emit('update:statusValue',undefined)
      this.$emit('update:jobValue',undefined)
      this.$emit('handleSearchChange')
    },
    handleCityChange(e) {
      this.$emit('update:cityValue',e)
      this.keywordValue = ''
      this.$emit('update:keywordValue','')
      this.$emit('update:organizeIds',undefined)
      this.$emit('update:specialistId',undefined)
      this.$emit('update:statusValue',undefined)
      this.$emit('update:jobValue',undefined)
      this.$emit('update:groupValue',undefined)
      this.$emit('handleSearchChange')
    },
    onSearch(e) {
      this.$emit('update:keywordValue',e)
      this.cityValue = ''
      this.$emit('update:cityValue','')
      this.$emit('update:organizeIds',undefined)
      this.$emit('update:specialistId',undefined)
      this.$emit('update:statusValue',undefined)
      this.$emit('update:jobValue',undefined)
      this.$emit('update:groupValue',undefined)
      this.$emit('handleSearchChange')
    },
  }
}
</script>

<style lang="scss" scoped></style>

<template>
  <div class="checkInfo">
    <div class="checkInfo-head">
      <div class="firstName-head">
          <span class="label-span">个人信息</span>
          <a-input
            :value="searchValue"
            @change="searchPersonChange"
            placeholder="请输入姓名/邮箱/手机号"
            allowClear
            class="account-form-head"
          >
            <!-- <a-icon slot="suffix" type="search" style="color:#1478E3" /> -->
          </a-input>
          <a-button
              style="background: #FEAA19;margin-left:10px;border: #FEAA19;"
              type="primary"
              @click="handleSearchSubmit"
            >
              搜索
            </a-button>
        </div>
      <!-- <a-input-group compact style="width: 366px">
        <a-select
          style="width: 100px"
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
          :placeholder="placeholderTitle"
          @search="onSearch"
          v-model="keywordValue"
          allowClear
        />
      </a-input-group> -->
    </div>
    <a-table 
      :columns="columns" 
      :dataSource="data" 
      :pagination="pagination"
      class="zebra"
      size="middle"
			@change="onShowSizeChange"
      rowKey="resumeId"
    >
      <a slot="action" slot-scope="record,item" href="javascript:;" @click="handleCheckClick(item)">查看简历</a>
      <template v-slot:degree="degree">
        <span style="margin-right: 0">{{ getEducationLabel(degree.resumeEducation) }}</span>
      </template>
      <template v-slot:experience="experience">
        <span style="margin-right: 0">{{ getExperienceLabel(experience.resumeExperience) }}</span>
      </template>
    </a-table>
    <a-modal
      title="职业进度"
      v-model="staffVisible"
      width="480px"
      :destroyOnClose="true"
      :centered="true"
    >
      <template slot="footer">
        <a-button key="back" @click="staffVisible = false">取消</a-button>
        <a-button
          key="submit"
          style="background: #22B8CF;border: #22B8CF"
          type="primary"
          @click="handleProgressSubmit"
          >确定</a-button
        >
      </template>
      <RecruitProgress ref="recruitProgress" :progressList="list" class="progress"/>
    </a-modal>
  </div>
</template>

<script>
import RecruitProgress from './recruitDetail/RecruitProgress'
import { getCandidateInfo } from "@api/department/operation"
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("status");
const columns = [
  {
    title: "姓名",
    dataIndex: "fullName",
    key: "fullName",
    align: "center",
    width: "79px",
  },
  {
    title: "邮箱",
    dataIndex: "resumeMail",
    key: "resumeMail",
    align: "center",
  },
  {
    title: "手机号码",
    dataIndex: "resumePhone",
    key: "resumePhone",
  },
  {
    title: "学历",
    align: "center",
    width: "101px",
    scopedSlots: { customRender: "degree" }
  },
  {
    title: "工作年限",
    align: "center",
    width: "109px",
    scopedSlots: { customRender: "experience" }
  },
  {
    title: "推荐人",
    dataIndex: "modifiedUserName",
    key: "modifiedUserName",
    align: "center",
    width: "76px",
  },
  {
    title: "权益人",
    dataIndex: "realOwnerName",
    key: "realOwnerName",
    align: "center",
    width: "76px",
  },
  {
    title: "流程",
    dataIndex: "codeDes",
    key: "codeDes",
    align: "center",
    width: "81px",
  },
  {
    title: "状态",
    dataIndex: "statusDes",
    key: "statusDes",
    align: "center",
    scopedSlots: { customRender: "statusDes" }
  },
  {
    title: "操作人",
    dataIndex: "modifiedUserName",
    key: "modifiedUserName",
    align: "center",
  },
  {
    title: "操作日期",
    dataIndex: "modifiedUserTime",
    key: "modifiedUserTime",
    align: "center",
  },
  {
    title: "操作",
    dataIndex: "action",
    key: "action",
    align: "center",
    scopedSlots: { customRender: "action" }
  }
];
export default {
  components: {
    RecruitProgress
  },
  data() {
    return {
      searchValue:'',
      columns,
      staffVisible: false,
      data:[],
      searchSelect: 1, // 选择搜索
      typeSearch: 1, // 搜索下拉类型
      placeholderTitle: "请输入姓名", // input-placeolder
      pagination: {
				current: 1,
				pageSizeOptions: ['10', '20', '30', '40'],
				showSizeChanger: true,
				pageSize: 10,
				total: 0,
				showTotal: (total) => `共 ${total} 条`,
			},
      list: {},
    };
  },
  mounted() {
    this.id = this.$route.query.id
    console.log(this.id)
    this.getCandidateInfoInit()
  },
  computed: {
    ...mapState({
      educations: state => state.educationRequires,
      experiences: state => state.jobExperiences
    })
  },
  methods: {
    searchPersonChange(e){
      this.searchValue = e.target.value;
    },
    handleSearchSubmit() {
      this.getCandidateInfoInit();
    },
    onShowSizeChange({ current, pageSize }) {
			this.pagination.current = current;
			this.pagination.pageSize = pageSize;
			this.getRecruitJobInit();
		},
		getEducationLabel(value) {
			const matched = this.educations.find(
				education => education.value === value
			);
			if (matched) {
				return matched.label;
			} else {
				return '未匹配到学历';
			}
		},
		getExperienceLabel(value) {
			const matched = this.experiences.find(
				experience => experience.value === value
			);
			if (matched) {
				return matched.label;
			} else {
				return '未匹配到经验';
			}
		},
    onSearch(e) {
      switch (this.typeSearch) {
        case 1:
          this.keyword = e;
          this.phoneValue = null;
          this.emailValue = null;
          break;
        case 2:
          this.emailValue = e;
          this.phoneValue = null;
          this.keyword = null;
          break;
        case 3:
          this.phoneValue = e;
          this.keyword = null;
          this.emailValue = null;
          break;
      }
      this.getCandidateInfoInit()
    },
     // 查看简历
    handleCheckClick(e) {
      this.$router.push({
        name: 'TalentProfileDetail',
        query: { id: e.resumeId }
      })
    },
    // searchChange(e) {
    //   this.typeSearch = e
    //   switch (e) {
    //     case 1:
    //       this.keywordValue = "";
    //       this.placeholderTitle = "请输入姓名";
    //       break;
    //     case 2:
    //       this.placeholderTitle = "请输入邮箱";
    //       this.keywordValue = "";
    //       break;
    //     default:
    //       this.placeholderTitle = "请输入手机号";
    //       this.keywordValue = "";
    //       break;
    //   }
    //   this.getCandidateInfoInit()
    // },
    handleProgressClick(e) {
      this.staffVisible = true
      this.list = e
    },
    getCandidateInfoInit() {
      getCandidateInfo({
        demandId: this.id,
        title: this.searchValue,
        // resumePhone: this.phoneValue,
        // resumeMail: this.emailValue
      }).then(res => {
        console.log(res)
        if(res.data.code == 0) {
          this.data = res.data.data.candidatelist
        }else {
          this.data = []
        }
      })
    },
    handleProgressSubmit() {
      // this.$refs.recruitProgress.handleSubmit()
      this.staffVisible = false
    }
  }
};
</script>

<style>
.checkInfo {
  background: #fff;
  padding: 22px;
  min-height: 100%;
}
.checkInfo-head {
  padding-bottom: 22px;
}
.checkInfo .ant-table-tbody {
  font-size: 12px;
}

.checkInfo .ant-table-thead > tr > th {
  border-bottom: 0;
	color: rgba(132,145,158,1);
	font-weight: bold;
  cursor: pointer;
}
.checkInfo .ant-table-tbody >tr > td {
  border-bottom:  0;
  border-right: 1px solid #F0F0F0;
}
.account-form-head{
  width:20%;
  margin:0 10px;
}
</style>
<template>
  <div>
    <div class="mateResume">
      <a-row class="firstName">
        <a-col :span="6">
          <div class="firstName-head">
            <span class="label-span">个人信息</span>
            <a-input
              :value="searchValue"
              @change="searchPersonChange"
              placeholder="请输入个人信息"
              allowClear
              class="account-form-head"
            >
            </a-input>
          </div>
        </a-col>
        <a-col :span="6">
          <div class="firstName-head">
            <span class="label-span">期望职位</span>
            <a-input
              v-model="keyworld"
              class="account-form-head"
              placeholder="请输入期望职位"
              allowClear
              @change="searchKeywordChange"
            />
          </div>
        </a-col>
        <a-col :span="6">
          <div class="firstName-head">
            <span class="label-span">工作地点</span>
            <a-input
              v-model="resumeWorkCity"
              class="account-form-head"
              placeholder="请输入期望工作地"
              allowClear
              @change="searchResumeWorkCityChange"
            />
          </div>
        </a-col>
        <a-col :span="6">
          <div class="firstName-head">
            <span class="label-span">简历上传人</span>
            <a-select
              showSearch
              :value="realOwnerId"
              class="account-form-head"
              @change="realOwnerIdChange"
              optionFilterProp="children"
            >
              <a-select-option value="">所有</a-select-option>
              <a-select-option
                v-for="realOwnerId of organizeList"
                :value="realOwnerId.userId"
                :key="realOwnerId.userId"
                >{{ realOwnerId.userName }}</a-select-option
              >
            </a-select>
          </div>
        </a-col>
      </a-row>
      <a-row class="firstName">
        <a-col :span="24">
          <div class="firstName-head" style="display:inline-block;width:25%">
            <span class="label-span">工作年限</span>

            <a-select
              :value="experience"
              class="account-form-head2"
              style="width:70%"
              @change="experiencesChange"
            >
              <a-select-option value="">所有</a-select-option>
              <a-select-option
                v-for="experience of experiences"
                :value="experience.value"
                :key="experience.value"
                >{{ experience.label }}</a-select-option
              >
            </a-select>
          </div>
          <div class="firstName-head" style="display:inline-block;width:25%">
            <span class="label-span">更新时间</span>
            <a-range-picker
              :value="timeValue"
              format="YYYY-MM-DD"
              class="account-form-head2"
              style="width:70%"
              @change="handleDateClick"
            />
          </div>
          <div class="firstName-head" style="display:inline-block;width:25%">
            <span class="label-span">最低学历</span>
            <a-select
              :value="education"
              class="account-form-head1"
              style="width:70%"
              @change="educationsChange"
            >
              <a-select-option value="">所有</a-select-option>
              <a-select-option
                v-for="degree of educations"
                :value="degree.value"
                :key="degree.value"
                >{{ degree.label }}</a-select-option
              >
            </a-select>
          </div>
          <div style="display:inline-block">
            <a-button
              style="background: #FEAA19;margin-left:10px;border: #FEAA19;"
              type="primary"
              @click="handleSearchSubmit"
            >
              查询
            </a-button>
            <a-button
              style="background: #22B8CF;margin-left:10px;border: #22B8CF;"
              type="primary"
              @click="handleReset"
            >
              重置
            </a-button>
            <!-- <div style="display:inline-block;margin-left:30px;">
              <a-dropdown>
                <span class="ant-dropdown-link">
                  当前匹配的职位:<a-icon type="down" />
                </span>
                <a-menu slot="overlay">
                  <a-menu-item
                    v-for="item in departmentList"
                    :key="item.demandId"
                  >
                    <a
                      href="javascript:;"
                      style="color: #1478E3;padding-left:5px"
                      >{{ item.positionName }}</a
                    >
                  </a-menu-item>
                </a-menu>
              </a-dropdown>
            </div> -->
          </div>
        </a-col>
      </a-row>
      <a-divider />
      <!-- <a-affix :offsetBottom="0"> -->
      <div class="mate-footer">
        <a-button
          @click="handleMateClick"
          type="primary"
          style="background: #22B8CF;border: #22B8CF"
          >推荐至岗位</a-button
        >
        <div style="display:inline-block;float:right;">
          <span
            ><a-row :gutter="16">
              <a-col style="display:inline-block;">当前匹配的职位</a-col>
              <a-col
                style="display:inline-block;"
                v-for="item in departmentList"
                :key="item.demandId"
              >
                <a
                  href="javascript:;"
                  style="color: #1478E3;padding-left:5px"
                  >{{ item.positionName }}</a
                >
              </a-col>
            </a-row></span
          >
        </div>
        <!-- <a-dropdown>
                <span class="ant-dropdown-link">
                  当前匹配的职位:<a-icon type="down" />
                </span>
                <a-menu slot="overlay">
                  <a-menu-item
                    v-for="item in departmentList"
                    :key="item.demandId"
                  >
                    <a
                      href="javascript:;"
                      style="color: #1478E3;padding-left:5px"
                      >{{ item.positionName }}</a
                    >
                  </a-menu-item>
                </a-menu>
              </a-dropdown> -->
      </div>
      <!-- </a-affix> -->
      <a-row>
        <a-col :span="24">
          <a-table
            bordered
            :columns="columns"
            :dataSource="data"
            :pagination="pagination"
            class="zebra"
            :loading="loading"
            @change="onShowSizeChange"
            :rowSelection="{
              onChange: onSelectChange,
              selectedRowKeys: selectedRowKeys,
            }"
            :scroll="{ x: 1600, y: screenHeight - 435 }"
            size="middle"
            :rowKey="(record) => record.resume.resumeId"
          >
            <template v-slot:resume="resume">
              <div class="info__container">
                <div>
                  <p class="info__paragraph">
                    <router-link
                      class="info__name"
                      :to="{
                        name: 'TalentProfileDetail',
                        query: { id: resume.resumeId },
                      }"
                      target="_blank"
                    >
                      <span
                        >{{ resume.fullName }}
                        <!-- <a-popover placement="right">
				<template slot="title">
					<span>拉黑原因</span>
				</template>
              <template slot="content" v-if="blackLists">
                <p v-for="(item,index) in blackLists" :key="index">{{item.reason}}</p>
              </template>
              <icon-font
                type="icon-heimingdan1"
                v-if="isBlacklist === 1"
                style="font-size: 16px; color: #FD5158;margin-left: 4px;"
              />
            </a-popover> -->
                      </span>
                    </router-link>
                    <!-- <span class="info__post" :title="resume.resumeTrade">{{
                    resume.resumeTrade
                  }}</span> -->
                  </p>
                  <!-- <p style="margin-bottom: 0">
                  <span class="info__mobile">{{ resume.resumePhone }}</span>
                  <span class="info__divider">|</span>
                  <span class="info__email">{{ resume.resumeMail }}</span>
                </p> -->
                </div>
              </div>
            </template>
            <template v-slot:degree="degree">
              <a-tag style="margin-right: 0">{{
                getEducationLabel(degree.resume.resumeEducation)
              }}</a-tag>
            </template>
            <template v-slot:experience="experience">
              <a-tag style="margin-right: 0">{{
                getExperienceLabel(experience.resume.resumeExperience)
              }}</a-tag>
            </template>
            <template v-slot:adopt="adopt">
              <span style="margin-right: 0"
                >{{ adopt.adopt }} / {{ adopt.sum }}</span
              >
            </template>
            <template v-slot:resumeRealOwner="resumeRealOwner">
              <span
                style="margin-right: 0"
                v-text="
                  resumeRealOwner.resume.modifiedUserName
                    ? resumeRealOwner.resume.modifiedUserName
                    : '暂无'
                "
              ></span>
            </template>
            <template v-slot:workstatusId="workstatusId">
              <span
                style="margin-right: 0"
                v-text="workstatusId.resume.workstatusId == 1 ? '离职' : '在职'"
              ></span>
            </template>
            <template v-slot:isJoin="isJoin">
              <span
                style="margin-right: 0"
                v-text="isJoin.resume.isJoin == 0 ? '否' : '是'"
              ></span>
            </template>
          </a-table>
        </a-col>
      </a-row>

      <a-modal
        title="候选人数"
        v-model="staffVisible"
        width="460px"
        :destroyOnClose="true"
        centered
      >
        <template slot="footer">
          <a-button key="back" @click="staffVisible = false">取消</a-button>
          <a-button
            key="submit"
            style="background: #22B8CF;border: #22B8CF"
            type="primary"
            @click="handleOrganSubmit"
            >确定</a-button
          >
        </template>
        <div class="recruitPost">
          <span>已经选择</span>
          <div class="recruitPost-main">
            <a-tag
              :key="item.resume.resumeId"
              v-for="(item, index) in selectedRowList"
              @close="preventDefault(item, index)"
              closable
              style="margin-bottom:10px"
            >
              {{ item.resume.fullName }}
            </a-tag>
          </div>
        </div>
      </a-modal>
    </div>
  </div>
</template>

<script>
import { getLeaderInfo, getPrivilegeOwner } from "@api/branchHC/index";
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("status");
import { getResumesList, recommendToJob } from "@api/department/index";
const columns = [
  {
    dataIndex: "resume",
    ellipsis: true,
    width: 120,
    title: "姓名",
    scopedSlots: { customRender: "resume" },
  },
  {
    dataIndex: "resume.resumeTrade",
    ellipsis: true,
    width: 150,
    title: "职位",
    // scopedSlots: { customRender: "resumeTrade" },
  },
  {
    dataIndex: "resume.resumePhone",
    ellipsis: true,
    width: 120,
    title: "联系电话",
    // scopedSlots: { customRender: "resumePhone" },
  },
  {
    dataIndex: "resume.resumeMail",
    ellipsis: true,
    width: 70,
    title: "邮箱",
    // scopedSlots: { customRender: "resumeMail" },
  },
  {
    align: "center",
    width: 72,
    title: "学历",
    scopedSlots: { customRender: "degree" },
  },
  {
    align: "center",
    width: 100,
    title: "工作年限",
    scopedSlots: { customRender: "experience" },
  },
  {
    title: "期望工作地",
    align: "center",
    dataIndex: "resume.resumeWorkCity",
  },
  {
    title: "现居地",
    align: "center",
    ellipsis: true,
    dataIndex: "resume.resumeAddress",
  },
  {
    title: "上传人",
    align: "center",
    scopedSlots: { customRender: "resumeRealOwner" },
  },
  {
    title: "筛选通过率",
    align: "center",
    width: 100,
    scopedSlots: { customRender: "adopt" },
  },
  {
    title: "更新时间",
    align: "center",
    dataIndex: "resume.modifiedUserTime",
    width: 140,
  },
  {
    title: "添加时间",
    width: 140,
    align: "center",
    dataIndex: "resume.createUserTime",
  },
  {
    title: "在职状态",
    align: "center",
    scopedSlots: { customRender: "workstatusId" },
  },
  {
    title: "预计入职时间",
    align: "center",
    dataIndex: "resume.arrivalTime",
  },
  {
    title: "加入百得意愿",
    align: "center",
    scopedSlots: { customRender: "isJoin" },
  },
];
export default {
  name: "MateResume",
  data() {
    return {
      screenHeight: document.documentElement.clientHeight,
      columns,
      searchSelect: 1,
      searchValue: "",
      keyworld: "",
      resumeWorkCity: "",
      selectedRowKeys: [],
      selectedRowList: [],
      data: [],
      pagination: {
        current: 1,
        pageSizeOptions: ["10", "20", "30", "40"],
        showSizeChanger: true,
        pageSize: 10,
        total: 0,
        showTotal: (total) => `共 ${total} 条`,
      },
      searchList: [
        {
          id: 1,
          title: "姓名",
        },
        {
          id: 2,
          title: "邮箱",
        },
        {
          id: 3,
          title: "手机号",
        },
      ],
      education: "", // 学历
      experience: "", // 工作年限
      realOwnerId: "", // 权限人
      placeholderTitle: "请输入姓名",
      staffVisible: false,
      loading: false,
      departmentList: [], // 招聘首页带过来的数据
      timeValue: null, // 时间
      startTime: undefined, // 时间
      endTime: undefined, // 时间
      organizeList: [],
      detailAllList: [],
      demandIdList: [], // 需求id集合
      demandNameList: [], // 需求名称集合
      distributionIdList: [], // 任务id集合
    };
  },
  computed: {
    ...mapState({
      educations: (state) => state.educationRequires,
      experiences: (state) => state.jobExperiences,
    }),
  },
  mounted() {
    this.departmentList = JSON.parse(localStorage.getItem("remarkList"));
    let newDepartmentList = this.departmentList;
    let newDepartmentIdList = [];
    let newDepartmentNameList = [];
    let newDistributionIdList = [];
    newDepartmentList.map((item) => {
      newDepartmentIdList.push(item.demandId);
      newDepartmentNameList.push(item.demandName);
      newDistributionIdList.push(item.distributionId);
    });
    this.demandIdList = newDepartmentIdList;
    this.demandNameList = newDepartmentNameList;
    this.distributionIdList = newDistributionIdList;
    this.getResumesListInit();
    this.getLeaderInfoInit();
    window.onresize = function() {
      // 定义窗口大小变更通知事件
      this.screenHeight = document.documentElement.clientHeight; // 窗口高度
    };
  },
  methods: {
    onShowSizeChange({ current, pageSize }) {
      this.pagination.current = current;
      this.pagination.pageSize = pageSize;
      this.getResumesListInit();
    },
    async getLeaderInfoInit() {
      try {
        const res = await getPrivilegeOwner();
        if (res.data.code == 0) {
          this.organizeList = res.data.data.userList.list;
        }
      } catch {
        console.log(res);
      }
    },
    getEducationLabel(value) {
      const matched = this.educations.find(
        (education) => education.value === value
      );
      if (matched) {
        return matched.label;
      } else {
        return "未匹配到学历";
      }
    },
    getExperienceLabel(value) {
      const matched = this.experiences.find(
        (experience) => experience.value === value
      );
      if (matched) {
        return matched.label;
      } else {
        return "未匹配到经验";
      }
    },
    // 个人信息
    searchPersonChange(e) {
      this.searchValue = e.target.value;
    },
    // 期望职位
    searchKeywordChange(e) {
      this.keyworld = e.target.value;
    },
    // 工作地点
    searchResumeWorkCityChange(e) {
      this.resumeWorkCity = e.target.value;
    },
    // 学历选择
    educationsChange(e) {
      this.education = e;
      this.pagination.current = 1;
      this.getResumesListInit();
    },
    // 年限选择
    experiencesChange(e) {
      this.experience = e;
      this.pagination.current = 1;
      this.getResumesListInit();
    },
    // 时间选择
    handleDateClick(e, value) {
      console.log(e, value[0], "date");
      if (e.length == 0) {
        this.timeValue = null;
        this.startTime = "";
        this.endTime = "";
      } else {
        this.timeValue = e;
        this.startTime = value[0];
        this.endTime = value[1];
      }
      // this.getResumesListInit();
    },
    // 权益人
    realOwnerIdChange(e) {
      this.realOwnerId = e;
      this.pagination.current = 1;
      this.getResumesListInit();
    },
    getResumesListInit() {
      this.loading = true;

      getResumesList({
        demandIds: this.demandIdList,
        title: this.searchValue,
        resumeTrade: this.keyworld, // 期望职位
        address: this.resumeWorkCity, // 期望工作地
        resumeExperience: this.experience,
        resumeEducation: this.education,
        startTime: this.startTime,
        endTime: this.endTime,
        realOwnerId: this.realOwnerId,
        pageNum: this.pagination.current,
        pageSize: this.pagination.pageSize,
      })
        .then((res) => {
          if (res.data.code == 0) {
            this.data = res.data.data.resumeList;
            this.pagination.total = res.data.data.meta.total;
            this.selectedRowKeys = [];
          } else {
            this.data = [];
          }
        })
        .finally((res) => {
          this.loading = false;
        });
    },
    handleSearchSubmit() {
      this.pagination.current = 1;
      this.getResumesListInit();
    },
    //重置
    handleReset(){
        this.searchValue = "";
         this.keyworld = "" // 期望职位
        this.resumeWorkCity = "" // 期望工作地
        this.experience = ""
       this.education = ""
        this.startTime = ""
         this.endTime = ""
         this.realOwnerId = ''
         this.timeValue = ''
         this.getResumesListInit();
    },
    searchChange(e) {
      switch (e) {
        case 1:
          this.placeholderTitle = "请输入姓名";
          break;
        case 2:
          this.placeholderTitle = "请输入邮箱";
          break;
        default :
          this.placeholderTitle = "请输入手机号";
          break;
      }
      this.searchValue = "";
      this.getResumesListInit();
    },
    handleOrganSubmit(e) {
      let newList = [];
      let newAllList = [];
      this.detailAllList.map((item) => {
        newList.push(item.resume.resumeId);
      });
      this.selectedRowList.map((item) => {
        newAllList.push(item.resume.resumeId);
      });
      console.log(newList, newAllList, "newAllList");
      recommendToJob({
        demandIds: this.demandIdList,
        // demandName: this.demandNameList,
        // distributionIds: this.distributionIdList,
        resumeIdList: newList.length == 0 ? newAllList : newList,
      }).then((res) => {
        if (res.data.code == 0) {
          this.$message.success(res.data.data);
          this.staffVisible = false;
          this.getResumesListInit();
        } else {
          this.$message.error(res.data.mesg);
        }
      });
    },
    // 推荐职位
    handleMateClick() {
      if (this.selectedRowKeys.length == 0) {
        this.$message.error("请选择推荐人员！");
        return false;
      }
      this.staffVisible = true;
    },
    preventDefault(item, index) {
      let newList = Object.assign([], this.selectedRowList);
      newList.splice(index, 1);
      this.selectedRowList = newList;
      this.detailAllList = newList;
    },
    onSelectChange(e, list) {
      this.selectedRowKeys = e;
      this.selectedRowList = list;
    },
  },
};
</script>

<style>
.mateResume {
  background-color: #fff !important;
  padding: 24px !important;
  min-height: 100%;
}
/* .mateResume-main {
  padding: 22px;
}
.mateResume-content {
  display: flex;
  justify-content: flex-end;
  padding: 0 20px 20px;
}
.mateResume .ant-input-search-button {
  background: #feaa19;
  border: 1px solid #feaa19;
}
.mateResume .ant-input-group > .ant-input:first-child,
.ant-input-group-addon:first-child {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.mateResume .filter__container {
  padding: 8px;
  border-color: #e8e8e8;
  border-width: 1px;
  border-top-style: solid;
  border-left-style: solid;
  border-right-style: solid;
  background-color: #f9f9f9;
}
.mateResume .filter__title {
  padding: 0 16px;
  color: #657d8a;
}

.mateResume .info__container {
  color: #8c909b;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.mateResume .info__name {
  color: #1890ff;
  margin-right: 16px;
  font-size: 21px;
  flex-shrink: 0;
}

.mateResume .info__post {
  font-size: 19px;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 320px;
}
.mateResume .info__paragraph {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
}
.mateResume .info__divider {
  color: #888888;
  padding: 0 16px;
}
.mateResume .mate-footer {
  display: flex;
  justify-content: center;
  padding: 26px 42px;
  align-items: center;
  cursor: pointer;
  width: 100%;
  background: #fff;
  box-shadow: 0px 7px 20px 1px rgba(0, 0, 0, 0.18);
}
.mateResume .bordered {
  border: solid 1px #e8e8e8;
  border-top: 0;
  border-bottom: 1px;
}
.mateResume .table-header-item__input {
  width: 130px;
}
.recruitPost {
  background: #fff;
  display: flex;
  justify-content: center;
}
.recruitPost-main {
  border: 1px solid #e2e2e2;
  border-radius: 4px;
  padding: 8px 0px 10px 10px;
  width: 310px;
  margin-left: 10px;
  margin-top: -8px;
} */
.firstName {
  display: flex;
  flex-wrap: wrap;
}
.firstName-head {
  padding-bottom: 10px;
}
.account-form-head {
  width: 70%;
  margin-right: 3px;
}
.account-form-head1 {
  width: 73%;
  margin-right: 3px;
}
.label-span {
  margin: 0 10px 0 10px;
  color: #000;
}
.info__container {
  color: #8c909b;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.info__name {
  color: #1890ff;
  margin-right: 16px;
  font-size: 14px;
  flex-shrink: 0;
}

.info__post {
  font-size: 19px;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 320px;
}
.info__paragraph {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
}
.mate-footer {
  margin-top: -12px;
  margin-bottom: 12px;
}
</style>

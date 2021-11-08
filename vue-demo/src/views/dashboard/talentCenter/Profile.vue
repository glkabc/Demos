<template>
  <div style="padding: 20px; background-color: #fff; min-height: 100%">
    <!-- <div class="header-item" style="display:inline-block">
			 <span style="margin:0 10px 0 20px;color:#78909C;font-weight: 600">期望岗位</span>
			<a-input
				v-model="resumeTrade"
				@change="handleChange"
				placeholder="期望岗位"
				style="width: 220px"
				allowClear
				@keyup.enter="handleSearchSubmit"
			/>
		</div> -->
    <m-header
      :personInfo.sync="searchTitle"
      :noSelection="this.selectedRowKeys.length === 0"
      :resumeTradesPosition.sync="resumeTrade"
      :isBlacklist.sync="isBlacklist"
      :selectedCount="selectedRowKeys.length"
      :selectedBlackList="selectedBlacklistRows.length"
      :education.sync="education"
      :workExperience.sync="workExperience"
      :range.sync="range"
      :dateBeginAt.sync="dateBeginAt"
      :dateEndAt.sync="dateEndAt"
      :resumeWorkCity.sync="resumeWorkCity"
      :selectList="selectedRowsList"
      @search="handleSearchClick"
      @add-black-list="handleAddBlackList"
      @remove-black-list="handleRemoveBlackList"
      @lock-resume="handleLockResume"
      @unlock-resume="handleUnlockResume"
    />
    <!-- <table-header
			:education.sync="education"
			:workExperience.sync="workExperience"
			:range.sync="range"
			:dateBeginAt.sync="dateBeginAt"
			:dateEndAt.sync="dateEndAt"
			:indeterminate="indeterminate"
			:checked="selectAll"
			:disableSelectAll="disableSelectAll"
			@toggle-select-all="toggleSelectAll"
		/> -->
    <a-table
      class="zebra"
      :rowSelection="{
        selectedRowKeys: selectedRowKeys,
        onChange: handleSelectChange,
      }"
      rowKey="resumeId"
      :columns="columns"
      :dataSource="data"
      :pagination="pagination"
      :loading="isLoading"
      @change="handleTableChange"
      :scroll="{ y: screenHeight - 420 }"
      bordered
    >
      <template
        v-slot:info="{
          fullName,
          isBlacklist,
          realOwnerId,
          resumeId,
          blackLists,
        }"
      >
        <div class="info__container">
          <!-- <p class="info__paragraph"> -->
          <span class="info__name" @click="handleClickDetail(resumeId)">
            {{ fullName ? fullName : "— —" }}
            <icon-font
              type="icon-suo"
              v-if="realOwnerId !== null"
              style="font-size: 16px; margin-left: 4px;"
            />
            <a-popover placement="right">
              <template slot="title">
                <span>拉黑原因</span>
              </template>
              <template slot="content" v-if="blackLists">
                <div
                  v-for="(item, index) in blackLists"
                  style="width:350px"
                  :key="index"
                >
                  <p>{{ item.reason }}</p>
                  <p>操作时间:{{ item.updatedAt }}</p>
                  <p>操作人:{{ item.username }}</p>
                </div>
              </template>
              <icon-font
                type="icon-heimingdan1"
                v-if="isBlacklist === 1"
                style="font-size: 16px; color: #FD5158;margin-left: 4px;"
              />
            </a-popover>
          </span>
        </div>
      </template>
      <template v-slot:resumeEducation="{ resumeEducation }">
        <a-tag>{{ getEducationLabel(resumeEducation) }}</a-tag>
      </template>
      <template v-slot:resumeExperience="{ resumeExperience }">
        <a-tag>{{ getExperienceLabel(resumeExperience) }}</a-tag>
      </template>
      <template v-slot:degree="degree">
        <a-tag class="status-tag">{{ degree }}</a-tag>
      </template>
      <template v-slot:experience="experience">
        <a-tag class="status-tag">{{ experience }}</a-tag>
      </template>
      <!-- <template v-slot:belonger="{ resumeRealOwner }">
				<p class="belonger-uploader">权益人: {{ getOwnderName(resumeRealOwner) }}</p>
				<p class="belonger-uploader">{{ getOwnerDate(resumeRealOwner) }}</p>
			</template> -->
      <template v-slot:uploader="{ modifiedUserName }">
        <p class="belonger-uploader">
          {{ modifiedUserName ? modifiedUserName : "暂无" }}
        </p>
      </template>
      <template v-slot:modifiedUserTime="{ modifiedUserTime }">
        <p class="belonger-uploader">
          {{
            modifiedUserTime
              ? $moment(modifiedUserTime).format("YYYY-MM-DD")
              : "暂无"
          }}
        </p>
      </template>
      <template v-slot:action="{ resumeId }">
        <!-- <span class="action-button">查看</span> -->
        <!-- <a-divider type="vertical" /> -->
        <span class="action-button" @click="handleAddContactRemark(resumeId)"
          >沟通</span
        >
      </template>
    </a-table>
    <add-black-list
      :show.sync="showAddBlockList"
      :ids="selectedRowKeys"
      @add-black-list-success="fetchResumes"
    />
    <remove-black-list
      :show.sync="showRemoveBlockList"
      :ids="selectedBlacklistRowsids"
      @remove-black-list-success="fetchResumes"
    />
    <add-contact-remark
      :show.sync="showAddContactRemark"
      :id="selectedResumeId"
      @getCandidateList="fetchResumes"
    />
  </div>
</template>

<script>
import { IconFont } from "@configs/scriptURL";
import { Popover } from "ant-design-vue";
import ResumeDetail from "@/views/interviewer/resumeFilter/table/ResumeDetail";
// import ResumeSummary from "./components/ResumeSummary";
import AddBlackList from "./profile/AddBlackList";
import removeBlackList from "./profile/removeBlackList";
import MHeader from "./profile/Header";
// import TableHeader from "./profile/TableHeader";
import AddContactRemark from "./profile/AddContactRemark";
import { getResumes, lockResumes, unlockResumes } from "@/api/talentCenter";
import { createNamespacedHelpers } from "vuex";
getResumes;
const { mapState } = createNamespacedHelpers("status");
import { Trim } from "../../../trim/trim";
// import { createNamespacedHelpers } from "vuex";
// const { mapState } = createNamespacedHelpers("status");
const columns = [
  {
    title: "姓名",
    key: "info",
    width: 100,
    scopedSlots: { customRender: "info" },
  },
  {
    title: "手机号",
    key: "resumePhone",
    width: 120,
    dataIndex: "resumePhone",
    scopedSlots: { customRender: "resumePhone" },
  },
  {
    title: "邮箱",
    key: "resumeMail",
    width: 160,
    ellipsis: true,
    dataIndex: "resumeMail",
    scopedSlots: { customRender: "resumeMail" },
  },
  {
    title: "期望职位",
    key: "resumeTrade",
    width: 140,
    dataIndex: "resumeTrade",
    ellipsis: true,
    scopedSlots: { customRender: "resumeTrade" },
  },
  {
    title: "期望工作地",
    key: "resumeWorkCity",
    dataIndex: "resumeWorkCity",
    ellipsis: true,
    scopedSlots: { customRender: "resumeWorkCity" },
  },
  {
    title: "现居住地",
    key: "resumeAddress",
    width: 100,
    ellipsis: true,
    dataIndex: "resumeAddress",
    scopedSlots: { customRender: "resumeAddress" },
  },
  // {
  // 	title: "权益人",
  // 	key: "belonger",
  // 	scopedSlots: {
  // 		customRender: "belonger"
  // 	}
  // },
  {
    title: "学历",
    key: "resumeEducation",
    width: 90,
    scopedSlots: {
      customRender: "resumeEducation",
    },
  },
  {
    title: "工作年限",
    width: 110,
    key: "resumeExperience",
    scopedSlots: {
      customRender: "resumeExperience",
    },
  },
  {
    title: "上传人",
    width: 80,
    key: "uploader",
    scopedSlots: {
      customRender: "uploader",
    },
  },
  {
    title: "上传时间",
    key: "modifiedUserTime",
    width: 100,
    scopedSlots: {
      customRender: "modifiedUserTime",
    },
  },
  {
    title: "操作",
    width: 80,
    align: "center",
    scopedSlots: { customRender: "action" },
  },
];
let persistQuery = null;
let fromparams = null;
export default {
  name: "Profile",
  components: {
    MHeader,
    AddBlackList,
    removeBlackList,
    AddContactRemark,
    // TableHeader,
    [Popover.name]: Popover,
    IconFont,
    // ResumeSummary
  },
  // mounted() {
  // 	const dateBeginAt = this.$route.query.dateBeginAt;
  // 	if (dateBeginAt) {
  // 		this.dateBeginAt = dateBeginAt;
  // 	}
  // 	this.fetchResumes();
  // },
  data() {
    return {
      searchTitle: persistQuery ? persistQuery.searchTitle : "",
      resumeWorkCity: persistQuery ? persistQuery.resumeWorkCity : "",
      resumeTrade: persistQuery ? persistQuery.resumeTrade : "",
      workExperience: persistQuery ? persistQuery.workExperience : undefined,
      isBlacklist: persistQuery ? persistQuery.isBlacklist : 2,
      education: persistQuery ? persistQuery.education : undefined,
      range: persistQuery ? persistQuery.range : "",
      dateBeginAt: persistQuery ? persistQuery.dateBeginAt : null,
      dateEndAt: persistQuery ? persistQuery.dateEndAt : null,
      screenHeight: document.documentElement.clientHeight,
      selectedRowKeys: [],
      selectedBlacklistRows: [],
      selectedBlacklistRowsids: [],
      selectedResumeId: null,
      isLoading: false,
      isOperating: false,
      data: [],
      columns,
      pagination: {
        current: persistQuery ? persistQuery.current : 1,
        pageSizeOptions: ["10", "20", "30", "40"],
        showSizeChanger: true,
        pageSize: persistQuery ? persistQuery.pageSize : 10,
        total: 0,
        showTotal: (total) => `共 ${total} 条`,
      },
      showAddBlockList: false,
      showRemoveBlockList: false,
      showAddContactRemark: false,
      statusBlack: 2,
      // resumeTrade:'',
      noSelection: false,
      selectedCount: "",
      selectedRowsList: [],
    };
  },
  computed: {
    ...mapState({
      educations: (state) => state.educationRequires,
      experiences: (state) => state.jobExperiences,
      isBlacklistArr: (state) => state.isBlacklistArr,
    }),

    indeterminate() {
      return (
        this.selectedRowKeys.length > 0 &&
        this.selectedRowKeys.length < this.data.length
      );
    },
    selectAll() {
      return (
        this.data.length > 0 && this.selectedRowKeys.length === this.data.length
      );
    },
    disableSelectAll() {
      return this.data.length === 0;
    },
  },
  watch: {
    education() {
      this.pagination.current = 1;
      this.fetchResumes();
    },
    workExperience() {
      this.pagination.current = 1;
      this.fetchResumes();
    },
    isBlacklist() {
      this.pagination.current = 1;
      this.fetchResumes();
    },
    range() {
      this.pagination.current = 1;
      this.fetchResumes();
    },
    dateBeginAt() {
      this.pagination.current = 1;
      this.fetchResumes();
    },
    dateEndAt() {
      this.pagination.current = 1;
      this.fetchResumes();
    },
  },
  methods: {
    // 搜索
    handleSearchSubmit(e) {
      this.fetchResumes();
    },
    searchChange(e) {
      this.searchTitle = e.target.value;
    },
    handleStatus(e) {
      this.statusBlack = e.target.value;
    },

    handleChange(e) {
      this.resumeTrade = e.target.value;
    },
    handleAddContactRemark(id) {
      this.selectedResumeId = id;
      this.showAddContactRemark = true;
    },
    handleSearchClick() {
      this.pagination.current = 1;
      this.selectedRowsList = [];
      this.fetchResumes();
    },
    getOwnderName(resumeRealOwner) {
      if (!resumeRealOwner) {
        return "暂无";
      } else if (resumeRealOwner.realOwnerName) {
        return resumeRealOwner.realOwnerName;
      } else {
        return "暂无";
      }
    },
    getOwnerDate(resumeRealOwner) {
      if (!resumeRealOwner) {
        return "暂无";
      } else if (resumeRealOwner.startTime && resumeRealOwner.endTime) {
        return `${this.$moment(resumeRealOwner.startTime).format(
          "YYYY-MM-DD"
        )} ~ ${this.$moment(resumeRealOwner.endTime).format("YYYY-MM-DD")}`;
      } else {
        return "暂无";
      }
    },
    toggleSelectAll() {
      if (this.data.length === 0) {
        return;
      }
      if (this.selectedRowKeys.length === this.data.length) {
        this.selectedRowKeys = [];
      } else {
        this.selectedRowKeys = this.data.map((record) => record.resumeId);
      }
    },
    async handleAddBlackList() {
      const hasAnyBlackListedAlready = this.selectedRowKeys.some(
        (id) =>
          this.data.find((record) => record.resumeId === id).isBlacklist === 1
      );
      if (hasAnyBlackListedAlready) {
        this.$confirm({
          title: "提示",
          content: "当前选择的简历中已有加入黑名单的简历，是否继续?",
          centered: true,
          onOk: () => {
            this.showAddBlockList = true;
          },
        });
      } else {
        this.showAddBlockList = true;
      }
    },
    // 移出黑名单
    handleRemoveBlackList() {
      this.showRemoveBlockList = true;
    },
    async handleUnlockResume() {
      try {
        const res = await unlockResumes(this.selectedRowKeys);
        if (res.status === 200) {
          if (res.data.code === 0) {
            this.$message.success("解锁简历成功", 2);
            this.fetchResumes();
          } else {
            this.$message.error(
              res.data.mesg ? res.data.mesg : "解锁简历失败",
              2
            );
          }
        }
      } catch (error) {}
    },
    async handleLockResume() {
      const hasAnyLockedAlready = this.selectedRowKeys.some(
        (id) =>
          this.data.find((record) => record.resumeId === id).realOwnerId !==
          null
      );
      const lock = async () => {
        try {
          const res = await lockResumes(this.selectedRowKeys);
          if (res.status === 200) {
            if (res.data.code === 0) {
              this.$message.success("锁定简历成功", 2);
              this.fetchResumes();
            } else {
              this.$message.error(
                res.data.mesg ? res.data.mesg : "锁定简历失败",
                2
              );
            }
          }
        } catch (error) {}
      };
      if (hasAnyLockedAlready) {
        this.$confirm({
          title: "提示",
          content: "当前选择的简历中已有被锁定的简历，是否继续?",
          centered: true,
          onOk: lock,
        });
      } else {
        lock();
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
    handleTableChange({ current, pageSize }) {
      this.pagination.current = current;
      this.pagination.pageSize = pageSize;
      this.fetchResumes();
    },
    handleSelectChange(selectedRowKeys, selectedRows) {
      if (selectedRows.length > 0) {
        const ids = [];
        selectedRows.map((i) => {
          ids.push(i.resumeId);
        });
        this.selectedRowsList = ids;
      } else {
        this.selectedRowsList = [];
      }
      this.selectedBlacklistRows = selectedRows.filter((v) => {
        return v.isBlacklist == 1;
      });
      this.selectedBlacklistRowsids = [];
      this.selectedBlacklistRows.forEach((v) => {
        this.selectedBlacklistRowsids.push(v.resumeId);
      });
      this.selectedRowKeys = selectedRowKeys;
    },
    handleResumeImport() {
      this.$router.push({ name: "ProfileUpload" });
    },
    handleClickDetail(id) {
      this.$router.push({
        path: `${this.$route.path}/detail`,
        query: { id: id, current: this.pagination.current },
      });
    },
    getfetchResumesLocalData() {
      const AuthProfile = window.localStorage.getItem("MyProfileData");
      var parsedAuth;
      if (AuthProfile != null) {
        //自定义代码

        parsedAuth = JSON.parse(AuthProfile);
      } else {
        console.log("key 不存在");
        parsedAuth = {
          personInfo: "",
          resumeTradesPosition: "",
          resumeWorkCity: "",
          education: undefined,
          workExperience: undefined,
          range: "",
          dateBeginAt: null,
          dateEndAt: null,
          statusBlack: "",
        };

        window.localStorage.setItem(
          "MyProfileData",
          JSON.stringify(parsedAuth)
        );
        this.fetchResumes();
      }
      return parsedAuth;
    },
    async fetchResumes() {
      const parsedAuth = this.getfetchResumesLocalData();
      try {
        this.isLoading = true; //加载状态
        const res = await getResumes({
          pageSize: this.pagination.pageSize,
          pageNum: this.pagination.current,
          title: parsedAuth
            ? Trim(parsedAuth.personInfo)
            : Trim(this.searchTitle),
          resumeWorkCity: parsedAuth
            ? Trim(parsedAuth.resumeWorkCity)
            : Trim(this.resumeWorkCity),
          resumeTrade: parsedAuth
            ? Trim(parsedAuth.resumeTradesPosition)
            : Trim(this.resumeTrade),
          education: parsedAuth ? parsedAuth.education : this.education,
          experience: parsedAuth
            ? parsedAuth.workExperience
            : this.workExperience,
          range: parsedAuth ? parsedAuth.range : this.range,
          dateBeginAt: parsedAuth ? parsedAuth.dateBeginAt : this.dateBeginAt,
          dateEndAt: parsedAuth ? parsedAuth.dateEndAt : this.dateEndAt,
          isBlacklist: parsedAuth ? parsedAuth.statusBlack : this.isBlacklist,
        });
        this.isLoading = false;
        //TODO
        if (res.status === 200) {
          if (res.data.code === 0) {
            this.selectedRowKeys = [];
            this.selectedBlacklistRows = [];
            this.data = res.data.data.resumesList;
            this.pagination.total = res.data.data.meta.size;
          } else {
            this.$message.error(res.data.mesg, 2);
          }
        }
      } catch (error) {
        this.isLoading = false;
      }
    },
  },
  created() {
    // window.localStorage.removeItem('MyProfileData')
    const dateBeginAt = this.$route.query.dateBeginAt;
    if (dateBeginAt) {
      this.dateBeginAt = dateBeginAt;
    }
    window.onresize = function() {
      // 定义窗口大小变更通知事件
      this.screenHeight = document.documentElement.clientHeight; // 窗口高度
    };
  },
  mounted() {
    this.fetchResumes();
  },
  beforeRouteLeave(to, from, next) {
    if (to.path === "/talent-center/profile/detail") {
      if (!from.meta.keepAlive) {
        from.meta.keepAlive = true;
      }
      next();
    } else {
      from.meta.keepAlive = false;
      this.$nextTick(() => {
        this.$destroy();
      });
      next();
    }
  },
  //vue对象中
  beforeRouteEnter(to, from, next) {
    if (from.path == "/talent-center/profile/detail") {
      if (from.query.current) {
        fromparams = from.query.current;
      }
    } else {
      const AuthProfile = window.localStorage.getItem("MyProfileData");
      var parsedAuth;
      if (AuthProfile != null) {
        //自定义代码

        parsedAuth = JSON.parse(AuthProfile);
        (parsedAuth.personInfo = ""),
          (parsedAuth.resumeTradesPosition = ""),
          (parsedAuth.education = undefined);
        (parsedAuth.workExperience = undefined),
          (parsedAuth.range = ""),
          (parsedAuth.dateBeginAt = null),
          (parsedAuth.dateEndAt = null);
        (parsedAuth.statusBlack = ""),
          (parsedAuth.resumeWorkCity = ""),
          window.localStorage.setItem(
            "MyProfileData",
            JSON.stringify(parsedAuth)
          );
      } else {
        console.log("key 不存在");
        parsedAuth = {
          personInfo: "",
          resumeTradesPosition: "",
          education: undefined,
          workExperience: undefined,
          range: "",
          dateBeginAt: null,
          dateEndAt: null,
          statusBlack: "",
          resumeWorkCity: "",
        };

        window.localStorage.setItem(
          "MyProfileData",
          JSON.stringify(parsedAuth)
        );
      }
      fromparams = 1;
    }
    next();
  },
  beforeMount() {
    if (fromparams) {
      this.pagination.current = fromparams;
      // let params = JSON.parse(fromparams);
      //将url上带回的参数赋值给vue中的data对象,从而实现条件的带回
      // this.date  = params.date;
      // this.status = params.status
      // this.page = params.page;
    } else {
      this.pagination.current = 1;
    }
  },
  // beforeRouteLeave(to, from, next) {
  //   if (to.path === "/talent-center/profile/detail") {
  //     persistQuery = {
  //       searchTitle: this.searchTitle,
  //       resumeWorkCity: this.resumeWorkCity,
  //       resumeTrade: this.resumeTrade,
  //       workExperience: this.workExperience,
  //       education: this.education,
  //       range: this.range,
  //       dateBeginAt: this.dateBeginAt,
  //       dateEndAt: this.dateEndAt,
  //       current: this.pagination.current,
  //       pageSize: this.pagination.pageSize,
  //     };
  //     next();
  //   } else {
  //     persistQuery = null;
  //     next();
  //   }
  // },
};
</script>

<style scoped>
.search-input >>> button {
  background-color: #fc9a16;
  border-color: #d9d9d9;
  border-left-style: none;
}

.search-input >>> button:hover {
  background-color: #e28a13;
}

.resume-import-button {
  background-color: #22b8cf;
  margin-left: 10px;
  border-color: #22b8cf;
}

.resume-import-button:hover {
  background-color: #4ec6d8;
  border-color: #4ec6d8;
}

.info__container {
  color: #8c909b;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.info__paragraph {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
}

.info__name {
  color: #2c90f5;
  margin-right: 16px;
  font-size: 12px;
  flex-shrink: 0;
}

.info__post {
  flex-grow: 1;
  color: #333;
  font-size: 19px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 367px;
}

.info__divider {
  padding: 0 16px;
}

.bordered {
  border: solid 1px #e8e8e8;
}

.belonger-uploader {
  /* color: #8c909b; */
  color: #000;
}
.belonger-uploader:last-child {
  margin-bottom: 0;
}

.status-tag {
  color: #8c909b;
  margin-right: 0;
  background-color: rgba(255, 255, 255, 0);
  border-radius: 0;
  cursor: default;
}

.black-list {
  color: #fd5158;
  font-size: 12px;
}

.action-button {
  cursor: pointer;
  color: #4480ee;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
}
.header-container {
  margin: -10px;
  /* display: flex; */
  margin-bottom: 30px;
}

.header-item {
  padding: 10px;
  display: inline-block;
}

.header-item--placeholder {
  flex-grow: 1;
}

.search-input >>> button {
  background-color: #fc9a16;
  border-color: #d9d9d9;
  border-left-style: none;
}

.search-input >>> button:hover {
  background-color: #e28a13;
}

.button-info {
  color: #fff;
  background-color: #22b8cf;
  border-color: #22b8cf;
  margin-right: 15px;
}

.button-info:hover {
  color: #fff;
  background-color: #4ec6d8;
  border-color: #4ec6d8;
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

.button-info[disabled],
.button-danger[disabled] {
  color: #999;
  background-color: #fff;
  border-color: #999;
}

.search-item >>> .ant-select-selection.ant-select-selection--single {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
</style>

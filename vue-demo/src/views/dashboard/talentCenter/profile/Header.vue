<template>
  <div>
    <a-row class="header-container">
      <a-col :span="6">
        <div class="header-item">
          <span class="label-span">个人信息</span>
          <a-input
            class="search-input header-ipt"
            placeholder="搜索姓名/手机/邮箱"
            allowClear
            v-model.trim="personInfo"
            @change="handleSearchTitleChange"
            @keyup.enter.native="handleSearch"
          />
        </div>
      </a-col>
      <a-col :span="6">
        <div class="header-item">
          <span class="label-span">期望职位</span>
          <a-input
            v-model.trim="resumeTradesPosition"
            @change="handleChange"
            placeholder="期望职位"
            class="header-ipt"
            allowClear
            @keyup.enter.native="handleSearch"
          />
        </div>
      </a-col>
      <a-col :span="6">
        <div class="header-item">
          <span class="label-span">工作年限</span>
          <a-select
            show-search
            :filter-option="filterOption"
            class="header-ipt"
            @change="handleExperienceChange"
            :value="workExperience"
            allowClear
            placeholder="筛选工作年限"
            :getPopupContainer="(triggerNode) => triggerNode.parentNode"
          >
            <a-select-option
              v-for="experience of experiences"
              :value="experience.value"
              :key="experience.value"
              >{{ experience.label }}</a-select-option
            >
          </a-select>
        </div>
      </a-col>
      <a-col :span="6">
        <div class="header-item">
          <span class="label-span">学历</span>
          <a-select
            show-search
            :filter-option="filterOption"
            class="header-ipt"
            :getPopupContainer="(triggerNode) => triggerNode.parentNode"
            @change="handleEducationChange"
            allowClear
            placeholder="筛选学历"
            :value="education"
          >
            <a-select-option
              v-for="education of educations"
              :key="education.value"
              >{{ education.label }}</a-select-option
            >
          </a-select>
        </div>
      </a-col>
    </a-row>
    <a-row class="header-container">
      <a-col :span="24">
        <div class="header-item" style="display:inline-block;width:25%">
          <span class="label-span">查看范围</span>
          <a-select
            show-search
            :filter-option="filterOption"
            defaultValue="请选择查看范围"
            class="header-ipt"
            @change="handleRangeChange"
            :value="range"
            :getPopupContainer="(triggerNode) => triggerNode.parentNode"
          >
            <a-select-option value="">
              全部
            </a-select-option>
            <a-select-option
              v-for="range of ranges"
              :value="range.value"
              :key="range.value"
              >{{ range.label }}</a-select-option
            >
          </a-select>
        </div>
        <div class="header-item" style="display:inline-block;width:25%">
          <span class="label-span">开始时间</span>
          <a-date-picker
            format="YYYY-MM-DD"
            class="header-ipt"
            @change="handleDateBeginChange"
            :value="dateBeginAt ? moment(dateBeginAt) : null"
          />
        </div>
        <div class="header-item" style="display:inline-block;width:25%">
          <span class="label-span">结束时间</span>
          <a-date-picker
            format="YYYY-MM-DD"
            class="header-ipt"
            @change="handleDateEndChange"
            :value="dateEndAt ? moment(dateEndAt) : null"
          />
        </div>
        <div
          class="header-item"
          style="display:inline-block;width:25%"
          v-if="show"
        >
          <span class="label-span">状态</span>
          <a-select
            class="header-ipt"
            @change="handleStatus"
            v-model="statusBlack"
            :getPopupContainer="(triggerNode) => triggerNode.parentNode"
          >
            <a-select-option
              v-for="item in isBlacklistArr"
              :value="item.value"
              :key="item.value"
              >{{ item.label }}</a-select-option
            >
          </a-select>
          <!-- <a-radio-group @change="handleStatus" v-model="statusBlack" style="margin-left:20px">
        <a-radio
          :value="item.value"
          v-for="item in isBlacklistArr"
          :key="item.value"
        >
          {{ item.label }}
        </a-radio>
      </a-radio-group> -->
        </div>
        <div
          class="header-item"
          style="display:inline-block;width:25%"
          v-if="show"
        >
          <span class="label-span">工作地址</span>
          <a-input
            class="search-input header-ipt"
            placeholder="工作地址"
            allowClear
            v-model.trim="resumeWorkCity"
            @change="handleResumeWorkCity"
          />
        </div>
        <div style="display:inline-block;">
          <a-button
            :style="{
              margin: '0 10px',
              backgroundColor: '#feaa19',
              border: '#feaa19',
            }"
            @click="handleSearch"
            type="primary"
            >查询</a-button
          >
          <a-button
            :style="{
              margin: '0 10px',
              backgroundColor: '#22b8cf',
              border: '#feaa19',
            }"
            @click="handleResetSubmit"
            type="primary"
            >重置</a-button
          >
        </div>
      </a-col>
      <!-- <div class="header-item">
			<a-button
				class="button-info"
				size="large"
				:disabled="noSelection"
				@click="handleLockResume"
			>
				<a-icon type="lock" />
				锁定简历{{ selectedCount > 0 ? `(${selectedCount})` : null }}
			</a-button>
		</div>
		<div class="header-item">
			<a-button
				class="button-info"
				size="large"
				:disabled="noSelection"
				@click="handleUnlockResume"
			>
				<a-icon type="lock" />
				解锁简历{{ selectedCount > 0 ? `(${selectedCount})` : null }}
			</a-button>
		</div> -->
      <a-col :span="24">
        <div
          :style="{
            textAlign: 'center',
            marginTop: '15px',
          }"
          @click="show = !show"
        >
          <p class="line">
            <span :class="show ? 'upClass' : 'downClass'"></span>
          </p>
        </div>
      </a-col>
    </a-row>
    <div class="next-btn">
      <a-button class="button-info" @click="handleResumeImport"
        >导入简历</a-button 
      >
      <a-button
        class="button-danger"
        @click="handleAddBlackList"
        :disabled="noSelection"
      >
        加入黑名单{{ selectedCount > 0 ? `(${selectedCount})` : null }}
      </a-button>
      <can-i-use code="rczx-rck-sfhmd">
        <a-button
          class="button-success"
          style="margin-left:15px"
          @click="handleRemoveBlackList"
          :disabled="selectedBlackList == 0"
        >
          释放黑名单{{
            selectedBlackList > 0 ? `(${selectedBlackList})` : null
          }}
        </a-button>
      </can-i-use>
      <a-button
        class="button-success"
        style="margin-left:15px"
        @click="handleRecommendToJob"
      >
        匹配岗位
      </a-button>
    </div>
    <recruit-content
      :show.sync="showRecruit"
      :resumeIds="selectedList"
      @Search="handleSelectedSearch"
    />
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import moment from "moment";
import RecruitContent from "../profileDetail/attachmentManagement/RecruitContent";
import CanIUse from "@/components/CanIUse.js";
const { mapState } = createNamespacedHelpers("status");
export default {
  name: "Header",
  components: { RecruitContent, CanIUse },
  // props:['getBranchHCList'],
  props: {
    // value: String,
    noSelection: Boolean,
    selectedCount: Number,
    selectedBlackList: Number,
    // education: [Number, String, undefined],
    // workExperience: [Number, String, undefined],
    // range: [Number, String],
    // dateBeginAt: String,
    // dateEndAt: String,
    indeterminate: Boolean,
    checked: Boolean,
    disableSelectAll: Boolean,
    selectList: Array,
  },

  computed: {
    ...mapState({
      isBlacklistArr: (state) => state.isBlacklistArr,
      educations: (state) => state.educationRequires,
      experiences: (state) => state.jobExperiences,
      ranges: (state) => state.resumeBelong,
    }),
  },
  data() {
    return {
      statusBlack: 2,
      resumeTradesPosition: "",
      resumeWorkCity: "",
      show: false,
      personInfo: "",
      education: undefined,
      workExperience: undefined,
      range: "",
      dateBeginAt: "",
      dateEndAt: "",
      showRecruit: false,
      selectedList: [],
      // indeterminate: false,
      // checked: false,
      // disableSelectAll: false,
    };
  },
  watch: {
    selectList(e) {
      this.selectedList = e;
    },
  },
  created() {},
  mounted() {
    this.getMountedLocalData();
  },

  methods: {
    moment,
    getMountedLocalData() {
      const AuthProfile = window.localStorage.getItem("MyProfileData");
      var parsedAuth;
      if (AuthProfile != null) {
        const parsedAuth = JSON.parse(AuthProfile);
        this.personInfo = parsedAuth.personInfo;
        this.resumeTradesPosition = parsedAuth.resumeTradesPosition;
        this.workExperience = parsedAuth.workExperience;
        this.education = parsedAuth.education;
        this.range = parsedAuth.range;
        this.dateBeginAt = parsedAuth.dateBeginAt;
        this.dateEndAt = parsedAuth.dateEndAt;
        this.statusBlack=parsedAuth.statusBlack;
        this.resumeWorkCity=parsedAuth.resumeWorkCity
      } else {
        parsedAuth = {
          personInfo: "",
          resumeWorkCity:"",
          resumeTradesPosition: "",
          education: undefined,
          workExperience: undefined,
          range: "",
          dateBeginAt: null,
          dateEndAt: null,
          statusBlack:'',
        };
        window.localStorage.setItem(
          "MyProfileData",
          JSON.stringify(parsedAuth)
        );
      }
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    handleRecommendToJob() {
      if (this.selectedList.length == 0) {
        this.$message.error("请选择需要操作人员");
      } else {
        this.showRecruit = true;
      }
    },
    handleUnlockResume() {
      this.$emit("unlock-resume");
    },
    handleLockResume() {
      this.$emit("lock-resume");
    },
    handleAddBlackList() {
      this.$emit("add-black-list");
    },
    handleRemoveBlackList() {
      this.$emit("remove-black-list");
    },
    handleSearch() {
      const AuthProfile = window.localStorage.getItem("MyProfileData");
      var parsedAuth;
      if (AuthProfile != null) {
        //自定义代码
        console.log("key 存在");
        parsedAuth = JSON.parse(AuthProfile);
        parsedAuth.personInfo = this.personInfo;
        parsedAuth.resumeTradesPosition = this.resumeTradesPosition;
        parsedAuth.resumeWorkCity=this.resumeWorkCity;
        window.localStorage.setItem(
          "MyProfileData",
          JSON.stringify(parsedAuth)
        );
      } else {
        console.log("key 不存在");
        parsedAuth = {
          personInfo: "",
          resumeTradesPosition: "",
          resumeWorkCity:"",
          education: undefined,
          workExperience: undefined,
          range: "",
          dateBeginAt: null,
          dateEndAt: null,
        };

        window.localStorage.setItem(
          "MyProfileData",
          JSON.stringify(parsedAuth)
        );
      }

      this.$emit("search");
    },
    handleSelectedSearch() {
      this.$emit("search");
    },
    handleSearchTitleChange(event) {
      this.personInfo = event.target.value;
      this.$emit("update:personInfo", this.personInfo);
      // if (event.target.value === "") {
      // this.$emit("search");
      // }
    },
    handleResumeWorkCity(event) {
      this.resumeWorkCity = event.target.value;
      this.$emit("update:resumeWorkCity", this.resumeWorkCity);
      // if (event.target.value === "") {
      // this.$emit("search");
      // }
    },
    handleChange(e) {
      this.resumeTradesPosition = e.target.value;
      this.$emit("update:resumeTradesPosition", this.resumeTradesPosition);
      // if (event.target.value === "") {
      // this.$emit("search");
      // }
    },
    handleStatus(value) {
      const AuthProfile = window.localStorage.getItem("MyProfileData");
      const parsedAuth = JSON.parse(AuthProfile);
      parsedAuth.statusBlack = value;
      window.localStorage.setItem("MyProfileData", JSON.stringify(parsedAuth));

      this.statusBlack = value;
      this.$emit("update:isBlacklist", this.statusBlack);
    },
    handleResumeImport() {
      let demandIdList = [];
      this.$router.push({ name: "ProfileUpload", query: demandIdList });
    },
    handleEducationChange(value) {
      const AuthProfile = window.localStorage.getItem("MyProfileData");
      const parsedAuth = JSON.parse(AuthProfile);
      parsedAuth.education = value;
      window.localStorage.setItem("MyProfileData", JSON.stringify(parsedAuth));
      this.education = value;
      this.$emit("update:education", this.education);
    },
    handleExperienceChange(value) {
      const AuthProfile = window.localStorage.getItem("MyProfileData");
      const parsedAuth = JSON.parse(AuthProfile);
      parsedAuth.workExperience = value;
      window.localStorage.setItem("MyProfileData", JSON.stringify(parsedAuth));
      console.log(value);

      this.workExperience = value;
      this.$emit("update:workExperience", this.workExperience);
    },
    handleRangeChange(value) {
      const AuthProfile = window.localStorage.getItem("MyProfileData");
      const parsedAuth = JSON.parse(AuthProfile);
      parsedAuth.range = value;
      window.localStorage.setItem("MyProfileData", JSON.stringify(parsedAuth));
      this.range = value;
      this.$emit("update:range", this.range);
    },
    handleDateBeginChange(value) {
      const formatedValue =
        value instanceof moment ? value.format("YYYY-MM-DD") : null;

      const AuthProfile = window.localStorage.getItem("MyProfileData");
      const parsedAuth = JSON.parse(AuthProfile);
      parsedAuth.dateBeginAt = formatedValue;
      window.localStorage.setItem("MyProfileData", JSON.stringify(parsedAuth));

      this.dateBeginAt = formatedValue;
      this.$emit("update:dateBeginAt", formatedValue);
    },
    handleDateEndChange(value) {
      const formatedValue =
        value instanceof moment ? value.format("YYYY-MM-DD") : null;

      const AuthProfile = window.localStorage.getItem("MyProfileData");
      const parsedAuth = JSON.parse(AuthProfile);
      parsedAuth.dateEndAt = formatedValue;
      window.localStorage.setItem("MyProfileData", JSON.stringify(parsedAuth));

      this.dateEndAt = formatedValue;
      this.$emit("update:dateEndAt", formatedValue);
    },
    // TODO重置
    handleResetSubmit() {
      this.personInfo = "";
      this.education = undefined;
      this.workExperience = undefined;
      // this.range = "";
      this.dateBeginAt = "";
      this.dateEndAt = "";
      this.resumeTradesPosition = "";
      this.resumeWorkCity = "";
      this.statusBlack = 2;
      this.$emit("update:personInfo", undefined);
      this.$emit("update:resumeTradesPosition", undefined);
      this.$emit("update:education", undefined);
      this.$emit("update:workExperience", undefined);
      // this.$emit("update:range", undefined);
      this.$emit("update:dateBeginAt", undefined);
      this.$emit("update:dateEndAt", undefined);
      this.$emit("update:resumeWorkCity", undefined);
      console.log("wozou");
      this.$emit("search");
    },
  },
};
</script>

<style scoped>
.header-container {
  display: flex;
  flex-wrap: wrap;
  /* margin: -10px; */
  /* display: flex; */
  /* margin:0 5px 20px 5px !important; */
  /* margin-top: -52px !important; */
  /* margin-left: 300px !important; */
}

.header-item {
  padding-bottom: 10px;
  /* padding: 10px 10px 0 10px; */
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
.header-ipt {
  width: 74%;
}
.label-span {
  margin: 0 10px 0 10px;
  color: #000;
  /* font-weight: 600; */
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
.button-success {
  color: #fff;
  background-color: #1890ff;
  border-color: #1890ff;
}
.button-info[disabled],
.button-danger[disabled],
.button-success[disabled] {
  color: #999;
  background-color: #fff;
  border-color: #999;
}

.search-item >>> .ant-select-selection.ant-select-selection--single {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.line {
  width: 100%;
  height: 9px;
  margin: 0 auto;
  background: url("../../../../assets/images/line.png") no-repeat;
  background-size: 100% 100%;
}
.upClass {
  background: url("../../../../assets/images/top.png") no-repeat;
  width: 13px;
  height: 5px;
  margin: 0 auto;
  display: block;
}
.downClass {
  background: url("../../../../assets/images/bottom.png") no-repeat;
  width: 13px;
  height: 5px;
  margin: 0 auto;
  display: block;
}
.next-btn {
  margin: 3px 0 12px 0;
}
</style>

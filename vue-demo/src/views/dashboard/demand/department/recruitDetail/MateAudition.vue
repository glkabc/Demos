<template>
  <div>
    <a-modal
      @cancel="handleAuditionClose"
      @on-ok="handleSubmit"
      :visible="staffAuditionVisible"
      :title="titleList"
      :width="940"
      centered
      destroyOnClose
    >
      <template slot="footer">
        <a-button key="back" @click="handleAuditionClose">
          返回
        </a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="handleSubmit">
          确定
        </a-button>
      </template>
      <div class="modal-box">
        <a-form :form="staffForm" @submit="handleSubmit" class="mateAudition">
          <a-row>
            <a-col :span="12">
              <a-form-item
                label="应聘部门"
                :label-col="{ span: 6 }"
                :wrapper-col="{ span: 16 }"
                :colon="false"
              >
                <a-input
                  allowClear
                  v-decorator="[
                    'application',
                    {
                      initialValue: this.organizeName,
                    },
                  ]"
                  disabled
                />
              </a-form-item>
              <a-form-item
                label="面试时间"
                :label-col="{ span: 6 }"
                :wrapper-col="{ span: 16 }"
                :colon="false"
                required
                class="interviewTime"
              >
                <a-form-item
                  :style="{
                    display: 'inline-block',
                    width: 'calc(50% - 10px)',
                  }"
                >
                  <a-date-picker
                    allowClear
                    style="width: 100%"
                    @change="handleDateClick"
                    format="YYYY-MM-DD"
                    v-decorator="[
                      'interviewBeginTime',
                      {
                        rules: [
                          {
                            required: true,
                            message: '请选择日期',
                          },
                        ],
                      },
                    ]"
                    :disabledDate="disabledDate"
                  />
                </a-form-item>
                <span
                  :style="{
                    display: 'inline-block',
                    width: '20px',
                    textAlign: 'center',
                  }"
                >
                  -
                </span>
                <a-form-item
                  :style="{
                    display: 'inline-block',
                    width: 'calc(50% - 10px)',
                  }"
                >
                  <a-time-picker
                    :minuteStep="15"
                    format="HH:mm"
                    @change="handleTimeClick"
                    style="width: 100%"
                    v-decorator="[
                      'time',
                      {
                        rules: [
                          {
                            required: true,
                            message: '请选择时间',
                          },
                        ],
                      },
                    ]"
                  />
                </a-form-item>
              </a-form-item>
            </a-col>
            <a-col :span="11">
              <a-form-item
                label="面试官"
                :label-col="{ span: 6 }"
                :wrapper-col="{ span: 16 }"
                :colon="false"
                required
              >
                <a-select
                  @blur="handleInterviewertBlur"
                  @focus="handleInterviewertFocus"
                  @search="handleInterviewertSearch"
                  option-filter-prop="label"
                  v-decorator="['interviewer']"
                  placeholder="请选择"
                  mode="multiple"
                >
                  <a-select-option
                    :value="item.userId"
                    v-for="item in optionUserData"
                    :key="item.userId"
                    :label="item.userName + '<' + item.mail + '>'"
                    >{{ item.userName }}
                    <span style="color: #4480ee; margin-left: 10px"
                      >[{{ item.mail }}]</span
                    ></a-select-option
                  >
                </a-select>
              </a-form-item>
            </a-col>
            <IconFont
              type="icon-jia"
              @click="showIntervier"
              class="icon"
              style="
                font-size: 20px;
                height: 32px;
                margin-left: -30px;
                line-height: 40px;
                color: #38bdd3;
                display: flex;
              "
            />
            <a-col
              :span="21"
              :offset="3"
              class="add-intervier"
              v-if="IsShowIntervier"
              style="margin-left: 60px; padding-left: 15px"
            >
              <a-col :span="4" style="margin-right: 15px">
                <a-select
                  show-search
                  @change="companyChange"
                  :filter-option="filterOption"
                  v-decorator="[
                    'companyId',
                    {
                      rules: [
                        {
                          required: true,
                          message: '请选择公司',
                        },
                      ],
                    },
                  ]"
                  allowClear
                  placeholder="请选择公司"
                >
                  <a-select-option
                    :value="item.customId"
                    v-for="item in companyList"
                    :key="item.customId"
                    >{{ item.customName }}</a-select-option
                  >
                </a-select>
              </a-col>
              <a-col :span="4" style="margin-right: 15px">
                <a-tree-select
                  allowClear
                  showSearch
                  treeNodeFilterProp="title"
                  placeholder="请选择"
                  treeDefaultExpandAll
                  :treeData="companyInfoList"
                  @change="handleCompanyInfoChange"
                  v-decorator="[
                    'companyInfo',
                    {
                      rules: [
                        {
                          required: true,
                          message: '请选择组织机构',
                        },
                      ],
                    },
                  ]"
                  :dropdownStyle="{ maxHeight: '300px', overflow: 'auto' }"
                >
                </a-tree-select>
              </a-col>
              <a-col :span="4" style="margin-right: 15px">
                <a-input
                  type="text"
                  placeholder="请输入名称"
                  v-model="intervierName"
                />
              </a-col>
              <a-col :span="4">
                <a-input
                  type="email"
                  placeholder="请输入邮箱"
                  v-model="intervierMail"
                />
              </a-col>
              <a-col :span="1" :offset="1">
                <a-button type="primary" @click="sureIntervier">确定</a-button>
              </a-col>
              <a-col :span="1" :offset="2">
                <a-button type="default" @click="cancelIntervier"
                  >取消</a-button
                >
              </a-col>  
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="面试方式"
                :label-col="{ span: 6 }"
                :wrapper-col="{ span: 17 }"
                :colon="false"
                class="mate-form"
                required
              >
                <a-radio-group
                  v-decorator="['interviewerType', { initialValue: 1 }]"
                  @change="handleInterviewRadio"
                >
                  <a-radio
                    :value="item.value"
                    v-for="item in interviewTypes"
                    :key="item.value"
                  >
                    <span>
                      {{ item.label }}
                    </span>
                  </a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item
                label="通知面试官"
                :label-col="{ span: 6 }"
                :wrapper-col="{ span: 17 }"
                :colon="false"
                class="mate-form"
                required
              >
                <a-radio-group
                  v-decorator="['interviewNoticeId', { initialValue: 3 }]"
                  @change="handleInterviewNoticeRadio"
                >
                  <a-radio
                    :value="item.value"
                    v-for="item in notifyInterviewer"
                    :key="item.value"
                    :disabled="item.value == 2"
                  >
                    {{ item.label }}
                  </a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
            <a-col
              :span="12"
              :offset="12"
              style="margin-top: -14px; "
              v-if="intewviewerNoticeVisible"
            >
                <a-form-item 
                :label-col="{ span: 6 }"
                :wrapper-col="{ span: 14 }" 
                label="请选择入职类型">
                  <a-select
                  style="margin-left:5px"
                    allowClear
                    show-search
                    v-decorator="[
                      'entryType',
                      {
                        rules: [
                          {
                            required: true,
                            message: '请选择入职类型',
                          },
                        ],
                        initialValue: '挂靠',
                      },
                    ]"
                    placeholder="请选择入职类型"
                    @change="selectEntryType"
                  >
                    <a-select-option
                      :value="item.name"
                      v-for="item in interviewerNoticeOptions"
                      :key="item.id"
                    >
                      {{ item.name }}</a-select-option
                    >
                  </a-select>
                </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="通知候选人"
                :label-col="{ span: 6 }"
                :wrapper-col="{ span: 17 }"
                :colon="false"
                required
                class="mate-form"
              >
                <a-radio-group
                  v-decorator="['talentNoticeId', { initialValue: 1 }]"
                >
                  <a-radio
                    :value="item.value"
                    v-for="item in notifyCandidate"
                    :key="item.value"
                    :disabled="item.value == 2"
                  >
                    {{ item.label }}
                  </a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="联系人"
                :label-col="{ span: 6 }"
                :wrapper-col="{ span: 16 }"
                :colon="false"
              >
                <a-select
                  allowClear
                  showSearch
                  @blur="handleContanctBlur"
                  @focus="handleContentFocus"
                  @search="handleContactSearch"
                  option-filter-prop="label"
                  v-decorator="[
                    'contacts',
                    {
                      rules: [
                        {
                          required: true,
                          message: '请选择联系人',
                        },
                      ],
                    },
                  ]"
                  placeholder="请选择"
                >
                  <a-select-option
                    :value="item.userId"
                    v-for="item in optionData"
                    :key="item.userId"
                    :label="item.userName + '<' + item.mail + '>'"
                    >{{ item.userName
                    }}<span style="color: #4480ee; margin-left: 10px"
                      >[{{ item.mail }}]</span
                    ></a-select-option
                  >
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="面试地点"
                :label-col="{ span: 6 }"
                :wrapper-col="{ span: 16 }"
                :colon="false"
              >
                <div style="display: flex">
                  <a-select
                    allowClear
                    showSearch
                    @change="handleCityChange"
                    @focus="handleFocusChange"
                    @search="handleAddressSearch"
                    :filter-option="filterOption"
                    v-decorator="[
                      'interviewAddr',
                      {
                        rules: [
                          {
                            required: true,
                            message: '请选择面试地点',
                          },
                        ],
                      },
                    ]"
                    placeholder="请选择面试地点"
                  >
                    <a-select-option
                      :value="item.setupContent"
                      v-for="(item, index) in cityList"
                      :key="index"
                      >{{ item.setupContent }}
                    </a-select-option>
                  </a-select>
                  <!-- <a-cascader
                     :show-search="{ filter }"
                    :options="cityList"
                    change-on-select
                    placeholder="请选择面试地点"
                    allowClear
                    @change="handleCityChange"
                    @focus="handleFocusChange"
                    v-decorator="[
                      'interviewAddr',
                      {
                        rules: [
                          {
                            required: true,
                            message: '请选择面试地点',
                          },
                        ],
                      },
                    ]"
                    :field-names="{
                      label: 'setupContent',
                      value: 'setupContent',
                      children: 'children',
                    }"
                  /> -->
                  <a-icon
                    type="plus-square"
                    class="icon-plus"
                    @click="isShowAddAddress = true"
                  />
                  <!-- <a-button>
                  <router-link class="info__name" :to="{name: 'CitySettings'}" target="_blank">+</router-link>
                </a-button> -->
                </div>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="邮件主题"
                :label-col="{ span: 6 }"
                :wrapper-col="{ span: 16 }"
                :colon="false"
              >
                <a-input
                  v-decorator="[
                    'mailSubject',
                    {
                      initialValue: interType === 5 ? 
                      `【取消邀约】安徽百得思维--${list}--${positionName}--${interviewType}${interviewLabel}` 
                      : (interType === 2 ? `已更新：安徽百得思维--${list}--${positionName}--${interviewType}${interviewLabel}` 
                                            : `安徽百得思维--${list}--${positionName}--${interviewType}${interviewLabel}`)
                    },
                  ]"
                />
              </a-form-item>
            </a-col>
            <a-col :span="24" v-if="isShowAddAddress">
              <div class="add-address-box">
                <a-input
                  v-model.trim="addressContent"
                  placeholder="请输入面试地点"
                  style="width: 435px; margin-right: 45px"
                ></a-input>
                <a-button
                  style="margin-right: 10px"
                  @click="isShowAddAddress = false"
                  >取消</a-button
                >
                <a-button
                  type="primary"
                  style="background: #22b8cf; border: #22b8cf"
                  @click="submitSetup"
                  >确定</a-button
                >
              </div>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="内部抄送人"
                :label-col="{ span: 6 }"
                :wrapper-col="{ span: 16 }"
                :colon="false"
              >
                <a-select
                  allowClear
                  v-decorator="['insideRemind']"
                  placeholder="请选择"
                  mode="multiple"
                  @blur="handleMultipleBlur"
                  @focus="handleMultipleFocus"
                  @search="handleMultipleSearch"
                  option-filter-prop="label"
                >
                  <a-select-option
                    :value="item.userId"
                    v-for="item in optionData"
                    :key="item.userId"
                    :label="item.userName + '<' + item.mail + '>'"
                    >{{ item.userName
                    }}<span style="color: #4480ee; margin-left: 10px"
                      >[{{ item.mail }}]</span
                    ></a-select-option
                  >
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="外部抄送人"
                :label-col="{ span: 6 }"
                :wrapper-col="{ span: 16 }"
                :colon="false"
              >
                <a-select
                  v-decorator="['outsideRemind']"
                  placeholder="请选择"
                  mode="multiple"
                  @blur="handleOutsideBlur"
                  @focus="handleOutsideFocus"
                  @search="handleOutsideSearch"
                  option-filter-prop="label"
                >
                  <a-select-option
                    :value="item.userId"
                    v-for="item in optionUserData"
                    :key="item.userId"
                    :label="item.userName + '<' + item.mail + '>'"
                    >{{ item.userName
                    }}<span style="color: #4480ee; margin-left: 10px"
                      >[{{ item.mail }}]</span
                    ></a-select-option
                  >
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item
                label="邮件内容"
                :label-col="{ span: 3 }"
                :wrapper-col="{ span: 20 }"
                :colon="false"
              >
                <div ref="editorContainer" class="editor-content">
                  <!-- const conent = this.editor.root.innerHTML;取值 -->
                </div>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
        <!-- <div
        :style="{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
          zIndex: 1,
        }"
      >
        <a-button
          :style="{ marginRight: '8px' }"
          @click="staffAuditionVisible = false"
        >
          取消
        </a-button>
        <a-button
          @click="handleSubmit"
          type="primary"
          style="background: #22B8CF;border: #22B8CF"
          >确定</a-button
        >
      </div> -->
      </div>
     
    </a-modal>
    <!-- <a-modal
      :visible="intewviewerNoticeVisible"
      @cancel="handleintewviewerNoticeClose"
      @ok="intewviewerNoticeChangede"
      title="入职类型"
      width="40%"
    >
      <a-select
        style="width: 80%"
        allowClear
        show-search
        v-decorator="[
          'entryType',
          {
            rules: [
              {
                required: true,
                message: '请选择入职类型',
              },
            ],
            initialValue: '挂靠',
          },
        ]"
        placeholder="请选择入职类型"
        @change="selectEntryType"
      >
        <a-select-option
          :value="item.name"
          v-for="item in interviewerNoticeOptions"
          :key="item.id"
        >
          {{ item.name }}</a-select-option
        >
      </a-select>
    </a-modal> -->
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("status");
import { getUserInfoList } from "@api/manage/index";
import { getLeaderInfo, getOrgInfo, getComponyInfo } from "@api/branchHC/index";
import { getTemplates } from "@api/settings";
import { getTalentInterviewById, UapdateGiveUpInterview } from '@api/department/operation'
import { IconFont } from "../../../../../configs/scriptURL";
import {
  addinterviewInfo,
  getSetupAddress,
  addSetup,
} from "@api/department/operation";
import { addUserInfo } from "@api/demandBranch/index";
import moment from "moment";
import pick from "lodash.pick";

export default {
  props: [
    "auditionList",
    "organizeName",
    "customId",
    "interviewer",
    "reInterviewer",
    "isCheckData",
    "auditionVisible",
    "positionName",
    "copyTo",
    "interviewerList",
    "type",
  ],
  components: { IconFont },
  data() {
    return {
      loading:false,
      interviewerNoticeOptions: [
        { id: 0, name: "挂靠" },
        {
          id: 1,
          name: "转编",
        },
      ],
      entryType: undefined,
      intewviewerNoticeVisible: false,
      staffForm: this.$form.createForm(this),
      value: 1,
      userInfoList: [],
      distributionList: [],
      optionData: [],
      optionUserData: [],
      timeValue: "",
      dateValue: "",
      staffAuditionVisible: false,
      interviewTmpList: [],
      reInterviewTmpList: [],
      cityList: [],
      cityValue: "",
      interviewLabel: "到场面试",
      list: "",
      interviewCopyList: [],
      interviewAddrList: "",
      interType: "",
      interviewId: "",
      titleList: "面试安排",
      interviewType: "初试",
      isShowAddAddress: false,
      addressContent: "",
      editor: null,
      templateContent: null,
      interviewList: [],
      reInterViewList: [],
      IsShowIntervier: false, //新增面试官
      companyId: null,
      intervierName: "",
      intervierMail: "",
      companyInfoList: [], //公司部门
      companyList: [], //公司
      // interviewer:this.$route.query.interviewer
    };
  },
  computed: {
    ...mapState({
      interviewTypes: (state) => state.interviewTypes, // 面试方式
      notifyInterviewer: (state) => state.notifyInterviewer, // 通知面试官
      notifyCandidate: (state) => state.notifyCandidate, // 通知候选人
    }),
    // emailTitle() {
    //   if (this.interType === 5) {
    //     return `【取消邀约】安徽百得思维--${list}--${positionName}--${interviewType}${interviewLabel}` 
    //   } else if (this.interType === 2) {
    //     return `已更新：安徽百得思维--${list}--${positionName}--${interviewType}${interviewLabel}`
    //   } else {
    //     return `安徽百得思维--${list}--${positionName}--${interviewType}${interviewLabel}`
    //   }
    // },
  },
  watch: {
    auditionVisible(e) {
      // console.log(e,'面试')
      this.staffAuditionVisible = e;
      this.titleList = "面试安排";
      let tmpLists = {
        interviewer: this.interviewTmpList,
        outsideRemind: this.interviewCopyList,
      };
      this.getLeaderInfoInit();
      if (this.staffAuditionVisible == true) {
        new Promise((resolve) => {
          resolve();
        }).then(() => {
          this.$nextTick(() => {
            const formData = pick(tmpLists, ["interviewer", "outsideRemind"]);
            this.staffForm.setFieldsValue(formData);
          });
        });
      }
    },
    organizeName(e) {
      if (e) {
        let tmpList = e.split("/");
        this.list = tmpList.pop();
      }
    },
    type(e) {
      console.log(e, '传值类型')
      this.interType = e;
      if (this.interType == 1) {
        this.handleGetTemplates();
      }
    },
    filter(inputValue, path) {
      return path.some(
        (option) =>
          option.setupContent.toLowerCase().indexOf(inputValue.toLowerCase()) >
          -1
      );
    },
    interviewerList(e) {
      console.log(e,'面试')
      if (this.interType == 2 || this.interType == 5) {
        this.interviewLabel = this.interviewTypes[e.interviewType-1].label
        this.getLeaderInfoInit();
        this.titleList = "编辑面试";
        this.offList = e;
        this.interviewId = e.interviewId;
        
        new Promise((resolve) => {
          resolve();
        }).then(() => {
          const formData = pick(e, [
            "interviewer",
            "interviewBeginTime",
            "time",
            "interviewerType",
            "interviewNoticeId",
            "talentNoticeId",
            "contacts",
            "insideRemind",
            "outsideRemind",
            "interviewAddr",
            "mailSubject",
          ]);
          // let tmpTime = e.interviewTime.split('');
          // console.log(tmpTime,'temtime')
          formData.interviewer = e.interviewerId;
          formData.contacts = e.linkManId;
          formData.interviewerType = e.interviewType;
          formData.insideRemind = e.inStakeHoldersId;
          let tmpCityList = e.interviewAddr.split("-");
          formData.interviewAddr = tmpCityList;
          formData.outsideRemind = e.outStakeHoldersId;
          formData.interviewBeginTime = moment(
            e.interviewTime.slice(0, 10),
            "YYYY-MM-DD"
          );
          formData.time = moment(e.interviewTime.slice(11, 16), "HH:mm");
          this.staffForm.setFieldsValue(formData);
        });
        this.templateContent = e.templateContent
      } else {
        // console.log(e)
        console.log(this.templateContent, '预约面试修改模板')
        this.titleList = "面试安排";
        let tmpList = {
          interviewer: this.reInterviewTmpList,
          outsideRemind: this.interviewCopyList,
        };
        new Promise((resolve) => {
          resolve();
        }).then(() => {
          const formData = pick(tmpList, ["interviewer", "outsideRemind"]);
          this.$nextTick(() => {
            setTimeout(() => {
              this.staffForm.setFieldsValue(formData);
            });
          });
        });
      }
    },
    interviewer(e) {
      console.log(e, "初试");
      if (e) {
        let tmpList = e.split(",");
        this.interviewTmpList = tmpList ? tmpList.map(Number) : [];
        if (this.interviewTmpList.length > 0) {
          this.interviewTmpList.map((item) => {
            if (isNaN(item)) return null;
          });
        }
      }
    },
    reInterviewer(e) {
      if (e) {
        let tmpList = e.split(",");
        this.reInterviewTmpList = tmpList ? tmpList.map(Number) : [];
        if (this.reInterviewTmpList.length > 0) {
          this.reInterviewTmpList.map((item) => {
            if (isNaN(item)) return null;
          });
        }
      }
    },
    copyTo(e) {
      if (e) {
        let tmpList = e.split(",");
        this.interviewCopyList = tmpList ? tmpList.map(Number) : [];
      }
    },
    staffAuditionVisible(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          var toolbarOptions = [
            ["bold", "italic", "underline", "strike"], // toggled buttons
            // ["blockquote", "code-block"],
            // [{ header: 1 }, { header: 2 }], // custom button values
            [{ list: "ordered" }, { list: "bullet" }],
            // [{ script: "sub" }], // superscript/subscript
            [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
            [{ direction: "rtl" }], // text direction
            [{ size: ["small", false, "large", "huge"] }], // custom dropdown
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ color: [] }, { background: [] }], // dropdown with defaults from theme
            // [{ font: [] }],
            [{ align: [] }],
            ["clean"], // remove formatting button
          ];
          this.editor = new Quill(this.$refs.editorContainer, {
            placeholder: "请输入",
            theme: "snow",
            modules: {
              toolbar: toolbarOptions,
            },
          });
          this.editor.pasteHTML(this.templateContent);
        });
      }
    },
    templateContent(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          var toolbarOptions = [
            ["bold", "italic", "underline", "strike"], // toggled buttons
            // ["blockquote", "code-block"],
            // [{ header: 1 }, { header: 2 }], // custom button values
            [{ list: "ordered" }, { list: "bullet" }],
            // [{ script: "sub" }], // superscript/subscript
            [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
            [{ direction: "rtl" }], // text direction
            [{ size: ["small", false, "large", "huge"] }], // custom dropdown
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ color: [] }, { background: [] }], // dropdown with defaults from theme
            // [{ font: [] }],
            [{ align: [] }],
            ["clean"], // remove formatting button
          ];
          this.editor = new Quill(this.$refs.editorContainer, {
            placeholder: "请输入",
            theme: "snow",
            modules: {
              toolbar: toolbarOptions,
            },
          });
          // console.log(newVal)
          // console.log(this.templateContent)
          this.editor.pasteHTML(newVal);
        });
      }
    },
    auditionList(e) {
      // console.log(e)
      // console.log(e.statusDes, "状态");
      if (e.statusDes == "筛选通过" || e.statusDes == "初试邀约成功") {
        this.interviewType = "初试";
      } else {
        this.interviewType = "复试";
      }
    },
  },
  // created(){
  //   console.log(this.auditionList)
  // },
  mounted() {
    console.log(this.interviewLabel)
    this.getUserInfoListInit();
    this.getSetupInit();
    this.getLeaderInfoInit();
    this.handleGetTemplates();
    this.getAllOrgInfo();
  },
  methods: {
    moment,
    selectEntryType(e) {
      this.entryType = e;  
    },
    companyChange(e) {
      this.companyId = e;
      getComponyInfo({ customId: e }).then((res) => {
        if (res.data.code == 0) {
          let newTmp = this.tmpListInit(res.data.data.orgList);
          this.companyInfoList = newTmp;
        } else {
          this.companyInfoList = [];
        }
      });
    },
    //获取公司
    getAllOrgInfo() {
      getOrgInfo().then((res) => {
        if (res.data.code == 0) {
          this.companyList = res.data.data.CompanyList;
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
    // 新增面试官
    showIntervier() {
      this.intervierName = "";
      this.intervierMail = "";
      this.IsShowIntervier = !this.IsShowIntervier;
    },
    // 取消
    cancelIntervier() {
      this.IsShowIntervier = false;
      this.companyInfo = "";
      this.companyId = null;
    },
    handleCompanyInfoChange(val) {
      this.companyInfo = val;
    },
    // 确定
    sureIntervier() {
      console.log(this.companyId);
      if (this.companyId == null) {
        this.$message.error("请选择公司");
        return;
      }
      if (this.companyInfo == "" || this.companyInfo == undefined) {
        this.$message.error("请选择需求部门");
        return;
      }
      if (!this.intervierName || this.intervierName == "") {
        this.$message.error("请输入成员名称");
        return;
      }
      if (!this.intervierMail || this.intervierMail == "") {
        this.$message.error("请输入邮箱");
        return;
      }
      var pattern = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+$/;
      if (!pattern.test(this.intervierMail)) {
        this.$message.error("请输入正确的邮箱");
        return;
      }
      this.addUser(
        this.intervierName,
        this.intervierMail,
        this.companyId,
        this.companyInfo
      );
    },
    addUser(userName, email, customId, customOrgId) {
      addUserInfo({
        userName: userName,
        mail: email,
        customId: customId,
        customOrgId: customOrgId,
      }).then((res) => {
        if (res.data.code == 0) {
          this.$message.success(res.data.data);
          this.IsShowIntervier = false;
          this.companyInfo = "";
          this.getLeaderInfoInit();
        } else {
          this.$message.error(res.data.mesg);
        }
      });
    },
    filter(inputValue, path) {
      return path.some(
        (option) =>
          option.setupContent.toLowerCase().indexOf(inputValue.toLowerCase()) >
          -1
      );
    },
    submitSetup() {
      if (this.addressContent) {
        addSetup({
          parentCode: 0,
          setupContent: this.addressContent,
          setupType: 3,
        })
          .then((res) => {
            if (res.data.code == 0) {
              this.isShowAddAddress = false;
              this.addressContent = "";
              this.$message.success(res.data.data);
            } else {
              this.$message.error(res.data.mesg);
            }
          })
          .catch(() => {});
      } else {
        this.$message.error("请输入地点", 2);
      }
    },
    // 获取预约模板
    async handleGetTemplates() {
      try {
        const response = await getTemplates({
          type: 2,
        });
        if (response.status === 200) {
          if (response.data.code === 0) {
            let data = response.data.data.mailTemplateList;
            data.forEach((v) => {
              if (v.isDefault == 1 && v.templateState == 1) {
                this.templateContent = v.templateContent;
              }
            });
          } else {
            this.$message.error(res.data.mesg || "加载模板错误", 2);
          }
        }
      } catch (error) {}
    },
    async getLeaderInfoInit() {
      try {
        const res = await getLeaderInfo();
        if (res.data.code == 0) {
          this.userInfoList = res.data.data;
          if (this.interType == 2 || this.interType == 5) {
            let newInterviewerIdList = [];
            let newOutStakeHoldersIdList = [];
            newOutStakeHoldersIdList = this.userInfoList.filter((item) => {
              return this.offList.outStakeHoldersId.indexOf(item.userId) !== -1;
            });
            newInterviewerIdList = this.userInfoList.filter((item) => {
              return this.offList.interviewerId.indexOf(item.userId) !== -1;
            });
            this.optionUserData = [
              ...new Set([
                ...newInterviewerIdList,
                ...newOutStakeHoldersIdList,
              ]),
            ];
          } else {
            let newTmpList = [];
            let reNewTmpList = [];
            let newInsideReindList = [];
            newTmpList = this.userInfoList.filter((item) => {
              return this.interviewTmpList.indexOf(item.userId) !== -1;
            });
            reNewTmpList = this.userInfoList.filter((item) => {
              return this.reInterviewTmpList.indexOf(item.userId) !== -1;
            });
            newInsideReindList = this.userInfoList.filter((item) => {
              return this.interviewCopyList.indexOf(item.userId) !== -1;
            });
            this.optionUserData = [
              ...new Set([
                ...newTmpList,
                ...reNewTmpList,
                ...newInsideReindList,
              ]),
            ];
          }
        }
      } catch {
        console.log(res);
      }
    },
    async getSetupInit() {
      try {
        const res = await getSetupAddress({
          code: 0,
        });
        if (res.data.code == 0) {
          // console.log(res)
          // this.cityList = Array.from(new Set(res.data.data.addressList))
          this.cityList = res.data.data.addressList;
        }
      } catch {
        console.log(res);
      }
    },
    intewviewerNoticeChangede() {
      if (this.entryType == undefined) {
        this.$message.error("请选择入职类型");
      } else {
        this.intewviewerNoticeVisible = false;
      }
    },
    handleintewviewerNoticeClose() {
      this.intewviewerNoticeVisible = false;
      this.entryType = undefined;
      // this.interviewNoticeId = 3
    },
    handleAuditionClose() {
      this.$emit("update:auditionVisible", false);
      this.interviewLabel = "到场面试";
      this.intewviewerNoticeVisible = false;
      this.loading = false
    },
    handleInterviewRadio(e) {
      const interviewTmpLabel = this.interviewTypes.find(
        (education) => education.value === e.target.value
      );
      this.interviewLabel = interviewTmpLabel.label;
    },
    handleInterviewNoticeRadio(e) {
      if (e.target.value == 1) {
        this.intewviewerNoticeVisible = true;
      } else {
        this.intewviewerNoticeVisible = false;
        this.entryType = undefined;
      }
    },
    // 面试时间限制
    disabledDate(current) {
      return current && current < moment().startOf("day");
    },
    async getUserInfoListInit() {
      try {
        const res = await getUserInfoList();
        this.distributionList = res.data.data.userList.list;
        this.optionData = [...this.distributionList];
      } catch (error) {}
    },
    // 联席人失焦
    handleContanctBlur() {
      this.optionData = this.distributionList.slice(0, 100);
    },
    // 联系人获取焦点
    handleContentFocus() {
      this.optionData = this.distributionList.slice(0, 100);
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    // 联系人输入
    handleContactSearch(e) {
      if (!this.timer) {
        this.timer = setTimeout(() => {
          this.searchValue(e);
          this.timer = null;
        }, 300);
      }
      this.keywordContact = e;
    },
    handleAddressSearch(e) {
      if (!this.timer) {
        this.timer = setTimeout(() => {
          this.searchValue(e);
          this.timer = null;
        }, 300);
      }
    },
    handleMultipleBlur() {
      this.optionData = this.distributionList.slice(0, 100);
    },
    handleMultipleFocus() {
      this.optionData = this.distributionList.slice(0, 100);
    },
    handleMultipleSearch(e) {
      if (!this.timer) {
        this.timer = setTimeout(() => {
          this.searchValue(e);
          this.timer = null;
        }, 300);
      }
    },
    handleOutsideBlur() {
      this.optionUserData = this.userInfoList.slice(0, 100);
    },
    handleOutsideFocus() {
      this.optionUserData = this.userInfoList.slice(0, 100);
    },
    handleOutsideSearch(e) {
      if (!this.timer) {
        this.timer = setTimeout(() => {
          this.searchUserValue(e);
          this.timer = null;
        }, 300);
      }
    },
    handleInterviewertBlur() {
      this.optionUserData = this.userInfoList.slice(0, 100);
    },
    handleInterviewertFocus() {
      this.optionUserData = this.userInfoList.slice(0, 100);
    },
    handleInterviewertSearch(e) {
      if (!this.timer) {
        this.timer = setTimeout(() => {
          this.searchUserValue(e);
          this.timer = null;
        }, 300);
      }
    },
    searchValue(value) {
      let distributionList_ = this.distributionList.filter(
        (item) =>
          item.userName.indexOf(value) > -1 || item.mail.indexOf(value) > -1
      );
      if (distributionList_.length > 100 || value === "") {
        distributionList_ = distributionList_.slice(0, 100);
      }
      this.$nextTick(() => {
        this.optionData = distributionList_;
      });
    },
    searchUserValue(value) {
      let userInfoList_ = this.userInfoList.filter(
        (item) =>
          item.userName.indexOf(value) > -1 || item.mail.indexOf(value) > -1
      );
      if (userInfoList_.length > 100 || value === "") {
        userInfoList_ = userInfoList_.slice(0, 100);
      }

      this.$nextTick(() => {
        this.optionUserData = userInfoList_;
      });
    },
    handleDateClick(e, value) {
      this.dateValue = value;
    },
    handleTimeClick(e, value) {
      this.timeValue = value;
    },
    handleFocusChange() {
      this.getSetupInit();
    },
    handleCityChange(e, arr) {
      console.log(e);
      this.interviewAddrList = e;
      // if (arr) {
      //   this.interviewAddrList =
      //     arr.length > 1
      //       ? arr[0].setupContent + "-" + arr[1].setupContent
      //       : arr[0].setupContent;
      // }
    },
    handleSubmit(e) {
      // console.log(this.loading)
      this.staffForm.validateFields((err, values) => {
        // console.log(values);
        if (!err) {
          let newDate;
          if (this.dateValue == "" && this.timeValue == "") {
            newDate = new Date(
              values.interviewBeginTime._i + " " + values.time._i
            ).getTime();
          } else if (this.timeValue == "") {
            newDate = new Date(this.dateValue + " " + values.time._i).getTime();
          } else if (this.dateValue == "") {
            newDate = new Date(
              values.interviewBeginTime._i + " " + this.timeValue
            ).getTime();
          } else {
            newDate = new Date(this.dateValue + " " + this.timeValue).getTime();
          }
           this.loading = true
            // console.log(this.loading)
          // 面试安排
          if (this.interType === 2) {
            addinterviewInfo({
              entryType: values.entryType,
              interviewerId: values.interviewer,
              talentId: this.auditionList.talentId,
              interviewType: values.interviewerType,
              interviewTime: newDate,
              interviewAddr: this.interviewAddrList,
              interviewNoticeId: values.interviewNoticeId,
              talentNoticeId: values.talentNoticeId,
              linkManId: values.contacts,
              inStakeHoldersId:
                values.insideRemind.length === 0 ? null : values.insideRemind,
              outStakeHoldersId:
                values.outsideRemind.length === 0 ? null : values.outsideRemind,
              mailSubject: values.mailSubject,
              interviewId: this.interviewId,
              templateContent: this.editor.root.innerHTML,
            }).then((res) => {
              if (res.data.code == 0) {
                this.loading = false
                this.$emit("recruit-action", 4);
                this.$emit("update:auditionVisible", false);
                this.$message.success(res.data.data);
                this.intewviewerNoticeVisible = false;
              }else {
                 setTimeout(()=>{
                    this.loading = false
                    this.$message.error(res.data.mesg);
                 },1000)
              }
            });
          } else if (this.interType === 5) {
            console.log(values.interviewer)
            UapdateGiveUpInterview({
              interviewerId: values.interviewer,
              // jobTalentIdList: [this.interviewerList.talentId],
              talentIdList: [this.interviewerList.talentId],
              interviewType: values.interviewerType,
              interviewTime: newDate,
              interviewAddr: this.interviewAddrList,
              interviewNoticeId: values.interviewNoticeId,
              talentNoticeId: values.talentNoticeId,
              linkManId: values.contacts,
              inStakeHoldersId: values.insideRemind.length === 0 ? null : values.insideRemind,
              outStakeHoldersId: values.outsideRemind.length === 0 ? null : values.outsideRemind,
              mailSubject: values.mailSubject,
              interviewId: this.interviewId,
              templateContent: this.editor.root.innerHTML,
            }).then(res => {
              console.log(res)
              if (res.data.code === 0) {
                this.loading = false
                this.$emit("recruit-action", 4);
                this.$emit("update:auditionVisible", false);
                this.$message.success(res.data.data);
                this.intewviewerNoticeVisible = false;
              } else {
                setTimeout(()=>{
                  this.loading = false
                  this.$message.error(res.data.mesg);
                },1000) 
              }
            })
          } else {
            addinterviewInfo({
              entryType: values.entryType,
              interviewerId: values.interviewer,
              talentId: this.auditionList.talentId,
              interviewType: values.interviewerType,
              interviewTime: newDate,
              interviewAddr: this.interviewAddrList,
              interviewNoticeId: values.interviewNoticeId,
              talentNoticeId: values.talentNoticeId,
              linkManId: values.contacts,
              inStakeHoldersId: values.insideRemind,
              outStakeHoldersId: values.outsideRemind
                ? values.outsideRemind
                : null,
              mailSubject: values.mailSubject,
              templateContent: this.editor.root.innerHTML,
            }).then((res) => {
              if (res.data.code == 0) {
                this.loading = false
                this.$emit("recruit-action", 4);
                this.$emit("update:auditionVisible", false);
                this.$message.success(res.data.data);
                // this.interviewLabel = "到场面试";
                this.intewviewerNoticeVisible = false;
              } else {
                setTimeout(()=>{
                    this.loading = false
                    this.$message.error(res.data.mesg);
                },1000) 
                  console.log(this.loading)
                // this.$message.error(res.data.mesg);
              }
            });
          }
        }
      });
    },
  },
};
</script>

<style scoped>
>>>.add-intervier {
  margin-top: -10px;
  height: 56px;
  line-height: 56px;
  background: #f8fafc;
}
.modal-box {
  max-height: 500px;
  overflow-y: auto;
}
.icon-plus {
  margin: 10px;
  color: #4ec6d8;
  cursor: pointer;
}
.add-address-box {
  background-color: #f7f8fa;
  height: 66px;
  padding: 15px 20px;
  width: 743px;
  margin-left: 112px;
  margin-top: -10px;
  margin-bottom: 8px;
}
.editor-content {
  height: 280px;
}
.confirm-title {
  font-size: 17px;
  color: #fd5178;
}
.mateAudition {
  margin-bottom: 30px;
}
.mateAudition >>> .ant-select-selection--multiple {
  min-height: 95px;
}
.ant-radio-button-wrapper {
  margin: 0 10.5px 0 0;
  border-left: 1px solid #d9d9d9;
  border-radius: 4px;
  width: 97px;
  text-align: center;
}
.ant-radio-button-wrapper:first-child {
  border-radius: 4px;
  width: 97px;
  text-align: center;
}
.ant-radio-button-wrapper:last-child {
  border-radius: 4px;
  width: 97px;
}
.interviewTime {
  margin-bottom: 0;
}
.ant-radio-group-solid
  .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled)::after {
  content: "✓";
  background: #cccccc;
  border: none;
  width: 0px;
  height: 0px;
  display: inline-block;
}
.ant-radio-group-solid
  .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {
  color: #fff;
  background: #4ec6d8;
  border: 1px solid #4ec6d8;
  box-shadow: 1px 0 0 0 #4ec6d8;
}
.ant-radio-group-solid
  .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):hover {
  color: #fff;
  background: #4ec6d8;
  box-shadow: 1px 0 0 0 #4ec6d8;
  border: 1px solid #4ec6d8;
}
.button-info:hover {
  color: #4ec6d8;
  border: 1px solid #4ec6d8;
}
.ant-radio-button-wrapper:not(:first-child)::before {
  width: 0;
}
.icon {
  position: absolute;
  top: 20px;
  right: 5%;
}
</style>

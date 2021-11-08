<template>
  <div class="recommend">
    <a-modal
      title="简历推荐"
      v-model="staffRecommendVisible"
      width="60%"
      :destroyOnClose="true"
      centered
      @cancel="handleClose"
    >
      <a-form :form="staffForm" @submit="handleSubmit">
        <a-row>
          <a-col :span="24" class="recommend-head">
            <a-form-item
              label="已选择"
              :label-col="{ span: 3 }"
              :wrapper-col="{ span: 16 }"
              :colon="false"
            >
              <a-tag
                :key="item.talentId"
                v-for="(item, index) in recommendList"
                closable
                @close="delClick(item, index)"
              >
                <span>{{ item.fullName }}</span>
              </a-tag>
            </a-form-item>
          </a-col>
          <a-divider />
          <a-col :span="24">
            <a-form-item
              label="收件人"
              :label-col="{ span: 3 }"
              :wrapper-col="{ span: 21 }"
              :colon="false"
            >
              <a-select
                v-decorator="[
                  'receives',
                  {
                    initialValue: insideRemindList,
                  },
                ]"
                placeholder="请选择"
                mode="multiple"
                @blur="handleReceivesBlur"
                @focus="handleReceivesFocus"
                @search="handleReceivesSearch"
                 option-filter-prop="label"
                style="width: 90%"
              >
                <a-select-option
                  :value="item.userId"
                  v-for="item in optionOrgList"
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
              font-size: 25px;
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
            style="padding-left: 20px;"
          >
            <a-col :span="4" style="margin-right: 10px">
              <a-select
              show-search
                @select="selectCompany"
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
            <a-col :span="4" style="margin-right: 10px">
              <a-tree-select
                allowClear
                showSearch
                treeNodeFilterProp="title"
                placeholder="请选择组织机构"
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
            <a-col :span="4" style="margin-right: 10px">
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
              <a-button type="primary" class="bottom-btn" @click="sureIntervier"
                >确定</a-button
              >
            </a-col>
            <a-col :span="1" :offset="2">
              <a-button type="default" @click="cancelIntervier">取消</a-button>
            </a-col>
          </a-col>
          <a-col :span="24">
            <a-form-item
              label="抄送"
              :label-col="{ span: 3 }"
              :wrapper-col="{ span: 21 }"
              :colon="false"
            >
              <a-select
                v-decorator="[
                  'sendInputEmail',
                  {
                    initialValue: sendInputList,
                  },
                ]"
                placeholder="请选择"
                mode="multiple"
                @blur="handleReceivesBlur"
                @focus="handleReceivesFocus"
                @search="handleReceivesSearch"
                 option-filter-prop="label"
              >
                <a-select-option
                  :value="item.userId"
                  v-for="item in optionOrgList"
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
              label="邮件主题"
              :label-col="{ span: 3 }"
              :wrapper-col="{ span: 21 }"
              :colon="false"
            >
              <!-- organizeName + positionName + '职位推荐' -->
              <a-input
                v-decorator="[
                  'subject',
                  {
                    initialValue:
                      '安徽百得思维信息科技有限公司' +
                      '-' +
                      this.positionName +
                      '-' +
                      this.organizeName +
                      '-' +
                      '职位推荐',
                  },
                ]"
              />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item
              label="推荐候选"
              :label-col="{ span: 3 }"
              :wrapper-col="{ span: 21 }"
              :colon="false"
            >
              <!-- <a-table
                :columns="columns"
                :dataSource="tableList"
                size="middle"
                class="zebra"
                :pagination="false"
                >
                  <template slot="recommendReason">
                    <a-input 
                      placeholder="请输入推荐原因"
                      v-decorator="[
                        'recommendReason',
                        {
                          initialValue: this.recommendReason
                        },
                      ]"
                    />
                  </template>
              </a-table> -->
              <table id="mytable">
                <thead>
                  <tr>
                    <th>姓名</th>
                    <th>学历</th>
                    <th>工作年限</th>
                    <th>职位</th>
                    <!-- <th>应聘部门</th>
                    <th>工作现状</th> -->
                    <th>推荐原因</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in tableList" :key="index">
                    <td>{{item.fullName}}</td>
                    <td>{{item.resumeEducation}}</td>
                    <td>{{item.resumeExperience}}</td>
                    <td>{{item.positionName}}</td>
                    <!-- <td>{{item.organizeName}}</td>
                    <td>{{item.resumeJobType}}</td> -->
                    <td style="padding-left: 0px; padding-top: 0px; padding-bottom: 0px; padding-right: 0px">
                      <!-- <textarea
                        id="input"
                        style="border: 0px; width: 100%; min-height: 40px; padding-left: 10px"
                        placeholder="请输入"
                        value=''
                        v-on:input="inputDataChange"
                        @keyup="KeyDownCode"
                        ref="inputdatas"
                       /> -->
                       <el-input
                          type="textarea"
                          :rows="2"
                          placeholder="请输入内容（最多50个字）"
                          v-model="inputText[index]">
                        </el-input>
                    </td>
                  </tr>
                </tbody>
                
              </table>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      
      <template slot="footer">
        <a-button key="back" @click="handleClose">取消</a-button>
        <a-button
          key="submit"
          style="background: #22b8cf; border: #22b8cf"
          type="primary"
          @click="handleSubmit"
          >确定</a-button
        >
      </template>
    </a-modal>
  </div>
</template>

<script>
import { getLeaderInfo, getComponyInfo,getOrgInfo } from "@api/branchHC/index";
import { recommendTalent } from "@api/department/operation";
import { IconFont } from "../../../../configs/scriptURL";
import { getCompanyList } from "@api/settings/index";
import {
  addUserInfo,
} from "@api/demandBranch/index";
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("status");

export default {
  props: [
    "recommendList",
    "recommendVisible",
    "organizeName",
    "positionName",
    "copyTo",
    "resumeFilter",
    "demandId",
  ],
  components: { IconFont },
  data() {
    return {
      columns: [
        {
          title: "姓名",
          dataIndex: "fullName",
          key: "fullName",
        },
        {
          title: "学历",
          key: "resumeEducation",
          dataIndex:'resumeEducation',
        },
        {
          title: "工作年限",
          key: "resumeExperience",
          dataIndex: "resumeExperience"
        },
        {
          title: '职位',
          key: 'positionName',
          dataIndex: 'positionName'
        },
        {
          title: '应聘部门',
          key: 'organizeName',
          dataIndex: 'organizeName'
        },
        {
          title: '工作现状',
          key: "resumeJobType",
          dataIndex: "resumeJobType"
        },
        {
          title: '推荐原因',
          key: 'recommendReason',
          scopedSlots: { customRender: 'recommendReason' },
          dataIndex: 'recommendReason'
        }
      ],
      tagList: [],
      staffForm: this.$form.createForm(this),
      organizeList: [],
      optionOrgList: [],
      list: {},
      templateList: [
        {
          id: 1,
          title: "简历推荐",
        },
      ],
      newReceivesList: [], // 选择完成后的收件人
      newSubjectList: [], // 选择完成后的抄送人
      staffRecommendVisible: false,
      sendInputList: [],
      insideRemindList: [],
      IsShowIntervier: false, //新增面试官
      companyId: null,
      companyInfoList: [], //公司部门
      companyList: [], //公司
      intervierName: "",
      intervierMail: "",
      tableList: [],
      recommendReason: '',
      delRecommendList: [],
      inputText: []
    };
  },
  computed: {
    ...mapState({
      educations: (state) => state.educationRequires,
      experiences: (state) => state.jobExperiences,
      tabMenuList: (state) => state.operationProcesses,
    }),
  },
  watch: {
    inputText(e) {
      e.forEach((val, index) => {
        if (val.length >= 51 ) {
          // this.$message.warning('最多输入50个字!')
          this.inputText[index] = this.inputText[index].slice(0, 50)
        }
      })
    },
    organizeName(e) {
      console.log(e, '带参进入的部门名称')
      this.organizeName = e
    },
    recommendList(e) {
      this.tableList = []
      e.forEach((item, index) => {
        this.tableList.push({
          fullName: item.fullName,
          resumeEducation: this.getEducationLabel(item.resumeEducation),
          resumeExperience: this.getExperienceLabel(item.resumeExperience),
          positionName: item.positionName,
          organizeName: item.organizeName,
          resumeJobType: item.resumeJobType,
          recommendReason: item.recommendReason
        })
        if (this.inputText.length < this.recommendList.length) this.inputText.push("")
      })
    },
    recommendVisible(e) {
      this.staffRecommendVisible = e;
      this.getLeaderInfoInit();
    },
    copyTo(e) {
      if (e) {
        let tmpList = e.split(",");
        this.sendInputList = tmpList ? tmpList.map(Number) : [];
      }
    },
    resumeFilter(e) {
      if (e) {
        let tmpList = e.split(",");
        this.insideRemindList = tmpList ? tmpList.map(Number) : [];
      }
    },
  },
  mounted() {
    this.getLeaderInfoInit();
    this.getAllOrgInfo();
  },
  methods: {
    KeyDownCode(e) {
      if (this.inputText.length > 50) {
        this.$message.warning('推荐原因最多50个字！')
        this.inputText = this.inputText.slice(0, 50)
        e.target.value = this.inputText
        console.log(this.inputText)
      }
    },
    inputDataChange(val) {
      this.inputText = val.target.value
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
        val.forEach(item => {
          let obj = {};
          obj.key = item.orgId
          obj.value = item.orgId
          obj.title = item.orgName
          if (item.children.length >= 1) {
            obj.children = this.tmpListInit(item.children);
          }
          arr.push(obj);
        });
      }
      return arr;
    },
    selectOrgansize(value) {
      console.log(value);
      getCompanyList(value).then((res) => {
        let newList = res.data.data.orgList;
        newList.map((item) => {
          item.orgId = item.falseId;
          item.type = 1;
        });
        newList = JSON.parse(
          JSON.stringify(newList).replace(/customName/g, "orgName")
        );
        const arr = this.treeFilter(newList, (node) => node.type == 1);
        this.departmentList = arr;
      });
    },
     handleCompanyInfoChange(val) {
      this.companyInfo = val;
    },
    selectCompany(e) {
      this.companyId = e;
      console.log(this.companyId);
      getComponyInfo({ customId: e }).then((res) => {
        if (res.data.code == 0) {
          let newTmp = this.tmpListInit(res.data.data.orgList);
          this.companyInfoList = newTmp;
        } else {
          this.companyInfoList = [];
        }
      });
    },
    // 新增面试官
    showIntervier() {
      this.intervierName = "";
      this.intervierMail = "";
      this.IsShowIntervier = !this.IsShowIntervier;
    },
    // 确定
    sureIntervier() {
      if (this.companyId == null) {
        this.$message.error("请选择公司");
        return;
      }
      if (this.companyInfo==''||this.companyInfo==undefined) {
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
    // 取消
    cancelIntervier() {
      this.IsShowIntervier = false;
      this.companyInfo = ""
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
          this.companyInfo = ""
          this.getLeaderInfoInit();
        } else {
          this.$message.error(res.data.mesg);
        }
      });
    },
    handleClose() {
      this.$emit("update:recommendVisible", false);
      setTimeout(() => { // 关闭和才恢复原数据
        this.delRecommendList.forEach(item => {
          this.recommendList.push(item)
        })
        this.delRecommendList = []
        
      }, 200);
      console.log(this.inputText, '输入框的内容')
      this.inputText.forEach((_, index) => {
        this.inputText[index] = ''
      })
      this.IsShowIntervier = false;
    },
    async getLeaderInfoInit() {
      try {
        const res = await getLeaderInfo();
        if (res.data.code == 0) {
          this.organizeList = res.data.data;
          let newTmpList = [];
          let newInsideReindList = [];
          newTmpList = this.organizeList.filter((item) => {
            return this.sendInputList.indexOf(item.userId) !== -1;
          });
          newInsideReindList = this.organizeList.filter((item) => {
            return this.insideRemindList.indexOf(item.userId) !== -1;
          });
          this.optionOrgList = [
            ...new Set([...newTmpList, ...newInsideReindList]),
          ];
        }
      } catch {
        console.log(res);
      }
    },
    handleReceivesBlur() {
      this.optionOrgList = this.organizeList.slice(0, 100);
    },
    handleReceivesFocus() {
      this.optionOrgList = this.organizeList.slice(0, 100);
    },
    handleReceivesSearch(e) {
      this.searchUserValue(e);
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    searchUserValue(value) {
      let optionOrgList_ = this.organizeList.filter(
        (item) => item.mail.indexOf(value) > -1||item.userName.indexOf(value)>-1
      );
      if (optionOrgList_.length > 100 || value === "") {
        optionOrgList_ = optionOrgList_.slice(0, 100);
      }
      this.$nextTick(() => {
        this.optionOrgList = optionOrgList_;
      });
    },
    //删除某一项
    delClick(item, index) {
      console.log(this.recommendList, "this.recommendList");
      this.delRecommendList.push(this.recommendList[index])
      console.log(this.delRecommendList, "this.delRecommendList");
      this.recommendList.splice(index, 1);
    },
    handleSubmit(e) {
      this.staffForm.validateFields((err, values) => {
        if (!err) {
          // this.recommendList.demandId = this.demandId;

          // Object.assign(...this.recommendList,this.demandId);
          // console.log(this.recommendList,'this.recommendList')
          let newTmpList = this.recommendList;

          let newList = [];
          newTmpList.map((item, index) => {
            let obj = {};
            obj.fullName = item.fullName;
            obj.talentId = item.talentId;
            obj.recommendReason = this.inputText[index];
            obj.resumeId = item.resumeId;
            obj.resumeMail = item.resumeMail;
            obj.demandId = Number(this.demandId);
            newList.push(obj);
          });
          recommendTalent({
            subject: values.subject, // 邮件主题
            tags: newList,
            receives: values.receives, // 收件人
            copytos: values.sendInputEmail, // 抄送
          }).then((res) => {
            this.$emit("recruit-action", 3);
            this.$emit("update:recommendVisible", false);
            this.$emit("update:primaryPassShow", true);
            if (res.data.code == 0) {
              this.$message.success(res.data.data);
              this.inputText.forEach((_, index) => {
                this.inputText[index] = ''
              })
              this.IsShowIntervier = false;
            } else {
              this.$message.error(res.data.mesg);
            }
          });
        }
      });
    },
  },
};
</script>

<style scoped>
.recommend {
  background: #fff;
  padding: 22px;
  min-height: 100%;
}
.recommend-head {
  padding-top: 6px;
}
.recommend >>> .ant-input {
  font-size: 12px;
}
.icon {
  position: absolute;
  top: 95px;
  right: 6%;
}
.add-intervier {
  margin-top: -15px;
  height: 56px;
  line-height: 56px;
  background: #f8fafc;
}
</style>
<style scoped>
table {
    border-collapse: collapse;
    letter-spacing: 1px;
    font-size: 0.8rem;
    border-spacing: 0;
    /* border: 1px solid #eee; */
    width: 100%;
  }
  
  td, th {
    /* width: 10%; */
    border: 1px solid #eee;
    padding: 10px;
    line-height: 20px;
  }
  
  th {
    background-color: rgb(250, 250, 250);
    /* color: rgb(160, 160, 160); */
  }
  #input {
    transition: all .5s;
  }
  #input:focus {
    outline: 1px solid rgb(60, 153, 240);
    box-shadow: 0 0 5px rgb(60, 153, 240);
  }
  
  tr:nth-child(even) td {
    /* background-color: rgb(250,250,250); */
  }
  
  tr:nth-child(odd) td {
    /* background-color: rgb(245,245,245); */
  }
</style>

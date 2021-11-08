<template>
  <div class="container">
    <div class="header">
      <h5 class="title">上传简历</h5>
    </div>
    <div style="margin-top: 20px">
      <a-upload
        name="file"
        :fileList="fileList"
        multiple
        @preview="handleDown"
        :customRequest="handleUpload"
        :showUploadList="false"
        :supportServerRender="true"
        accept=".doc, .docx, .html, .png, .pdf"
        :onChange="this.handleChange"
        @beforeUpload="this.handleFileSelect"
      >
        <a-button type="primary"> <a-icon type="upload" /> 上传简历 </a-button>
      </a-upload>
      <a-button
        type="primary"
        @click="visibleUpdate = true"
        class="origin"
        :disabled="selectedSuccessRows.length == 0"
        >简历来源</a-button
      >
      <a-button
        type="primary"
        :disabled="selectedSuccessRowsChange"
        @click="showRecruit = true"
        >匹配岗位</a-button
      >
      <a-table
        bordered
        :columns="columns"
        :pagination="false"
        :data-source="tableData"
        :loading="this.loading"
        size="middle"
        style="margin-top: 15px"
        class="zebra"
        :scopedSlots="this.tableScopedSlots"
        :scroll="{ y: screenHeight - 300 }"
        :rowKey="(record,index)=>{return index}"
        :row-selection="{
          selectedRowKeys: selectedRowKeys,
          onChange: this.onSelectChange,
          getCheckboxProps: (record) => ({
            props: {
              disabled: record.status == '-1',
            },
          }),
        }"
      >
        <div slot="status" slot-scope="record, text">
          <!-- <a-badge v-if="record == 1" color="cyan" text="成功" /> -->
          <div v-if="record == 1">
            <span
              style="
                font-size: 14px;
                display: inline-block;
                width: 6px;
                height: 6px;
                border-radius: 50%;
                background: #87d068;
                vertical-align: middle;
                margin-right: 5px;
                margin-top: -2px;
              "
            ></span
            >成功<span v-if="text.results">({{ text.results }})</span>
          </div>
          <div v-if="record == 0 || record == -1">
            <div
              style="
                font-size: 14px;
                display: inline-block;
                width: 6px;
                height: 6px;
                border-radius: 50%;
                background: #fa541c;
                vertical-align: middle;
                margin-right: 5px;
                margin-top: -2px;
              "
            ></div>
            失败({{ text.msg }})
            <div v-if="text.results">
              <span
                style="
                  font-size: 14px;
                  display: inline-block;
                  width: 6px;
                  height: 6px;
                  border-radius: 50%;
                  background: rgb(20, 120, 227);
                  vertical-align: middle;
                  margin-right: 5px;
                  margin-top: -2px;
                "
              ></span
              >{{ text.results }}
            </div>
          </div>
        </div>
        <!-- <span slot="souceName" slot-scope="record, text" >
         <span v-if="text.souceName">{{souceNameCode(souceName)}}</span>
          
        </span> -->
        <template v-slot:action="resumeId">
          <span
            class="action-button"
            @click="toExportDeail(resumeId.data.resumeId)"
            >查看</span
          >
        </template>
      </a-table>
    </div>
    <a-modal
      centered
      v-model="visibleUpdate"
      title="选择简历来源"
      width="450px"
      destroyOnClose
      @ok="handleSubmitNew"
      @cancel="handleCancel"
    >
      <a-radio-group @change="handleRadioChange" :value="radioValue">
        <a-row>
          <a-col
            v-for="(v, index) in setupList"
            :key="index"
            :span="6"
            style="margin-bottom: 30px"
          >
            <a-radio :value="v.setupCode">
              {{ v.setupContent }}
            </a-radio>
          </a-col>
          <!-- {
							this.setupList.map(v => {
								return (
									<a-col :span="6" style="margin-bottom:30px">
										<a-radio :value="v.setupCode">
											{{v.setupContent}}
										</a-radio>
									</a-col>
								)
							})
						} -->
        </a-row>
      </a-radio-group>
    </a-modal>
    <RecruitContent
      :show.sync="showRecruit"
      :resumeIds="resumeIds"
      :selectedRowKeys="selectedRowKeys"
    />
    <ResumeUploadDisplay
      :info="info"
      :disableEdit="viewOnly"
      @refresh-resume="fetchResume"
      :id="resumeUploadDisplayId"
      :show.sync="isResumeUploadDisplay"
    />
    <!-- {...{on: {'update:show': (e)=>this.isResumeUploadDisplay = e}}} -->
  </div>
</template>
<script>
// import { Upload, a-button, Icon, a-tooltip,Modal,Select,Table,Tag,Divider,Radio,Row,Col,Input } from "ant-design-vue";
import {
  uploadResume,
  associateResume,
  saveResumeSource,
} from "@/api/talentCenter";
import { addSource } from "@/api/settings";
import { getSetup } from "@api/department/operation";
import RecruitContent from "../profileDetail/attachmentManagement/RecruitContent";
import ResumeUploadDisplay from "./ResumeUploadDisplay";
import throttle from "lodash-es/throttle";
import { getResumeById } from "@/api/talentCenter";
const columns = [
  {
    title: "简历名称",
    dataIndex: "filename",
    key: "filename",
  },
  {
    title: "解析结果",
    key: "status",
    dataIndex: "status",
    width: 300,
    scopedSlots: { customRender: "status" },
  },
  {
    title: "简历来源",
    key: "souceName",
    dataIndex: "souceName",
    scopedSlots: { customRender: "souceName" },
  },
  {
    title: "操作",
    key: "action",
    scopedSlots: { customRender: "action" },
    align: "center",
  },
];
export default {
  name: "ResumeUpload",
  props: {
    viewOnly: Boolean,
  },
  components: {
    ResumeUploadDisplay,
    RecruitContent,
  },
  data() {
    return {
      fileList: [],
      isAssociating: false,
      visibleUpdate: false,
      setupList: [],
      updataValue: "",
      updataName: "",
      selectName: "",
      selectValue: "",
      columns,
      tableData: [],
      selectedRowKeys: [],
      selectedSuccessRows: [],
      resumeIds: [],
      radioValue: undefined,
      loading: false,
      isShowOrigin: false,
      inputOrigin: "",
      showRecruit: false,
      resumeUploadDisplayId: "",
      isResumeUploadDisplay: false,
      info: null,
      screenHeight: document.documentElement.clientHeight,
      selectedSuccessRowsChange: true,
    };
  },
  computed: {
    shouldUploadDisabled() {
      if (this.fileList.length === 0) {
        return true;
      } else {
        return this.fileList.some((file) => file.status === "uploading");
      }
    },
  },
  mounted() {
    console.log(this.$route.query);
    this.getSetupInit();
    window.onresize = function () {
      // 定义窗口大小变更通知事件
      this.screenHeight = document.documentElement.clientHeight; // 窗口高度
    };
  },
  methods: {
    sourceNameCode(val) {
      let content = this.setupList.filter((v) => {
        return v.setupCode == val;
      });
      if (content.length) {
        return content[0].setupContent;
      }
    },
    tableScopedSlots() {},
    async fetchResume() {
      try {
        const res = await getResumeById(this.resumeUploadDisplayId);
        if (res.status === 200) {
          if (res.data.code === 0) {
            this.info = res.data.data;
          } else {
            onError();
          }
        }
      } catch (err) {
        onError();
      }
    },
    // getRouteQueryList() {
    //   console.log('调用了')
    //   let list = []
    //   let temp = Object.getOwnPropertyNames(this.$route.query);
    //   if (temp.length === 0) return list
    //   this.$route.query.map(val => {
    //     console.log(val, '循环输出')
    //     list.push(val)
    //   })
    //   return list
    // },
    async handleUpload({ file, onSuccess, onError, ...props }) {
      try {
        const res = await uploadResume(file);
        
        let temp = []
        if (!Array.isArray(this.$route.query)) {
          let ObjectMessage = Object.keys(this.$route.query);
          if (ObjectMessage.length === 0) {
            temp = []
          } else {
            ObjectMessage.forEach(key => {
              temp.push(Number(this.$route.query[key]))
            })
          }
        } else {
          temp = this.$route.query 
        }
        
        if (res.status === 200) {
          if (res.data.code === 0) {
            onSuccess(res.data.data.importId);
            // 解析
            this.loading = true;
            associateResume(
              [{ ids: res.data.data.importId }],
              temp
            ).then((res) => {
              this.loading = false;
              if (res.status === 200) {
                this.tableData.push(res.data.data);
                console.log("表格数据=>", this.tableData);
              } else {
                // this.$message.error("简历解析失败", 2);
              }
            });
          } else {
            this.$message.error("简历上传失败", 2);
            onError();
          }
        } else {
          onError();
        }
      } catch (error) {
        onError();
      }
    },
    handleChange({ fileList, ...props }) {
      // console.log(fileList)
      if (fileList.length <= 5) {
        this.fileList = [...fileList];
      }
    },
    handleFileSelect(file) {
      const throttledSizeWarning = throttle(
        () => {
          this.$message.warning("上传的简历大小最多支持10M", 2);
        },
        1000,
        { trailing: false }
      );
      const throttledLengthWarning = throttle(
        () => {
          this.$message.warning("当前支持最多五份简历同时解析绑定", 2);
        },
        1000,
        { trailing: false }
      );
      // 如果文件大小大于等于10M，则阻止上传
      if (file.size >= 10485760) {
        throttledSizeWarning();
        return false;
      }
      if (this.fileList.length >= 5) {
        throttledLengthWarning();
        return false;
      }
    },
    async getSetupInit() {
      try {
        const res = await getSetup({
          setupType: 2,
        });
        this.setupList = res.data.data.setupList;
      } catch (error) {}
    },
    handleDown(e) {
      // console.log(e)
      this.visibleUpdate = true;
      this.updataName = e.name;
      this.updataValue = e.response;
    },
    handleUpSelect(e, value) {
      this.selectValue = e;
      this.selectName = value.key;
    },
    handleSubmit(e) {
      let newList = this.fileList;
      newList.map((item) => {
        if (item.response === this.updataValue) {
          item.name = item.name + "---" + this.selectName;
          let tmeUpdata = item.name.split("---");
          if (tmeUpdata.length > 2) {
            let newList = tmeUpdata.splice(1, 1);
            item.name = tmeUpdata[0] + "---" + tmeUpdata[1];
          }
          item.talentSourceId = this.selectValue;
        }
      });
      this.visibleUpdate = false;
    },
    handleSubmitNew() {
      if (this.radioValue || this.inputOrigin) {
        if (this.inputOrigin) {
          this.handleAddSource();
        } else {
          let newLists = [];
          this.selectedSuccessRows.forEach((item) => {
            let obj = {};
            obj.ids = item.data.resumeId;
            obj.talentSourceId = this.radioValue;
            newLists.push(obj);
          });
          console.log(newLists, "newLists");
          saveResumeSource(newLists).then((res) => {
            console.log(res);
            if (res.data.code == 0) {
              this.$message.success(res.data.data, 2);
              this.visibleUpdate = false;
              this.selectedRows = [];
              // 简历来源回显
              console.log(this.tableData, "this.tableData");
              this.tableData.forEach((v) => {
                console.log(this.resumeIds, v.data.resumeId, "v.data.resumeId");
                if (v.data && this.resumeIds.includes(v.data.resumeId)) {
                  v.souceName = this.sourceNameCode(this.radioValue);
                  //   this.sourceNameCode(v.souceName)
                  console.log(v.souceName, "sourceName");
                }
              });
            }
          });
          // .catch(err => {
          // 	this.$message.error("添加简历来源失败",2)
          // })
        }
      } else {
        this.$message.error("请选择简历来源", 2);
      }
    },
    handleCancel() {
      this.visibleUpdate = false;
    },
    toExportDeail(e) {
      this.resumeUploadDisplayId = e;
      this.isResumeUploadDisplay = true;
      this.fetchResume();
      // let newRouter = this.$router.resolve({path: '/talent-center/profile/detail', query: {id: e}});
      // window.open(newRouter.href,'_blank')
    },
    async handleAssociate() {
      try {
        let newList = [];
        this.fileList.map((item) => {
          let obj = {};
          obj.ids = item.response;
          obj.talentSourceId = item.talentSourceId;
          newList.push(obj);
        });
        const noData = newList.some((item) => item.talentSourceId);
        if (!noData) {
          this.$message.warning("存在简历未选择来源");
          return false;
        }
        this.isAssociating = true;
        const res = await associateResume(newList);
        this.isAssociating = false;
        if (res.status === 200) {
          const code = res.data.data.parseuuid;
          this.fileList = [];
          this.$success({
            width: "auto",
            title: "简历关联结果",
            content: () => (
              <p class={this.$style.codeContainer}>
                <span class={this.$style.codeTitle}>查询编码</span>
                <span class={this.$style.codeContent}>{code}</span>
                <a-tooltip title="复制编码">
                  <a-button
                    class={this.$style.codeCopya - button}
                    shape="round"
                    icon="copy"
                    onClick={() => {
                      // const code = res.data.data.parseuuid;
                      const el = document.createElement("textarea");
                      el.value = code;
                      el.setAttribute("readonly", "");
                      el.style.position = "absolute";
                      el.style.left = "-9999px";
                      document.body.appendChild(el);
                      el.select();
                      document.execCommand("copy");
                      document.body.removeChild(el);
                      this.$message.success("已复制到剪切板", 1.5);
                    }}
                  />
                </a-tooltip>
              </p>
            ),
            centered: true,
            closable: true,
            maskClosable: true,
            okText: "查看",
            onOk: () => {
              this.toExportDeail(code);
            },
          });
        }
      } catch (error) {
        this.isAssociating = false;
      }
    },
    async handleAddSource() {
      try {
        const response = await addSource(this.inputOrigin, 2);
        if (response.status === 200) {
          if (response.data.code === 0) {
            this.getSetupInit();
          } else {
            this.$message.error(response.data.mesg || "添加来源渠道失败", 2);
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      // this.resumeIds = [];
      // if (this.$route.query.length > 0) {
      //   this.selectedSuccessRowsChange = true;
      // } else {
      if (selectedRows.length > 0) {
        selectedRows.map((i) => {
          // console.log(i)
          this.resumeIds.push(i.data.resumeId);
          if (i.status == 0 || i.status == 1) {
            this.selectedSuccessRowsChange = false;
          }
        });
      } else {
        this.selectedSuccessRowsChange = true;
        this.resumeIds = [];
      }
      // }
      this.selectedRowKeys = selectedRowKeys;
      this.selectedSuccessRows = selectedRows.filter((v) => {
        return v.status == 1;
      });
      // this.resumeIds = [];
      // this.selectedSuccessRows.forEach((v) => {
      //   this.resumeIds.push(v.data.resumeId);
      // });
      // console.log(this.resumeIds);
    },
    addOrigin() {
      this.isShowOrigin = true;
      this.radioValue = undefined;
    },
    handleRadioChange(e) {
      this.radioValue = e.target.value;
      this.isShowOrigin = false;
      this.inputOrigin = "";
    },
    inputOriginChange(e) {
      this.inputOrigin = e.target.value;
    },
    getSouceName(id) {
      this.setupList.forEach((v) => {
        if (v.setupCode == id) {
          return v.setupContent;
        }
      });
    },
  },
};
</script>

<style scoped>
.origin {
  /* background-color: #22b8cf;
  color: #fff;
  border: 1px solid #22b8cf; */
  margin-right: 10px;
  margin-left: 10px;
}
/* .origin:hover {
  background-color: #22b8cf;
  border: 1px solid #22b8cf;
}
.origin:focus {
  background-color: #22b8cf;
  border: 1px solid #22b8cf;
} */
.container {
  display: block;
  padding: 20px;
  background-color: #fff;
  height: 100%;
  position: relative;
}

.header {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  /* margin-bottom: 48px; */
}

.uploadArea {
  display: block;
  width: 248px;
  height: 138px;
  margin: 0 auto;
}
.uploadArea:hover.uploadArea
  :global
  .ant-upload.ant-upload-drag
  .ant-upload-hint {
  display: block;
}
.uploadSelect {
  width: 230px;
}
/* .uploadArea :global .ant-upload.ant-upload-drag,
.uploadArea :global .ant-upload-list.ant-upload-list-text {
	width: 463px;
	height: 204px;
	margin: auto;
}

.uploadArea :global .ant-upload-list.ant-upload-list-text {
	height: calc(100% - 204px - 92px - 20px);
	overflow: auto;
} */

.uploadArea :global .ant-upload.ant-upload-btn {
  padding: 20px 0;
}

.uploadArea :global .ant-upload.ant-upload-drag .ant-upload-text {
  font-size: 14px;
  font-weight: bold;
}
.uploadArea :global .ant-upload-list-item-info {
  cursor: pointer;
}

.uploadArea :global .ant-upload.ant-upload-drag .ant-upload-hint {
  font-size: 12px;
  color: #999;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: -335px;
  display: none;
}

.title {
  color: #888;
  font-size: 1.1rem;
}

.codeContainer {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  margin-bottom: 0;
}

.codeTitle {
  flex-basis: auto;
  flex-shrink: 0;
  flex-grow: 0;
  margin-right: 8px;
}

.codeContent {
  flex: 1;
  background-color: #eee;
  padding: 2px 8px;
  border-radius: 2px;
}

.codeCopya-button {
  margin-left: 8px;
}
.action-button {
  cursor: pointer;
  color: #4480ee;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

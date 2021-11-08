<template>
  <div class="dialogContainer">
    <el-dialog
      title="问题分类"
      :visible.sync="remarkShow"
      width="500px"
      :before-close="handleClose"
    >
      <div>
        <div style="margin-bottom: 20px">
          <div>
            <span style="margin-right:10px">是否是为问题岗位:</span>
            <span>
              <el-radio-group v-model="radio" @change="radioChange">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="2">否</el-radio>
              </el-radio-group>
            </span>
          </div>
            <div v-if="problemVisible" class="cascaderBox">
              <el-cascader
              size="medium"
              clearable
              filterable
              :options="Problemoptions"
              :show-all-levels="false"
              @change="problemChange"
            >
            </el-cascader>
            </div>
          <el-input
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 6 }"
            placeholder="详细描述"
            v-model="textareaRemark"
            style="margin-top: 10px"
          >
          </el-input>
        </div>
        <div class="timeLine" v-if="list">
          <el-timeline>
            <el-timeline-item
              v-for="(item, index) in list"
              :key="index"
              size="large"
              icon="el-icon-success"
            >
              <div class="progress-main">
                <span>创建人时间：{{ item.createUserTime }}</span>
                <div>创建人名称： {{ item.createUserName }}</div>
                <div>问题名称：{{ item.problemCategoryName }}</div>
                <div
                  v-text="item.remark ? '备注：' + item.remark : '备注： 暂无'"
                >
                  备注：{{ item.remark }}
                </div>
              </div>
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { addDemandRemark } from "@/api/department/index";
import { Tools } from "@/views/utils/Tools";
export default {
  name: "remark",
  props: ["positionId", "remark", "list"],
  data() {
    return {
      remarkShow: false,
      textareaRemark: "",
      dialogProblem: undefined,
      radio: "",
      Problemoptions: [
        {
          value: "1",
          label: "需求问题",
          children: [
            {
              value: "2",
              label: "需求定位不清晰",
            },
            {
              value: "3",
              label: "薪资与市场不匹配",
            },
            {
              value: "4",
              label: "offer放弃率高",
            },
          ],
        },
        {
          value: "5",
          label: "面试官问题",
          children: [
            {
              value: "6",
              label: "不筛选简历",
            },
            {
              value: "7",
              label: "面试不配合",
            },
            {
              value: "8",
              label: "供应商倾向",
            },
          ],
        },
        {
          value: "9",
          label: "业务问题",
          children: [
            {
              value: "10",
              label: "需求突然关闭",
            },
            {
              value: "11",
              label: "内部审批不通过",
            },
          ],
        },
      ],
      problemVisible: false,
      problemType:""
    };
  },
  watch: {
    remark(e) {
      this.remarkShow = e;
    },
  },
  methods: {
    problemChange(value) {
      this.dialogProblem = value[1]
    },
    radioChange(value) {
      if (value == 1) {
        this.problemVisible = true;
        this.dialogProblem = undefined
      }else{
        this.dialogProblem = 12
        this.problemVisible = false
      }
    },
    handleClose() {
      this.$emit("update:remark", false);
      this.textareaRemark = "";
      this.dialogProblem = undefined;
      this.radio = "";
      this.problemVisible = false
    },
    handleSubmit() {
      if(this.dialogProblem == undefined){
        this.$message.error('请选择问题分类')
      }else{
        addDemandRemark({
          demandId: this.positionId,
          remark: this.textareaRemark,
          problemCategory: this.dialogProblem,
        }).then((res) => {
          if (res.data.code == 0) {
            this.$emit("update:remark", false);
            Tools.success(this, res.data.data);
            this.textareaRemark = "";
            this.dialogProblem = undefined;
            this.problemVisible = false;
            this.radio = ''
          }
        });
      }
      // savePositionRemark({
      //   position_id: this.positionId,
      //   remark: this.textareaRemark
      // }).then(res => {
      //   this.$emit('update:remark', false)
      //   if (res.status_code === 200) {
      //     Tools.success(this, res.data)
      //   }
      // })
    },
  },
};
</script>

<style scoped>
.cascaderBox{
  margin-top: 10px;
}
.progress-main {
  border: 1px solid #f7f8fa;
  border-radius: 4px;
  background: #f7f8fa;
  margin-left: 10px;
  padding: 16px 15px 22px 8px;
}
.progress-main div:nth-child(2) {
  padding: 5px 0;
}
.timeLine {
  overflow: scroll;
  height: 300px;
}
* {
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.34) #fff;
}
*::-webkit-scrollbar {
  width: 5px;
  height: 12px;
}
*::-webkit-scrollbar-track {
  background: #fff;
}
*::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.34);
  border-radius: 6px;
}
</style>

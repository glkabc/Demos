<template>
  <div>
    <a-modal
      title="异常关闭"
      v-model="staffVisible"
      width="50%"
      :destroyOnClose="true"
      @cancel="handleClose"
    >
      <a-card style="width: 100%;margin-bottom:20px">
        <div class="text item">
          <div>职位编号:{{ demandDetail.no }}</div>
          <div>初始需求数:{{ demandDetail.demandNum }}</div>
          <div>已入职:{{ demandDetail.employNum }}</div>
          <div>剩余需求数:{{ demandDetail.zpNum}}</div>
        </div>
      </a-card>
      <a-form :form="staffForm" @submit="handleSubmit">
        <a-row>
          <a-col :span="24">
            <a-form-item
              style="margin-left: -150px"
              label="关闭原因"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 14 }"
              :colon="false"
            >
              <el-select
                v-decorator="[
                  'comments',
                  {
                    rules: [
                      {
                        required: true,
                        message: '请选择关闭原因',
                      },
                    ],
                  },
                ]"
                multiple
                :multiple-limit="multipleLimit"
                placeholder="请选择"
                @change="demandChange"
              >
                <el-option
                  v-for="item in abnormalClose"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item
              v-for="(item, index) in demandTitle"
              :key="index"
              style="margin-left: -150px"
              :label="item.label"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 14 }"
              :colon="false"
              class="form"
            >
               <el-input-number  size="medium" v-model="num" :min="0" :max="waitNums"></el-input-number>
              <!-- <a-input-number
                :min="0"
                :max="waitNums"
                class="close-abnormal"
                v-decorator="[
                  'waitNums',
                  {
                    rules: [
                      {
                        required: true,
                        message: '请输入关闭数量',
                      },
                    ],
                    initialValue: 1,
                  },
                ]"
              /> -->
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item
              label="备注"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 14 }"
              :colon="false"
              style="margin-left: -150px"
            >
              <a-textarea
                v-model="comments"
                placeholder="请填写备注"
                :auto-size="{ minRows: 1, maxRows: 3 }"
              />
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
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("status");
import { abnormalClose } from "@api/department/index";
import {getDemandClose} from "@api/branchHC/index"
export default {
  props: {
    show: Boolean,
    distributionId: [String, Number],
    demandId: [String, Number],
    waitNums: [String, Number],
    demandDetail: {
      type: Object,
    },
  },
  data() {
    return {
      staffForm: this.$form.createForm(this),
      staffVisible: false,
      multipleLimit: 1,
      demandTitle: [],
      demandValue: [],
      fullNum: 0,
      abnormalNum: 0,
      comments: "",
      demandDetails:{},
      num:1
    };
  },
  computed: {
    ...mapState({
      abnormalClose: (state) => state.abnormalClose,
    }),
  },
  watch: {
    show(e) {
      this.staffVisible = e;
    },
  },
  mounted(){
    
  },
  created() {
   
  },
  methods: {
    demandChange(e) {
      if(e.length==0){
        this.num=1
      }
      let arrList = [];
      e.forEach((i) => {
        var j = {};
        j.label = i;
        arrList.push(j);
      });
      this.demandTitle = arrList;
    },
    handleClose() {
      this.$emit("update:show", false);
      this.demandTitle = []
      this.comments = ''
      this.fullNum = 0
      this.abnormalNum = 0
      this.num  = 1
    },
    handleSubmit(e) {
      this.staffForm.validateFields((err, values) => {
        if (!err) {
          this.demandTitle.forEach((i) => {
            if(i.label=='他方满足'){
              this.fullNum = this.num
              this.abnormalNum = 0
            }else if(i.label=="异常关闭"){
              this.abnormalNum = this.num
              this.fullNum = 0
            }
          });
          // console.log(this.fullNum,"他方满足")
          // console.log(this.abnormalNum,"异常关闭")
          abnormalClose({
            demandId: this.demandId,
            fullNum: this.fullNum,
            abnormalNum: this.abnormalNum,
            comments: this.comments,
          }).then((res) => {
            // this.$emit('add-success')
            this.$emit("update:show", false);
            this.demandTitle = []
            this.comments = ''
            this.fullNum = 0
            this.abnormalNum = 0
             this.num = 1
            if (res.data.code == 0) {
              this.$message.success(res.data.data);
              this.$emit("getBranchHCList");
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
.confirm-title {
  font-size: 16px;
  color: #fd5158;
}
.close-abnormal {
  width: 100%;
}
.text {
  display: flex;
}
.text div {
  text-align: center;
  width: 25%;
  font-weight: 600;
}
.text div:nth-of-type(2) {
  width: 20%;
}
.text div:nth-of-type(3) {
  width: 20%;
}
.text div:nth-of-type(4) {
  width: 20%;
}

</style>

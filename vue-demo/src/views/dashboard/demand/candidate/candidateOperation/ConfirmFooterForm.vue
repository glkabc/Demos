<template>
  <div>
    <a-form :form="confirmForm" @submit="handleSubmit">
				<a-row>
					<a-col :span="24" v-if="confirmType == 1">
						<a-form-item label="应聘部门" :colon="false" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
              <a-input disabled	v-decorator="['department',{ initialValue: confirmList[0].OrgName }]" />
						</a-form-item>
					</a-col>
					<a-col :span="24" v-if="confirmType == 1">
						<a-form-item label="上岗日期" :colon="false" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
							<a-date-picker
								allowClear
								style="width: 100%"
								v-decorator="['employmentdate']"
								:disabledDate="disabledDate"
                @change="handleDateClick"
								format="YYYY-MM-DD"
							/>
						</a-form-item>
					</a-col>
					<a-col :span="24" v-if="confirmType == 2">
						<a-form-item label="沟通备注" :colon="false" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
							<a-textarea
								allowClear
								v-decorator="['notes']"
								placeholder="沟通备注"
								:autosize="{ minRows: 6 }"
							/>
						</a-form-item>
					</a-col>
				</a-row>
			</a-form>
  </div>
</template>

<script>
import {
	updateAffirmOffer,
	updateAffirmWork,
	multiGiveUp
} from "@api/candidate/index";
import moment from "moment";
  export default {
    props: ['confirmList','confirmType'],
    data() {
      return {
        confirmForm: this.$form.createForm(this),
        timeValue: ''
      }
    },
    created() {
      console.log(this.confirmList)
      console.log(this.confirmType)
    },
    methods: {
      moment,
      handleDateClick(e, value) {
        this.timeValue = value;
      },
      handleSubmit(e) {
        console.log(e)
        this.confirmForm.validateFields((error, values) => {
          if (!error) {
            let newDate = new Date(this.timeValue).getTime();
            let newList = [];
            let TmpAllList = this.confirmList;
            TmpAllList.map((item) => {
              newList.push(item.talentId);
            });
            switch (this.confirmType) {
              case 1:
                updateAffirmWork({
                  workingDate: newDate,
                  organizeId: this.confirmList[0].organizeId,
                  demandId: this.confirmList[0].demandId,
                  talentId: this.confirmList[0].talentId
                }).then(res => {
                  if (res.data.code == 0) {
                    this.$message.success(res.data.data);
                    this.$emit("recruit-success");
                  } else {
                    this.$message.error(res.data.mesg);
                    this.$emit("recruit-success");
                  }
                })
                break;
              default:
                multiGiveUp({
                  talentIdList: newList,
                  comments: values.notes
                }).then(res => {
                  if (res.data.code == 0) {
                    this.$message.success(res.data.data);
                    this.$emit("recruit-success");
                  } else {
                    this.$message.error(res.data.mesg);
                    this.$emit("recruit-success");
                  }
                })
                break;
            }
          } 
        });
      },
      disabledDate(current) {
        return current && current < moment().endOf("day");
      },
    }
  }
</script>

<style scoped></style>
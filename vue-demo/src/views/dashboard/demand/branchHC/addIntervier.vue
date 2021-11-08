<template>
<div>
    <a-modal  v-model="this.show" width="500px">
      <template slot="footer">
        <a-button key="back" @click="cancel">取消</a-button>
        <a-button
          key="submit"
          style="background: #22B8CF;border: #22B8CF"
          type="primary"
          @click="handleOrganSubmit"
          >确定</a-button
        >
      </template>
      <a-form :form="staffForm" @submit="handleOrganSubmit">
        <a-row>
          <a-col :span="24">
            <a-form-item
              label="成员名称"
              :label-col="{ span: 7 }"
              :wrapper-col="{ span: 14 }"
              :colon="false"
            >
              <a-input
                allowClear
                v-decorator="[
                  'userName',
                  {
                    rules: [
                      {
                        required: true,
                        message: '请输入成员名称'
                      },
                      {
                        pattern: /^[^\s]*$/,
                        message: '禁止输入空格',
                      }
                    ]
                  }
                ]"
              />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item
              label="成员邮箱"
              :label-col="{ span: 7 }"
              :wrapper-col="{ span: 14 }"
              :colon="false"
            >
              <a-input
                allowClear
                v-decorator="[
                  'mail',
                  {
                    rules: [
                      {
                        type: 'email',
                        message: '请输入正确的邮箱！'
                      },
                      {
                        required: true,
                        message: '请输入你的邮箱！'
                      }
                    ]
                  }
                ]"
              />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item
              label="手机号"
              :label-col="{ span: 7 }"
              :wrapper-col="{ span: 14 }"
              :colon="false"
            >
              <a-input
                allowClear
                v-decorator="[
                  'phone',
                  
                ]"
              />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item
              label="组织机构"
              :label-col="{ span: 7 }"
              :wrapper-col="{ span: 14 }"
              :colon="false"
            >
              <a-tree-select
                  allowClear
                  showSearch
                  treeNodeFilterProp="title"
                  placeholder="请选择"
                  treeDefaultExpandAll
                  :treeData="treeData"
                  v-decorator="['orgId',
                  
                ]"
                :dropdownStyle="{ maxHeight: '300px', overflow: 'auto' }"
                >
              </a-tree-select>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>
</div>
</template>
<script>
import {addUserInfo,getStructureList} from "@api/demandBranch/index";
export default {
    props:['show'],
    name:'addIntervier',
    data(){
        return{
            staffForm: this.$form.createForm(this),
            treeData:[]

        }
    },
    mounted(){
        this.getStructureListInit()
    },
    methods:{
        // 获取组织机构
    getStructureListInit() {
      getStructureList({
        customId: this.id
      }).then(res => {
        if(res.data.code == 0) {
          let newTmp = this.tmpListInit(res.data.data.orgList)
          this.treeData = newTmp
        }else {
          this.treeData = []
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
         handleOrganSubmit(e) {
      e.preventDefault();
      this.staffForm.validateFields((err, values) => {
        if (!err) {
            addUserInfo({
              userName: values.userName,
              mail: values.mail,
              phone: values.phone,
              customId: this.id,
              customOrgId: values.orgId
            }).then(res => {
              if(res.data.code == 0) {
                this.$message.success(res.data.data)
              }else {
                this.$message.error(res.data.mesg)
              }
            //   this.staffVisible = false
            this.$emit('update:show',false);
            this.$emit("handleLeader")
            })
        }
      });
    },
    cancel(){
        this.$emit('update:show',false)
    }
    }
}
</script>
<style></style>
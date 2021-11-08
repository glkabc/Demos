<template>
  <div>
     <a-row>
           <a-col
            :span="21"
            :offset="3"
            class="add-intervier"
            v-if="ShowIntervier"
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
     </a-row>
  </div>
</template>

<script>
export default {
   name:'addInterviewer',
   props:['IsShowIntervier'],
   data(){
       return{
          ShowIntervier:false 
       }
   },
   watch:{
    IsShowIntervier(e){
      this.ShowIntervier = e
    }
   }
}
</script>

<style>

</style>
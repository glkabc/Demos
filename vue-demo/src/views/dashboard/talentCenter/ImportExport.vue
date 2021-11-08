<template>
  <div class="import-export">
    <m-header
      style="margin-bottom: 24px"
      :searchTitle.sync="searchTitle"
      :opUserName.sync="opUserName"
      @search="fetchData"
    />
    <a-table
      class="zebra"
      :columns="columns"
      :dataSource="data"
      :pagination="pagination"
      @change="handleTableChange"
      rowKey="importId"
      :loading="isLoading"
      :scroll="{ y: screenHeight - 330 }"
    >
      <template v-slot:info="{ docPreName, isSuccess, resumeId }">
        <span
          class="info_name"
          v-if="isSuccess == 1"
          @click="handleGo(resumeId)"
          >{{ docPreName }}</span
        >
        <span v-else>{{ docPreName }}</span>
      </template>
      <template v-slot:operationUser="operationUser">{{
        operationUser
      }}</template>
      <template v-slot:operationDate="date">{{
        date ? moment(date).format("YYYY-MM-DD") : "暂无"
      }}</template>
      <template v-slot:status="status">
        <span v-if="status == 1"> <a-badge color="#FEAA19" />未处理 </span>
        <span v-if="status == 2">
          <a-badge status="processing" />正在处理
        </span>
        <span v-if="status == 3"> <a-badge color="#22B8CF" />已处理 </span>
      </template>
      <template v-slot:succeed="isSuccess">
        <a-tag v-if="isSuccess == 0" color="blue">失败</a-tag>
        <a-tag v-else-if="isSuccess == 1" color="orange">成功</a-tag>
        <span v-else>--</span>
      </template>
      <template v-slot:action="{ errorMsg }">
        <a @click="handleShowError(errorMsg)">查看上传结果</a>
      </template>
    </a-table>

    <!-- 错误信息 -->
    <a-modal v-model="errorVisible" title="上传结果" :footer="null" centered>
      <p class="error-message">{{ errorMessage }}</p>
    </a-modal>
  </div>
</template>

<script>
import MHeader from "./importExport/Header";
import moment from "moment";
import { getImportExport } from "../../../api/talentCenter";
const columns = [
  {
    title: "文件名称",
    width: "180px",
    scopedSlots: { customRender: "info" },
  },
  {
    title: "操作人",
    dataIndex: "opUserName",
    width: "90px",
    scopedSlots: { customRender: "operationUser" },
  },
  {
    title: "操作时间",
    dataIndex: "opUserTime",
    width: "100px",
    align: "center",
    scopedSlots: { customRender: "operationDate" },
  },
  {
    title: "状态",
    dataIndex: "isDeal",
    width: "100px",
    align: "center",
    scopedSlots: { customRender: "status" },
  },
  {
    title: "是否成功",
    dataIndex: "isSuccess",
    width: "110px",
    align: "center",
    scopedSlots: { customRender: "succeed" },
  },
  {
    title: "操作",
    key: "action",
    width: "120px",
    align: "center",
    scopedSlots: { customRender: "action" },
  },
];
let fromparams = null;
export default {
  name: "ImportExport",
  components: {
    MHeader,
  },
  data() {
    return {
      columns,
      data: [],
      screenHeight: document.documentElement.clientHeight,
      status: "idle",
      searchTitle: "",
      opUserName: "",
      errorVisible: false,
      errorMessage: "",
      pagination: {
        total: 0,
        current: 1,
        pageSizeOptions: ["10", "20", "30", "40"],
        showSizeChanger: true,
        pageSize: 10,
        showTotal: (total) => `共 ${total} 条`,
      },
    };
  },
  computed: {
    isLoading() {
      return this.status === "pending";
    },
  },
  methods: {
    moment,
    handleGo(id) {
      console.log(id);
      this.$router.push({
        path: '/talent-center/profile/detail',
        query: { id: id, current: this.pagination.current },
      });
    },
    handleTableChange({ current, pageSize }) {
      this.pagination.current = current;
      this.pagination.pageSize = pageSize;
      this.fetchData();
    },
    handleShowError(error) {
      this.errorMessage = error;
      this.errorVisible = true;
    },
    async fetchData() {
      console.log(this.opUserName, "opUserName");
      try {
        this.status = "pending";
        const res = await getImportExport({
          title: this.searchTitle,
          opUserName: this.opUserName,
          pageNum: this.pagination.current,
          pageSize: this.pagination.pageSize,
        });
        if (res.status === 200) {
          if (res.data.code === 0) {
            this.status = "resolved";
            this.data = res.data.data.resumeList;
            this.pagination.total = res.data.data.meta.size;
          } else {
            this.status = "rejected";
            this.$message.error(res.data.mesg, 2);
          }
        } else {
          this.status = "rejected";
        }
      } catch (error) {
        this.status = "rejected";
      }
    },
  },
  mounted(){
     this.fetchData();
  },
  created() {
    const id = this.$route.query.id;
    if (id) {
      this.searchTitle = id;
    }
    window.onresize = function () {
      // 定义窗口大小变更通知事件
      this.screenHeight = document.documentElement.clientHeight; // 窗口高度
    };
   
  },
    beforeRouteLeave(to,from,next){
    if(to.path==="/talent-center/profile/detail"){
      if(!from.meta.keepAlive){
        from.meta.keepAlive = true;
      }
      next()
    }else{
      from.meta.keepAlive = false;
      this.$nextTick(()=>{
        this.$destroy()
      })
      next()
    }
  },
  //vue对象中
beforeRouteEnter (to, from, next){
      if(from.path=="/talent-center/profile/detail"){
          if(from.query.current){
            fromparams = from.query.current;
        }
      }else{
        fromparams = 1
      }
      next();
},
beforeMount (){
        if(fromparams){
          this.pagination.current  = fromparams
            // let params = JSON.parse(fromparams);
            //将url上带回的参数赋值给vue中的data对象,从而实现条件的带回
            // this.date  = params.date;
            // this.status = params.status
            // this.page = params.page;
           
        }else{
          this.pagination.current = 1
        }
        console.log(this.pagination.current)
}  , 　
};
</script>

<style scoped>
.import-export {
  background-color: #fff;
  padding: 24px;
  margin-bottom: 24px;
  min-height: 100%;
}
a {
  text-decoration-line: none;
  color: #4480ee;
}
</style>
<style>
.import-export .ant-input-search-icon {
  color: #4480ee;
}
.info_name {
  cursor: pointer;
}
</style>

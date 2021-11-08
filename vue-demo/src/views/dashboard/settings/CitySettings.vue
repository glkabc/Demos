<template>
  <div style="padding: 20px; background-color: #fff; min-height: 100%">
    <div :span="24" class="city-head">
      <div>
        <!-- <a-button
          type="primary"
          style="margin: 0 20px 20px 0;background: #22B8CF;border: #22B8CF"
          @click="handleBackClick()"
        >返回
        </a-button> -->
        <a-button
          type="primary"
          style="margin-bottom: 20px;background: #22B8CF;border: #22B8CF"
          @click="handleUpdateClick(1, {})"
        >
          <a-icon type="plus-circle" />新增面试地点
        </a-button>
      </div>
      <a href="javascript:;" style="padding-right: 10px">
        <span @click="allClick(1)" v-if="!columnsShow">展开全部资源</span>
        <span @click="allClick(2)" v-if="columnsShow">收起全部资源</span>
      </a>
    </div>
    <a-table
			:columns="columns"
			:dataSource="data"
			:pagination="false"
			rowKey="setupId"
			:loading="loading"
			:expandedRowKeys="columnsList"
			@expand="singleClick"
		>
			<span slot="action" slot-scope="item, record">
				<span  v-if="record.children">
          <a @click="handleUpdateClick(3, record)">添加下级</a>
          <a-divider type="vertical" />
        </span>
				<a @click="handleUpdateClick(2, record)">修改</a>
        <a-divider type="vertical" />
				<a style="color: #FD5158" @click="delClick(record)">删除</a>
			</span>
		</a-table>
    <add-form 
      :show.sync="show"
      :type="addType"
      :setupObj="setupObj"
      @add-success="getSetupAddressInit"
    />
  </div>
</template>

<script>
import { getSetupAddress } from "@api/department/operation"
import { deleteSource } from "@api/settings/index"
import AddForm from './cityTemplate/addForm'
const columns = [
	{
		title: "面试地点",
		dataIndex: "setupContent",
		key: "setupContent",
	},
	{
		dataIndex: "action",
		width: "25%",
		key: "action",
    title: "操作",
    align: 'center',
		scopedSlots: { customRender: "action" }
	}
];
  export default {
    components: {
      AddForm
    },
    data() {
      return {
        columns,
        loading: false,
        columnsShow: false,
        columnsList: [],
        data:[],
        show: false,
        addType: 0,
        setupObj: {}
      }
    },
    created(){
      this.getSetupAddressInit()
    },
    methods: {
      async getSetupAddressInit() {
        this.loading = true
        try {
          const res = await getSetupAddress({
            code: 0
          })
          if(res.data.code == 0) {
            this.loading = false
            this.data = res.data.data.addressList
						this.columnsList = this.allListInit(this.data);
          }
          console.log(res)
        }
        catch(error) {
          this.loading = false
          console.log(error)
        }
      },
      // handleBackClick(){
      //   this.$router.go(-1)
      // },
      allListInit(items) {
        let arr = [];
        if (!items) {
          return;
        }
        const getChild = items => {
          for (let i = 0; i < items.length; i++) {
            arr.push(items[i].setupId);
            if (items[i].children && items[i].children.length > 0) {
              getChild(items[i].children);
            }
          }
          this.columnsShow = true;
          return arr;
        };
        return getChild(items);
      },
      singleClick(e, item) {
        if (!e) {
          this.columnsList.forEach((items, index) => {
            if (item.setupId == items) {
              this.columnsList.splice(index, 1);
            }
          });
        } else {
          this.columnsList.push(item.setupId);
        }
      },
      handleUpdateClick(type,e) {
        this.setupObj = {
          parentCode: e.setupCode,
          setupId: e.setupId,
          setupContent: e.setupContent,
        }
        this.addType = type
        this.show = true
      },
      delClick(e){
        this.$confirm({
					title: "删除提醒",
					content: "你确定要删除吗",
					onOk: () => {
						deleteSource(e.setupId).then(res => {
							if (res.data.code == 0) {
								this.$message.success(res.data.data);
							} else {
								this.$message.error(res.data.data);
							}
							this.getSetupAddressInit();
						});
					},
					onCancel() {}
				});
      },
      allClick(type){
        if (type == 1) {
				this.columnsList = this.allListInit(this.data);
				this.columnsShow = true;
			} else {
				this.columnsShow = false;
				this.columnsList = [];
			}
      }
    }
  }
</script>

<style scoped>
.city-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
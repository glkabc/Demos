<template>
  <div class="organsize-contain">
    <div class="organsize-left">
      <p class="title">
        <span
          ><IconFont
            type="icon-bumen"
            style="color: #84919e; font-size: 20px; padding-right: 8px"
          /> </span
        >事业部
      </p>
      <div class="radio-contain">
        <a-radio-group @change="onChangeradio" v-model="statusBlack">
          <a-radio
            style="width: 100%; margin-top: 10px"
            :value="item.sysOrgId"
            v-for="item in primaryDepartList"
            :key="item.sysOrgId"
          >
            {{ item.orgName }}
          </a-radio>
        </a-radio-group>
      </div>
    </div>
    <div class="organsize-right">
      <div class="title-search">
        <span
          ><IconFont
            type="icon-bumen1"
            style="color: #84919e; font-size: 20px; padding-right: 8px"
          />
        </span>
        <span class="">需求部门</span>
        <a-input-search
          v-model="searchStr"
          placeholder="输入搜选项"
          style="width: 60%; margin-left: 25%"
          @search="onSearch"
        ></a-input-search>
      </div>
      <!-- selectedKeys是选中项key的集合，expandedKeys是展开项key的集合 -->
      <div class="tree-contain">
        <a-tree
          v-if="treeData.length > 0"
          v-model="checkedKeys"
          checkable
          :checkedKeys="checkedKeys"
          :treeData="treeData"
          :selectedKeys="selectedKeys"
          :expandedKeys="expandedKeys"
          @expand="onExpand"
          :autoExpandParent="autoExpandParent"
          :replaceFields="replaceFields"
          @select="onSelect"
          @check="onCheck"
        >
          <template slot="title" slot-scope="orgName">
            <span v-if="orgName.indexOf(this.searchStr) > -1">
              <!-- {{ orgName.substr(0, orgName.indexOf(this.searchStr)) }} -->
              <!-- <span style="color: #f50">{{ this.searchStr }}</span> -->
              <!-- {{ orgName.substr(orgName.indexOf(this.searchStr) +this.searchStr.length) }} -->
            </span>
            <span v-else style="color: red">{{ orgName }}</span>
          </template>
        </a-tree>
      </div>
    </div>
  </div>
</template>
<script>
import { getPrimaryDepartment } from "@api/branchHC/index";
import { getDemandList, getStructureList } from "@api/demandBranch/index";
import {
  getCompanyList,
  saveSysLinkCustom,
  deleteSysLinkCustom,
} from "@api/settings/index";
import { IconFont } from "../../../configs/scriptURL";
export default {
  data() {
    return {
      primaryDepartList: [],
      treeData: [],
      replaceFields: {
        title: "orgName",
      },
      expandedKeys: [],
      autoExpandParent: true,
      checkedKeys: [],
      selectedKeys: [],
      newListChildren: [],
      backupsExpandedKeys: [],
      searchValue: "",
      searchStr: "",
      statusBlack: 58,
      checkedKeysAll: [],
      cancelChecked: "",
      deleteChecked: [],
      saveChecked: [],
    };
  },
  components: { IconFont },
  methods: {
    onChangeradio(e) {
      console.log(e.target.value, "e");
      this.checkedKeys = [];
      this.statusBlack = e.target.value;
      this.getDemandList(this.statusBlack);
    },
    async getPrimaryDepartmentInit() {
      const res = await getPrimaryDepartment();
      this.primaryDepartList = res.data.data;
      this.statusBlack = res.data.data[0].sysOrgId;
    },
    getDemandList(id) {
      getCompanyList(id)
        .then((res) => {
          if (res.data.code == 0) {
            let newList = res.data.data.orgList;
            // console.log(newList)
            newList.map((item) => {
              // item.orgId = "1_" + item.customId;
              item.orgId = -(item.customId);
            });
            newList = JSON.parse(
              JSON.stringify(newList)
                .replace(/customName/g, "orgName")
                .replace(/orgId/g, "key")
            );
            this.treeData = newList;
            this.getEachCheck(this.treeData);
          } else {
            this.treeData = [];
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getEachCheck(data) {
      data.map((item) => {
        if (item.children != null && item.children.length > 0) {
          this.getEachCheck(item.children);
        }
        if (item.type == 1) {
          this.checkedKeys.push(item.key);
        }
      });
      return this.checkedKeys;
    },
    onExpand(expandedKeys) {
      if (this.statusBlack == 0) {
        this.$message.error("请先选择事业部");
        return;
      }
      console.log("onExpand", expandedKeys, this.checkedKeys);
      this.expandedKeys = expandedKeys;
      this.autoExpandParent = false;
    },
    onCheck(checkedKeys, e) {
      this.saveChecked = [];
      //  this.checkedKeys=[];
      if (e.checked == true) {
        console.log(checkedKeys, e, "checkedKeys");
        checkedKeys.map((item) => {
          // if (typeof item == "string") {
          //   let temp = -Number(item.split('_')[1])
          //   this.saveChecked.push(temp);
          //   // console.log(this.saveChecked)
          // } else {
            this.saveChecked.push(item);
          // }
        });
        console.log(e.halfCheckedKeys)
        console.log(this.saveChecked, "checkedKeys");
        if (e.halfCheckedKeys.length > 0) {
          let loadDataList = e.halfCheckedKeys.filter(val => {
            if (val < 0) {
              return val
            }
          })
          this.saveChecked = [...this.saveChecked, ...loadDataList] // 将公司ID添加到数据中
        }
        console.log(this.saveChecked, "checkedKeys");
        // console.log(this.checkedKeys)
        //  this.getChildren(e.node.dataRef)
        // if(e.node.dataRef.children!=null && e.node.dataRef.children.length>0){//父级勾选，传子级给后台
        //   console.log(checkedKeys,checkedKeys.indexOf(e.node.dataRef.key),'checkedKeys');
        //   // this.checkedKeysAll = checkedKeys;
        //   checkedKeys=checkedKeys.slice(checkedKeys.indexOf(e.node.dataRef.key)+1);
        // }
        saveSysLinkCustom({
          sysCustomOrgId: this.statusBlack,
          customOrgId: this.saveChecked.toString(),
        }).then((res) => {
          if (res.data.code == 0) {
            this.$message.success("新增成功");
            this.getDemandList(this.statusBlack);
          } else {
            this.$message.error("新增失败");
          }
        });
      } else {
        this.deleteChecked = [];
        checkedKeys.map((item) => {
          // if (typeof item != "string") {
            this.deleteChecked.push(item);
          // }
        });
        console.log(e)
        if (e.halfCheckedKeys.length > 0) {
          let loadDataList = e.halfCheckedKeys.filter(val => {
            if (val < 0) {
              return val
            }
          })
          this.deleteChecked = [...this.deleteChecked, ...loadDataList] // 将公司ID添加到数据中
        }
        console.log(this.deleteChecked, "this.deleteChecked");
        saveSysLinkCustom({
          sysCustomOrgId: this.statusBlack,
          customOrgId: this.deleteChecked.toString(),
        }).then((res) => {
          if (res.data.code == 0) {
            this.$message.success("删除成功");
            this.getDemandList(this.statusBlack);
          } else {
            this.$message.error("删除失败");
          }
        });
      }
    },

    getChildren(data) {
      console.log(data, "data");
      if (typeof data.key == "string") {
        if (data.children.length > 0) {
          data.children.map((item) => {
            this.checkedKeysAll.push(item.key);
            this.getChildren(item.children);
          });
        }
      } else {
        this.checkedKeysAll.push(data.key);
        if (data.children.length > 0) {
          data.children.map((item) => {
            this.checkedKeysAll.push(item.key);
            this.getChildren(item.children);
          });
        }
      }
      return this.checkedKeysAll;
    },

    diffent(fArr, cArr) {
      let fDatas = [];
      let cDatas = [];
      for (let i in fArr) {
        let flg = false;
        for (let j in cArr) {
          if (cArr[j] === fArr[i]) {
            flg = true;
            break;
          }
        }
        if (!flg) {
          fDatas.push(fArr[i]);
        }
      }
      this.cancelChecked = Number(fDatas.toString());
      // console.log(this.cancelChecked)
      return this.cancelChecked;
    },
    onSelect(selectedKeys, info) {
      console.log(info, "onSelect");
      this.selectedKeys = selectedKeys;
    },
    onSearch() {
      var vm = this;
      //添加这行代码是为了只点击搜索才触发
      vm.searchValue = vm.searchStr;
      //如果搜索值为空，则不展开任何项，expandedKeys置为空
      //如果搜索值不位空，则expandedKeys的值要为搜索值的父亲及其所有祖先
      if (vm.searchValue === "") {
        vm.expandedKeys = [];
      } else {
        //首先将展开项与展开项副本置为空
        vm.expandedKeys = [];
        vm.backupsExpandedKeys = [];
        //获取所有存在searchValue的节点
        let candidateKeysList = vm.getkeyList(vm.searchValue, vm.treeData, []);
        //遍历满足条件的所有节点
        candidateKeysList.map((item) => {
          //获取每个节点的母亲节点
          var key = vm.getParentKey(item, vm.treeData);
          //当item是最高一级，父key为undefined，将不放入到数组中
          //如果母亲已存在于数组中，也不放入到数组中
          if (key && !vm.backupsExpandedKeys.some((item) => item === key))
            vm.backupsExpandedKeys.push(key);
        });
        let length = this.backupsExpandedKeys.length;
        for (let i = 0; i < length; i++) {
          vm.getAllParentKey(vm.backupsExpandedKeys[i], vm.treeData);
        }
        vm.expandedKeys = vm.backupsExpandedKeys.slice();
        console.log(vm.backupsExpandedKeys, "vm.expandedKeys");
      }
    },
    //获取节点中含有value的所有key集合
    getkeyList(value, tree, keyList) {
      //遍历所有同一级的树
      for (let i = 0; i < tree.length; i++) {
        let node = tree[i];
        //如果该节点存在value值则push
        if (node.orgName.indexOf(value) > -1) {
          keyList.push(node.key);
        }
        //如果拥有孩子继续遍历
        if (node.children) {
          this.getkeyList(value, node.children, keyList);
        }
      }
      //因为是引用类型，所有每次递归操作的都是同一个数组
      return keyList;
    },
    //该递归主要用于获取key的父亲节点的key值
    getParentKey(key, tree) {
      let parentKey, temp;
      //遍历同级节点
      for (let i = 0; i < tree.length; i++) {
        const node = tree[i];
        if (node.children) {
          //如果该节点的孩子中存在该key值，则该节点就是我们要找的父亲节点
          //如果不存在，继续遍历其子节点
          if (node.children.some((item) => item.key === key)) {
            parentKey = node.key;
          } else if ((temp = this.getParentKey(key, node.children))) {
            //parentKey = this.getParentKey(key,node.children)
            //改进，避免二次遍历
            parentKey = temp;
          }
        }
      }
      return parentKey;
    },
    //获取该节点的所有祖先节点
    getAllParentKey(key, tree) {
      var parentKey;
      if (key) {
        //获得父亲节点
        parentKey = this.getParentKey(key, tree);
        if (parentKey) {
          //如果父亲节点存在，判断是否已经存在于展开列表里，不存在就进行push
          if (!this.backupsExpandedKeys.some((item) => item === parentKey)) {
            this.backupsExpandedKeys.push(parentKey);
          }
          //继续向上查找祖先节点
          this.getAllParentKey(parentKey, tree);
        }
      }
    },
  },
  mounted() {
    this.getPrimaryDepartmentInit();
    this.getDemandList(this.statusBlack);
  },
};
</script>
<style scoped>
.organsize-contain {
  display: flex;
  flex-direction: row;
  justify-content: space;
  flex-wrap: wrap;
  background: #fff;
  height: calc(100% - 5px);
}
.organsize-left {
  flex: 40%;
  margin: 20px;
  background: #f8fafc;
  height: calc(100% - 40px);
  overflow: hidden;
}
.organsize-right {
  flex: 49%;
  margin-left: 1%;
  justify-content: flex-end;
  margin: 20px;
  background: #f8fafc;
  height: calc(100% - 40px);
  overflow: hidden;
}
.title {
  width: 90%;
  margin: 0 auto;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #ccc;
  font-size: 14px;
  color: #84919e;
  font-weight: bold;
}
.radio-contain {
  font-size: 12px;
  margin-left: 20px;
  margin-top: 20px;
  height: calc(100% - 60px);
  overflow: hidden;
  overflow-y: auto;
  width: 90%;
}
.tree-contain {
  font-size: 12px;
  margin-left: 20px;
  margin-top: 20px;
  /* padding-bottom: 20px; */
  height: calc(100% - 60px);
  overflow: hidden;
  overflow-y: auto;
}
.title-search {
  width: 90%;
  margin: 0 auto;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #ccc;
  font-size: 14px;
  color: #84919e;
  font-weight: bold;
}
.ant-list-split .ant-list-item {
  border: none !important;
}
</style>

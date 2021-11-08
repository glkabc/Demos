<template>
  <div class="app-container" ref="formdiv">
    <div class="filter-container">
      <el-form size="mini">
        <el-row :gutter="5">
          <el-col :span="3">
            <el-input
              v-model="listQuery.title"
              clearable
              class="filter-item"
              placeholder="职位名称/编号"
              @keyup.enter.native="handleFilter"
            />
          </el-col>
          <el-col :span="3">
            <el-cascader
              v-model="listQuery.dep_id"
              :show-all-levels="false"
              :options="department_list"
              :props="department_key"
              class="filter-item"
              expand-trigger="click"
              change-on-select
              filterable
              clearable
              placeholder="部门筛选"
              ref="departmentFilter"
              @change="positionChange"
              :append-to-body = 'false'
            />
          </el-col>
          <el-col :span="3">
            <el-cascader
              v-model="listQuery.position_type"
              :show-all-levels="false"
              :options="categoryJobs"
              class="filter-item"
              expand-trigger="click"
              change-on-select
              filterable
              clearable
              placeholder="职位类别"
              ref="positionType"
              @change="positionTypeChange"
              :append-to-body = 'false'
            />
          </el-col>
          <el-col :span="2">
            <el-select
              v-model="listQuery.user_id"
              class="filter-item"
              clearable
              filterable
              placeholder="用户过滤"
              @blur="handleContanctBlur"
              @change="handleFilter"
              :popper-append-to-body="false"
            >
              <el-option
                v-for="item in optionUserList"
                :key="item.userId"
                :label="item.userName"
                :value="item.userId"
              />
            </el-select>
          </el-col>
          <el-col :span="2">
            <el-select
              v-model="listQuery.importance"
              clearable
              class="filter-item"
              placeholder="紧急程度"
              @change="importanceChange"
              :popper-append-to-body="false"
            >
              <el-option
                v-for="item in importanceOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-col>
          <el-col :span="2">
            <el-select
              v-model="listQuery.status"
              clearable
              class="filter-item"
              placeholder="状态"
              :popper-append-to-body="false"
            >
              <el-option label="全部" value="0" />
              <el-option
                v-for="item in statusOptions"
                :key="item.key"
                :label="item.display_name"
                :value="item.key"
              />
            </el-select>
          </el-col>
          <el-col :span="5">
            <el-date-picker
              v-model="listQuery.daterange"
              :picker-options="pickerOptions2"
              style="width: 100%"
              type="daterange"
              align="left"
              unlink-panels
              range-separator="-"
              start-placeholder="职位开始日期"
              end-placeholder="职位结束日期"
              value-format="yyyy-MM-dd"
              @change="firstTimeChange"
              :append-to-body="false"
            />
          </el-col>
          <el-col :span="2">
            <el-button
              style="width: 100%"
              class="filter-item"
              @click="moreFilter = !moreFilter"
            >
              <span v-text="moreFilter ? '-' : '+'" />筛选</el-button
            >
          </el-col>
          <el-col :span="2">
            <el-button
              v-waves
              style="width: 100%"
              class="filter-item"
              type="primary"
              icon="el-icon-search"
              @click="handleFilter"
              >搜索</el-button
            >
          </el-col>
        </el-row>
        <div v-show="moreFilter">
          <el-row :gutter="5">
            <el-col :span="2">
              <el-cascader
                :value="getArryData(cityValue)"
                :multiple="true"
                :show-all-levels="false"
                :options="cityData"
                class="filter-item"
                expand-trigger="click"
                change-on-select
                filterable
                clearable
                placeholder="工作地点筛选"
                @change="handleCityChange"
                :append-to-body = 'false'
              />
            </el-col>
            <!-- <el-col :span="5">
              <el-select
                v-model="listQuery.prov"
                multiple
                filterable
                clearable
                style="width: 400px"
                class="filter-item"
                placeholder="省份过滤"
              >
                <el-option
                  v-for="item in provinces"
                  :key="item.id"
                  :label="item.categoryname"
                  :value="item.id"
                />
              </el-select>
            </el-col> -->
            <el-col :span="2">
              <el-select
                v-model="listQuery.xq_type"
                clearable
                class="filter-item"
                placeholder="需求类别"
                @change="handleFilter"
                :popper-append-to-body="false"
              >
                <el-option
                  v-for="item in xqTypeOptions"
                  :key="item.key"
                  :label="item.display_name"
                  :value="item.key"
                />
              </el-select>
            </el-col>
            <el-col :span="2">
              <el-select
                v-model="listQuery.hr_id"
                filterable
                clearable
                class="filter-item"
                placeholder="招聘负责人"
                @blur="handleContanctBlur"
                @change="handleFilter"
                :popper-append-to-body="false"
              >
                <el-option
                  v-for="item in optionUserList"
                  :key="item.userId"
                  :label="item.userName"
                  :value="item.userId"
                />
              </el-select>
            </el-col>
            <el-col :span="2">
              <el-select
                v-model="listQuery.cooperatorId"
                clearable
                class="filter-item"
                placeholder="协作人"
                filterable
                @blur="handleContanctBlur"
                @change="handleFilter"
                :popper-append-to-body="false"
              >
                <el-option
                  v-for="item in optionUserList"
                  :key="item.userId"
                  :label="item.userName"
                  :value="item.userId"
                />
              </el-select>
            </el-col>
            <el-col :span="5">
              <el-date-picker
                v-model="listQuery.statisDate"
                :picker-options="pickerOptions2"
                style="width: 100%"
                type="daterange"
                align="left"
                unlink-panels
                range-separator="-"
                start-placeholder="统计开始日期"
                end-placeholder="统计结束日期"
                value-format="yyyy-MM-dd"
                @change="timesChange"
                :append-to-body="false"
              />
            </el-col>
            <el-col :span="3">
              <el-cascader
                :options="Problemoptions"
                :props="{ checkStrictly: true }"
                clearable
                placeholder="问题分类"
                @change="problemSearch"
                filterable
                :show-all-levels="false"
                v-model="listQuery.problemCategory"
                ref="problemSearchChange"
                :append-to-body="false"
              ></el-cascader>
              <!-- <el-select
                v-model="listQuery.problemCategory"
                clearable
                class="filter-item"
                placeholder="问题分类"
                filterable
              >
                <el-option
                  v-for="item in ProblemCategory"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select> -->
            </el-col>
          </el-row>
        </div>
        <el-row :gutter="5" style="margin: 10px 0">
          <el-col :span="10">
            <can-i-use code="zpgl-zw-tj">
              <el-button
                class="filter-item"
                type="primary"
                icon="el-icon-edit"
                @click="handleCreate"
                >添加</el-button
              >
            </can-i-use>
            <!-- <can-i-use code="zpgl-zw-dr">
              <el-button
                class="filter-item"
                plain
                icon="el-icon-upload"
                @click="handleUpload()"
                >导入</el-button
              >
            </can-i-use> -->
            <can-i-use code="zpgl-zw-dc">
              <el-button
                class="filter-item"
                plain
                icon="el-icon-download"
                @click="handleDownload()"
                :loading="iconLoading"
                >导出</el-button
              >
            </can-i-use>
            <can-i-use code="zpgl-zw-scjl">
              <el-button
                class="filter-item"
                type="warning"
                plain
                @click="goToResumeUploadPage(0)"
                >上传简历</el-button
              >
            </can-i-use>
            <can-i-use code="zpgl-zw-ppjl">
              <el-button
                class="filter-item"
                type="success"
                plain
                @click="goToResumeSelectPageMulti(0)"
                :disabled="daifabuChange"
                >匹配简历</el-button
              >
            </can-i-use>
          </el-col>
          <can-i-use code="zpgl-zw-xx">
            <el-button
              class="fl"
              type="warning"
              plain
              @click="offLineAll(true)"
              :disabled="xiaxianStatusFlag"
              >下线</el-button
            >
          </can-i-use>
          <can-i-use code="zpgl-zw-sx">
            <el-button
              class="fl"
              type="success"
              plain
              @click="upLineAll(true)"
              :disabled="renewStatusFlag"
              >上线</el-button
            >
          </can-i-use>
          <can-i-use code="zpgl-zw-zt">
            <el-button
              class="fl"
              type="danger"
              plain
              style="margin-right: 5px"
              @click="stopLineAll(false)"
              :disabled="suspendStatusFlag"
              >暂停</el-button
            >
          </can-i-use>
          <can-i-use code="zpgl-zw-qxxzr">
            <el-button
              class="fl"
              style="margin: 0 5px"
              type="primary"
              plain
              @click="clearCooperraters(false)"
              :disabled="clearCooperrater"
              >取消协作人</el-button
            >
          </can-i-use>
          <el-checkbox
            v-model="showNo"
            class="filter-item filter-checkbox"
            @change="tableKey = tableKey + 1"
            >职位编号</el-checkbox
          >
          <el-checkbox
            v-model="showXqNo"
            class="filter-item filter-checkbox"
            @change="tableKey = tableKey + 1"
            >需求编号</el-checkbox
          >
          <el-checkbox
            v-model="showZpType"
            class="filter-item filter-checkbox"
            @change="tableKey = tableKey + 1"
            >职位类别</el-checkbox
          >
          <el-checkbox
            v-model="showPusher"
            class="filter-item filter-checkbox"
            @change="tableKey = tableKey + 1"
            >发布人</el-checkbox
          >
          <el-checkbox
            v-model="showGroup"
            class="filter-item filter-checkbox"
            @change="tableKey = tableKey + 1"
            >事业部</el-checkbox
          >
          <el-checkbox
            v-model="showPushAt"
            class="filter-item filter-checkbox"
            @change="tableKey = tableKey + 1"
            >发布时间</el-checkbox
          >
          <el-checkbox
            v-model="showOutAt"
            class="filter-item filter-checkbox"
            @change="tableKey = tableKey + 1"
            >下线时间</el-checkbox
          >
          <el-checkbox
            v-model="showCreaAt"
            class="filter-item filter-checkbox"
            @change="tableKey = tableKey + 1"
            >创建时间</el-checkbox
          >

          <el-checkbox
            v-model="showProblem"
            class="filter-item filter-checkbox"
            @change="tableKey = tableKey + 1"
            >问题分类</el-checkbox
          >

          <el-checkbox
            v-model="showCustomerName"
            class="filter-item filter-checkbox"
            @change="tableKey = tableKey + 1"
            >客户名称</el-checkbox
          >
          <div class="count fr">
            <span>
              已招: <span>{{ mianshicount.countAll }}人</span> &nbsp;&nbsp;
            </span>
            <span>
              需求: <span>{{ mianshicount.current }}人 </span>&nbsp;&nbsp;
            </span>
            <span>
              满足率:
              <span>
                {{ mianshicount.fillRate }}
              </span>
            </span>
          </div>
        </el-row>
        <el-row :gutter="5">
          <el-col :span="11">
            <el-popover
              placement="left"
              width="230"
              offset="20px"
              class="popover-item"
              v-model="distributeVisible"
            >
              <p>确定将此岗位分配给该人员吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button
                  size="mini"
                  type="text"
                  @click="distributeVisible = false"
                  >取消</el-button
                >
                <el-button type="primary" size="mini" @click="distributeClick"
                  >确定</el-button
                >
              </div>
            </el-popover>
            <can-i-use code="zpgl-zw-zpfzr">
              <el-select
                v-model="listQuery.distribute"
                class="filter-item"
                style="margin-right: 5px"
                filterable
                clearable
                placeholder="招聘负责人"
                @change="distributeChange"
                @clear="distributeVisible = false"
                @blur="handleContanctBlur"
              >
                <el-option
                  v-for="item in optionUserList"
                  :key="item.userId"
                  :label="item.userName"
                  :value="item.userId"
                />
              </el-select>
            </can-i-use>
            <div class="cooper">
              <el-popover
                placement="right"
                width="255"
                offset="200px"
                class="popover-cooper"
                v-model="cooperatorVisible"
              >
                <p>确定将此岗位分配给这些人员吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="handleCooperCancel"
                    >取消</el-button
                  >
                  <el-button type="primary" size="mini" @click="cooperatorClick"
                    >确定</el-button
                  >
                </div>
              </el-popover>
            </div>
            <can-i-use code="zpgl-zw-xzr">
              <el-select
                v-model="listQuery.cooperator"
                class="filter-item filter-name"
                filterable
                clearable
                placeholder="协作人"
                multiple
                @change="handleCooperatorChange"
                @clear="cooperatorVisible = false"
                @blur="handleCooperatorBlur"
                @visible-change="changeValue"
                @focus="handleCooperratorFoucs"
              >
                <el-option
                  v-for="item in optionUserList"
                  :key="item.userId"
                  :label="item.userName"
                  :value="item.userId"
                />
              </el-select>
            </can-i-use>
          </el-col>
          <el-col :span="13" style="text-align: right; padding: 5px" class="fr">
            <el-tag effect="plain"> 推荐数： {{ count.tjzs }} </el-tag>
            <!-- <el-tag effect="plain">
              已推荐数： {{ staticCount.yituijian }}
            </el-tag> -->
            <el-tag effect="plain"> 筛选通过数： {{ count.sxtgzs }} </el-tag>
            <el-tag effect="plain"> 面试数：{{ count.mszs }} </el-tag>
            <el-tag effect="plain"> 面试通过数：{{ count.mstgzs }} </el-tag>
            <el-tag effect="plain"> 待入职数：{{ count.drzzs }} </el-tag>
            <el-tag effect="plain"> 入职数：{{ count.rzzs }} </el-tag>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-table
      :key="tableKey"
      ref="table"
      :data="list"
      style="width: 100%;"
      border
      stripe
      fit
      highlight-current-row
      :height="tableHeight"
      v-loading="listLoading"
      element-loading-text="加载中..."
      @select-all="selectChange"
      @selection-change="selectChange"
      @sort-change="handleSort"
      :row-style="{ height: '20px' }"
      :cell-style="{ padding: '0px' }"
    >
      <el-table-column type="selection" width="40" />
      <!-- <el-table-column
        label="序号"
        width="60"
        :index="indexMethod"
        align="center"
        type="index"
        fixed
      /> -->
      <el-table-column
        label="序号"
        width="60"
        :index="1"
        align="center"
        type="index"
        fixed
      />
      <el-table-column
        fixed
        label="职位名称"
        min-width="140"
        prop="importance"
        sortable="custom"
        :index="indexMethod"
      >
        <template slot-scope="scope">
          <span
            :title="scope.row.positionName"
            class="link-type cut"
            @click="showDetail(scope.row)"
            style="color: rgb(102, 177, 255); font-size: 13px; text-align: left"
          >
            <!-- <el-tag
              v-if="scope.row.xq_type === '0'"
              class="no-border-tag"
              size="mini"
              type="info"
              >预</el-tag
            >
            <el-tag v-else class="no-border-tag" color="#fff" size="mini" type="info"
              >正</el-tag
            > -->
            <el-tag
              :type="scope.row.state | statusFilter"
              class="no-border-tag"
              size="mini"
              >{{ scope.row.state | statusZhFilter }}</el-tag
            >
            <span v-if="scope.row.emergencyLevel == 3">
              <el-tag class="no-border-tag" size="mini" type="danger"
                >!!!</el-tag
              >
            </span>
            <span v-else-if="scope.row.emergencyLevel == 2">
              <el-tag class="no-border-tag" size="mini" type="warning"
                >!!</el-tag
              >
            </span>
            {{ scope.row.positionName }}
          </span>
        </template>
      </el-table-column>
      <el-table-column v-if="showNo" align="center" fixed="left" label="职位编号" width="150">
        <template slot-scope="scope">
          <el-button type="text" @click="showDetail(scope.row)">
            <span :title="scope.row.no">
              {{ scope.row.no }}
            </span>
          </el-button>
          <span @click="handleCopy(scope.row.no)" title="复制职位编号">
            <i class="el-icon-document-copy" />
          </span>
          <span> </span>
        </template>
      </el-table-column>
      <el-table-column v-if="showGroup" width="80" label="事业部">
        <template slot-scope="scope">
          <span :title="scope.row.groupName">
            {{ scope.row.groupName }}
          </span>
        </template>
      </el-table-column>
      <el-table-column v-if="showCustomerName" width="80" label="客户名称">
        <template slot-scope="scope">
          <span :title="scope.row.customName">
            {{ scope.row.customName }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="需求部门" width="180">
        <template slot-scope="scope">
          <span :title="scope.row.organizeName" class="cut">{{
            scope.row.organizeName
          }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="showXqNo" width="150" label="客户需求编号">
        <template slot-scope="scope">
          <span :title="scope.row.externalNum">
            {{ scope.row.externalNum }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="showZpType"
        width="130"
        align="center"
        label="职位类别"
      >
        <template slot-scope="scope">
          <span :title="scope.row.jobTypeName" class="cut">
            {{ scope.row.jobTypeName }}
          </span>
        </template>
      </el-table-column>
      <el-table-column v-if="showPusher" width="80" label="发布人">
        <template slot-scope="scope">
          <span :title="scope.row.releaseUserName">
            {{ scope.row.releaseUserName }}
          </span>
        </template>
      </el-table-column>
      <el-table-column v-if="showPushAt" width="100" label="发布时间">
        <template slot-scope="scope">
          <span :title="scope.row.releaseTime">
            {{ scope.row.releaseTime }}
          </span>
        </template>
      </el-table-column>
      <el-table-column v-if="showOutAt" width="100" label="下线时间">
        <template slot-scope="scope">
          <span :title="scope.row.offlineAtDate">
            {{ scope.row.offlineAtDate }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="showCreaAt"
        width="150"
        align="center"
        label="创建时间"
      >
        <template slot-scope="scope">
          <span :title="scope.row.offlineAtDate">
            {{ scope.row.createUserTime }}
          </span>
        </template>
      </el-table-column>
      <!-- <el-table-column v-if="showGroup" width="80" label="事业部">
        <template slot-scope="scope">
          <span :title="scope.row.groupName">
            {{ scope.row.groupName }}
          </span>
        </template>
      </el-table-column> -->
      <el-table-column v-if="showProblem" width="90" label="问题分类">
        <template slot-scope="scope">
          <span :title="scope.row.problemCategoryName" class="cut">
            {{ scope.row.problemCategoryName }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="工作地点" width="110">
        <template slot-scope="scope">
          <span :title="scope.row.areaCodeName" class="cut">{{
            scope.row.areaCodeName
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="职级" width="50">
        <template slot-scope="scope">
          <span :title="scope.row.level">{{ scope.row.level }}</span>
        </template>
      </el-table-column>
      <el-table-column label="已招/待招" width="100" align="center">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="light" placement="left">
            <div slot="content">
              新简历：{{ scope.row.countJob }}，面试：{{
                scope.row.mianshishu
              }}，录用：{{ scope.row.waitEntry }}，已入职：
              {{ scope.row.entry }}，淘汰：{{ scope.row.getCountOut }}
            </div>
            <span class="link-type cut"
              >{{ scope.row.employNum }}/{{ scope.row.waitNum }}</span
            >
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="招聘负责人" width="100">
        <template slot-scope="scope">
          <span :title="scope.row.specialistName">{{
            scope.row.specialistName
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="协作人" width="80">
        <template slot-scope="scope">
          <span class="cut" :title="scope.row.cooperatorNameList">{{
            scope.row.cooperatorNameList
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="简历筛选人" width="100">
        <template slot-scope="scope">
          <span class="cut" :title="scope.row.resumeFilterName">{{
            scope.row.resumeFilterName
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="初试面试官" width="100">
        <template slot-scope="scope">
          <span class="cut" :title="scope.row.interviewerName">{{
            scope.row.interviewerName
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="reInterviewerName" label="复试面试官" width="100">
      </el-table-column>
      <el-table-column prop="tuijianshu" label="推荐数" width="65">
      </el-table-column>
      <el-table-column
        prop="tongguo"
        label="筛选通过数"
        width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="mianshishu" label="面试" width="60" align="center">
      </el-table-column>
      <el-table-column
        prop="mianshitongguo"
        label="面试通过数"
        width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="waitEntry" label="待入职" align="center">
      </el-table-column>
      <el-table-column prop="entry" label="入职" width="60" align="center">
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="190" align="center">
        <template slot-scope="scope">
          <can-i-use code="zpgl-zw-ckhxr">
            <el-button
              size="small"
              type="primary"
              icon="el-icon-view"
              title="查看候选人"
              circle
              @click="goToResumePage(scope.row)"
            />
          </can-i-use>
          <can-i-use code="zpgl-zw-bj">
            <el-button
              size="small"
              type="warning"
              icon="el-icon-edit"
              title="编辑"
              circle
              @click="handleUpdate(scope.row)"
            />
          </can-i-use>
          <can-i-use code="zpgl-zw-fz">
            <el-button
              size="small"
              type="warning"
              icon="el-icon-document-copy"
              title="复制"
              circle
              @click="handleCopyClick(scope.row)"
            />
          </can-i-use>
          <el-popover placement="left" width="430" trigger="hover">
            <el-button-group>
              <can-i-use code="zpgl-zw-ckbz">
                <el-button
                  size="mini"
                  type="primary"
                  @click="handleViewRemark(scope.row)"
                  >问题分类</el-button
                >
              </can-i-use>
              <can-i-use code="zpgl-zw-sc">
                <el-button
                  size="mini"
                  type="danger"
                  style="margin-left: 10px"
                  @click="handleDelete(scope.row.demandId)"
                  >删除</el-button
                >
              </can-i-use>
              <el-button
                size="mini"
                type="warning"
                style="margin: 0 10px"
                @click="handleViewLog(scope.row.demandId)"
                >操作记录</el-button
              >
              <can-i-use code="zpgl-zw-zd">
                <el-button
                  class="lbshFamily lbsh-zhiding"
                  size="mini"
                  type="primary"
                  v-if="scope.row.isTop == 0 || scope.row.isTop == null"
                  @click="handleTotop(scope.row.demandId)"
                  >置顶</el-button
                >
              </can-i-use>
              <el-button
                class="lbshFamily lbsh-quxiaozhiding"
                size="mini"
                type="info"
                v-if="scope.row.isTop == 1"
                @click="handleNottop(scope.row.demandId)"
                >取消置顶</el-button
              >
              <can-i-use code="zpgl-zw-kf">
                <el-button
                  class="lbshFamily lbsh-zhiding"
                  size="mini"
                  type="info"
                  style="margin-left: 10px"
                  v-if="scope.row.isGlobal == 0 || scope.row.isGlobal == null"
                  @click="handleopen(scope.row.demandId)"
                  >公开</el-button
                >
              </can-i-use>
              <el-button
                class="lbshFamily lbsh-zhiding"
                size="mini"
                type="success"
                style="margin-left: 10px"
                v-if="scope.row.isGlobal == 1"
                @click="handleclose(scope.row.demandId)"
                >关闭</el-button
              >
            </el-button-group>
            <el-button
              slot="reference"
              style="margin-left: 10px"
              size="mini"
              icon="el-icon-plus"
              title="更多操作"
              circle
            />
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <abnormal-close
      :show.sync="abnormalVisible"
      :demandId="demandCloseId"
      :waitNums="waitNums"
      :demandDetail="demandDetails"
      @getBranchHCList="getList"
    />
    <RecruitDetail :show.sync="recruitVisible" :list="detailList" />
    <ConfirmClose
      :updateType="updateType"
      :confirmVisible.sync="staffVisible"
      :demandId="demandConfirmId"
      @getBranchHCList="getList"
    />
    <div class="pagination-container">
      <div>
        <el-pagination
          :current-page="pagination.current"
          :page-sizes="[20, 40, 60, 80]"
          :page-size="pagination.pageSize"
          :total="total"
          style="margin-right: 20px"
          class="fl"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
      <div class="footerBtns">
        <can-i-use code="zpgl-zw-xx">
          <el-button
            size="small"
            class="fl"
            type="warning"
            plain
            @click="offLineAll(true)"
            :disabled="xiaxianStatusFlag"
            >下线</el-button
          >
        </can-i-use>
        <can-i-use code="zpgl-zw-sx">
          <el-button
            size="small"
            class="fl"
            type="success"
            plain
            @click="upLineAll"
            :disabled="renewStatusFlag"
            >上线</el-button
          >
        </can-i-use>
        <can-i-use code="zpgl-zw-zt">
          <el-button
            size="small"
            class="fl"
            type="success"
            plain
            @click="stopLineAll(false)"
            :disabled="suspendStatusFlag"
            >暂停</el-button
          >
        </can-i-use>
      </div>
    </div>
    <div>
      <el-dialog :visible.sync="dialogLogVisible" title="职位操作记录">
      <div v-if="dialogLogVisible">
        <resume-log :oplog="resume_log" :evaluatelog="evaluate" />
      </div>
    </el-dialog>
    </div>
    <remark
      :remark.sync="remarkShow"
      :positionId="positionId"
      :list="remarkList"
    />
  </div>
</template>

<script>
import waves from "@/directive/waves"; // 水波纹指令
import cityData from "@/configs/city_data.js";
import {
  getRecruitJob,
  toTop,
  toOpen,
  delDepartment,
  getRecord,
  mtnCooperator,
  changeSpecialis,
  getSameDemandJob,
  getDemandRemark,
  candelCooperretor,
} from "@/api/department/index";
import { getStructureList } from "@api/demandBranch/index";
import {
  getTreeList,
  offLineAll,
  getDemandClose,
  getOnLineDemand,
  getDemandById,
} from "@api/branchHC/index";
import { getUserInfoList } from "@api/manage/index";
import ResumeLog from "./department/ResumeLog";
import { isMoment } from "moment";
import AbnormalClose from "./branchHC/AbnormalClose";
import ConfirmClose from "./branchHC/ConfirmClose";
import { getSetup, getSelectCooperator } from "@api/department/operation";
import { exportDemandLedger } from "@api/statistical/index";
import download from "@/views/dashboard/statistical/index";
import { Trim } from "../../../trim/trim";
import remark from "./components/remark";
import CanIUse from "@/components/CanIUse.js";
import RecruitDetail from "./department/recruitDetail/RecruitDetail";
// import permission from "@/directive/permission/index.js"
export default {
  name: "Position",
  components: {
    ResumeLog,
    AbnormalClose,
    ConfirmClose,
    remark,
    CanIUse,
    RecruitDetail,
  },
  directives: {
    waves,
    // permission
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: "success",
        2: "danger",
        3: "warning",
        4: "info",
      };
      return statusMap[status];
    },
    statusZhFilter(status) {
      const statusMap = {
        1: "在招",
        2: "下线",
        3: "暂停",
        4: "待发布",
      };
      return statusMap[status];
    },
  },
  data() {
    const validateXqNo = (rule, value, callback) => {
      if (this.temp.xq_type === "1" && !this.temp.no) {
        callback(new Error("正式需求必须输入客户需求编号"));
      } else {
        callback();
      }
    };
    return {
      daifabuChange: false,
      detailList: {}, // 职位详情数据
      recruitVisible: false,
      remarkShow: false,
      code: undefined, // 需求编号
      no: undefined, // 身份证
      demartmentId: undefined, // 需求部门
      specialistid: undefined, // 候选人
      iconLoading: false,
      setupContent: "", //匹配简历数
      updateType: "",
      staffVisible: false,
      demandConfirmId: "",
      xiaxianStatusFlag: true,
      clearCooperrater: true,
      suspendStatusFlag: true,
      renewStatusFlag: true,
      demandDetails: {},
      waitNums: "",
      demandCloseId: "",
      abnormalVisible: false,
      departmentIdList: {},
      optionUserList: [],
      mianshicount: {},
      multipleLimit: 1,
      comments: "",
      xiaxianNum: [],
      fullNum: null,
      dialogLuoboshow: {},
      num: 0,
      ycNum: 0,
      labelPosition: "right",
      tableHeight: 0,
      distributeVisible: false,
      cooperatorVisible: false,
      cooperList: [],
      userId: "",
      evaluate: "",
      positionId: "",
      remarkList: [],
      fullscreen: false,
      interviewSubmitBtn: false,
      dialogDelVisible: false,
      categoryJobs: [],
      dialogDetailVisible: false,
      user_list: [],
      linkmans: [],
      count: {},
      resume_log: [],
      moreFilter: false,
      provinces: [],
      rank_list: [],
      department_list: [],
      department_key: {
        value: "orgId",
        label: "orgName",
      },
      group_list: [
        { id: "1", label: "事业一部" },
        { id: "2", label: "事业二部" },
        { id: "3", label: "事业三部" },
        { id: "4", label: "事业四部" },
        { id: "5", label: "事业五部" },
      ],
      tableKey: 0,
      list: null,
      staticCount: {},
      total: null,
      listLoading: true,
      cityData,
      isShowUpload: false,
      isShowDownload: false,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        status: 1,
        distribute: "",
        cooperator: "",
        sort: "+id",
        city_id: undefined,
        dep_id: undefined,
        position_type: undefined,
        user_id: undefined,
        daterange: undefined,
        statisDate: undefined,
        xq_type: undefined,
        hr_id: undefined,
        problemCategory: undefined,
        cooperatorId: undefined,
      },
      importanceOptions: [
        {
          value: "3",
          label: "特急",
        },
        {
          value: "2",
          label: "紧急",
        },
        {
          value: "1",
          label: "一般",
        },
      ],
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
      xqTypeOptions: [
        { key: "0", display_name: "预需求" },
        { key: "1", display_name: "正式需求" },
      ],
      statusOptions: [
        { key: 1, display_name: "在招" },
        { key: 2, display_name: "下线" },
        { key: 3, display_name: "暂停" },
        { key: 4, display_name: "待发布" },
      ],
      distributeOptions: [],
      statusMap: {
        1: "在招",
        2: "下线",
        3: "暂停",
        4: "待发布",
      },
      showNo: true,
      showXqNo: false,
      showZpType: false,
      showZwType: false,
      showPusher: false,
      showPushAt: false,
      showOutAt: false,
      showCreaAt: false,
      showDistributeAt: false,
      showGroup: false,
      showCustomerName: false,
      showProblem: false,
      multiSelect: [],
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "编辑职位",
        create: "添加职位",
        copy: "复制职位",
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "明天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周后",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一个月后",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 30);
              picker.$emit("pick", date);
            },
          },
        ],
      },
      dialogLogVisible: false,
      dialogPvVisible: false,
      commentVisible: false,
      commentValue: [
        {
          value: "招聘满足",
          label: "招聘满足",
        },
        {
          value: "异常关闭",
          label: "异常关闭",
        },
      ],
      value: [],
      pvData: [],
      rules: {
        department: [{ max: 20, message: "最多20个字符", trigger: "blur" }],
        type: [{ required: true, message: "请选择类别", trigger: "blur" }],
        title: [
          { required: true, message: "请填写职位名称", trigger: "blur" },
          { min: 2, max: 15, message: "请填写2-15个字符", trigger: "blur" },
        ],
        address: [
          { max: 80, message: "最多80个字符", trigger: "blur" },
          { required: true, message: "请填写详细地址", trigger: "blur" },
        ],
        interview_address: [
          { max: 80, message: "最多80个字符", trigger: "blur" },
          { required: true, message: "请填写面试地址" },
        ],
        job_respons: [
          { required: true, message: "请填写职位职责", trigger: "blur" },
          { min: 5, max: 1000, message: "请输入5-1000个字符", trigger: "blur" },
        ],
        comment: [
          {
            required: true,
            message: "请填写招聘人数改动备注",
            trigger: "blur",
          },
          { min: 5, max: 1000, message: "请输入5-1000个字符", trigger: "blur" },
        ],
        remark: [{ max: 200, message: "最多200个字符", trigger: "blur" }],
        expired_at: [
          { required: true, message: "请填写有效期", trigger: "blur" },
        ],
        dep_id: [{ required: true, message: "请选择部门", trigger: "blur" }],
        sifter_list: [{ required: true, message: "请选择至少一个简历筛选人" }],
        interviewer_list: [
          { required: true, message: "请选择至少一个初试面试官" },
        ],
        interviewer2_list: [
          { required: true, message: "请选择至少一个复试面试官" },
        ],
        copy_list: [{ required: true, message: "请选择至少一个抄送人" }],
        rank_id: [
          { required: true, message: "请选择职级职等", trigger: "blur" },
        ],
        xq_no: [{ validator: validateXqNo, trigger: "blur" }],
        group_id: [
          { required: true, message: "请选择请选择事业部", trigger: "blur" },
        ],
        email: [
          { required: true, message: "请填写收件人邮箱" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        name: [
          { required: true, message: "请填写收件人姓名" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
      downloadLoading: false,
      pickerOptions2: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      addReceiveView: false,
      linkman: {
        name: undefined,
        email: undefined,
      },
      statusSelect: 1,
      specialistId: undefined,
      organizeIds: undefined,
      positionName: "",
      keywordValue: "",
      groupValue: undefined,
      jobValue: undefined,
      statusValue: undefined,
      cityValue: [],
      startTime: undefined,
      endTime: undefined,
      taskEnd: undefined,
      taskStart: undefined,
      pagination: {
        current: 1,
        pageSizeOptions: ["20", "30", "40"],
        showSizeChanger: true,
        pageSize: 20,
        total: 0,
        showTotal: (total) => `共 ${total} 条`,
      },
      formListQurey: {},
      copyType: "职位",
    };
  },
  mounted() {
    setTimeout(() => {
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop;
      // this.tableHeight = window.innerHeight - this.$refs.formdiv.clientHeight - 50; // 50为header高度
    }, 100);
  },
  created() {
    let searchDatas = JSON.parse(window.sessionStorage.getItem('search'))
    if (searchDatas != null && searchDatas != undefined) {
      console.log(searchDatas)
      this.listQuery.problemCategory = searchDatas.problemCategory
      this.listQuery.hr_id = searchDatas.specialistId
      this.listQuery.user_id = searchDatas.releaseUserId
      this.listQuery.dep_id = searchDatas.orgIds
      this.listQuery.title = searchDatas.title
      this.keywordValue = searchDatas.no
      this.groupValue = searchDatas.groupId
      this.listQuery.position_type = searchDatas.jobType
      this.listQuery.importance = searchDatas.emergencyLevel
      this.cityValue = searchDatas.areaCode
      this.listQuery.status = searchDatas.state
      this.startTime = searchDatas.dataRangeStart
      this.endTime = searchDatas.dataRangeEnd
      this.taskStart = searchDatas.taskStart
      this.taskEnd = searchDatas.taskEnd
      this.pagination.current = searchDatas.pageNum
      this.pagination.pageSize = searchDatas.pageSize
      this.listQuery.cooperatorId = searchDatas.cooperatorId
      this.listQuery.xq_type = searchDatas.xq_type
      this.listQuery.statisDate = searchDatas.statisDate
      this.listQuery.daterange = searchDatas.daterange
      window.sessionStorage.removeItem('search')

      // setTimeout(()=> {
        // this.pagination.current = 1;
        this.getList()
      // }, 400)
      
      console.log('保存有搜索的数据')
    } else {
      this.getList();
    }
    this.getStructureListInit();
    this.getTreeListInit();
    this.getUserInfoListInit();
    this.getSetupInit();
  },
  watch: {
    remarkShow(value) {
      if (value == false) {
        this.getList();
      }
    },
  },
  methods: {
    // 将字符串形式的数据转换成数组
    getArryData(data) {
      if (typeof(data) === 'string') {
        let temp = data.split(',')
        // console.log(temp)
        let temp1 = []
        for (let i = 0; i < temp.length; i++) {
          let temp3 = Number(temp[i])
          temp1.push(temp3)
        }
        return temp1
      } else {
        return data
      }
    },
    problemSearch(value) {
      this.$nextTick(() => {
        const obj = this.$refs["problemSearchChange"].getCheckedNodes();
        if (obj.length > 0) {
          this.listQuery.problemCategory = obj[0].value;
        } else {
          this.listQuery.problemCategory = undefined;
        }
      });
    },
    //清空协作人
    clearCooperraters() {
      const obj = this.getChange();
      const ids = obj.arr;
      if (ids.length > 1) {
        this.$message.error("只能选择一个职位");
      } else {
        this.$confirm({
          title: "确定取消协作人吗？",
          onOk: () => {
            candelCooperretor({ demandId: ids[0] }).then((res) => {
              if (res.data.code == 0) {
                this.$message.success("操作成功");
                this.getList();
              }
            });
          },
          onCancel() {
            console.log("Cancel");
          },
          class: "test",
        });
      }
      //  candelCooperretor({demandId:})
    },
    // 工作城市
    handleCityChange(e) {
      this.cityValue = e.join(",");
      console.log(this.cityValue);
    },
    // 获取列表
    async getDemandByIdInit(id) {
      try {
        let res = await getDemandById({
          demandId: id,
        });
        console.log(res)
        this.detailList = res.data.data.demand;
      } catch (error) {
        console.log(error);
      }
    },
    async getSetupInit() {
      try {
        const res = await getSetup({
          setupType: 1,
        });
        this.setupContent = res.data.data.setupList[0].setupContent;
      } catch (error) {}
    },
    timesChange(value) {
      if (value) {
        this.startTime = value[0];
        this.endTime = value[1];
      } else {
        this.startTime = undefined;
        this.endTime = undefined;
      }
    },
    firstTimeChange(value) {
      if (value) {
        this.taskStart = value[0];
        this.taskEnd = value[1];
      } else {
        this.taskStart = undefined;
        this.taskEnd = undefined;
      }
    },
    importanceChange(value) {
      if (value === "") {
        this.listQuery.importance = undefined;
      }
    },
    handleContanctBlur() {
      this.optionUserList = this.user_list.slice(0, 100);
    },
    //协作人获取
    handleCooperatorBlur() {
      this.optionUserList = this.user_list.slice(0, 100);
    },
    changeValue(e) {
      console.log(e)
      if(e==true){
         const obj = this.getSelected();
      const ids = obj.arr;
      if (!ids.length) {
        this.$message.warning("请选择职位");
        this.listQuery.cooperator = "";
        return false;
      } else if (ids.length > 1) {
        this.$message.error("只能选择一个职位");
        this.listQuery.cooperator = "";
      } else {
        const demandId = this.departmentIdList.demandId;
        getSelectCooperator({ demandId: demandId }).then((res) => {
          if (res.data.code == 0) {
            const coopList = [];
            res.data.data.coopList.map((i) => {
              coopList.push(i.uid);
            });
            this.listQuery.cooperator = coopList;
          }
        });
      }
      }
     
    },
    indexMethod(index) {
      return index + (this.listQuery.page - 1) * this.listQuery.limit + 1;
    },
    // 开放操作
    handleopen(id) {
      toOpen({
        demandId: id,
        isGlobal: 1,
      }).then((res) => {
        if (res.data.code == 0) {
          this.$message.success("开放成功");
          this.getList();
        }
      });
    },
    // 关闭开放
    handleclose(id) {
      toOpen({
        demandId: id,
        isGlobal: 0,
      }).then((res) => {
        if (res.data.code == 0) {
          this.$message.success("关闭成功");
          this.getList();
        }
      });
    },
    // 置顶操作
    handleTotop(id) {
      toTop({
        demandId: id,
        isTop: 1,
      }).then((res) => {
        if (res.data.code == 0) {
          this.$message.success("置顶成功");
          this.getList();
        }
      });
    },
    // 取消置顶操作
    handleNottop(id) {
      toTop({ demandId: id, isTop: 0 }).then((res) => {
        if (res.data.code == 0) {
          this.$message.success("取消置顶成功");
          this.getList();
        } else {
        }
      });
    },
    //删除操作
    handleDelete(id) {
      this.$confirm({
        title: "确认删除吗",
        onOk: () => {
          delDepartment({ demandId: id }).then((res) => {
            if (res.data.code == 0) {
              this.$message.success("删除成功");
              this.getList();
            }
          });
        },
      });
    },
    // 查看操作记录
    handleViewLog(id) {
      this.dialogLogVisible = true;
      getRecord({ demandId: id }).then((res) => {
        if (res.data.code == 0) {
          this.resume_log = res.data.data;
        }
      });
    },
    // 查看候选人
    goToResumePage(e) {
      console.log(e, "ewert");
      this.showCallbakData()
      this.$router.push({
        name: "MateAction",
        query: {
          // id: e.distributionId,
          organizeName: e.organizeName,
          organizeId: e.organizeId,
          customId: e.customId,
          positionName: e.positionName,
          // demandName: e.demandName,
          demandId: e.demandId,
          interviewer: e.interviewer, //初试
          reInterviewer: e.reInterviewer, //复试
          copyTo: e.copyToList.join(","), //抄送
          resumeFilter: e.resumeFilter, //简历筛选人
          copyType: "职位",
        },
      });
    },
    handleViewRemark(row) {
      this.positionId = row.demandId;
      getDemandRemark({
        demandId: row.demandId,
      }).then((res) => {
        if (res.data.code == 0) {
          this.remarkList = res.data.data.remark;
        }
      });
      this.remarkShow = true;
    },
    // 回调显示数据
    showCallbakData() {
      let searchData = {
        problemCategory: this.listQuery.problemCategory ? this.listQuery.problemCategory : undefined,
        specialistId: this.listQuery.hr_id ? this.listQuery.hr_id : undefined, //招聘负责人
        releaseUserId: this.listQuery.user_id ? this.listQuery.user_id : undefined, //用户过滤
        orgIds: this.listQuery.dep_id ? this.listQuery.dep_id : undefined,
        title: this.listQuery.title ? this.listQuery.title : undefined,
        no: this.keywordValue ? this.keywordValue : undefined,
        groupId: this.groupValue ? this.groupValue : undefined,
        jobType: this.listQuery.position_type ? this.listQuery.position_type : undefined,
        emergencyLevel: this.listQuery.importance ? this.listQuery.importance : undefined,
        areaCode: this.cityValue ? this.cityValue : [],
        state: this.listQuery.status ? this.listQuery.status : undefined,
        dataRangeStart: this.startTime ? this.startTime : undefined,
        dataRangeEnd: this.endTime ? this.endTime : undefined,
        taskStart: this.taskStart ? this.taskStart : undefined,
        taskEnd: this.taskEnd ? this.taskEnd : undefined,
        pageNum: this.pagination.current ? this.pagination.current : undefined,
        pageSize: this.pagination.pageSize ? this.pagination.pageSize : undefined,
        cooperatorId: this.listQuery.cooperatorId ? this.listQuery.cooperatorId : undefined,
        xq_type: this.listQuery.xq_type ? this.listQuery.xq_type : undefined,
        statisDate: this.listQuery.statisDate ? this.listQuery.statisDate : undefined,
        daterange: this.listQuery.daterange ? this.listQuery.daterange : undefined
      }
      window.sessionStorage.removeItem('search')
      window.sessionStorage.setItem('search', JSON.stringify(searchData))
    },
    // 编辑
    handleUpdate(row) {
      this.showCallbakData()
      this.$router.push({
        path: "/department/demandCopyInfoEdit",
        query: {
          demandId: row.demandId,
          copyType: this.copyType,
          status: 1,
        },
      });
    },
    // 复制
    handleCopyClick(row) {
      this.showCallbakData()
      this.$router.push({
        path: "/department/demandCopyInfo",
        query: {
          demandId: row.demandId,
          copyType: this.copyType,
        },
      });
    },
    positionChange(value) {
      this.$nextTick(() => {
        const obj = this.$refs["departmentFilter"].getCheckedNodes();
        if (obj.length > 0) {
          this.listQuery.dep_id = obj[0].value;
        } else {
          this.listQuery.dep_id = undefined;
        }
      });
    },
    positionTypeChange(value) {
      this.$nextTick(() => {
        const obj = this.$refs["positionType"].getCheckedNodes();
        if (obj.length > 0) {
          this.listQuery.position_type = obj[0].value;
        } else {
          this.listQuery.position_type = undefined;
        }
      });
    },
    getTreeData(data) {
      // 循环遍历json数据
      for (var i = 0; i < data.length; i++) {
        if (data[i].children.length < 1) {
          // children若为空数组，则将children设为undefined
          data[i].children = undefined;
        } else {
          // children若不为空数组，则继续 递归调用 本方法
          this.getTreeData(data[i].children);
        }
      }
      return data;
    },
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.pagination.current = val;
      this.getList();
    },
    //上线
    upLineAll() {
      const obj = this.getChange();
      const ids = obj.arr;
      if (!ids.length) {
        this.$message.error("请选择需要操作的职位");
        return false;
      } else {
        this.demandConfirmId = ids;
        this.staffVisible = true;
        this.updateType = 1;
      }
    },
    // 下线
    offLineAll() {
      const obj = this.getSelected();
      const ids = obj.arr;
      if (!ids.length) {
        this.$message.warning("请选择职位");
        this.listQuery.cooperator = "";
        return false;
      } else {
        if (ids.length === 1) {
          this.waitNums = this.departmentIdList.doAbnormalNum;
          this.demandCloseId = this.departmentIdList.demandId;
          getDemandClose({ demandId: this.demandCloseId }).then((res) => {
            if (res.data.code == 0) {
              this.demandDetails.no = res.data.data.no;
              this.demandDetails.demandNum = res.data.data.demandNum;
              this.demandDetails.employNum = res.data.data.employNum;
              this.demandDetails.zpNum = res.data.data.doAbnormalNum;
              this.abnormalVisible = true;
            }
          });
        } else {
          this.$message.error("只能选择一个职位", 2, (onClose) => {
            this.$refs.table.clearSelection();
            this.listQuery.cooperator = "";
          });
        }
      }
    },
    // 暂停
    stopLineAll() {
      const obj = this.getChange();
      const ids = obj.arr;
      if (!ids.length) {
        this.$message.error("请选择需要操作的职位");
        return false;
      } else {
        this.demandConfirmId = ids;
        this.staffVisible = true;
        this.updateType = 3;
      }
    },
    //删除按钮
    deleteAll() {},
    handleFilter() {
      this.pagination.current = 1;
      // console.log(this.specialistId)
      // console.log(this.listQuery.title)
      // console.log(this.listQuery.dep_id)
      // console.log(this.listQuery.orgId)
      // let searchData = {
      //   problemCategory: this.listQuery.problemCategory ? this.listQuery.problemCategory : undefined,
      //   specialistId: this.listQuery.hr_id ? this.listQuery.hr_id : undefined, //招聘负责人
      //   releaseUserId: this.listQuery.user_id ? this.listQuery.user_id : undefined, //用户过滤
      //   orgIds: this.listQuery.dep_id ? this.listQuery.dep_id : undefined,
      //   title: this.listQuery.title ? this.listQuery.title : undefined,
      //   no: this.keywordValue ? this.keywordValue : undefined,
      //   groupId: this.groupValue ? this.groupValue : undefined,
      //   jobType: this.listQuery.position_type ? this.listQuery.position_type : undefined,
      //   emergencyLevel: this.listQuery.importance ? this.listQuery.importance : undefined,
      //   areaCode: this.cityValue ? this.cityValue : undefined,
      //   state: this.listQuery.status ? this.listQuery.status : undefined,
      //   dataRangeStart: this.startTime ? this.startTime : undefined,
      //   dataRangeEnd: this.endTime ? this.endTime : undefined,
      //   taskStart: this.taskStart ? this.taskStart : undefined,
      //   taskEnd: this.taskEnd ? this.taskEnd : undefined,
      //   pageNum: this.pagination.current ? this.pagination.current : undefined,
      //   pageSize: this.pagination.pageSize ? this.pagination.pageSize : undefined,
      //   cooperatorId: this.listQuery.cooperatorId ? this.listQuery.cooperatorId : undefined,
      // }
      // window.sessionStorage.removeItem('search')
      // window.sessionStorage.setItem('search', JSON.stringify(searchData))
      this.getList();
    },
    // 获取职位
    async getTreeListInit() {
      const res = await getTreeList();
      this.categoryJobs = res.data.data;
    },
    // 获取需求部门
    getStructureListInit() {
      getStructureList().then((res) => {
        if (res.data.code == 0) {
          this.department_list = this.getTreeData(res.data.data.orgList);
        } else {
        }
      });
    },
    // 获取系统用户列表
    async getUserInfoListInit() {
      try {
        const res = await getUserInfoList();
        this.user_list = res.data.data.userList.list;
        this.optionUserList = [...this.user_list];
      } catch (error) {}
    },
    selectUser(value) {
      this.specialistId = value;
    },
    async getList() {
      this.listLoading = true;
      try {
        // console.log(this.cityValue + "回传 Num")
        let response = await getRecruitJob({
          problemCategory: this.listQuery.problemCategory,
          specialistId: this.listQuery.hr_id, //招聘负责人
          releaseUserId: this.listQuery.user_id, //用户过滤
          orgIds: this.listQuery.dep_id,
          title: this.listQuery.title,
          no: this.keywordValue,
          groupId: this.groupValue,
          jobType: this.listQuery.position_type,
          emergencyLevel: this.listQuery.importance,
          areaCode: this.cityValue,
          state: this.listQuery.status,
          dataRangeStart: this.startTime,
          dataRangeEnd: this.endTime,
          taskStart: this.taskStart,
          taskEnd: this.taskEnd,
          pageNum: this.pagination.current,
          pageSize: this.pagination.pageSize,
          cooperatorId: this.listQuery.cooperatorId,
        })

        this.list = response.data.data.demandList;
        this.count = response.data.data.data;
        this.mianshicount = response.data.data.count;
        this.listLoading = false;
        this.selectedRowKeys = [];
        this.renewStatusFlag = true;
        this.suspendStatusFlag = true;
        this.pagination.current = response.data.data.meta.pageNum
        // this.staticCount = response.staticCount
        // console.log(this.pagination.current)
        this.total = response.data.data.meta.size;
      } catch (err) {
        Tools.error(this, err.response.data);
      }
      // getRecruitJob({
      //   problemCategory: this.listQuery.problemCategory,
      //   specialistId: this.listQuery.hr_id, //招聘负责人
      //   releaseUserId: this.listQuery.user_id, //用户过滤
      //   orgIds: this.listQuery.dep_id,
      //   title: this.listQuery.title,
      //   no: this.keywordValue,
      //   groupId: this.groupValue,
      //   jobType: this.listQuery.position_type,
      //   emergencyLevel: this.listQuery.importance,
      //   areaCode: this.cityValue,
      //   state: this.listQuery.status,
      //   dataRangeStart: this.startTime,
      //   dataRangeEnd: this.endTime,
      //   taskStart: this.taskStart,
      //   taskEnd: this.taskEnd,
      //   pageNum: this.pagination.current,
      //   pageSize: this.pagination.pageSize,
      //   cooperatorId: this.listQuery.cooperatorId,
      // })
      //   .then((response) => {
      //     this.list = response.data.data.demandList;
      //     this.count = response.data.data.data;
      //     this.mianshicount = response.data.data.count;
      //     this.listLoading = false;
      //     this.selectedRowKeys = [];
      //     this.renewStatusFlag = true;
      //     this.suspendStatusFlag = true;
      //     // this.staticCount = response.staticCount
      //     console.log(response)
      //     this.total = response.data.data.meta.size;
      //     // this.listLoading = false
      //     // if (response.citys) {
      //     //   this.cityData = response.citys
      //     // }
      //     // if (response.count) {
      //     //   this.count = response.count
      //     // }
      //     // // eslint-disable-next-line eqeqeq
      //     // if (!this.listQuery.dep_id || this.listQuery.dep_id.length == 0) {
      //     //   this.cityData = cityData
      //     // }
      //     // // 表单总高度
      //     // const tableHeight = document.getElementsByClassName('el-table')[0].offsetHeight
      //     // // 表头高度
      //     // const headerHeight = document.getElementsByClassName('el-table__header-wrapper')[0].offsetHeight
      //     // // 要等表单渲染完成后才能拿到合计行的高度
      //     // this.$nextTick(() => {
      //     //   // 合计行高度
      //     //   const footerHeight = document.getElementsByClassName('el-table__footer-wrapper')[0].offsetHeight
      //     //   // 设置表单正文高度
      //     //   document.getElementsByClassName('el-table__body-wrapper')[0].style.height = tableHeight - headerHeight - footerHeight + 'px'
      //     // })
      //     // this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop
      //   })
      //   .catch((err) => {
      //     Tools.error(this, err.response.data);
      //     // console.log(err)
      //   });
    },
    handleCreate() {
      this.$router.push({
        name: "DemandInfo",
        query: {
          copyType: this.copyType,
        },
      });
    },
    // handleUpload() {
    //   this.$router.push({ name: "ProfileUpload" });
    // },
    async handleDownload() {
      this.iconLoading = true;
      try {
        const res = await exportDemandLedger({
          no: Trim(this.no), // 萝卜秀编号
          externalNum: Trim(this.code), // 需求编号
          orgId: this.demartmentId, // 需求部门
          specialistId: this.specialistid, // 岗位负责人
          startTime: this.startTime, // 发布开始日期
          endTime: this.endTime, // 发布结束日期
        });
        console.log(res);
        this.iconLoading = false;
        download(res.data, "招聘职位统计表");
      } catch (error) {
        this.iconLoading = false;
        console.log(error);
      }
    },
    //上传简历
    goToResumeUploadPage(id) {
      const obj = this.getChange();
      const ids = obj.arr;
      if (ids.length > this.setupContent) {
        this.$message.error(
          "简历投递不能超过最大并行上限，请合理安排简历投递!",
          () => {
            ids = [];
          }
        );
        return false;
      } else {
        let demandIdList = [];
        if (this.multiSelect) {
          this.multiSelect.map((item) => {
            demandIdList.push(item.demandId);
          });
        }
        this.$router.push({
          name: "ProfileUpload",
          query: demandIdList,
        });
      }
    },
    //匹配简历
    goToResumeSelectPageMulti() {
      const obj = this.getChange();
      const ids = obj.arr;
      if (ids.length == 0) {
        this.$message.error("请选择操作事项！");
      } else if (ids.length > this.setupContent) {
        this.$message.error(
          "简历投递不能超过最大并行上限，请合理安排简历投递!",
          () => {
            ids = [];
          }
        );
        return false;
      } else {
        let tmpNewMateList = this.multiSelect;
        localStorage.setItem("remarkList", JSON.stringify(tmpNewMateList));
        this.$router.push({ name: "MateResume" });
      }
    },
    distributeClick() {
      const obj = this.getChange();
      const ids = obj.arr;
      changeSpecialis({
        demandId: ids,
        specialistId: this.userId,
        remark: "",
      }).then((res) => {
        if (res.data.code == 0) {
          this.$message.success(res.data.data);
          this.getList();
          this.distributeVisible = false;
          this.listQuery.distribute = "";
        }
      });
    },
    distributeChange(e) {
      // console.log(e)
      const obj = this.getSelected();
      const ids = obj.arr;
      // console.log(ids)
      if (!ids.length) {
        this.$message.warning("请选择需要的职位操作");
        this.listQuery.distribute = "";
        return false;
      } else {
        this.userId = e;
        this.distributeVisible = true;
      }
    },
    handleCooperCancel() {
      this.$refs.table.clearSelection();
      this.listQuery.cooperator = "";
      this.cooperatorVisible = false;
    },
    cooperatorClick() {
      mtnCooperator({
        coopList: this.cooperList,
        demandId: this.departmentIdList.demandId,
      }).then((res) => {
        if (res.data.code == 0) {
          this.cooperatorVisible = false;
          this.$message.success("操作成功");
          this.getList();
          this.listQuery.cooperator = "";
        } else {
          this.$message.error(res.data.mesg);
        }
      });
    },
    handleCooperatorChange(e) {
       const obj = this.getSelected();
       const ids = obj.arr;
       if(ids.length==0){
         this.cooperatorVisible = false;
         this.listQuery.cooperator = "";
       }else if(ids.length>1){
         this.cooperatorVisible = false;
         this.listQuery.cooperator = "";
       }
       else{
          this.cooperList = e;
        if (this.listQuery.cooperator.length > 0) {
          this.cooperatorVisible = true;
        } else {
          this.cooperatorVisible = false;
        }
      
       }
        
    },
    getSelected() {
      const arr = [];
      const status = new Set();
      this.multiSelect.forEach((item) => {
        status.add(item.state);
        arr.push(item.createUserId);
      });

      return { arr, status };
    },
    getChange() {
      const arr = [];
      const status = new Set();
      this.multiSelect.forEach((i) => {
        status.add(i.state);
        arr.push(i.demandId);
      });
      return { arr, status };
    },
    handleCooperratorFoucs() {},
    selectChange(selection) {
      console.log(selection)
      if(selection.length==0){
        this.cooperatorVisible = false;
        this.listQuery.cooperator=''
      }
      let id = null;
      selection.forEach((i) => {
        id = i.createUserId;
        this.departmentIdList = i;
      });
      this.multiSelect = selection;
      let newRenewJob = selection;
      if (newRenewJob.length > 0) {
        newRenewJob.map((item) => {
          if (item.state == 2) {
            console.log(item)
            //待发布和暂停可以上线
            this.suspendStatusFlag = true;
            this.renewStatusFlag = true;
            this.xiaxianStatusFlag = true;
            this.daifabuChange = true;
            this.clearCooperrater = true;
          } else if (item.state == 1) {
            //在招可以暂停
            this.suspendStatusFlag = false;
            this.renewStatusFlag = true;
            this.xiaxianStatusFlag = false;
            this.clearCooperrater = false;
          } else if (item.state == 3) {
            this.suspendStatusFlag = true;
            this.renewStatusFlag = false;
            this.xiaxianStatusFlag = false;
            this.daifabuChange = true;
            this.clearCooperrater = false;
          } else if (item.state == 4) {
            this.suspendStatusFlag = true;
            this.renewStatusFlag = false;
            this.xiaxianStatusFlag = false;
            this.daifabuChange = true;
            this.clearCooperrater = false;
          }
        });
      } else {
        this.suspendStatusFlag = true;
        this.renewStatusFlag = true;
        this.xiaxianStatusFlag = true;
        this.daifabuChange = false;
        this.clearCooperrater = true;
      }
    },
    handleSort(col) {
      if (col.order) {
        const order = "ascending";
        // eslint-disable-next-line eqeqeq
        const sort = col.order == order ? "-" : "+";
        this.listQuery.sort = sort + col.prop;
        this.handleFilter();
      }
    },
    showDetail(row) {
      this.recruitVisible = true;
      this.getDemandByIdInit(row.demandId);
    },
    // 表格中的复制
    handleCopy(value) {
      const el = document.createElement("textarea");
      el.value = value;
      el.setAttribute("readonly", "");
      el.style.position = "absolute";
      el.style.left = "-9999px";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      this.$message.success("已复制到剪切板", 1.5);
    },
    handleSelectionChange() {},
  },
};
</script>

<style scoped>
.filter-container {
  padding: 15px;
}
.filter-item {
  display: inline-block;
  vertical-align: middle;
  margin-bottom: 10px;
}
.filter-checkbox {
  width: 60px;
  text-align: left;
}
.fr {
  float: right;
}

.fl {
  float: left;
}

.lock_height {
  height: calc(100vh - 100px);
  overflow: scroll;
}
.pagination-container {
  display: flex;
  margin-top: 20px;
  background: #fff;
  height: 50px;
}
.commentDetail {
  margin-left: 40px;
  font-weight: 600;
  line-height: 45px;
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
.box-card {
  margin-bottom: 20px;
}
.detail-title {
  display: inline-block;
  font-weight: bold;
  width: 120px;
  text-align: right;
}
.detail-item {
  display: inline-block;
  margin-right: 10px;
  min-width: 20%;
}
.detail-textarea {
  margin-top: -15px;
  display: block;
  padding-left: 120px;
  font-size: 13px;
}
.count {
  font-size: 14px;
  color: red;
  padding-top: 20px;
}
.popover-item .el-popover {
  margin-top: 42px;
}
.cooper {
  position: absolute;
  left: 520px;
  top: 5px;
}
.popover-cooper .el-popover {
  margin-left: 500px;
  margin-top: -59px;
}
.lbshFamily {
  font-size: 12px !important;
}
.el-table--border th.gutter:last-of-type {
  display: block !important;
  width: 17px !important;
}
.filter-name {
  width: 286px;
}
.demo-form-input input {
  border: none;
  outline: none;
}
.app-container {
  background: #fff;
  height: 100%;
}
</style>
<template>
	<div class="demand-content-container">
		<a-row class="new-demand-header">
			<a-col :span="24">
				<a-tabs
					type="card"
					:defaultActiveKey="defaultModel"
					@change="handleTabsChange"
				>
					<a-tab-pane v-for="item in tabList" :key="item.key">
						<span slot="tab" class="tab-title">
							<div>{{ item.title }}</div>
						</span>
					</a-tab-pane>
				</a-tabs>
			</a-col>
		</a-row>
		<div class="demand-content">
			<div class="demandsplit">
				<div class="count-box">
					<div class="count-left">
						<img src="../../../../assets/images/need.png" alt="">
						<span class="text">需求总数</span>
						<span class="number">{{ demondtotal }}</span>
					</div>
					<div class="count-right">
						<img src="../../../../assets/images/branch.png" alt="" style="width:48px;height:48px;margin-top:4px">
						<span class="text">待拆分数</span>
						<span class="number">{{ waitSplitNum }}</span>
					</div>
				</div>
				<!-- <span>
					需求总数：
					<span
						style="font-size: 18px;color:#333;font-weight: 500;"
						>{{ demondtotal }}</span
					>
				</span>
				<span style="margin-left: 15px">
					待拆分数：
					<span
						style="font-size: 18px;color: #333;font-weight: 500"
						>{{ waitSplitNum }}</span
					>
				</span> -->
				
			</div>
			<template>
				<a-table
					class="demandsplit-table zebra"
					:rowKey="record => record.partitionId"
					:columns="columns"
					:dataSource="data"
					:pagination="false"
					:showHeader="false"
					:loading="loading"
				>
					<span slot="positionName" slot-scope="text, record">
						<a-popover
							title="职位详情"
							placement="right"
							overlayClassName="demand-content-recruit-detail"
							trigger="click"
							@visibleChange="visibleChange(record)"
						>
							<template slot="content">
								<div class="recruit-detail">
									<a-row class="row">
										<a-col :span="4" class="status">
											<div>职位名称</div>
											<div>招聘部门</div>
											<div>工作地点</div>
											<div>薪资范围</div>
											<div>简历筛选人</div>
											<div>资源库类型</div>
										</a-col>
										<a-col :span="9" class="specific">
											<div>
												{{
													list.name
														? list.name
														: '暂无'
												}}
											</div>
											<div>
												{{
													list.department
														? list.department
														: '暂无'
												}}
											</div>
											<div>
												{{
													list.location
														? list.location
														: '暂无'
												}}
											</div>
											<div>
												{{
													list.wage
														? list.wage
														: '暂无'
												}}
											</div>
											<div>
												{{
													list.filterman
														? list.filterman
														: '暂无'
												}}
											</div>
											<div>
												{{
													list.resource
														? '默认'
														: '默认'
												}}
											</div>
										</a-col>
										<a-col :span="4" class="status">
											<div>招聘人数</div>
											<div>职位性质</div>
											<div>工作年限</div>
											<div>学历要求</div>
											<div>面试官</div>
											<div>评价标准</div>
										</a-col>
										<a-col :span="7" class="specific">
											<div>
												{{
													list.num ? list.num : '暂无'
												}}
											</div>
											<div>
												{{
													getJobTypesLabel(list.kind)
												}}
											</div>
											<div>
												{{
													getExperienceLabel(
														list.years
													)
												}}
											</div>
											<div>
												{{
													getEducationLabel(list.edu)
												}}
											</div>
											<div>
												{{
													list.interviewer
														? list.interviewer
														: '暂无'
												}}
											</div>
											<div>
												{{
													list.grade
														? list.grade
														: '暂无'
												}}
											</div>
										</a-col>
									</a-row>
									<a-row>
										<a-col :span="4">
											<div class="job">职位描述</div>
										</a-col>
										<a-col :span="20">
											<div class="job-details">
												{{
													list.details
														? list.details
														: '暂无'
												}}
											</div>
										</a-col>
									</a-row>
								</div>
							</template>
							<a style="font-size:16px">{{ text }}</a>
						</a-popover>
						<p style="margin-top:15px">
							<a-tag color="blue" v-if="record.educationName">{{ record.educationName }}</a-tag>
							<a-tag color="blue" v-if="record.evaluationCriteria">{{ record.evaluationCriteria }}</a-tag>
							<a-tag color="blue" v-if="record.workPlace">{{ record.workPlace }}</a-tag>
						</p>
						<p style="color:#999">{{record.organizeName}}</p>
					</span>
					<template #recruitNum="recruitNum">
						<div>
							<a-icon style="color:#449ACE;margin-right:7px" type="user"></a-icon>{{recruitNum}}人
						</div>
					</template>
					<template #taskStart="record">
						<div>
							<a-icon type="clock-circle" style="color:#449ACE;margin-right:9px;"/>{{record.taskStart}} ~ {{record.taskEnd}}
						</div>
					</template>
					<span slot="emergencyLevel" slot-scope="text">
						<a-tag v-if="text == 1" color="blue">一般</a-tag>
						<a-tag v-if="text == 2" color="orange">紧急</a-tag>
						<a-tag v-if="text == 3" color="red">特急</a-tag>
					</span>
					<span slot="job_details" slot-scope="record">
						<div>
							<p>
								工作经验：{{
									getExperienceLabel(record.workSeniority)
								}}
							</p>
							<p>
								最低学历：{{
									getEducationLabel(record.education)
								}}
							</p>
							<p>职位类别：{{ record.positionName }}</p>
						</div>
					</span>
					<span slot="jobRequire" slot-scope="record">
						<p>
							{{ record.educationName }} {{ record.workPlace }}
							{{ record.evaluationCriteria }}
						</p>
					</span>
					<span slot="action" slot-scope="text, item,index">
						<a @click="reviseClick(item)"><a-icon style="font-size:20px;margin-right:18px" type="edit" /></a>
						<a @click="delClick(item,index)"><a-icon style="color:#F58585;font-size:20px" type="delete" /></a>
					</span>
					<!-- <p
						slot="expandedRowRender"
						slot-scope="record"
						style="color: #636364; font-size: 12px; line-height: 24px;"
					>
						职位要求：{{ record.jobDeions }}
					</p> -->
				</a-table>
			</template>

			<a-affix :offsetBottom="0">
				<div class="bottom">
					<!-- <can-i-use code="xqzx-bmhc-txqts">
						<a-button
							style="margin-left: 10px; background: #d5d5d5; border: #d5d5d5; color: #fff;"
							v-if="waitSplitNum > 0"
							disabled
						>
							提交审核
						</a-button>
					</can-i-use>
					<can-i-use code="xqzx-bmhc-txqts">
						<a-button
							style="margin-left: 10px;"
							v-if="waitSplitNum == 0 && state == 0"
							class="bottom-btn2"
							@click="handleReview"
						>
							提交审核
						</a-button>
					</can-i-use>
					<can-i-use code="xqzx-bmhc-xqsh">
						<a-button
							style="margin-left: 10px; background: #d5d5d5; border: #d5d5d5; color: #fff;"
							v-if="waitSplitNum > 0"
							disabled
						>
							审核
						</a-button>
					</can-i-use>
					<can-i-use code="xqzx-bmhc-xqsh">
						<a-button
							style="margin-left: 10px;"
							v-if="waitSplitNum == 0 && state == 1"
							class="bottom-btn2"
							@click="toReview"
						>
							审核
						</a-button>
					</can-i-use> -->
					<div class="demandsplit">
						<can-i-use code="xqzx-bmhc-txqts">
							<a-button
								style="margin-left: 10px;"
								v-if="waitSplitNum == 0"
								class="bottom-btn2"
								@click="handleSubmit"
							>
								发布
							</a-button>
						</can-i-use>
						<can-i-use code="xqzx-bmhc-xqcf">
							<a-button
								v-if="waitSplitNum != 0"
								style="margin-left: 10px;backgroudColor: #22b8cf"
								@click="demandSplit"
								>需求拆分</a-button
							>
						</can-i-use>
					</div>
				</div>
			</a-affix>

			<!-- 需求分拆 -->
			<a-modal
				centered
				title="需求分拆"
				v-model="splitVisible"
				width="660px"
				wrapClassName="split-modal"
				:bodyStyle="{
					height: '500px',
					overflowY: 'auto'
				}"
			>
				<template slot="footer">
					<span style="float: left;"
						>剩余拆分数 :
						<span
							style="font-size: 18px;color: #fd555c;font-weight: 500;margin-left: 5px;"
							>{{ waitSplitNum }}</span
						></span
					>
					<a-button
						key="back"
						style="background: #E8E9E8; border: #E8E9E8; color: #333;"
						@click="splitVisible = false"
						>取消</a-button
					>
					<a-button
						key="submit"
						style="background: #22B8CF;border: #22B8CF"
						type="primary"
						@click="handleOrganSubmit"
						>保存</a-button
					>
				</template>
				<a-form :form="staffForm" @submit="handleOrganSubmit">
					<a-row>
						<a-col
							:span="24"
							style="text-align: right; margin-bottom: 10px;"
						>
							<a-switch size="small" @change="onSwitchChange" />
							<span style="color: #999; font-size: 14px;">
								隐藏非必选项
							</span>
						</a-col>
						<a-col :span="24">
							<a-form-item
								label="招聘部门"
								:colon="false"
								:label-col="{ span: 7 }"
								:wrapper-col="{ span: 14 }"
							>
								<a-cascader
									:fieldNames="{
										label: 'orgName',
										value: 'orgId',
										children: 'children'
									}"
									:options="organizeList"
									changeOnSelect
									allowClear
									disabled
									placeholder="请选择招聘部门"
									v-decorator="[
										'department',
										{
											rules: [
												{
													required: true,
													message: '请选择招聘部门'
												}
											],
											initialValue: departmentList
										}
									]"
									:getPopupContainer="
										triggerNode => {
											return (
												triggerNode.parentNode ||
												document.body
											);
										}
									"
								/>
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item
								label="职位名称"
								:colon="false"
								:label-col="{ span: 7 }"
								:wrapper-col="{ span: 14 }"
							>
								<a-input
									allowClear
									v-decorator="[
										'jobtitle',
										{
											rules: [
												{
													required: true,
													message: '请输入职位名称'
												}
											],
											initialValue: echoList.jobtitle
										}
									]"
									placeholder="请输入职位名称"
								/>
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item
								label="职位类别"
								:colon="false"
								:label-col="{ span: 7 }"
								:wrapper-col="{ span: 14 }"
							>
							<a-cascader
								:options="jobList"
								@change="handleJobChange"
								placeholder="请选择职位类别"
								:allowClear="false"
								v-decorator="[
									'jobType',
									{
										rules: [
											{
												required: true,
												message: '请选择职位类别'
											}
										],
										initialValue: echoList.jobType  
									}
								]"
								:getPopupContainer="triggerNode => triggerNode.parentNode"
							/>
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item
								label="招聘人数"
								:colon="false"
								:label-col="{ span: 7 }"
								:wrapper-col="{ span: 14 }"
							>
								<a-input-number
									style="width: 100%;"
									:min="1"
									v-decorator="[
										'number',
										{
											rules: [
												{
													type: 'number',
													message: '请输入数字！'
												},
												{
													required: true,
													message: '请输入招聘人数！'
												}
											],
											initialValue: echoList.number
										}
									]"
									placeholder="请输入招聘人数"
								/>
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item
								label="需求周期"
								:colon="false"
								:label-col="{ span: 7 }"
								:wrapper-col="{ span: 14 }"
							>
								<a-date-picker
									v-decorator="[
										'startdate',
										{
											rules: [
												{
													required: true,
													message: '请选择需求周期'
												}
											],
											initialValue: echoList.startdate
										}
									]"
									:style="{
										display: 'inline-block',
										width: 'calc(50% - 12px)'
									}"
									format="YYYY-MM-DD"
									:getCalendarContainer="
										triggerNode => {
											return (
												triggerNode.parentNode ||
												document.body
											);
										}
									"
									placeholder="开始日期"
								/>
								<span
									:style="{
										display: 'inline-block',
										width: '24px',
										textAlign: 'center'
									}"
								>
									-
								</span>
								<a-date-picker
									v-decorator="[
										'enddate',
										{
											rules: [
												{
													required: true,
													message: '请选择需求周期'
												}
											],
											initialValue: echoList.enddate
										}
									]"
									:style="{
										display: 'inline-block',
										width: 'calc(50% - 12px)'
									}"
									format="YYYY-MM-DD"
									:getCalendarContainer="
										triggerNode => {
											return (
												triggerNode.parentNode ||
												document.body
											);
										}
									"
									placeholder="结束日期"
								/>
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item
								label="职位性质"
								:colon="false"
								:label-col="{ span: 7 }"
								:wrapper-col="{ span: 14 }"
							>
								<a-radio-group
									name="positionNature"
									style="margin-left: 20px;"
									v-decorator="[
										'positionNature',
										{
											rules: [
												{
													required: true,
													message: '请选择职位性质'
												}
											],
											initialValue: echoList.positionNature
												? echoList.positionNature
												: 0
										}
									]"
								>
									<a-radio
										v-for="item in jobTypesList"
										:value="item.value"
										:key="item.value"
									>
										{{ item.label }}
									</a-radio>
								</a-radio-group>
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item
								label="紧急程度"
								:colon="false"
								:label-col="{ span: 7 }"
								:wrapper-col="{ span: 14 }"
							>
								<a-select
									v-decorator="[
										'emergency_level',
										{
											rules: [
												{
													required: true,
													message: '请选择紧急程度'
												}
											],
											initialValue:
												echoList.emergency_level
										}
									]"
									allowClear
									placeholder="请选择紧急程度"
									:getPopupContainer="
										triggerNode => {
											return (
												triggerNode.parentNode ||
												document.body
											);
										}
									"
								>
									<a-select-option
										:value="item.value"
										v-for="item in levelList"
										:key="item.value"
										>{{ item.label }}</a-select-option
									>
								</a-select>
							</a-form-item>
						</a-col>
						<a-col :span="24" v-if="!switchRequired">
							<a-form-item
								label="工作城市"
								:colon="false"
								:label-col="{ span: 7 }"
								:wrapper-col="{ span: 14 }"
							>
								<a-cascader
									:options="CityInfo"
									changeOnSelect
									allowClear
									@change="handleCityChange"
									placeholder="请选择工作城市"
									v-decorator="[
										'areaCode', 
										{
											rules: [
												{
													required: true,
													message: '请选择工作城市'
												}
											],
											initialValue: echoList.areaCode 
										}
									]"
									:getPopupContainer="triggerNode => triggerNode.parentNode"
								/>
							</a-form-item>
						</a-col>
						<a-col :span="24" v-if="!switchRequired">
							<a-form-item
								label="工作地点"
								:colon="false"
								:label-col="{ span: 7 }"
								:wrapper-col="{ span: 14 }"
							>
								<a-input
									allowClear
									v-decorator="[
										'work_place',
										{ initialValue: echoList.work_place }
									]"
									placeholder="请输入工作地点"
								/>
							</a-form-item>
						</a-col>
						<a-col :span="24" v-if="!switchRequired">
							<a-form-item
								label="工作年限"
								:colon="false"
								:label-col="{ span: 7 }"
								:wrapper-col="{ span: 14 }"
							>
								<a-select
									allowClear
									v-decorator="[
										'workyears',
										{ initialValue: echoList.workyears }
									]"
									placeholder="请选择工作年限"
									:getPopupContainer="
										triggerNode => {
											return (
												triggerNode.parentNode ||
												document.body
											);
										}
									"
								>
									<a-select-option
										:value="item.value"
										v-for="item in workyearsList"
										:key="item.value"
										>{{ item.label }}</a-select-option
									>
								</a-select>
							</a-form-item>
						</a-col>
						<a-col :span="24" v-if="!switchRequired">
							<a-form-item
								label="薪资范围"
								:colon="false"
								:label-col="{ span: 7 }"
								:wrapper-col="{ span: 17 }"
							>
								<a-input-group compat>
									<a-input-number
										class="wage-input"
										allowClear
										v-decorator="[
											'min_wage',
											{ initialValue: echoList.min_wage }
										]"
										style=" width: calc(50% - 55px); text-align: center;"
										placeholder="最低薪资"
										:formatter="value => `${value}K`"
										:parser="
											value => value.replace('K', '')
										"
									/>
									<span
										style="
                      margin: 0 10px;
                      font-size: 14px;
                      font-weight: bold;
                      color: #78909c
                    "
										>至</span
									>
									<a-input-number
										allowClear
										v-decorator="[
											'max_wage',
											{ initialValue: echoList.max_wage }
										]"
										style="width: calc(50% - 55px); text-align: center;"
										placeholder="最高薪资"
										:formatter="value => `${value}K`"
										:parser="
											value => value.replace('K', '')
										"
									/>
								</a-input-group>
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item
								label="学历要求"
								:colon="false"
								:label-col="{ span: 7 }"
								:wrapper-col="{ span: 14 }"
							>
								<a-select
									allowClear
									v-decorator="[
										'education',
										{
											rules: [
												{
													required: true,
													message: '请选择学历要求'
												}
											],
											initialValue: echoList.education
										}
									]"
									placeholder="请选择学历要求"
									:getPopupContainer="
										triggerNode => {
											return (
												triggerNode.parentNode ||
												document.body
											);
										}
									"
								>
									<a-select-option
										:value="item.value"
										v-for="item in educationList"
										:key="item.value"
										>{{ item.label }}</a-select-option
									>
								</a-select>
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item
								label="简历筛选人"
								:colon="false"
								:label-col="{ span: 7 }"
								:wrapper-col="{ span: 14 }"
							>
								<a-select
									allowClear
									mode="multiple"
									@blur="handleResumeBlur"
									@focus="handleResumeFocus"
									@search="handleResumeSearch"
									:filter-option="filterOption"
									v-decorator="[
										'resumeFilter',
										{
											rules: [
												{
													required: true,
													message: '请选择简历筛选人'
												}
											],
											initialValue: echoList.resumeFilter
										}
									]"
									placeholder="请选择简历筛选人"
									:getPopupContainer="
										triggerNode => {
											return (
												triggerNode.parentNode ||
												document.body
											);
										}
									"
								>
									<a-select-option
										:value="item.userId"
										v-for="item in optionFilterList"
										:key="item.userId"
										>{{ item.userName }}</a-select-option
									>
								</a-select>
							</a-form-item>
						</a-col>
						<a-col :span="24" v-if="!switchRequired">
							<a-form-item
								label="初试官"
								:colon="false"
								:label-col="{ span: 7 }"
								:wrapper-col="{ span: 14 }"
							>
								<a-select
									allowClear
									mode="multiple"
									@blur="handleInterviewertBlur"
									@focus="handleInterviewertFocus"
									@search="handleInterviewertSearch"
									:filter-option="filterOption"
									v-decorator="[
										'interviewer',
										{
											rules: [
												{
													required: true,
													message: '请选择初试官'
												}
											],
											initialValue: echoList.interviewer
										}
									]"
									placeholder="请选择初试官"
									:getPopupContainer="
										triggerNode => {
											return (
												triggerNode.parentNode ||
												document.body
											);
										}
									"
								>
									<a-select-option
										:value="item.userId"
										v-for="item in optionInterList"
										:key="item.userId"
										>{{ item.userName }}</a-select-option
									>
								</a-select>
							</a-form-item>
						</a-col>
						<a-col :span="24" v-if="!switchRequired">
							<a-form-item
								label="复试官"
								:colon="false"
								:label-col="{ span: 7 }"
								:wrapper-col="{ span: 14 }"
							>
								<a-select
									allowClear
									mode="multiple"
									@blur="handleInterviewertBlur"
									@focus="handleInterviewertFocus"
									@search="handleInterviewertSearch"
									:filter-option="filterOption"
									v-decorator="[
										'reInterviewer',
										{
											rules: [
												{
													required: true,
													message: '请选择复试官'
												}
											],
											initialValue: echoList.reInterviewer
										}
									]"
									placeholder="请选择复试官"
									:getPopupContainer="
										triggerNode => {
											return (
												triggerNode.parentNode ||
												document.body
											);
										}
									"
								>
									<a-select-option
										:value="item.userId"
										v-for="item in optionInterList"
										:key="item.userId"
										>{{ item.userName }}</a-select-option
									>
								</a-select>
							</a-form-item>
						</a-col>
						<a-col :span="24" v-if="!switchRequired">
							<a-form-item
								label="抄送人"
								:colon="false"
								:label-col="{ span: 7 }"
								:wrapper-col="{ span: 14 }"
							>
								<a-select
									allowClear
									mode="multiple"
									@blur="handleInterviewertBlur"
									@focus="handleInterviewertFocus"
									@search="handleInterviewertSearch"
									:filter-option="filterOption"
									v-decorator="[
										'copyToInterviewer',
										{
											rules: [
												{
													required: true,
													message: '请选择抄送人'
												}
											],
											initialValue: echoList.copyToInterviewer
										}
									]"
									placeholder="请选择抄送人"
									:getPopupContainer="triggerNode => triggerNode.parentNode"
								>
									<a-select-option
										:value="item.userId"
										v-for="item in optionInterList"
										:key="item.userId"
										>{{ item.userName }}</a-select-option
									>
								</a-select>
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item
								label="面试地址"
								:colon="false"
								:label-col="{ span: 7 }"
								:wrapper-col="{ span: 14 }"
							>
								<a-input
									allowClear
									v-decorator="[
										'interviewAddress',
										{
											rules: [
												{
													required: true,
													message: '请输入面试地址' 
												}
											],
											initialValue: echoList.interviewAddress
										}
									]"
									placeholder="请输入面试地址"
								/>
							</a-form-item>
						</a-col>
						<a-col :span="24" v-if="!switchRequired">
							<a-form-item
								label="资源库类型"
								:colon="false"
								:label-col="{ span: 7 }"
								:wrapper-col="{ span: 14 }"
							>
								<a-select
									allowClear
									disabled
									v-decorator="[
										'library_type',
										{ initialValue: 0 }
									]"
									placeholder="请选择资源库类型"
									:getPopupContainer="
										triggerNode => {
											return (
												triggerNode.parentNode ||
												document.body
											);
										}
									"
								>
									<a-select-option
										:value="item.value"
										v-for="item in resourceList"
										:key="item.value"
										>{{ item.label }}</a-select-option
									>
								</a-select>
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item
								label="职级职等"
								:colon="false"
								:label-col="{ span: 7 }"
								:wrapper-col="{ span: 14 }"
							>
								<a-select
									allowClear
									v-decorator="[
										'evaluation_standard',
										{
											rules: [
												{
													required: true,
													message: '请选择职级职等'
												}
											],
											initialValue:
												echoList.evaluation_standard
										}
									]"
									placeholder="请选择职级职等"
									:getPopupContainer="
										triggerNode => {
											return (
												triggerNode.parentNode ||
												document.body
											);
										}
									"
								>
									<a-select-option
										:value="item"
										v-for="item in rankList"
										:key="item"
										>{{ item }}</a-select-option
									>
								</a-select>
							</a-form-item>
						</a-col>
						<a-col :span="24" v-if="!switchRequired">
							<a-form-item
								label="任职资格"
								:colon="false"
								:label-col="{ span: 7 }"
								:wrapper-col="{ span: 14 }"
							>
								<a-textarea
									allowClear
									v-decorator="[
										'job_description',
										{
											initialValue:
												echoList.job_description
										}
									]"
									placeholder="请输入任职资格"
									:autosize="{ minRows: 6 }"
									style="resize: none;"
								/>
							</a-form-item>
						</a-col>
						<a-col :span="24" v-if="!switchRequired">
							<a-form-item
								label="岗位职责"
								:colon="false"
								:label-col="{ span: 7 }"
								:wrapper-col="{ span: 14 }"
							>
								<a-textarea
									allowClear
									v-decorator="[
										'comments',
										{
											initialValue:
												echoList.comments
										}
									]"
									placeholder="请输入岗位职责"
									:autosize="{ minRows: 6 }"
									style="resize: none;"
								/>
							</a-form-item>
						</a-col>
					</a-row>
				</a-form>
			</a-modal>
		</div>
	</div>
</template>

<script>
import moment from 'moment';
import {
	getDemand,
	getLeaderInfo,
	getUserInfo,
	getDemandPartitionList,
	saveDemandPartition,
	updateDemandPartition,
	deleteDemandPartition,
	reviewDemand,
	getTreeList,
	postDemandPartition
} from '@api/branchHC/index';
import { getDemandList, getStructureList } from '@api/demandBranch/index';
import { createNamespacedHelpers } from 'vuex';
const { mapState } = createNamespacedHelpers('status');
import CityInfo from "@configs/city.js"
const columns = [
	{
		title: '职位名称',
		dataIndex: 'positionName',
		key: 'positionName',
		width: '330px',
		scopedSlots: { customRender: 'positionName' }
	},
	// {
	// 	title: '职位详情',
	// 	key: 'job_details',
	// 	scopedSlots: { customRender: 'job_details' }
	// },
	{
		title: '招聘人数',
		dataIndex: 'recruitNum',
		key: 'recruitNum',
		align: 'right',
		width: '90px',
		scopedSlots: { customRender: 'recruitNum' }
	},
	// {
	// 	title: '职位要求',
	// 	key: 'jobRequire',
	// 	scopedSlots: { customRender: 'jobRequire' }
	// },
	{
		title: '紧急程度',
		dataIndex: 'emergencyLevel',
		key: 'emergencyLevel',
		align: 'center',
		width: '110px',
		scopedSlots: { customRender: 'emergencyLevel' }
	},
	{
		title: '需求周期',
		key: 'taskStart',
		align: 'center',
		width: '210px',
		scopedSlots: { customRender: 'taskStart' }
	},
	// {
	// 	title: '目标完成日期',
	// 	dataIndex: 'taskEnd',
	// 	key: 'taskEnd',
	// 	align: 'center',
	// 	width: '200px',
	// },
	{
		title: '操作',
		dataIndex: 'action',
		key: 'action',
		width: '130px',
		align: 'center',
		scopedSlots: { customRender: 'action' }
	}
];

export default {
	data() {
		return {
			defaultModel: 2,
			tabList: [
				{
					key: 1,
					title: '需求信息'
				},
				{
					key: 2,
					title: '需求内容'
				}
			],
			loading: false,
			data: [],
			columns,
			CityInfo,
			expandedRowKeys: [],
			state: null,
			demandId: null,
			emergencyLevel: null,
			partitionId: null,
			disabled: true,
			switchRequired: false,
			demondtotal: 0,
			waitSplitNum: 0,
			splitVisible: false,
			reviewVisible: false,
			staffForm: this.$form.createForm(this),
			reviewForm: this.$form.createForm(this),
			levelList: [],
			jobTypesList: [],
			workyearsList: [],
			educationList: [],
			resourceList: [],
			notificationList: [],
			approvalList: [],
			listQuery: {
				demandId: null,
				positionName: '',
				recruitNum: null,
				organizeId: [],
				jobNature: null,
				emergencyLevel: null,
				workPlace: '',
				workSeniority: null,
				minSalary: null,
				maxSalary: null,
				education: null,
				resumeFilterArray: [],
				interviewerArray: [],
				reInterviewerArray: [],
				copyToArray: [],
				interviewAddress: '',
				areaCode: [], // 城市id集合
				areaCodeName: [], // 城市名称 
				jobType: [], // 职位类别id集合
				jobTypeName: [], // 职位类别名称  
				taskStart: '',
				taskEnd: '',
				resBankType: null,
				evaluationCriteria: '',
				jobDeions: '',
				comments: ''
			},
			echoList: {
				jobtitle: null,
				number: null,
				department: null,
				positionNature: null,
				emergency_level: null,
				work_place: null,
				workyears: null,
				min_wage: null,
				max_wage: null,
				education: null,
				resumeFilter: null,
				interviewer: null,
				reInterviewer: null,
				copyToInterviewer: null,
				interviewAddress: null,
				startdate: null,
				areaCode: null,
				jobType: null,
				enddate: null,
				library_type: null,
				evaluation_standard: null,
				job_description: null,
				comments: null
			},
			filterList: [],
			optionFilterList: [],
			optionFilterList_: [],
			optionInterList: [],
			optionInterList_: [],
			interviewerList: [],
			reviewerList: [],
			customId: null,
			organizeId: null,
			organizeList: [],
			list: {
				name: '',
				num: '',
				kind: '',
				years: '',
				wage: '',
				filterman: '',
				resource: '',
				details: '',
				requres: '',
				department: '',
				location: '',
				edu: '',
				interviewer: '',
				grade: ''
			},
			statusDemendId: '',
			jobList: [],
			departmentList: []
		};
	},
	computed: {
		...mapState({
			educations: state => state.educationRequires,
			jobTypes: state => state.jobTypes,
			experiences: state => state.jobExperiences,
			rankList: state => state.rankList,
		})
	},
	created() {
		this.getDemand();
		this.getTreeListInit() // 获取职位类别
		this.getDemandPartitionList();
	},
	methods: {
		moment,
		async handleSubmit() {
			try{
				const res = await postDemandPartition({
					demandId:this.$route.query.demandStatus == 1 ? 
				Number(this.$route.query.newDemandId) : 
				Number(this.$route.query.demandId)
				})
				if(res.data.code === 0){
					this.$message.success(res.data.data);
					this.$router.replace({
						name:'HC',
						query:{
							demandId:Number(this.$route.query.demandId)
						}
					})
				}else{
					this.$message.error(res.data.mesg)
				}
			}catch(error){
				console.log(error)
			}
		},
		async getTreeListInit(){
				const res = await getTreeList()
				this.jobList = res.data.data
		},
		getJobTypesLabel(value) {
			const matched = this.jobTypes.find(
				jobTypes => jobTypes.value === value
			);
			if (matched) {
				return matched.label;
			} else {
				return '未匹配到工作性质';
			}
		},
		getEducationLabel(value) {
			const matched = this.educations.find(
				education => education.value === value
			);
			if (matched) {
				return matched.label;
			} else {
				return '未匹配到学历';
			}
		},
		getExperienceLabel(value) {
			const matched = this.experiences.find(
				experience => experience.value === value
			);
			if (matched) {
				return matched.label;
			} else {
				return '未匹配到经验';
			}
		},
		getDemand() {
			getDemand({
				demandId: Number(this.$route.query.demandId)
			})
				.then(res => {
					console.log(res.data.data.demand);
					this.organizeId = res.data.data.demand.organizeId;
					this.echoList.emergencyLevels =
						res.data.data.demand.emergencyLevel;
					this.customId = res.data.data.demand.customId;
					this.state = res.data.data.demand.state;
					this.departmentList = res.data.data.demand.organizeIdList
					this.emergencyLevel = res.data.data.demand.emergencyLevel;
				})
				.catch(err => {
					console.log(err);
				});
		},
		getStructureList() {
			getStructureList({
				customId: this.customId
			})
				.then(res => {
					console.log(res);
					if (res.data.data == null) {
						this.organizeList = [];
					} else {
						this.organizeList = res.data.data.orgList;
					}
				})
				.catch(err => {
					console.log(err);
				});
		},
		getLeaderInfo() {
			getLeaderInfo()
				.then(res => {
					this.filterList = res.data.data;
					this.interviewerList = res.data.data;
          let newInterviewerList = []
          let newReInterviewerList = []
          let newCopyToInterviewerList = []
          let newResumeFilterList = []
          newInterviewerList = this.interviewerList.filter(item => {
            return this.echoList.interviewer.indexOf(item.userId) !== -1
          })
          newReInterviewerList = this.interviewerList.filter(item => {
            return this.echoList.reInterviewer.indexOf(item.userId) !== -1
          })
          newCopyToInterviewerList = this.interviewerList.filter(item => {
            return this.echoList.copyToInterviewer.indexOf(item.userId) !== -1
          })
          newResumeFilterList = this.filterList.filter(item => {
            return this.echoList.resumeFilter.indexOf(item.userId) !== -1
					})
          this.optionInterList = [...new Set([...newInterviewerList,...newReInterviewerList,...newCopyToInterviewerList])]
          this.optionFilterList = newResumeFilterList
				})
				.catch(err => {
					console.log(err);
				});
		},
		getUserInfo() {
			getUserInfo()
				.then(res => {
					if (res.data.code == 0) {
						console.log(res);
						this.reviewerList = res.data.data.userList.list;
					}
				})
				.catch(err => {
					console.log(err);
				});
		},
		getDemandPartitionList() {
			this.loading = true;
			getDemandPartitionList({
				demandId: this.$route.query.demandStatus == 1 ? 
				Number(this.$route.query.newDemandId) : 
				Number(this.$route.query.demandId)
			})
				.then(res => {
					this.demondtotal = res.data.data.count.xqAll;
					this.waitSplitNum = res.data.data.count.tobeSplit;
					this.data = res.data.data.demandPartitionList;
					this.loading = false;
				})
				.catch(err => {
					console.log(err);
					this.loading = false;
				});
		},
		updateDemandPartition() {
			return updateDemandPartition(this.listQuery)
				.then(res => {
					console.log(res);
					if (res.data.code === 0) {
						this.$message.success(res.data.data);
					} else {
						this.$message.error(res.data.mesg);
					}
				})
				.catch(err => {
					console.log(err);
				});
		},
		// 删除拆分
		// deleteDemandPartition(id) {
		// 	deleteDemandPartition({
		// 		partitionId: id
		// 	})
		// 		.then(res => {
		// 			if (res.data.code == 0) {
		// 				this.getDemandPartitionList();
		// 				this.$message.success(res.data.data);
		// 			} else {
		// 				this.$message.error(res.data.mesg);
		// 			}
		// 		})
		// 		.catch(err => {
		// 			console.log(err);
		// 		});
		// },
		handleTabsChange(e) {
			this.defaultModel = e;
			if (e == 1) {
				this.$router.push({
					name: 'DemandCopyInfo',
					query: {
						demandId: Number(this.$route.query.demandId),
						newDemandId: Number(this.$route.query.newDemandId) ?
						Number(this.$route.query.newDemandId) :
						undefined,
						demandStatus: this.$route.query.demandStatus === 1 ? 1 : 0
					}
				});
			} else if (e == 2) {
				this.$router.push({
					name: 'DemandCopyContent',
					query: {
						demandId: Number(this.$route.query.demandId)
					}
				});
			} else {
				return;
			}
		},
		// 需求拆分
		demandSplit() {
			console.log('需求拆分');
			this.splitVisible = true;
			this.levelList = this.$store.state.status.emergencyLevels;
			this.workyearsList = this.$store.state.status.jobExperiences;
			this.educationList = this.$store.state.status.educationRequires;
			this.resourceList = this.$store.state.status.HCResourceTypes;
			this.jobTypesList = this.$store.state.status.jobTypes;
			this.getLeaderInfo();
			this.getStructureList();
			this.listQuery = {};
			this.echoList = {};
			// this.echoList.department
		},
		// 修改拆分内容
		reviseClick(item) {
			console.log(item);
			this.splitVisible = true;

			this.levelList = this.$store.state.status.emergencyLevels;
			this.workyearsList = this.$store.state.status.jobExperiences;
			this.educationList = this.$store.state.status.educationRequires;
			this.resourceList = this.$store.state.status.HCResourceTypes;
			this.jobTypesList = this.$store.state.status.jobTypes;
			this.getLeaderInfo();
			this.getStructureList();

			this.partitionId = item.partitionId;
			this.echoList.jobtitle = item.positionName
				? item.positionName
				: null;
			this.echoList.number = item.recruitNum ? item.recruitNum : null;
			this.echoList.department =
				item.organizeIdList !== null ? item.organizeIdList : [];
			this.echoList.positionNature = item.jobNature
				? item.jobNature
				: null;
			this.echoList.emergency_level = item.emergencyLevel
				? item.emergencyLevel
				: null;
			this.echoList.work_place = item.workPlace ? item.workPlace : null;
			this.echoList.workyears = item.workSeniority
				? Number(item.workSeniority)
				: null;
			this.echoList.min_wage = item.minSalary
				? item.minSalary / 1000
				: null;
			this.echoList.max_wage = item.maxSalary
				? item.maxSalary / 1000
				: null;
			this.echoList.education = item.education ? item.education : null;
			this.echoList.resumeFilter =
				item.resumeFilterList !== null ? item.resumeFilterList : [];
			this.echoList.interviewer =
				item.interviewerList !== null ? item.interviewerList : [];
			this.echoList.reInterviewer =
				item.reInterviewerList !== null ? item.reInterviewerList : [];
			this.echoList.copyToInterviewer =
				item.copyToList !== null ? item.copyToList : [];
			this.echoList.areaCode =
				item.areaCodeList !== null ? item.areaCodeList : [];
			this.echoList.jobType =
			item.jobTypeList !== null ? item.jobTypeList : [];
			this.echoList.interviewAddress = item.interviewAddress ? item.interviewAddress : null;
			this.echoList.startdate = item.taskStart
				? this.moment(item.taskStart)
				: null;
			this.echoList.enddate = item.taskEnd
				? this.moment(item.taskEnd)
				: null;
			this.echoList.library_type = item.resBankType
				? item.resBankType
				: null;
			this.echoList.evaluation_standard = item.evaluationCriteria
				? item.evaluationCriteria
				: null;
			this.echoList.job_description = item.jobDeions
				? item.jobDeions
				: null;
			this.echoList.comments = item.comments
				? item.comments
				: null;
			console.log(this.echoList);
		},
		// 删除需求拆分
		delClick(item,index) {
			this.data.splice(index,1)
			// this.$confirm({
			// 	title: '确认删除这条需求分拆吗?',
			// 	content: '删除后将不可恢复！',
			// 	okText: '确定',
			// 	okType: 'danger',
			// 	cancelText: '取消',
			// 	onOk:() => {
			// 		this.deleteDemandPartition(item.partitionId);
			// 	},
			// 	onCancel() {
			// 		this.$message.warning('已取消');
			// 	}
			// });
		},
		// 职位类别
		handleJobChange(value,selectedOptions) {
			this.listQuery.jobType = value;
			this.listQuery.jobTypeName = selectedOptions.map(o => o.label).join('/');
		},
		// 工作城市
		handleCityChange(value,selectedOptions) {
			this.listQuery.areaCode = value;
			this.listQuery.areaCodeName = selectedOptions.map(o => o.label).join('/');
		},
		// 保存、修改需求拆分
		handleOrganSubmit(e) {
			e.preventDefault();
			this.staffForm.validateFields((error, fieldsValue) => {
				if (error) {
					console.log('error', error);
					return;
				}
				const values = {
					...fieldsValue,
					startdate: fieldsValue['startdate']
						? fieldsValue['startdate'].format('YYYY-MM-DD')
						: undefined,
					enddate: fieldsValue['enddate']
						? fieldsValue['enddate'].format('YYYY-MM-DD')
						: undefined
				};
				this.listQuery.jobType = this.listQuery.jobType == undefined ? this.echoList.jobType : this.listQuery.jobType
				this.listQuery.jobTypeName = this.listQuery.jobTypeName ? this.listQuery.jobTypeName : this.echoList.jobTypeName
				this.listQuery.areaCode = this.listQuery.areaCode == undefined ? this.echoList.areaCode : this.listQuery.areaCode
				this.listQuery.areaCodeName = this.listQuery.areaCodeName ? this.listQuery.areaCodeName : this.echoList.areaCodeName
				this.listQuery.demandId = Number(this.$route.query.newDemandId);
				this.listQuery.positionName = values.jobtitle;
				this.listQuery.recruitNum = values.number;
				let departmentId =
					values.department[values.department.length - 1];
				this.listQuery.organizeId = departmentId;
				this.listQuery.jobNature = values.positionNature;
				this.listQuery.emergencyLevel = values.emergency_level;
				this.listQuery.workPlace = values.work_place;
				this.listQuery.workSeniority = values.workyears;
				this.listQuery.minSalary = values.min_wage * 1000;
				this.listQuery.maxSalary = values.max_wage * 1000;
				this.listQuery.education = values.education;
				this.listQuery.resumeFilterArray = values.resumeFilter;
				this.listQuery.interviewerArray = values.interviewer;
				this.listQuery.reInterviewerArray = values.reInterviewer;
				this.listQuery.copyToArray = values.copyToInterviewer; // 抄送人
				this.listQuery.interviewAddress = values.interviewAddress; // 面试地点
				this.listQuery.taskStart = values.startdate;
				this.listQuery.taskEnd = values.enddate;
				this.listQuery.resBankType = values.library_type;
				this.listQuery.evaluationCriteria = values.evaluation_standard;
				this.listQuery.jobDeions = values.job_description;
				this.listQuery.comments = values.comments;
				if(this.$route.query.demandStatus == 1) {
					this.listQuery.partitionId = this.partitionId;
					this.updateDemandPartition()
						.then(() => {
							this.splitVisible = false;
							this.getDemandPartitionList()
						})
						.catch(err => {
							console.log(err);
						});
				}else {
					saveDemandPartition(this.listQuery)
					.then(res => {
						this.splitVisible = false;
						if (res.data.code === 0) {
							this.$message.success(res.data.data);
							this.$router.push({
								name: "DemandCopyContent",
								query: {
									demandId: this.$route.query.demandId,
									newDemandId: this.$route.query.newDemandId,
									demandStatus: 1
								}
							});
							this.getDemandPartitionList()
						} else {
							this.$message.error(res.data.mesg);
						}
					})
					.catch(err => {
						console.log(err);
					});
				}
			});
		},
		// 隐藏非必选项
		onSwitchChange(checked) {
			this.switchRequired = checked;
		},
		handleResumeBlur(){
			this.optionFilterList = this.filterList.slice(0,100)
		},
		handleResumeFocus(){
      this.optionFilterList = this.filterList.slice(0,100)
		},
		handleResumeSearch(e){
			if(!this.timer) {
        this.timer = setTimeout(()=> {
          this.searchValue(e)
          this.timer = null
        },300)
      }
		},
		handleInterviewertBlur(){
			this.optionInterList = this.interviewerList.slice(0,100)
		},
		handleInterviewertFocus(){
      this.optionInterList = this.interviewerList.slice(0,100)
		},
		handleInterviewertSearch(e){
			if(!this.timer) {
        this.timer = setTimeout(()=> {
          this.searchUserValue(e)
          this.timer = null
        },300)
      }
		},
    filterOption(input, option){
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      )
		},
    searchValue(value) {
      let optionFilterList_ = this.filterList.filter(item => item.userName.indexOf(value) > -1);
      if (optionFilterList_.length > 100 || value === "") {
        optionFilterList_ = optionFilterList_.slice(0, 100);
      }
      this.$nextTick(()=> {
        this.optionFilterList = optionFilterList_
      })
    },
    searchUserValue(value) {
      let optionInterList_ = this.interviewerList.filter(item => item.userName.indexOf(value) > -1);
      if (optionInterList_.length > 100 || value === "") {
        optionInterList_ = optionInterList_.slice(0, 100);
      }
      this.$nextTick(()=> {
        this.optionInterList = optionInterList_
      })
    },
		visibleChange(record) {
			console.log(record);
			this.list.name = record.positionName;
			this.list.num = record.recruitNum;
			this.list.kind = record.jobNature;
			this.list.years = record.workSeniority;
			this.list.wage = `${record.minSalary / 1000}K ~ ${record.maxSalary /
				1000}K`;
			this.list.filterman = record.resumeFilterName;
			this.list.resource = '默认';
			this.list.details = record.jobDeions;
			this.list.department = record.organizeName;
			this.list.location = record.workPlace;
			this.list.edu = record.educationName;
			this.list.interviewer = record.interviewerName;
			this.list.grade = record.evaluationCriteria;
		},
		onShowSizeChange(current, pageSize) {
			console.log(current, pageSize);
		}
	}
};
</script>

<style scoped>
.count-box {
	width: 350px;
	height: 56px;
	margin: 0 auto;
	/* margin-top: 25px; */
}
.count-box .count-left {
	width: 150px;
	float: left;
	position: relative;
	overflow: hidden;
}
.count-box  .text {
	position: absolute;
	top: 6px;
	left: 68px;
	color: #666;
}
.count-box .number {
	position: absolute;
	top: 25px;
	left: 70px;
	color: #333;
	font-size: 18px;
	font-weight: 500;
	line-height: 24px;
}
.count-box .count-right {
	width: 150px;
	float: right;
	overflow: hidden;
	position: relative;
}
.count-box img {
	width: 56px;
	height: 56px;
}
.demand-content-container {
	height: 90%;
	min-height: 90%;
}
.new-demand-header {
	background-color: #fff !important;
	text-indent: 12px;
}
.demand-content {
	background-color: #fff !important;
	min-height: 100%;
	position: relative;
}
.recruit-detail {
	min-height: 450px;
	height: auto;
	width: 540px;
	border: 1px solid #e2e2e2;
}
.recruit-detail .row {
	padding: 0;
	border-bottom: 1px solid #e2e2e2;
}
.recruit-detail div {
	padding: 8px 0;
}
.recruit-detail .status,
.recruit-detail .job {
	background-color: #f5f8fb;
	text-align: right;
	padding-right: 13px;
	font-weight: bold;
	color: #78909c;
}
.recruit-detail .job {
	background-color: #ffffff;
}
.recruit-detail .specific {
	background-color: #ffffff;
	padding-left: 13px;
	color: #333333;
}
/* .recruit-detail .list-item-text {
  width: auto;
  height: 36.5px;
  line-height: 20px;
} */
.recruit-detail .job-details {
	padding: 8px 44px 8px 13px;
	color: #333333;
}
.ant-form-item-control {
	position: relative;
}
.ant-switch-checked {
	background-color: #22b8cf;
}
.demandsplit {
	margin:0 20px;
	padding-bottom: 20px;
	border-bottom: 2px solid #F6F7F8;
}
.demandsplit-table {
	margin:0 20px;
	min-height: 578px;
	padding-bottom: 80px;
}
.demandsplit-table >>> .ant-tag-blue {
	color:#333;
}
.demandsplit .ant-btn {
	background-color: #22b8cf;
	color: #fff;
	border-color: #22b8cf;
}
.bottom {
	background-color: #fff !important;
	text-align: center;
	line-height: 80px;
	box-shadow: 0px 7px 20px 1px rgba(0, 0, 0, 0.18);
	position: absolute;
	width: 100%;
	bottom: 0;
}
.bottom-btn1 {
	background-color: #22b8cf;
	color: #fff;
	border-color: #22b8cf;
}
.bottom-btn2 {
	background-color: #1478e3;
	color: #fff;
	border-color: #1478e3;
}
</style>
<style>
/* .demand-content-container .ant-table-thead > tr > th {
	border-bottom: none;
}
.demand-content-container .ant-table-tbody > tr > td {
	border-bottom: none;
	border-left: 1px solid #f0f0f0;
}
.demand-content-container .ant-table-tbody > tr > td:first-child {
	border-left: none;
} */
.demand-content-container .tab-title {
	font-size: 16px;
	color: #666;
}
.demand-content-container .ant-tabs-tab-active {
	font-size: 16px;
	border-top: 2px solid #1478E3 !important;
}
.demand-content-container .ant-tabs-tab-active .tab-title {
	font-size: 16px;
}
/* 提示框的样式 */
.demand-content-recruit-detail .ant-popover-inner-content {
	padding: 12px 16px !important;
}
.demand-content-recruit-detail .ant-popover-arrow {
	display: none;
}
/* 数字输入框 */
.split-modal .ant-input-group .ant-input-number-input {
	text-align: right;
	padding-right: 30px;
}
.split-modal .ant-modal-header {
	height: 48px;
	background: rgba(246, 247, 251, 1);
}
.split-modal .ant-modal-title {
	font-size: 14px;
	color: #000;
}
.split-modal #job_description {
	resize: none;
}

.review-modal .ant-modal-header {
	height: 48px;
	background: rgba(246, 247, 251, 1);
}
.review-modal .ant-modal-title {
	font-size: 14px;
	color: #000;
}

.toreview-modal .ant-modal-header {
	height: 48px;
	background: rgba(246, 247, 251, 1);
}
.toreview-modal .ant-modal-title {
	font-size: 14px;
	color: #000;
}
.toreview-modal #comments {
	resize: none;
}
</style>

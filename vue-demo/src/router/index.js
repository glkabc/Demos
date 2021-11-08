import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';
import { canIUse } from '../components/CanIUse';
import { v4 } from 'uuid';
import PageNotFound from '../components/PageNotFound.vue';
import Dashboard from '../views/Dashboard.vue';
import NewWelcome from '../views/dashboard/NewWelcome';
import Branch from '../views/dashboard/demand/DemandBranch';
import HC from '../views/dashboard/demand/BranchHC';
import TaskCenter from '../views/dashboard/demand/Department';
import Candidate from '../views/dashboard/demand/Candidate';
import Organize from '../views/dashboard/demand/demandBranch/DemandOrganize';
import Manage from '../views/dashboard/demand/demandBranch/DemandManage';
import Interviewer from '../views/Interviewer';
import Interpolate from '../views/Interpolate/Interpolate';
import ResumeDetail from '../views/interviewer/ResumeDetail';
// import Position from '../views/dashboard/demand/Position'

Vue.use(VueRouter);

/**
 * 菜单权限控制使用 route 对象的name属性的值进行匹配
 * 所以每一个需要权限控制的页面 route 对象必须有 name 属性
 */

const routes = [
	{
		path: '/interpolate',
		name: 'Interpolate',
		meta: {
			id: v4(),
			protected: false,
			keepAlive: false
		},
		component: Interpolate
	},
	{
		path: '/interviewer',
		component: { render: h => h('router-view') },
		meta: {
			id: v4(),
			protected: false,
			keepAlive: false
		},
		children: [
			{
				path: '',
				name: 'Interviewer',
				component: Interviewer,
				meta: {
					id: v4(),
					protected: false,
					keepAlive: false
				}
			},
			{
				path: 'detail',
				name: 'InterviewerDetail',
				component: ResumeDetail,
				meta: {
					id: v4(),
					protected: false,
					keepAlive: false
				}
			}
		]
	},
	{
		path: '/',
		component: Dashboard,
		meta: {
			id: v4(),
			protected: true,
			keepAlive: false
		},
		children: [
			{
				path: '/',
				redirect: { name: 'Welcome' },
				meta: {
					id: v4(),
					protected: false,
					icon: 'user',
					hide: true,
					keepAlive: false
				}
			},
			{
				path: 'welcome',
				name: 'Welcome',
				breadcrumbName: '首页',
				component: NewWelcome,
				meta: {
					id: v4(),
					protected: true,
					icon: 'home',
					title: '首页',
					authCode: null,
					keepAlive: false
				}
			},
			{
				path: 'talent-center',
				name: 'TalentCenter',
				breadcrumbName: '人才中心',
				component: { render: h => h('router-view') },
				meta: {
					id: v4(),
					protected: true,
					icon: 'user',
					title: '人才中心',
					isDropMenu: true,
					authCode: 'rczx'
				},
				children: [
					{
						path: 'profile',
						breadcrumbName: '人才库',
						component: { render: (h) => h('router-view') },
						meta: {
							id: v4(),
							protected: true,
							title: '人才库',
							authCode: null,
							keepAlive: false
						},
						children: [
							{
								path: '',
								name: 'TalentProfile',
								component: () =>
									import('../views/dashboard/talentCenter/Profile.vue'),
								meta: {
									id: v4(),
									protected: true,
									title: '人才库',
									authCode: 'rczx-rck',
									keepAlive: true,
									domTitle: '人才库 | 招聘管理系统'
								},
							},
							{
								path: 'detail',
								breadcrumbName: '人才详情',
								component: () =>
									import('../views/dashboard/talentCenter/ProfileDetail.vue'),
								meta: {
									id: v4(),
									protected: true,
									title: '人才详情',
									hide: true,
									keepAlive: false
								}
							},
							{
								path: 'upload',
								name: 'ProfileUpload',
								breadcrumbName: '简历上传',
								component: () =>
									import('../views/dashboard/talentCenter/profile/ProfileUpload.vue'),
								meta: {
									id: v4(),
									protected: true,
									hide: true,
									title: '简历上传',
									keepAlive: false,
									domTitle: '上传简历 | 招聘管理系统'
								}
							},
						]
					},
					// {
					// 	path: 'abnormal-profile',
					// 	breadcrumbName: '异常简历',
					// 	component: () =>
					// 		import('../views/dashboard/talentCenter/AbnormalProfile.vue'),
					// 	meta: {
					// 		id: v4(),
					// 		protected: true,
					// 		title: '异常简历',
					// 		authCode: null
					// 	},
					// 	children: [
					// 		{
					// 			path: '',
					// 			name: 'AbnormalProfile',
					// 			component: () =>
					// 				import('../views/dashboard/talentCenter/AbnormalProfile.vue'),
					// 			meta: {
					// 				id: v4(),
					// 				protected: true,
					// 				title: '异常简历',
					// 				authCode: 'rczx-ycjl'
					// 			},
					// 		},
					// 		{
					// 			path: 'detail',
					// 			breadcrumbName: '人才详情',
					// 			component: () =>
					// 				import('../views/dashboard/talentCenter/ProfileDetail.vue'),
					// 			meta: {
					// 				id: v4(),
					// 				protected: true,
					// 				title: '人才详情',
					// 				hide: true
					// 			}
					// 		},
					// 	]
					// },
					{
						path: 'profile-detail',
						name: 'TalentProfileDetail',
						breadcrumbName: '人才详情',
						component: () =>
							import('../views/dashboard/talentCenter/ProfileDetail.vue'),
						meta: {
							id: v4(),
							protected: true,
							title: '人才详情',
							hide: true,
							keepAlive: false
						}
					},
					{
						path: 'profile-edit',
						name: 'TalentProfileEdit',
						breadcrumbName: '编辑简历',
						component: () =>
							import('../views/dashboard/talentCenter/ProfileEdit.vue'),
						meta: {
							id: v4(),
							protected: true,
							hide: true,
							title: '编辑简历',
							keepAlive: false
						}
					},
					{
						path: 'importExport',
						name: 'ImportExport',
						breadcrumbName: '导入记录',
						component: () =>
							import('../views/dashboard/talentCenter/ImportExport.vue'),
						meta: {
							id: v4(),
							protected: true,
							title: '导入记录',
							authCode: 'rczx-drdc',
							keepAlive: true,
							domTitle: '导入记录 | 招聘管理系统'
						},
					},
				]
			},
			{
				path: 'user-center',
				name: 'UserCenter',
				breadcrumbName: '个人中心',
				component: () => import('../views/dashboard/UserCenter'),
				meta: {
					id: v4(),
					protected: true,
					icon: 'user',
					title: '个人中心',
					hide: true,
					keepAlive: false
				}
			},
			{
				path: 'department',
				name: 'department',
				breadcrumbName: '招聘管理',
				component: { render: h => h('router-view') },
				meta: {
					id: v4(),
					protected: true,
					icon: 'audit',
					title: "招聘管理",
					authCode: 'zpgl',
					keepAlive: false
				},
				children: [
					{
						path: 'task-center',
						breadcrumbName: '任务中心',
						component: { render: (h) => h('router-view') },
						meta: {
							id: v4(),
							protected: false,
							title: '任务中心',
							authCode: 'zpgl-rwzx',
							hide: false,
							keepAlive: false
						},
						children: [
							{
								path: '',
								name: 'taskCenter',
								component: TaskCenter,
								meta: {
									id: v4(),
									protected: false,
									title: '任务中心',
									hide: false,
									keepAlive: false
								}
							},
							{
								path: 'checkInfo',
								name: 'CheckInfo',
								breadcrumbName: '查看需求',
								component: () =>
									import(
										'../views/dashboard/demand/department/CheckInfo.vue'
									),
								meta: {
									id: v4(),
									protected: false,
									title: '查看需求',
									hide: true,
									keepAlive: false
								}
							},

						]
					},
			
					{
						path: 'Position',
						name: 'Position',
						breadcrumbName: '职位',
						component: { render: (h) => h('router-view') },
						meta: {
							id: v4(),
							protected: true,
							title: '职位',
							authCode: 'zpgl-zw',
							keepAlive: false
						},
						children: [
							{
								path: '',
								name: 'Positon',
								component: () => import('../views/dashboard/demand/Position.vue'),
								meta: {
									id: v4(),
									protected: false,
									title: '职位',
									authCode: 'zpgl-zw',
									keepAlive: false,
									domTitle: '职位 | 招聘管理系统'
								}
							},
							
							{
								path: 'mateResume',
								name: 'MateResume',
								breadcrumbName: '匹配简历',
								component: () =>
									import(
										'../views/dashboard/demand/department/MateResume.vue'
									),
								meta: {
									id: v4(),
									protected: false,
									title: '匹配简历',
									hide: true,
									keepAlive: false,
									domTitle: '简历匹配 | 招聘管理系统'
								}
							},
						]
					},
					{
						path: 'candidate',
						name: 'Candidate',
						breadcrumbName: '候选人管理',
						component: { render: (h) => h('router-view') },
						meta: {
							id: v4(),
							protected: false,
							title: '候选人管理',
							authCode: 'zpgl-hxrgl',
							keepAlive: false
						},
						children: [
							{
								path: '',
								name: 'Candidate',
								breadcrumbName: '候选人管理',
								component: () => import('../views/dashboard/demand/Candidate'),
								meta: {
									id: v4(),
									protected: false,
									title: '候选人管理',
									authCode: 'zpgl-hxrgl',
									keepAlive: false,
									domTitle: '候选人管理 | 招聘管理系统'
								},
							},
							{
								path: 'operation',
								name: 'Operation',
								breadcrumbName: '候选人面板',
								component: () =>
									import(
										'../views/dashboard/demand/candidate/CandidateOperation.vue'
									),
								meta: {
									id: v4(),
									protected: false,
									title: '候选人管理面板',
									hide: true,
									keepAlive: false,
									domTitle: '候选人管理面板 | 招聘管理系统'
								}
							}
						]
					},
					{
						path: 'demandCopyInfoEdit',
						name: 'demandCopyInfoEdit',
						breadcrumbName: '需求信息变更',
						component: () =>
							import(
								'../views/dashboard/demand/branchHC/DemandInfoCopyEdit.vue'
							),
						meta: {
							id: v4(),
							protected: false,
							title: '需求信息变更',
							hide: true,
							keepAlive: false,
							domTitle: '变更需求	 | 招聘管理系统'
						}
					},
					{
						path: 'demandCopyInfo',
						name: 'DemandCopyInfo',
						breadcrumbName: '需求信息',
						component: () =>
							import(
								'../views/dashboard/demand/branchHC/DemandInfoCopy.vue'
							),
						meta: {
							id: v4(),
							protected: false,
							title: '需求信息',
							hide: true,
							keepAlive: false,
							domTitle: '复制需求 | 招聘管理系统'
						}
					},
					{
						path: 'demandInfo',
						name: 'DemandInfo',
						breadcrumbName: '需求信息',
						component: () =>
							import(
								'../views/dashboard/demand/branchHC/DemandInfo.vue'
							),
						meta: {
							id: v4(),
							protected: false,
							title: '需求信息',
							hide: true,
							keepAlive: false,
							domTitle: '新增需求 | 招聘管理系统'
						}
					},
					{
						path: 'mateAction',
						name: 'MateAction',
						breadcrumbName: '操作',
						component: () =>
							import(
								'../views/dashboard/demand/department/MateAction.vue'
							),
						meta: {
							id: v4(),
							protected: false,
							title: '操作',
							hide: true,
							keepAlive: false,
							domTitle: '候选人 | 招聘管理系统'
						}
					},
				]
			},
			{
				path: 'Demand',
				name: 'Demand',
				breadcrumbName: '需求中心',
				component: { render: h => h('router-view') },
				meta: {
					id: v4(),
					protected: true,
					icon: 'appstore',
					title: '需求中心',
					authCode: 'xqzx',
					keepAlive: false
				},
				children: [
					{
						path: 'branch',
						breadcrumbName: '需求部门',
						component: { render: h => h('router-view') },
						meta: {
							id: v4(),
							protected: true,
							title: '需求部门',
							authCode: 'xqzx-xqbm',
							keepAlive: false
						},
						children: [
							{
								path: '',
								name: 'Branch',
								component: Branch,
								meta: {
									id: v4(),
									protected: false,
									title: '需求部门',
									keepAlive: false,
									domTitle: '需求部门 | 招聘管理系统'
								}
							},
							{
								path: 'organize',
								name: 'Organize',
								breadcrumbName: '组织结构',
								component: Organize,
								meta: {
									id: v4(),
									protected: false,
									title: '组织结构',
									hide: true,
									keepAlive: false,
									domTitle: '组织结构 | 招聘管理系统'
								}
							},
							{
								path: 'Manage',
								name: 'Manage',
								breadcrumbName: '成员管理',
								component: Manage,
								meta: {
									id: v4(),
									protected: false,
									title: '成员管理',
									hide: true,
									keepAlive: false,
									domTitle: '成员管理 | 招聘管理系统'
								}
							},
						]
					},
					{
						path: 'hc',
						name: 'HC',
						breadcrumbName: '部门HC',
						component: { render: (h) => h('router-view') },
						meta: {
							id: v4(),
							protected: false,
							title: '部门HC',
							authCode: 'xqzx-bmhc',
							keepAlive: false
						},
						children: [
							{
								path: '',
								name: 'HC',
								breadcrumbName: '部门HC',
								component: HC,
								meta: {
									id: v4(),
									protected: false,
									title: '部门HC',
									authCode: 'xqzx-bmhc',
									keepAlive: false
								}
							},
							{
								path: 'demandDetails',
								name: 'DemandDetails',
								breadcrumbName: '需求详情',
								component: () =>
									import(
										'../views/dashboard/demand/branchHC/DemandDetails.vue'
									),
								meta: {
									id: v4(),
									protected: false,
									title: '需求详情',
									hide: true,
									keepAlive: false
								}
							},

						]
					},

					{
						path: 'demandContent',
						name: 'DemandContent',
						breadcrumbName: '需求内容',
						component: () =>
							import(
								'../views/dashboard/demand/branchHC/DemandContent.vue'
							),
						meta: {
							id: v4(),
							protected: false,
							title: '需求内容',
							hide: true,
							keepAlive: false
						}
					},
					{
						path: 'demandReview',
						name: 'DemandReview',
						breadcrumbName: '需求分配',
						component: () =>
							import(
								'../views/dashboard/demand/branchHC/DemandNewReview.vue'
							),
						meta: {
							id: v4(),
							protected: false,
							title: '需求分配',
							hide: true,
							keepAlive: false
						}
					},


					{
						path: 'demandCopyContent',
						name: 'DemandCopyContent',
						breadcrumbName: '需求内容',
						component: () =>
							import(
								'../views/dashboard/demand/branchHC/DemandContentCopy.vue'
							),
						meta: {
							id: v4(),
							protected: false,
							title: '需求内容',
							hide: true,
							keepAlive: false
						}
					},
					// {
					// 	path: 'demandTrack',
					// 	name: 'DemandTrack',
					// 	breadcrumbName: '需求跟踪',
					// 	component: () =>
					// 		import(
					// 			'../views/dashboard/demand/branchHC/DemandTrack.vue'
					// 		),
					// 	meta: {
					// 		id: v4(),
					// 		protected: false,
					// 		title: '需求跟踪',
					// 		hide: true
					// 	}
					// },
					// {
					// 	path: 'operation',
					// 	name: 'Operation',
					// 	breadcrumbName: '候选人面板',
					// 	component: () =>
					// 		import(
					// 			'../views/dashboard/demand/candidate/CandidateOperation.vue'
					// 		),
					// 	meta: {
					// 		id: v4(),
					// 		protected: false,
					// 		title: '候选人管理面板',
					// 		hide: true
					// 	}
					// }
				]
			},
			{
				path: 'statistical',
				name: 'Statistical',
				breadcrumbName: '统计报表',
				component: { render: h => h('router-view') },
				meta: {
					id: v4(),
					protected: true,
					icon: 'bar-chart',
					title: '统计报表',
					isDropMenu: true,
					authCode: 'statistical',
					keepAlive: false
				},
				children: [
					{
						path: 'recruit-statistical',
						name: 'RecruitStatistical',
						breadcrumbName: '招聘人员产能',
						component: () =>
							import('../views/dashboard/statistical/RecruitStatistical.vue'),
						meta: {
							id: v4(),
							protected: true,
							title: '招聘人员产能',
							authCode: 'statistical-recruit',
							keepAlive: false,
							domTitle: '招聘人员产能 | 招聘管理系统'
						},
					},
					{
						path: 'branch-statistical',
						name: 'BranchStatistical',
						breadcrumbName: '部门满足情况',
						component: () =>
							import('../views/dashboard/statistical/BranchStatistical.vue'),
						meta: {
							id: v4(),
							protected: true,
							title: '部门满足情况',
							authCode: 'statistical-branch',
							keepAlive: false,
							domTitle: '部门满足情况 | 招聘管理系统'
						},
					},
					{
						path: 'statistical-recruit-all',
						name: 'statistical-recruit-all',
						breadcrumbName: '招聘人员产能--总',
						component: () => import('../views/dashboard/statistical/RecruitersCapacityAll.vue'),
						meta: {
							id: v4(),
							protected: true,
							title: '招聘人员产能--总',
							authCode: 'statistical-admin-all',
							keepAlive: false,
							domTitle: '招聘人员产能--总 | 招聘管理系统'
						}
					},
					{
						path: 'branch-statistical-all',
						name: 'BranchStatisticalAll',
						breadcrumbName: '部门满足情况--总',
						component: () => import('../views/dashboard/statistical/BranchStatisticalAll.vue'),
						meta: {
							id: v4(),
							protected: true,
							title: '部门满足情况--总',
							authCode: 'statistical-dep-all',
							keepAlive: false,
							domTitle: '部门满足情况--总 | 招聘管理系统'
						}
					},
					{
						path: 'proceed-statistical',
						name: 'ProceedStatistical',
						breadcrumbName: '招聘进展统计表',
						component: () =>
						import('../views/dashboard/statistical/ProceedStatistical.vue'),
						meta: {
							id: v4(),
							protected: true,
							title: '招聘进展统计表',
							authCode: 'statistical-proceed',
							keepAlive: false,
							domTitle: '招聘进展统计表 | 招聘管理系统'
						},
					},
					{
						path: 'position-statistical',
						name: 'PositionStatistical',
						breadcrumbName: '职位统计表',
						component: () =>
							import('../views/dashboard/statistical/PositionStatistical.vue'),
						meta: {
							id: v4(),
							protected: true,
							title: '职位统计表',
							authCode: 'statistical-position',
							keepAlive: false,
							domTitle: '职位统计表 | 招聘管理系统'
						},
					},
					{
						path: 'cand-statistical',
						name: 'CandStatistical',
						breadcrumbName: '候选人统计表',
						component: () =>
							import('../views/dashboard/statistical/CandStatistical.vue'),
						meta: {
							id: v4(),
							protected: true,
							title: '候选人统计表',
							authCode: 'statistical-cand',
							keepAlive: false,
							domTitle: '候选人统计表 | 招聘管理系统'
						},
					},
					{
						path: 'entry-statistical',
						name: 'EntryStatistical',
						breadcrumbName: '入职统计表',
						component: () =>
							import('../views/dashboard/statistical/EntryStatistical.vue'),
						meta: {
							id: v4(),
							protected: true,
							title: '入职统计表',
							authCode: 'statistical-entry',
							keepAlive: false,
							domTitle: '入职统计表 | 招聘管理系统'
						},
					},
					{
						path: 'account-statistical',
						name: 'AccountStatistical',
						breadcrumbName: '面试台账',
						component: () =>
							import('../views/dashboard/statistical/AccountStatistical.vue'),
						meta: {
							id: v4(),
							protected: true,
							title: '面试台账',
							authCode: 'statistical-account',
							keepAlive: false,
							domTitle: '面试台账 | 招聘管理系统'
						},
					},
					{
						path: 'demand-statistical',
						name: 'DemandStatistical',
						breadcrumbName: '需求台账',
						component: () =>
							import('../views/dashboard/statistical/DemandStatistical.vue'),
						meta: {
							id: v4(),
							protected: true,
							title: '需求台账',
							authCode: 'statistical-demand',
							keepAlive: false,
							domTitle: '需求台账 | 招聘管理系统'
						},
					},
				]
			},
			{
				path: 'manage',
				name: 'manage',
				breadcrumbName: '人员管理',
				component: { render: h => h('router-view') },
				meta: {
					id: v4(),
					protected: true,
					icon: 'user',
					title: '人员管理',
					authCode: 'rygl',
					keepAlive: false
				},
				children: [
					{
						path: 'organizeManage',
						breadcrumbName: '组织管理',
						component: { render: (h) => h('router-view') },
						meta: {
							id: v4(),
							protected: true,
							title: '组织管理',
							authCode: 'rygl-zzgl',
							keepAlive: false
						},
						children: [
							{
								path: '',
								name: 'organizeManage',
								component: () =>
									import(
										'../views/dashboard/manage/Orgenazition'
									),
								meta: {
									id: v4(),
									protected: false,
									title: '组织管理',
									keepAlive: false,
									domTitle: '组织管理 | 招聘管理系统'
								}
							},
							{
								path: 'structure',
								name: 'structure',
								breadcrumbName: '组织结构',
								component: () =>
									import(
										'../views/dashboard/manage/orgenaziton/Organize.vue'
									),
								meta: {
									id: v4(),
									protected: false,
									title: '组织结构',
									hide: true,
									keepAlive: false,
									domTitle: '组织结构 | 招聘管理系统'
								}
							},
							{
								path: 'Member',
								name: 'Member',
								breadcrumbName: '成员管理',
								component: () =>
									import(
										'../views/dashboard/manage/orgenaziton/Member.vue'
									),
								meta: {
									id: v4(),
									protected: false,
									title: '成员管理',
									hide: true,
									keepAlive: false,
									domTitle: '成员管理 | 招聘管理系统'
								}
							},
						]
					},
					{
						path: 'resource',
						name: 'resourceManage',
						breadcrumbName: '资源管理',
						component: () =>
							import(
								'../views/dashboard/manage/ResourceManage.vue'
							),
						meta: {
							id: v4(),
							protected: true,
							title: '资源管理',
							authCode: 'rygl-zygl',
							keepAlive: false,
							domTitle: '资源管理 | 招聘管理系统'
						}
					},
					{
						path: 'role',
						name: 'roleManage',
						breadcrumbName: '角色管理',
						component: () =>
							import('../views/dashboard/manage/RoleManage.vue'),
						meta: {
							id: v4(),
							protected: true,
							title: '角色管理',
							authCode: 'rygl-jsgl',
							keepAlive: false,
							domTitle: '角色管理 | 招聘管理系统'
						}
					},
				]
			},

			{
				path: 'settings',
				name: 'Settings',
				breadcrumbName: '设置',
				component: { render: h => h('router-view') },
				meta: {
					id: v4(),
					protected: true,
					icon: 'setting',
					title: '设置',
					isDropMenu: true,
					authCode: 'settings'
				},
				children: [
					{
						path: 'template-settings',
						breadcrumbName: '模板设置',
						component: { render: h => h('router-view') },
						meta: {
							id: v4(),
							protected: true,
							title: '模板设置',
							authCode: 'settings-template',
							keepAlive: false
						},
						children: [
							{
								path: "",
								name: "TemplateSettings",
								component: () => import('../views/dashboard/settings/TemplateSettings.vue'),
								meta: {
									id: v4(),
									protected: true,
									title: '模板设置',
									authCode: 'settings-template',
									domTitle: '模板设置 | 招聘管理系统'
								},
							},
							{
								path: 'add-template',
								name: 'AddTemplate',
								breadcrumbName: '新增模板',
								component: () =>
									import('../views/dashboard/settings/AddTemplate.vue'),
								meta: {
									id: v4(),
									protected: true,
									title: '新增模板',
									hide: true,
									keepAlive: false,
									domTitle: '新增模板 | 招聘管理系统'
								},
							},
							{
								path: 'edit-template',
								name: 'EditTemplate',
								breadcrumbName: '编辑模板',
								component: () =>
									import('../views/dashboard/settings/EditTemplate.vue'),
								meta: {
									id: v4(),
									protected: true,
									title: '编辑模板',
									hide: true,
									keepAlive: false,
									domTitle: '编辑模板 | 招聘管理系统'
								},
							},
						]
					},
					{
						path: 'resume-settings',
						name: 'ResumeSettings',
						breadcrumbName: '简历设置',
						component: () =>
							import('../views/dashboard/settings/ResumeSettings.vue'),
						meta: {
							id: v4(),
							protected: true,
							title: '简历设置',
							authCode: 'settings-resume',
							keepAlive: false,
							domTitle: '简历设置 | 招聘管理系统'
						},
					},
					{
						path: 'city-settings',
						name: 'CitySettings',
						breadcrumbName: '面试地点',
						component: () =>
							import('../views/dashboard/settings/CitySettings.vue'),
						meta: {
							id: v4(),
							protected: true,
							title: '面试地点',
							authCode: 'settings-city',
							keepAlive: false,
							domTitle: '面试地点 | 招聘管理系统'
						},
					},
					{
						path: 'organsize-settings',
						name: 'OrgansizeSettings',
						breadcrumbName: '组织设置',
						component: () =>
							import('../views/dashboard/settings/OrgansizeSettings.vue'),
						meta: {
							id: v4(),
							protected: true,
							title: '组织设置',
							authCode: "settings-zzsz",
							keepAlive: false,
							domTitle: '组织设置 | 招聘管理系统'
						},

					}
					// {
					// 	path: 'add-template',
					// 	name: 'AddTemplate',
					// 	breadcrumbName: '新增模板',
					// 	component: () =>
					// 		import('../views/dashboard/settings/AddTemplate.vue'),
					// 	meta: {
					// 		id: v4(),
					// 		protected: true,
					// 		title: '新增模板',
					// 		hide: true,
					// 	},
					// },
					// {
					// 	path: 'edit-template',
					// 	name: 'EditTemplate',
					// 	breadcrumbName: '编辑模板',
					// 	component: () =>
					// 		import('../views/dashboard/settings/EditTemplate.vue'),
					// 	meta: {
					// 		id: v4(),
					// 		protected: true,
					// 		title: '编辑模板',
					// 		hide: true,
					// 	},
					// },
				]
			},

			// {
			// 	id: v4(),
			// 	path: '*',
			// 	name: 'DashboardPageNotFound',
			// 	component: PageNotFound,
			// 	meta: {
			// 		protected: false,
			// 		hide: true
			// 	}
			// }
		]
	},
	{
		path: '/login',
		name: 'Login',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "about" */ '../views/Login.vue'),
		meta: {
			protected: false
		}
	},
	{
		path: '*',
		name: 'PageNotFound',
		component: PageNotFound
	}
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});

router.beforeEach((to, _, next) => {
	// console.log(to)
	if (to.meta.domTitle) {
		// let title = document.querySelector('title')
		// title.innerHTML = to.meta.domTitle
		document.title = to.meta.domTitle
	} else {
		// let title = document.querySelector('title')
		// title.innerHTML = '招聘管理系统'
		document.title = '招聘管理系统'
	}
	// 跳转的路由是否需要保护
	if (to.meta.protected) {
		// 当前用户是否已经登录
		if (store.state.auth.token) {
			// 当前用户是否有跳转页面的权限
			if (canIUse({ code: to.meta.authCode })) {
				next();
			} else {
				next();
			}
		} else {
			next({ name: 'Login' });
		}
	} else {
		next();
	}
	// if(to.meta.title){
	// 	document.title = to.meta.title
	// }
	// next()
});
export default router;

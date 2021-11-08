
const state = {
  // 行业类型
  industryTypes: [
    { label: '默认', value: 0 }
  ],
  // 需求部门资源库类型
  resourceTypes: [
    { label: '默认', value: 0 }
  ],
  // 部门HC查询页状态
  HCQueryTypes: [
    { label: '待拆分', value: 0 },
    { label: '待审批', value: 1 },
    { label: '进行中', value: 2 },
    { label: '已暂停', value: 3 },
    { label: '待分配', value: 4 },
    { label: '已关闭', value: 7 },
    { label: '已完成', value: 9 },
  ],
  // 紧急程度
  emergencyLevels: [
    { label: '一般', value: 1 },
    { label: '紧急', value: 2 },
    { label: '特急', value: 3 },
  ],
  // 职位性质
  jobTypes: [
    { label: '全职', value: 1 },
    { label: '兼职', value: 2 },
    { label: '实习', value: 3 },
  ],
  // 工作经验年限
  jobExperiences: [
    { label: '无经验', value: 1 },
    { label: '一年以下', value: 2 },
    { label: '1-3年', value: 3 },
    { label: '3-5年', value: 4 },
    { label: '5-10年', value: 5 },
    { label: '10年以上', value: 6 },
  ],
  // 学历要求
  educationRequires: [
    { label: '无', value: 0 },
    { label: '初中', value: 1 },
    { label: '高中', value: 2 },
    { label: '中技', value: 3 },
    { label: '中专', value: 4 },
    { label: '大专', value: 5 },
    { label: '本科', value: 6 },
    { label: '硕士', value: 7 },
    { label: '博士', value: 8 },
    { label: '博士后', value: 9 },
  ],
  // 部门HC资源库类型
  HCResourceTypes: [
    { label: '默认', value: 0 }
  ],
  // 提醒与通知
  notificationTypes: [
    { label: '不提醒', value: 1 },
    { label: '短信', value: 2 },
    { label: '邮件', value: 3 },
  ],
  isBlacklistArr: [
    { label: '全部', value: 2 },
    { label: '正常', value: 0 },
    { label: '黑名单', value: 1 },
  ],
  // 是否通过审核
  approvalTypes: [
    { label: '否', value: 0 },
    { label: '是', value: 1 },
  ],
  // 招聘管理查询页状态
  // recruitQueryTypes: [
  //   { label: '在招', value: 1 },
  //   { label: '暂停', value: 3 },
  //   { label: '下线', value: 9 },
  // ],
  recruitQueryTypes: [
    { label: '在招', value: 1 },
    { label: '下线', value: 2 },
    { label: '暂停', value: 3 },
    { label: '待发布', value: 4 },
    
  ],
  // 操作页流程
  operationProcesses: [
    { label: '简历匹配', value: 0 },
    { label: '面试官筛选', value: 1 },
    { label: '预约面试', value: 2 },
    // { label: '面试邀约', value: 3 },
    { label: 'offer', value: 4 },
    { label: '入职确认', value: 5 },
    // { label: '已入职', value: 6 },
    { label: '上岗', value: 9 },
  ],
  // 操作页状态
  operationTypes: [
    { label: '(简历初选)通过', value: 10 },
    { label: '(简历初选)淘汰', value: 11 },
    { label: '(简历筛选)通过', value: 20 },
    { label: '(简历初选)淘汰', value: 21 },
    { label: '(面试邀约)成功', value: 30 },
    { label: '(面试邀约)失败', value: 31 },
    { label: '(面试)通过', value: 40 },
    { label: '(面试)淘汰', value: 41 },
    { label: '(offer)成功', value: 50 },
    { label: '(offer)放弃', value: 51 },
    { label: '(入职)成功', value: 60 },
    { label: '(入职)放弃', value: 61 },
  ],
  staticalStatus: [
    { label: '简历匹配', value: 0 },
    // { label: '简历初选', value: 1 },
    // { label: '简历筛选', value: 2 },
    // { label: '面试邀约', value: 3 },
    // { label: '面试', value: 4 },
    // { label: 'Offer', value: 5 },
    // { label: '入职', value: 6 },
    // { label: '上岗', value: 9 },
    { label: '(简历初选)通过', value: 10 },
    { label: '(简历初选)淘汰', value: 11 },
    { label: '(简历筛选)通过', value: 20 },
    { label: '(简历初选)淘汰', value: 21 },
    { label: '(面试邀约)成功', value: 30 },
    { label: '(面试邀约)失败', value: 31 },
    { label: '(面试)通过', value: 40 },
    { label: '(面试)淘汰', value: 41 },
    { label: '(offer)成功', value: 50 },
    { label: '(offer)放弃', value: 51 },
    { label: '(入职)成功', value: 60 },
    { label: '(入职)放弃', value: 61 },
  ],
  commentTypes: [
    { label: '待评价', value: 30 },
    { label: '面试通过', value: 40 },
    { label: '面试淘汰', value: 41 },
  ],
  selectionTypes: [
    { label: '待筛选', value: 10 },
    { label: '筛选通过', value: 20 },
    { label: '筛选淘汰', value: 21 },
  ],
  interviewTypes: [
    { label: '到场面试', value: 1 },
    { label: '电话面试', value: 2 },
    { label: '视频面试', value: 3 },
  ],
  notifyInterviewer: [
    { label: '不通知', value: 1 },
    { label: '电话通知', value: 2 },
    { label: '邮件通知', value: 3 },
  ],
  rankList: ['1','2','2.1','2.2','2.3','3','3.1','3.2','3.3'],
  rankOfferList: ['P1-1','P1-2','P1-3','P2-1','P2-2','P2-3','P3-1','P3-2','P3-3','P4-1','P4-2','P4-3','P5','P5-1','P5-2','P5-3','P6','P6-1','P6-2','P6-3','P6-4'],
  notifyCandidate: [
    { label: '不通知', value: 1 },
    { label: '电话通知', value: 2 },
    { label: '邮件通知', value: 3 },
  ],
  hasCallback: [
    { label: '否', value: 0 },
    { label: '是', value: 1 },
  ],
  interviewResults: [
    { label: '直接通过', value: 1 },
    { label: '通过，进入复试', value: 2 },
    { label: '淘汰', value: 3 },
  ],
  interviewList: [
    // { label: '直接通过', value: 1 },
    { label: '通过', value: 2 },
    { label: '淘汰', value: 3 },
  ],
  suspendReason: [
    { label: '需求已满足', value: 1 },
    { label: '剩余需求已有他方满足', value: 2 },
    { label: '暂停招聘', value: 3 },
  ],
  abnormalClose: [
    { label: '他方满足', value: '他方满足' },
    { label: '异常关闭', value: '异常关闭' },
  ],
  candidateProcesses: [
    { label: '简历匹配', value: 0 },
    { label: '邀约中', value: 20 },
    { label: '面试中', value: 30 },
    { label: '面试通过', value: 40 },
    { label: '待入职', value: 50 },
    { label: '已入职', value: 60 },
    { label: '淘汰', value: 7 },
  ],
  resumeBelong: [
    { label: '我导入的', value: 1 },
    { label: '我锁定的', value: 2 },
  ],
  genders: [
    { label: '男', value: 0 },
    { label: '女', value: 1 },
    { label: '保密', value: 2 },
  ],
  marriageStatus: [
    { label: '未婚', value: 0 },
    { label: '已婚', value: 1 },
    { label: '保密', value: 2 },
  ],
  resourcePowerList: [
    { label: '公司权限', value: 1 },
    { label: '部门权限', value: 2 },
    { label: '个人权限', value: 3 }
  ],
  // 面试结果
  resultList: [
    { label: '通过', value: 40 },
    { label: '未通过', value: 41 },
    { label: '待面试', value: 30 },
    { label: '邀约失败', value: 31 }
  ],
  organizeList: [
    { label: '目录', value: 0 },
    { label: '按钮', value: 1 }
  ],
  majorTypes: [
    {
      label: '工科类',
      value: 1,
      parent: 0,
      children: [
        { label: '电气信息类', value: 9, parent: 1 },
        { label: '地矿类', value: 11, parent: 1 },
        { label: '材料类', value: 12, parent: 1 },
        { label: '机械类', value: 13, parent: 1 },
        { label: '仪器仪表类', value: 14, parent: 1 },
        { label: '能源动力类', value: 15, parent: 1 },
        { label: '土建类', value: 16, parent: 1 },
        { label: '水利类', value: 17, parent: 1 },
        { label: '测绘类', value: 18, parent: 1 },
        { label: '环境与安全类', value: 19, parent: 1 },
        { label: '化工与制药类', value: 20, parent: 1 },
        { label: '交通运输类', value: 21, parent: 1 },
        { label: '海洋工程类', value: 22, parent: 1 },
        { label: '轻工纺织食品类', value: 23, parent: 1 },
        { label: '航空航天类', value: 24, parent: 1 },
        { label: '武器类', value: 25, parent: 1 },
        { label: '工程力学类', value: 26, parent: 1 },
        { label: '生物工程类', value: 27, parent: 1 },
        { label: '农业工程类', value: 28, parent: 1 },
        { label: '林业工程类', value: 29, parent: 1 },
        { label: '公安技术类', value: 30, parent: 1 },
      ]
    },
    {
      label: '理科类',
      value: 2,
      parent: 0,
      children: [
        { label: '数学类', value: 31, parent: 2 },
        { label: '物理学类', value: 32, parent: 2 },
        { label: '化学类', value: 33, parent: 2 },
        { label: '生物科学类', value: 34, parent: 2 },
        { label: '天文学类', value: 35, parent: 2 },
        { label: '地质学类', value: 36, parent: 2 },
        { label: '地理科学类', value: 37, parent: 2 },
        { label: '地球物理学类', value: 38, parent: 2 },
        { label: '大气科学类', value: 39, parent: 2 },
        { label: '海洋科学类', value: 40, parent: 2 },
        { label: '力学类', value: 41, parent: 2 },
        { label: '电子信息科学类', value: 42, parent: 2 },
        { label: '材料科学类', value: 43, parent: 2 },
        { label: '环境科学类', value: 44, parent: 2 },
        { label: '心理学类', value: 45, parent: 2 },
        { label: '统计学类', value: 46, parent: 2 },
      ]
    },
    {
      label: '农学类',
      value: 3,
      parent: 0,
      children: [
        { label: '植物生产类', value: 47, parent: 3 },
        { label: '草业科学类', value: 48, parent: 3 },
        { label: '森林资源类', value: 49, parent: 3 },
        { label: '环境生态类', value: 50, parent: 3 },
        { label: '动物生产类', value: 51, parent: 3 },
        { label: '动物医学类', value: 52, parent: 3 },
        { label: '水产类', value: 53, parent: 3 },
      ]
    },
    {
      label: '医学类',
      value: 4,
      parent: 0,
      children: [
        { label: '基础医学类', value: 54, parent: 4 },
        { label: '预防科学类', value: 55, parent: 4 },
        { label: '临床医学与医学技术类', value: 56, parent: 4 },
        { label: '口腔医学类', value: 57, parent: 4 },
        { label: '中医学类', value: 58, parent: 4 },
        { label: '法医学类', value: 59, parent: 4 },
        { label: '护理学类', value: 60, parent: 4 },
        { label: '药学类', value: 61, parent: 4 },
      ]
    },
    {
      label: '管理类',
      value: 5,
      parent: 0,
      children: [
        { label: '管理科学与工程类', value: 62, parent: 5 },
        { label: '工商管理类', value: 63, parent: 5 },
        { label: '公共管理类', value: 64, parent: 5 },
        { label: '农业经济管理类', value: 65, parent: 5 },
        { label: '图书档案学类', value: 66, parent: 5 },
      ]
    },
    {
      label: '法学类',
      value: 6,
      parent: 0,
      children: [
        { label: '法学类', value: 67, parent: 6 },
        { label: '马克思主义理论类', value: 68, parent: 6 },
        { label: '社会学类', value: 69, parent: 6 },
        { label: '政治学类', value: 70, parent: 6 },
        { label: '公安学类', value: 71, parent: 6 },
      ]
    },
    {
      label: '文学类',
      value: 7,
      parent: 0,
      children: [
        { label: '中国语言文学类', value: 72, parent: 7 },
        { label: '外国语言文学类', value: 73, parent: 7 },
        { label: '新闻传播学类', value: 74, parent: 7 },
        { label: '艺术类', value: 75, parent: 7 },
      ]
    },
    {
      label: '其他类',
      value: 8,
      parent: 0,
      children: [
        { label: '哲学类', value: 76, parent: 8 },
        { label: '经济学类', value: 77, parent: 8 },
        { label: '教育学类', value: 78, parent: 8 },
        { label: '体育学类', value: 79, parent: 8 },
        { label: '历史学类', value: 80, parent: 8 },
        { label: '未划分专业', value: 81, parent: 8 },
        { label: '其他类', value: 82, parent: 8 },
      ]
    },
  ],
  hasJob: [
    { label: '在职', value: 1 },
    { label: '离职', value: 2 },
  ],
  isBaideEmployee: [
    { label: '否', value: 0 },
    { label: '是', value: 1 },
  ],
  expectedSalaries: [
    { label: '1000~1500/月', value: 1 },
    { label: '1500~2000/月', value: 2 },
    { label: '2000~3000/月', value: 3 },
    { label: '3000~5000/月', value: 4 },
    { label: '5000~7500/月', value: 5 },
    { label: '7000~10000/月', value: 6 },
    { label: '10000~15000/月', value: 7 },
    { label: '15000以上/月', value: 8 },
    { label: '面议', value: 0 },
  ]
}

const getters = {
  getMajorValueArrayByChild: state => value => {
    if (value === undefined) {
      return [];
    } else {
      const majorTypes = state.majorTypes;
      const valueArray = [];
      const stack = [{ children: majorTypes }];
      while (stack.length > 0) {
        const current = stack.shift();
        if (current.value !== undefined) {
          valueArray.push(current.value);
        }
        if (current.value === value) {
          return valueArray;
        }

        const hasChildren = Array.isArray(current.children)
        let children
        if (hasChildren) {
          children = current.children
        } else {
          children = []
          if (current.isLast) {
            valueArray.pop();
            valueArray.pop();
          } else {
            valueArray.pop();
          }
        }

        for (const [index, child] of children.entries()) {
          if (index === 0) {
            stack.unshift({ ...child, isLast: true });
          } else {
            stack.unshift(child);
          }
        }
      }
      return [];
    }
  },
  getMajorTitle: state => value => {
    if (value === undefined) {
      return '暂无';
    } else {
      const majorTypes = state.majorTypes;
      const stack = [{ children: majorTypes }];
      while (stack.length > 0) {
        const current = stack.shift();
        if (current.value === value) {
          return current.label;
        }

        const hasChildren = Array.isArray(current.children)
        let children
        if (hasChildren) {
          children = current.children
        } else {
          children = []
        }

        for (const child of children) {
          stack.unshift(child);
        }
      }
      return '暂无';
    }
  }
}

export default {
  namespaced: true,
  state,
  getters
}
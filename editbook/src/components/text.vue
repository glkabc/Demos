<template>
  <div class="container">
    <textarea cols="130" rows="30" v-model="message"></textarea>
    <!-- <textarea cols="130" rows="50" v-model="value"></textarea> -->
    <textarea cols="130" rows="50" v-model="dataMessage"></textarea>
  </div>
</template>

<script>
export default {
  name:  'Test',
  data() {
    return {
      dataMessage: '',
      message: '',
      value: `卫明
              30岁   |
              男   |
              大专   |
              3年经验

              15805601086   |
              zijie0524@163.com

              个人优势
              1.工作态度：敬业负责，踏实细致
              2.性格：性格随和，待人真诚、对工作有上进心、有很强的适应能力和团结精神、并能够很好地与同事相处，能主动加班，抗压能力较强，工作富有激情。
              3.沟通能力：有责任感，有较强的沟通协调能力，具有团队合作精神

              期望职位
              Java  合肥  8-10K  计算机软件·企业服务

              工作经历

                合肥华鹤信息科技有限公司
                Java | 技术研发部
              2018.04—至今
              内容：
              1、软件需求分析、功能分析、代码编写、测试
              2、软件过程文档、测试文档、功能文档撰写
              3、SVN搭建、维护
              4、服务器运行环境搭建、维护

              项目经历

                公司内部考试系统
                软件开发
              2020.03—2020.10
              描述：该项目是公司内部使用的考试系统，主要考察员工对相关技能掌握的情况，
              项目结构：
              ● 该项目服务端采用的是：SpringMVC 、Spring、Mybatis；
              ●  前端页面基于vue+Jquery+LayUi+Bootstrap搭建；
              ● 数据库：Mysql
              ● 使用工具：Eclipse、Apache-Tomcat8.0、jdk1.8、SVN、maven
              ● 项目模块：管理员系统（包括：员工管理、试题管理、试卷管理，考试管理、培训管理、）、员工考试系统（包括：员工个人信息管理、考试管理、培训管理、试题练习管理）。
              ● 独立负责该系统开发中的企业需求调研，文档的编写与整理，以及该项目的代码编写与测试。

                公司项目完工量项目
                软件开发
              2019.03—2020.01
              描述：公司项目的创建到结束过程信息统计追踪，
              项目的结构：
              ● 服务器端：SpringMVC+Spring+mybatis 框架，
              ● 数据库采用的是mysql数据，
              ● 前端页面基于vue+Jquery+LayUi+Bootstrap搭建
              ● 使用工具：Eclipse、windows、Mysql、Apache-Tomcat7.0、jdk1.7、SVN
              ● 项目模块：项目立项、工程优化、人员认证信息

                公司OA系统开发
                软件开发
              2018.04—2019.02
              描述：该项目是公司内部协同办公项目，
              项目结构：
              ● 该项目服务端使用的是SpringMVC+Spring+mybatis 框架，
              ● 数据库采用的是mysql数据，前端页面基于Jquery+LayUi+Bootstrap搭建
              ● 使用工具：Eclipse、windows、Mysql、Apache-Tomcat7.0、jdk1.7、SVN
              ● 项目模块：员工考勤登记、项目管理、质量安全、财务等模块
              ● 本人负责该系统开发中企业需求调研、需求文档的编写与整理，以及项目管理和质量安全模块的编写与测试

              教育经历

                合肥工业大学
                市场营销 | 大专
              2013—2015`
    }
  },
  mounted() {
    let data = {
      "Address":"",
      "AdvancedDegree":"",
      "Age":"30",
      "AimInstitution":"",
      "AimSalary":"",
      "AppLetter":"",
      "ArrEducationDetail":["2013 ~ 2015\u000d\u000a合肥工业大学\u000d\u000a市场营销 | 大专\u000d\u000a   "],
      "ArrExpericeneDetail":["2018-04 ~ 至今\u000d\u000a合肥华鹤信息科技有限公司\u000d\u000aJava | 技术研发部\u000d\u000a   \u000d\u000a内容：\u000d\u000a1、软件需求分析、功能分析、代码编写、测试\u000d\u000a2、软件过程文档、测试文档、功能文档撰写\u000d\u000a3、SVN搭建、维护\u000d\u000a4、服务器运行环境搭建、维护"],
      "ArrProjectDetail":["2020-03 ~ 2020-10\u000d\u000a公司内部考试系统\u000d\u000a软件开发\u000d\u000a   \u000d\u000a描述：该项目是公司内部使用的考试系统，主要考察员工对相关技能掌握的情况，\u000d\u000a项目结构：\u000d\u000a● 该项目服务端采用的是：SpringMVC 、Spring、Mybatis；\u000d\u000a● 前端页面基于vue+Jquery+LayUi+Bootstrap搭建；\u000d\u000a● 数据库：Mysql\u000d\u000a● 使用工具：Eclipse、Apache-Tomcat8.0、jdk1.8、SVN、maven\u000d\u000a● 项目模块：管理员系统(包括：员工管理、试题管理、试卷管理，考试管理、培训管理、)、员工考试系统(包括：员工个人信息管理、考试管理、培训管理、试题练习管理)。\u000d\u000a● 独立负责该系统开发中的企业需求调研，文档的编写与整理，以及该项目的代码编写与测试。\u000d\u000a",
      "2019-03 ~ 2020-01\u000d\u000a公司项目完工量项目\u000d\u000a软件开发   \u000d\u000a描述：公司项目的创建到结束过程信息统计追踪，\u000d\u000a项目的结构：\u000d\u000a● 服务器端：SpringMVC+Spring+mybatis 框架，\u000d\u000a● 数据库采用的是mysql数据，\u000d\u000a● 前端页面基于vue+Jquery+LayUi+Bootstrap搭建\u000d\u000a● 使用工具：Eclipse、windows、Mysql、Apache-Tomcat7.0、jdk1.7、SVN\u000d\u000a● 项目模块：项目立项、工程优化、人员认证信息\u000d\u000a",
      "2018-04 ~ 2019-02\u000d\u000a公司OA系统开发\u000d\u000a软件开发   \u000d\u000a描述：该项目是公司内部协同办公项目，\u000d\u000a项目结构：\u000d\u000a● 该项目服务端使用的是SpringMVC+Spring+mybatis 框架，\u000d\u000a● 数据库采用的是mysql数据，前端页面基于Jquery+LayUi+Bootstrap搭建\u000d\u000a● 使用工具：Eclipse、windows、Mysql、Apache-Tomcat7.0、jdk1.7、SVN\u000d\u000a● 项目模块：员工考勤登记、项目管理、质量安全、财务等模块\u000d\u000a● 本人负责该系统开发中企业需求调研、需求文档的编写与整理，以及项目管理和质量安全模块的编写与测试"],
      "ArrTrainingDetail":[],
      "Beginworktime":"2018-04",
      "Birth":"",
      "Brith":"",
      "Certificate":"",
      "Computer":"",
      "DoNotRecommend":"",
      "Education":"大专",
      "EducationDetail":"2013 ~ 2015\u000d\u000a合肥工业大学\u000d\u000a市场营销 | 大专\u000d\u000a   \u000d\u000a",
      "EducationInfo":[
        {
          "AdvancedDegree":"",
          "Department":"",
          "Education":"大专",
          "EndDate":"2015",
          "IsStudii":"",
          "Other":"",
          "School":"合肥工业大学",
          "SchoolLabel":"211 985 一流学科 一本",
          "SchoolType":"1",
          "Speciality":"市场营销",
          "StartDate":"2013",
          "StudentType":"",
          "Summary":""
        }
      ],
      "Email":"zijie0524@163.com",
      "Encouragement":"",
      "English":"",
      "Experience":"3",
      "ExperienceDetail":"2018-04 ~ 至今\u000d\u000a合肥华鹤信息科技有限公司\u000d\u000aJava | 技术研发部\u000d\u000a   \u000d\u000a内容：\u000d\u000a1、软件需求分析、功能分析、代码编写、测试\u000d\u000a2、软件过程文档、测试文档、功能文档撰写\u000d\u000a3、SVN搭建、维护\u000d\u000a4、服务器运行环境搭建、维护\u000d\u000a",
      "ExperienceInfo":[
        {
          "Achievement":"",
          "Company":"合肥华鹤信息科技有限公司",
          "CompanyDescription":"",
          "Department":"技术研发部",
          "Deponent":"",
          "EndDate":"至今",
          "IsStudii":"",
          "Leader":"",
          "Location":"",
          "Others":"",
          "PeriodsOfTime":"2年10个月",
          "ReasonOfLeaving":"",
          "Salary":"",
          "Size":"",
          "StartDate":"2018-04",
          "Summary":"Java,\u000d内容：\u000d1、软件需求分析、功能分析、代码编写、测试\u000d2、软件过程文档、测试文档、功能文档撰写\u000d3、SVN搭建、维护\u000d4、服务器运行环境搭建、维护",
          "Title":"SVN搭建、维护",
          "Type":"",
          "UnderlingNumber":"",
          "Vocation":"",
          "WorkType":"工作经历"
         }
      ],
      "FamilyName":"卫",
      "Fax":"",
      "Fertility":"",
      "ForwardVocation":"",
      "Forwardlocation":"安徽-合肥",
      "FromWebSite":"其他",
      "GradeOfEnglish":{"NameOfCertificate":"",
      "ReceivingDate":"",
      "Score":""},
      "GradeOfEnglishs":null,
      "Graduatetime":"2015",
      "High":"",
      "Href":"",
      "Hukou":"",
      "IDNO":"",
      "ITSkills":[],
      "Images":null,
      "Integrity":"19",
      "IssueDate":"",
      "Jiguan":"",
      "JobHoppingFrequency":8,
      "Keyword":"",
      "LanguagesSkills":null,
      "LastCompany":"合肥华鹤信息科技有限公司",
      "LastTitle":"SVN搭建、维护",
      "LastUpdate":"201804",
      "LastUpdate2":"20180400",
      "Lesson":"",
      "Level":"",
      "Local":"",
      "Married":"",
      "Memo":"",
      "Memo0":"",
      "Mobile":"15805601086",
      "Msn":"",
      "Name":"卫明",
      "National":"",
      "Nationality":"",
      "NowLocation":"安徽-合肥",
      "Original":"卫明\u000d\u000a30岁 |\u000d\u000a男 |\u000d\u000a大专 |\u000d\u000a3年经验\u000d\u000a15805601086 |\u000d\u000azijie0524@163.com\u000d\u000a个人优势\u000d\u000a1.工作态度：敬业负责，踏实细致\u000d\u000a2.性格：性格随和，待人真诚、对工作有上进心、有很强的适应能力和团结精神、并能够很好地与同事相处，能主动加班，抗压能力较强，工作富有激情。\u000d\u000a3.沟通能力：有责任感，有较强的沟通协调能力，具有团队合作精神\u000d\u000a期望职位\u000d\u000aJava 合肥 8-10K 计算机软件·企业服务\u000d\u000a工作经历\u000d\u000a合肥华鹤信息科技有限公司\u000d\u000aJava | 技术研发部\u000d\u000a2018.04—至今\u000d\u000a内容：\u000d\u000a1、软件需求分析、功能分析、代码编写、测试\u000d\u000a2、软件过程文档、测试文档、功能文档撰写\u000d\u000a3、SVN搭建、维护\u000d\u000a4、服务器运行环境搭建、维护\u000d\u000a项目经历\u000d\u000a公司内部考试系统\u000d\u000a软件开发\u000d\u000a2020.03—2020.10\u000d\u000a描述：该项目是公司内部使用的考试系统，主要考察员工对相关技能掌握的情况，\u000d\u000a项目结构：\u000d\u000a● 该项目服务端采用的是：SpringMVC 、Spring、Mybatis；\u000d\u000a● 前端页面基于vue+Jquery+LayUi+Bootstrap搭建；\u000d\u000a● 数据库：Mysql\u000d\u000a● 使用工具：Eclipse、Apache-Tomcat8.0、jdk1.8、SVN、maven\u000d\u000a● 项目模块：管理员系统(包括：员工管理、试题管理、试卷管理，考试管理、培训管理、)、员工考试系统(包括：员工个人信息管理、考试管理、培训管理、试题练习管理)。\u000d\u000a● 独立负责该系统开发中的企业需求调研，文档的编写与整理，以及该项目的代码编写与测试。\u000d\u000a公司项目完工量项目\u000d\u000a软件开发\u000d\u000a2019.03—2020.01\u000d\u000a描述：公司项目的创建到结束过程信息统计追踪，\u000d\u000a项目的结构：\u000d\u000a● 服务器端：SpringMVC+Spring+mybatis 框架，\u000d\u000a● 数据库采用的是mysql数据，\u000d\u000a● 前端页面基于vue+Jquery+LayUi+Bootstrap搭建\u000d\u000a● 使用工具：Eclipse、windows、Mysql、Apache-Tomcat7.0、jdk1.7、SVN\u000d\u000a● 项目模块：项目立项、工程优化、人员认证信息\u000d\u000a公司OA系统开发\u000d\u000a软件开发\u000d\u000a2018.04—2019.02\u000d\u000a描述：该项目是公司内部协同办公项目，\u000d\u000a项目结构：\u000d\u000a● 该项目服务端使用的是SpringMVC+Spring+mybatis 框架，\u000d\u000a● 数据库采用的是mysql数据，前端页面基于Jquery+LayUi+Bootstrap搭建\u000d\u000a● 使用工具：Eclipse、windows、Mysql、Apache-Tomcat7.0、jdk1.7、SVN\u000d\u000a● 项目模块：员工考勤登记、项目管理、质量安全、财务等模块\u000d\u000a● 本人负责该系统开发中企业需求调研、需求文档的编写与整理，以及项目管理和质量安全模块的编写与测试\u000d\u000a教育经历\u000d\u000a合肥工业大学\u000d\u000a市场营销 | 大专\u000d\u000a2013—2015",
      "OverseasWork":"",
      "Personal":"1.工作态度：敬业负责，踏实细致\u000d\u000a2.性格：性格随和，待人真诚、对工作有上进心、有很强的适应能力和团结精神、并能够很好地与同事相处，能主动加班，抗压能力较强，工作富有激情。\u000d\u000a3.沟通能力：有责任感，有较强的沟通协调能力，具有团队合作精神",
      "PersonalInterests":"",
      "Phone":"",
      "PhotoBase64String":"",
      "PhotoUrl":"",
      "Political":"",
      "PostCode":"",
      "Project":"公司内部考试系统\u000d\u000a软件开发\u000d\u000a2020-03 ~ 2020-10\u000d\u000a描述：该项目是公司内部使用的考试系统，主要考察员工对相关技能掌握的情况，\u000d\u000a项目结构：\u000d\u000a● 该项目服务端采用的是：SpringMVC 、Spring、Mybatis；\u000d\u000a● 前端页面基于vue+Jquery+LayUi+Bootstrap搭建；\u000d\u000a● 数据库：Mysql\u000d\u000a● 使用工具：Eclipse、Apache-Tomcat8.0、jdk1.8、SVN、maven\u000d\u000a● 项目模块：管理员系统(包括：员工管理、试题管理、试卷管理，考试管理、培训管理、)、员工考试系统(包括：员工个人信息管理、考试管理、培训管理、试题练习管理)。\u000d\u000a● 独立负责该系统开发中的企业需求调研，文档的编写与整理，以及该项目的代码编写与测试。\u000d\u000a公司项目完工量项目\u000d\u000a软件开发\u000d\u000a2019-03 ~ 2020-01\u000d\u000a描述：公司项目的创建到结束过程信息统计追踪，\u000d\u000a项目的结构：\u000d\u000a● 服务器端：SpringMVC+Spring+mybatis 框架，\u000d\u000a● 数据库采用的是mysql数据，\u000d\u000a● 前端页面基于vue+Jquery+LayUi+Bootstrap搭建\u000d\u000a● 使用工具：Eclipse、windows、Mysql、Apache-Tomcat7.0、jdk1.7、SVN\u000d\u000a● 项目模块：项目立项、工程优化、人员认证信息\u000d\u000a公司OA系统开发\u000d\u000a软件开发\u000d\u000a2018-04 ~ 2019-02\u000d\u000a描述：该项目是公司内部协同办公项目，\u000d\u000a项目结构：\u000d\u000a● 该项目服务端使用的是SpringMVC+Spring+mybatis 框架，\u000d\u000a● 数据库采用的是mysql数据，前端页面基于Jquery+LayUi+Bootstrap搭建\u000d\u000a● 使用工具：Eclipse、windows、Mysql、Apache-Tomcat7.0、jdk1.7、SVN\u000d\u000a● 项目模块：员工考勤登记、项目管理、质量安全、财务等模块\u000d\u000a● 本人负责该系统开发中企业需求调研、需求文档的编写与整理，以及项目管理和质量安全模块的编写与测试",
      "ProjectInfo":[
        {
          "Company":"合肥华鹤信息科技有限公司",
          "EndDate":"2020-10",
          "ProjectDescription":"描述：该项目是公司内部使用的考试系统，主要考察员工对相关技能掌握的情况，\u000d项目结构：\u000d该项目服务端采用的是：SpringMVC 、Spring、Mybatis；\u000d前端页面基于vue+Jquery+LayUi+Bootstrap搭建；\u000d数据库：Mysql\u000d使用工具：Eclipse、Apache-Tomcat8.0、jdk1.8、SVN、maven\u000d项目模块：管理员系统(包括：员工管理、试题管理、试卷管理，考试管理、培训管理、)、员工考试系统(包括：员工个人信息管理、考试管理、培训管理、试题练习管理)。\u000d独立负责该系统开发中的企业需求调研，文档的编写与整理，以及该项目的代码编写与测试。",
          "ProjectName":"公司内部考试系统",
          "Responsibilities":"",
          "StartDate":"2020-03",
          "Title":"软件开发"
        },
        {
          "Company":"合肥华鹤信息科技有限公司",
          "EndDate":"2020-01",
          "ProjectDescription":"描述：公司项目的创建到结束过程信息统计追踪，\u000d项目的结构：\u000d服务器端：SpringMVC+Spring+mybatis 框架，\u000d数据库采用的是mysql数据，\u000d前端页面基于vue+Jquery+LayUi+Bootstrap搭建\u000d使用工具：Eclipse、windows、Mysql、Apache-Tomcat7.0、jdk1.7、SVN\u000d项目模块：项目立项、工程优化、人员认证信息",
          "ProjectName":"公司项目完工量项目",
          "Responsibilities":"",
          "StartDate":"2019-03",
          "Title":"软件开发"
        },
        {
          "Company":"合肥华鹤信息科技有限公司",
          "EndDate":"2019-02",
          "ProjectDescription":"描述：该项目是公司内部协同办公项目，\u000d项目结构：\u000d该项目服务端使用的是SpringMVC+Spring+mybatis 框架，\u000d数据库采用的是mysql数据，前端页面基于Jquery+LayUi+Bootstrap搭建\u000d使用工具：Eclipse、windows、Mysql、Apache-Tomcat7.0、jdk1.7、SVN\u000d项目模块：员工考勤登记、项目管理、质量安全、财务等模块\u000d本人负责该系统开发中企业需求调研、需求文档的编写与整理，以及项目管理和质量安全模块的编写与测试",
          "ProjectName":"公司OA系统开发",
          "Responsibilities":"",
          "StartDate":"2018-04",
          "Title":"软件开发"
        }
      ],
      "QQ":"",
      "ResumeGrade":"初级",
      "ResumeInfoEN":null,
      "Salary":"8000-10000元\/月",
      "School":"合肥工业大学",
      "SchoolRankings":"68",
      "SchoolType":"1",
      "Score":"14",
      "Sex":"男",
      "Skill":"",
      "Sort":"",
      "Speciality":"市场营销",
      "StartFrom":"",
      "StudentType":"统招",
      "Switch":"",
      "Team":"",
      "Testdata":"",
      "Testdata1":"",
      "Title":"测试",
      "Title2":"",
      "TitleStandard":"测试员",
      "Training":"",
      "TrainingInfo":null,
      "Type":1,
      "Update":"",
      "Vocation":"",
      "VocationStandard":"其他",
      "Volunteer":"",
      "WebChat":"",
      "WebSiteResumeID":"",
      "Weight":"",
      "WorkType":""
      }
    let ProJectinfo = data.ProjectInfo.map(val => {
      return `${val.Company}
      ${val.ProjectName}
${val.StartDate} - ${val.EndDate}
${val.ProjectDescription}

`})

    this.message = `${data.Name}

${data.Age}岁 |
${data.Sex} |
${data.Education} |
${data.Experience}年
${data.Mobile} |
${data.Email}

个人优势
${data.Personal}

期望职位
无字段

项目经历

${ProJectinfo}
${data.Project}

教育经历

${data.EducationDetail}`

    this.dataMessage = data.Original
  }
}
</script>

<style scoped lang="css">
.container {
  display: flex;
}
</style>
import request from '../../configs/request'

export const getResumes = ({ pageSize, pageNum, title,resumeTrade,resumeWorkCity, experience, education, range, dateBeginAt, dateEndAt,isBlacklist }) => {
    const composedQueryObject = { pageSize, pageNum };
    if (title !== '') {
        composedQueryObject.title = title;
    }
    if (resumeWorkCity !== '') {
        composedQueryObject.resumeWorkCity = resumeWorkCity;
    }
    if (resumeTrade !== '') {
        composedQueryObject.resumeTrade = resumeTrade;
    }
    if (experience !== '') {
        composedQueryObject.resumeExperience = experience;
    }
    if (education !== '') {
        composedQueryObject.resumeEducation = education;
    }
    if (range !== '') {
        composedQueryObject.range = range;
    }
    if (dateBeginAt !== null) {
        composedQueryObject.createStartTime = dateBeginAt;
    }
    if (dateEndAt !== null) {
        composedQueryObject.createEndTime = dateEndAt;
    }
    if (isBlacklist !== null) {
        composedQueryObject.isBlacklist = isBlacklist;
    }
    return request.post('/resume/getResumesList', composedQueryObject);
}

export const getAbnormalResumes = ({ pageSize, pageNum }) => {
    return request.post('/resume/getErrorResumeList', { pageSize, pageNum })
}

export const addBlackList = ({ ids, reason }) => {
    return request.post('/resume/blacked', { resumeIds: ids, reason, type: 'close' });
}

export const removeBlackList = ({ ids, reason }) => {
    return request.post('/resume/blacked', { resumeIds: ids, reason, type: 'free' });
}

export const lockResumes = ids => {
    return request.post('/resume/lockResume', { resumeIds: ids });
}

export const unlockResumes = ids => {
    return request.post('/resume/releaseResume', { resumeIds: ids });
}

export const getResumeById = id => {
    return request.post('/resume/getResumesShow', { resumeId: id });
}

export const resumeOnlinePreview = id => {
    return request.get(`/resume/preview?resumeId=${id}`);
}

export const downloadResume = id => {
    return request.get(`/resume/downloadResume?resumeId=${id}`, { responseType: 'blob' })
}

export const getResumeSummary = id => {
    return request.post('/resume/getResumeIntention', { resumeId: id });
}

export const updateResumeBasicInfo = ({
    id,
    name,
    gender,
    mobile,
    email,
    education,
    major,
    birthday,
    marriage,
    experience,
    height,
    birthPlace,
    currentPlace
}) => {
    return request.post('/resume/updateBaseInfo', {
        resumeId: id,
        fullName: name,
        resumePhone: mobile,
        resumeMail: email,
        resumeExperience: experience,
        resumeEducation: education,
        resumeSex: gender,
        resumeMajor: major,
        resumeBirthDate: birthday,
        resumeMaritalStatus: marriage,
        resumeHeight: height,
        resumeNative: birthPlace,
        resumeAddress: currentPlace
    });
}

export const addContactRemark = ({ id, hasJob, availableDate, currentSalary, expectedSalary, isBaideEmployee, leaveReason, HRComment }) => {
    return request.post('/resume/saveCommunicateResumeRemark', {
        resumeId: id,
        workstatusId: hasJob,
        arrivalTime: availableDate ? availableDate.format('YYYY-MM-DD') : '',
        currWage: currentSalary,
        expectWage: expectedSalary,
        isJoin: isBaideEmployee,
        dimissionReason: leaveReason,
        remark: HRComment
    });
}

export const getContactRemark = id => {
    return request.get(`/resume/getResumeRemarkList?resumeId=${id}`);
}
export const getContactRecruit = id => {
    return request.get(`/record/getRecruitRecord?resumeId=${id}`);
}
export const getInterviewComment = id => {
    return request.get(`/record/getInterviewComment?resumeId=${id}`);
}

export const uploadResume = file => {
    const formData = new FormData();
    formData.append('file', file)
    return request.post('/resume/uploadResume', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
};

export const associateResume = (list,demandIdList) => {
    return request.post('resume/parseResume', { list,demandIdList });
}
export const saveResumeSource = list => {
    return request.post('resume/saveResumeSource', { list });
}

export const getImportExport = ({ title,opUserName, pageNum, pageSize }) => {
    return request.post('/resume/getImportFileList', { title,opUserName, pageNum, pageSize });
}
export const getRcordRecruit = id=>{
    return request.get(`record/recruit?resumeId=${id}`)
}
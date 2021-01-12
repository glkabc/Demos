import request from '../../configs/interviewerRequest'

export const getResumeFilter = ({ pageSize, pageNum, title,status }) => {
    return request.get(`/recruit/getSelectionList?title=${title}&status=${status}&pageSize=${pageSize}&pageNum=${pageNum}`);
}

export const getInterviewReport = ({ pageSize, pageNum, title,status }) => {
    return request.get(`/recruit/getComment?title=${title}&status=${status}&pageSize=${pageSize}&pageNum=${pageNum}`);
}

export const getResumeById = id => {
    return request.post('/resume/getResumesShow', { resumeId: id });
}

export const candidatePass = ({ ids, comment }) => {
    return request.post('/recruit/updateScreenpass', { jobTalentIdList: ids, comment });
}

export const candidateFail = ({ ids, comment }) => {
    return request.post('/recruit/updateScreenWeedOut', { jobTalentIdList: ids, comment });
}

export const getCommentLog = id => {
    return request.get(`/recruit/getInterviewComment?talentId=${id}`);
}

export const addInterviewReport = ({ id, status, comment,interviewId }) => {
    return request.post('/recruit/UptInterviewComment', {
        talentId: id,
        interviewId,
        interviewComment: comment,
        status
    });
}

export const downloadResume = id => {
    return request.get(`/resume/downloadResume?resumeId=${id}`, { responseType: 'blob' })
}

export const getResumeSummary = id => {
    return request.post('/resume/getResumeIntention', { resumeId: id });
}
export const getResumeRemark = id => {
    return request.get(`/resume/getResumeRemark?resumeId=${id}`);
}

export const fakeTokenVerify = token => {
    return new Promise(
        resolve => setTimeout(
            () => {
                resolve(
                    {
                        status: 200,
                        data: {
                            code: 0,
                            mesg: '',
                            data: {
                                userInfo: {
                                    name: 'test'
                                }
                            }
                        }
                    }
                )
            },
            1200
        )
    );
}
import request from '../../configs/request';

export const getTemplates = ({ type, name }) => {
    const params = {
        templateName: name
    }

    if (type) {
        params.templateType = type;
    }
    return request.get('template/getMailTemplateByType', { params });
}

export const addTemplate = ({ type, name, title, isDefault, content }) => {
    const body = {
        templateType: type,
        templateName: name,
        templateTitle: title,
        templateContent: content,
        isDefault
    }
    return request.post('template/addMailTemplate', body);
}

export const updateTemplate = ({ id, type, name, title, isDefault, content }) => {
    const body = {
        templateId: id,
        templateType: type,
        templateName: name,
        templateTitle: title,
        templateContent: content,
        isDefault
    }
    return request.post('template/updateMailTemplate', body);
}

export const deleteTemplate = id => {
    const params = {
        templateId: id
    }
    return request.get('template/deleteMailTemplate', { params });
}

export const getSettings = () => {
    return request.get('setup/getSetup');
}

export const updateSetting = ({ id, content }) => {
    const body = {
        setupId: id,
        setupContent: content
    };
    return request.post('setup/updateSetupe', body);
}

export const addSource = (content,type) => {
    const body = {
        setupType: type,
        setupContent: content
    };
    return request.post('setup/addSetup', body);
}

export const deleteSource = id => {
    const params = {
        setupId: id
    }
    return request.get('setup/deleteSetup', { params })
}

export const updateTemplateStatus = ({ id, type, isDefault, status }) => {
    const body = {
        templateId: id,
        templateType: type,
        templateState: status,
        isDefault
    };
    return request.post('template/updateMailTemplate', body);
}

export const getTemplateById = id => {
    const params = {
        templateId: id
    }
    return request.get('template/getMailTemplateByTemplateId', { params });
}
export const getCompanyList = sysCustomOrgId => {
    const params = {
        sysCustomOrgId,
    }
    // return request.get('org/getAllCustomOrgList',{params});
    return request.get('org/getAllCustomOrgLists',{params});
}
export const getAllCustomOrgList = sysCustomOrgId => {
    const params = {
        sysCustomOrgId,
    }
    return request.get('/org/getAllCustomOrgList',{params});
}
export const saveSysLinkCustom = ({sysCustomOrgId,customOrgId}) => {
    const params = {
        sysCustomOrgId:sysCustomOrgId,
        customOrgId:customOrgId
    }
    return request.post('org/saveSysLinkCustom',params)
}

export const deleteSysLinkCustom = ({sysCustomOrgId,customOrgId}) => {
    const params = {
        sysCustomOrgId:sysCustomOrgId,
        customOrgId:customOrgId
    }
    return request.post('org/deleteSysLinkCustom',params)
}

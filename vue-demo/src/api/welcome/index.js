import request from '../../configs/request';

export const getStatistics = () => {
    return request.get('workbench/getNum');
}

export const getDemandChart = ({ type, startAt, endAt }) => {
    const body = {
        type,
        dateStart: startAt,
        dateEnd: endAt
    };
    return request.post('workbench/getDemandScale', body);
}

export const getCandidateChart = () => {
    return request.get('workbench/getCandidateStat');
}

export const getProgressPercent = ({ startAt, endAt } = {}) => {
    const params = {
        dateStart: startAt,
        dateEnd: endAt
    };
    return request.get('workbench/getDemandProp', { params })
}
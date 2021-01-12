import client from '@/configs/request';

// TODO 如果字典项更多的话，要使用抽象来生成这些配置
export const CANVAS_MUTATIONS = {
  FETCH_TEACHING_FORMAT: 'FETCH_TEACHING_FORMAT',
  FETCH_TEACHING_FORMAT_SUCCESS: 'FETCH_TEACHING_FORMAT_SUCCESS',
  FETCH_TEACHING_FORMAT_FAILURE: 'FETCH_TEACHING_FORMAT_FAILURE',
  FETCH_SUBTASK_TIME_COST: 'FETCH_SUBTASK_TIME_COST',
  FETCH_SUBTASK_TIME_COST_SUCCESS: 'FETCH_SUBTASK_TIME_COST_SUCCESS',
  FETCH_SUBTASK_TIME_COST_FAILURE: 'FETCH_SUBTASK_TIME_COST_FAILURE',
  FETCH_DESCRIPTION_TIME_COST: 'FETCH_DESCRIPTION_TIME_COST',
  FETCH_DESCRIPTION_TIME_COST_SUCCESS: 'FETCH_DESCRIPTION_TIME_COST_SUCCESS',
  FETCH_DESCRIPTION_TIME_COST_FAILURE: 'FETCH_DESCRIPTION_TIME_COST_FAILURE',
  FETCH_APPLICATION_TIME_COST: 'FETCH_APPLICATION_TIME_COST',
  FETCH_APPLICATION_TIME_COST_SUCCESS: 'FETCH_APPLICATION_TIME_COST_SUCCESS',
  FETCH_APPLICATION_TIME_COST_FAILURE: 'FETCH_APPLICATION_TIME_COST_FAILURE',
  FETCH_INTRODUCTION_TIME_COST: 'FETCH_INTRODUCTION_TIME_COST',
  FETCH_INTRODUCTION_TIME_COST_SUCCESS: 'FETCH_INTRODUCTION_TIME_COST_SUCCESS',
  FETCH_INTRODUCTION_TIME_COST_FAILURE: 'FETCH_INTRODUCTION_TIME_COST_FAILURE',
  FETCH_INTRODUCTION_METHOD: 'FETCH_INTRODUCTION_METHOD',
  FETCH_INTRODUCTION_METHOD_SUCCESS: 'FETCH_INTRODUCTION_METHOD_SUCCESS',
  FETCH_INTRODUCTION_METHOD_FAILURE: 'FETCH_INTRODUCTION_METHOD_FAILURE',
  FETCH_DESCRIPTION_METHOD: 'FETCH_DESCRIPTION_METHOD',
  FETCH_DESCRIPTION_METHOD_SUCCESS: 'FETCH_DESCRIPTION_METHOD_SUCCESS',
  FETCH_DESCRIPTION_METHOD_FAILURE: 'FETCH_DESCRIPTION_METHOD_FAILURE',
  FETCH_APPLICATION_METHOD: 'FETCH_APPLICATION_METHOD',
  FETCH_APPLICATION_METHOD_SUCCESS: 'FETCH_APPLICATION_METHOD_SUCCESS',
  FETCH_APPLICATION_METHOD_FAILURE: 'FETCH_APPLICATION_METHOD_FAILURE',
  ACTIVATE_CANVAS_EDIT_MODE: 'ACTIVATE_CANVAS_EDIT_MODE',
  DE_ACTIVATE_CANVAS_EDIT_MODE: 'DE_ACTIVATE_CANVAS_EDIT_MODE',
  LOCK_OPERATION: 'LOCK_OPERATION',
  UNLOCK_OPERATION: 'UNLOCK_OPERATION',
};

const state = {
  teachingFormat: {
    status: 'idle',
    data: null,
    error: null,
  },
  subTaskTimeCost: {
    status: 'idle',
    data: null,
    error: null,
  },
  descriptionTimeCost: {
    status: 'idle',
    data: null,
    error: null,
  },
  applicationTimeCost: {
    status: 'idle',
    data: null,
    error: null,
  },
  introductionTimeCost: {
    status: 'idle',
    data: null,
    error: null,
  },
  introductionMethod: {
    status: 'idle',
    data: null,
    error: null,
  },
  descriptionMethod: {
    status: 'idle',
    data: null,
    error: null,
  },
  applicationMethod: {
    status: 'idle',
    data: null,
    error: null,
  },
  editMode: false,
  operationLocked: false,
};

const mutations = {
  [CANVAS_MUTATIONS.FETCH_TEACHING_FORMAT](state) {
    state.teachingFormat.status = 'pending';
    state.teachingFormat.error = null;
  },
  [CANVAS_MUTATIONS.FETCH_TEACHING_FORMAT_SUCCESS](state, payload) {
    state.teachingFormat.status = 'resolved';
    state.teachingFormat.data = payload;
  },
  [CANVAS_MUTATIONS.FETCH_TEACHING_FORMAT_FAILURE](state, payload) {
    state.teachingFormat.status = 'rejected';
    state.teachingFormat.error = payload;
  },
  [CANVAS_MUTATIONS.FETCH_SUBTASK_TIME_COST](state) {
    state.subTaskTimeCost.status = 'pending';
    state.subTaskTimeCost.error = null;
  },
  [CANVAS_MUTATIONS.FETCH_SUBTASK_TIME_COST_SUCCESS](state, payload) {
    state.subTaskTimeCost.status = 'resolved';
    state.subTaskTimeCost.data = payload;
  },
  [CANVAS_MUTATIONS.FETCH_SUBTASK_TIME_COST_FAILURE](state, payload) {
    state.subTaskTimeCost.status = 'rejected';
    state.subTaskTimeCost.error = payload;
  },
  [CANVAS_MUTATIONS.FETCH_DESCRIPTION_TIME_COST](state) {
    state.descriptionTimeCost.status = 'pending';
    state.descriptionTimeCost.error = null;
  },
  [CANVAS_MUTATIONS.FETCH_DESCRIPTION_TIME_COST_SUCCESS](state, payload) {
    state.descriptionTimeCost.status = 'resolved';
    state.descriptionTimeCost.data = payload;
  },
  [CANVAS_MUTATIONS.FETCH_DESCRIPTION_TIME_COST_FAILURE](state, payload) {
    state.descriptionTimeCost.status = 'rejected';
    state.descriptionTimeCost.error = payload;
  },
  [CANVAS_MUTATIONS.FETCH_APPLICATION_TIME_COST](state) {
    state.applicationTimeCost.status = 'pending';
    state.descriptionTimeCost.error = null;
  },
  [CANVAS_MUTATIONS.FETCH_APPLICATION_TIME_COST_SUCCESS](state, payload) {
    state.applicationTimeCost.status = 'resolved';
    state.applicationTimeCost.data = payload;
  },
  [CANVAS_MUTATIONS.FETCH_APPLICATION_TIME_COST_FAILURE](state, payload) {
    state.applicationTimeCost.status = 'rejected';
    state.applicationTimeCost.error = payload;
  },
  [CANVAS_MUTATIONS.FETCH_INTRODUCTION_TIME_COST](state) {
    state.introductionTimeCost.status = 'pending';
    state.introductionTimeCost.error = null;
  },
  [CANVAS_MUTATIONS.FETCH_INTRODUCTION_TIME_COST_SUCCESS](state, payload) {
    state.introductionTimeCost.status = 'resolved';
    state.introductionTimeCost.data = payload;
  },
  [CANVAS_MUTATIONS.FETCH_INTRODUCTION_TIME_COST_FAILURE](state, payload) {
    state.introductionTimeCost.status = 'rejected';
    state.introductionTimeCost.error = payload;
  },
  [CANVAS_MUTATIONS.FETCH_INTRODUCTION_METHOD](state) {
    state.introductionMethod.status = 'pending';
    state.introductionMethod.error = null;
  },
  [CANVAS_MUTATIONS.FETCH_INTRODUCTION_METHOD_SUCCESS](state, payload) {
    state.introductionMethod.status = 'resolved';
    state.introductionMethod.data = payload;
  },
  [CANVAS_MUTATIONS.FETCH_INTRODUCTION_METHOD_FAILURE](state, payload) {
    state.introductionMethod.status = 'rejected';
    state.introductionMethod.error = payload;
  },
  [CANVAS_MUTATIONS.FETCH_DESCRIPTION_METHOD](state) {
    state.descriptionMethod.status = 'pending';
    state.descriptionMethod.error = null;
  },
  [CANVAS_MUTATIONS.FETCH_DESCRIPTION_METHOD_SUCCESS](state, payload) {
    state.descriptionMethod.status = 'resolved';
    state.descriptionMethod.data = payload;
  },
  [CANVAS_MUTATIONS.FETCH_DESCRIPTION_METHOD_FAILURE](state, payload) {
    state.descriptionMethod.status = 'rejected';
    state.descriptionMethod.error = payload;
  },
  [CANVAS_MUTATIONS.FETCH_APPLICATION_METHOD](state) {
    state.applicationMethod.status = 'pending';
    state.applicationMethod.error = null;
  },
  [CANVAS_MUTATIONS.FETCH_APPLICATION_METHOD_SUCCESS](state, payload) {
    state.applicationMethod.status = 'resolved';
    state.applicationMethod.data = payload;
  },
  [CANVAS_MUTATIONS.FETCH_APPLICATION_METHOD_FAILURE](state, payload) {
    state.applicationMethod.status = 'rejected';
    state.applicationMethod.error = payload;
  },
  [CANVAS_MUTATIONS.LOCK_OPERATION](state) {
    state.operationLocked = true;
  },
  [CANVAS_MUTATIONS.UNLOCK_OPERATION](state) {
    state.operationLocked = false;
  },
};

const actions = {
  async fetchTeachingFormat(context) {
    try {
      context.commit(CANVAS_MUTATIONS.FETCH_TEACHING_FORMAT);
      const response = await client.post('/loadSelect/cardSelect', {type: 1});
      if (response.status === 200 && response.data.code === 0) {
        context.commit(
          CANVAS_MUTATIONS.FETCH_TEACHING_FORMAT_SUCCESS,
          response.data.data.dictionary
        );
      } else {
        context.commit(
          CANVAS_MUTATIONS.FETCH_TEACHING_FORMAT_FAILURE,
          'fetching error'
        );
      }
    } catch (error) {
      context.commit(
        CANVAS_MUTATIONS.FETCH_TEACHING_FORMAT_FAILURE,
        error.toString()
      );
    }
  },
  async fetchSubTaskTimeCost(context) {
    try {
      context.commit(CANVAS_MUTATIONS.FETCH_SUBTASK_TIME_COST);
      const response = await client.post('/loadSelect/cardSelect', {type: 2});
      if (response.status === 200 && response.data.code === 0) {
        context.commit(
          CANVAS_MUTATIONS.FETCH_SUBTASK_TIME_COST_SUCCESS,
          response.data.data.dictionary
        );
      } else {
        context.commit(
          CANVAS_MUTATIONS.FETCH_SUBTASK_TIME_COST_FAILURE,
          'fetching error'
        );
      }
    } catch (error) {
      context.commit(
        CANVAS_MUTATIONS.FETCH_SUBTASK_TIME_COST_FAILURE,
        error.toString()
      );
    }
  },
  async fetchDescriptionTimeCost(context) {
    try {
      context.commit(CANVAS_MUTATIONS.FETCH_DESCRIPTION_TIME_COST);
      const response = await client.post('/loadSelect/cardSelect', {type: 4});
      if (response.status === 200 && response.data.code === 0) {
        context.commit(
          CANVAS_MUTATIONS.FETCH_DESCRIPTION_TIME_COST_SUCCESS,
          response.data.data.dictionary
        );
      } else {
        context.commit(
          CANVAS_MUTATIONS.FETCH_DESCRIPTION_TIME_COST_FAILURE,
          'fetching error'
        );
      }
    } catch (error) {
      context.commit(
        CANVAS_MUTATIONS.FETCH_DESCRIPTION_TIME_COST_FAILURE,
        error.toString()
      );
    }
  },
  async fetchApplicationTimeCost(context) {
    try {
      context.commit(CANVAS_MUTATIONS.FETCH_APPLICATION_TIME_COST);
      const response = await client.post('/loadSelect/cardSelect', {type: 5});
      if (response.status === 200 && response.data.code === 0) {
        context.commit(
          CANVAS_MUTATIONS.FETCH_APPLICATION_TIME_COST_SUCCESS,
          response.data.data.dictionary
        );
      } else {
        context.commit(
          CANVAS_MUTATIONS.FETCH_APPLICATION_TIME_COST_FAILURE,
          'fetching error'
        );
      }
    } catch (error) {
      context.commit(
        CANVAS_MUTATIONS.FETCH_APPLICATION_TIME_COST_FAILURE,
        error.toString()
      );
    }
  },
  async fetchIntroductionTimeCost(context) {
    try {
      context.commit(CANVAS_MUTATIONS.FETCH_INTRODUCTION_TIME_COST);
      const response = await client.post('/loadSelect/cardSelect', {type: 3});
      if (response.status === 200 && response.data.code === 0) {
        context.commit(
          CANVAS_MUTATIONS.FETCH_INTRODUCTION_TIME_COST_SUCCESS,
          response.data.data.dictionary
        );
      } else {
        context.commit(
          CANVAS_MUTATIONS.FETCH_INTRODUCTION_TIME_COST_FAILURE,
          'fetching error'
        );
      }
    } catch (error) {
      context.commit(
        CANVAS_MUTATIONS.FETCH_INTRODUCTION_TIME_COST_FAILURE,
        error.toString()
      );
    }
  },
  async fetchIntroductionMethod(context) {
    try {
      context.commit(CANVAS_MUTATIONS.FETCH_INTRODUCTION_METHOD);
      const response = await client.post('/loadSelect/cardSelect', {type: 6});
      if (response.status === 200 && response.data.code === 0) {
        context.commit(
          CANVAS_MUTATIONS.FETCH_INTRODUCTION_METHOD_SUCCESS,
          response.data.data.dictionary
        );
      } else {
        context.commit(
          CANVAS_MUTATIONS.FETCH_INTRODUCTION_METHOD_FAILURE,
          'fetching error'
        );
      }
    } catch (error) {
      context.commit(
        CANVAS_MUTATIONS.FETCH_INTRODUCTION_METHOD_FAILURE,
        error.toString()
      );
    }
  },
  async fetchDescriptionMethod(context) {
    try {
      context.commit(CANVAS_MUTATIONS.FETCH_DESCRIPTION_METHOD);
      const response = await client.post('/loadSelect/cardSelect', {type: 7});
      if (response.status === 200 && response.data.code === 0) {
        context.commit(
          CANVAS_MUTATIONS.FETCH_DESCRIPTION_METHOD_SUCCESS,
          response.data.data.dictionary
        );
      } else {
        context.commit(
          CANVAS_MUTATIONS.FETCH_DESCRIPTION_METHOD_FAILURE,
          'fetching error'
        );
      }
    } catch (error) {
      context.commit(
        CANVAS_MUTATIONS.FETCH_DESCRIPTION_METHOD_FAILURE,
        error.toString()
      );
    }
  },
  async fetchApplicationMethod(context) {
    try {
      context.commit(CANVAS_MUTATIONS.FETCH_APPLICATION_METHOD);
      const response = await client.post('/loadSelect/cardSelect', {type: 8});
      if (response.status === 200 && response.data.code === 0) {
        context.commit(
          CANVAS_MUTATIONS.FETCH_APPLICATION_METHOD_SUCCESS,
          response.data.data.dictionary
        );
      } else {
        context.commit(
          CANVAS_MUTATIONS.FETCH_APPLICATION_METHOD_FAILURE,
          'fetching error'
        );
      }
    } catch (error) {
      context.commit(
        CANVAS_MUTATIONS.FETCH_APPLICATION_METHOD_FAILURE,
        error.toString()
      );
    }
  },
  fetchAllDictionary(context) {
    context.dispatch('fetchTeachingFormat');
    context.dispatch('fetchSubTaskTimeCost');
    context.dispatch('fetchDescriptionTimeCost');
    context.dispatch('fetchApplicationTimeCost');
    context.dispatch('fetchIntroductionTimeCost');
    context.dispatch('fetchIntroductionMethod');
    context.dispatch('fetchDescriptionMethod');
    context.dispatch('fetchApplicationMethod');
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};

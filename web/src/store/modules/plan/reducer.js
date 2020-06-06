import produce from 'immer';

const INITIAL_STATE = {
  plans: [],
  hasMoreItems: false,
  loading: false,
};

export default function plan(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@plan/GET_PLANS': {
        draft.loading = true;
        break;
      }
      case '@plan/GET_PLANS_SUCCESS': {
        draft.plans = action.payload.plans;
        draft.hasMoreItems = action.payload.hasMoreItems;
        draft.loading = false;
        break;
      }
      case '@plan/GET_PLANS_ERROR': {
        draft.loading = false;
        break;
      }
      case '@plan/CREATE_PLAN': {
        draft.plan = action.payload;
        break;
      }
      case '@plan/UPDATE_PLAN': {
        draft.plan = action.payload;
        break;
      }
      case '@plan/DELETE_PLAN': {
        break;
      }
      default:
    }
  });
}

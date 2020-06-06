import produce from 'immer';

const INITIAL_STATE = {
  registers: [],
  hasMoreItems: false,
  loading: false,
};

export default function register(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@register/GET_REGISTERS': {
        draft.loading = true;
        break;
      }
      case '@register/GET_REGISTERS_SUCCESS': {
        draft.registers = action.payload.registers;
        draft.hasMoreItems = action.payload.hasMoreItems;
        draft.loading = false;
        break;
      }
      case '@register/GET_REGISTERS_ERROR': {
        draft.loading = false;
        break;
      }
      case '@register/CREATE_REGISTER': {
        draft.plan = action.payload;
        break;
      }
      case '@register/UPDATE_REGISTER': {
        draft.plan = action.payload;
        break;
      }
      case '@register/DELETE_REGISTER': {
        break;
      }
      default:
    }
  });
}

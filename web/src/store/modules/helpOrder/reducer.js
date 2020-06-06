import produce from 'immer';

const INITIAL_STATE = {
  helpOrders: [],
  showModal: false,
  loading: false,
  hasMoreItems: false,
};

export default function helpOrder(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@helpOrder/GET_HELPORDER': {
        draft.loading = true;
        break;
      }
      case '@helpOrder/GET_HELPORDERS_SUCCESS': {
        draft.helpOrders = action.payload.helpOrders;
        draft.hasMoreItems = action.payload.hasMoreItems;
        draft.loading = false;
        draft.showModal = false;
        break;
      }
      case '@helpOrder/GET_HELPORDERS_ERROR': {
        draft.loading = false;
        draft.showModal = false;
        break;
      }
      case '@helpOrder/CREATE_HELPORDER': {
        draft.helporder = action.payload;
        break;
      }
      case '@helpOrder/SHOW_MODAL_HELPORDER': {
        draft.showModal = action.payload;
        break;
      }
      default:
    }
  });
}

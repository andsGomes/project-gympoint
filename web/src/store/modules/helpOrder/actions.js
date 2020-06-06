export function getHelpOrders(page) {
  return {
    type: '@helpOrder/GET_HELPORDERS',
    payload: { page },
  };
}

export function getHelpOrdersSuccess(data) {
  return {
    type: '@helpOrder/GET_HELPORDERS_SUCCESS',
    payload: { hasMoreItems: data.hasMoreItems, helpOrders: data.content },
  };
}

export function getHelpOrdersError() {
  return {
    type: '@helpOrder/GET_HELPORDERS_ERROR',
  };
}

export function createHelpOrder(name, email, age, weight, height) {
  return {
    type: '@helpOrder/CREATE_HELPORDER',
    payload: { name, email, age, weight, height },
  };
}

export function answerHelpOrder(helpOrderId, answer) {
  return {
    type: '@helpOrder/ANSWER_HELPORDER',
    payload: { helpOrderId, answer },
  };
}

export function showModalHelpOrder(boolean) {
  return {
    type: '@helpOrder/SHOW_MODAL_HELPORDER',
    payload: boolean,
  };
}

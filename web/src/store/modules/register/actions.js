export function getRegisters(page) {
  return {
    type: '@register/GET_REGISTERS',
    payload: { page },
  };
}

export function getRegistersSuccess({ hasMoreItems, totalItems, content }) {
  return {
    type: '@register/GET_REGISTERS_SUCCESS',
    payload: { hasMoreItems: hasMoreItems, totalItems, registers: content },
  };
}

export function getRegistersError() {
  return {
    type: '@register/GET_REGISTERS_ERROR',
  };
}

export function createRegister(student_id, plan_id, start_date) {
  return {
    type: '@register/CREATE_REGISTER',
    payload: { student_id, plan_id, start_date },
  };
}

export function updateRegister(id, student_id, plan_id, start_date) {
  return {
    type: '@register/UPDATE_REGISTER',
    payload: { id, student_id, plan_id, start_date },
  };
}

export function deleteRegister(id) {
  return {
    type: '@register/DELETE_REGISTER',
    payload: { id },
  };
}

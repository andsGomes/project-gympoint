export function getPlans(page) {
  return {
    type: '@plan/GET_PLANS',
    payload: { page },
  };
}

export function getPlansSuccess({ hasMoreItems, totalItems, content }) {
  return {
    type: '@plan/GET_PLANS_SUCCESS',
    payload: { hasMoreItems: hasMoreItems, totalItems: totalItems, plans: content },
  };
}

export function getPlansError() {
  return {
    type: '@plan/GET_PLANS_ERROR',
  };
}

export function createPlan(title, duration, price) {
  return {
    type: '@plan/CREATE_PLAN',
    payload: { title, duration, price },
  };
}

export function updatePlan(plan_id, title, duration, price) {
  return {
    type: '@plan/UPDATE_PLAN',
    payload: { plan_id, title, duration, price },
  };
}

export function deletePlan(id) {
  return {
    type: '@plan/DELETE_PLAN',
    payload: { id },
  };
}

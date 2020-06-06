import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { getPlans, getPlansSuccess, getPlansError } from './actions';
import history from '~/services/history';

export function* get({ payload }) {
  try {
    const { page } = payload;
    const response = yield call(api.get, '/plans', {
      params: {
        page,
      },
    });

    yield put(getPlansSuccess(response.data));
  } catch (err) {
    toast.error('Falha ao buscar planos');
    yield put(getPlansError());
  }
}

export function* deletePlan({ payload }) {
  try {
    const { id } = payload;

    yield call(api.delete, `/plans/${id}`);

    yield put(getPlans());
  } catch (err) {
    toast.error('Falha ao deletar plano, tente novamente');
  }
}

export function* create({ payload }) {
  try {
    yield call(api.post, '/plans', {
      ...payload,
    });

    yield put(getPlans());

    history.push('/plans');
  } catch (err) {
    toast.error('Falha ao salvar plano, tente novamente');
  }
}

export function* update({ payload }) {
  try {
    const { plan_id } = payload;
    yield call(api.put, `/plans/${plan_id}`, {
      ...payload,
    });

    yield put(getPlans());

    toast.success('Cadastro atualizado com sucesso');
  } catch (err) {
    toast.error('Falha ao atualizar dados do plano, tente novamente');
  }
}

export default all([
  takeLatest('@plan/GET_PLANS', get),
  takeLatest('@plan/DELETE_PLAN', deletePlan),
  takeLatest('@plan/CREATE_PLAN', create),
  takeLatest('@plan/UPDATE_PLAN', update),
]);

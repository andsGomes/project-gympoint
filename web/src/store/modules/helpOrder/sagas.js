import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import {
  getHelpOrders,
  getHelpOrdersSuccess,
  getHelpOrdersError,
} from './actions';
import history from '~/services/history';

export function* get({ payload }) {
  try {
    const { page } = payload;
    const { data } = yield call(api.get, '/help-orders', {
      params: { page },
    });

    yield put(getHelpOrdersSuccess(data));
  } catch (err) {
    toast.error('Falha ao buscar perguntas');
    yield put(getHelpOrdersError());
  }
}

export function* create({ payload }) {
  try {
    yield call(api.post, '/help-orders', {
      ...payload,
    });

    yield put(getHelpOrders());

    history.push('/helpOrders');
  } catch (err) {
    toast.error('Falha a enviar pergunta, tente novamente');
  }
}

export function* answer({ payload }) {
  try {
    const { helpOrderId, answer: answerHelpOrder } = payload;
    yield call(api.post, `/help-orders/${helpOrderId}/answer`, {
      answer: answerHelpOrder,
    });

    toast.success('Resposta enviado ao aluno :)');
    yield put(getHelpOrders());
  } catch (err) {
    toast.error('Falha a enviar resposta, tente novamente');
  }
}

export default all([
  takeLatest('@helpOrder/GET_HELPORDERS', get),
  takeLatest('@helpOrder/CREATE_HELPORDER', create),
  takeLatest('@helpOrder/ANSWER_HELPORDER', answer),
]);

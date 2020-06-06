import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';

import {
  getRegisters,
  getRegistersSuccess,
  getRegistersError,
} from './actions';
import history from '~/services/history';

export function* get({ payload }) {
  try {
    const { page } = payload;
    const response = yield call(api.get, '/registrations', {
      params: {
        page,
      },
    });

    const contentWrapper = response.data.content.map(register => ({
      ...register,
      start_date_formatted: format(
        parseISO(register.start_date),
        "dd 'de' MMMM 'de' yyyy",
        { locale: pt }
      ),
      end_date_formatted: format(
        parseISO(register.end_date),
        "dd 'de' MMMM 'de' yyyy",
        { locale: pt }
      ),
    }));

    const { data } = response;

    yield put(getRegistersSuccess({ ...data, content: contentWrapper}));
  } catch (err) {
    toast.error('Falha ao buscar matrículas');
    yield put(getRegistersError());
  }
}

export function* deleteRegister({ payload }) {
  try {
    const { id } = payload;

    yield call(api.delete, `/registrations/${id}`);

    yield put(getRegisters());
  } catch (err) {
    toast.error('Falha ao deletar plano, tente novamente');
  }
}

export function* create({ payload }) {
  try {
    yield call(api.post, '/registrations', {
      ...payload,
    });

    yield put(getRegisters());

    history.push('/registrations');
  } catch (err) {
    toast.error('Falha ao salvar matrícula, tente novamente');
  }
}

export function* update({ payload }) {
  try {
    const { id: register_id } = payload;
    yield call(api.put, `/registrations/${register_id}`, {
      ...payload,
    });

    yield put(getRegisters());

    toast.success('Cadastro atualizado com sucesso');
  } catch (err) {
    toast.error('Falha ao atualizar matrícula, tente novamente');
  }
}

export default all([
  takeLatest('@register/GET_REGISTERS', get),
  takeLatest('@register/DELETE_REGISTER', deleteRegister),
  takeLatest('@register/CREATE_REGISTER', create),
  takeLatest('@register/UPDATE_REGISTER', update),
]);

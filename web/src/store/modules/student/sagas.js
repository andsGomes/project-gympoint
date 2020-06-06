import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { getStudents, getStudentsSuccess, getStudentsError } from './actions';
import history from '~/services/history';

export function* get({ payload }) {
  try {
    const { page, name } = payload;
    const response = yield call(api.get, '/students', {
      params: {
        page,
        name,
      },
    });

    yield put(getStudentsSuccess(response.data));
  } catch (err) {
    toast.error('Falha ao buscar alunos');
    yield put(getStudentsError());
  }
}

export function* deleteStudent({ payload }) {
  try {
    const { id } = payload;

    yield call(api.delete, `/students/${id}`);

    yield put(getStudents());
  } catch (err) {
    toast.error('Falha ao deletar aluno, tente novamente');
  }
}

export function* create({ payload }) {
  try {
    yield call(api.post, '/students', {
      ...payload,
    });

    yield put(getStudents());

    history.push('/students');
  } catch (err) {
    toast.error('Falha ao salvar aluno, tente novamente');
  }
}

export function* update({ payload }) {
  try {
    yield call(api.put, '/students', {
      ...payload,
    });

    yield put(getStudents());

    toast.success('Cadastro atualizado com sucesso');
  } catch (err) {
    toast.error('Falha ao atualizar dados do aluno, tente novamente');
  }
}

export default all([
  takeLatest('@student/GET_STUDENTS', get),
  takeLatest('@student/DELETE_STUDENT', deleteStudent),
  takeLatest('@student/CREATE_STUDENT', create),
  takeLatest('@student/UPDATE_STUDENT', update),
]);

import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signUpRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo-login.svg';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
    .required('A senha é obrigatória'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ name, email, password }) {
    dispatch(signUpRequest(name, email, password));
  }

  return (
    <>
      <img src={logo} alt="GymPoint" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <span style={{ color: '#666' }}>SEU NOME</span>
        <Input name="name" type="text" placeholder="Roberto Santos" />

        <span style={{ color: '#666' }}>SEU E-MAIL</span>
        <Input name="email" type="email" placeholder="exemplo@email.com" />

        <span style={{ color: '#666' }}>SUA SENHA</span>
        <Input name="password" type="password" placeholder="**********" />

        <button type="submit">
          {loading ? 'Carregando...' : 'Criar conta'}
        </button>
        <Link to="/">Já tem uma conta?</Link>
      </Form>
    </>
  );
}

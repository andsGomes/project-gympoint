import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import { FiCheck, FiChevronLeft } from 'react-icons/fi';
import { toast } from 'react-toastify';

import { Container, ListContainer, InputSmall, Button } from './styles';
import api from '~/services/api';
import { createStudent, updateStudent } from '~/store/modules/student/actions';
import history from '~/services/history';
import InputPrefix from '~/components/InputPrefix';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  age: Yup.string().required('A idade é obrigatória'),
  weight: Yup.string().required('O peso é obrigatório'),
  height: Yup.string().required('A altura é obrigatória'),
});

export default function StudentForm() {
  const [student, setStudent] = useState({});
  const [weight, setWeight] = useState({});
  const [height, setHeight] = useState({});
  const { id } = useParams();
  const isNewStudent = !id;

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadStudent() {
      try {
        const { data } = await api.get(`students/${id}`);

        setStudent(data);
      } catch (err) {
        toast.error('Erro ao carregar informações do aluno');
      }
    }

    if (!isNewStudent) {
      loadStudent();
    }
  }, []);

  function handleCreateStudent({ name, email, age }) {
    const student_id = Number(id);
    age = Number(age);

    if (isNewStudent) {
      dispatch(createStudent(name, email, age, weight, height));
    } else {
      dispatch(updateStudent(student_id, name, email, age, weight, height));
    }
  }

  return (
    <Container>
      <div>
        <h1>{isNewStudent ? 'Cadastro de aluno' : 'Edição de aluno'}</h1>
        <div>
          <Button
            backgroundColor="#ccc"
            onClick={() => history.push('/students')}
          >
            <FiChevronLeft />
            voltar
          </Button>

          <Button backgroundColor="#ed4c64" type="submit" form="createStudent">
            <FiCheck />
            salvar
          </Button>
        </div>
      </div>

      <ListContainer>
        <Form
          id="createStudent"
          schema={schema}
          onSubmit={handleCreateStudent}
          initialData={student}
        >
          <span style={{ color: '#666' }}>NOME COMPLETO</span>
          <Input name="name" type="name" placeholder="John Doe" />

          <span style={{ color: '#666' }}>ENDEREÇO DE E-MAIL</span>
          <Input name="email" type="email" placeholder="exemplo@email.com" />

          <div>
            <InputSmall>
              <span style={{ color: '#666' }}>IDADE</span>
              <Input name="age" type="number" maxLength={3} />
            </InputSmall>

            <InputSmall>
              <span style={{ color: '#666' }}>PESO (em kg)</span>
              <InputPrefix
                name="weight"
                suffix="kg"
                maxLength={7}
                thousandSeparator={false}
                onChange={value => setWeight(value)}
              />
            </InputSmall>

            <InputSmall>
              <span style={{ color: '#666' }}>ALTURA</span>
              <InputPrefix
                name="height"
                suffix="m"
                maxLength={7}
                thousandSeparator={false}
                onChange={value => setHeight(value)}
              />
            </InputSmall>
          </div>
        </Form>
      </ListContainer>
    </Container>
  );
}

StudentForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

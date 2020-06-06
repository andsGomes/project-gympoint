import React, { useEffect, useState, useMemo } from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import { FiCheck, FiChevronLeft } from 'react-icons/fi';
import { format, addMonths } from 'date-fns';

import { Container, ListContainer, Button, InputSmall, Row } from './styles';
import { formatMoney } from '~/util/formats';
import api from '~/services/api';
import {
  createRegister,
  updateRegister,
} from '~/store/modules/register/actions';
import history from '~/services/history';
import InputAsyncSelect from '~/components/InputAsyncSelect';
import InputSelect from '~/components/InputSelect';
import DatePicker from '~/components/InputDatePicker';

const schema = Yup.object().shape({
  student: Yup.mixed().required('O aluno é obrigatório'),
  plan: Yup.mixed().required('O plano é obrigatório'),
  start_date: Yup.date().required('A data de início é obrigatória'),
});

export default function RegisterForm() {
  const [student, setStudent] = useState();
  const [plan, setPlan] = useState({ price: 0, duration: 1 });
  const [plans, setPlans] = useState({});
  const [startDate, setStartDate] = useState(new Date());
  const [register] = useState({});
  const { id } = useParams();
  const isNewRegister = !id;
  const dispatch = useDispatch();

  async function loadStudents(q) {
    const response = await api
      .get('students', { params: { q } })
      .then(r => r.data)
      .then(r =>
        r.map(studentItem => ({
          label: studentItem.name,
          value: studentItem.id,
        }))
      );
    return response;
  }

  async function loadPlans() {
    const response = await api
      .get('plans')
      .then(r => r.data)
      .then(d =>
        d.map(p => ({
          label: p.title,
          value: p.id,
          duration: p.duration,
          price: p.price,
        }))
      );

    setPlans(response);
  }

  useEffect(() => {
    loadPlans();
    loadStudents();
  }, []);

  const finalPrice = useMemo(() => {
    return formatMoney(plan.price * plan.duration);
  }, [plan.price, plan.duration]);

  const endDate = useMemo(() => {
    if (plan.duration && startDate) {
      return format(addMonths(startDate, plan.duration), 'dd/MM/yyyy');
    }
    return '';
  }, [plan, startDate]);

  function handleCreateRegister({
    start_date: startDateField,
    plan: planField,
    student: studentField,
  }) {
    const plan_id = planField.value;
    const student_id = studentField.value;

    if (isNewRegister) {
      dispatch(createRegister(student_id, plan_id, startDateField));
    } else {
      dispatch(updateRegister(id, student_id, plan_id, startDateField));
    }
  }

  return (
    <Container>
      <div>
        <h1>
          {isNewRegister ? 'Cadastro de matrícula' : 'Edição de matrícula'}
        </h1>
        <div>
          <Button
            backgroundColor="#ccc"
            onClick={() => history.push('/registrations')}
          >
            <FiChevronLeft />
            voltar
          </Button>

          <Button backgroundColor="#ed4c64" type="submit" form="createRegister">
            <FiCheck />
            salvar
          </Button>
        </div>
      </div>

      <ListContainer>
        <Form
          id="createRegister"
          schema={schema}
          onSubmit={handleCreateRegister}
          initialData={register}
        >
          <span style={{ color: '#666' }}>ALUNO</span>
          <InputAsyncSelect
            name="student"
            cacheOptions
            isClearable
            defaultOptions
            loadOptions={e => loadStudents(e)}
            value={student}
            onChange={e => setStudent(e)}
            placeholder="Selecionar aluno"
          />

          <Row>
            <InputSmall>
              <span style={{ color: '#666' }}>PLANO</span>
              <InputSelect
                name="plan"
                options={plans}
                setChange={setPlan}
                placeholder="Selecionar plano"
              />
            </InputSmall>

            <InputSmall>
              <span style={{ color: '#666' }}>DATA DE INÍCIO</span>
              <DatePicker
                selected={startDate}
                name="start_date"
                setChange={setStartDate}
              />
            </InputSmall>

            <InputSmall disabled>
              <span style={{ color: '#666' }}>DATA DE TÉRMINO</span>
              <Input name="end_date" value={endDate} readOnly />
            </InputSmall>

            <InputSmall disabled>
              <span style={{ color: '#666' }}>VALOR FINAL</span>
              <Input name="final_price" value={finalPrice} readOnly />
            </InputSmall>
          </Row>
        </Form>
      </ListContainer>
    </Container>
  );
}

RegisterForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

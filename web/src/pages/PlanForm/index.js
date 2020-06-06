import React, { useEffect, useState, useMemo } from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import { FiCheck, FiChevronLeft } from 'react-icons/fi';
import { toast } from 'react-toastify';
import InputPrefix from '~/components/InputPrefix';

import { Container, ListContainer, InputSmall, Button } from './styles';

import { formatMoney } from '~/util/formats';
import api from '~/services/api';
import { createPlan, updatePlan } from '~/store/modules/plan/actions';
import history from '~/services/history';

const schema = Yup.object().shape({
  title: Yup.string()
    .max(50, 'Título pode ter no máximo 50 caracteres')
    .required('O título é obrigatório'),
  duration: Yup.number()
    .min(1, 'Duração inválida')
    .required('A duração é obrigatória'),
  // price: Yup.number().required('O preço é obrigatório'),
});

export default function PlanForm() {
  const [plan, setPlan] = useState({});
  const [planDuration, setPlanDuration] = useState(1);
  const [planPrice, setPlanPrice] = useState(0);
  const { id } = useParams();
  const isNewPlan = !id;
  const dispatch = useDispatch();

  const totalPrice = useMemo(() => {
    return formatMoney(planPrice * planDuration);
  }, [planPrice, planDuration]);

  useEffect(() => {
    async function loadPlan() {
      try {
        const { data } = await api.get(`plans/${id}`);
        setPlan(data);
        setPlanDuration(data.duration);
        setPlanPrice(data.price);
      } catch (err) {
        toast.error('Erro ao carregar informações do aluno');
      }
    }

    if (!isNewPlan) {
      loadPlan();
    }
  }, []);

  function handleCreatePlan({ title, duration, price }) {
    const plan_id = Number(id);
    duration = Number(duration);

    if (isNewPlan) {
      dispatch(createPlan(title, duration, planPrice));
    } else {
      dispatch(updatePlan(plan_id, title, duration, planPrice));
    }
  }

  return (
    <Container>
      <div>
        <h1>{isNewPlan ? 'Cadastro de plano' : 'Edição de plano'}</h1>
        <div>
          <Button backgroundColor="#ccc" onClick={() => history.push('/plans')}>
            <FiChevronLeft />
            voltar
          </Button>

          <Button backgroundColor="#ed4c64" type="submit" form="createPlan">
            <FiCheck />
            salvar
          </Button>
        </div>
      </div>

      <ListContainer>
        <Form
          id="createPlan"
          schema={schema}
          onSubmit={handleCreatePlan}
          initialData={plan}
        >
          <span style={{ color: '#666' }}>TÍTULO DO PLANO</span>
          <Input name="title" type="name" placeholder="Diadmond" />

          <div>
            <InputSmall>
              <span style={{ color: '#666' }}>DURAÇÃO (em meses)</span>
              <Input
                name="duration"
                type="number"
                value={planDuration}
                maxLength={3}
                onChange={e => setPlanDuration(e.target.value)}
              />
            </InputSmall>

            <InputSmall>
              <span style={{ color: '#666' }}>PREÇO MENSAL</span>
              <InputPrefix
                name="price"
                prefix="R$"
                suffix=",00"
                maxLength={12}
                thousandSeparator="."
                disabled={false}
                value={planPrice}
                onChange={value => {
                  setPlan({ ...plan, price: planPrice });
                  setPlanPrice(value);
                }}
                label=""
              />
            </InputSmall>

            <InputSmall disabled>
              <span style={{ color: '#666' }}>PREÇO TOTAL</span>
              <Input name="priceTotal" value={totalPrice} disabled />
            </InputSmall>
          </div>
        </Form>
      </ListContainer>
    </Container>
  );
}

PlanForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

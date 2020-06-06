import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';

import { Container, ListContainer, Table, Button, ButtonAdd } from './styles';
import { getPlans, deletePlan } from '~/store/modules/plan/actions';
import Pagination from '~/components/Pagination';

export default function Plans() {
  const [lastPage, setLastPage] = useState(true);
  const [page, setPage] = useState(1);
  const { plans, hasMoreItems } = useSelector(state => state.plan);
  const dispatch = useDispatch();

  async function loadPlans(currentPage) {
    await dispatch(getPlans(currentPage));

    setPage(currentPage);
    setLastPage(!hasMoreItems);
  }

  useEffect(() => {
    loadPlans(1);
  }, []);

  function handlePreviousPage() {
    const currentPage = page - 1;
    loadPlans(currentPage);
  }

  function handleNextPage() {
    const currentPage = page + 1;
    loadPlans(currentPage);
  }

  function handleDeletePlan({ id }) {
    dispatch(deletePlan(id));
  }

  return (
    <Container>
      <div>
        <h1>Gerenciando planos</h1>
        <Link to="/plan">
          <ButtonAdd>
            <FiPlus />
            cadastrar
          </ButtonAdd>
        </Link>
      </div>

      <ListContainer>
        {plans && plans.length > 0 ? (
          <>
            <Table>
              <thead>
                <tr>
                  <th>título</th>
                  <th>duração</th>
                  <th>valor p/ mês</th>
                  <th> </th>
                </tr>
              </thead>
              <tbody>
                {plans.map(plan => (
                  <tr key={plan.id}>
                    <td>{plan.title}</td>
                    <td>{plan.duration}</td>
                    <td>{plan.price}</td>
                    <td>
                      <Link to={`/plan/${plan.id}`}>
                        <Button color="#2054C3">editar</Button>
                      </Link>
                      <Button
                        onClick={() => handleDeletePlan(plan)}
                        color="#F44646"
                      >
                        apagar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <Pagination
              lastPage={lastPage}
              page={page}
              handlePreviousPage={handlePreviousPage}
              handleNextPage={handleNextPage}
            />

          </>
        ) : (
          <span>Você não tem planos cadastrados no momento.</span>
        )}
      </ListContainer>
    </Container>
  );
}

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';

import check from '~/assets/check.png';
import unchecked from '~/assets/unchecked.png';
import { Container, ListContainer, Table, Button, ButtonAdd } from './styles';
import { getRegisters, deleteRegister } from '~/store/modules/register/actions';
import Pagination from '~/components/Pagination';

export default function Registers() {
  const [lastPage, setLastPage] = useState(true);
  const [page, setPage] = useState(1);
  const { registers, hasMoreItems } = useSelector(state => state.register);
  const dispatch = useDispatch();

  async function loadRegisters(currentPage) {
    await dispatch(getRegisters(currentPage));

    setPage(currentPage);
    setLastPage(!hasMoreItems);
  }

  useEffect(() => {
    loadRegisters(1);
  }, []);

  function handleDeleteregister({ id }) {
    dispatch(deleteRegister(id));
  }

  function handlePreviousPage() {
    const currentPage = page - 1;
    loadRegisters(currentPage);
  }

  function handleNextPage() {
    const currentPage = page + 1;
    loadRegisters(currentPage);
  }

  return (
    <Container>
      <div>
        <h1>Gerenciando matrículas</h1>
        <Link to="/registration">
          <ButtonAdd>
            <FiPlus />
            cadastrar
          </ButtonAdd>
        </Link>
      </div>

      <ListContainer>
        {registers && registers.length > 0 ? (
          <>
            <Table>
              <thead>
                  <tr>
                    <th>aluno</th>
                    <th>plano</th>
                    <th>início</th>
                    <th>término</th>
                    <th>ativa</th>
                    <th> </th>
                  </tr>
              </thead>
              <tbody>
                {registers.map(register => (
                  <tr key={register.id}>
                    <td>{register.student.name}</td>
                    <td>{register.plan.title}</td>
                    <td>{register.start_date_formatted}</td>
                    <td>{register.end_date_formatted}</td>
                    <td>
                      {register.active ? (
                        <img src={check} alt="Check" />
                      ) : (
                        <img src={unchecked} alt="Unchecked" />
                      )}
                    </td>
                    <td>
                      <Link to={`/registration/${register.id}`}>
                        <Button color="#2054C3">editar</Button>
                      </Link>
                      <Button
                        onClick={() => handleDeleteregister(register)}
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
          <span>Você não tem matrículas cadastradas no momento.</span>
        )}
      </ListContainer>
    </Container>
  );
}

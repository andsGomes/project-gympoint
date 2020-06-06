import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { MdSearch } from 'react-icons/md';

import {
  Container,
  ActionsContainer,
  ListContainer,
  Table,
  Button,
  ButtonAdd,
} from './styles';
import { getStudents, deleteStudent } from '~/store/modules/student/actions';
import Pagination from '~/components/Pagination';

export default function Students() {
  const [lastPage, setLastPage] = useState(true);
  const [page, setPage] = useState(1);
  const { students, hasMoreItems } = useSelector(state => state.student);
  const dispatch = useDispatch();

  async function loadStudents(currentPage, name) {
    await dispatch(getStudents(currentPage, name || ''));

    setPage(currentPage);
    setLastPage(!hasMoreItems);
  }

  useEffect(() => {
    loadStudents(1);
  }, []);

  function handleDeleteStudent({ id }) {
    dispatch(deleteStudent(id));
  }

  function handlePreviousPage() {
    const currentPage = page - 1;
    loadStudents(currentPage);
  }

  function handleNextPage() {
    const currentPage = page + 1;
    loadStudents(currentPage);
  }

  return (
    <Container>
      <div>
        <h1>Gerenciando alunos</h1>

        <ActionsContainer>
          <Link to="/student">
            <ButtonAdd>
              <FiPlus />
              cadastrar
            </ButtonAdd>
          </Link>

          <span>
            <MdSearch color="#999999" size={16} />
            <input
              name="studentName"
              placeholder="Buscar aluno"
              onChange={e => loadStudents(1, e.target.value)}
            />
          </span>
        </ActionsContainer>
      </div>

      <ListContainer>

      {students && students.length > 0 ? (
        <>
          <Table>
            <thead>
                <tr>
                  <th>nome</th>
                  <th>e-mail</th>
                  <th>idade</th>
                  <th> </th>
                </tr>
            </thead>
            <tbody>
              {students.map(student => (
                  <tr key={student.email}>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.age}</td>
                    <td>
                      <Link to={`/student/${student.id}`}>
                        <Button color="#2054C3">editar</Button>
                      </Link>
                      <Button
                        onClick={() => handleDeleteStudent(student)}
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
        <span>Você não tem alunos cadastrados no momento.</span>
      )}

      </ListContainer>
    </Container>
  );
}

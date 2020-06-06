import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';

import {
  Container,
  ListContainer,
  Table,
  Button,
  ModalContainer,
  ButtonSendAnswer,
} from './styles';
import {
  getHelpOrders,
  answerHelpOrder,
  showModalHelpOrder,
} from '~/store/modules/helpOrder/actions';
import Pagination from '~/components/Pagination';

export default function HelpOrders() {
  const [lastPage, setLastPage] = useState(true);
  const [page, setPage] = useState(1);
  const [answer, setAnswer] = useState(false);
  const [helpOrderSelected, setHelpOrderSelected] = useState({});
  const { helpOrders, hasMoreItems } = useSelector(state => state.helpOrder);
  const { showModal } = useSelector(state => state.helpOrder);
  const dispatch = useDispatch();

  async function loadHelpOrders(currentPage) {
    await dispatch(getHelpOrders(currentPage));

    setPage(currentPage);
    setLastPage(!hasMoreItems);
  }

  useEffect(() => {
    loadHelpOrders(1);
  }, []);

  function handlePreviousPage() {
    const currentPage = page - 1;
    loadHelpOrders(currentPage);
  }

  function handleNextPage() {
    const currentPage = page + 1;
    loadHelpOrders(currentPage);
  }

  function handleSubmitAnswer() {
    dispatch(answerHelpOrder(helpOrderSelected.id, answer));
  }

  function setShowModal(boolean) {
    dispatch(showModalHelpOrder(boolean));
  }

  const ModalStyles = width => ({
    content: {
      top: '30%',
      left: width > 768 ? '30%' : '10%',
      right: width > 768 ? '30%' : '10%',
      bottom: 'auto',
      padding: '20px',
    },
    overlay: {
      backgroundColor: 'rgba(10, 8, 8, 0.75)',
    },
  });

  return (
    <Container>
      <div>
        <h1>Pedidos de auxílio</h1>
      </div>

      <ListContainer>
        {helpOrders && helpOrders.length > 0 ? (
          <>
            <Table>
              <thead>
                  <tr>
                    <th>aluno</th>
                    <th> </th>
                  </tr>
              </thead>
              <tbody>
                {helpOrders &&
                  helpOrders.map(helpOrder => (
                    <tr key={helpOrder.id}>
                      <td>{helpOrder.student.name}</td>
                      <td>
                        <Button
                          onClick={() => {
                            setShowModal(true);
                            setHelpOrderSelected(helpOrder);
                          }}
                          color="#2054C3"
                        >
                          responder
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
          <span>
            Você não tem perguntas pendentes de serem respondidas no momento.
          </span>
        )}
      </ListContainer>

      <Modal
        isOpen={showModal}
        style={ModalStyles(window !== undefined ? window.innerWidth : 0)}
        onRequestClose={() => setShowModal(false)}
      >
        <ModalContainer>
          <strong>PERGUNTA DO ALUNO</strong>
          <span>{helpOrderSelected.question}</span>
          <strong>SUA RESPOSTA</strong>
          <textarea
            placeholder="exemplo@email.com"
            rows="8"
            cols="50"
            onChange={e => setAnswer(e.target.value)}
          />
          <ButtonSendAnswer onClick={() => handleSubmitAnswer()}>
            Responder aluno
          </ButtonSendAnswer>
        </ModalContainer>
      </Modal>
    </Container>
  );
}

import styled from 'styled-components';

export const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  div:first-child {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    margin: 30px 0;
  }

  h1 {
    font-size: 24px;
    font-weight: 500;
  }
`;

export const ListContainer = styled.div`
  padding: 20px;
  background-color: #fff;
  border-radius: 6px;
`;

export const Table = styled.table`
  width: 100%;
  text-align: center;
  align-items: center;
  border-collapse: collapse;

  thead {
    tr {
      border: 0;
    }
    th {
      text-transform: uppercase;
    }
  }

  tr {
    height: 50px;
    border-bottom: 2px solid #eee;

    td:last-child {
      float: right;
    }
  }

  td,
  th {
    width: 30%;
    text-align: left;
    padding: 10px;
  }
`;

export const Button = styled.span`
  color: ${props => props.color};
  margin: 10px;
  cursor: pointer;
`;

export const ModalContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  strong,
  span,
  textarea {
    text-align: left;
    width: 100%;
    margin: 6px 0;
  }

  span {
    color: #666;
    margin: 0 0 10px 0;
  }

  textarea {
    resize: none;
    border: 1px solid #ddd;
    border-radius: 6px;
    padding: 10px;
    font-size: 14px;
  }
`;

export const ButtonSendAnswer = styled.button`
  background-color: #ed4c64;
  display: flex;
  align-items: center;
  border-radius: 6px;
  padding: 10px 25px;
  color: #fff;
  width: 100%;
  font-weight: 500;
  margin-top: 6px;
  cursor: pointer;
  height: 40px;
  justify-content: center;
  text-transform: uppercase;
  text-align: center;
  svg {
    margin-right: 5px;
  }
  :hover {
    opacity: 0.7;
  }
  :active {
    border-style: none;
  }
`;

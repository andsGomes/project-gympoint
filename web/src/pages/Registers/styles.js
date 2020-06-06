import styled from 'styled-components';

export const Container = styled.div`
  margin: 0 40px;
  display: flex;
  flex-direction: column;
  /* justify-content: center;
  align-items: center; */

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
  }

  td,
  th {
    width: 30%;
    text-align: left;
    padding: 10px;

    img {
      width: 20px;
      height: 20px;
    }
  }
`;

export const Button = styled.span`
  color: ${props => props.color};
  margin: 10px;
  cursor: pointer;
`;

export const ButtonAdd = styled.button`
  background-color: #ed4c64;
  display: flex;
  align-items: center;
  border-radius: 6px;
  padding: 10px 25px;
  color: #fff;
  font-weight: 500;
  margin: 0 10px;
  cursor: pointer;
  height: 40px;
  justify-content: space-between;
  text-transform: uppercase;
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

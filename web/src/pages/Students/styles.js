import styled from 'styled-components';

export const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
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

export const ActionsContainer = styled.div`
  display: flex;
  flex-direction: row;

  span {
    display: flex;
    align-items: center;
    position: relative;
    svg {
      position: absolute;
      left: 10px;
    }
    input {
      width: 237px;
      height: 40px;
      border: 1px solid #dddddd;
      border-radius: 6px;
      padding-left: 35px;
    }
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

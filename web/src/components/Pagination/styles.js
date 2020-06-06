import styled from 'styled-components';

export const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;

  span {
    margin: 0 10px;
    font-weight: bold;
  }

  button {
    padding: 10px 25px;
    border-radius: 6px;
    background: #f7415a;
    color: #fff;
    text-transform: uppercase;

    &:disabled {
      color: #fff;
      background: #ccc;
      cursor: default;
      opacity: 0.8;
    }
    &:not(:disabled):hover {
      opacity: 0.8;
    }
  }
`;

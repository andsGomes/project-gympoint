import styled from 'styled-components';

export const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  > div:first-child {
    display: flex;
    align-items: center;
    flex-direction: row;
    margin: 30px 0;

    div {
      display: flex;
      flex: 1;
      justify-content: flex-end;
    }

    h1 {
      font-size: 24px;
      font-weight: 500;
    }
  }

  form {
    display: flex;
    flex-direction: column;

    div {
      display: flex;
      flex: 1;
      justify-content: space-between;
      height: 100%;
    }
    input {
      background: #fff;
      border: 1px solid #eee;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #666;
      margin: 0 0 10px;
      &::placeholder {
        color: #ddd;
      }
    }
    span {
      color: #ed4c64;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }
    text {
      color: #454545;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }
    button {
      margin: 5px 0 0;
      height: 44px;
      background: #f7415a;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;
    }
  }
`;

export const ListContainer = styled.div`
  padding: 20px;
  background-color: #fff;
  border-radius: 6px;
`;

export const InputSmall = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  input {
    width: 90%;
  }
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  border-radius: 6px;
  padding: 10px 25px;
  background-color: ${props => props.backgroundColor};
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

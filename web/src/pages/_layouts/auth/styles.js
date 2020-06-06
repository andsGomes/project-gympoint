import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100%;
  background: #f7415a;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 315px;
  text-align: center;
  border-radius: 8px;
  background-color: #fff;
  padding: 20px;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
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
    a {
      color: #000;
      margin-top: 15px;
      font-size: 16px;
      opacity: 0.8;
      &:hover {
        opacity: 1;
      }
    }
  }
`;

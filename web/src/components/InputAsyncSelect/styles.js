import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  .asyncSelectInput {
    display: flex;
    flex-direction: column;
    height: 45px;
    justify-content: center;
    input {
      height: 35px;
    }
  }

  .css-yk16xz-control {
    border-color: #eee;
  }
  .css-1wa3eu0-placeholder {
    color: #666;
  }
  span {
    margin-left: 10px;
    color: red;
    font-size: 14px;
  }
`;

import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  .selectInput {
    height: 44px;
    min-width: 130px;
    input {
      height: 23px;
    }
  }
  .css-1wa3eu0-placeholder {
    position: unset;
  }
  .css-1uccc91-singleValue {
    position: unset;
  }
  .css-yk16xz-control,
  .css-1pahdxg-control {
    border-color: #eee;
    height: 44px;
  }
  span {
    margin-left: 10px;
    color: red;
    font-size: 14px;
  }
`;

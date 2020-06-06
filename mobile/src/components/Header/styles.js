import styled from 'styled-components';

export const HeaderContainer = styled.View`
  background: #fff;
  height: 44px;
  border-bottom-width: 1px;
  border-bottom-color: #ddd;

  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const HeaderImage = styled.Image`
  width: 40px;
  height: 20px;
`;

export const HeaderText = styled.Text`
  font-size: 16px;
  line-height: 16px;
  font-weight: bold;
  color: #f7415a;
  margin-left: 8px;
`;

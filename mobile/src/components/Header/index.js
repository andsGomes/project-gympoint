import React from 'react';

import logo from '~/assets/logo.png';

import { HeaderContainer, HeaderImage, HeaderText } from './styles';

export default function Header() {
  return (
    <HeaderContainer>
      <HeaderImage source={logo} />
      <HeaderText>GYMPOINT</HeaderText>
    </HeaderContainer>
  );
}

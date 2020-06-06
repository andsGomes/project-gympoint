import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Content } from './styles';
import Header from '~/components/Header';

export default function DefaultLayout({ children }) {
  const page = children.props.match.path;

  return (
    <Wrapper>
      <Header page={page} />
      <Content>{children}</Content>
    </Wrapper>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

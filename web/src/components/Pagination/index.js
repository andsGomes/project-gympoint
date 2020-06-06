import React from 'react';
import PropTypes from 'prop-types';

import { PaginationContainer } from './styles';

export default function Pagination({
  lastPage,
  page,
  handlePreviousPage,
  handleNextPage,
  ...rest
}) {
  return (
    <PaginationContainer {...rest}>
      <button
        type="button"
        disabled={page === 1}
        onClick={() => {
          handlePreviousPage();
        }}
      >
        Anterior
      </button>

      <span>{page}</span>

      <button
        disabled={lastPage}
        type="button"
        onClick={() => {
          handleNextPage();
        }}
      >
        Próxima
      </button>
    </PaginationContainer>
  );
}

Pagination.defaultProps = {
  page: '',
};
Pagination.propTypes = {
  lastPage: PropTypes.bool.isRequired,
  page: PropTypes.number,
  handlePreviousPage: PropTypes.func.isRequired,
  handleNextPage: PropTypes.func.isRequired,
};

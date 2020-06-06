import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { signOut } from '~/store/modules/auth/actions';
import { Container, Content, Pages, PageItem, Profile } from './styles';
import logo from '../../assets/logo.png';

export default function Header({ page }) {
  const dispatch = useDispatch();
  const { name } = useSelector(state => state.user.profile);

  const pagesItem = [
    { route: '/students', label: 'alunos' },
    { route: '/plans', label: 'planos' },
    { route: '/registrations', label: 'matrículas' },
    { route: '/helpOrders', label: 'pedidos de auxílio' },
  ];

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <Link to="/students">
            <img src={logo} alt="GymPoint" />
          </Link>
        </nav>

        <Pages>
          {pagesItem.map(pageItem => (
            <PageItem
              key={pageItem.route}
              to={pageItem.route}
              selected={pageItem.route.includes(page)}
            >
              {pageItem.label}
            </PageItem>
          ))}
        </Pages>
        <aside>
          <Profile>
            <div>
              <a href="#">{name}</a>
              <button type="button" onClick={handleSignOut}>
                sair do sistema
              </button>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}

Header.propTypes = {
  page: PropTypes.string.isRequired,
};

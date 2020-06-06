import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Header from '~/components/Header';
import Button from '~/components/Button';
import api from '~/services/api';
import {
  Container,
  Content,
  HelpOrderList,
  HelpOrder,
  HelpOrderHeader,
  HelpOrderAnswered,
  HelpOrderDate,
  HelpOrderQuestion,
  Empty,
  EmptyText,
} from './styles';

function HelpOrders({ navigation, isFocused }) {
  const [page, setPage] = useState(1);
  const [scrollMomentum, setScrollMomentum] = useState(false);
  const [showLoadingMore, setShowLoadingMore] = useState(false);
  const [moreData, setMoreData] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [helpOrders, setHelpOrders] = useState([]);

  const student = useSelector(state => state.student.student);

  async function getHelpOrders(newPage) {
    const { data } = await api.get(`students/${student.id}/help-orders`, {
      params: { page: newPage },
    });

    setMoreData(!data.hasMoreItems);

    const newData = data.content.map(helpOrder => ({
      ...helpOrder,
      formattedDate: formatRelative(
        parseISO(helpOrder.created_at),
        new Date(),
        {
          locale: pt,
          addSuffix: true,
        }
      ),
    }));

    if (newPage === 1) {
      setHelpOrders(newData);
    } else {
      setHelpOrders([...helpOrders, ...newData]);
    }

    setPage(newPage);

    setLoadingMore(false);
    setRefreshing(false);
    setShowLoadingMore(false);
  }

  useEffect(() => {
    if (refreshing) {
      getHelpOrders(1);
    }
  }, [refreshing]);

  useEffect(() => {
    getHelpOrders(1);
  }, [isFocused]);

  async function handleLoadMore() {
    setScrollMomentum(false);
    setLoadingMore(true);
    const newPage = page + 1;
    await getHelpOrders(newPage);
  }

  async function onRefresh() {
    setRefreshing(true);
  }

  function renderFooter() {
    return (
      <View style={{ marginTop: 10 }}>
        <ActivityIndicator size={22} />
      </View>
    );
  }

  return (
    <>
      <Container>
        <Header />

        <Content>
          <Button onPress={() => navigation.navigate('HelpOrderAsk')}>
            Novo pedido de auxílio
          </Button>

          {helpOrders.length ? (
            <HelpOrderList
              onRefresh={onRefresh}
              refreshing={refreshing}
              onEndReachedThreshold={0.1}
              onEndReached={() => {
                if (
                  !loadingMore &&
                  !refreshing &&
                  scrollMomentum &&
                  moreData
                ) {
                  handleLoadMore();
                }
              }}
              onMomentumScrollBegin={() => {
                setScrollMomentum(true);
                if (moreData) {
                  setShowLoadingMore(true);
                }
              }}
              data={helpOrders}
              keyExtractor={item => String(item.id)}
              ListFooterComponent={showLoadingMore && renderFooter}
              renderItem={({ item }) => (
                <HelpOrder
                  onPress={() =>
                    navigation.navigate('HelpOrderQuestion', { item })
                  }
                >
                  <HelpOrderHeader>
                    <Icon
                      name="check-circle"
                      color={item.answer ? '#42CB59' : '#999'}
                      size={16}
                    />
                    <HelpOrderAnswered answered={item.answer}>
                      {item.answer ? 'Respondido' : 'Sem resposta'}
                    </HelpOrderAnswered>
                    <HelpOrderDate>{item.formattedDate}</HelpOrderDate>
                  </HelpOrderHeader>
                  <HelpOrderQuestion>{item.question}</HelpOrderQuestion>
                </HelpOrder>
              )}
            />
          ) : (
            <Empty
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            >
              <EmptyText>Nada encontrado</EmptyText>
            </Empty>
          )}
        </Content>
      </Container>
    </>
  );
}

HelpOrders.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  isFocused: PropTypes.bool.isRequired,
};

export default withNavigationFocus(HelpOrders);

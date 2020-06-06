import React, { useState, useEffect } from 'react';
import { View, Alert, ActivityIndicator, RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';
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
  CheckinList,
  Checkin,
  CheckinNumber,
  CheckinDate,
  Empty,
  EmptyText,
} from './styles';

export default function Checkins() {
  const [page, setPage] = useState(1);
  const [scrollMomentum, setScrollMomentum] = useState(false);
  const [showLoadingMore, setShowLoadingMore] = useState(false);
  const [moreData, setMoreData] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [checkins, setCheckins] = useState([]);
  const [totalCheckins, setTotalCheckins] = useState(0);
  const student = useSelector(state => state.student.student);

  useEffect(() => {
    getCheckins(page);
  }, []);

  useEffect(() => {
    if (refreshing) {
      getCheckins(1);
    }
  }, [refreshing]);

  function removeDuplicates(list, attribute) {
    return list.filter(
      (item, pos) =>
        list.map(checkin => checkin[attribute]).indexOf(item[attribute]) === pos
    );
  }

  function formatDateRelative(date) {
    return formatRelative(parseISO(date), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }

  async function getCheckins(newPage) {
    const { data } = await api.get(`students/${student.id}/checkins`, {
      params: { page: newPage },
    });

    setTotalCheckins(data.totalItems);
    setMoreData(!data.hasMoreItems);

    const newData = data.content.map(checkin => ({
      ...checkin,
      formattedDate: formatDateRelative(checkin.created_at),
    }));

    if (newPage === 1) {
      setCheckins(newData);
    } else {
      const newCheckins = [...checkins, ...newData];
      setCheckins(removeDuplicates(newCheckins, 'id'));
    }

    setPage(newPage);

    setLoadingMore(false);
    setRefreshing(false);
    setShowLoadingMore(false);
  }

  async function handleCreateCheckin() {
    try {
      const { data } = await api.post(`/students/${student.id}/checkins`);

      const newCheckins = [
        { ...data, formattedDate: formatDateRelative(data.createdAt) },
        ...checkins,
      ];

      setCheckins(newCheckins);
      setTotalCheckins(totalCheckins + 1);
    } catch (err) {
      Alert.alert('Erro', err.response.data.error);
    }
  }

  async function handleLoadMore() {
    setScrollMomentum(false);
    setLoadingMore(true);
    const newPage = page + 1;
    await getCheckins(newPage);
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
          <Button onPress={handleCreateCheckin}>Novo check-in</Button>

          {checkins.length ? (
            <CheckinList
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
              data={checkins}
              keyExtractor={item => String(item.id)}
              ListFooterComponent={showLoadingMore && renderFooter}
              renderItem={({ item, index }) => (
                <Checkin>
                  <CheckinNumber>{`Check-in #${item.id}`}</CheckinNumber>
                  <CheckinDate>{item.formattedDate}</CheckinDate>
                </Checkin>
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

const tabBarIcon = ({ tintColor }) => (
  <Icon name="edit-location" size={20} color={tintColor} />
);

tabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

Checkins.navigationOptions = {
  tabBarLabel: 'Check-ins',
  tabBarIcon,
};

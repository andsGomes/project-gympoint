import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from '~/pages/SignIn';
import Checkins from '~/pages/Checkins';
import HelpOrders from '~/pages/HelpOrders';
import HelpOrderQuestion from '~/pages/HelpOrder';
import HelpOrderAsk from '~/pages/HelpOrderAsk';

const tabBarIcon = ({ tintColor }) => (
  <Icon name="live-help" size={20} color={tintColor} />
);

tabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        SignIn,
        App: {
          screen: createBottomTabNavigator(
            {
              Checkins,
              HelpOrders: {
                screen: createStackNavigator(
                  {
                    HelpOrders,
                    HelpOrderQuestion,
                    HelpOrderAsk,
                  },
                  {
                    defaultNavigationOptions: {
                      headerTitle: '',
                      headerTransparent: true,
                      headerTintColor: 'black',
                      headerBackTitleVisible: false,
                      headerLeftContainerStyle: {
                        marginLeft: 20,
                      },
                    },
                  }
                ),
                navigationOptions: {
                  tabBarLabel: 'Pedir ajuda',
                  tabBarIcon,
                },
              },
            },
            {
              resetOnBlur: true,
              tabBarOptions: {
                keyboardHidesTabBar: true,
                activeTintColor: '#f7415a',
                inactiveTintColor: '#999',
              },
            }
          ),
        },
      },
      {
        initialRouteName: signedIn ? 'App' : 'SignIn',
      }
    )
  );

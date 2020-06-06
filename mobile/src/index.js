import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { StatusBar, SafeAreaView } from 'react-native';

import '~/config/ReactotronConfig';

import App from '~/App';

import { store, persistor } from '~/store';

export default function Index() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaView style={{ backgroundColor: '#FFF' }} />
        <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
        <App />
      </PersistGate>
    </Provider>
  );
}

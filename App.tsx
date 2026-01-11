import React from 'react';
import { KeyboardAvoidingView, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import store, { persistor } from './src/store';
import Navigation from './src/router/Navigation';
import { PersistGate } from 'redux-persist/integration/react';

const Component = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={`padding`}>
          <StatusBar
            barStyle={`dark-content`}
            translucent
            backgroundColor={`transparent`}
          />
          <Navigation />
        </KeyboardAvoidingView>
      </PersistGate>
    </Provider>
  );
};

export default Component;

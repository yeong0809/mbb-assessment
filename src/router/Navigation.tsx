import React, { useEffect, useRef, useState } from 'react';
import {
  NavigationContainer,
  CommonActions,
  getStateFromPath,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Linking } from 'react-native';

import DashboardScreen from '../app/Dashboard/Dashboard';
import PlaceDetailsScreen from '../app/PlaceDetails/PlaceDetails';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

// Don't rely on automatic linking handling
const linking = {
  prefixes: [`historicalplaces://`],
  config: {
    screens: {
      Dashboard: ``,
      PlaceDetails: `place/:placeId`,
    },
  },
};

const PagesNavigation: React.FC = () => {
  const navigatorRef = useRef<any>(null);
  const [ready, setReady] = useState(false);

  const handleDeepLink = async (url?: string) => {
    const incomingUrl = url || (await Linking.getInitialURL());
    if (!incomingUrl || !navigatorRef.current) {
      return;
    }

    const normalizedUrl = incomingUrl.replace(/\/$/, ``);
    const urlWithoutScheme = normalizedUrl.replace(
      /^historicalplaces:\/\//,
      ``,
    );
    const state = getStateFromPath(urlWithoutScheme, linking.config);

    if (!state || state.routes.length === 0) {
      return;
    }

    // Build stack manually: Dashboard behind if needed
    const newRoutes =
      state.routes[0].name === `Dashboard`
        ? state.routes
        : [{ name: `Dashboard` }, ...state.routes];

    navigatorRef.current.dispatch(
      CommonActions.reset({
        index: newRoutes.length - 1, // last route active
        routes: newRoutes,
      }),
    );
  };

  useEffect(() => {
    if (!ready) {
      return;
    }

    // Handle initial URL
    handleDeepLink();

    // Subscribe to background links
    const subscription = Linking.addEventListener(`url`, ({ url }) => {
      handleDeepLink(url);
    });

    return () => {
      return subscription.remove();
    };
  }, [ready]);

  return (
    <NavigationContainer
      ref={navigatorRef}
      onReady={() => {
        return setReady(true);
      }}
      linking={linking} // can keep linking for fallback paths
    >
      <Stack.Navigator
        initialRouteName="Dashboard"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="PlaceDetails" component={PlaceDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default PagesNavigation;

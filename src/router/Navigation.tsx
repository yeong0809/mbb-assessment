import React, { useEffect, useRef } from 'react';
import { NavigationContainer, CommonActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Linking } from 'react-native';

import DashboardScreen from '../app/Dashboard/Dashboard';
import PlaceDetailsScreen from '../app/PlaceDetails/PlaceDetails';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

// Linking config for deep links
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

  useEffect(() => {
    const handleDeepLink = async () => {
      const url = await Linking.getInitialURL();
      if (!url) {
        return;
      }

      // Remove trailing slash
      const normalizedUrl = url.replace(/\/$/, ``);

      // Try to find matching screen in linking.config
      const screenEntries = Object.entries(linking.config.screens);

      let matchedScreen: { name: string; params?: any } | null = null;

      for (const [screenName, path] of screenEntries) {
        // path may include :param
        if (!path) {
          if (normalizedUrl.endsWith(screenName.toLowerCase())) {
            matchedScreen = { name: screenName };
            break;
          }
        } else {
          // Convert path to regex
          const regexStr = path.replace(/:[^/]+/g, `([^/]+)`);
          const regex = new RegExp(regexStr + `$`);
          const match = normalizedUrl.match(regex);
          if (match) {
            const paramNames = (path.match(/:([^/]+)/g) || []).map((p) => {
              return p.substring(1);
            });
            const params: Record<string, string> = {};
            paramNames.forEach((key, i) => {
              params[key] = match[i + 1];
            });
            matchedScreen = { name: screenName, params };
            break;
          }
        }
      }

      if (!matchedScreen) {
        return;
      }

      // Build stack: inject Dashboard behind if not opening Dashboard
      const newStack =
        matchedScreen.name === `Dashboard`
          ? { index: 0, routes: [{ name: `Dashboard` }] }
          : { index: 1, routes: [{ name: `Dashboard` }, matchedScreen] };

      // Reset navigator stack
      navigatorRef.current?.dispatch(
        CommonActions.reset({
          index: newStack.index,
          routes: newStack.routes,
        }),
      );
    };

    handleDeepLink();
  }, []);

  return (
    <NavigationContainer ref={navigatorRef} linking={linking}>
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

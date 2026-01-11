import React, { useEffect } from 'react';
import {
  View,
  FlatList,
  Text,
  ActivityIndicator,
  Image,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlaces, toggleVisited } from '../../store/places/places.actions';
import type { AppDispatch } from '../../store';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import {
  selectPlaces,
  selectPlacesError,
  selectPlacesLoading,
  selectUnvisitedPlaces,
  selectVisitedIds,
} from '../../store/places/places.selectors';

const DashboardScreen: React.FC = () => {
  const safeAreaInsets = useSafeAreaInsets();
  const navigation = useNavigation();

  const dispatch = useDispatch<AppDispatch>();
  const list = useSelector(selectPlaces);
  const loading = useSelector(selectPlacesLoading);
  const error = useSelector(selectPlacesError);
  const visitedIds = useSelector(selectVisitedIds);
  const unvisitedPlaces = useSelector(selectUnvisitedPlaces);

  useEffect(() => {
    dispatch(fetchPlaces());
  }, [dispatch]);

  const handleRandomPlace = () => {
    if (unvisitedPlaces.length === 0) {
      Alert.alert(`All Done 🎉`, `You have visited all places!`);
      return;
    }

    const random =
      unvisitedPlaces[Math.floor(Math.random() * unvisitedPlaces.length)];

    navigation.navigate(`PlaceDetails`, {
      placeId: random.id,
    });
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={{ ...styles.container, paddingTop: safeAreaInsets.top }}>
      <Text style={styles.headerTitle}>Historical Places</Text>
      <Pressable style={styles.randomButton} onPress={handleRandomPlace}>
        <Text style={styles.randomText}>🎲 Suggest a Place</Text>
      </Pressable>
      <FlatList
        testID={`dashboardList`}
        contentContainerStyle={{ flexGrow: 1 }}
        data={list}
        keyExtractor={(item) => {
          return item.id.toString();
        }}
        renderItem={({ item }) => {
          const visited = visitedIds.includes(item.id);

          return (
            <View style={styles.card}>
              <Pressable
                testID={`place-${item.id}`}
                onPress={() => {
                  return navigation.navigate(`PlaceDetails`, {
                    placeId: item.id,
                  });
                }}
              >
                <Text style={styles.name}>{item.name}</Text>
                <Image
                  source={{ uri: item.image }}
                  style={styles.image}
                  onError={(e) => {
                    console.log(e.nativeEvent.error);
                  }}
                />
                <Text style={styles.description}>{item.description}</Text>
              </Pressable>

              <Pressable
                style={[
                  styles.visitButton,
                  { backgroundColor: visited ? `green` : `orange` },
                ]}
                onPress={() => {
                  return dispatch(toggleVisited(item.id));
                }}
              >
                <Text style={styles.visitButtonText}>
                  {visited ? `Visited ✅` : `Mark as Visited`}
                </Text>
              </Pressable>
            </View>
          );
        }}
        initialNumToRender={5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: { flex: 1, justifyContent: `center`, alignItems: `center` },
  headerTitle: {
    fontSize: 32,
    fontWeight: `bold`,
    marginHorizontal: 12,
    marginVertical: 24,
  },
  randomButton: {
    margin: 10,
    padding: 14,
    backgroundColor: `#4b7bec`,
    borderRadius: 8,
    alignItems: `center`,
  },
  randomText: {
    color: `white`,
    fontWeight: `bold`,
    fontSize: 16,
  },
  card: {
    margin: 10,
    padding: 10,
    backgroundColor: `#fff`,
    borderRadius: 8,
    shadowColor: `#000`,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  name: { fontSize: 18, fontWeight: `bold` },
  description: { marginTop: 5, fontSize: 14 },
  image: { width: `100%`, height: 150, borderRadius: 8, marginTop: 5 },
  visitButton: {
    marginTop: 10,
    padding: 8,
    borderRadius: 5,
    alignItems: `center`,
  },
  visitButtonText: { color: `white`, fontWeight: `bold` },
});

export default DashboardScreen;

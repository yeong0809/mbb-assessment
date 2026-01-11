import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlaces, toggleVisited } from '../../store/places/places.actions';
import type { RootState, AppDispatch } from '../../store';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../router/types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  selectPlaces,
  selectPlacesError,
  selectPlacesLoading,
} from '../../store/places/places.selectors';

type Props = NativeStackScreenProps<RootStackParamList, `PlaceDetails`>;

const PlaceDetailsScreen: React.FC<Props> = ({ route, navigation }) => {
  const safeAreaInsets = useSafeAreaInsets();

  const { placeId } = route.params;

  const dispatch = useDispatch<AppDispatch>();
  const list = useSelector(selectPlaces);
  const loading = useSelector(selectPlacesLoading);
  const error = useSelector(selectPlacesError);
  const place = useSelector((state: RootState) => {
    return state.places.list.find((p) => {
      return p.id === Number(placeId);
    });
  });

  const isVisited = useSelector((state: RootState) => {
    return state.places.visitedIds.includes(placeId);
  });

  useEffect(() => {
    if (list.length === 0) {
      dispatch(fetchPlaces());
    }
  }, [dispatch, list.length]);

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

  if (!place) {
    return (
      <View style={styles.centered}>
        <Text>Place not found</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        ...styles.container,
        paddingTop: safeAreaInsets.top,
      }}
    >
      <Pressable
        style={{ marginTop: 32, marginBottom: 6, alignSelf: `flex-start` }}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Text style={styles.backText}>{`く Back`}</Text>
      </Pressable>
      <Text style={styles.headerTitle}>{place.name}</Text>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <Image
          source={{
            uri: place.image,
          }}
          style={styles.image}
        />
        <Text style={styles.description}>{place.description}</Text>

        <Pressable
          style={[
            styles.visitButton,
            { backgroundColor: isVisited ? `green` : `orange` },
          ]}
          onPress={() => {
            return dispatch(toggleVisited(placeId));
          }}
        >
          <Text style={styles.visitText}>
            {isVisited ? `Visited ✅` : `Mark as Visited`}
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  backText: {
    fontSize: 20,
    color: `rgba(0,80,255,1)`,
  },
  centered: {
    flex: 1,
    justifyContent: `center`,
    alignItems: `center`,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: `bold`,
    marginHorizontal: 12,
    marginVertical: 24,
  },
  name: {
    fontSize: 24,
    fontWeight: `bold`,
  },
  image: {
    width: `100%`,
    height: 250,
    borderRadius: 10,
    marginVertical: 16,
  },
  description: {
    fontSize: 16,
  },
  visitButton: {
    marginTop: 20,
    padding: 12,
    borderRadius: 8,
    alignItems: `center`,
  },
  visitText: {
    color: `white`,
    fontSize: 16,
    fontWeight: `bold`,
  },
});

export default PlaceDetailsScreen;

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import {
  useRocketDispatch,
  useRocketsState,
  getRockets,
  getRocketFamilies,
  useRocketFamilyDispatch,
} from '../context/index';
import RocketCard from './rocketCard/index';

//TODO: Make agency card
const RocketsList = ({ navigation }) => {
  const { rockets, status, error } = useRocketsState();

  const rocketsDispatch = useRocketDispatch();
  const rocketFamiliesDispatch = useRocketFamilyDispatch();

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isOptimistic, setIsOptimistic] = useState(true);
  const optimisticUIItems = useRef([]);

  useEffect(() => {
    const createOptimisticUIList = (length) => {
      const array = [];

      for (let i = 0; i < length; i++) {
        array.push(
          <View
            style={[
              styles.optimisticItem,
              { width: `${Math.floor(Math.random() * 101) + 25}%` },
            ]}
          />,
        );
      }
      return array;
    };

    optimisticUIItems.current = createOptimisticUIList(45);
  }, []);

  useEffect(() => {
    getRockets(rocketsDispatch, () => setIsOptimistic(false));
  }, [rocketsDispatch]);

  useEffect(() => {
    getRocketFamilies(rocketFamiliesDispatch);
  }, [rocketFamiliesDispatch]);

  // handle refresh list
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await getRockets(rocketsDispatch);
    setIsRefreshing(false);
  }, [rocketsDispatch]);

  const handlePress = (item) => {
    navigation.navigate('RocketDetail', { rocket: item });
  };

  return (
    <SafeAreaView style={styles.view}>
      {isOptimistic ? (
        <SafeAreaView style={styles.view}>
          <FlatList
            data={optimisticUIItems.current}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => item}
          />
        </SafeAreaView>
      ) : null}

      {rockets && status !== 'error' && !isOptimistic ? (
        <FlatList
          style={styles.list}
          data={rockets}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <RocketCard data={item} onPress={() => handlePress(item)} />
          )}
          refreshControl={
            <RefreshControl
              tintColor="tomato"
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
            />
          }
          // refreshing={isRefreshing}
          // onRefresh={handleRefresh}
        />
      ) : (
        <Text>{error}</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  list: {
    paddingHorizontal: 15,
  },
  optimisticItem: {
    backgroundColor: 'pink',
    height: 15,
    marginBottom: 2,
  },
});

export default RocketsList;

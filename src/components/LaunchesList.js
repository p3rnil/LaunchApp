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
  useLaunchesState,
  useLaunchesDispatch,
  getNextLaunches,
} from '../context/LaunchContext';
import { useLaunchesStatusDispatch, getLaunchesStatus } from '../context/index';
import LaunchCard from './launchCard/index';

// TODO: Update Optimistic
// TODO: Remove hardcoded launch number
const LaunchesList = ({ handlePress }) => {
  const [launches, setLaunches] = useState(null);
  const { status, error } = useLaunchesState();
  const launchStatusDispatch = useLaunchesStatusDispatch();
  const launchesDispatch = useLaunchesDispatch();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isOptimistic, setIsOptimistic] = useState(true);
  const optimisticUIItems = useRef([]);

  useEffect(() => {
    getLaunchesStatus(launchStatusDispatch);
  }, [launchStatusDispatch]);

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

    optimisticUIItems.current = createOptimisticUIList(10);
  }, []);

  useEffect(() => {
    getNextLaunches(10, launchesDispatch, (data) => {
      setLaunches(data);
      setIsOptimistic(false);
    });
  }, [launchesDispatch]);

  // handle refresh list
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await getNextLaunches(10, launchesDispatch, (data) => {
      setLaunches(data);
    });
    setIsRefreshing(false);
  }, [launchesDispatch]);

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

      {status !== 'error' && !isOptimistic ? (
        <FlatList
          style={styles.list}
          data={launches}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <LaunchCard data={item} onPress={() => handlePress(item)} />
          )}
          refreshControl={
            <RefreshControl
              tintColor="tomato"
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
            />
          }
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

export default LaunchesList;

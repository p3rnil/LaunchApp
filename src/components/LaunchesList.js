import React, { useState, useEffect, useCallback } from 'react';
import {
  SafeAreaView,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import {
  useLaunchesState,
  useLaunchesDispatch,
  getNextLaunches,
  useLaunchesStatusDispatch,
  getLaunchesStatus,
  useLaunchesStatusState,
} from '../context';
import LaunchCard from './launchCard';

// TODO: Remove hardcoded launch number
const LaunchesList = ({ navigation }) => {
  const { launches, error } = useLaunchesState();
  const { launchesStatus } = useLaunchesStatusState();
  const launchesDispatch = useLaunchesDispatch();
  const launchStatusDispatch = useLaunchesStatusDispatch();
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    getNextLaunches(5, launchesDispatch);
  }, [launchesDispatch]);

  useEffect(() => {
    getLaunchesStatus(launchStatusDispatch);
  }, [launchStatusDispatch]);

  // handle refresh list
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await getNextLaunches(5, launchesDispatch);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  }, [launchesDispatch]);

  const handlePress = useCallback(
    (item, ctx) => navigation.navigate('LaunchDetail', { launch: item, ctx }),
    [navigation],
  );

  return (
    <SafeAreaView style={styles.view}>
      {launchesStatus && launches ? (
        <FlatList
          style={styles.list}
          data={launches}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <LaunchCard
              data={item}
              onPress={() => handlePress(item, { launchesStatus })}
            />
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

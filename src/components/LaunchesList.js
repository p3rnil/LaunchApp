import React, { useState, useEffect, useCallback } from 'react';
import {
  SafeAreaView,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  useLaunchesState,
  useLaunchesDispatch,
  updateLaunches,
} from '../context/LaunchContext';

const LaunchesList = ({ handlePress }) => {
  const [launches, setLaunches] = useState(null);
  const { status, error } = useLaunchesState();
  const launchesDispatch = useLaunchesDispatch();
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    updateLaunches(launchesDispatch, (data) => {
      setLaunches(data);
    });
  }, [launchesDispatch]);

  // handle refresh list
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await updateLaunches(launchesDispatch, (data) => {
      setLaunches(data);
    });
    setIsRefreshing(false);
  }, [launchesDispatch]);

  return (
    <SafeAreaView style={styles.view}>
      {status !== 'error' ? (
        <FlatList
          data={launches}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                handlePress(item);
              }}>
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
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
});

export default LaunchesList;

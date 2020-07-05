import React, { useState, useEffect, useCallback } from 'react';
import {
  SafeAreaView,
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
} from '../context';
import RocketCard from './rocketCard';

const RocketsList = ({ navigation }) => {
  const { rockets, status, error } = useRocketsState();

  const rocketsDispatch = useRocketDispatch();
  const rocketFamiliesDispatch = useRocketFamilyDispatch();

  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    getRockets(rocketsDispatch);
  }, [rocketsDispatch]);

  useEffect(() => {
    getRocketFamilies(rocketFamiliesDispatch);
  }, [rocketFamiliesDispatch]);

  // handle refresh list
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await getRockets(rocketsDispatch);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  }, [rocketsDispatch]);

  const handlePress = useCallback(
    (item) => navigation.navigate('RocketDetail', { rocket: item }),
    [navigation],
  );

  return (
    <SafeAreaView style={styles.view}>
      {status !== 'error' ? (
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

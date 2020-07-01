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
  useAgenciesState,
  useAgenciesDispatch,
  getAgencies,
} from '../context/AgenciesContext';
import AgencyCard from '../components/agencyCard/index';

//TODO: Make agency card
const AgenciesList = ({ handlePress }) => {
  const [agencies, setAgencies] = useState(null);
  const { status, error } = useAgenciesState();
  const agenciesDispatch = useAgenciesDispatch();
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
    getAgencies(agenciesDispatch, (data) => {
      setAgencies(data);
      setIsOptimistic(false);
    });
  }, [agenciesDispatch]);

  // handle refresh list
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await getAgencies(agenciesDispatch, (data) => {
      setAgencies(data);
    });
    setIsRefreshing(false);
  }, [agenciesDispatch]);

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
          data={agencies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <AgencyCard data={item} onPress={() => handlePress(item)} />
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

export default AgenciesList;

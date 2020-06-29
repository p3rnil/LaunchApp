import React, { useState, useEffect, useCallback } from 'react';
import {
  SafeAreaView,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  useAgenciesState,
  useAgenciesDispatch,
  updateAgencies,
} from '../context/AgenciesContext';

const AgenciesList = ({ handlePress }) => {
  const [agencies, setAgencies] = useState(null);
  const { status, error } = useAgenciesState();
  const agenciesDispatch = useAgenciesDispatch();
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    updateAgencies(agenciesDispatch, (data) => {
      setAgencies(data);
    });
  }, [agenciesDispatch]);

  // handle refresh list
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await updateAgencies(agenciesDispatch, (data) => {
      setAgencies(data);
    });
    setIsRefreshing(false);
  }, [agenciesDispatch]);

  return (
    <SafeAreaView style={styles.view}>
      {status !== 'error' ? (
        <FlatList
          data={agencies}
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

export default AgenciesList;

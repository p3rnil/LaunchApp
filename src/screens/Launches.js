import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import {
  LaunchProvider,
  useLaunchesState,
  useLaunchesDispatch,
  updateLaunches,
} from '../context/LaunchContext';

// TODO: Make a new component for the list
const LaunchesUpdate = () => {
  const { launches, status, error } = useLaunchesState();
  const launchesDispatch = useLaunchesDispatch();
  console.log(status);

  useEffect(() => {
    updateLaunches(launchesDispatch);
  }, [launchesDispatch]);

  return <Text>Hola</Text>;
};

const Launches = () => {
  return (
    <LaunchProvider>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Launches!</Text>
        <LaunchesUpdate />
      </View>
    </LaunchProvider>
  );
};

export default Launches;

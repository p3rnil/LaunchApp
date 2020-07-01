import React from 'react';
import { LaunchesList } from '../components/index';
import { LaunchProvider } from '../context/index';
import { LaunchStatusProvider } from '../context/index';

const Launches = ({ navigation }) => {
  const handlePress = (item) => {
    navigation.navigate('LaunchDetail', {
      item,
    });
  };

  return (
    <LaunchProvider>
      <LaunchStatusProvider>
        <LaunchesList handlePress={handlePress} />
      </LaunchStatusProvider>
    </LaunchProvider>
  );
};

export default Launches;

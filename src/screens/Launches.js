import React from 'react';
import { LaunchesList } from '../components/index';
import { LaunchProvider } from '../context/index';

const Launches = ({ navigation }) => {
  const handlePress = (item) => {
    navigation.navigate('LaunchDetail', {
      item,
    });
  };

  return (
    <LaunchProvider>
      <LaunchesList handlePress={handlePress} />
    </LaunchProvider>
  );
};

export default Launches;

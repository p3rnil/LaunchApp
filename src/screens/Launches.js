import React from 'react';
import { LaunchesList } from '../components/index';
import { LaunchProvider } from '../context/index';

const Launches = ({ navigation }) => {
  return (
    <LaunchProvider>
      <LaunchesList navigation={navigation} />
    </LaunchProvider>
  );
};

export default Launches;

import React from 'react';
import { LaunchesList } from '../components/index';
import { LaunchProvider, LaunchStatusProvider } from '../context/index';

const Launches = ({ navigation }) => {
  return (
    <LaunchProvider>
      <LaunchStatusProvider>
        <LaunchesList navigation={navigation} />
      </LaunchStatusProvider>
    </LaunchProvider>
  );
};

export default Launches;

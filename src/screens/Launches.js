import React from 'react';
import { LaunchesList } from '../components';
import { LaunchProvider, LaunchStatusProvider } from '../context';

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

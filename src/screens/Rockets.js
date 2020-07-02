import React from 'react';
import { RocketsList } from '../components/index';
import { AgencyProvider, RocketsProvider } from '../context/index';

const Rockets = ({ navigation }) => {
  return (
    <AgencyProvider>
      <RocketsProvider>
        <RocketsList navigation={navigation} />
      </RocketsProvider>
    </AgencyProvider>
  );
};

export default Rockets;

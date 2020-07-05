import React from 'react';
import { RocketsList } from '../components';
import {
  AgencyProvider,
  RocketsProvider,
  RocketFamilyProvider,
} from '../context';

const Rockets = ({ navigation }) => {
  return (
    <AgencyProvider>
      <RocketsProvider>
        <RocketFamilyProvider>
          <RocketsList navigation={navigation} />
        </RocketFamilyProvider>
      </RocketsProvider>
    </AgencyProvider>
  );
};

export default Rockets;

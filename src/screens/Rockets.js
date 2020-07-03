import React from 'react';
import { RocketsList } from '../components/index';
import {
  AgencyProvider,
  RocketsProvider,
  RocketFamilyProvider,
} from '../context/index';

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

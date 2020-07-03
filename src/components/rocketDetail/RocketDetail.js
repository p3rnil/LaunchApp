import React from 'react';
import { View } from 'react-native';
import { RocketsProvider, RocketFamilyProvider } from '../../context/index';
import RocketContent from './RocketContent';

// TODO: Just a placeholder, make it functional >:)
const RocketDetail = ({ route, data }) => {
  const { rocket } = route.params;

  return (
    <RocketsProvider>
      <RocketFamilyProvider>
        <View>
          <RocketContent data={rocket} />
        </View>
      </RocketFamilyProvider>
    </RocketsProvider>
  );
};

export default RocketDetail;

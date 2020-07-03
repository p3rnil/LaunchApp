import React from 'react';
import { View, Text } from 'react-native';
import { RocketsProvider } from '../../context/index';
import RocketContent from './RocketContent';

// TODO: Just a placeholder, make it functional >:)
const RocketDetail = ({ route, data }) => {
  const { rocket } = route.params;

  return (
    <RocketsProvider>
      <View>
        <RocketContent data={rocket} />
      </View>
    </RocketsProvider>
  );
};

export default RocketDetail;

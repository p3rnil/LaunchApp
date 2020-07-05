import React from 'react';
import { View, StyleSheet } from 'react-native';
import { RocketsProvider, RocketFamilyProvider } from '../../context';
import RocketContent from './RocketContent';

const RocketDetail = ({ route, data }) => {
  const { rocket } = route.params;

  return (
    <RocketsProvider>
      <RocketFamilyProvider>
        <View style={styles.view}>
          <RocketContent data={rocket} />
        </View>
      </RocketFamilyProvider>
    </RocketsProvider>
  );
};

const styles = StyleSheet.create({
  view: {
    padding: 15,
  },
});

export default RocketDetail;

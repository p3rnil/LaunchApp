import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LaunchesList } from '../components/index';
import { LaunchProvider } from '../context/index';

const Launches = () => {
  return (
    <LaunchProvider>
      <View style={styles.view}>
        <LaunchesList />
      </View>
    </LaunchProvider>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
});

export default Launches;

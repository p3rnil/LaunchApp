import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LaunchesList } from '../components/index';
import { LaunchProvider } from '../context/index';

const Launches = ({ navigation }) => {
  const handlePress = (item) => {
    navigation.navigate('LaunchDetail', {
      item,
    });
  };

  return (
    <LaunchProvider>
      <View style={styles.view}>
        <LaunchesList handlePress={handlePress} />
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

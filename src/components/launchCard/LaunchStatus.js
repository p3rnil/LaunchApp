import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLaunchesStatusState } from '../../context/index';

const LaunchStatus = ({ id }) => {
  const { launchesStatus } = useLaunchesStatusState();

  return (
    <View
      style={[
        styles.status,
        id === 1 || id === 3 || id === 6 ? styles.go : styles.tba,
      ]}>
      {launchesStatus ? (
        <Text numberOfLines={1} ellipsizeMode="tail">
          {launchesStatus[id - 1].name}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  status: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  go: {
    backgroundColor: '#7aae79',
  },
  tba: {
    backgroundColor: 'coral',
  },
});

export default LaunchStatus;

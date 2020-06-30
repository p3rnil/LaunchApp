import React from 'react';
import { View, StyleSheet } from 'react-native';

const Divider = () => {
  return <View style={styles.divider} />;
};

const styles = StyleSheet.create({
  divider: {
    width: '100%',
    height: 1,
    marginVertical: 15,
    opacity: 0.2,
    backgroundColor: 'black',
  },
});

export default Divider;

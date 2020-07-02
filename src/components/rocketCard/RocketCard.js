import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

const RocketCard = ({ data, onPress }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onPress();
      }}>
      <View style={styles.card}>
        <Text style={styles.text} numberOfLines={2} ellipsizeMode="tail">
          {data.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    color: 'red',
    backgroundColor: '#f0f0f0',
    marginVertical: 7.5,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10,
  },
  text: {},
});

export default RocketCard;

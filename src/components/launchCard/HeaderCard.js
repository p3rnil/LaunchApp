import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// TODO: Make status component
const HeaderCard = ({ name, location, date, status }) => {
  return (
    <View style={styles.header}>
      <View style={[styles.status, status === 1 ? styles.go : styles.tba]} />
      <View style={styles.infoHeader}>
        <Text style={styles.textColor} numberOfLines={1} ellipsizeMode="tail">
          {name}
        </Text>
        <Text style={styles.textColor} numberOfLines={1} ellipsizeMode="tail">
          {location}
        </Text>
        <Text style={styles.textColor}>{date}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textColor: {
    color: 'black',
  },
  header: {
    flexDirection: 'row',
    padding: 15,
  },
  status: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 15,
  },
  infoHeader: {
    flex: 1,
  },
  go: {
    backgroundColor: '#7aae79',
  },
  tba: {
    backgroundColor: 'coral',
  },
});

export default HeaderCard;

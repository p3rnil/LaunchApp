import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LaunchStatus from './LaunchStatus';

const HeaderCard = ({ name, location, date, status }) => {
  return (
    <View style={styles.header}>
      <LaunchStatus id={status} />
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
  infoHeader: {
    flex: 1,
  },
});

export default HeaderCard;

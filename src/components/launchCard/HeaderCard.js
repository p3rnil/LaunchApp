import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LaunchStatus from './LaunchStatus';
import {
  useLaunchesStatusDispatch,
  getLaunchesStatus,
} from '../../context/index';

const HeaderCard = ({ name, location, date, status }) => {
  const launchStatusDispatch = useLaunchesStatusDispatch();

  useEffect(() => {
    getLaunchesStatus(launchStatusDispatch);
  }, [launchStatusDispatch]);

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
